
import React from "react";
import { Lock, Shield, Wallet, Check } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";

interface TokenGateTemplateProps {
  styles: TemplateStyles;
}

const TokenGateTemplate: React.FC<TokenGateTemplateProps> = ({ styles }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: styles.collectionBg }}>
    {/* Header */}
    <div 
      className="border-b border-gray-800 flex items-center px-8"
      style={{ 
        backgroundColor: styles.headerBg,
        color: styles.headerTextColor,
        height: styles.headerHeight 
      }}
    >
      <div className={`${styles.headingFont} text-2xl tracking-wider`}>EXCLUSIVE ACCESS</div>
      <div className="ml-auto flex items-center space-x-6">
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Home</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Products</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Membership</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">FAQ</button>
        <button 
          style={{ 
            backgroundColor: styles.buttonBg, 
            color: styles.buttonTextColor,
            borderRadius: styles.buttonRadius
          }}
          className="px-4 py-2 flex items-center space-x-2"
        >
          <Wallet className="h-4 w-4" />
          <span>Connect</span>
        </button>
      </div>
    </div>
    
    <div className="flex-1 flex justify-center items-center p-10" 
      style={{ 
        background: styles.bannerBg,
        color: styles.bannerTextColor
      }}
    >
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl border" 
        style={{ borderColor: styles.borderColor }}
      >
        {/* Left side: Token gate */}
        <div className="w-1/2 p-12 flex flex-col justify-center" style={{ backgroundColor: styles.cardBg }}>
          <div className="mb-8 flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: styles.accentColor }}
            >
              <Lock className="text-white w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className={`${styles.headingFont} text-2xl`} style={{ color: styles.cardTextColor }}>TOKEN REQUIRED</h2>
              <p style={{ color: `${styles.cardTextColor}80` }}>Verify ownership to continue</p>
            </div>
          </div>
          
          <div className="mb-8">
            <p className={`${styles.bodyFont} mb-6`} style={{ color: styles.cardTextColor }}>
              This exclusive product is only available to members holding our Membership NFT. Connect your wallet to verify ownership.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3" 
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Check className="w-4 h-4" style={{ color: styles.accentColor }} />
                </div>
                <span style={{ color: styles.cardTextColor }}>Lifetime access to exclusive drops</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3" 
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Check className="w-4 h-4" style={{ color: styles.accentColor }} />
                </div>
                <span style={{ color: styles.cardTextColor }}>40% discount on all products</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3" 
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Check className="w-4 h-4" style={{ color: styles.accentColor }} />
                </div>
                <span style={{ color: styles.cardTextColor }}>Access to members-only events</span>
              </div>
            </div>
          </div>
          
          <button 
            className="py-4 px-6 rounded-lg font-medium w-full flex items-center justify-center space-x-2"
            style={{ 
              backgroundColor: styles.buttonBg, 
              color: styles.buttonTextColor,
              borderRadius: styles.buttonRadius
            }}
          >
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </button>
          
          <div className="mt-4 text-center text-sm" style={{ color: `${styles.cardTextColor}80` }}>
            Don't have the token? <a href="#" style={{ color: styles.accentColor }}>Purchase a membership</a>
          </div>
        </div>
        
        {/* Right side: Product preview */}
        <div className="w-1/2 p-12 flex flex-col" 
          style={{ 
            background: `linear-gradient(to bottom right, ${styles.headerBg}, ${styles.cardBg})` 
          }}
        >
          <div className="mb-6 flex justify-between items-center">
            <h2 className={`${styles.headingFont} text-2xl`} style={{ color: styles.cardTextColor }}>LIMITED EDITION</h2>
            <div className="px-3 py-1 rounded-md text-sm font-medium" 
              style={{ 
                backgroundColor: `${styles.accentColor}20`, 
                color: styles.accentColor 
              }}
            >
              MEMBERS ONLY
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="w-64 h-64 rounded-lg flex items-center justify-center" 
              style={{ 
                background: `linear-gradient(to bottom right, ${styles.accentColor}20, #0000ff20)` 
              }}
            >
              <div className="w-48 h-48 rounded-lg transform rotate-12 shadow-lg flex items-center justify-center" 
                style={{ 
                  background: `linear-gradient(to bottom right, ${styles.accentColor}, #0000ff)` 
                }}
              >
                <Shield className="w-16 h-16 text-white transform -rotate-12" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className={`${styles.headingFont} text-xl`} style={{ color: styles.cardTextColor }}>CRYPTO GUARDIAN HOODIE</h3>
            <p className={`${styles.bodyFont}`} style={{ color: `${styles.cardTextColor}80` }}>Limited edition, premium quality hoodie exclusive to token holders. Only 200 will ever be made.</p>
            
            <div className="flex justify-between">
              <div>
                <div style={{ color: `${styles.cardTextColor}80` }} className="text-sm">Price</div>
                <div style={{ color: styles.cardTextColor }} className="font-medium">$120.00 USD</div>
              </div>
              <div>
                <div style={{ color: `${styles.cardTextColor}80` }} className="text-sm">Available</div>
                <div style={{ color: styles.cardTextColor }} className="font-medium">43/200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TokenGateTemplate;
