// components/RequestCard.tsx

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
  
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2">Request #{id}</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Message:</strong> {message}</p>
          <p><strong>Hour:</strong> {hour}</p>
          <p><strong>Expert Email:</strong> {expertEmail}</p>
          <p><strong>Expert Name:</strong> {expertName}</p>
          <p><strong>Meeting Link:</strong> {shareMeetingLink}</p>
          <p><strong>Accepted:</strong> {isAccepted ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  };
  
  export default RequestCard;
  