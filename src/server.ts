import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from './utils/db';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  try {
    await connect();
    console.log('Database connected successfully');

    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/sales', saleRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

startServer();