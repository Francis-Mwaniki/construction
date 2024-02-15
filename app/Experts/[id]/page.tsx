"use client"; 
import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { JSX, SVGProps, useState } from "react"
import Image from "next/image"
import React from "react"
import DeleteComponent from "../../components/DeleteProfile"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import { Verified, X } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
type Props={
  params:{
    id: number
  }
}
interface ExpertProfile {
id : number;
firstName: string;
lastName: string;
email: string;
certifications: string;
services: string;
bio: string;
password: string;
verifiedWebsites: string[];
availableDay: string;
startTime: string;
endTime: string;
profilepicURL: string;

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
  const [user, setUser] = useState<ExpertProfile>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    certifications: '',
    services: '',
    bio: '',
    password: '',
    verifiedWebsites: [],
    availableDay: '',
    startTime: '',
    endTime: '',
    profilepicURL: ''
  })
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
        new Audio('/soundplan.wav').play()
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
    setIsDeleting(true);
    const res = await fetch(`/api/auth/profile/delete_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user?.email })
    });
  
    const data = await res.json();
    console.log(data);
  
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
         router.push('/Login')
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
    }
  };
  return (
    <>
    {
      /* fetching skeleton */
      isFetching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
          <div className="flex items-center justify-center w-20 h-20">
            <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
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
              <Image
                src={user?.profilepicURL ? user?.profilepicURL : image}
                alt=""
                layout="fill"
                objectFit="contain"
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
          <h1 className="font-semibold text-3xl">
            Expert Profile
          </h1>
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
    src={user?.profilepicURL ? user?.profilepicURL : image}
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
                <CardTitle>Expert Credentials</CardTitle>
                
                <CardDescription>Update your profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 ">
              {
                      user?.id && (
                        <span className=" my-7">
                           <Badge className="bg-green-500 inline-flex items-center gap-1">
                              <span>Verified</span>
                              <Verified className="w-5 h-5 text-white" />
                           </Badge>
                        </span>
                      )
                   }
              
                <div className="space-y-2 ">
                  <Label htmlFor="name">Name</Label>
                  <Input
                  value={user?.firstName} 
                   id="name" placeholder="Enter your name" />
                   {
                    /* fetching input skeleton */
                    !user?.firstName && (
                      <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                    )
                   }
                
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  value={user?.email }
                   id="email" placeholder="Enter your email" type="email" />
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
            
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <Input id="profilePicture"
                    onChange={browseImageOnly}
                   placeholder="Upload your picture" type="file"
                    accept="image/*"
                    />
                </div>
              </CardContent>
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
              <CardHeader>
                <CardTitle>Expert Profile</CardTitle>
                <CardDescription>Update your profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                  value={user?.bio}
                    id="bio" placeholder="Enter your bio" />

                    {
                      /* fetching input skeleton */
                      !user?.bio && (
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse">

                        </div>
                      )
                    }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Certification</Label>
                  <Input
                  value={user?.certifications}
                    id="certification" placeholder="Enter your certification" />
                    {
                      /* fetching input skeleton */
                      !user?.certifications && (
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                      )
                    }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services">Services</Label>
                  <Input
                  value={user?.services}
                    id="services" placeholder="Enter your services" />
                    {
                      /* fetching input skeleton */
                      !user?.services && (
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                      )
                    }
                </div>
              </CardContent>
            </Card>
         {/* Availbity and so on */}

            <Card>
              <CardHeader>
                <CardTitle>Availbility</CardTitle>
                <CardDescription>Set your availbility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Select>
                    <SelectTrigger>
                      <Input
                        id="day"
                        placeholder="Select day"
                        value={user?.availableDay}
                      />
                    </SelectTrigger>
                    <SelectContent className="w-40 p-2">
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start">Start Time</Label>
                  <Input
                    id="start"
                    type="text"
                    value={user?.startTime}
                    placeholder="Select start time"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Time</Label>
                  <Input
                    id="end"
                    type="text"
                    value={user?.endTime}
                    placeholder="Select end time"
                  />
                </div>
              </CardContent>
              </Card>
              {/* Book meeeting with expert email,  */}
              <Card>
              <CardHeader>
                <CardTitle>Book Meeting</CardTitle>
                <CardDescription>Book a meeting with your expert.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="space-y-2">
                  <Button>Book 
                    Meeting
                  </Button>
                </div>

              </CardContent>
              </Card>
              {/* Recommended services */}
              <Card>
              <CardHeader>
                <CardTitle>Recommended Services</CardTitle>
                <CardDescription>Get recommended services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select>
                    <SelectTrigger>
                      <Input
                        id="service"
                        placeholder="Select service"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-40 p-2">
                      <SelectItem value="Service 1">Service 1</SelectItem>
                      <SelectItem value="Service 2">Service 2</SelectItem>
                      <SelectItem value="Service 3">Service 3</SelectItem>
                      <SelectItem value="Service 4">Service 4</SelectItem>
                      <SelectItem value="Service 5">Service 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="space-y-2">
                  <Button>Get 
                    Service
                  </Button>
                </div>
              </CardContent>
              </Card>
              {/* Verified Websites */}
              {/* Delete Account */}
            <Card className="border border-red-400 ">
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>Delete your account.</CardDescription>
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
                    <Badge className="bg-red-500">Deleting</Badge>
                  </span>
                  </>
                
                )
              }
              </CardContent>
            
            </Card>
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