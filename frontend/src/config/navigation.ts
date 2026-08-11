import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavigationItem } from "@/types/navigation";

export const navigation: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    module: "core",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    id: "opportunities",
    title: "Opportunities",
    href: "/opportunities",
    module: "opportunity",
    icon: Briefcase,
    enabled: true,
  },
  {
    id: "applications",
    title: "Applications",
    href: "/applications",
    module: "application",
    icon: FileText,
    enabled: true,
  },
  {
    id: "ai",
    title: "AI Assistant",
    href: "/ai",
    module: "ai",
    icon: Bot,
    enabled: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    href: "/analytics",
    module: "analytics",
    icon: BarChart3,
    enabled: true,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    module: "system",
    icon: Settings,
    enabled: true,
  },
];

