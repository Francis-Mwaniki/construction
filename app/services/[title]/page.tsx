"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React from "react";
import { ArrowLeft, Loader2, Quote } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import VerticalLoader from "@/app/components/verticalLoader";
type Props = {
    params:{
      title: string;

    }
  };
  interface Service {
    id: number;
    name: string;
    projects: Project[];
   links: Links[];
  }
  
  interface Project {
    id: number;
    name: string;
    description: string;
    provider: string;
  }
  interface Links {
    id: number;
    url : string;
  }
  interface ServiceResponse {
    status: number;
    message: string;
    data: Service[];
  }  
export default function Component ({params}:Props) {
    const [decodeTitle, setDecodeTitle] = React.useState<string>("");
    const [allServices, setallServices] = React.useState<Service[]>([]);
    const [fetching, setFetching] = React.useState<boolean>(false);

    React.useEffect(() => {
        setDecodeTitle(decodeURIComponent(params.title));
    }, [params.title]);
        /* fetch all services using fetch from api/services/getall */
        const fetchService = async () => {
          if(!decodeTitle){
            return;
          }
          try {
            setFetching(true);
          const res = await fetch('/api/services/getservice',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title:decodeTitle})
          });
          
          const data = await res.json();
          if(data.status === 200){
            console.log("data",data);
            
         
            setallServices(data.data);
            console.log("newData",allServices);
            
            setFetching(false);
          }
          if(data.status === 400 || data.status === 500){
            alert(data.message);
            setFetching(false);
            return;
          }
          } catch (error:any) {
            alert(error.message);
            setFetching(false);
            return;
            
          }
        }
        React.useEffect( () => {
           if(!decodeTitle){
             return;
           }
           setTimeout(() => {
            fetchService();
           }
            , 1000);

        }
        , [
          decodeTitle
        ]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800">
      <a href="/" className="text-gray-600 dark:text-gray-200 flex justify-center 
      hover:underline
      items-center flex-row hover:text-gray-700 dark:hover:text-gray-300">
         <ArrowLeft className="inline-block w-4 h-4 ml-1" />
          <span>Home</span>
        </a>
        <h1 className="text-2xl font-bold">Our Services</h1>
      </header>
      <main className=" p-6 space-y-12 px-2 sm:px-32  mx-auto">
        <section className="rounded-lg m-4 p-10 bg-white shadow-lg dark:bg-gray-800">
          {/* qoute
          "Construction may encompass a wide variety of activities, from laying down bricks to putting up high-rise buildings, but all construction projects share one common characteristic: They are all aimed at building something tangible and lasting." - Unknown
          */}
          
          <i className="text-gray-600 dark:text-gray-400 p-6">
            <Quote className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          Construction may encompass a wide variety of activities, from laying down bricks to putting up high-rise buildings, but all construction projects share one common characteristic: They are all aimed at building something tangible and lasting." - Unknown
            {/* <Quote className="w-6 h-6 text-gray-700 dark:text-gray-300" /> */}
          </i>
       

          </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {fetching && (
        <div className="flex items-center text-center justify-center w-full h-full my-auto mx-auto">
          <div>
             <Loader2 className="w-10 h-10  text-gray-700 dark:text-gray-300 animate-spin" />
          </div>
          <div>
             <Loader2 className="w-10 h-10  text-gray-700 dark:text-gray-300 animate-spin" />
          </div>
          <div>
             <Loader2 className="w-10 h-10  text-gray-700 dark:text-gray-300 animate-spin" />
          </div>
          <div>
             <Loader2 className="w-10 h-10  text-gray-700 dark:text-gray-300 animate-spin" />
          </div>
         
          </div>
      ) }
        <div className="grid grid-cols-1 px-4 py-6">
   
      {!fetching  && (
        allServices.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.projects.map((project) => (
                  <li key={project.id}>
                    <h3 className="
                     text-xl bg-gradient-to-r from-green-700 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent
                    ">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="gap-4 flex  items-center justify-center">
              {
                service.links.map((link) => (
                  <Link 
                  className="bg-black rounded px-5 py-3 text-white
                  hover:bg-gray-800
                   "
                  href={link.url} key={link.id}>
                  <span className=" hover:underline">Visit Website</span>
                </Link>
                ))
              }
            </CardFooter>
          </Card>
        ))
      )}
    </div>
        </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">
                {decodeTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We provide high-quality {decodeTitle} services. Our team of professional  will bring out the charm of
          any space. We know the ins and outs of {decodeTitle} like no one else, and our knowledge can make the
              difference between a successful project and a costly one.
            </p>
            <img
          alt="service"
              className="w-full h-64 object-cover rounded-md"
              height="200"
              src="https://img.lexica.art/eedb4d34-a572-472b-8ca6-380f0ee94ba4_full.webp"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <p className="text-gray-600 dark:text-gray-400">
          Our {decodeTitle} services include both interior and exterior , drywall repair, wallpaper removal, and
              more. We use only the highest quality materials and our team is dedicated to delivering exceptional
              results.
            </p>
          </div>
          {/* <div className="border-t p-6 space-y-4">
            <h3 className="text-lg font-bold">Pricing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our pricing is flexible and depends on the size of the project. Contact us for a quote.
            </p>
          </div> */}
        </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Request Service</h2>
            <form className="space-y-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="john@example.com" type="email" />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="details">Project Details</Label>
                <Textarea id="details" placeholder={`I need a ${decodeTitle} service.`}
                />
              </div>
              <Button className="w-full" >
                Submit Request
              </Button>
            </form>
          </div>
        </section>
        {/* <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Payment</h2>
            <p className="text-gray-600 dark:text-gray-400">
              After your service request is approved, you can make a payment through our secure payment portal. We
              accept all major credit cards and use Stripe for processing payments.
            </p>
           
            <Button>Go to Payment</Button>
          </div>
        </section> */}
      </main>
      <footer className="p-6 bg-white dark:bg-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400">© 2024 Our Services. All rights reserved.</p>
      </footer>
    </div>
  )
}

