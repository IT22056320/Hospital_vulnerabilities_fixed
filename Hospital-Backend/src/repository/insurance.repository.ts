// repository/insurance.repository.ts
import Insurance from '../models/insurance.model';
import IInsurance from '../interfaces/insurance.interface';

class InsuranceRepository {
  // Create a new insurance record
  async create(insuranceData: IInsurance): Promise<IInsurance> {
    const newInsurance = new Insurance(insuranceData);
    return newInsurance.save();
  }

  // Get all insurance records
  async findAll(): Promise<IInsurance[]> {
    return Insurance.find();
  }

  // Get a specific insurance by ID
  async findById(id: string): Promise<IInsurance | null> {
    return Insurance.findById(id);
  }

  // Delete an insurance by ID
  async delete(id: string): Promise<IInsurance | null> {
    return Insurance.findByIdAndDelete(id);
  }

  // Update an insurance by ID
  async update(id: string, updateData: Partial<IInsurance>): Promise<IInsurance | null> {
    return Insurance.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default InsuranceRepository;
