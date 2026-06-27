import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
import { connectToDatabase } from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});