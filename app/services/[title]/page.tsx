"use client"
import React from 'react';

type Props = {
    params:{
      title: string;
    }
  };
const ServicePage = ({ params }: Props) => {
 const [decodeTitle, setDecodeTitle] = React.useState<string>("");
    React.useEffect(() => {
        setDecodeTitle(decodeURIComponent(params.title));
    }, [params.title]);
    

 

  // Here, you can fetch data or use the title to display specific information

  return (
    <div className="flex min-h-screen flex-col ">

        <div className="flex-1  flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">
                {decodeTitle}
                </h1>
        </div>


    
    </div>
  );
};

export default ServicePage;
