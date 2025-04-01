
import React from "react";
import { Shield, Users, Gem, ArrowRight } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";
import { useCanvasState } from "../../../hooks/useCanvasState";
import EditableComponent from "../shared/EditableComponent";

interface TokenGateTemplateProps {
  styles: TemplateStyles;
}

const TokenGateTemplate: React.FC<TokenGateTemplateProps> = ({ styles }) => {
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
        <div className={`${styles.headingFont} text-2xl tracking-wider`}>
          <EditableComponent 
            initialText="DEGEN DAO" 
            isHeading={true}
          />
        </div>
        <div className="ml-auto flex items-center space-x-6">
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Home</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">About</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">Benefits</button>
          <button style={{ color: styles.headerTextColor }} className="hover:text-white transition-colors">FAQ</button>
          <button 
            style={{ 
              backgroundColor: styles.buttonBg, 
              color: styles.buttonTextColor,
              borderRadius: styles.buttonRadius
            }}
            className="px-4 py-2"
          >
            Connect Wallet
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
      
      {/* Hero Section */}
      <div 
        className="flex-1 overflow-auto"
        style={{ color: styles.bannerTextColor }}
      >
        <div 
          className="py-20 px-10"
          style={{ 
            background: styles.bannerBg,
            minHeight: styles.bannerHeight
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <EditableComponent 
              initialText="Exclusive Access for Token Holders" 
              isHeading={true}
              className="mb-6"
            />
            
            <EditableComponent 
              initialText="Join our community of token holders to unlock premium content, special events, and unique benefits available only to members." 
              className="text-xl opacity-90 max-w-2xl mx-auto mb-10"
            />
            
            <button 
              style={{ 
                backgroundColor: styles.buttonBg, 
                color: styles.buttonTextColor,
                borderRadius: styles.buttonRadius
              }}
              className="px-8 py-3 text-lg font-medium"
            >
              Connect Your Wallet
            </button>
          </div>
        </div>
        
        {/* Render dropped components in the middle if any */}
        {sortedComponents.length > 0 && sortedComponents.some(c => c.y >= 200 && c.y < 500) && (
          <div className="w-full py-4 border-y border-dashed border-purple-400/30">
            <div className="text-center text-purple-300 py-4">
              {editMode ? "Dropped Component: Middle Section" : null}
            </div>
          </div>
        )}
        
        {/* Requirements Section */}
        <div className="py-16 px-10" style={{ color: styles.collectionTextColor }}>
          <div className="max-w-6xl mx-auto">
            <EditableComponent 
              initialText="How To Access" 
              isHeading={true}
              className="text-center mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg flex flex-col items-center text-center"
                style={{ 
                  backgroundColor: styles.cardBg, 
                  color: styles.cardTextColor,
                  borderRadius: styles.buttonRadius
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Gem size={24} style={{ color: styles.accentColor }} />
                </div>
                <EditableComponent 
                  initialText="Hold Required Tokens" 
                  isHeading={true}
                  className="text-xl mb-2"
                />
                <EditableComponent 
                  initialText="You need to hold at least 100 DEGEN tokens in your connected wallet to access premium content." 
                />
              </div>
              
              <div className="p-6 rounded-lg flex flex-col items-center text-center"
                style={{ 
                  backgroundColor: styles.cardBg, 
                  color: styles.cardTextColor,
                  borderRadius: styles.buttonRadius
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Shield size={24} style={{ color: styles.accentColor }} />
                </div>
                <EditableComponent 
                  initialText="Verify Your Wallet" 
                  isHeading={true}
                  className="text-xl mb-2"
                />
                <EditableComponent 
                  initialText="Connect your wallet to our platform and complete a simple verification to prove ownership." 
                />
              </div>
              
              <div className="p-6 rounded-lg flex flex-col items-center text-center"
                style={{ 
                  backgroundColor: styles.cardBg, 
                  color: styles.cardTextColor,
                  borderRadius: styles.buttonRadius
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${styles.accentColor}20` }}
                >
                  <Users size={24} style={{ color: styles.accentColor }} />
                </div>
                <EditableComponent 
                  initialText="Access Exclusive Content" 
                  isHeading={true}
                  className="text-xl mb-2"
                />
                <EditableComponent 
                  initialText="Once verified, you'll gain immediate access to members-only content, events and special offers." 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="py-16 px-10" 
          style={{ 
            backgroundColor: styles.cardBg,
            color: styles.cardTextColor
          }}
        >
          <div className="max-w-6xl mx-auto">
            <EditableComponent 
              initialText="Member Benefits" 
              isHeading={true}
              className="text-center mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="mr-4 p-2 rounded-lg"
                    style={{ backgroundColor: `${styles.accentColor}20` }}
                  >
                    <ArrowRight size={20} style={{ color: styles.accentColor }} />
                  </div>
                  <div>
                    <EditableComponent 
                      initialText={`Benefit ${item}`} 
                      isHeading={true}
                      className="text-xl mb-2"
                    />
                    <EditableComponent 
                      initialText="Detailed description of the amazing benefits members will receive when they join the token gated community." 
                    />
                  </div>
                </div>
              ))}
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
      </div>
      
      {/* Footer */}
      <footer 
        className="w-full p-6 border-t flex justify-between items-center"
        style={{ 
          backgroundColor: styles.headerBg,
          borderColor: styles.borderColor,
          color: styles.headerTextColor
        }}
      >
        <div className={`${styles.headingFont} text-xl`}>
          <EditableComponent initialText="DEGEN DAO" isHeading={true} />
        </div>
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

export default TokenGateTemplate;
