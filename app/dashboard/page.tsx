"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { CheckCircle2, HomeIcon, Loader2, LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ClassAttributes, HTMLAttributes } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { ResponsivePie } from "@nivo/pie"

interface Expert {
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

    interface User {
        id : number;
        username: string | null;
        email: string;
        password: string;
        }

       
export default function Dashboard() {
  const router = useRouter();
  const [allExperts, setAllExperts] = useState<Expert[]>([]);
  const [activeExperts, setActiveExperts] = useState<Expert[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [fetchingExperts, setFetchingExperts] = useState(true);
    const [fetchingActiveExperts, setFetchingActiveExperts] = useState(true);
    const [fetchingUsers, setFetchingUsers] = useState(true);
    const [fetchingActiveUsers, setFetchingActiveUsers] = useState(true);
  const [email, setEmail] = useState('');
  const [calculatedUser, setCalculatedUser] = useState<any[]>([
    {
      id: "All Experts",
      value: 3,
    },
    {
      id: "Active Experts",
      value: 6,
    },
    {
      id: "All Users",
      value: 5,
    },
    {
      id: "Active Users",
      value: 4,
    },
  ]);

    //check if user is admin
    useEffect(() => {
      const isAdmin = localStorage.getItem('isAdmin');
      if(isAdmin === 'false'){
        router.push('/LoginAsAdmin');
      }

      if(isAdmin === null){
        router.push('/LoginAsAdmin');
      }

      const adminId = localStorage.getItem('adminId');
      const adminEmail = localStorage.getItem('adminEmail');
      setEmail(adminEmail as string);
      if(adminId === null){
        router.push('/LoginAsAdmin');
      }

    }
    ,[
      router
    ]);

    useEffect(() => {
      if(email === ''){
        setEmail(localStorage.getItem('adminEmail') as string);
      }
    }
    ,[
      email
    ]);

    const fetchAllExperts = async () => {
        setFetchingExperts(true);
        try {
          const response = await fetch('/api/admin/experts');
          const data = await response.json();
          if (response.ok) {
            console.log('data active experts',data.data);
            setFetchingExperts(false);
            return data.data;
          }
          toast.error('Error fetching experts');
            return [];

        } catch (error) {
          console.error('Error fetching experts:', error);
        }
    }

    const fetchActiveExperts = async () => {
        setFetchingActiveExperts(true);
        try {
          const response = await fetch('/api/admin/experts/active');
          const data = await response.json();
          if (response.ok) {
            console.log('data experts active',data.data);
            setFetchingActiveExperts(false);
            return data.data;
          }
          toast.error('Error fetching active experts');
            return [];

        } catch (error) {
          console.error('Error fetching active experts:', error);
        }
    }

    const fetchAllUsers = async () => {
        setFetchingUsers(true);
        try {
          const response = await fetch('/api/admin/users');
          const data = await response.json();
          if (response.ok) {
            console.log('data users',data.data);
            
            setFetchingUsers(false);
            return data.data;
          }
          toast.error('Error fetching users');
            return [];

        } catch (error) {
          console.error('Error fetching users:', error);
        }
    }


    const fetchActiveUsers = async () => {
        setFetchingActiveUsers(true);
        try {
          const response = await fetch('/api/admin/users/active');
          const data = await response.json();
          
          if (response.ok) {
            console.log('data active users',data.data);
            setFetchingActiveUsers(false);
            return data.data;
          }
          toast.error('Error fetching active users');
            return [];

        } catch (error) {
          console.error('Error fetching active users:', error);
        }
    }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const experts : Expert[] = await fetchAllExperts();
        const activeExpertsData : Expert[] = await fetchActiveExperts();
        const users : User[] = await fetchAllUsers();
        const activeUsersData : User[] = await fetchActiveUsers();

        setAllExperts(experts);
        setActiveExperts(activeExpertsData);
        setAllUsers(users);
        setActiveUsers(activeUsersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    router.push('/LoginAsAdmin');
  }


  useEffect(() => {
    const data = [
      {
        id: "Active Experts",
        value: activeExperts.length,
      },
      {
        id: "All Experts",
        value: allExperts.length,
      },
      {
        id: "Active Users",
        value: activeUsers.length,
      },
      {
        id: "All Users",
        value: allUsers.length,
      },
    ];
    setCalculatedUser(data);
  }
  ,[
    allExperts,
    activeExperts,
    allUsers,
    activeUsers
  ]);
  return (
    <>
   
     <section className=" p-4 min-h-screen overflow-hidden">
      <div className="container mx-auto p-4">
       <Card className='p-2 m-3 flex  flex-row justify-between items-center gap-x-3'>
        <h1 className="text-2xl font-semibold">Dashboard <span className=' text-xs italic'>(Admin view only)</span></h1>
        <span className='text-gray-500'>Logged in as {email}</span>
        <div className='flex gap-x-3'>
          
        <Button onClick={() => router.push('/')} className=' flex items-center gap-x-2'>
          <span >Home</span>
          <HomeIcon size={24} />
        </Button>
        <Button onClick={logout} className=' flex items-center gap-x-2'>
          <span >Logout</span>
          <LogOut size={24} />
        </Button>
        </div>
      

       </Card>
       <div className="border shadow-sm rounded-lg">

<h2 className="text-lg font-semibold p-4">Content Categories</h2>

{
  allExperts.length > 0 && activeExperts.length > 0 && allUsers.length > 0 && activeUsers.length > 0 && (
    <div className="grid grid-cols-1  gap-4 p-4">
      <div className="bg-white p-4 border border-gray-500 shadow rounded-md">
      <PieChart  className="w-full aspect-[4/3]" calculatedUser={calculatedUser} />
      </div>
     
    </div>
  )
}

  
    {/* <div className="p-4">
     
      <Card className="bg-white p-4  shadow rounded-md">
      <PieChart2  className="w-full aspect-[4/3]" />
      </Card>
    </div> */}
  



</div>
  <Card className="p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white max-h-80 border border-gray-500  overflow-y-auto p-4 shadow rounded-md">
            <CardDescription className="text-xl font-semibold mb-2">All Experts</CardDescription>
            {  allExperts.map((expert:Expert,index:number) => (
             <Card key={index} className='p-2  border flex justify-start items-start gap-2  flex-col m-2  sm:min-w-[500px]'>
              <div className='flex items-center gap-x-1'>
              <span>
                    {index+1}
              </span>
               <div  className=' font-extrabold text-2xl' key={index}>{expert.firstName + ' ' + expert.lastName}</div>
             </div>

             {/* booking */}
              <div className='flex items-center gap-x-1'>
                
                <CardDescription key={index}>{expert.email}</CardDescription>
              </div>

              {/* location */}
              <div className='flex gap-1 items-center gap-x-1'>
              <span>
                    Location
              </span>
               
                <CardDescription key={index}>{expert.location}</CardDescription>
                </div>

                {/* services */}
                <Card  className='flex p-2 items-start justify-start flex-col gap-x-1 sm:min-w-[500px]'>
                <span>
                      Services
                </span>
                
                <div key={index}>
                  {
                    expert.services.map((service:string,index:number) => (
                      <CardDescription key={index} className='p-2 italic'>{service}</CardDescription>
                    ))
                  }
                </div>
                </Card>

                {/* certifications */}
             </Card>

            ))}
            {
              allExperts.length === 0 && <div className='text-center'>
                No experts
              </div>
            }
            {
                fetchingExperts && <div className='text-center'>
                <Loader2 size={32}  className='animate-spin' />
                </div>
            }
          </div>

          <div className="bg-white max-h-80 border border-gray-500  overflow-y-auto p-4 shadow rounded-md">
            <CardDescription className="text-xl font-semibold mb-2">Active Experts
             <Badge className='text-green-200 bg-green-500'>Active {" "} <CheckCircle2 className=' h-5 w-5' /></Badge>
            </CardDescription>
            {activeExperts.map((expert:Expert,index:number) => (
               /* random numbering */
               <Card key={index} className='p-2 flex justify-start items-start gap-2  flex-col m-2  sm:min-w-[500px]'>
               <div className='flex items-center gap-x-1'>
               <span>
                     {index+1}
               </span>
                <div className=' text-2xl font-extrabold' key={index}>{expert.firstName + ' ' + expert.lastName}</div>
              </div>
 
              {/* booking */}
               <div className='flex items-center gap-x-1'>
                 
                 <CardDescription key={index}>{expert.email}</CardDescription>
               </div>
 
               {/* location */}
               <div className='flex gap-1 items-center gap-x-1'>
               <span>
                     Location
               </span>
                
                 <CardDescription key={index}>{expert.location}</CardDescription>
                 </div>
 
                 {/* services */}
                 <Card  className='flex p-2 items-start justify-start flex-col gap-x-1 sm:min-w-[500px]'>
                 <span>
                       Services
                 </span>
                 
                 <div key={index}>
                   {
                     expert.services.map((service:string,index:number) => (
                       <CardDescription className='p-2 italic' key={index}>{service}</CardDescription>
                     ))
                   }
                 </div>
                 </Card>
 
                 {/* certifications */}
              </Card>
              
            ))}
            {
              activeExperts.length === 0 && <div className='text-center'>
                No active experts
              </div>
            }
            {
                fetchingActiveExperts && <div className='text-center'>
                <Loader2 size={32}  className='animate-spin' />
                </div>
            }
          </div>

          <div className=" overflow-y-auto min-h-80 border border-gray-500  shadow-black p-4 shadow rounded-md">
            <CardDescription className="text-xl font-semibold mb-2">All Users</CardDescription>
            {allUsers?.map((user:User,index:number) => (
               <div key={index} className='flex items-center gap-x-1'>
               <span>
                   <div key={index}>{ user.id}</div>
                </span>
               <div key={index}>{ user.email}</div> -. <div key={index} className=' text-xs'>{ user.username}</div> 
               </div>
            ))}
            {
              allUsers.length === 0 && <div className='text-center'>
                No users
              </div>
            }
            {
                fetchingUsers && <div className='text-center'>
                <Loader2 size={32}  className='animate-spin' />
                </div>
            }
          </div>

          <div className="bg-white p-4 overflow-y-auto min-h-80 border border-gray-500  shadow rounded-md">
            <CardDescription className="text-xl font-semibold mb-2">Active Users {' '} <Badge className='text-green-200 bg-green-500'>Active <CheckCircle2 className=' h-5 w-5' /></Badge></CardDescription>
            {activeUsers?.map ((user:User,index:number) => (
              <div key={index} className='flex items-center gap-y-3 gap-x-1'>
              <span>
                   <div key={index}>{ user.id}</div>
                </span>
                <div key={index}>{ user.email}</div>  . -. <div className=' m-1 text-xs' key={index}>{ user.username}</div> {/* active all */} 
              </div>
            ))}
            {
              activeUsers.length === 0 && <div className='text-center'>
                No active users
              </div>
            }
            {
                fetchingActiveUsers && <div className='text-center'>
                <Loader2 size={32}  className='animate-spin' />
                </div>
            }
          </div>
        </div>
        </Card>
      </div>
    </section>
    </>
  );
}
function PieChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & { calculatedUser: any[]; }) {
  return (
    <div {...props}>
      <ResponsivePie
        data={
          props.calculatedUser
        }
        sortByValue
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        cornerRadius={0}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLabel="id"
        arcLabelsRadiusOffset={0.6}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLinkLabels={false}
        colors={{ scheme: "paired" }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 50,
            itemHeight: 18,
            itemDirection: "left-to-right",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
function PieChart2(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> ) {
  return (
    <div {...props}>
      <ResponsivePie
        data={
          [
            {
              id: "Active Experts",
              value: 2,
            },
            {
              id: "All Experts",
              value: 2,
            },
            {
              id: "Active Users",
              value: 5,
            },
            {
              id: "All Users",
              value: 5,
            },
          ]
        }
        sortByValue
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        cornerRadius={0}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLabel="id"
        arcLabelsRadiusOffset={0.6}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLinkLabels={false}
        colors={{ scheme: "paired" }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 50,
            itemHeight: 18,
            itemDirection: "left-to-right",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}