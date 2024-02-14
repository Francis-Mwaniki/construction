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
import { Badge, X } from "lucide-react"
// import UploadProfile from "../Uploads/profile"

interface UserProfile {
  id: string;
  username: string;
  email: string;
  detections: any[]; // Adjust the type based on the actual structure of the 'detections' property
  plan: string;
  planId: string | null;
  profile_pic: string | null;
  isVerified: boolean;
}
export default function Component() {
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
  const [user, setUser] = useState<UserProfile>({
    id: '',
    username: '',
    email: '',
    detections: [],
    plan: '',
    planId: '',
    profile_pic: '',
    isVerified: false
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

  // React.useEffect(() => {
  //   const localUser = JSON.parse(localStorage.getItem('user')!);
  //   const parsedEmail = localUser.email;
  //   setLocalUserData(localUser);
  //   console.log(parsedEmail);
  
  //   if (localUser && localUser.email) {
  //     // Only call GetUser if localUserData.email is different
  //     GetUser(parsedEmail);
  //   }
  // }, []); // Only run the effect when localUserData changes
  

  // React.useEffect(() => {
  //   if (user.isVerified) {
  //     setIsOnline(true);
  //   }
  // }, [user.isVerified]);

  // React.useEffect(() => {
  //   if (user.profile_pic) {
  //     setImage(user.profile_pic);
  //   }
  //   if (previewImg) {
  //     setImage(previewImg.toString());
  //   }
  // }, [user.profile_pic, previewImg]);

  // React.useEffect(() => {
  //   if (cloudinaryImgUrl) {
  //     setCloudinaryImgUrl(cloudinaryImgUrl);
  //   }
  // }, [cloudinaryImgUrl]);

  const uploadOnlyImage = async () => {
    // /api/auth/profile/upload_profile_pic
    setIsUploading(true);
    const res = await fetch(`/api/auth/profile/upload_profile_pic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, profile_pic: cloudinaryImgUrl })
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
  const GetUser = async (email: string) => {
    // /api/auth/profile
    setIsFetching(true);
    const res = await fetch(`/api/auth/profile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
  
    const data = await res.json();
    console.log(data);
  
    if (data.status === 200) {
      const user: UserProfile = data.user;
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
      body: JSON.stringify({ email: user.email })
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
                src={user.profile_pic ? user.profile_pic : image}
                alt=""
                layout="fill"
                objectFit="contain"
                className="w-full h-full"
              />
              {
                 /* fetching image skeleton */
                !user.profile_pic && (
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
          <h1 className="font-semibold text-3xl">Settings</h1>
        </div>
      
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
            <Link className="font-semibold text-gray-900 dark:text-gray-50" href="#">
              Profile
            </Link>
            <Link href="#">Pricing Plan</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
               
                
      {/* img */}
      <div className="max-w-6xl w-full mx-auto grid gap-2 relative">
          <div className="flex items-center justify-center flex-col gap-y-2">
      
          <div className="relative">
  <Image 
    src={user.profile_pic ? user.profile_pic : image}
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
                  <Badge className="bg-blue-500">current</Badge>
                  {/* isOnline buble pulsing */}
                
                  </div>
            
          </div>
          
        </div>
                <CardTitle>Profile Credentials</CardTitle>
                
                <CardDescription>Update your profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 ">
              {
                      user.isVerified && (
                        <span className=" my-7">
                           <Badge className="bg-green-500">Verified</Badge>
                        </span>
                      )
                   }
              
                <div className="space-y-2 ">
                  <Label htmlFor="name">Name</Label>
                  <Input
                  value={user.username.split('@')[0]} 
                   id="name" placeholder="Enter your name" />
                   {
                    /* fetching input skeleton */
                    !user.username && (
                      <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                    )
                   }
                
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  value={user.email }
                   id="email" placeholder="Enter your email" type="email" />
                   {
                     /* fetching input skeleton */
                      !user.email && (
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
                hover:scale-105 hover:rotate-12
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
            <Card>
              <CardHeader>
                <CardTitle>Pricing Plan</CardTitle>
                <CardDescription>Upgrade your plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPlan">Current Plan</Label>
                  <Input id="currentPlan" value={user.plan} 
                  className="bg-gray-100 dark:bg-gray-800"
                  disabled />
                  {
                     /* fetching input skeleton */
                      !user.plan && (
                        <div className="flex items-center justify-center w-full h-10 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
                      )
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pro">PRO</SelectItem>
                      <SelectItem value="enterprise">ENTERPRISE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Upgrade</Button>
              </CardFooter>
            </Card>

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