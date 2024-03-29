import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nanoid } from 'nanoid';
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function that converts file size in bytes to human readable format
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function that truncates a string to a specified length and appends a suffix
export function truncateString(str: string, length: number, suffix = '...') {
  return str.length > length ? str.substring(0, length) + suffix : str;
}

// Function to generate a unique identifier (e.g., UUID)
export const generateUniqueIdentifier = async () => {
  return nanoid();
};

// Generate secure OTP
export const generateOTP = (otpLength = 6) => {
  return crypto
    .randomBytes(Math.ceil(otpLength / 2))
    .toString('hex')
    .slice(0, otpLength);
};

// Hash OTP securely
export const hashOTP = (otp: string) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};
