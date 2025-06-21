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
import { ToasterContainer } from "@/shared/Sonner/toast";

interface DataLayoutProps {
  children: React.ReactNode;
  title: string;
  isMedicine?: boolean;
  main?: string;
}

export function RootLayout({ children }: DataLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}


export function SidebarLayout({ title, main, children }: DataLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ToasterContainer />

        <header className="flex h-16 shrink-0 items-center gap-2 border-b -mt-10 md:w-full lg:w-full">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                {main ? (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/medicine">{main}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
