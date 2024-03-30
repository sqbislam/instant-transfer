import prisma from '@/lib/prisma';
import { generateOTP, hashOTP } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
// Create a hashed OTP and store it in the database
const POST = async (req: NextRequest) => {
  const { fileIdentifiers } = await req.json();
  if (!fileIdentifiers) {
    throw new Error('Something went wrong. Please try again.');
  }
  try {
    await prisma.$connect();
    const otp = await generateOTP();
    const otpHash = await hashOTP(otp);
    // Create a new entry in the database to store the OTP hash and file identifier
    await prisma.fileMapper.create({
      data: {
        fileIdentifiers,
        otpHash,
        expiresAt: new Date(Date.now() + 600000),
        createdAt: new Date(),
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ generatedOTP: otp }, { status: 200 });
  } catch (err) {
    await prisma.$disconnect();
    throw new Error('Something went wrong. Please try again.');
  }
};

export { POST };
