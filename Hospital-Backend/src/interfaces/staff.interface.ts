import { Document } from 'mongoose';

// Define the Recurring Schedule interface for weekly schedules
export interface RecurringSchedule {
  day?: string;
  isFreeDay?: boolean;
  timeSlots?: { startTime: string; endTime: string }[];
  recurrence?: string;
  startDate?: Date;
  endDate?: Date;
}

// Define the Custom Schedule interface for specific dates
export interface CustomSchedule {
  date?: Date;
  isFreeDay?: boolean;
  timeSlots?: { startTime: string; endTime: string }[];
}

// Define the IStaff interface for the staff member
export interface IStaff {
  name: string;
  email: string;
  password: string;
  role: string;
  contactInformation?: string;
  department?: string;
  schedule?: {
    recurring?: RecurringSchedule[];
    custom?: CustomSchedule[];
  };
}
