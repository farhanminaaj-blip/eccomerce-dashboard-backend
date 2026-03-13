import 'dotenv/config';
import { connectDB } from './db.js';
import { users } from './model.js';

// Usage: node make-admin.js [email] [password]
const EMAIL = process.argv[2] || 'ladddo@example.com';
const PASSWORD = process.argv[3] || '7890111';

async function promote() {
  try {
    await connectDB();

    const existing = await users.findOne({ email: EMAIL });
    if (existing) {
      if (existing.isAdmin) {
        console.log(`User ${EMAIL} already an admin.`);
        
      } else {
        existing.isAdmin = true;
        await existing.save();
        console.log(`User ${EMAIL} updated to admin.`);
      }
      console.log('User after update:', await users.findOne({ email: EMAIL }, 'email isAdmin'));
      process.exit(0);
    }

    // Create user with sensible defaults
    const newUser = await users.create({
      username: EMAIL.split('@')[0],
      position: 'Admin',
      email: EMAIL,
      phone_number: '0000000000',
      password: PASSWORD,
      isAdmin: true,
    });

    console.log('Created admin user:', { email: newUser.email, isAdmin: newUser.isAdmin });
    process.exit(0);
  } catch (err) {
    console.error('Error promoting/creating admin user:', err);
    process.exit(1);
  }
}

promote();
