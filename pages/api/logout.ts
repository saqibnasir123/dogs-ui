import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

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
   // Get data from the request body
    const filePath = path.join(process.cwd(), 'login-credentials.json');
    // Read the existing data 
    let userData: UserData;
    const jsonData = await fs.readFile(filePath, 'utf-8');
    userData = JSON.parse(jsonData);
    // Update isLoggedIn to false
     userData.isLoggedIn = false;
    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf-8');
    res.status(200).json({ message: 'logout successfully' });
      
 
}