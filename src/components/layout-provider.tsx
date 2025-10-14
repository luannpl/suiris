"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldShowSidebar = pathname !== "/";
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      {shouldShowSidebar && (
        <Sidebar
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      )}
      <main
        className={`flex-1 transition-all duration-300 ${
          shouldShowSidebar && !isMobileOpen
            ? isCollapsed
              ? "md:ml-16"
              : "md:ml-64"
            : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
