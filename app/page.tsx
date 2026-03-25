import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import {
  aliceBrands,
  generationQueue,
  ingestionRuns,
  keywordGroups,
  pipelineMetrics,
  productRecords,
  reviewAlerts,
} from "@/lib/alice-data";

const modules = [
  {
    href: "/ingestion",
    label: "Brochure Ingestion",
    detail: "Upload brochures, inspect extraction runs, and approve structured product records.",
  },
  {
    href: "/pkb",
    label: "Product Knowledge Base",
    detail: "Browse products, specs, certifications, and content-ready product context.",
  },
  {
    href: "/queue",
    label: "Blog Queue",
    detail: "Review generated drafts, quality signals, and publish readiness by city and keyword.",
  },
  {
    href: "/keywords",
    label: "Keyword Tracker",
    detail: "See city opportunities, ranking movement, and content gaps worth prioritizing.",
  },
];

export default function AliceHomePage() {
  const nextDraft = generationQueue[0];

  return (
    <main className="alice-app-shell">
      <AlicePageIntro
        eyebrow="Command Center"
        title="Turn brochure data into local search momentum."
        description="This first product skeleton connects ingestion, structured product knowledge, blog drafting, and keyword opportunities into one buildable operating surface for Astral's local SEO engine."
        actions={[
          { href: "/ingestion", label: "Start ingestion" },
          { href: "/queue", label: "Open review queue", style: "secondary" },
        ]}
      />

      <section className="alice-command-hero">
        <div className="alice-command-copy">
          <span className="alice-card-label">Launch focus</span>
          <h2>Astral Pipes V1</h2>
          <p>
            The current build is centered on one launch brand, one trusted product data layer, and one reviewable
            content flow before we scale into GBP automation and multilingual output.
          </p>

          <div className="alice-inline-note">
            <strong>Recommended sequence</strong>
            <p>Ingest brochures, approve PKB records, generate drafts, review them, then publish only the strongest city pages.</p>
          </div>
        </div>

        <aside className="alice-command-panel">
          <div className="alice-command-highlight">
            <span>Today&apos;s focus</span>
            <strong>{nextDraft.title}</strong>
            <p>
              {nextDraft.city} · {nextDraft.keyword} · score {nextDraft.score}
            </p>
          </div>
          <div className="alice-mini-stat-grid">
            {pipelineMetrics.map((metric) => (
              <div className="alice-mini-stat" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="alice-module-grid">
        {modules.map((module) => (
          <Link className="alice-module-card" href={module.href} key={module.href}>
            <span className="alice-card-label">Module</span>
            <h2>{module.label}</h2>
            <p>{module.detail}</p>
          </Link>
        ))}
      </section>

      <section className="alice-dashboard-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Ingestion</span>
              <h2>Recent brochure runs</h2>
            </div>
            <Link href="/ingestion">Manage</Link>
          </div>
          <div className="alice-stack">
            {ingestionRuns.map((run) => (
              <div className="alice-row-card" key={run.id}>
                <div>
                  <strong>{run.fileName}</strong>
                  <p>
                    {run.brand} · {run.status}
                  </p>
                </div>
                <div>
                  <span>Products</span>
                  <strong>{run.productsFound}</strong>
                </div>
                <div>
                  <span>Confidence</span>
                  <strong>{run.confidence}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Review</span>
              <h2>Queue alerts</h2>
            </div>
            <Link href="/queue">Open queue</Link>
          </div>
          <div className="alice-stack">
            {reviewAlerts.map((alert) => (
              <div className="alice-alert-card" key={alert.title}>
                <strong>{alert.title}</strong>
                <p>{alert.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="alice-dashboard-grid alice-dashboard-grid-bottom">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">PKB</span>
              <h2>Priority product records</h2>
            </div>
            <Link href="/pkb">Browse all</Link>
          </div>
          <div className="alice-table">
            {productRecords.slice(0, 4).map((product) => (
              <div className="alice-table-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.brand} · {product.category}
                  </p>
                </div>
                <div>
                  <span>Audience</span>
                  <strong>{product.audience}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{product.status}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Keywords</span>
              <h2>Priority city clusters</h2>
            </div>
            <Link href="/keywords">Open tracker</Link>
          </div>
          <div className="alice-stack">
            {keywordGroups.slice(0, 4).map((group) => (
              <div className="alice-chip-card" key={`${group.keyword}-${group.city}`}>
                <div>
                  <strong>{group.keyword}</strong>
                  <p>{group.city}</p>
                </div>
                <div className="alice-chip-metrics">
                  <span>Rank {group.rank}</span>
                  <span>{group.trend}</span>
                  <span>{group.gap}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="alice-brand-strip">
        {aliceBrands.map((brand) => (
          <div className="alice-brand-card" key={brand.name}>
            <span>{brand.name}</span>
            <strong>{brand.tone}</strong>
            <p>{brand.priorityCities.join(" · ")}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
