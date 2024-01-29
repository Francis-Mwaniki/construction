
"use client"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import React, { useEffect } from "react"
import { JSX, SVGProps } from "react"
import toast from "react-hot-toast"

export default function Component() {
  const [free, setFree] = React.useState(false)
  const [pro, setPro] = React.useState(false)
  const [enterprise, setEnterprise] = React.useState(false)

const [active, setActive] = React.useState('free')

const [loading, setLoading] = React.useState(false)


useEffect(() => {
  //check if user is logged in
 

  /* check if plan is set */
  const plan = localStorage.getItem('plan')
  if (plan) {
    setActive(plan)
  }

  /* restrict based on plan */

  

}
, [])


  const plans = [
    {
      name: 'Free',
      id: 'free',
      price: 0,
      features: [
        'Detect AI content',
        'ChatGPT detector',
        '3 Trials',
      ],
    },
    {
      name: 'Pro',
      id: 'pro',
      price: 9,
      features: [
        'Detect AI content',
        'ChatGPT detector',
        '10 Trials',
        '24/7 Support',
      ],
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      price: 50,
      features: [
        'Detect AI content',
        'ChatGPT detector',
        'Unlimited Trials',
        '24/7 Support',
        'Dedicated Account Manager',
      ],
    },
  ]

  const handleFreePlan = () => {
        setFree(true)

    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/Login'
    }

   localStorage.setItem('plan', 'free')

    setTimeout(() => {
  
      setFree(false)
      new Audio('/soundplan.wav').play()
      setTimeout(() => {
            toast.success(`free plan activated`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
        window.location.href = '/Dashboard'
      }
      , 1000)
    }
    , 3000)


  }

  const handleProPlan = () => {
     setPro(true)
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/Login'
    }

    localStorage.setItem('plan', 'pro')
    console.log('pro plan')
    


    setTimeout(() => {
       toast.success(`pro plan activated`, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
      setPro(false)
      new Audio('/soundplan.wav').play()
      setTimeout(() => {
        window.location.href = '/Dashboard'
      }
      , 1000)
    }
    , 3000)



  }


  const handleEnterprisePlan = () => {
     setEnterprise(true)
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/Login'
      
    }
    localStorage.setItem('plan', 'enterprise')
    console.log('enterprise plan')
      


    setTimeout(() => {
       toast.success(`Enterprise plan activated`, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
   
      setEnterprise(false)
      new Audio('/soundplan.wav').play()

      setTimeout(() => {
        window.location.href = '/Dashboard'
      }
      , 1000)
    }
    , 3000)
  }


 
  


  return (
    <section className="min-h-screen w-full flex-col  py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        
            <h2 className="text-3xl font-bold text-center uppercase py-3">Pricing</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
              No credit card required.
              cancel anytime. 
            </p>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Free</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$0</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Ask your Experts
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Regular resources
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  50 messages cap per day
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button
              disabled={free || pro || enterprise}
               className="w-full"
              onClick={handleFreePlan}
              >
                {
                  free ? (<>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing</span>
                  </>) : 'Get Started'
                }
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$9</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                    All Free features
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Most Popular with our users
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    200 messages cap per day
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    24/7 Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={free || pro || enterprise}
              onClick={handleProPlan}
              >
                {
                  pro ? (<>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing</span>
                  </>) : 'Get Started'
                }
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Enterprise</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$50</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    All Pro features
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Unlimited messages cap per day
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Unlimited Trials
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    24/7 Support
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Most exclusive features
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full"
              disabled={free || pro || enterprise}
              onClick={handleEnterprisePlan}
              >
                {
                  enterprise ? (<>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing</span>
                  </>) : 'Get Started'
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/3000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}