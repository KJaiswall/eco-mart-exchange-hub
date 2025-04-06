
import React from 'react';
import { 
  Leaf, Recycle, Cpu, TreePine, Wind, LifeBuoy,
  Code, Server, Gauge, Fuel, Flame, Share2
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GreenSoftwarePrinciples = () => {
  const principles = [
    {
      title: "Energy Efficiency",
      description: "Our platform uses energy-efficient algorithms and code to minimize power consumption during usage, optimizing resource utilization.",
      icon: <Wind className="h-8 w-8 text-eco-primary" />,
      details: "We implement energy patterns like caching, lazy loading, and code splitting to reduce computational intensity."
    },
    {
      title: "Reduce E-Waste",
      description: "By extending the lifecycle of electronic devices, our marketplace directly reduces e-waste generation and conserves resources.",
      icon: <Recycle className="h-8 w-8 text-eco-primary" />,
      details: "Every refurbished device kept in circulation saves approximately 1.5kg of e-waste from entering landfills."
    },
    {
      title: "Sustainable Infrastructure",
      description: "We deploy our application on cloud servers powered by renewable energy, minimizing our carbon footprint.",
      icon: <Cpu className="h-8 w-8 text-eco-primary" />,
      details: "Our hosting services run on data centers with PUE (Power Usage Effectiveness) ratings below 1.2."
    },
    {
      title: "Carbon Transparency",
      description: "We calculate and provide transparent carbon savings measurements for each transaction, promoting awareness and better decision-making.",
      icon: <TreePine className="h-8 w-8 text-eco-primary" />,
      details: "Our carbon calculation models factor in manufacturing emissions, transportation, and energy usage differences between new and refurbished items."
    },
    {
      title: "Green Software Development",
      description: "Our developers follow sustainable coding practices including efficient algorithms, optimized database queries, and reduced network calls.",
      icon: <Code className="h-8 w-8 text-eco-primary" />,
      details: "We conduct regular code reviews with carbon efficiency as a key metric, optimizing our application's environmental impact."
    },
    {
      title: "Community Impact",
      description: "We donate a portion of our proceeds to environmental causes and e-waste recycling programs in underserved communities.",
      icon: <LifeBuoy className="h-8 w-8 text-eco-primary" />,
      details: "Through our partnerships with local recycling initiatives, we've helped establish 5 community e-waste collection centers."
    },
    {
      title: "Data Center Optimization",
      description: "We optimize our data storage and processing to reduce server resource requirements and cooling needs.",
      icon: <Server className="h-8 w-8 text-eco-primary" />,
      details: "By implementing database indexing and query optimization, we've reduced our server load by over 40%."
    },
    {
      title: "Performance Monitoring",
      description: "We continuously monitor application performance to identify and eliminate inefficiencies that waste computational resources.",
      icon: <Gauge className="h-8 w-8 text-eco-primary" />,
      details: "Our monitoring tools track energy consumption patterns and help us optimize during peak usage periods."
    },
    {
      title: "Carbon-Aware Computing",
      description: "We schedule resource-intensive background processes during times when the electricity grid has more renewable energy.",
      icon: <Fuel className="h-8 w-8 text-eco-primary" />,
      details: "By timing our heaviest computing tasks to align with peak renewable energy production, we reduce our carbon intensity by up to 30%."
    },
    {
      title: "Efficient Frontend Design",
      description: "Our user interface is designed to minimize browser reflows and repaints, reducing device energy consumption.",
      icon: <Flame className="h-8 w-8 text-eco-primary" />,
      details: "We use virtual scrolling, code splitting, and image optimization to create a lightweight but powerful user experience."
    },
    {
      title: "Open Source Contribution",
      description: "We share our sustainable development practices and tools with the wider development community.",
      icon: <Share2 className="h-8 w-8 text-eco-primary" />,
      details: "Our team has contributed to several open source projects focused on measuring and reducing software carbon footprints."
    }
  ];

  return (
    <div className="py-16 bg-eco-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-eco-dark mb-4">Green Software Principles</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is built following sustainable software engineering practices to minimize 
            our environmental footprint while providing an exceptional user experience.
          </p>
        </div>
        
        {/* Desktop View - Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.slice(0, 6).map((principle, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md eco-card-hover">
              <div className="flex items-center h-16 w-16 rounded-full bg-eco-light mb-4 justify-center">
                {principle.icon}
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">{principle.title}</h3>
              <p className="text-gray-600 mb-3">{principle.description}</p>
              <p className="text-sm text-eco-primary">{principle.details}</p>
            </div>
          ))}
        </div>
        
        {/* Mobile View - Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {principles.map((principle, index) => (
                <CarouselItem key={index} className="pl-4">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center h-16 w-16 rounded-full bg-eco-light mb-4 justify-center">
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-eco-dark mb-2">{principle.title}</h3>
                    <p className="text-gray-600 mb-3">{principle.description}</p>
                    <p className="text-sm text-eco-primary">{principle.details}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
        </div>
        
        {/* View All Principles - Modal Trigger Button */}
        <div className="text-center mt-8">
          <a 
            href="#all-principles" 
            className="inline-flex items-center px-6 py-3 bg-eco-primary text-white rounded-md font-medium hover:bg-eco-primary/90 transition-colors"
          >
            Explore All Our Green Principles
          </a>
        </div>
      </div>
    </div>
  );
};

export default GreenSoftwarePrinciples;
