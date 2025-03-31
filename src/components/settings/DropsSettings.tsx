
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

// Import our new components
import ContractSection from "./drops/ContractSection";
import MintOptionsSection from "./drops/MintOptionsSection";
import SalePeriodSection from "./drops/SalePeriodSection";
import PresaleSection from "./drops/PresaleSection";
import RevealSection from "./drops/RevealSection";
import CreatorSection from "./drops/CreatorSection";
import DropsProgress from "./drops/DropsProgress";
import { DropsFormValues } from "./drops/types";

const DropsSettings = () => {
  const form = useForm<DropsFormValues>({
    defaultValues: {
      contractAddress: "0x2345678901abcdef2345678901abcdef23456789",
      network: "ethereum",
      mintPrice: "0.08",
      maxSupply: "10000",
      maxPerWallet: "5",
      publicSaleStart: "2023-12-01T12:00",
      publicSaleEnd: "2023-12-31T12:00",
      presaleEnabled: true,
      presaleStart: "2023-11-25T12:00",
      presaleEnd: "2023-11-30T12:00",
      presaleWhitelist: "0x123..., 0x456..., 0x789...",
      revealType: "delayed",
      royaltyFee: "7.5",
      creatorAddress: "0xdef1234567890abcdef1234567890abcdef123456"
    }
  });

  const handleSubmit = (data: DropsFormValues) => {
    console.log("Form data:", data);
    toast({
      title: "NFT Drop Settings Saved",
      description: "Your NFT drop settings have been updated successfully."
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">NFT Drops Contract Settings</h2>
          <Button onClick={form.handleSubmit(handleSubmit)}>
            Save Settings
          </Button>
        </div>

        <DropsProgress formValues={form.watch()} />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
                <CardDescription>Configure your NFT smart contract information</CardDescription>
              </CardHeader>
              <CardContent>
                <ContractSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Minting Options</CardTitle>
                <CardDescription>Configure pricing and supply for your NFT collection</CardDescription>
              </CardHeader>
              <CardContent>
                <MintOptionsSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Public Sale Period</CardTitle>
                <CardDescription>Set when users can mint your NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <SalePeriodSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Presale Configuration</CardTitle>
                <CardDescription>Give early access to selected collectors</CardDescription>
              </CardHeader>
              <CardContent>
                <PresaleSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reveal & Royalties</CardTitle>
                <CardDescription>Configure reveal timing and creator royalties</CardDescription>
              </CardHeader>
              <CardContent>
                <RevealSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Creator Details</CardTitle>
                <CardDescription>Set the wallet that receives mint proceeds and royalties</CardDescription>
              </CardHeader>
              <CardContent>
                <CreatorSection form={form} />
              </CardContent>
            </Card>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default DropsSettings;
