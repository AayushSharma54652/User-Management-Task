import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/user-management',
  mailConfig: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '587'),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};