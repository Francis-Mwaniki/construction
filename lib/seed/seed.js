const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed data for experts
    const expertsData = [
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        password: "securepass123",
        certifications:  "LEED Certification",
        bio: "Experienced construction professional with a passion for sustainable building practices.",
        services: "Residential Construction", 
        verifiedWebsites: ["https://johnsmithconstruction.com"],
        availableDay: "Monday",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=johnsmith",
      },
      {
        firstName: "Sarah",
        lastName: "Jones",
        email: "sarah.jones@example.com",
        password: "strongpassword456",
        certifications:  "OSHA Certification",
        bio: "Structural engineer with expertise in designing safe and efficient building structures.",
        services: "Structural Design",
        verifiedWebsites: ["https://sarahjonesengineering.com",
          "https://sarahjonesfoundationinspection.com"],
        availableDay: "Tuesday",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=sarahjones",
      },
      {
        firstName: "Michael",
        lastName: "Williams",
        email: "michael.williams@example.com",
        password: "securepass789",
        certifications: "Construction Management Professional",
        bio: "Dedicated construction manager with a focus on delivering projects on time and within budget.",
        services: "Project Management",
        verifiedWebsites: ["https://michaelwilliamsconstruction.com",
          "https://michaelwilliamsprojectmanagement.com"],
        availableDay: "Wednesday",
        startTime: "10:00 AM",
        endTime: "07:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=michaelwilliams",
      },
      {
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@example.com",
        password: "securepass987",
        certifications:  "LEED Certification",
        bio: "Passionate architect with a focus on sustainable and innovative design solutions.",
        services: "Architectural Design" ,
        verifiedWebsites: ["https://emilyjohnsonarchitects.com",
          "https://emilyjohnsonsustainabledesign.com"],
        availableDay: "Thursday",
        startTime: "11:00 AM",
        endTime: "06:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=emilyjohnson",
      },
      {
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@example.com",
        password: "securepass654",
        certifications: "Civil Engineer",
        bio: "Civil engineer specializing in infrastructure projects and urban planning.",
        services: "Infrastructure Design",
        verifiedWebsites: ["https://davidmillerengineering.com",
          "https://davidmillerurbanplanning.com"],
        availableDay: "Friday",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=davidmiller",
      },
      {
        firstName: "Olivia",
        lastName: "Brown",
        email: "olivia.brown@example.com",
        password: "securepass321",
        certifications: "Construction Safety Officer",
        bio: "Committed to ensuring safety on construction sites through effective safety measures and training.",
        services: "Safety Inspections",
        verifiedWebsites: ["https://oliviabrownsafety.com",
          "https://oliviabrowntraining.com"],
        availableDay: "Saturday",
        startTime: "10:00 AM",
        endTime: "04:00 PM",
        profilepicURL: "https://ui-avatars.com/api/?background=random&name=oliviabrown",
      },
    ];

    for (const expertData of expertsData) {
      const { password, ...rest } = expertData;

      // Validate email existence
      // const existingExpert = await prisma.expert.findUnique({
      //   where: { email: expertData.email },
      // });

      // if (!existingExpert) {
        // Hash password using a secure algorithm (bcrypt recommended)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create expert
        await prisma.expert.create({
          data: {
            password: hashedPassword,
            ...rest,
          },
        });
      // }
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed();
