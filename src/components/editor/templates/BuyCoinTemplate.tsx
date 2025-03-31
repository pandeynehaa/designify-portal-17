
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import { useCanvasState } from "../../../hooks/useCanvasState";

interface BuyCoinTemplateProps {
  styles: TemplateStyles;
}

const BuyCoinTemplate: React.FC<BuyCoinTemplateProps> = ({ styles }) => {
  const { droppedElements, editMode } = useCanvasState();
  
  // Filter template components meant for this template
  const templateComponents = droppedElements.filter(
    el => el.type === "template-component" && el.content
  );
  
  // Sort template components by y position
  const sortedComponents = [...templateComponents].sort((a, b) => a.y - b.y);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-purple-900 to-blue-900 text-white overflow-auto">
      {/* Header Section */}
      <header className="w-full p-6 flex justify-between items-center border-b border-white/10">
        <div className="font-bold text-2xl" style={{ fontFamily: styles.headingFont }}>CoinX</div>
        <nav className="flex gap-6">
          <div className="cursor-pointer hover:text-purple-300 transition-colors">Home</div>
          <div className="cursor-pointer hover:text-purple-300 transition-colors">Features</div>
          <div className="cursor-pointer hover:text-purple-300 transition-colors">Tokenomics</div>
          <div className="cursor-pointer hover:text-purple-300 transition-colors">Roadmap</div>
        </nav>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
          Connect Wallet
        </button>
      </header>

      {/* Render dropped components at the top if any */}
      {sortedComponents.length > 0 && sortedComponents.some(c => c.y < 200) && (
        <div className="w-full py-4 border-b border-dashed border-purple-400/30">
          <div className="text-center text-purple-300 py-4">
            {editMode ? "Dropped Component: Top Section" : null}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full px-6 py-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: styles.headingFont }}>
          Introducing CoinX Token
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-purple-200">
          The next generation cryptocurrency powering the future of decentralized finance
        </p>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-semibold">
            Buy Token
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-full hover:bg-white/10 transition-all text-lg font-semibold">
            Learn More
          </button>
        </div>
      </section>

      {/* Render dropped components in the middle if any */}
      {sortedComponents.length > 0 && sortedComponents.some(c => c.y >= 200 && c.y < 500) && (
        <div className="w-full py-4 border-y border-dashed border-purple-400/30">
          <div className="text-center text-purple-300 py-4">
            {editMode ? "Dropped Component: Middle Section" : null}
          </div>
        </div>
      )}

      {/* Tokenomics Section */}
      <section className="w-full px-6 py-12 bg-black/20">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: styles.headingFont }}>Tokenomics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Total Supply</h3>
            <p className="text-3xl font-bold text-purple-300">100,000,000</p>
            <p className="mt-2 text-purple-200">Fixed supply with no additional minting</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Distribution</h3>
            <p className="text-3xl font-bold text-purple-300">Fair Launch</p>
            <p className="mt-2 text-purple-200">40% public sale, 30% ecosystem, 20% team, 10% reserves</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Token Utility</h3>
            <p className="text-3xl font-bold text-purple-300">Governance</p>
            <p className="mt-2 text-purple-200">Voting rights, platform discounts, staking rewards</p>
          </div>
        </div>
      </section>

      {/* Render dropped components at the bottom if any */}
      {sortedComponents.length > 0 && sortedComponents.some(c => c.y >= 500) && (
        <div className="w-full py-4 border-t border-dashed border-purple-400/30">
          <div className="text-center text-purple-300 py-4">
            {editMode ? "Dropped Component: Bottom Section" : null}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full p-6 bg-black/30 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="font-bold text-xl mb-4 md:mb-0" style={{ fontFamily: styles.headingFont }}>CoinX</div>
          <div className="flex gap-4 mb-4 md:mb-0">
            <div className="cursor-pointer hover:text-purple-300 transition-colors">Terms</div>
            <div className="cursor-pointer hover:text-purple-300 transition-colors">Privacy</div>
            <div className="cursor-pointer hover:text-purple-300 transition-colors">Docs</div>
            <div className="cursor-pointer hover:text-purple-300 transition-colors">Contact</div>
          </div>
          <div className="text-sm text-purple-200">© 2023 CoinX. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default BuyCoinTemplate;
