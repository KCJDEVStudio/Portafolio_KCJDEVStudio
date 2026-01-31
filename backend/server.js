import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendContactEmail } from './controllers/contactController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', sendContactEmail);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: ${process.env.RECIPIENT_EMAIL}`);
});