import 'dotenv/config';
import mongoose from 'mongoose';
import Database from '../src/config/db';
import { AuthService } from '../src/services/AuthService';

async function run() {
  // Connect to the database
  new Database();

  const auth = new AuthService();

  const users = [
    { username: 'Admin User',   email: 'admin@demo.com',   password: 'Admin123!',   role: 'ADMIN' },
    { username: 'Doctor User',  email: 'doctor@demo.com',  password: 'Doctor123!',  role: 'DOCTOR' },
    { username: 'Nurse User',   email: 'nurse@demo.com',   password: 'Nurse123!',   role: 'NURSE' },
    { username: 'Patient User', email: 'patient@demo.com', password: 'Patient123!', role: 'PATIENT' },
  ] as const;

  for (const u of users) {
    try {
      const created = await auth.register(u.username, u.email, u.password, u.role);
      if (created) {
        console.log(`✓ Seeded ${u.role}: ${u.email}`);
      } else {
        console.log(`• Skipped ${u.role} (already exists?): ${u.email}`);
      }
    } catch (err: any) {
      console.error(`✗ Seed error for ${u.email}:`, err?.message || err);
    }
  }

  console.log('Seeding complete.');
}

run()
  .catch((e) => {
    console.error('Unexpected seed error:', e);
  })
  .finally(async () => {
    try {
      await mongoose.connection.close();
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    } catch {
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    }
  });
