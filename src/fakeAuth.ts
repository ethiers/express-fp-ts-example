import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// in-memory (simulation)
let emailDB = 'sebastien.ethier@seconceptweb.ca';
let passwordDB = '1234';

export const authenticate = async (email: string, password: string): Promise<boolean> => {
  if (emailDB === email && passwordDB === password) {
    return true;
  }
  return false;
};

export const generateToken = async (email: string): Promise<string> => {
  // fake
  const user = await bcrypt.hash(email, 12);
  const accessToken = jwt.sign(JSON.stringify(user), 'secret');
  return accessToken;
}