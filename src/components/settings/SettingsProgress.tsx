
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsProgressProps {
  progress: number;
  activeTab: string;
}

const SettingsProgress = ({ progress, activeTab }: SettingsProgressProps) => {
  // Color based on progress
  const getProgressColor = (value: number) => {
    if (value < 30) return "bg-red-500";
    if (value < 60) return "bg-amber-500";
    if (value < 90) return "bg-blue-500";
    return "bg-green-500";
  };

  // Get congratulatory message based on progress
  const getMessage = (value: number) => {
    if (value < 30) return "Just getting started!";
    if (value < 60) return "Making good progress!";
    if (value < 90) return "Almost there!";
    return "Awesome! You've completed this section.";
  };

  return (
    <div className="mb-8 space-y-3 bg-card rounded-lg border border-border p-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Setup Progress</h3>
          {progress >= 100 && (
            <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
          )}
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg mr-2">{Math.min(100, Math.floor(progress))}%</span>
          {Array.from({ length: Math.floor(progress / 20) }).map((_, index) => (
            <Star 
              key={index} 
              className={cn(
                "h-4 w-4 fill-current", 
                index < 3 ? "text-amber-400" : "text-blue-500"
              )}
            />
          ))}
        </div>
      </div>
      
      <Progress 
        value={Math.min(100, progress)} 
        className="h-2" 
        indicatorColor={getProgressColor(progress)}
      />
      
      <p className="text-sm text-muted-foreground">
        {getMessage(progress)}
      </p>
    </div>
  );
};

export default SettingsProgress;
