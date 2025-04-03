
import React from 'react';
import { Leaf, Recycle, Cpu, TreePine, Wind, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarbonCalculator from '../components/CarbonCalculator';
import InteractiveImpactSection from '../components/InteractiveImpactSection';

const AboutPage = () => {
  const team = [
    {
      name: "Maya Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Environmental scientist with a passion for sustainable technology."
    },
    {
      name: "Daniel Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80", 
      bio: "Electronics engineer focused on extending product lifecycles."
    },
    {
      name: "Sophia Rodriguez",
      role: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Climate policy expert dedicated to reducing electronic waste."
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Consumer electronics specialist with a focus on circular economy."
    }
  ];

  const greenPrinciples = [
    {
      title: "Energy Efficiency",
      description: "Our platform is designed with energy-efficient code and hosting solutions to minimize power consumption.",
      icon: <Wind className="h-8 w-8 text-eco-primary" />
    },
    {
      title: "Reduce E-Waste",
      description: "By facilitating the reuse of electronics, we help extend product lifecycles and reduce electronic waste.",
      icon: <Recycle className="h-8 w-8 text-eco-primary" />
    },
    {
      title: "Sustainable Infrastructure",
      description: "Our servers run on renewable energy and we prioritize cloud services with strong environmental commitments.",
      icon: <Cpu className="h-8 w-8 text-eco-primary" />
    },
    {
      title: "Carbon Transparency",
      description: "We calculate and display the carbon savings for each product to encourage environmentally conscious decisions.",
      icon: <TreePine className="h-8 w-8 text-eco-primary" />
    },
    {
      title: "Green Software Practices",
      description: "We follow green software engineering principles like efficient algorithms and sustainable development practices.",
      icon: <Leaf className="h-8 w-8 text-eco-primary" />
    },
    {
      title: "Community Impact",
      description: "We donate a portion of our proceeds to environmental causes and e-waste recycling programs.",
      icon: <LifeBuoy className="h-8 w-8 text-eco-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-eco-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Our Mission</h1>
            <p className="text-xl max-w-3xl mx-auto animate-fade-in">
              At Eco-Mart Exchange Hub, we're committed to reducing electronic waste and carbon emissions
              by creating a platform that gives electronics a second life.
            </p>
          </div>
        </div>
      </section>

      {/* Carbon Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-dark mb-4">Our Carbon Footprint</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparency is key to sustainability. See how we're measuring and reducing 
              our website's carbon emissions in real-time.
            </p>
          </div>
          
          <CarbonCalculator />
        </div>
      </section>

      {/* Interactive Impact Section */}
      <section className="py-16 bg-eco-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveImpactSection />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2023, Eco-Mart Exchange Hub was born from a simple observation: 
                  millions of electronic devices are discarded every year while still functional, 
                  contributing to a growing e-waste crisis and unnecessary carbon emissions.
                </p>
                <p>
                  Our founder, Maya Johnson, experienced firsthand the difficulty of finding a 
                  reliable marketplace for pre-loved electronics. She envisioned a platform that 
                  would make it easy to buy and sell used electronics while also educating consumers 
                  about the environmental impact of their choices.
                </p>
                <p>
                  Today, we're proud to offer a sustainable alternative to buying new electronics.
                  Every device that finds a second home through our platform represents a significant 
                  reduction in carbon emissions and e-waste.
                </p>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1603695762547-fba8b92b7e25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=767&q=80" 
                alt="Electronic devices being reused" 
                className="rounded-lg shadow-lg hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Green Software Principles */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-dark mb-4">Green Software Principles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is built following sustainable software engineering practices to minimize 
              our environmental footprint while providing an exceptional user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {greenPrinciples.map((principle, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md eco-card-hover">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-eco-light mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold text-eco-dark mb-2">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-dark mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our passionate team combines expertise in technology, sustainability, 
              and business to create a platform that makes a positive impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md eco-card-hover">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-eco-dark">{member.name}</h3>
                  <p className="text-sm text-eco-primary mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Sustainable Revolution</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Start buying and selling pre-loved electronics today and be part of the solution to 
              reduce e-waste and carbon emissions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/buy" 
                className="px-6 py-3 bg-white text-eco-primary rounded-md font-medium 
                          hover:bg-eco-light transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/sell" 
                className="px-6 py-3 bg-transparent text-white border border-white rounded-md font-medium
                          hover:bg-white/10 transition-colors"
              >
                Sell Your Device
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
