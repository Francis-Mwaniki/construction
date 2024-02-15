
import { Button } from "@/components/ui/button";
import { KanbanSquare, Loader2, LucideArrowDownRight, RefreshCcw } from "lucide-react";
import Link from "next/link"
import Contact from "./contact";
import { JSX, SVGProps, use, useEffect, useState } from "react"
import toast from "react-hot-toast";

interface ServiceProps {

    icon: JSX.Element;
    title: string;
    description: string;
  index: number;
}
interface Expert {
  id: number | boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  certifications: string;
  bio: string;
  services: string;
  verifiedWebsites: string[];
  availableDay: string;
  startTime: string;
  endTime: string;
  profilepicURL: string;
}


export default function Component() {
    const [allServices, setallServices] = useState <ServiceProps[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [picsNames, setpicsNames] = useState<string[]>([
        "Frank",
        "Carter",
        "Oliver",
        "Liam",
        "Noah",
        "Elijah",
        "William",
        "James",
    ]);
    const [allExperts, setallExperts] = useState<Expert[]>([]);
    const  [workTitles, setworkTitles] = useState<string[]>([
        "Project Manager",
        "Architect",
        "General Contractor",
        "Electrician",
        "Construction Worker",
        "Foreman",
        "Plumber",
        "Carpenter",
    ]);

    const services = [
        {
          icon: <HammerIcon className="h-10 w-10" />,
          title: 'Construction',
          description: 'Our experts provide high-quality construction services.',
        },
        {
          icon: <PaintbrushIcon className="h-10 w-10" />,
          title: 'Painting',
          description: 'Our experts provide high-quality painting services.',
        },
        {
          icon: <ScissorsIcon className="h-10 w-10" />,
          title: 'Renovation',
          description: 'Our experts provide high-quality renovation services.',
        },
        {
          icon: <WrenchIcon className="h-10 w-10" />,
          title: 'Maintenance',
          description: 'Our experts provide high-quality maintenance services.',
        },
        {
          icon: <BirdIcon className="h-10 w-10" />,
          title: 'Heavy Machinery',
          description: 'Our experts provide high-quality heavy machinery services.',
        },
        {
          icon: <HardHatIcon className="h-10 w-10" />,
          title: 'Safety',
          description: 'Our experts provide high-quality safety services.',
        },
        {
          icon: <BookTemplateIcon className="h-10 w-10" />,
          title: 'Design & Planning',
          description: 'Our experts provide high-quality design and planning services.',
        },
        {
          icon: <ToyBrickIcon className="h-10 w-10" />,
          title: 'Masonry',
          description: 'Our experts provide high-quality masonry services.',
        },
      ];

      // fetch all experts using fetch from api/expert/getAll
      const fetchExperts = async () => {
        try {
          setFetching(true);
        const res = await fetch('/api/auth/expert/getAll');
        const data = await res.json();
        if(data.status === 200){
          console.log("data",data.data);
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
          setallExperts(data.data);
          setFetching(false);
        }
        if(data.status === 400 || data.status === 500){
          toast.error('something went wrong', {
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
          setFetching(false);
          return;
        }
        } catch (error:any) {
          toast.error('Something went wrong',{
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
          setFetching(false);
          return;
          
        }
      }

      /* fetch all services using fetch from api/services/getall */
      const fetchServices = async () => {
        try {
          setFetching(true);
        const res = await fetch('/api/services/getall');
        const data = await res.json();
        if(data.status === 200){
          console.log("data",data.data);
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
          // before setallServices(data.data); i remove string from icon
           const newData = data.data.map((service:ServiceProps,index:number) => {
            return {
              ...service,
              icon: services[index].icon
            }
          }
          )
          setallServices(newData);
          console.log("newData",newData);
          
          setFetching(false);
        }
        if(data.status === 400 || data.status === 500){
          toast.error('something went wrong', {
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
          setFetching(false);
          return;
        }
        } catch (error:any) {
          toast.error('Something went wrong',{
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
          setFetching(false);
          return;
          
        }
      }
      useEffect( () => {
        fetchExperts();
         fetchServices();
      }
      , [
        
      ]);
      const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };
      const handleClickSection = (section:string,e: { preventDefault: () => void; } | undefined) => {
        e?.preventDefault();
        if(section === 'home-section'){
         scrollToSection('home-section')
        //  setIsOpen(false)
       }
       else if(section === 'contact-section'){
         scrollToSection('contact-section')
        //  setIsOpen(false)
       }
         else if(section === 'experts-section'){
            scrollToSection('experts-section')
          //  setIsOpen(false)
         }
       else if(section === 'projects-section'){
        scrollToSection('projects-section')
       //  setIsOpen(false)
      }
       else if(section === 'pricing-section'){
         scrollToSection('pricing-section')
        //  setIsOpen(false)
       }
       else if(section === 'services-section'){
         scrollToSection('services-section')
        //  setIsOpen(false)
       }
       else{
         return
       }
       }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <header className="flex items-center justify-between bg-white opacity-90  px-4 py-5 border-b fixed z-20 top-0 inset-x-0">
        <a onClick={handleClickSection.bind(null,'home-section')}  className="flex cursor-pointer items-center gap-2" >
          <ConstructionIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">ConSite </span>
        </a>
        <nav className="flex gap-4">
          <a onClick={handleClickSection.bind(null,'experts-section')} 
           className="text-sm cursor-pointer sm:text-lg font-medium hover:transition-all hover:bg-gray-200 rotate-0 hover:rotate-6 rounded-md  px-3 py-2 hover:underline transition-all duration-500 " >
            Experts
          </a>
          <a onClick={handleClickSection.bind(null,'services-section')}  className="text-sm cursor-pointer sm:text-lg font-medium hover:transition-all hover:bg-gray-200 rotate-0 hover:rotate-6 rounded-md  px-3 py-2 hover:underline transition-all duration-500 " >
            Services
          </a>
          <a onClick={handleClickSection.bind(null,'projects-section')}  className="text-sm cursor-pointer sm:text-lg font-medium hover:transition-all hover:bg-gray-200 rotate-0 hover:rotate-6 rounded-md  px-3 py-2 hover:underline transition-all duration-500 " >
            Projects
          </a>
          <a onClick={handleClickSection.bind(null,'contact-section')}  className="text-sm cursor-pointer sm:text-lg font-medium hover:transition-all hover:bg-gray-200 rotate-0 hover:rotate-6 rounded-md  px-3 py-2 hover:underline transition-all duration-500 " >
            Contact
          </a>
          <Link  className="text-sm cursor-pointer sm:text-lg font-medium hover:transition-all hover:bg-gray-200 rotate-0 hover:rotate-6 rounded-md  px-3 py-2 hover:underline transition-all duration-500 " href="/Login">
            Login / Register
          </Link>
          
        </nav>
      </header>
      <main className="flex-1">
        <section id="home-section" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to ConSite.
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our experts provide high-quality construction services.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md hover:transition-all bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Contact Us
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md hover:transition-all border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  <span>Learn More</span>
                  <LucideArrowDownRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="projects-section" className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Our Projects
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 ">
                  Explore our latest and greatest construction projects.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md hover:transition-all bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  <span>View Projects</span>
                  <KanbanSquare className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
       
        <section id="services-section" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 text-center flex justify-center items-center mx-auto">
                Our experts provide a wide range of services to meet your needs.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allServices.map((service:ServiceProps,index:number) => (
  <Link key={Date.now() + index} href={`/services/${encodeURIComponent(service.title)}`}>
    <div>
      <div className="container grid items-center rotate-0 hover:rotate-6 transition-all hover:ring-4  hover:ring-neutral-900 hover:scale-125 hover:z-20 hover:opacity-65 hover:bg-white hover:shadow-2xl justify-center gap-4 px-4 text-center md:px-6 duration-500 shadow-lg rounded-lg p-3 shadow-gray-200 hover:shadow-gray-400 hover:cursor-pointer">
        {service.icon}
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
      </div>
    </div>
  </Link>
))}



            </div>
            {fetching && (
 <div className="flex sm:flex-row  flex-col items-center justify-center space-y-4 text-center mx-auto w-full p-2 flex-grow">
 <Loader2 className="h-10 w-10 animate-spin" />
</div>


)}
          </div>
        </section>
        <section id="experts-section" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Find Expert</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our experts are a team of experienced construction professionals.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {
  allExperts.map((expert:Expert,index:number) => (
    //id 
    <Link key={Date.now() + index}
     href={`/Experts/${encodeURIComponent(expert?.id)}`}>
    <div key={Date.now() + index}
     className="container grid items-center justify-center gap-4 rotate-0 hover:rotate-6 transition-all hover:ring-4  hover:ring-neutral-900 hover:scale-125 hover:z-20  hover:bg-white hover:shadow-2xl px-4 text-center md:px-6 duration-500  shadow-lg rounded-lg p-3 shadow-gray-200 hover:shadow-gray-400 hover:cursor-pointer">
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={expert.profilepicURL}
        alt="Person"
      />
      <h3 className="text-lg font-bold">{
        expert.firstName + " " + expert.lastName
      }</h3>
      <p className="text-gray-500 dark:text-gray-400">
       {
          expert.bio
       }
      </p>
      <button className="inline-flex items-center rotate-0 hover:rotate-45    justify-center h-9 w-9 rounded-full bg-gray-900 text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
        </svg>
    </button>
    </div>
    </Link>
  ))
  
}




               
              </div>
              {/* load more */}
  {/* <div className="flex  my-4 mx-auto items-center justify-center ">
    <Button className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
    <span className="text-sm font-medium">Load More</span>
    <RefreshCcw className="h-5 w-5 ml-2" />
    </Button>
</div> */}
            </div>
            {fetching && (
 <div className="flex sm:flex-row  flex-col items-center justify-center space-y-4 text-center mx-auto w-full p-2 flex-grow">
 <Loader2 className="h-10 w-10 animate-spin" />
</div>


)}
          </div>
        </section>
         {/* contact */}
         <section id="contact-section" className="w-full sm:w-1/2 mx-auto py-12 md:py-24 lg:py-32">
            <Contact />
            </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ConSite . All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function BirdIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  )
}


function BookTemplateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 22h-2" />
      <path d="M20 15v2h-2" />
      <path d="M4 19.5V15" />
      <path d="M20 8v3" />
      <path d="M18 2h2v2" />
      <path d="M4 11V9" />
      <path d="M12 2h2" />
      <path d="M12 22h2" />
      <path d="M12 17h2" />
      <path d="M8 22H6.5a2.5 2.5 0 0 1 0-5H8" />
      <path d="M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8" />
    </svg>
  )
}


function ConstructionIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="8" rx="1" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <path d="M10 14 2.3 6.3" />
      <path d="m14 6 7.7 7.7" />
      <path d="m8 6 8 8" />
    </svg>
  )
}


function HammerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
    </svg>
  )
}


function HardHatIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
      <path d="M14 6h0a6 6 0 0 1 6 6v3" />
    </svg>
  )
}


function PaintbrushIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
      <path d="M14.5 17.5 4.5 15" />
    </svg>
  )
}


function ScissorsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  )
}


function ToyBrickIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="12" x="3" y="8" rx="1" />
      <path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" />
      <path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" />
    </svg>
  )
}


function WrenchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
