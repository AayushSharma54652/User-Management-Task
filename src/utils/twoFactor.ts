import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export const generateTwoFactorSecret = () => {
  return authenticator.generateSecret();
};

export const generateQRCode = async (secret: string, email: string) => {
  const otpauth = authenticator.keyuri(email, 'YourApp', secret);
  return await QRCode.toDataURL(otpauth);
};

export const verifyTwoFactorToken = (token: string, secret: string) => {
  return authenticator.verify({ token, secret });
};