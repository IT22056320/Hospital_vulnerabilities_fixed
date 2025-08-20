"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BankDepositController {
    submitBankDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred.' });
                }
            }
        });
    }
}
exports.default = BankDepositController;
