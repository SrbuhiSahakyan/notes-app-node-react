import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from "./routes/noteRoutes.js";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/notes",noteRoutes);

app.listen(process.env.PORT || 4000, '0.0.0.0', () =>
  console.log('Server running на порту ' + (process.env.PORT || 4000))
);