import { LayoutDashboard, CalendarDays, Scissors, Settings, Calendar, X, ArrowLeft, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getNotificationCount } from "@/lib/store";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Appointments", url: "/admin/appointments", icon: CalendarDays },
  { title: "Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "Services", url: "/admin/services", icon: Scissors },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state, toggleSidebar, setOpenMobile, isMobile } = useSidebar();
  const navigate = useNavigate();
  const { signOut } = useAdminAuth();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const notifications = getNotificationCount();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // 👈 ensure ye hi use ho
      navigate("/"); // ya "/login"
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent className="bg-sidebar rounded-2xl m-2 shadow-lg flex flex-col">
        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-4">
            <SidebarGroupLabel className="font-display text-base font-semibold text-sidebar-foreground flex items-center gap-2 m-0 p-0">
              <Scissors className="h-5 w-5 text-sidebar-primary" />
              {!collapsed && "Admin Panel"}
            </SidebarGroupLabel>
            {!collapsed && (
              <button
                onClick={toggleSidebar}
                className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {items.map((item) => {
                const isActive = item.url === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={handleNavClick}
                        end={item.url === "/admin"}
                        className={`rounded-xl px-3 py-2.5 transition-all duration-300 ease-in-out flex items-center gap-3 ${isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-md"
                            : "text-sidebar-foreground hover:bg-muted"
                          }`}
                        activeClassName=""
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                        {item.title === "Dashboard" && notifications > 0 && !collapsed && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                            {notifications}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-3 pb-4 space-y-2">
          {!collapsed && (
            <>
              <button
                onClick={async () => { await signOut(); navigate("/"); }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
