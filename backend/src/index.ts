import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import noteRoutes from './routes/noteRoutes';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
