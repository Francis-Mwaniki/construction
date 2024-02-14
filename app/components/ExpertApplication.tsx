import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ExpertFormProps {
  // Add any additional props if needed
}

const ExpertApplicationForm: React.FC<ExpertFormProps> = () => {
    const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [certifications, setCertifications] = useState('');
  const [services, setServices] = useState('');
  const [verifiedWebsites, setVerifiedWebsites] = useState<string[]>(['', '', '']); // Initialize with 3 empty strings
    const [profilepic, setProfilePic] = useState('');
    const [availableDay, setAvailableDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [bio, setBio] = useState('');
    const [profilepicURL, setProfilePicURL] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

  const handleWebsiteChange = (index: number, value: string) => {
    const updatedWebsites = [...verifiedWebsites];
    updatedWebsites[index] = value;
    setVerifiedWebsites(updatedWebsites);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Basic form validation
    if (!firstName || !lastName || !email || !certifications || !services || verifiedWebsites.some((website) => !website.trim()) 
    || !availableDay || !startTime || !endTime || !profilepic || !bio || !password || !passwordConfirm) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
          // Perform further actions, such as submitting data to a backend or API
     //api call POST /api/auth/expert/apply
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      certifications,
      services,
      verifiedWebsites,
        availableDay,
        startTime,
        endTime,
        profilepic,
        bio,
        password,
        passwordConfirm,
    };
     await fetch('/api/auth/expert/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.status === 400 || data.status === 401 || data.status === 500){
            alert(data.message);
            setLoading(false);
            return
          }
          if(data.status === 201){
            setLoading(false);
            router.push('/loginAsExpert');
          }
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } catch (error:any) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
        
    }

    

    // Perform further actions, such as submitting data to a backend or API
    console.log('Form submitted:', {
      firstName,
      lastName,
      email,
      certifications,
      services,
      verifiedWebsites,
        availableDay,
        startTime,
        endTime,
        profilepic,
        bio,
        password,
        passwordConfirm,

        
    });
  };

  return (
    <Card className="border shadow-lg p-4 sm:max-w-5xl my-4 w-full mx-auto">
      <CardHeader>
        <CardTitle>Apply for Expert Role</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for the expert role, and we will get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* profilepic */}
            <div className="space-y-2">
                <Label htmlFor="profile-pic">Profile Picture</Label>
                <Input
                id="profile-pic"
                value={profilepic}
                onChange={(e: { target: { value: string; }; }) => setProfilePic(e.target.value)}
                type="file"
                accept="image/*"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                    id="first-name"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e: { target: { value: string; }; }) => setFirstName(e.target.value)}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                    id="last-name"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e: { target: { value: string; }; }) => setLastName(e.target.value)}
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e: { target: { value: string; }; }) => setEmail(e.target.value)}
                />
            </div>
            <Card className='p-4 flex flex-col space-y-4'>
            <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                {/* url */}
                <Input
                id="certifications"
                placeholder="Enter your certifications"
                value={certifications}
                onChange={(e: { target: { value: string; }; }) => setCertifications(e.target.value)}
                />
               
            </div>
            <div className="space-y-2">
                <Label htmlFor="services">Services</Label>
                <Input
                id="services"
                placeholder="Enter your services"
                value={services}
                onChange={(e: { target: { value: string; }; }) => setServices(e.target.value)}
                />
            </div>

          <div className="space-y-2">
            <Label htmlFor="verified-websites">Verified Websites</Label>
            {verifiedWebsites.map((website, index) => (
              <Input
                key={index}
                id={`verified-website-${index + 1}`}
                placeholder={`Enter verified website ${index + 1}`}
                value={website}
                onChange={(e: { target: { value: string; }; }) => handleWebsiteChange(index, e.target.value)}
              />
            ))}
          </div>
            </Card>
            <Card className='p-4 flex flex-col space-y-4'>
            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
               <Textarea 
                id="bio"
                placeholder="Enter your bio"
                value={bio}
                onChange={(e: { target: { value: string; }; }) => setBio(e.target.value)}
                />
            </div>
            <Card className='p-4 flex flex-col space-y-4'>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                value={password}
                onChange={(e: { target: { value: string; }; }) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password-confirm">Confirm Password</Label>
                <Input
                id="password-confirm"
                value={passwordConfirm}
                onChange={(e: { target: { value: string; }; }) => setPasswordConfirm(e.target.value)}
                type="password"
                placeholder="Confirm your password"
                />
            </div>
            </Card>
            </Card>
          {/* AvailablDay */}
          <Card className='p-4 flex flex-col space-y-4'>
             <div className="space-y-2">
                <Label htmlFor="available-day">Available Day</Label>
                <Input
                id="available-day"
                value={availableDay}
                onChange={(e: { target: { value: string; }; }) => setAvailableDay(e.target.value)}
                type="text"
                placeholder="Enter your available day"
                />
            </div>
          {/* available time to book session */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="available-time">From Time</Label>
              <Input
                id="available-time"
                value={startTime}
                onChange={(e: { target: { value: string; }; }) => setStartTime(e.target.value)}
                type="time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="available-time">To Time</Label>
              <Input
              value={endTime}
                onChange={(e: { target: { value: string; }; }) => setEndTime(e.target.value)}
                id="available-time"
                type="time"
              />
            </div>
            </div>
          </Card>
           

            <Button type="submit" className="w-full">
             {
                loading ? (
                    <>
                     <Loader2 size={24} className='mr-2 animate-spin'/>
                    </>
                ) : 'Apply As Expert'
             }
            </Button>
        </form>
      </CardContent>
  
    </Card>
  );
};

export default ExpertApplicationForm;
