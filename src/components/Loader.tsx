"use client";

import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate progress (or you can connect this to actual API progress)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95; // Don't go to 100 until API completes
          return prev + Math.floor(Math.random() * 10) + 1;
        });
      }, 300);
    }

    return () => clearInterval(timer);
  }, [isVisible]);

  // Show loader when API calls start
  useEffect(() => {
    const showLoader = () => {
      setIsVisible(true);
      setProgress(0);
    };

    const hideLoader = () => {
      setProgress(100);
      setTimeout(() => setIsVisible(false), 300);
    };

    // Listen to fetch events
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      showLoader();
      try {
        const response = await originalFetch(...args);
        hideLoader();
        return response;
      } catch (error) {
        hideLoader();
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md px-4">
        {/* Animated gradient border */}
        <div className="relative p-0.5 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 animate-gradient-x">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              {/* Animated spinner */}
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 border-b-amber-500 animate-spin"></div>
                <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-pink-300 border-r-amber-300 border-b-purple-300 animate-spin-reverse"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">Loading content</h3>
                <p className="text-sm text-gray-400">Fetching the latest data...</p>
                
                {/* Progress bar */}
                <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <p className="mt-1 text-xs text-right text-gray-400">{progress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}