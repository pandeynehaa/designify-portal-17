
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ThemeActions: React.FC = () => {
  return (
    <>
      <div>
        <Button 
          className="w-full bg-cv-purple hover:bg-cv-purple/90 text-white"
          onClick={() => {
            toast({
              title: "Theme Saved",
              description: "Your custom theme has been saved to your library."
            });
          }}
        >
          Save Theme to Library
        </Button>
      </div>
      
      <div>
        <Button 
          variant="outline" 
          className="w-full border-cv-purple text-cv-purple hover:bg-cv-purple hover:text-white"
          onClick={() => {
            toast({
              title: "Theme Exported",
              description: "Your theme settings have been exported to a file."
            });
          }}
        >
          Export Theme Settings
        </Button>
      </div>
    </>
  );
};

export default ThemeActions;
