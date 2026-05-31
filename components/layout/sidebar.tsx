'use client';

import Link from 'next/link';
import { useSidebar } from '@/hooks/use-sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  section?: string;
}

export interface SidebarProps {
  navItems?: NavItem[];
  logo?: string;
  title?: string;
}

export function Sidebar({ navItems = [], logo = 'WSK', title = 'Dashboard' }: SidebarProps) {
  const { isOpen } = useSidebar();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!isDesktop) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            title="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent navItems={navItems} logo={logo} title={title} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={`hidden md:flex md:flex-col border-r border-border bg-background transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <SidebarContent navItems={navItems} logo={logo} title={title} collapsed={!isOpen} />
    </aside>
  );
}

function SidebarContent({
  navItems = [],
  logo = 'WSK',
  title = 'Dashboard',
  collapsed = false,
}: SidebarProps & { collapsed?: boolean }) {

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-border">
        <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
          {logo.charAt(0)}
        </div>
        {!collapsed && <span className="font-bold text-foreground truncate">{title}</span>}
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.length === 0 ? (
          <div className="space-y-3">
            <NavItemComponent
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              href="/dashboard"
              collapsed={collapsed}
            />
            <NavItemComponent
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              href="/settings"
              collapsed={collapsed}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                collapsed={collapsed}
              />
            ))}
          </div>
        )}
      </nav>

      <Separator />

      {/* 토글 및 액션 */}
      <div className="p-4 space-y-2">
        {!collapsed && (
          <>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              <span>로그아웃</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function NavItemComponent({
  icon,
  label,
  href,
  collapsed = false,
}: {
  icon?: React.ReactNode;
  label: string;
  href: string;
  collapsed?: boolean;
}) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 ${
          collapsed ? 'px-2' : 'px-4'
        }`}
        title={collapsed ? label : undefined}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}
