
import React from "react";
import { CalendarDays, Clock, Wallet, Share2 } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";
import { useCanvasState } from "../../../hooks/useCanvasState";

interface DropsTemplateProps {
  styles: TemplateStyles;
}

const DropsTemplate: React.FC<DropsTemplateProps> = ({ styles }) => {
  const { droppedElements, editMode } = useCanvasState();
  
  // Filter template components meant for this template
  const templateComponents = droppedElements.filter(
    el => el.type === "template-component" && el.content
  );
  
  // Sort template components by y position
  const sortedComponents = [...templateComponents].sort((a, b) => a.y - b.y);

  return (
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
        <div className={`${styles.headingFont} text-2xl tracking-wider`}>CYBERPUNK 2077</div>
        <div className="ml-auto flex items-center space-x-6">
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Home</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Collection</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Roadmap</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Team</button>
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
      
      {/* Render dropped components at the top if any */}
      {sortedComponents.length > 0 && sortedComponents.some(c => c.y < 200) && (
        <div className="w-full py-4 border-b border-dashed border-purple-400/30">
          <div className="text-center text-purple-300 py-4">
            {editMode ? "Dropped Component: Top Section" : null}
          </div>
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column */}
        <div className="w-1/2 p-10 overflow-auto" style={{ color: styles.collectionTextColor }}>
          <div className="mb-8">
            <h1 className={`${styles.headingFont} text-5xl mb-6`}>EXCLUSIVE CYBERPUNK<br/>DIGITAL COLLECTIBLES</h1>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: styles.cardBg }}>
                <CalendarDays className="w-4 h-4" style={{ color: styles.accentColor }} />
                <span style={{ color: styles.cardTextColor }}>May 15, 2023</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ backgroundColor: styles.cardBg }}>
                <Clock className="w-4 h-4" style={{ color: styles.accentColor }} />
                <span style={{ color: styles.cardTextColor }}>10,000 Items</span>
              </div>
            </div>
            
            <p className={`${styles.bodyFont} mb-8 leading-relaxed`} style={{ color: styles.collectionTextColor }}>
              Step into the futuristic world of Night City with our exclusive Cyberpunk 2077 NFT collection. Each digital collectible grants you unique in-game benefits and access to exclusive community events. Join the resistance and own a piece of the future.
            </p>
            
            {/* Render dropped components in the middle if any */}
            {sortedComponents.length > 0 && sortedComponents.some(c => c.y >= 200 && c.y < 500) && (
              <div className="w-full py-4 my-4 border-y border-dashed border-purple-400/30">
                <div className="text-center text-purple-300 py-4">
                  {editMode ? "Dropped Component: Middle Section" : null}
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div className="p-6 rounded-lg border" style={{ backgroundColor: styles.cardBg, borderColor: styles.borderColor }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`${styles.headingFont} text-xl`} style={{ color: styles.cardTextColor }}>DROP DETAILS</h3>
                  <div className="px-3 py-1 rounded-md text-sm font-medium" 
                    style={{ 
                      backgroundColor: `${styles.accentColor}20`, 
                      color: styles.accentColor 
                    }}
                  >
                    UPCOMING
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div style={{ color: `${styles.cardTextColor}80` }} className="mb-1">Mint Price</div>
                    <div style={{ color: styles.cardTextColor }} className="font-medium">0.15 ETH</div>
                  </div>
                  <div>
                    <div style={{ color: `${styles.cardTextColor}80` }} className="mb-1">Total Supply</div>
                    <div style={{ color: styles.cardTextColor }} className="font-medium">10,000</div>
                  </div>
                  <div>
                    <div style={{ color: `${styles.cardTextColor}80` }} className="mb-1">Mint Date</div>
                    <div style={{ color: styles.cardTextColor }} className="font-medium">May 15, 2023</div>
                  </div>
                  <div>
                    <div style={{ color: `${styles.cardTextColor}80` }} className="mb-1">Mint Time</div>
                    <div style={{ color: styles.cardTextColor }} className="font-medium">2:00 PM UTC</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  style={{ 
                    backgroundColor: styles.buttonBg, 
                    color: styles.buttonTextColor,
                    borderRadius: styles.buttonRadius
                  }}
                  className="px-8 py-4 font-medium flex-1"
                >
                  Mint Now
                </button>
                <button 
                  style={{ 
                    borderColor: styles.accentColor,
                    color: styles.accentColor,
                    borderRadius: styles.buttonRadius
                  }}
                  className="bg-transparent border px-8 py-4 font-medium"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-1/2 border-l flex items-center justify-center p-10" 
          style={{ 
            backgroundColor: styles.cardBg, 
            borderColor: styles.borderColor 
          }}
        >
          <div className="relative w-full max-w-md">
            <div className="w-full h-[450px] rounded-xl overflow-hidden flex items-center justify-center"
              style={{ 
                background: `linear-gradient(to bottom right, ${styles.accentColor}30, #0000ff20, #80008020)` 
              }}
            >
              <div className="w-64 h-64 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl border-4 border-white/10"
                style={{ 
                  background: `linear-gradient(to bottom right, ${styles.accentColor}, #0000ff)` 
                }}
              >
                <div className={`${styles.headingFont} text-4xl transform -rotate-12`} style={{ color: styles.buttonTextColor }}>CYBER</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-xl border w-4/5"
              style={{ 
                backgroundColor: styles.cardBg, 
                borderColor: styles.borderColor 
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div style={{ color: `${styles.cardTextColor}80` }} className="text-sm">Current Bid</div>
                  <div style={{ color: styles.cardTextColor }} className="font-medium">0.325 ETH</div>
                </div>
                <div className="rounded-lg px-4 py-2" 
                  style={{ 
                    backgroundColor: `${styles.accentColor}10`, 
                    borderColor: `${styles.accentColor}30`,
                    border: '1px solid'
                  }}
                >
                  <div style={{ color: `${styles.cardTextColor}80` }} className="text-xs">Ends in</div>
                  <div style={{ color: styles.accentColor }} className="font-medium">23:45:12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render dropped components at the bottom if any */}
      {sortedComponents.length > 0 && sortedComponents.some(c => c.y >= 500) && (
        <div className="w-full py-4 border-t border-dashed border-purple-400/30">
          <div className="text-center text-purple-300 py-4">
            {editMode ? "Dropped Component: Bottom Section" : null}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer 
        className="w-full p-6 border-t flex justify-between items-center"
        style={{ 
          backgroundColor: styles.headerBg,
          borderColor: styles.borderColor,
          color: styles.headerTextColor
        }}
      >
        <div className={`${styles.headingFont} text-xl`}>CYBERPUNK 2077</div>
        <div className="flex space-x-8">
          <div className="hover:text-white transition-colors cursor-pointer">Terms</div>
          <div className="hover:text-white transition-colors cursor-pointer">Privacy</div>
          <div className="hover:text-white transition-colors cursor-pointer">About</div>
          <div className="hover:text-white transition-colors cursor-pointer">Contact</div>
        </div>
        <div className="text-sm opacity-70">© 2023 All rights reserved</div>
      </footer>
    </div>
  );
};

export default DropsTemplate;
