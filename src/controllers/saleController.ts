import { Request, Response } from 'express';
import Sale from '../models/Sale';
import Product from '../models/Product';

interface ProductInput {
    productId: string;
    quantity: number;
}

export const createSale = async (req: Request, res: Response) => {
    try {
        const { products, customerId, totalAmount } = req.body;

        if (!Array.isArray(products) || products.length === 0 || !customerId || totalAmount <= 0) {
            return res.status(400).json({ message: 'Invalid sale data' });
        }

        const sale = new Sale({
            products: products.map((product: ProductInput) => ({
                productId: product.productId,
                quantity: product.quantity
            })),
            customerId,
            totalAmount,
            createdAt: new Date(),
        });

        await sale.save();

        for (const product of products) {
            const updatedProduct = await Product.findByIdAndUpdate(product.productId, {
                $inc: { stock: -product.quantity },
            });

            if (!updatedProduct) {
                return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
            }
        }

        return res.status(201).json(sale);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating sale', error: error.message });
    }
};

export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find().populate('customerId').populate('products.productId');
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching sales', error: error.message });
    }
};

export const getSaleById = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('customerId').populate('products.productId');
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching sale', error: error.message });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        for (const product of sale.products) {
            const updatedProduct = await Product.findByIdAndUpdate(product.productId, {
                $inc: { stock: product.quantity },
            });

            if (!updatedProduct) {
                return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
            }
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting sale', error: error.message });
    }
};