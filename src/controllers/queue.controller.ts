import { Request, Response } from 'express';
import QueueService from '../services/queue.service';

const queueService = new QueueService();

export async function addMessageToQueueHandler(queueName: string, message: string): Promise<void> {
  await queueService.addMessageToQueue(queueName, message);
}

export async function fetchMessageFromQueueHandler(queueName: string, timeout: number): Promise<string | null> {
  return queueService.fetchMessageFromQueue(queueName, timeout);
}
