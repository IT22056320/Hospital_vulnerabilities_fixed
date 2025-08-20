// routes/insurance.route.ts
import { Router } from 'express';
import InsuranceController from '../controllers/insurance.controller';

const insuranceController = new InsuranceController();
const router = Router();

// Insurance Routes
router.post('/', insuranceController.create.bind(insuranceController));
router.get('/', insuranceController.findAll.bind(insuranceController));
router.get('/:id', insuranceController.findById.bind(insuranceController));
router.put('/:id', insuranceController.update.bind(insuranceController));
router.delete('/:id', insuranceController.delete.bind(insuranceController));

export default router;
