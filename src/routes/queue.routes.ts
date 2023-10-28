import { Router } from 'express';
import { fetchMessageFromQueueHandler } from '../controllers/queue.controller';
import { addMessageToQueueHandler } from '../controllers/queue.controller';

const router = Router();

// POST endpoint to add a message to the queue
router.post('/:queueName', async (req, res) => {
  try {
    const { queueName } = req.params;
    const message = req.body;
    await addMessageToQueueHandler(queueName, JSON.stringify(message));
    res.status(200).send({ status: 'Message added' });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

// GET endpoint to fetch the next message from the queue
router.get('/:queueName', async (req, res) => {
  const { queueName } = req.params;
  const timeout = req.query.timeout ? Number(req.query.timeout) : 10000; // default 10 seconds

  try {
    const message = await fetchMessageFromQueueHandler(queueName, timeout);
    if (message) {
      res.status(200).send({ message });
    } else {
      res.status(204).send(); // No content
    }
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

export default router;
