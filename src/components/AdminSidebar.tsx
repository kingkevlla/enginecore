import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  FileImage,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  FolderTree,
  Globe,
} from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: FolderTree,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Customers',
    url: '/admin/customers',
    icon: Users,
  },
  {
    title: 'Media Library',
    url: '/admin/media',
    icon: FileImage,
  },
  {
    title: 'Website Content',
    url: '/admin/content',
    icon: Globe,
  },
  {
    title: 'Support',
    url: '/admin/support',
    icon: MessageSquare,
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-60'}>
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-muted text-primary font-medium'
                          : 'hover:bg-muted/50'
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}