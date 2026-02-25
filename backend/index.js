import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log('Server running на порту ' + (process.env.PORT || 4000))
);