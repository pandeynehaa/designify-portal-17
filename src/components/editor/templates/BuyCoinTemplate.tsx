
import React from "react";
import { TrendingUp, DollarSign, Users, Award, ChevronRight, ArrowRight } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";

interface BuyCoinTemplateProps {
  styles: TemplateStyles;
}

const BuyCoinTemplate: React.FC<BuyCoinTemplateProps> = ({ styles }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: styles.collectionBg }}>
    {/* Header with branding */}
    <div
      className="border-b border-gray-800 flex items-center px-8"
      style={{ 
        backgroundColor: styles.headerBg,
        color: styles.headerTextColor,
        height: styles.headerHeight 
      }}
    >
      <div className={`${styles.headingFont} text-3xl tracking-wider bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent`}>MELANIA COIN</div>
      <div className="ml-auto flex items-center space-x-6">
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Home</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">About</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Tokenomics</button>
        <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Roadmap</button>
        <button 
          className="px-5 py-2 font-medium"
          style={{ 
            backgroundColor: styles.buttonBg, 
            color: styles.buttonTextColor,
            borderRadius: styles.buttonRadius
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
    
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <div className="relative py-16" style={{ background: styles.bannerBg }}>
        <div className="max-w-6xl mx-auto px-8 flex">
          <div className="w-1/2">
            <h1 className={`${styles.headingFont} text-6xl mb-6`} style={{ color: styles.bannerTextColor }}>OWN A PIECE<br/>OF HISTORY</h1>
            <p className={`${styles.bodyFont} text-xl mb-8`} style={{ color: styles.bannerTextColor }}>
              Join Melania's community of supporters with the official MELANIA COIN. Exclusive benefits, unique access, and a growing ecosystem.
            </p>
            
            <div className="flex space-x-4 mb-10">
              <button 
                className="hover:bg-cv-purple/90 px-8 py-4 font-medium flex items-center"
                style={{ 
                  backgroundColor: styles.buttonBg, 
                  color: styles.buttonTextColor,
                  borderRadius: styles.buttonRadius
                }}
              >
                Buy MELANIA <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                className="bg-transparent border hover:bg-cv-purple/10 px-8 py-4 font-medium"
                style={{ 
                  borderColor: styles.accentColor, 
                  color: styles.accentColor,
                  borderRadius: styles.buttonRadius
                }}
              >
                View Whitepaper
              </button>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <div className="text-2xl font-medium" style={{ color: styles.accentColor }}>$14.5M</div>
                <div style={{ color: `${styles.bannerTextColor}80` }}>Market Cap</div>
              </div>
              <div>
                <div className="text-2xl font-medium" style={{ color: styles.accentColor }}>125K+</div>
                <div style={{ color: `${styles.bannerTextColor}80` }}>Holders</div>
              </div>
              <div>
                <div className="text-2xl font-medium" style={{ color: styles.accentColor }}>$2.45</div>
                <div style={{ color: `${styles.bannerTextColor}80` }}>Current Price</div>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 flex justify-center items-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full opacity-20 absolute animate-pulse"
                style={{ background: `linear-gradient(to bottom right, #ffbf00, #ff8c00)` }}
              ></div>
              <div className="w-64 h-64 rounded-full flex items-center justify-center relative z-10 border-8"
                style={{ 
                  background: `linear-gradient(to bottom right, #ffbf00, #ff8c00)`,
                  borderColor: styles.headerBg
                }}
              >
                <div className={`${styles.headingFont} text-5xl`} style={{ color: styles.buttonTextColor }}>MELANIA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How to Buy Section */}
      <div className="py-16" style={{ backgroundColor: styles.cardBg }}>
        <div className="max-w-6xl mx-auto px-8">
          <h2 className={`${styles.headingFont} text-4xl mb-12 text-center`} style={{ color: styles.cardTextColor }}>HOW TO BUY MELANIA COIN</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border" style={{ backgroundColor: styles.headerBg, borderColor: styles.borderColor }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" 
                style={{ backgroundColor: `${styles.accentColor}20` }}
              >
                <DollarSign className="w-6 h-6" style={{ color: styles.accentColor }} />
              </div>
              <h3 className={`${styles.headingFont} text-xl mb-3`} style={{ color: styles.cardTextColor }}>1. CREATE WALLET</h3>
              <p className={`${styles.bodyFont}`} style={{ color: `${styles.cardTextColor}80` }}>
                Download MetaMask or your preferred wallet. Create a new wallet and secure your recovery phrase.
              </p>
              <a href="#" className="flex items-center mt-4 text-sm" style={{ color: styles.accentColor }}>
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="p-8 rounded-xl border" style={{ backgroundColor: styles.headerBg, borderColor: styles.borderColor }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" 
                style={{ backgroundColor: `${styles.accentColor}20` }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: styles.accentColor }} />
              </div>
              <h3 className={`${styles.headingFont} text-xl mb-3`} style={{ color: styles.cardTextColor }}>2. BUY ETH OR BNB</h3>
              <p className={`${styles.bodyFont}`} style={{ color: `${styles.cardTextColor}80` }}>
                Purchase Ethereum or BNB through your wallet or transfer from an exchange to your wallet address.
              </p>
              <a href="#" className="flex items-center mt-4 text-sm" style={{ color: styles.accentColor }}>
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="p-8 rounded-xl border" style={{ backgroundColor: styles.headerBg, borderColor: styles.borderColor }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" 
                style={{ backgroundColor: `${styles.accentColor}20` }}
              >
                <Award className="w-6 h-6" style={{ color: styles.accentColor }} />
              </div>
              <h3 className={`${styles.headingFont} text-xl mb-3`} style={{ color: styles.cardTextColor }}>3. SWAP FOR MELANIA</h3>
              <p className={`${styles.bodyFont}`} style={{ color: `${styles.cardTextColor}80` }}>
                Connect to our official website or use Uniswap/PancakeSwap to exchange your ETH/BNB for MELANIA.
              </p>
              <a href="#" className="flex items-center mt-4 text-sm" style={{ color: styles.accentColor }}>
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              className="hover:bg-cv-purple/90 px-8 py-4 font-medium"
              style={{ 
                backgroundColor: styles.buttonBg, 
                color: styles.buttonTextColor,
                borderRadius: styles.buttonRadius
              }}
            >
              Buy MELANIA Coin Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Community Stats */}
      <div className="py-12 border-t" style={{ backgroundColor: styles.collectionBg, borderColor: styles.borderColor }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-3" style={{ color: styles.accentColor }} />
              <div style={{ color: styles.collectionTextColor }}>125,000+ Community Members</div>
            </div>
            <div className="flex space-x-6">
              <a href="#" style={{ color: `${styles.collectionTextColor}80` }} className="hover:text-white transition-colors">Twitter</a>
              <a href="#" style={{ color: `${styles.collectionTextColor}80` }} className="hover:text-white transition-colors">Telegram</a>
              <a href="#" style={{ color: `${styles.collectionTextColor}80` }} className="hover:text-white transition-colors">Discord</a>
              <a href="#" style={{ color: `${styles.collectionTextColor}80` }} className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BuyCoinTemplate;
