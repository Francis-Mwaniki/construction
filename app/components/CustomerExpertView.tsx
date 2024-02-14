"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

type Props = {
    params:{
      username: string | "francis"
    }
  };
export default function Component ({params}:Props) {
    const [decodeUsername, setDecodeUsername] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [details, setDetails] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userId, setUserId] = React.useState<number>(0);

    React.useEffect(() => {

      if(localStorage.getItem('userId')){
        setUserId(parseInt(localStorage.getItem('userId') as string));
      }
    
    }, []);
    React.useEffect(() => {
        setDecodeUsername(decodeURIComponent(params.username));
    }, [params.username]);
    

    const submitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let servicesId = JSON.parse(localStorage.getItem('servicesId')!);
      console.log("serviceid to be sent",servicesId);
      
      
      if(!name || !email || !details){
       
        toast.error("Please fill all fields", {
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
        return;
      }
      try {
        setLoading(true);
      const res = await fetch('/api/services/requestservice',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,details,
        servicesId:JSON.parse(localStorage.getItem('servicesId')!)
          ,userId})
      });
      
      const data = await res.json();
      if(data.status === 200){
        toast.success(data.message, {
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
        console.log("data",data);
        setLoading(false);
        setName("");
        setEmail("");
        setDetails("");
      }
      if(data.status === 400 || data.status === 500){
        
        toast.error(data.message, {
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
        setLoading(false);
        return;
      }
      } catch (error:any) {
        toast.error(error.message, {
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
        setLoading(false);
        return;
        
      }
    }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800">
      <a href="/" className="text-gray-600 dark:text-gray-200 flex justify-center 
      hover:underline
      items-center flex-row hover:text-gray-700 dark:hover:text-gray-300">
         <ArrowLeft className="inline-block w-4 h-4 ml-1" />
          <span>Home</span>
        </a>
        <h1 className="text-2xl font-bold">Expert Profile</h1>
        {/* go home */}
      
      </header>
      
      <main className="flex-1 p-6 space-y-12">
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Our Expert
            {" "}
            ({decodeUsername})
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our expert provides high-quality construction services. With a wide range of skills, he is equipped to
              handle a variety of construction projects.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* <img
                alt="Expert profile"
                className="w-full h-64 object-cover rounded-md"
                height="100"
                src="https://image.lexica.art/full_webp/0797c1b8-b3ec-419c-b45b-652058f0c4df"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              /> */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Expert's Profile</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our expert, {
                        decodeUsername
                  }, has a degree in Civil Engineering and a Masters in Construction Management. He
                  is known for his meticulous attention to detail and commitment to quality.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Services include building construction, renovation, interior design, project management, and more. With a
              commitment to quality and customer satisfaction, our expert ensures each project is completed to the
              highest standards.
            </p>
          </div>
        </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Experience & Accreditations</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our expert has over 10 years of experience in the construction industry and holds several accreditations
              from reputable construction bodies. He is a certified construction manager and a member of the
              Construction Management Association.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <img
                alt="Accreditations"
                className="w-full h-64 object-cover rounded-md"
                height="100"
                src="https://image.lexica.art/full_webp/1c18864f-8e0a-48e0-b3aa-7b34fbc635a0"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <div>
                <h3 className="text-lg font-bold">Accreditations</h3>
                <p className="text-gray-600 dark:text-gray-400">
           
            ({decodeUsername})
                 {" "}
                  is a certified construction manager and a member of the Construction Management Association. He
                  also holds a LEED AP certification.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              He has worked on a variety of projects, ranging from residential buildings to commercial properties, and
              has a proven track record of delivering projects on time and within budget.
            </p>
          </div>
        </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Work Timelines</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Below is a timeline of the projects our expert has completed:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold">2023:</span>
                <span>Completed construction of a 20-story commercial building in downtown.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">2022:</span>
                <span>Renovated a historical residential building, preserving its original architecture.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">2021:</span>
                <span>Managed the construction of a new residential complex, including 50 apartments.</span>
              </div>
            </div>
          </div>
        </section>
      
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800 mx-auto w-full sm:max-w-xl">
        <p className="text-gray-600 dark:text-gray-400 p-6 space-y-4">
              To provide the best service, our expert requires detailed information about the project, including the
              scope of work, budget, and timeline. This helps him plan and execute the project efficiently.
            </p>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Request Service</h2>
            <form className="space-y-4" onSubmit={(e) => submitRequest(e)}>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder={`Your name`} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="john@example.com" type="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="details">Project Details</Label>
                <Textarea id="details" placeholder={`I need a service.`}
                onChange={(e) => setDetails(e.target.value)} />
              </div>
              <Button
              disabled={loading}
               className="w-full" type="submit">
               {
                  loading ? (
                    <Loader2 className="w-10 h-10   animate-spin" />
                  ) : "Submit Request"
               }
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="p-6 bg-white dark:bg-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400">© 2024 Expert Profile. All rights reserved.</p>
      </footer>
    </div>
  )
}

