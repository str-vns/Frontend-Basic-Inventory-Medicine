import * as React from "react"
import { PillBottle } from "lucide-react"
import { useUserStore } from "@/api/user/Api_user"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { usePersistUser } from "@/api/user/Api_user"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      
    },
    {
      title: "Medicine",
      url: "/medicine",
    },
    {
      title: "Inventory",
      url: "/inventory",
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logout = useUserStore((state) => state.logout)
  const { isAuth } = usePersistUser((state) => state)
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      logout()

      if(!isAuth) {
      navigate("/")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  React.useEffect(() => {
     if(!isAuth) {
      navigate("/")
      }
  },[isAuth, navigate])
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <PillBottle className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Medicine Inventory</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
     <SidebarFooter className="flex flex-col items-center justify-center">
      <Button className="bg-black text-white mb-3 py-4 w-42 rounded-3xl hover:bg-white hover:text-black hover:border cursor-pointer" onClick={logoutHandler}>
        logout
      </Button>
     </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
