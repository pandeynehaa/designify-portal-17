
import React from "react";

interface CanvasDropOverlayProps {
  isVisible: boolean;
}

const CanvasDropOverlay: React.FC<CanvasDropOverlayProps> = ({ isVisible }) => {
  return (
    <div 
      id="dropOverlay"
      className={`absolute inset-0 pointer-events-none flex items-center justify-center z-0 transition-all duration-300 ${
        isVisible ? 'opacity-100 z-50' : 'opacity-0'
      } bg-black/50`}
    >
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          25% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
          75% { transform: rotate(0deg); }
        }
        
        .wiggle-animation {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 shadow-2xl">
        Drop to add to canvas
      </div>
    </div>
  );
};

export default CanvasDropOverlay;
