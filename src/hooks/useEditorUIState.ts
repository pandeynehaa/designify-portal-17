
import { useState } from "react";

export const useEditorUIState = () => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  
  const handlePropertyClose = () => {
    setShowPropertyPanel(false);
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowPropertyPanel(true);
  };

  return {
    activeTab,
    setActiveTab,
    showPropertyPanel,
    setShowPropertyPanel,
    showAIExtractor,
    setShowAIExtractor,
    showThemeMapper,
    setShowThemeMapper,
    handlePropertyClose,
    handleTabClick
  };
};
