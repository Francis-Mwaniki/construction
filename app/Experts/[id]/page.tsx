"use client"; 
import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { JSX, SVGProps, useEffect, useState } from "react"
import Image from "next/image"
import React from "react"
import DeleteComponent from "../../components/DeleteProfile"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import { ArrowRight, Contact2Icon, Edit2Icon, ExternalLink, Loader2, LogOut, Mail, MapPin, User, Verified, X } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/app/components/loader";
import RequestCard from "@/app/components/RequestCards";
type Props={
  params:{
    id: number
  }
}
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
interface ExpertProfile {
id : number;
firstName: string;
lastName: string;
email: string;
certifications: string[];
services: string[];
bio: string;
password: string;
verifiedWebsites: string[];
availableDay: string;
startTime: string;
endTime: string;
profilepicURL: string;
projectss: string[];
location: string;

}
interface ServiceProps {

  icon: JSX.Element;
  title: string;
  description: string;
index: number;
id: number;
}
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
  expertId: number;
}
export default function Component({params}:Props) {
  const { id } = params
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [cloudinaryImgUrl, setCloudinaryImgUrl] = useState('')
  const [isUploadingError, setIsUploadingError] = useState(false)
  const [isUploadingSuccess, setIsUploadingSuccess] = useState(false)
  const [uploadErrorMessage, setUploadErrorMessage] = useState('')
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [editBio, setEditBio] = useState(false)
  const [editCertification, setEditCertification] = useState(false)
  const [editService, setEditService] = useState(false)
  const [editProjects, setEditProjects] = useState(false)
  const [editWebsites, setEditWebsites] = useState(false)
  const [editDay, setEditDay] = useState(false)
  const [editStartTime, setEditStartTime] = useState(false)
  const [editTime, setEditTime] = useState(false)
  const [service, setServices] = useState<ServiceProps>({
    icon: <span></span>,
    title: '',
    description: '',
    index: 0,
    id: 0
  })
  const availableHours = Array.from({ length: 10 }, (_, index) => index + 8);
  const [curatedServices, setCuratedServices] = useState<ServiceProps[]>([])
  const [isFetchingServices, setFetching] = useState(false)
  const [isFetchingService, setFetchingService] = useState(false)
  const [selectedService, setSelectedService] = useState<Service[]>([])
  const [isExpert, setIsExpert] = useState(false)
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [isCheckingHour, setIsCheckingHour] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState('');
  const [isBookingError, setIsBookingError] = useState('');
  const [isBookingInfo, setIsBookingInfo] = useState(false);
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [isFetchingRequests, setIsFetchingRequests] = useState(false);

  const [user, setUser] = useState<ExpertProfile>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    certifications: [],
    services: [],
    bio: '',
    password: '',
    verifiedWebsites: [],
    availableDay: '',
    startTime: '',
    endTime: '',
    profilepicURL: '',
    projectss: [],
    location: ''
  })
  const [newUser, setNewUser] = useState<ExpertProfile>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    certifications: [],
    services: [],
    bio: '',
    password: '',
    verifiedWebsites: [],
    availableDay: '',
    startTime: '',
    endTime: '',
    profilepicURL: '',
    projectss: [],
    location: ''
  })

  //fetching all requests booked by user
  const fetchRequests = async () => {
    setIsFetchingRequests(true)
    const res = await fetch(`/api/admin/experts/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    const data = await res.json();
    console.log("request",data);

    if (data.status === 200) {
      const requests: Request[] = data.data;
      setRequests(requests);
      console.log(requests);
      setIsFetchingRequests(false);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsFetchingRequests(false);
      console.log(data.message);
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
  };
  const getMeetingLink = () => {
    const randomString = Math.random().toString(36).substring(7);
    return `https://construction-ruby.vercel.app/meeting/${randomString}`;
  }


  const handleBooking = async (e: any) => {
    e.preventDefault();
    if(!bookingName || !bookingEmail){
      setIsBooking(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/booking
    setIsBooking(true);
    const res = await fetch(`/api/auth/expert/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        name: bookingName,
        email: bookingEmail,
        message: bookingMessage,
        hour: selectedHour,
        expertId: id,
        expertEmail: user.email,
        expertName: `${user.firstName} ${user.lastName}`,
        shareMeetingLink: getMeetingLink()
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsBooking(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsBooking(false);
      console.log(data.message);
      toast.error(`${data.message}`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        duration: 4000,
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
        
      });
    }
  }

  

  // const handleHourCheck = async (hour: number) => {
  //   // /api/auth/expert/check_hour
  //   const res = await fetch(`/api/auth/expert/check_hour`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ hour })
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   if (data.status === 200) {
  //     console.log(data.message);
  //     toast.success(`${data.message}`, {
  //       style: {
  //         border: '1px solid #713200',
  //         padding: '16px',
  //         color: '#713200',
  //       },
  //       duration: 4000,
  //       iconTheme: {
  //         primary: '#713200',
  //         secondary: '#FFFAEE',
  //       },
        
  //     });
  //   }

  //   if (
  //     data.status === 400 ||
  //     data.status === 500 ||
  //     data.status === 404 ||
  //     data.status === 401 ||
  //     data.status === 405
  //   ) {
  //     toast.error(`${data.message}`, {
  //       style: {
  //         border: '1px solid #713200',
  //         padding: '16px',
  //         color: '#713200',
  //       },
  //       duration: 4000,
  //       iconTheme: {
  //         primary: '#713200',
  //         secondary: '#FFFAEE',
  //       },
        
  //     });
  //   }
  // };

  useEffect(() => {
    if(selectedHour !== null){
      setIsCheckingHour(true);
  
     // api call to check if the hour is available -api/auth/expert/bookings/precheck
      const url = `/api/auth/expert/booking/precheck`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id, hour:selectedHour })
      }
      fetch(url,options).then(res => res.json()).then(data => {
        if(data.status === 200){
          setIsCheckingHour(false);
          setIsBookingSuccess(data.message);
         toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },

        });
        setTimeout(() => {
          setIsBookingSuccess('');
        }
        , 4000);
        }
        if(data.status === 400 || data.status === 500){
          setIsCheckingHour(false);
          setIsBookingError(data.message);
          toast.error(`${data.message}`, {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            duration: 4000,
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
            
          });

          setTimeout(() => {
            setIsBookingError('');
          }
          , 4000);
        }
      }
      ).catch(error => {
        setIsCheckingHour(false);
        setIsBookingError('Something went wrong');
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
      });
    }
  }
  , [
    selectedHour
  ]);

 
  const handleHourClick = (hour: number ) => {
    if (selectedHour !== hour) {
      setSelectedHour(hour);
       
    } else {
      // If the same hour is clicked again, unselect it
      setSelectedHour(null);
    }
  }


  const updateBio = async (e: any) => {
    e.preventDefault();
    // /api/auth/expert/updateProfile
     if(!newUser.bio){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },

      })
    

      return
    }
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateBio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        bio: newUser.bio


       })
    });
  




    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  }
  

  const updateCertification = async (e: any) => {
    e.preventDefault();
    if(!newUser.certifications){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateCertification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        certifications: newUser.certifications
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  };

  const updateService = async (e: any) => {
    e.preventDefault();
    if(!newUser.services){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        services: newUser.services
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  };

  const updateProjects = async (e: any) => {
    e.preventDefault();
    if(!newUser.projectss){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateProjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        projectss: newUser.projectss
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  };

  const updateWebsites = async (e: any) => {

    e.preventDefault();
    if(!newUser.verifiedWebsites){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateWebsites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        verifiedWebsites: newUser.verifiedWebsites
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  };

  const updateDay = async (e: any) => {
    e.preventDefault();
    if(!newUser.availableDay){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateAvailableDay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        availableDay: newUser.availableDay
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  };


  const updateTime = async (e: any) => {
    e.preventDefault();
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    if(!newUser.startTime || !newUser.endTime){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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

    const res = await fetch(`/api/auth/expert/updateTime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        startTime: newUser.startTime,
        endTime: newUser.endTime
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  }

  const updateProfile = async (e: any) => {
    e.preventDefault();
    // email, firstName, lastName
    if(!newUser.email || !newUser.firstName || !newUser.lastName){
      setIsUpdating(false);
      toast.error('Please fill in all fields',{
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
    // /api/auth/expert/updateProfile
    setIsUpdating(true);
    const res = await fetch(`/api/auth/expert/updateProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
       })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUpdating(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUpdating(false);
      console.log(data.message);
    }
  }



  const handleCertification = (e: any) => {
    e.preventDefault();
    setEditCertification(!editCertification);
  }

  const handleService = (e: any) => {
    e.preventDefault();
    setEditService(!editService);
  }

  const handleProjects = (e: any) => {
    e.preventDefault();
    setEditProjects(!editProjects);
  }

  const handleWebsites = (e: any) => {
    e.preventDefault();
    setEditWebsites(!editWebsites);
  }

  const handleDay = (e: any) => {
    e.preventDefault();
    setEditDay(!editDay);
  }

  const handleEndTime = (e: any) => {
    e.preventDefault();
    setEditTime(!editTime);
  }

  const handleStartTime = (e: any) => {
    e.preventDefault();
    setEditStartTime(!editStartTime);
  }
  const handleBio = (e: any) => {
    e.preventDefault();
    setEditBio(!editBio);
  }

  
  /* logout */
  const logout = async () => {
    try {
      localStorage.removeItem('isExpert');
      localStorage.removeItem('user');
      router.push('/Login');
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
      return;
    }
  }


  useEffect(() => {
    if (localStorage.getItem('isExpert')) {
      setIsExpert(true);
    }
    fetchRequests();
  }
  , [
    router
  ]);

     /* fetch all services using fetch from api/services/getall */
     const fetchServices = async () => {
      try {
        setFetching(true);
      const res = await fetch('/api/services/getall');
      const data = await res.json();
      if(data.status === 200){
        console.log("data",data.data);
  
        // before setCuratedServices(data.data); i remove string from icon
         const newData = data.data.map((service:ServiceProps,index:number) => {
          return {
            ...service,
            icon: <span>{service.icon}</span>
          }
        }
        )
        setCuratedServices(newData);
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

    //fetch  service selected by user -use id to fetch service
    const fetchService = async (id : number) => {
      if(!id){
        return;
      }
      setFetchingService(true);
      try {
        const url = `/api/services/getserviceById`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id:id })
        }

       
      const res = await fetch(url,options);
      const data = await res.json();
      if(data.status === 200){
        console.log("data",data.data);
        setSelectedService(data.data);
        setFetchingService(false);

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
        setFetchingService(false);
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
        setFetchingService(false);
        return;
        
      }
    }

    useEffect( () => {
     
    }
    , [
      service
    ]);

    useEffect( () => {
       fetchServices();
    }
    , [
      
    ]);
  const [localUserData, setLocalUserData] = useState('')
  const [image, setImage] = useState('')
  const handleZoom = () => {
    setIsOpen(true)
  }
  const handlePreviewZoom = () => {
    setIsPreviewOpen(true)
  }


const browseImageOnly = (e: any) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImg(reader.result)
    }
    reader.readAsDataURL(file)
  }
}

  

  React.useEffect(() => {
    if (user?.id) {
      setIsOnline(true);
    }
  }, [user?.email]);

  React.useEffect(() => {
    if (user?.profilepicURL) {
      setImage(user?.profilepicURL);
    }
    if (previewImg) {
      setImage(previewImg.toString());
    }
  }, [user?.profilepicURL, previewImg]);

  React.useEffect(() => {
    if (cloudinaryImgUrl) {
      setCloudinaryImgUrl(cloudinaryImgUrl);
    }
  }, [cloudinaryImgUrl]);

  const uploadOnlyImage = async () => {
    // /api/auth/profile/upload_profile_pic
    setIsUploading(true);
    const res = await fetch(`/api/auth/profile/upload_profile_pic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id,

         profile_pic: cloudinaryImgUrl 
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 200) {
      setIsUploading(false);
      console.log(data.message);
      setTimeout(() => {
        toast.success('Nice profile kudos!', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
        setTimeout(() => {
          window.location.reload();
        }
        , 600)
      }, 4000);
    }

    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsUploading(false);
      console.log(data.message);
    }
  }


  //fetch  user data
  const GetUser = async (id : number) => {
    // /api/auth/profile
    setIsFetching(true);
    const res = await fetch(`/api/auth/expert/expertProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  
    const data = await res.json();
    console.log(data);
  
    if (data.status === 200) {
      const user: ExpertProfile = data.data;
      setUser(user);
      console.log(user);
      setIsFetching(false);
    }
  
    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsFetching(false);
      console.log(data.message);
    }
  };

  React.useEffect(() => {
    GetUser(id);
  }, [id]);
  const handleUploadSuccess = (uploadedUrl: string) => {
    setCloudinaryImgUrl(uploadedUrl);
    setIsUploadingSuccess(true);
    toast.success('successfully converted', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      duration: 4000,
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
      
    });
    setTimeout(() => {
      setIsUploadingSuccess(false);
      setUploadSuccessMessage('');
    }, 3000);
  };

  const handleDelete = async () => {
    if(!user?.email){
      setIsDeleting(false);
      toast.error('Please fill in all fields',{
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
    setIsDeleting(true);
    const res = await fetch(`/api/auth/expert/delete_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user?.email })
    });
  
    const data = await res.json();
    console.log("log",data);
  
    if (data.status === 200) {
      setIsDeleting(false);
      console.log(data.message);
      localStorage.removeItem('user');
      setTimeout(() => {
        new Audio('/soundplan.wav').play()
        toast.success(`${data.message}`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          duration: 4000,
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
          
        });
        setTimeout(() => {
         router.push('/loginAsExpert')
        }
        , 600)
      }, 4000);
    }
  
    if (
      data.status === 400 ||
      data.status === 500 ||
      data.status === 404 ||
      data.status === 401 ||
      data.status === 405
    ) {
      setIsDeleting(false);
      console.log(data.message);
      toast.error(`${data.message}`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        duration: 4000,
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
        
      });
    }
  };
  return (
    <>
    {
      /* fetching skeleton */
      isFetching && (
        <div className="">
          <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader />
        </div>
        </div>
      )
    }
    {
      /* fetching skeleton */
      !isFetching && (
       <div className="flex flex-col w-full min-h-screen p-4 md:p-6">
      {/* dialog for image on zoom */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl h-full overflow-hidden">
            <button
              className="absolute top-0 right-0 z-50 flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-gray-900 rounded-full"
              onClick={() => setIsOpen(false)}
            >
             <X className=" h-7 text-white" />
            </button>
            <div className="relative w-full h-full">
              <img
                  src={`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`}
                alt=""
                width={100} height={100}
                className="w-full h-full"
              />
              {
                 /* fetching image skeleton */
                !user?.profilepicURL && (
                  <div className="absolute  inset-0 flex items-center justify-center w-full h-full bg-gray-500 animate-pulse"></div>
                )
              }
            </div>
          </div>
        </div>
      )}
      {/* dialog for image on zoom */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="relative w-full max-w-3xl h-full overflow-hidden">
          <button
            className="absolute top-0 right-0 z-50 flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-gray-900 rounded-full"
            onClick={() => setIsPreviewOpen(false)}
          >
           <X className=" h-7 text-white" />
          </button>
          <div className="relative w-full h-full">
          <Image
                src={previewImg ? previewImg.toString() : image}
                alt=""
                layout="fill"
                objectFit="contain"
                className="w-full h-full"
              />
           
          </div>
        </div>
      </div>
       
      )}
      {/* header */}
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
       
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2 relative">
          <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">
            Expert Profile
            {
              isExpert && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 px-2">(Expert View Only)</span>
              )
            }
            {
              !isExpert && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 px-2">(
                  <a className="text-blue-500 dark:text-blue-300 hover:underline" href="/loginAsExpert">
                   Login as Expert
                  </a>
                  { ' '}
                  to view expert profile
                )</span>
              )
            }
          </h2>
          {
            isExpert && (
              <div className="flex items-center justify-end gap-4">
               Logged in as {user?.email}
              </div>
            )
          }
          {/* isExpert logout */}
          {
            isExpert && (
              <div className="flex items-center justify-end gap-4">
                <a onClick={logout}>
                  <Button className="flex items-center gap-2">
                    <span>Logout</span>
                    <LogOut className="w-5 h-5" />
                  </Button>
                </a>
               
              </div>
            )
          }
          </div>
        </div>
      
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
            <Link className="font-semibold text-gray-900 dark:text-gray-50" href="#">
              
            </Link>
            <Link href="#"></Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
               
                
      {/* img */}
      <div className="max-w-6xl w-full mx-auto grid gap-2 relative">
          <div className="flex items-center justify-center flex-col gap-y-2">
      
          <div className="relative">
  <img 
    src={`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`}
    alt="" 
    width={100} height={100}
    onClick={handleZoom}
    className=" w-32 h-32 rounded-full 
    object-cover object-center
    p-2
    border-2 border-blue-100 dark:border-blue-100
    transition duration-300 ease-in-out
    
    hover:scale-105 hover:rotate-12
    transform hover:shadow-xl
    cursor-pointer"
  />
  {isOnline && (
  <>
    <div className="absolute bottom-0 right-5 ml-0 mb-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
    <div className="absolute bottom-0  right-5 ml-0 mb-0 w-3 h-3 bg-green-500 rounded-full"></div>
  </>
  )}
