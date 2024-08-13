import prisma from '../db';

export const getAllProducts = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { products: true }
    });

    if (!user) {
        res.status(401).send('Unauthorized');
        return;
    }

    res.status(200).json({ data: user.products });
};

export const getProduct = async (req: any, res: any) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: { id, belongsToId: req.user.id }
    });

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    res.status(200).json({ data: product });
};

export const createProduct = async (req: any, res: any, next: any) => {
    try {
        const product = await prisma.product.create({
            data: { name: req.body.name, belongsToId: req.user.id }
        });

        res.status(201).json({ data: product });
    } catch (e: any) {
        next(e);
    }
};

export const updateProduct = async (req: any, res: any, next: any) => {
    try {
        const updated = await prisma.product.update({
            where: { id: req.params.id },
            data: { name: req.body.name }
        });

        res.status(200).json({ data: updated });
    } catch (e) {
        res.status(404).json({ message: 'Product not found' });
        next(e);
    }
};

export const deleteProduct = async (req: any, res: any, next: any) => {
    try {
        const deleted = await prisma.product.delete({
            where: { id: req.params.id, belongsToId: req.user.id }
        });

        res.status(200).json({ data: deleted });
    } catch (e) {
        res.status(404).json({ message: 'Product not found' });
        next(e);
    }
};
