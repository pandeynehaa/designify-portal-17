
import React from "react";
import { Lock, Shield, Wallet, Check } from "lucide-react";

const TokenGateTemplate: React.FC = () => (
  <div className="h-full bg-[#0A0A10] flex flex-col">
    {/* Header */}
    <div className="h-16 border-b border-gray-800 flex items-center px-8 bg-[#14141A]">
      <div className="font-display text-2xl text-white tracking-wider">EXCLUSIVE ACCESS</div>
      <div className="ml-auto flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white transition-colors">Home</button>
        <button className="text-gray-300 hover:text-white transition-colors">Products</button>
        <button className="text-gray-300 hover:text-white transition-colors">Membership</button>
        <button className="text-gray-300 hover:text-white transition-colors">FAQ</button>
        <button className="bg-cv-purple text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect</span>
        </button>
      </div>
    </div>
    
    <div className="flex-1 flex justify-center items-center p-10 bg-gradient-to-b from-[#0A0A10] to-[#14141A]">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
        {/* Left side: Token gate */}
        <div className="w-1/2 bg-[#14141A] p-12 flex flex-col justify-center">
          <div className="mb-8 flex items-center">
            <div className="w-12 h-12 bg-cv-purple rounded-full flex items-center justify-center">
              <Lock className="text-white w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="font-display text-2xl text-white">TOKEN REQUIRED</h2>
              <p className="text-gray-400">Verify ownership to continue</p>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-300 mb-6">
              This exclusive product is only available to members holding our Membership NFT. Connect your wallet to verify ownership.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-cv-purple/20 flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-cv-purple" />
                </div>
                <span className="text-gray-300">Lifetime access to exclusive drops</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-cv-purple/20 flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-cv-purple" />
                </div>
                <span className="text-gray-300">40% discount on all products</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-cv-purple/20 flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-cv-purple" />
                </div>
                <span className="text-gray-300">Access to members-only events</span>
              </div>
            </div>
          </div>
          
          <button className="bg-cv-purple text-white py-4 px-6 rounded-lg font-medium w-full flex items-center justify-center space-x-2">
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </button>
          
          <div className="mt-4 text-center text-gray-500 text-sm">
            Don't have the token? <a href="#" className="text-cv-purple">Purchase a membership</a>
          </div>
        </div>
        
        {/* Right side: Product preview */}
        <div className="w-1/2 bg-gradient-to-br from-[#1A1A24] to-[#14141A] p-12 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-display text-2xl text-white">LIMITED EDITION</h2>
            <div className="bg-cv-purple/20 text-cv-purple px-3 py-1 rounded-md text-sm font-medium">MEMBERS ONLY</div>
          </div>
          
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-cv-purple/20 to-blue-500/20 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-cv-purple to-blue-500 rounded-lg transform rotate-12 shadow-lg flex items-center justify-center">
                <Shield className="w-16 h-16 text-white transform -rotate-12" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-display text-xl text-white">CRYPTO GUARDIAN HOODIE</h3>
            <p className="text-gray-400">Limited edition, premium quality hoodie exclusive to token holders. Only 200 will ever be made.</p>
            
            <div className="flex justify-between">
              <div>
                <div className="text-gray-400 text-sm">Price</div>
                <div className="text-white font-medium">$120.00 USD</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Available</div>
                <div className="text-white font-medium">43/200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TokenGateTemplate;
