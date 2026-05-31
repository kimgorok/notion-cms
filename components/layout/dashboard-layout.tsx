'use client';

import { SidebarProvider } from '@/hooks/use-sidebar';
import { Header, type HeaderProps } from './header';
import { Sidebar, type SidebarProps } from './sidebar';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  header?: HeaderProps;
  sidebar?: SidebarProps;
}

export function DashboardLayout({
  children,
  header,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <Header {...header} />

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar {...sidebar} />

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
