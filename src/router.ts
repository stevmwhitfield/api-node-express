import { Router } from 'express';
import {
    productPOSTValidation,
    productPUTValidation,
    updatePOSTValidation,
    updatePUTValidation,
    updatePointPOSTValidation,
    updatePointPUTValidation
} from './modules/middleware';
import {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from './handlers/product';
import {
    getAllUpdates,
    getUpdate,
    createUpdate,
    updateUpdate,
    deleteUpdate
} from './handlers/update';

const router = Router();

/* Product routes */

router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

router.post('/products', productPOSTValidation, createProduct);

router.put('/products/:id', productPUTValidation, updateProduct);

router.delete('/products/:id', deleteProduct);

/* Update routes */

router.get('/updates', getAllUpdates);

router.get('/updates/:id', getUpdate);

router.post('/updates', updatePOSTValidation, createUpdate);

router.put('/updates/:id', updatePUTValidation, updateUpdate);

router.delete('/updates/:id', deleteUpdate);

/* UpdatePoint routes */

router.get('/updatepoints', (req, res) => {
    res.json({ message: 'updatepoints' });
});

router.get('/updatepoints/:id', () => {});

router.post('/updatepoints', updatePointPOSTValidation, () => {});

router.put('/updatepoints/:id', updatePointPUTValidation, () => {});

router.delete('/updatepoints/:id', () => {});

/* Error handling */

router.use((err: any, req: any, res: any, next: any) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    } else {
        res.status(500).json({ message: 'internal server error' });
    }
});

export default router;
