
import React from 'react';
import { Info } from 'lucide-react';

const SustainabilityScore = ({ product }) => {
  // Calculate a sustainability score based on product attributes
  const calculateSustainabilityScore = () => {
    let score = 0;
    
    // Base score from carbon savings
    if (product.carbonSaved) {
      if (product.carbonSaved > 100) score += 40;
      else if (product.carbonSaved > 50) score += 30;
      else if (product.carbonSaved > 20) score += 20;
      else score += 10;
    }
    
    // Add points based on condition
    switch (product.condition) {
      case 'New':
        score += 5; // New but eco-friendly products
        break;
      case 'Like New':
        score += 20;
        break;
      case 'Good':
        score += 15;
        break;
      case 'Fair':
        score += 10;
        break;
      case 'Refurbished':
        score += 25; // Highest for professionally refurbished
        break;
      default:
        score += 0;
    }
    
    // Add category-specific points
    if (product.category === 'Smart Home') {
      score += 10; // Smart home can help save energy
    }
    
    // Cap the score at 100
    return Math.min(score, 100);
  };
  
  const score = calculateSustainabilityScore();
  
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-green-400';
    if (score >= 40) return 'bg-yellow-400';
    if (score >= 20) return 'bg-orange-400';
    return 'bg-red-400';
  };
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Sustainability Score</span>
          <div className="relative ml-1 group">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible 
                        bg-gray-800 text-white text-xs rounded py-1 px-2 w-48 z-10">
              Score calculated based on carbon savings, product condition, and category-specific factors.
            </div>
          </div>
        </div>
        <span className="text-sm font-bold">{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${getScoreColor()} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SustainabilityScore;
