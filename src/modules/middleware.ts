import { body, validationResult } from 'express-validator';

export const handleInputErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
};

/* Product validation */

export const productPOSTValidation = [
    body('name').exists().isString(),
    handleInputErrors
];
export const productPUTValidation = [
    body('name').optional().isString(),
    handleInputErrors
];

/* Update validation */

export const updatePOSTValidation = [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors
];
export const updatePUTValidation = [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional().isString(),
    handleInputErrors
];

/* UpdatePoint validation */

export const updatePointPOSTValidation = [
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors
];
export const updatePointPUTValidation = [
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors
];
