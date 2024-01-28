// components/UpgradePrompt.js

import Link from 'next/link';
import { Button } from './ui/button';

const UpgradePrompt = () => {
  return (
    <div className="text-center flex justify-center items-center flex-col gap-y-3 min-h-screen">
      <div className="text-9xl font-bold text-red-500">🚨</div>
      <h1 className="text-3xl font-bold">Upgrade to premium</h1>
      <p className="text-red-500
      tracking-wider leading-6
      
      ">You have reached your message limit
      . Please upgrade!</p>
      <Button
        className="  font-bold py-2 px-4 rounded"
        >
          <a
          className='no-underline'
           href='/pricing'>
            <span className=" text-white">Upgrade Now</span>
          </a>
        
      </Button>
    </div>
  );
};

export default UpgradePrompt;
