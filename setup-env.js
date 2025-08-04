import fs from 'fs';
import path from 'path';

const envContent = `VITE_SERVER_URL=http://localhost:3000/api`;

const envPath = path.join(process.cwd(), '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Frontend environment file created successfully!');
  console.log('📁 File location:', envPath);
  console.log('\n🔧 Please make sure to:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Start the frontend: npm run dev');
} catch (error) {
  console.error('❌ Error creating environment file:', error.message);
} 