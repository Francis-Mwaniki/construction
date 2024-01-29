// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Instantiate Prisma client
const prisma = new PrismaClient();

// Define data for services
const servicesData = [
  { title: 'Construction' },
  { title: 'Painting' },
  { title: 'Renovation' },
  { title: 'Maintenance' },
  { title: 'Heavy Machinery' },
  { title: 'Safety' },
  { title: 'Design & Planning' },
  { title: 'Masonry' }
];

const serviceProvidersData = [
  {
    name: 'Construction',
    projects: [
      { name: '24/7 Emergency HVAC Repair', description: 'Ensure comfort and safety around the clock with our 24/7 emergency HVAC repair service. Stay cozy in any weather condition.' },
      { name: 'Plumbing System Upgrades', description: 'Upgrade your plumbing system for maximum efficiency and reliability. Say goodbye to leaks and water wastage.' }
    ],
    links: [
      { url: 'https://maintenanceprovider1.com/link1' },
      { url: 'https://maintenanceprovider1.com/link2' }
    ],
    
  },
  {
    name: 'Painting',
    projects: [
      { name: 'Heavy Equipment Rental Solutions', description: 'Empower your construction projects with our heavy equipment rental solutions. Boost productivity and efficiency.' },
      { name: 'Industrial Machinery Maintenance', description: 'Keep your industrial machinery running smoothly with our expert maintenance services. Minimize downtime and maximize output.' }
    ],
    links: [
      { url: 'https://heavymachineryprovider.com/link1' },
      { url: 'https://heavymachineryprovider.com/link2' }
    ],
     // Assign the service ID for Heavy Machinery
  },
  {
    name: 'Safety',
    projects: [
      { name: 'OSHA Compliance Training', description: 'Ensure workplace safety and regulatory compliance with our comprehensive OSHA compliance training. Protect your employees and your business.' },
      { name: 'Safety Equipment Installation & Inspection', description: 'Equip your workplace with top-of-the-line safety equipment and ensure compliance with regular inspections. Prioritize the well-being of your team.' }
    ],
    links: [
      { url: 'https://safetyprovider.com/link1' },
      { url: 'https://safetyprovider.com/link2' }
    ],
     // Assign the service ID for Safety
  },
  {
    name: 'Design & Planning',
    projects: [
      { name: 'Architectural Masterpieces', description: 'Create architectural masterpieces that inspire awe and admiration. Let your imagination take flight with our innovative design solutions.' },
      { name: 'Urban Revitalization Projects', description: 'Revitalize urban landscapes and communities with our transformative planning projects. Shape the cities of tomorrow.' }
    ],
    links: [
      { url: 'https://designplanningprovider.com/link1' },
      { url: 'https://designplanningprovider.com/link2' }
    ],
     // Assign the service ID for Design & Planning
  },
  {
    name: 'Masonry',
    projects: [
      { name: 'Artisan Stonework', description: 'Craft timeless and elegant structures with our artisan stonework. Elevate your surroundings with the beauty of natural stone.' },
      { name: 'Brick Facade Restoration', description: 'Restore the charm and character of historic buildings with our brick facade restoration services. Preserve architectural heritage for generations to come.' }
    ],
    links: [
      { url: 'https://masonryprovider.com/link1' },
      { url: 'https://masonryprovider.com/link2' }
    ],
     
  },

  {
    name: 'Renovation',
    projects: [
      { name: '24/7 Emergency HVAC Repair', description: 'Ensure comfort and safety around the clock with our 24/7 emergency HVAC repair service. Stay cozy in any weather condition.' },
      { name: 'Plumbing System Upgrades', description: 'Upgrade your plumbing system for maximum efficiency and reliability. Say goodbye to leaks and water wastage.' }
    ],
    links: [
      { url: 'https://maintenanceprovider1.com/link1' },
      { url: 'https://maintenanceprovider1.com/link2' }
    ],
    
  },
  {
    name: 'Maintenance',
    projects: [
      { name: 'Heavy Equipment Rental Solutions', description: 'Empower your construction projects with our heavy equipment rental solutions. Boost productivity and efficiency.' },
      { name: 'Industrial Machinery Maintenance', description: 'Keep your industrial machinery running smoothly with our expert maintenance services. Minimize downtime and maximize output.' }
    ],
    links: [
      { url: 'https://heavymachineryprovider.com/link1' },
      { url: 'https://heavymachineryprovider.com/link2' }
    ],
     // Assign the service ID for Heavy Machinery
  },
  {
    name: 'Heavy Machinery',
    projects: [
      { name: 'OSHA Compliance Training', description: 'Ensure workplace safety and regulatory compliance with our comprehensive OSHA compliance training. Protect your employees and your business.' },
      { name: 'Safety Equipment Installation & Inspection', description: 'Equip your workplace with top-of-the-line safety equipment and ensure compliance with regular inspections. Prioritize the well-being of your team.' }
    ],
    links: [
      { url: 'https://safetyprovider.com/link1' },
      { url: 'https://safetyprovider.com/link2' }
    ],
     // Assign the service ID for Safety
  }

];

async function seedServiceProviders() {
  try {
    // Fetch all services from the database
    const services = await prisma.service.findMany();

    for (const serviceProviderData of serviceProvidersData) {
      const { name, projects, links } = serviceProviderData;

      // Find the service corresponding to the service title
      const service = services.find(service => service.title === name);

      if (!service) {
        console.error(`Service with title "${name}" not found.`);
        continue; // Move to the next service provider data
      }

      // Create the service provider without selecting specific fields
      const createdServiceProvider = await prisma.serviceProvider.create({
        data: {
          name,
          projects: {
            create: projects.map(project => ({
              name: project.name,
              description: project.description
            }))
          },
          links: {
            create: links.map(link => ({
              url: link.url
            }))
          },
          // Connect the service with the service provider
       services: { connect: { id: service.id } } 
        }
      });

      console.log(`Service provider "${createdServiceProvider.name}" seeded successfully with projects, links, and associated service.`);
    }

    console.log('Service providers seeded successfully');
  } catch (error) {
    console.error('Error seeding service providers:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after seeding
  }
}



seedServiceProviders();