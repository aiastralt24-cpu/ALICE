import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { reviewAlerts } from "@/lib/alice-data";
import { getBrandProfiles, getGenerationQueue, getIngestionRuns, getKeywordGroups, getPipelineMetrics, getProductRecords } from "@/lib/alice-store";

export default async function AliceHomePage() {
  const [aliceBrands, generationQueue, ingestionRuns, keywordGroups, pipelineMetrics, productRecords] = await Promise.all([
    getBrandProfiles(),
    getGenerationQueue(),
    getIngestionRuns(),
    getKeywordGroups(),
    getPipelineMetrics(),
    getProductRecords(),
  ]);

  const nextDraft = generationQueue[0];
  const nextIngestion = ingestionRuns[0];

  return (
    <main className="alice-app-shell">
      <AlicePageIntro
        eyebrow="Today"
        title="Work the queue, not the system."
        description="ALICE should tell the team what needs attention now, what is ready next, and what can wait."
        actions={[
          { href: `/queue/${nextDraft.id}`, label: "Review next draft" },
          { href: "/queue", label: "Open full queue", style: "secondary" },
        ]}
      />

      <section className="alice-focus-band">
        <article className="alice-focus-panel">
          <div className="alice-focus-head">
            <div>
              <span className="alice-card-label">Primary task</span>
              <h2>{nextDraft.title}</h2>
            </div>
            <span className="alice-status-pill alice-status-pill-review">{nextDraft.status}</span>
          </div>
          <p className="alice-focus-copy">
            {nextDraft.city} market review for <strong>{nextDraft.keyword}</strong>. This should be the loudest task in the product until someone resolves it.
          </p>
          <div className="alice-focus-meta">
            <span>Mode {nextDraft.mode}</span>
            <span>Score {nextDraft.score}</span>
            <span>Astral Pipes</span>
          </div>
          <div className="alice-page-actions">
            <Link className="button button-primary" href={`/queue/${nextDraft.id}`}>
              Open draft
            </Link>
            <Link className="button button-secondary" href="/pkb">
              Check PKB
            </Link>
          </div>
        </article>

        <aside className="alice-focus-rail">
          <div className="alice-rail-section">
            <span className="alice-card-label">System pulse</span>
            <div className="alice-signal-list">
              {pipelineMetrics.map((metric) => (
                <div className="alice-signal-row" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="alice-rail-section">
            <span className="alice-card-label">Next source doc</span>
            <strong>{nextIngestion.fileName}</strong>
            <p>{nextIngestion.brand} · {nextIngestion.status}</p>
            <Link className="alice-inline-link" href="/ingestion">
              Open ingestion
            </Link>
          </div>
        </aside>
      </section>

      <section className="alice-work-grid">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Review queue</span>
              <h2>What should happen next</h2>
            </div>
            <Link href="/queue">Open all</Link>
          </div>
          <div className="alice-stack alice-stack-tight">
            {generationQueue.slice(0, 4).map((draft) => (
              <Link className="alice-work-row" href={`/queue/${draft.id}`} key={draft.id}>
                <div>
                  <strong>{draft.title}</strong>
                  <p>
                    {draft.city} · {draft.keyword}
                  </p>
                </div>
                <span className="alice-work-meta">{draft.mode}</span>
                <span className="alice-work-meta">Score {draft.score}</span>
                <span className="alice-status-pill alice-status-pill-neutral">{draft.status}</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="alice-surface alice-surface-muted">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Current risks</span>
              <h2>What could block publish</h2>
            </div>
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

      <section className="alice-support-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Readiness</span>
              <h2>Core workflows</h2>
            </div>
          </div>
          <div className="alice-readiness-list">
            <Link className="alice-readiness-row" href="/ingestion">
              <div>
                <strong>Ingestion</strong>
                <p>Source documents and extraction status</p>
              </div>
              <span>{ingestionRuns.length} runs</span>
            </Link>
            <Link className="alice-readiness-row" href="/pkb">
              <div>
                <strong>PKB</strong>
                <p>Approved product truth for generation</p>
              </div>
              <span>{productRecords.length} records</span>
            </Link>
            <Link className="alice-readiness-row" href="/keywords">
              <div>
                <strong>Keywords</strong>
                <p>City opportunity map and next moves</p>
              </div>
              <span>{keywordGroups.length} targets</span>
            </Link>
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Brand scope</span>
              <h2>Launch markets</h2>
            </div>
          </div>
          <div className="alice-brand-columns">
            {aliceBrands.map((brand) => (
              <div className="alice-brand-line" key={brand.name}>
                <strong>{brand.name}</strong>
                <p>{brand.priorityCities.join(" · ")}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
