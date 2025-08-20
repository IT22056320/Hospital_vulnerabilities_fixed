// controllers/insurance.controller.ts
import { Request, Response } from 'express';
import InsuranceRepository from '../repository/insurance.repository';

class InsuranceController {
  private readonly insuranceRepository: InsuranceRepository;

  constructor() {
    this.insuranceRepository = new InsuranceRepository();
  }

  // Create a new insurance
  async create(req: Request, res: Response) {
    try {
      const insuranceData = req.body;
      const insurance = await this.insuranceRepository.create(insuranceData);
      res.status(201).json(insurance);
    } catch (error) {
      if (error instanceof Error) {
        // Now error is properly typed as an Error object
        res.status(500).json({ message: 'Failed to create insurance', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to create insurance', error: 'Unknown error' });
      }
    }
  }

  // Get all insurances
  async findAll(req: Request, res: Response) {
    try {
      const insurances = await this.insuranceRepository.findAll();
      res.status(200).json(insurances);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to retrieve insurances', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to retrieve insurances', error: 'Unknown error' });
      }
    }
  }

  // Get insurance by ID
  async findById(req: Request, res: Response) {
    try {
      const insurance = await this.insuranceRepository.findById(req.params.id);
      if (!insurance) {
        res.status(404).json({ message: 'Insurance not found' });
      } else {
        res.status(200).json(insurance);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to retrieve insurance', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to retrieve insurance', error: 'Unknown error' });
      }
    }
  }

  // Update insurance by ID
  async update(req: Request, res: Response) {
    try {
      const insurance = await this.insuranceRepository.update(req.params.id, req.body);
      if (!insurance) {
        res.status(404).json({ message: 'Insurance not found' });
      } else {
        res.status(200).json(insurance);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to update insurance', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to update insurance', error: 'Unknown error' });
      }
    }
  }

  // Delete insurance by ID
  async delete(req: Request, res: Response) {
    try {
      const insurance = await this.insuranceRepository.delete(req.params.id);
      if (!insurance) {
        res.status(404).json({ message: 'Insurance not found' });
      } else {
        res.status(200).json({ message: 'Insurance deleted successfully' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Failed to delete insurance', error: error.message });
      } else {
        res.status(500).json({ message: 'Failed to delete insurance', error: 'Unknown error' });
      }
    }
  }
}

export default InsuranceController;
