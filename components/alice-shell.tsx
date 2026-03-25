"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { aliceNav, pipelineMetrics } from "@/lib/alice-data";

type Props = {
  children: React.ReactNode;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AliceShell({ children }: Props) {
  const pathname = usePathname();
  const currentItem = aliceNav.find((item) => isActive(pathname, item.href));

  return (
    <div className="alice-layout">
      <aside className="alice-sidebar">
        <div className="alice-sidebar-brand">
          <span className="alice-kicker">Astral Local Engine</span>
          <strong>ALICE</strong>
          <p>Brochures to rankings, drafts, and local presence in one operating layer.</p>
        </div>

        <nav className="alice-sidebar-nav">
          {aliceNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link className={`alice-sidebar-link ${active ? "alice-sidebar-link-active" : ""}`} href={item.href} key={item.href}>
                <span>{item.label}</span>
                <small>{item.caption}</small>
              </Link>
            );
          })}
        </nav>

        <div className="alice-sidebar-foot">
          {pipelineMetrics.slice(0, 3).map((metric) => (
            <div className="alice-sidebar-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      </aside>

      <div className="alice-layout-main">
        <header className="alice-topbar">
          <div>
            <span className="alice-topbar-label">Astral Local Intelligence and Content Engine</span>
            <h1>{currentItem?.label ?? "Overview"}</h1>
          </div>
          <div className="alice-topbar-meta">
            <span>{currentItem?.caption ?? "Program dashboard"}</span>
            <span>Human review first</span>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
