"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { aliceNav } from "@/lib/alice-data";

type Props = {
  children: React.ReactNode;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarIcon({ name }: { name: string }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "documents":
      return (
        <svg aria-hidden="true" className="alice-nav-icon" {...commonProps}>
          <path d="M7 4.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5Z" />
          <path d="M14 4.5V9h4.5" />
          <path d="M9 13h6" />
          <path d="M9 16.5h6" />
        </svg>
      );
    case "products":
      return (
        <svg aria-hidden="true" className="alice-nav-icon" {...commonProps}>
          <path d="M12 3.75 19.5 8 12 12.25 4.5 8 12 3.75Z" />
          <path d="M19.5 8v8L12 20.25 4.5 16V8" />
          <path d="M12 12.25v8" />
        </svg>
      );
    case "queue":
      return (
        <svg aria-hidden="true" className="alice-nav-icon" {...commonProps}>
          <path d="M5 6.5h14" />
          <path d="M5 12h14" />
          <path d="M5 17.5h8" />
          <circle cx="17" cy="17.5" r="2.5" />
        </svg>
      );
    case "opportunities":
      return (
        <svg aria-hidden="true" className="alice-nav-icon" {...commonProps}>
          <path d="M5 18.5V10" />
          <path d="M10 18.5V6.5" />
          <path d="M15 18.5V13" />
          <path d="M20 18.5V4.5" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" className="alice-nav-icon" {...commonProps}>
          <path d="M4.5 10.5 12 4l7.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-3.75v-6h-4.5v6H6A1.5 1.5 0 0 1 4.5 19v-8.5Z" />
        </svg>
      );
  }
}

export function AliceShell({ children }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`alice-layout ${collapsed ? "alice-layout-collapsed" : ""}`}>
      <aside className={`alice-sidebar ${collapsed ? "alice-sidebar-collapsed" : ""}`}>
        <div className="alice-sidebar-brand">
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="alice-sidebar-toggle"
            onClick={() => setCollapsed((value) => !value)}
            type="button"
          >
            <span />
            <span />
          </button>
          {!collapsed ? (
            <>
              <strong>ALICE</strong>
              <p>Astral Local Engine</p>
            </>
          ) : (
            <strong className="alice-sidebar-monogram">A</strong>
          )}
        </div>

        <nav className="alice-sidebar-nav">
          {!collapsed ? <span className="alice-sidebar-section-label">Workspace</span> : null}
          {aliceNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                className={`alice-sidebar-link ${active ? "alice-sidebar-link-active" : ""}`}
                href={item.href}
                key={item.href}
                title={collapsed ? item.label : undefined}
              >
                <SidebarIcon name={item.icon} />
                {!collapsed ? (
                  <div className="alice-sidebar-link-copy">
                    <span>{item.label}</span>
                  </div>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="alice-layout-main">
        <header className="alice-topbar">
          <span className="alice-topbar-label">ALICE</span>
          <div className="alice-topbar-meta">
            <span>Human review first</span>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
