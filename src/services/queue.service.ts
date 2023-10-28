import Redis, { RedisOptions } from 'ioredis';

export default class QueueService {
  private redis: Redis;

  constructor() {
    const redisOptions: RedisOptions = {};
    if (process.env.REDIS_PORT) {
      redisOptions.port = parseInt(process.env.REDIS_PORT);
    }
    if (process.env.REDIS_HOST) {
      redisOptions.host = process.env.REDIS_HOST;
    }
    this.redis = new Redis(redisOptions);
  }

  /**
   * Add a message to the queue
   * @param message The message to add
   * @returns Promise<void>
   */
  async addMessageToQueue(queue: string, message: string): Promise<void> {
    await this.redis.lpush(queue, message);
  }

  /**
   * Fetch a single message from the queue
   * @returns Promise<string | null>
   */
  async fetchMessageFromQueue(queue: string, timeoutMillis: number): Promise<string | null> {
    const randomString = Math.random().toString(36).substring(2, 10);
    const tempQueue = `${queue}:${randomString}`;

    // The timeout for BRPOPLPUSH is in seconds, so we need to round up.
    const timeoutSeconds = Math.ceil(timeoutMillis / 1000);
    const result = await this.redis.brpoplpush(queue, tempQueue, timeoutSeconds);

    if (result) {
      // Set the temporary list to expire after the given number of milliseconds.
      await this.redis.pexpire(tempQueue, timeoutMillis);
      return result;
    }

    return null;
  }
}
