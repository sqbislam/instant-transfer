import prisma from '@/lib/prisma';
import { generateOTP, hashOTP } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
// Create a hashed OTP and store it in the database
const POST = async (req: NextRequest) => {
  const { fileIdentifiers, fileNames } = await req.json();
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
        fileNames,
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

// GET file identifier from the OTP
const GET = async (req: NextRequest) => {
  const inputOTP = req.nextUrl.searchParams.get('inputOTP');
  const hashedOTP = hashOTP(inputOTP as string);
  if (!hashedOTP || !inputOTP) {
    throw new Error('Please provide a valid OTP');
  }
  try {
    await prisma.$connect();
    const fileMapper = await prisma.fileMapper.findFirst({
      where: {
        otpHash: hashedOTP,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
    if (!fileMapper) {
      throw new Error('Invalid OTP');
    }
    await prisma.$disconnect();
    return NextResponse.json(
      {
        fileIdentifiers: fileMapper.fileIdentifiers,
        fileNames: fileMapper.fileNames,
      },
      { status: 200 },
    );
  } catch (err) {
    await prisma.$disconnect();
    throw new Error('Invalid OTP');
  }
};

export { POST, GET };
