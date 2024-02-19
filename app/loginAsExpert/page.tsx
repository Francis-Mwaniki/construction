"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';


const LoginForm  = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        // Send login request to server
        const response = await fetch('/api/auth/expert/loginAsExpert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        if(data.status === 400 || data.status === 401 || data.status === 500){
          setError(data.message);
            setLoading(false);
          return
        }
        if(data.status === 200){
          localStorage.setItem('isExpert', 'true');
          let random = Math.random().toString(36).substring(7);
          
            setLoading(false);
          router.push(`/Experts/${data.id}?token=${random}`);
        }
        
    } catch (error: any) {
        setLoading(false);
      setError(error.message || 'Unknown error');
    }
  };

  return (
    <Card className="border justify-center items-center  m-auto flex min-h-screen shadow-lg p-4 sm:max-w-5xl my-4 w-full mx-auto">
              <Card className='p-10 flex flex-col space-y-4 max-w-md mx-auto'>
    <h1 className="text-2xl font-semibold text-center">Login As Expert</h1>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {/* Error message (conditionally rendered) */}
      {error && (
        <div className="text-red-500 text-sm text-center my-2">{error}</div>
      )}

      {/* Email field */}
      <div className='p-4 flex-col space-y-4 max-w-md mx-auto' >
      <div className="flex flex-col items-center justify-start space-x-2">
        <label htmlFor="email" className="text-sm text-gray-500">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-md w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      </div>

      {/* Password field */}
      <div className='p-4 flex-col space-y-4 max-w-md mx-auto' >
      <div className="flex flex-col items-center justify-start space-x-2">
        <label htmlFor="password" className="text-sm text-gray-500">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-md w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        >
        {
            loading ? (
                <Loader2 size={24} className='animate-spin'/>
            ) : 'Login As Expert'
        }
      </Button>
    </form>
    </Card>
    </Card>
  );
};

export default LoginForm;
