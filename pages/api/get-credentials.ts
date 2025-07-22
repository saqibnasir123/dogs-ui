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

    const filePath = path.join(process.cwd(), 'login-credentials.json');
    // Read the user data 
    let UserData: UserData;
      const jsonData = await fs.readFile(filePath, 'utf-8');
      UserData = JSON.parse(jsonData);
      res.status(200).json({ data: UserData });
  
 
}