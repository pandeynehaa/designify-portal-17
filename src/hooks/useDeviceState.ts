
import { useState } from "react";
import { DeviceStateReturn } from "../types/hookTypes";

export const useDeviceState = (): DeviceStateReturn => {
  const [deviceView, setDeviceView] = useState("desktop");
  const [activeTool, setActiveTool] = useState("select");
  
  return {
    deviceView,
    setDeviceView,
    activeTool,
    setActiveTool
  };
};
