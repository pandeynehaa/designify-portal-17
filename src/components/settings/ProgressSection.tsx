
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, Circle } from "lucide-react";

interface ProgressSectionProps {
  sections: Record<string, boolean>;
  title: string;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ sections, title }) => {
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    // Calculate percentage of completed sections
    const totalSections = Object.keys(sections).length;
    const completedSections = Object.values(sections).filter(Boolean).length;
    const percentage = Math.round((completedSections / totalSections) * 100);
    
    // Animate progress value
    const timer = setTimeout(() => setProgressValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [sections]);

  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border animate-fade-in">
      <h3 className="text-lg font-medium mb-3">{title} Setup Progress</h3>
      
      <Progress value={progressValue} className="h-2 mb-4" />
      
      <div className="text-sm font-medium">
        {progressValue}% complete
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {Object.entries(sections).map(([name, isComplete]) => (
          <div 
            key={name} 
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              isComplete ? "text-green-600 bg-green-50 dark:bg-green-950/20" : "text-muted-foreground"
            }`}
          >
            {isComplete ? (
              <Check className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
