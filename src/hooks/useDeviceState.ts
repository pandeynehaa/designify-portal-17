
import { useState } from "react";

export const useDeviceState = () => {
  const [deviceView, setDeviceView] = useState("desktop");
  const [activeTool, setActiveTool] = useState("select");
  
  return {
    deviceView,
    setDeviceView,
    activeTool,
    setActiveTool
  };
};
