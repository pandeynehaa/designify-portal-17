
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface UseTokenGateFormProps {
  onProgressChange?: (progress: number) => void;
}

export const useTokenGateForm = ({ onProgressChange }: UseTokenGateFormProps = {}) => {
  const form = useForm({
    defaultValues: {
      contractAddress: "0x3456789012abcdef3456789012abcdef34567890",
      network: "ethereum",
      tokenType: "ERC721",
      minTokensRequired: "1",
      allowERC1155: true,
      multipleCollectionsEnabled: false,
      additionalCollections: "",
      accessDuration: "30",
      customRedirectUrl: "https://members.example.com",
      adminAddress: "0xcdef1234567890abcdef1234567890abcdef1234"
    }
  });

  const formValues = form.watch();
  
  useEffect(() => {
    const allFields = Object.keys(formValues);
    const completedFields = allFields.filter(
      field => {
        const value = formValues[field as keyof typeof formValues];
        return value !== undefined && value.toString().trim() !== '';
      }
    ).length;
    
    const totalProgress = (completedFields / allFields.length) * 100;
    
    if (onProgressChange) {
      onProgressChange(totalProgress);
    }
  }, [formValues, onProgressChange]);

  return {
    form,
    formValues
  };
};

export default useTokenGateForm;
