import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  title: string;
  href: string;

  module: string;

  icon: LucideIcon;

  enabled: boolean;

  badge?: string;

  children?: NavigationItem[];
}