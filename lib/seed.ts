// Import necessary icons
const { HammerIcon, PaintbrushIcon, ScissorsIcon, WrenchIcon, BirdIcon, HardHatIcon, BookTemplateIcon, ToyBrickIcon } = require('./icons');

// Import Prisma client
const { PrismaClient } = require('@prisma/client');
    // Instantiate Prisma client
    const prisma = new PrismaClient();
  // Define the services array with icons
  const services = [
    {
      icon: HammerIcon,
      title: 'Construction',
      description: 'Our experts provide high-quality construction services.',
    },
    {
      icon: PaintbrushIcon,
      title: 'Painting',
      description: 'Our experts provide high-quality painting services.',
    },
    {
      icon: ScissorsIcon,
      title: 'Renovation',
      description: 'Our experts provide high-quality renovation services.',
    },
    {
      icon: WrenchIcon,
      title: 'Maintenance',
      description: 'Our experts provide high-quality maintenance services.',
    },
    {
      icon: BirdIcon,
      title: 'Heavy Machinery',
      description: 'Our experts provide high-quality heavy machinery services.',
    },
    {
      icon: HardHatIcon,
      title: 'Safety',
      description: 'Our experts provide high-quality safety services.',
    },
    {
      icon: BookTemplateIcon,
      title: 'Design & Planning',
      description: 'Our experts provide high-quality design and planning services.',
    },
    {
      icon: ToyBrickIcon,
      title: 'Masonry',
      description: 'Our experts provide high-quality masonry services.',
    },
  ];
  
  // Create a function to seed the database with services
  async function seedServices() {
    try {
      for (const service of services) {
        // Save each service to the database
        await prisma.service.create({
          data: {
            icon: service.icon as unknown as string,
            title: service.title,
            description: service.description,
          },
        });
      }
      console.log('Services seeded successfully');
    } catch (error) {
      console.error('Error seeding services:', error);
    } finally {
      await prisma.$disconnect(); // Disconnect Prisma client after seeding
    }
  }
  
  // Call the seedServices function to execute the seeding process
  seedServices();
  