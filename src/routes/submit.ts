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

router.post('/', (req: Request, res: Response) => {
  const newSubmission: Submission = req.body;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read database' });
      return;
    }

    const submissions: Submission[] = JSON.parse(data || '[]');
    submissions.push(newSubmission);

    fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save submission' });
        return;
      }

      res.status(200).json({ message: 'Submission successful' });
    });
  });
});

export default router;
