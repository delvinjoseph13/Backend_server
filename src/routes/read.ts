import { Router, Request, Response } from 'express';
import fs from 'fs';

const router = Router();
const dbFilePath = './db.json';

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

router.get('/', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read database' });
      return;
    }

    const submissions: Submission[] = JSON.parse(data || '[]');

    if (index >= 0 && index < submissions.length) {
      res.status(200).json(submissions[index]);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  });
});

export default router;
