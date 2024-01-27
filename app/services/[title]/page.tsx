"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React from "react";
import { ArrowLeft } from "lucide-react";
type Props = {
    params:{
      title: string;
    }
  };
export default function Component ({params}:Props) {
    const [decodeTitle, setDecodeTitle] = React.useState<string>("");
    React.useEffect(() => {
        setDecodeTitle(decodeURIComponent(params.title));
    }, [params.title]);
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
      <main className="flex-1 p-6 space-y-12">
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">
                {decodeTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We provide high-quality painting services. Our team of professional painters will bring out the charm of
              any space. We know the ins and outs of painting like no one else, and our knowledge can make the
              difference between a successful project and a costly one.
            </p>
            <img
              alt="Painting service"
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
              Our painting services include both interior and exterior painting, drywall repair, wallpaper removal, and
              more. We use only the highest quality materials and our team is dedicated to delivering exceptional
              results.
            </p>
          </div>
          <div className="border-t p-6 space-y-4">
            <h3 className="text-lg font-bold">Pricing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our pricing is flexible and depends on the size of the project. Contact us for a quote.
            </p>
          </div>
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
                <Textarea id="details" placeholder="Describe your project" />
              </div>
              <Button>Submit</Button>
            </form>
          </div>
        </section>
        <section className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Payment</h2>
            <p className="text-gray-600 dark:text-gray-400">
              After your service request is approved, you can make a payment through our secure payment portal. We
              accept all major credit cards and use Stripe for processing payments.
            </p>
            {/* <img
              alt="Stripe logo"
              className="w-32 h-8 object-cover rounded-md"
              height="50"
              src="https://image.lexica.art/full_webp/cc2e54ca-3ea5-4184-8350-44e8c04a78c2"
              style={{
                aspectRatio: "200/50",
                objectFit: "cover",
              }}
              width="200"
            /> */}
            <Button>Go to Payment</Button>
          </div>
        </section>
      </main>
      <footer className="p-6 bg-white dark:bg-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400">© 2024 Our Services. All rights reserved.</p>
      </footer>
    </div>
  )
}

