
import React, { useState } from 'react';
import { Cpu, Leaf, Recycle } from 'lucide-react';

const ImpactCard = ({ title, description, icon, isActive, onClick }) => {
  return (
    <div 
      className={`rounded-lg p-6 transition-all duration-300 cursor-pointer 
        ${isActive 
          ? 'bg-eco-primary text-white shadow-lg scale-105' 
          : 'bg-white text-eco-dark hover:shadow-md'
        }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full ${isActive ? 'bg-white/20' : 'bg-eco-light'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      
      <div className={`space-y-2 ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
        {description.map((item, index) => (
          <p key={index} className="text-sm">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

const InteractiveImpactSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [impactStats, setImpactStats] = useState({
    devicesReused: 1267,
    carbonSaved: 87450,
    energySaved: 125650
  });
  
  const impactCards = [
    {
      title: "Device Reuse",
      description: [
        "Every device that finds a second home reduces e-waste.",
        "We've helped keep over 1,200 devices out of landfills so far.",
        "Electronic waste is one of the fastest growing waste streams globally."
      ],
      icon: <Recycle className={`h-6 w-6 ${activeCard === 0 ? 'text-eco-primary' : 'text-eco-primary'}`} />,
      stat: `${impactStats.devicesReused}+ devices`,
      statLabel: "Given a second life"
    },
    {
      title: "Carbon Reduction",
      description: [
        "Manufacturing new electronics has a huge carbon footprint.",
        "By extending device lifecycles, we're reducing CO₂ emissions.",
        "Each refurbished phone saves approximately 80kg of CO₂."
      ],
      icon: <Leaf className={`h-6 w-6 ${activeCard === 1 ? 'text-eco-primary' : 'text-eco-primary'}`} />,
      stat: `${impactStats.carbonSaved}+ kg`,
      statLabel: "CO₂ emissions prevented"
    },
    {
      title: "Energy Conservation",
      description: [
        "Our platform runs on green hosting with renewable energy.",
        "We optimize code and images to minimize energy consumption.",
        "Efficient tech choices reduce the energy needed per page view."
      ],
      icon: <Cpu className={`h-6 w-6 ${activeCard === 2 ? 'text-eco-primary' : 'text-eco-primary'}`} />,
      stat: `${impactStats.energySaved}+ kWh`,
      statLabel: "Energy saved through efficiency"
    }
  ];

  // Add animated incremental effect to counter
  React.useEffect(() => {
    const interval = setInterval(() => {
      setImpactStats(prev => ({
        devicesReused: prev.devicesReused + Math.floor(Math.random() * 3),
        carbonSaved: prev.carbonSaved + Math.floor(Math.random() * 25),
        energySaved: prev.energySaved + Math.floor(Math.random() * 30),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center text-eco-dark mb-6">Our Environmental Impact</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {impactCards.map((card, index) => (
          <ImpactCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            isActive={activeCard === index}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>
      
      <div className="bg-eco-light/30 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-eco-dark mb-3">{impactCards[activeCard].stat}</h3>
        <p className="text-eco-primary font-medium">{impactCards[activeCard].statLabel}</p>
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-eco-primary h-2.5 rounded-full animate-pulse" 
            style={{ width: `${(activeCard + 1) * 33}%` }}
          ></div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Our progress toward 2025 sustainability goals</p>
      </div>
    </div>
  );
};

export default InteractiveImpactSection;
