import prisma from '../db';

export const getAllUpdates = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: { belongsToId: req.user.id },
        include: { updates: true }
    });

    const updates = products.reduce((updates: any, product: any) => {
        return [...updates, ...product.updates];
    }, []);

    res.status(200).json({ data: updates });
};

export const getUpdate = async (req: any, res: any) => {
    const update = await prisma.update.findUnique({
        where: { id: req.params.id }
    });

    if (!update) {
        res.status(404).json({ message: 'Update not found' });
        return;
    }

    res.status(200).json({ data: update });
};

export const createUpdate = async (req: any, res: any) => {
    const { title, body, productId } = req.body;

    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    const update = await prisma.update.create({
        data: { title, body, productId }
    });

    res.status(201).json({ data: update });
};

export const updateUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: { belongsToId: req.user.id },
        include: { updates: true }
    });

    const updates = products.reduce((updates: any, product: any) => {
        return [...updates, ...product.updates];
    }, []);

    const match = updates.find((update: any) => update.id === req.params.id);

    if (!match) {
        res.status(404).json({ message: 'Update not found' });
        return;
    }

    const updated = await prisma.update.update({
        where: { id: req.params.id },
        data: { title: req.body.title, body: req.body.body }
    });

    res.status(200).json({ data: updated });
};

export const deleteUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: { belongsToId: req.user.id },
        include: { updates: true }
    });

    const updates = products.reduce((updates: any, product: any) => {
        return [...updates, ...product.updates];
    }, []);

    const match = updates.find((update: any) => update.id === req.params.id);

    if (!match) {
        res.status(404).json({ message: 'Update not found' });
        return;
    }

    const deleted = await prisma.update.delete({
        where: { id: req.params.id }
    });

    res.status(200).json({ data: deleted });
};
