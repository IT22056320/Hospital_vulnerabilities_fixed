import { Router } from 'express';
import multer from 'multer';
import BankDepositController from '../controllers/bankDeposit.controller';

const router = Router();
const bankDepositController = new BankDepositController();
const upload = multer({ dest: 'uploads/' }); // Set up file upload destination

router.post('/submit-bank-deposit', upload.single('depositProof'), (req, res) => {
    bankDepositController.submitBankDeposit(req, res);
  });
export default router;
