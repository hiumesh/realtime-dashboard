"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/providers/app-context";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "NYC Taxi & Limousine Commission Trip Record Data",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Records",
      url: "#",
      roles: ["admin", "manager"],

      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Taxi Zone",
          url: "/records/zone",
        },
        {
          title: "Green Taxi",
          url: "/records/green",
        },
        {
          title: "Yellow Taxi",
          url: "/records/yellow",
        },
        {
          title: "For Hire Vehicle",
          url: "/records/fhv",
        },
        {
          title: "High Volume FHV",
          url: "/records/hvfhv",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      roles: ["admin"],

      icon: Settings2,
      items: [
        {
          title: "Users",
          url: "/settings/users",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile, session } = useAppContext();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={session?.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
