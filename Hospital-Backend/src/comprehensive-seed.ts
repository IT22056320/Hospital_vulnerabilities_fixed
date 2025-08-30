import dotenv from 'dotenv';
import Database from '../src/config/db';
import User from '../src/models/User';
import Staff from '../src/models/staff.model';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

interface DemoUser {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'PATIENT';
  name?: string;
  contactInformation?: string;
  department?: string;
  specialization?: string;
  workExperience?: string;
  about?: string;
  degree?: string;
}

const demoUsers: DemoUser[] = [
  // Admin Users
  {
    username: 'admin',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'ADMIN',
    name: 'Dr. Sarah Johnson',
    contactInformation: '+1-555-0101',
    department: 'Administration',
    specialization: 'Hospital Management',
    workExperience: '15 years',
    about: 'Chief Administrator with extensive experience in healthcare management.',
    degree: 'MBA Healthcare Management'
  },
  {
    username: 'admin2',
    email: 'admin2@hospital.com',
    password: 'admin123',
    role: 'ADMIN',
    name: 'Michael Chen',
    contactInformation: '+1-555-0102',
    department: 'Administration',
    specialization: 'Medical Affairs',
    workExperience: '12 years',
    about: 'Deputy Administrator specializing in medical affairs and quality assurance.',
    degree: 'MD, MBA'
  },

  // Doctor Users
  {
    username: 'doctor1',
    email: 'doctor1@hospital.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. Emily Rodriguez',
    contactInformation: '+1-555-0201',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    workExperience: '10 years',
    about: 'Specialized in cardiac catheterization and angioplasty procedures.',
    degree: 'MD Cardiology'
  },
  {
    username: 'doctor2',
    email: 'doctor2@hospital.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. James Wilson',
    contactInformation: '+1-555-0202',
    department: 'Neurology',
    specialization: 'Neurological Surgery',
    workExperience: '8 years',
    about: 'Expert in brain and spinal cord surgeries with minimally invasive techniques.',
    degree: 'MD Neurosurgery'
  },
  {
    username: 'doctor3',
    email: 'doctor3@hospital.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. Lisa Park',
    contactInformation: '+1-555-0203',
    department: 'Pediatrics',
    specialization: 'Pediatric Oncology',
    workExperience: '12 years',
    about: 'Dedicated to treating children with cancer using latest treatment protocols.',
    degree: 'MD Pediatrics, Fellowship Oncology'
  },
  {
    username: 'doctor4',
    email: 'doctor4@hospital.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. Robert Kumar',
    contactInformation: '+1-555-0204',
    department: 'Orthopedics',
    specialization: 'Sports Medicine',
    workExperience: '7 years',
    about: 'Specializes in sports injuries and joint replacement surgeries.',
    degree: 'MD Orthopedics'
  },
  {
    username: 'doctor5',
    email: 'doctor5@hospital.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. Amanda Foster',
    contactInformation: '+1-555-0205',
    department: 'Gynecology',
    specialization: 'Maternal-Fetal Medicine',
    workExperience: '9 years',
    about: 'High-risk pregnancy specialist with expertise in prenatal care.',
    degree: 'MD Obstetrics & Gynecology'
  },

  // Nurse Users
  {
    username: 'nurse1',
    email: 'nurse1@hospital.com',
    password: 'nurse123',
    role: 'NURSE',
    name: 'Maria Gonzalez',
    contactInformation: '+1-555-0301',
    department: 'Emergency Department',
    specialization: 'Critical Care',
    workExperience: '6 years',
    about: 'Experienced emergency nurse with trauma care certification.',
    degree: 'BSN, CCRN'
  },
  {
    username: 'nurse2',
    email: 'nurse2@hospital.com',
    password: 'nurse123',
    role: 'NURSE',
    name: 'David Thompson',
    contactInformation: '+1-555-0302',
    department: 'ICU',
    specialization: 'Intensive Care',
    workExperience: '8 years',
    about: 'ICU nurse specialist with advanced life support certification.',
    degree: 'BSN, ACLS, BLS'
  },
  {
    username: 'nurse3',
    email: 'nurse3@hospital.com',
    password: 'nurse123',
    role: 'NURSE',
    name: 'Jennifer Lee',
    contactInformation: '+1-555-0303',
    department: 'Pediatrics',
    specialization: 'Pediatric Care',
    workExperience: '5 years',
    about: 'Pediatric nurse with special training in child psychology and family care.',
    degree: 'BSN Pediatrics'
  },
  {
    username: 'nurse4',
    email: 'nurse4@hospital.com',
    password: 'nurse123',
    role: 'NURSE',
    name: 'Kevin O\'Connor',
    contactInformation: '+1-555-0304',
    department: 'Surgery',
    specialization: 'Perioperative Care',
    workExperience: '7 years',
    about: 'Operating room nurse with expertise in surgical procedures.',
    degree: 'BSN, CNOR'
  },

  // Patient Users
  {
    username: 'patient1',
    email: 'patient1@gmail.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'John Smith',
    contactInformation: '+1-555-0401',
    about: 'Regular patient for routine checkups and preventive care.'
  },
  {
    username: 'patient2',
    email: 'patient2@gmail.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'Alice Johnson',
    contactInformation: '+1-555-0402',
    about: 'Patient with chronic condition requiring regular monitoring.'
  },
  {
    username: 'patient3',
    email: 'patient3@gmail.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'Mark Davis',
    contactInformation: '+1-555-0403',
    about: 'New patient seeking specialty consultation.'
  },
  {
    username: 'patient4',
    email: 'patient4@gmail.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'Linda Brown',
    contactInformation: '+1-555-0404',
    about: 'Patient undergoing treatment for recent diagnosis.'
  },
  {
    username: 'patient5',
    email: 'patient5@gmail.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'Thomas Wilson',
    contactInformation: '+1-555-0405',
    about: 'Senior patient with multiple health conditions.'
  }
];

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting comprehensive database seeding...');
    
    // Initialize database connection
    new Database();
    
    // Wait a moment for connection to establish
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear existing data
    console.log('🧹 Clearing existing users and staff...');
    await User.deleteMany({});
    await Staff.deleteMany({});

    let createdCount = 0;

    for (const demoUser of demoUsers) {
      try {
        console.log(`👤 Creating ${demoUser.role}: ${demoUser.name || demoUser.username}`);
        
        // Hash the password
        const hashedPassword = await hashPassword(demoUser.password);
        
        // Create User record
        const user = await User.create({
          username: demoUser.username,
          email: demoUser.email,
          password: hashedPassword
        });

        // Create Staff record with role-specific information
        const staffData: any = {
          name: demoUser.name || demoUser.username,
          email: demoUser.email,
          password: hashedPassword,
          role: demoUser.role,
          contactInformation: demoUser.contactInformation || 'Not provided'
        };

        // Add additional fields for medical staff
        if (demoUser.role !== 'PATIENT') {
          if (demoUser.department) staffData.department = demoUser.department;
          if (demoUser.specialization) staffData.specialization = demoUser.specialization;
          if (demoUser.workExperience) staffData.workExperience = demoUser.workExperience;
          if (demoUser.degree) staffData.degree = demoUser.degree;
        }
        
        if (demoUser.about) staffData.about = demoUser.about;

        const staff = await Staff.create(staffData);

        console.log(`✅ Created: ${demoUser.username} (${demoUser.role}) - ${demoUser.email}`);
        createdCount++;
        
      } catch (error: any) {
        console.error(`❌ Error creating ${demoUser.username}:`, error.message);
      }
    }

    console.log(`\n🎉 Database seeding completed!`);
    console.log(`📊 Successfully created ${createdCount} demo users`);
    console.log('\n📋 Demo Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n👑 ADMIN ACCOUNTS:');
    console.log('• admin@hospital.com / admin123 (Dr. Sarah Johnson - Chief Administrator)');
    console.log('• admin2@hospital.com / admin123 (Michael Chen - Deputy Administrator)');
    
    console.log('\n👨‍⚕️ DOCTOR ACCOUNTS:');
    console.log('• doctor1@hospital.com / doctor123 (Dr. Emily Rodriguez - Cardiology)');
    console.log('• doctor2@hospital.com / doctor123 (Dr. James Wilson - Neurology)');
    console.log('• doctor3@hospital.com / doctor123 (Dr. Lisa Park - Pediatric Oncology)');
    console.log('• doctor4@hospital.com / doctor123 (Dr. Robert Kumar - Orthopedics)');
    console.log('• doctor5@hospital.com / doctor123 (Dr. Amanda Foster - Gynecology)');
    
    console.log('\n👩‍⚕️ NURSE ACCOUNTS:');
    console.log('• nurse1@hospital.com / nurse123 (Maria Gonzalez - Emergency)');
    console.log('• nurse2@hospital.com / nurse123 (David Thompson - ICU)');
    console.log('• nurse3@hospital.com / nurse123 (Jennifer Lee - Pediatrics)');
    console.log('• nurse4@hospital.com / nurse123 (Kevin O\'Connor - Surgery)');
    
    console.log('\n👥 PATIENT ACCOUNTS:');
    console.log('• patient1@gmail.com / patient123 (John Smith)');
    console.log('• patient2@gmail.com / patient123 (Alice Johnson)');
    console.log('• patient3@gmail.com / patient123 (Mark Davis)');
    console.log('• patient4@gmail.com / patient123 (Linda Brown)');
    console.log('• patient5@gmail.com / patient123 (Thomas Wilson)');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 All passwords are role-based: admin123, doctor123, nurse123, patient123');
    console.log('🌐 Use these credentials to test different role functionalities');
    
    process.exit(0);
    
  } catch (error: any) {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding process
seedDatabase();