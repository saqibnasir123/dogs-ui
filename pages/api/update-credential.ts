import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { toaster } from '@/components/ui/toaster';

// Define the structure of your JSON data
interface UserData {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

    const { email, password } = req.body; // Get data from the request body

    const filePath = path.join(process.cwd(), 'login-credentials.json');
    // Read the existing data 
    let existingData: UserData;
      const jsonData = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(jsonData);

      // Update the isLoggedIn fields
      if(existingData.email===email && existingData.password===password){
         existingData.isLoggedIn = true;
      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
      res.status(200).json({ message: 'Credentials updated successfully' });
      }else{
        res.status(409).json({ message: 'Invalid Credentials' });
      }
 
}