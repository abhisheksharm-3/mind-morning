'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";

const Salutation: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchGreeting = async () => {
    setIsLoading(true);
    try {
      const timeOfDay = getTimeOfDay();
      const response = await fetch(`/api/get-greeting?timeOfDay=${timeOfDay}`);
      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (error) {
      console.error('Error fetching greeting:', error);
      setGreeting("Welcome back, Internet explorer");
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 5) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    if (hour < 22) return "evening";
    return "night";
  };

  useEffect(() => {
    fetchGreeting();
    const timer = setInterval(fetchGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin text-white" />;
  }

  return (
    <h1 className="text-4xl font-inter font-bold text-white">
      {greeting}
    </h1>
  );
};

export default Salutation;