import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

class BankDepositController {
  async submitBankDeposit(req: Request, res: Response): Promise<void> {
    try {
      const { amount, reference, appointmentId } = req.body;
      const depositProof = req.file; // multer adds this property

      // Check if the file was uploaded
      if (!depositProof) {
        res.status(400).json({ error: 'Deposit proof (PDF) is required.' });
        return; // Ensure the method ends after sending the response
      }

      // Save deposit proof information to the database (assuming you have a Deposit model)
      // In a real case, you would store the file path in the database
      // const deposit = await Deposit.create({
      //   amount,
      //   reference,
      //   appointmentId,
      //   proofPath: depositProof.path,
      // });

      // Send success response
      res.status(200).json({ message: 'Bank deposit submitted successfully!', proofPath: depositProof.path });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }
}

export default BankDepositController;
