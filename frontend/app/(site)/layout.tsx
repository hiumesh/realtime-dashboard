"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { capitalizeFirstLetter } from "@/lib/utils";
import GlobalProviders from "@/providers";
import { usePathname } from "next/navigation";

const secondoryPathnameMap: { [key: string]: string } = {
  zone: "Taxi Zones",
  green: "Green Taxi Trips",
  yellow: "Yellow Taxi Trips",
  fhv: "Hire Vehicle Trips",
  hvfhv: "High Volume Hire Vehicle Trips",
  users: "Users",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <GlobalProviders>
        <SidebarProvider className="h-full">
          <AppSidebar />
          <SidebarInset className="overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {capitalizeFirstLetter(pathnameSplit[1])}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {pathnameSplit.length >= 2 ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {pathnameSplit[2] in secondoryPathnameMap
                            ? secondoryPathnameMap[pathnameSplit[2]]
                            : pathnameSplit[2]}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : null}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden h-full">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </GlobalProviders>
    </div>
  );
}
