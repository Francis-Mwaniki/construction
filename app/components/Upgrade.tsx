// components/UpgradePrompt.js

import Link from 'next/link';

const UpgradePrompt = () => {
  return (
    <div className=" text-center flex justify-center items-center flex-col gap-y-3 min-h-screen">
      <p className="text-red-500">You have reached your message limit
      . Please upgrade!</p>
      <Link href="/upgrade"
        className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        <span className="">Upgrade Now</span>
      </Link>
    </div>
  );
};

export default UpgradePrompt;
