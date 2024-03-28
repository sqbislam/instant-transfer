export default function Footer() {
  return (
    <div className='absolute w-full py-5 text-center'>
      <p className='text-gray-500'>
        A project by{' '}
        <a
          className='font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline'
          href='https://github.com/sqbislam'
          target='_blank'
          rel='noopener noreferrer'
        >
          Saqib Islam
        </a>
      </p>
    </div>
  );
}
