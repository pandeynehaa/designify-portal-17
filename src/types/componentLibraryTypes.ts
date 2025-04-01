
import { LucideIcon } from "lucide-react";

// Define proper interface for component items
export interface ComponentItem {
  name: string;
  icon: LucideIcon;
  description?: string;
  isTemplate?: boolean;
  type?: string;
}

// Define category interface
export interface ComponentCategory {
  id: string;
  label: string;
  items: ComponentItem[];
}
