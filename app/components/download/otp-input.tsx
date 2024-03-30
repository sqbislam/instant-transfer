import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

export const OTPInputControlled = ({
  onInputChange,
}: {
  onInputChange: (value: string) => void;
}) => {
  const [value, setValue] = React.useState('');

  return (
    <div className='space-y-2'>
      <InputOTP
        containerClassName='justify-center'
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        maxLength={6}
        value={value}
        onChange={(value) => {
          setValue(value);
          onInputChange(value);
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className='text-center text-sm'>
        {value === '' ? (
          <>Enter your one-time password to download file</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  );
};
