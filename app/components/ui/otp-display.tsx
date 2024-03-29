const OTPDisplay = ({ otp }: { otp: string }) => {
  // Convert the OTP string into an array of individual digits
  const otpDigits = otp.split('');

  return (
    <div className='flex items-center justify-center space-x-4'>
      {/* Map over each digit and create a box for it */}
      {otpDigits.map((digit, index) => (
        <div
          key={index}
          className='flex h-16 w-16 items-center justify-center rounded-md border border-gray-300'
        >
          <span className='text-4xl font-bold'>{digit}</span>
        </div>
      ))}
    </div>
  );
};

export default OTPDisplay;
