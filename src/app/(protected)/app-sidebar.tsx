"use client"

import { Button } from "@/components/ui/button"
import { SidebarHeader, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuButton, SidebarMenuItem, SidebarMenu, useSidebar } from "@/components/ui/sidebar"
import useProject from "@/hooks/use-project"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
]


export function AppSidebar() {

  const pathname = usePathname();
  const { open } = useSidebar()
  const { projects, projectId, setProjectId } = useProject()
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src='/ws.png' alt="logo" width={40} height={40} /> 
          {open && (
            <h1 className="text-xl font-bold text-primary/80">Replora</h1>
          )}  
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {
              items.map(item => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={cn({
                        "!bg-primary !text-white": pathname === item.url
                      }, 'list-none')}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })
            }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Your Projects
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {projects?.map(project => {
                return (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div onClick={() => {
                        setProjectId(project.id)
                      }}>
                        <div className={cn(
                          'rounded-sm border size-6 flex items-center justify-center text-sm projecc iascactit',
                           project.id === projectId ?  'bg-primary text-white' : 'bg-white text-primary'
                        )}>
                            {project.name[0]?.toUpperCase()}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
              <div className="h-2"></div>
              <SidebarMenuItem>
                <Link href={'/create'}>       
                  <Button variant={'outline'} className="w-fit">
                    <Plus />
                    {
                      open && (
                        "Create Project"
                      )
                    }
                    
                  </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}