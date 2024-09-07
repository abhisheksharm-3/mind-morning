"use client"
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from 'next-themes';
import { Sun, Moon, Clock } from 'lucide-react';

const NewTabHomepage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [salutation, setSalutation] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
     
      const totalSeconds = (endOfDay.getTime() - startOfDay.getTime()) / 1000;
      const elapsedSeconds = (now.getTime() - startOfDay.getTime()) / 1000;
      const remainingSeconds = totalSeconds - elapsedSeconds;
      const progressPercentage = (elapsedSeconds / totalSeconds) * 100;

      setProgress(progressPercentage);

      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      setTimeLeft(`${hours}h ${minutes}m`);

      // Update salutation based on time of day
      const hour = now.getHours();
      if (hour < 12) setSalutation('Good morning');
      else if (hour < 18) setSalutation('Good afternoon');
      else setSalutation('Good evening');
    };

    updateProgress();
    const timer = setInterval(updateProgress, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{salutation}</span>
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full h-2" />
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">
            {progress.toFixed(1)}% of today completed
          </p>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <p className="text-sm font-semibold">
              {timeLeft} remaining
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewTabHomepage;