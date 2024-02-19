// components/RequestCard.tsx

import { Button } from "@/components/ui/button";
import { CheckCheck, Loader2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface Request {
    id: number;
    name: string;
    email: string;
    message: string;
    hour: number;
    expertEmail: string;
    expertName: string;
    shareMeetingLink: string;
    isAccepted: boolean;
  }
  
  interface RequestCardProps {
    request: Request;
  }
  
  const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
    const {
      id,
      name,
      email,
      message,
      hour,
      expertEmail,
      expertName,
      shareMeetingLink,
      isAccepted
    } = request;

    const [isAccepting, setIsAccepting] = React.useState(false);

    // handle accept - POST /api/admin/experts/requests/accept
    const handleAccept = async () => {
      setIsAccepting(true);
      try {
        const response = await fetch("/api/admin/experts/requests/accept", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id,
            name,
            email,
            message,
            hour,
            expertEmail,
            expertName,
            shareMeetingLink,
            isAccepted
           }),
        });
         const data = await response.json();
        if (response.ok) {
          setIsAccepting(false);
          toast.success(data.message,{
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
        }
       
        if (response.status === 400 || response.status === 500 || response.status === 404) {
          setIsAccepting(false);
          toast.error(data.message,{
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
        }
      } catch (error) {
        setIsAccepting(false);
        toast.error("Something went wrong",{
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
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <span
              className={`px-2 py-1 text-sm rounded-full ${
                isAccepted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isAccepted ? "Accepted" : "pre-accepted"}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{message}</p>
          <div className="mt-4">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Hour:</span> 
              {' '}
               {hour  ? `${hour + 1}:00 - ${hour + 2}:00` : "Not set"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Expert:</span> {expertName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Expert Email:</span> {expertEmail}
            </p>
            <p className="text-gray-600 flex items-center gap-x-2">
              <span className="font-semibold">Meeting Link:</span> 
              <a 
               className="text-blue-500 hover:underline"
              href={shareMeetingLink} target="_blank" rel="noreferrer">
                {shareMeetingLink}
              </a>
            </p>
            {/* accept */}
            
            

          </div>
          <>
          <div className="mt-4">
              <Button
              onClick={handleAccept}
                className=" flex  justify-start gap-x-2"
              >
                {
                  isAccepting ? (
                    <>
                    <span className="text-white">Accepting...</span>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    </>
                  ) : (
                   <>
                   <span className="text-white">Accept</span>
                <CheckCheck className="w-6 h-6 ml-2" />
                   </>
                  )
                }
              </Button>
             
            </div>
          </>
          

        </div>
      </div>
    );
  };
  
  export default RequestCard;
  