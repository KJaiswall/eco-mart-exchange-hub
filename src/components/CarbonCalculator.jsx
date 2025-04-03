
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const CarbonCalculator = () => {
  const [websiteStats, setWebsiteStats] = useState({
    pageViews: 0,
    serverLocation: 'Green Data Center',
    websiteSize: 0,
    mediaContent: 0,
  });
  
  const [carbonEmission, setCarbonEmission] = useState(0);
  const [comparisonStats, setComparisonStats] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Simulate real-time counter for page views
    const interval = setInterval(() => {
      setWebsiteStats(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const estimateWebsiteSize = () => {
    // Simulate website size calculation (in KB)
    return Math.floor(Math.random() * (500 - 200) + 200);
  };

  const estimateMediaContent = () => {
    // Simulate media content size calculation (in KB)
    return Math.floor(Math.random() * (2000 - 500) + 500);
  };
  
  const calculateCarbon = () => {
    setIsCalculating(true);
    
    // Update website stats with "measured" data
    const newStats = {
      ...websiteStats,
      websiteSize: estimateWebsiteSize(),
      mediaContent: estimateMediaContent(),
    };
    
    setWebsiteStats(newStats);
    
    // Calculate carbon emission (a simplified model)
    // Formula: (websiteSize + mediaContent) * pageViews * 0.0002 (g CO2e per KB)
    const totalSize = newStats.websiteSize + newStats.mediaContent;
    const emission = totalSize * newStats.pageViews * 0.0002;
    
    // Create comparison data
    const averageEcommerce = emission * 1.5;
    const nonOptimized = emission * 2.8;
    
    const newComparisonStats = [
      { name: 'Eco-Mart', value: parseFloat(emission.toFixed(2)) },
      { name: 'Avg E-commerce', value: parseFloat(averageEcommerce.toFixed(2)) },
      { name: 'Non-optimized', value: parseFloat(nonOptimized.toFixed(2)) },
    ];
    
    setTimeout(() => {
      setCarbonEmission(parseFloat(emission.toFixed(2)));
      setComparisonStats(newComparisonStats);
      setIsCalculating(false);
    }, 1500); // Simulate calculation time
  };

  const getTreesNeeded = (carbonGrams) => {
    // Very simplified estimate: 1 tree absorbs about 25kg CO2 per year
    // Convert our grams to percentage of 25kg
    return (carbonGrams / 25000).toFixed(5);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Activity className="h-7 w-7 text-eco-primary mr-3" />
        <h3 className="text-2xl font-semibold text-eco-dark">Website Carbon Calculator</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current page views:</p>
              <p className="text-2xl font-medium">{websiteStats.pageViews}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Server location:</p>
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <p className="font-medium">{websiteStats.serverLocation}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={calculateCarbon}
                disabled={isCalculating}
                className="px-5 py-2 bg-eco-primary text-white rounded-md font-medium hover:bg-eco-primary/90 transition-colors disabled:opacity-70"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Carbon Footprint'}
              </button>
            </div>
          </div>
          
          {carbonEmission > 0 && (
            <div className="mt-6 p-4 border border-eco-light rounded-md bg-eco-light/20">
              <h4 className="font-semibold text-eco-dark mb-2">Results</h4>
              <p className="text-sm text-gray-600 mb-1">Estimated carbon emission:</p>
              <p className="text-3xl font-bold text-eco-primary">{carbonEmission} g CO2e</p>
              <p className="text-xs text-gray-500 mt-1">Based on current website data</p>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">This is equivalent to:</p>
                <p className="text-sm font-medium mt-1">
                  {getTreesNeeded(carbonEmission)} trees needed to absorb this CO2 per year
                </p>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">Our website is using:</p>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• Green hosting with renewable energy</li>
                  <li>• Optimized images and compressed assets</li>
                  <li>• Efficient code practices</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-80">
          {comparisonStats.length > 0 ? (
            <div>
              <h4 className="font-semibold text-eco-dark mb-3">Compare with other websites</h4>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={comparisonStats}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    label={{ 
                      value: 'CO2e (grams)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: 12 }
                    }} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} g CO2e`, 'Carbon emission']}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2F7336" 
                    radius={[4, 4, 0, 0]}
                    name="Carbon emission" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                Click "Calculate Carbon Footprint" to see comparison with other websites
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
