
import React from "react";
import { Award } from "lucide-react";

const TokenAchievement = () => {
  return (
    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-center gap-3 animate-fade-in">
      <Award className="h-6 w-6 text-amber-500" />
      <div>
        <h3 className="font-medium text-amber-700">Achievement Unlocked!</h3>
        <p className="text-sm text-amber-600">
          You're setting up token economics for your project. This is an advanced feature that 
          will give your users more ways to engage with your platform!
        </p>
      </div>
    </div>
  );
};

export default TokenAchievement;
