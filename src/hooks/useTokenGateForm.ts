
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSettingsProgress } from "./useSettingsProgress";

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
  
  // Define required and optional fields for tracking progress
  const requiredFields = [
    'contractAddress', 
    'network', 
    'tokenType', 
    'minTokensRequired',
    'accessDuration',
    'adminAddress'
  ];
  
  const optionalFields = [
    'allowERC1155',
    'multipleCollectionsEnabled',
    'additionalCollections',
    'customRedirectUrl'
  ];

  // Use the shared settings progress hook
  useSettingsProgress({
    watch: form.watch,
    requiredFields,
    optionalFields,
    onProgressChange,
    requiredWeight: 0.8,
    optionalWeight: 0.2
  });

  return {
    form,
    formValues
  };
};

export default useTokenGateForm;
