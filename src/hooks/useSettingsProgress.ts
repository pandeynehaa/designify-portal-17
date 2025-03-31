
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

interface UseSettingsProgressProps {
  watch: UseFormWatch<any>;
  requiredFields?: string[];
  optionalFields?: string[];
  onProgressChange?: (progress: number) => void;
  requiredWeight?: number;
  optionalWeight?: number;
}

/**
 * Hook to track form completion progress
 */
export const useSettingsProgress = ({
  watch,
  requiredFields = [],
  optionalFields = [],
  onProgressChange,
  requiredWeight = 0.7,
  optionalWeight = 0.3
}: UseSettingsProgressProps) => {
  const formValues = watch();
  
  useEffect(() => {
    const completedRequired = requiredFields.filter(
      field => formValues[field]?.toString().trim() !== ''
    ).length;
    
    const completedOptional = optionalFields.filter(
      field => formValues[field] !== undefined
    ).length;
    
    const requiredProgress = 
      (completedRequired / (requiredFields.length || 1)) * requiredWeight * 100;
    
    const optionalProgress = 
      (completedOptional / (optionalFields.length || 1)) * optionalWeight * 100;
    
    const totalProgress = requiredProgress + optionalProgress;
    
    if (onProgressChange) {
      onProgressChange(totalProgress);
    }
    
    return () => {};
  }, [formValues, onProgressChange, requiredFields, optionalFields, requiredWeight, optionalWeight]);
};