</div>




                <div className="flex items-center justify-center">
                  <Badge className="bg-green-500">online</Badge>
                  {/* isOnline buble pulsing */}
                
                  </div>
            
          </div>
          
        </div>
               
              </CardHeader>
             {
              isExpert && (
                <Card className="p-2 border border-gray-200 m-2">

                  <CardTitle>Expert Credentials</CardTitle>
                
                <CardDescription>Update your profile information.</CardDescription>
                <CardContent className="space-y-4 ">
                {
                        user?.id && (
                          <div className=" my-7">
                             <Badge className="bg-green-500 inline-flex items-center gap-1">
                                <span>Verified</span>
                                <Verified className="w-5 h-5 text-white" />
                             </Badge>
                          </div>
                        )
                     }
                
                <form className="space-y-4" onSubmit={updateProfile}>
                  <div className="space-y-2 gap-x-3 flex-row gap-y-2 flex  justify-start  items-start ">
                    <Label htmlFor="name">Full Name</Label>
                    
                    <div>
                <Input
                 value={newUser.firstName ? newUser.firstName : user?.firstName}
                  id="name" placeholder={user?.firstName}
                  type="text"
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value})}
                />
                    </div>
                    <div>
                      <Input 
                      value={newUser.lastName ? newUser.lastName : user?.lastName}
                      id="name" placeholder={user?.lastName}
                      type="text"
                      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value})}
                      />
                    </div>
                   
                     
                     {
                      /* fetching input skeleton */
                      !user?.firstName && (
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                      )
                     }
                  
                  </div>
                  
                   
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                        value={newUser.location ? newUser.location : user?.location}
                        placeholder={user?.location}
                        onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                         id="location" type="text" />
                         {
                           /* fetching input skeleton */
                            !user?.location && (
                              <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                            )
                         }
                      </div>
                    
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    value={newUser.email ? newUser.email : user?.email}
                    placeholder={user?.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                     id="email" type="email" />
                     {
                       /* fetching input skeleton */
                        !user?.email && (
                          <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                        )
                     }
                  </div>
                 
                  <div className="space-y-2">
                    {
                      /* is uploading */
                      isUploading && (
                        /* loading progress */
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse">
                          <span className="text-gray-500">{uploadProgress}%</span>
                        </div>
                      )
                    }
                    {
                      /* is uploading error */
                      isUploadingError && (
                        <span className="text-red-500">{uploadErrorMessage}</span>
                      )
                    }
                    {
                      /* is uploading success */
                      isUploadingSuccess && (
                        <span className="text-green-500">{uploadSuccessMessage}</span>
                      )
                    }
                    {
                      /* preview */
                      previewImg && (
                        <div className="relative w-40 mx-auto h-40">
                          <Image
                            src={previewImg.toString()}
                            alt=""
                            onClick={handlePreviewZoom}
                            layout="fill"
                            objectFit="contain"
                            className="w-40 h-40 rounded-full ring-4 ring-blue-700 cursor-pointer
                            object-cover object-center
                  border-2 border-blue-200 dark:border-blue-800
                  transition duration-300 ease-in-out
                    dark:ring-blue-800
                  hover:scale-105 hover:rotate-90
                  transform hover:shadow-xl
                  
                            "
                          />
                        </div>
                      )
                    }
              
                    {/* <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input id="profilePicture"
                      onChange={browseImageOnly}
                     placeholder="Upload your picture" type="file"
                      accept="image/*"
                      /> */}
                  </div>
                  <div className="space-y-2 flex w-full">
                    <Button
                    className=" justify-self-center flex justify-center items-center mx-auto w-full"
                      type="submit"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (<div className="flex items-center justify-center gap-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Updating...</span>
                      </div>) : 'Update'}
                    </Button>
                    </div>
                </form>
                </CardContent> 
                </Card>
                
              )
             }
             {
              isExpert && (<>
              <CardDescription className=" font-extrabold text-2xl justify-center items-center mx-auto flex m-2">
                All Booking Requests
              </CardDescription>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">

                {requests.map((request) => (
                  <RequestCard key={request.id} request={request}
                  expertId={user?.id}
                   />
                ))}
              </div>
              </>)
             }
             {
              isFetchingRequests && isExpert && (
                <div className=" flex justify-center items-center mx-auto">
                 <Loader2 className=" animate-spin" size={30} />
                </div>
              )
             }
             {
              requests.length === 0 && isExpert && (
                <div className=" flex justify-center items-center mx-auto">
                  <span className="text-gray-500 dark:text-gray-400">No requests</span>
                </div>
              )
             }
             {

             }
             {
              !isExpert && (
                <Card className="p-2 m-2">
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Card className=" p-2 ">
                        <CardTitle>Name</CardTitle>
                        <CardDescription className="flex items-start gap-x-2 m-2 justify-start">
                          <Badge className=" bg-transparent text-black h-5 font-medium hover:bg-transparent text-lg ">
                          {user?.firstName + ' ' + user?.lastName}
                          </Badge>
                          {/* user */}
                           <span className=" text-black no-underline ">
                            <User className="w-5 h-5" />
                          </span>
                        </CardDescription>
                      </Card>
                    </div>
                    <div className="space-y-2">
                      <Card className=" p-2 ">
                        <CardTitle>Email</CardTitle>
                        <CardDescription className="flex items-start gap-x-2 m-2 justify-start">
                          <Badge className=" bg-transparent h-5 text-black hover:bg-transparent text-lg font-medium">
                          {user?.email}
                          </Badge>
                          {/* email directly*/}
                          <a href={`mailto:${user?.email}`} className=" text-black no-underline ">
                            <Mail className="w-5 h-5" />
                          </a>
                        </CardDescription>
                      </Card>
                    </div>
                    <div className="space-y-2">
                      <Card className=" p-2 ">
                        <CardTitle>Location</CardTitle>
                        <CardDescription className="flex items-start gap-x-2 m-2 justify-start">
                          <Badge className=" bg-transparent h-5 text-black hover:bg-transparent text-lg font-medium">
                          {user?.location}
                          </Badge>
                          {/* location */}
                          <span className=" text-black no-underline ">
                            <MapPin className="w-5 h-5" />
                          </span>
                        </CardDescription>
                      </Card>
                    </div>
                  
                  </CardContent>
                </Card>
              )
             }
              
             
              {/* <CardFooter>
                {
                  previewImg && (
                   <UploadProfile previewImg={previewImg}  onUploadSuccess={handleUploadSuccess}/>
                  )
                }
              </CardFooter> */}
              <CardFooter>
                {
                  previewImg && (
                    <div className="flex gap-x-3">
                      <Button className="ml-auto"
                  onClick={uploadOnlyImage}
                  disabled={isUploading}
                
                >
                  { isUploading ? 'Uploading...' : 'Upload'}
                </Button>
                {/* remove */}
                <Button className="ml-auto"
                onClick={() => {
                  setPreviewImg(null);
                  
                }
                }
                >
                  Remove
                </Button>
                    </div>
                  )
                }
              </CardFooter>
            </Card>
            {/* bio,certification,services */}
            <Card>
             {
              isExpert && (
                <CardHeader>
                  <CardTitle>Expert Credentials</CardTitle>
                  <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>
              )
             }
              <CardContent className="space-y-4 my-2">
                <div className="space-y-2">
                  <Card className=" p-2 ">
                    <CardTitle>Bio</CardTitle>
                    <CardDescription>
                      <CardDescription className="  text-black italic    text-sm font-normal">
                      {user?.bio}
                      </CardDescription>
                    </CardDescription>
                    {
                      isExpert && (
                        <div className="flex items-center justify-end gap-4">
                          <Button
                          onClick={(e) => {
                          handleBio(e);
                          }
                          }
                          >
                            <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit bio</span>
                            </span>
                          </Button>
                        </div>


                      )
                    }
                    { 
                    editBio && (
                      <div className="space-y-2">
                        <Textarea
                        value={newUser.bio ? newUser.bio : user?.bio}
                        onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                        />
                        <Button
                        onClick={updateBio}
                        >
                          {isUpdating ? 'Updating...' : 'Update'}
                        </Button>
                      </div>
                    )
                    
                    }
                    
                    </Card>
                </div>
                <div className="space-y-2">
                  <Card className=" p-2 ">
                    <CardTitle>Certifications</CardTitle>
                    <CardContent>
                      <div className=" flex justify-start items-start mx-auto flex-col gap-y-3 p-2 ">
                      {user?.certifications.map((certification) => (
                        <CardDescription key={certification}>
                          <span 
                        className="bg-black text-white p-1 h-2 w-2 rounded-full m-2"
                        />{certification}</CardDescription>
                      ))}

                      </div>
                    </CardContent>
                    {
                      isExpert && (
                        <div className="flex items-center justify-end gap-4">
                          <Button
                          onClick={(e) => {
                           handleCertification(e);
                          }
                          }
                          >
                            <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit certs</span>
                            </span>
                          </Button>
                        </div>
                      )
                    }
                    {
                      editCertification && (
                        <div className="space-y-2">
                         {
                            user.certifications.map((certification, index) => (
                              <Input
                              key={index}
                              value={certification}
                              onChange={(e) => setNewUser({ ...newUser, certifications: [e.target.value] })}
                              />
                            ))
                         }
                          <Button
                            onClick={updateCertification}
                          >
                            {isUpdating ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      )
                    }
                    </Card>
                </div>
                <div className="space-y-2">
                  <Card className=" p-2 ">
                    <CardTitle>Services</CardTitle>
                    <CardContent>
                      <div className=" flex justify-start items-start mx-auto flex-col gap-y-3 p-2 ">
                      {user?.services.map((service) => (
                        <CardDescription key={service}>
                          <span 
                        className="bg-black text-white p-1 h-2 w-2 rounded-full m-2"
                        />
                          {service}</CardDescription>
                      ))}
                      </div>
                    </CardContent>
                    {
                      isExpert && (
                        <div className="flex items-center justify-end gap-4">
                          <Button
                          onClick={(e) => {
                            handleService(e);
                          }
                          }
                          >
                           <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit services</span>
                            </span>
                          </Button>
                        </div>
                      )
                    }
                    {
                      editService && (
                        <div className="space-y-2">
                         {
                            user.services.map((service, index) => (
                              <Input
                              key={index}
                              value={service}
                              onChange={(e) => setNewUser({ ...newUser, services: [e.target.value] })}
                              />
                            ))
                         }
                          <Button
                            onClick={updateService}
                          >
                            {isUpdating ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      )
                    }
                    </Card>
                </div>
                {/* projectss */}
                <div className="space-y-2">
                  <Card className=" p-2 ">
                    <CardTitle className="p-2">Projects</CardTitle>
                    {
                      !editProjects && (<>
                       <CardContent>
                      <div className="flex justify-start items-start mx-auto flex-col gap-y-3 p-2 ">
                      {user?.projectss.map((projects) => (
                        <CardDescription key={projects}><span 
                        className="bg-black text-white p-1 h-2 w-2 rounded-full m-2"
                        />{projects}</CardDescription>
                      ))}
                      </div>

                    </CardContent>
                      </>)
                    }
                   
                    {
                      isExpert && (
                        <div className="flex items-center justify-end gap-4">
                          <Button
                          onClick={(e) => {
                          handleProjects(e);
                          }
                          }
                          >
                           <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit projects</span>
                            </span>
                          </Button>
                        </div>
                      )
                    }
                    {
                      editProjects && (
                        <div className="space-y-2">
                          {
                            user.projectss.map((projects, index) => (
                              <Input
                              key={index}
                              value={projects}
                              onChange={(e) => setNewUser({ ...newUser, projectss: [e.target.value] })}
                              />
                            ))
                          }
                          <Button
                            onClick={updateProjects}
                          >
                            {isUpdating ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      )
                    }
                    {/* web site links */}
                    <CardFooter className="gap-4 flex  items-center justify-center">
                      {
                        !editWebsites && (<>
                        {
                        user?.verifiedWebsites.map((website) => (
                          <a 
                          className="bg-black rounded px-5 py-3 text-white
                          hover:bg-gray-800
                           flex items-center justify-center
                           "
                          href={website} key={website}
                          target="_blank" rel="noreferrer"
                          >
                          <span className=" hover:underline">Visit Website</span>
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                        ))
                      }
                        </>)
                      }
                      
                      {
                        isExpert && (
                          <Button
                          onClick={(e) => {
                            handleWebsites(e);
                          }
                          }
                          >
                            <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit web</span>
                            </span>
                          </Button>
                        )
                      }
                      {
                        editWebsites && (
                          <div className="space-y-2">
                            {
                              user.verifiedWebsites.map((website, index) => (
                                <Input
                                key={index}
                                value={website}
                                onChange={(e) => setNewUser({ ...newUser, verifiedWebsites: [e.target.value] })}
                                />
                              ))

                            }
                            <Button
                              onClick={updateWebsites}
                            >
                              {isUpdating ? 'Updating...' : 'Update'}
                            </Button>
                          </div>
                        )
                      }
                    </CardFooter>
                    </Card>
                </div>
              </CardContent>
            </Card>
         {/* Availbity and so on */}

            <Card>
              <CardHeader>
                <CardTitle> Expert Availbility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Card className=" p-2 ">
                    {
                      !editDay && (
                        <>
                           <CardDescription>Available Day</CardDescription>
                    <CardDescription>
                      <Badge className=" bg-transparent text-black hover:text-blue-600 hover:bg-transparent text-lg font-light">
                      {user?.availableDay.toLocaleUpperCase()}
                      </Badge>
                    </CardDescription>
                        </>
                     
                      )
                    }
                    
                    {
                      isExpert && (
                        <div className="flex items-center justify-end gap-4">
                          <Button
                          onClick={(e) => {
                            handleDay(e);
                          }
                          }
                          >
                            <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit day</span>
                            </span>
                          </Button>
                        </div>
                      )
                    }
                    {
                      editDay && (
                        <div className="space-y-2">
                          <Input
                          value={newUser.availableDay ? newUser.availableDay : user?.availableDay}
                          onChange={(e) => setNewUser({ ...newUser, availableDay: e.target.value })}
                          />
                          <Button
                          onClick={updateDay}
                          >
                            {isUpdating ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      )
                    }
                   </Card>
                </div>
                <Card className=" p-2 grid gap-4 grid-cols-2 items-center m-auto justify-center">
                <div className="space-y-2 ">
                   <Card className="p-2 flex items-center m-auto justify-center ">
                    <CardDescription className="font-extrabold text-2xl text-center">Start Time</CardDescription>
                    <CardDescription>
                      <Badge className=" bg-transparent text-black hover:text-blue-600 hover:bg-transparent text-lg font-light">
                      {user?.startTime}
                      </Badge>
                    </CardDescription>
                   </Card>
                </div>
                <div className="space-y-2">
                  <Card className=" p-2 flex items-center m-auto justify-center">
                    <CardDescription className=" font-extrabold text-2xl text-center">End Time</CardDescription>
                    <CardDescription>
                      <Badge className=" bg-transparent text-black hover:text-blue-600 hover:bg-transparent text-lg font-light">
                      {user?.endTime}
                      </Badge>
                    </CardDescription>
                   </Card>
                </div>
                {
                  isExpert && (
                    <div className="flex items-center justify-end gap-4">
                      <Button
                      onClick={(e) => {
                        handleEndTime(e);
                      }
                      }
                      >
                       <span className="flex items-center gap-x-2 my-2">
                              <Edit2Icon className="w-5 h-5" />
                              <span className=" text-xs">edit time</span>
                            </span>
                      </Button>
                    </div>
                  )
                }
                {
                  editTime && (
                    <div className="space-y-2">
                      <Input
                      value={newUser.startTime ? newUser.startTime : user?.startTime}
                      onChange={(e) => setNewUser({ ...newUser, startTime: e.target.value })}
                      />
                      <Input
                      value={newUser.endTime ? newUser.endTime : user?.endTime}
                      onChange={(e) => setNewUser({ ...newUser, endTime: e.target.value })}
                      />
                      <Button
                      onClick={updateTime}
                      >
                        {isUpdating ? 'Updating...' : 'Update'}
                      </Button>
                    </div>
                  )

                }
             
                </Card>
              </CardContent>
              </Card>
              {/* Book meeeting with expert email,  */}
              <Card>
                <Card className="p-2 border border-blue-400">
                  <CardHeader>
                <CardTitle>Book Meeting</CardTitle>
                <CardDescription>Book a meeting with your expert.</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {/*  */}
                  <div>
                  <h2>Select an Hour:</h2>
                  <div className="flex space-x-4">
                    {availableHours.map((hour) => (
                      <button
                        key={hour}
                        className={`${
                          selectedHour === hour ? 'bg-black text-white' : 'bg-gray-200'
                        }
                        /* border red if isAccpeted is true within the hour */
                        ${
                         requests.some((request) => request.isAccepted && request.hour === hour) ? 'border border-red-500' : ''
                        }
                         px-4 py-2 my-2 rounded focus:outline-none`}
                        onClick={() => handleHourClick(hour)}
                        disabled={selectedHour !== null && selectedHour !== hour}
                      >
                        from {hour}:00 to {hour + 1}:00
                      </button>
                    ))}
                  </div>
                  <p>Selected Hour: {selectedHour !== null ? `${selectedHour}:00` : 'None'}</p>
                  <Card className="p-2 flex items-center justify-center gap-x-3">
                    {/* deselect  */}
                    {/* TODO */}
                 {
                    selectedHour !== null && (
                      <button
                      className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
                      onClick={() => setSelectedHour(null)}
                      disabled={selectedHour === null}
                    >
                      Deselect
                    </button>
                    )
                 }
                 {
                  selectedHour === null && !isCheckingHour && (
                    <p className="text-red-500">Select an hour to book a meeting</p>

                  )
                 }
                 {
                  isBookingSuccess !== '' && (
                    <p className="text-green-500">{
                      isBookingSuccess 
                    }</p>
                  )
                 }
                 {
                  isBookingError !== '' && (
                    <p className="text-red-500">{isBookingError}</p>
                  )
                 }
                 {/* checking hour availability  */}
                  {
                    isCheckingHour && (
                      <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse">
                        <span className="text-gray-500">
                          {
                            isCheckingHour ? 'Checking availabilty...' : 'Checked'
                          }
                        </span>
                      </div>
                    )
                  }

                    
                 </Card>
                </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="space-y-2">
                  <Button 
                  onClick={handleBooking}
                  disabled={isCheckingHour || selectedHour === null || isBooking}
                  className="justify-self-center flex justify-center items-center mx-auto w-full">Book 
                    Meeting
                  </Button>
                </div>

              </CardContent>
                </Card>
              
              </Card>
              {/* Recommended services */}
              {/* <Card>
              <CardHeader>
                <CardTitle>Recommended Services</CardTitle>
                <CardDescription>Get recommended services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                {!isFetchingService  && selectedService.length > 0 && (
        selectedService.map((service) => (
          <>
          <h3 className="text-2xl font-bold text-center">
            Service Details
          </h3>
           <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.projects.map((project) => (
                  <li key={project.id}>
                    <h3 className="
                     text-xl  p-2 
                    ">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="gap-4 flex  items-center justify-center

            ">
              {
                service.links.map((link) => (
                  <a 
                  className="bg-black rounded px-5 py-3 text-white
                  hover:bg-gray-800
                   flex items-center justify-center
                   "
                  href={link.url} key={link.id}
                  target="_blank" rel="noreferrer"
                  >
                  <span className=" hover:underline">Visit Website</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
                ))
              }
            </CardFooter>
          </Card>

         
          <Link className="

         " href={`/services/${service.name}`}>
           
          <Button className="w-full flex items-center justify-center gap-2">
        <span>    Go to {service.name} Service Page</span>
        <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
           
          </Link>
          </>
         
        ))
      )}
                {
                  !isFetchingService && (
                    <>
                    <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Select Your Preferred Services:</label>
                    <select
                      value={service.title}
                      onChange={(e) => setServices(curatedServices[e.target.selectedIndex])}
                      className="p-2 border border-gray-50 rounded w-full"
                    >
                      <option value="">Select a service</option>
                      {curatedServices.map((service:ServiceProps,index:number) => (
                        <option key={index} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                    </>
                  )
                }
                {
                  isFetchingService && (
                    <div
                     className="flex justify-center items-center flex-col gap-2">
                      <span className="">
                        <Badge className=" bg-black">Fetching</Badge>
                      </span>
                      <Loader2 className="w-10 h-10 text-black animate-spin" />
                     
                    </div>
                  )
                }
                </div>
               
                <div className="space-y-2">
                  <Button
                  onClick={() => fetchService(service.id)}
                  >
                   {
                      isFetchingService ? (
                        <Loader2 size={24} className='animate-spin'/>
                      ) : 'Get Service'
                   }
                  </Button>
                </div>
              </CardContent>
              </Card> */}
         
             
              {
                isExpert && (
                     <Card className="border border-red-400 ">
              <CardHeader>
                <CardTitle>Deactivate Account</CardTitle>
                <CardDescription>Deactivate your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              {
                /* is deleting */
                !isDeleting && (
                   
                  <DeleteComponent onDelete={handleDelete} />
                )
              }
              {
                /* is deleteing skeleton */
                isDeleting && (
                  <>
                    <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

                  
                  <span className=" my-7">
                    <Badge className="bg-red-500">Deactivating..</Badge>
                  </span>
                  </>
                
                )
              }
              </CardContent>
            
            </Card> 
                )
              }
        
          </div>
        </div>
      </main>
    </div>
      )
    }
       
    </>
 
  )
}

function FrameIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}