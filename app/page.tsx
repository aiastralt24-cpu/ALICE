import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { reviewAlerts } from "@/lib/alice-data";
import { getGenerationQueue, getIngestionRuns, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function AliceHomePage() {
  const [generationQueue, ingestionRuns] = await Promise.all([
    getGenerationQueue(),
    getIngestionRuns(),
  ]);
  const { reviewChecklist } = getStaticAliceGuidance();

  const nextDraft = generationQueue[0];
  const nextIngestion = ingestionRuns[0];
  const nextUp = generationQueue.slice(1, 4);

  return (
    <main className="alice-app-shell">
      <AlicePageIntro
        eyebrow="Today"
        title="Review what is ready."
        variant="hero"
        actions={[
          { href: `/queue/${nextDraft.id}`, label: "Review next draft" },
          { href: "/queue", label: "Open queue", style: "secondary" },
        ]}
      />

      <section className="alice-operator-grid">
        <article className="alice-focus-panel alice-focus-panel-home">
          <div className="alice-focus-head">
            <div>
              <span className="alice-card-label">Priority draft</span>
              <h2>{nextDraft.title}</h2>
            </div>
            <span className="alice-status-pill alice-status-pill-review">{nextDraft.status}</span>
          </div>
          <p className="alice-focus-copy">
            {nextDraft.city} · {nextDraft.keyword}
          </p>
          <div className="alice-focus-meta">
            <span>{nextDraft.mode}</span>
            <span>Score {nextDraft.score}</span>
            <span>Astral Pipes</span>
          </div>
          <div className="alice-inline-actions">
            <Link className="button button-primary" href={`/queue/${nextDraft.id}`}>
              Open draft
            </Link>
            <Link className="button button-secondary" href="/queue">
              Open queue
            </Link>
          </div>
        </article>

        <aside className="alice-operator-rail">
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Next up</span>
            <div className="alice-stack alice-stack-tight">
              {nextUp.map((draft) => (
                <Link className="alice-work-mini" href={`/queue/${draft.id}`} key={draft.id}>
                  <strong>{draft.title}</strong>
                  <span>{draft.city} · {draft.status}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Next source</span>
            <strong>{nextIngestion.fileName}</strong>
            <p className="alice-focus-copy alice-focus-copy-compact">
              {nextIngestion.brand} · {nextIngestion.status}
            </p>
            <Link className="alice-inline-link" href="/ingestion">
              Open documents
            </Link>
          </div>
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Checklist</span>
            <div className="alice-signal-list">
              {reviewChecklist.slice(0, 3).map((item) => (
                <div className="alice-signal-copy" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="alice-queue-home-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Active drafts</span>
              <h2>Queue</h2>
            </div>
            <Link href="/queue">Open all</Link>
          </div>
          <div className="alice-stack alice-stack-tight">
            {generationQueue.map((draft) => (
              <Link className="alice-work-row" href={`/queue/${draft.id}`} key={draft.id}>
                <div>
                  <strong>{draft.title}</strong>
                  <p>{draft.city} · {draft.keyword}</p>
                </div>
                <span className="alice-work-meta">{draft.mode}</span>
                <span className="alice-work-meta">Score {draft.score}</span>
                <span className={`alice-status-pill ${draft.id === nextDraft.id ? "alice-status-pill-review" : "alice-status-pill-neutral"}`}>
                  {draft.status}
                </span>
              </Link>
            ))}
          </div>
        </article>
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Needs attention</span>
              <h2>Watchouts</h2>
            </div>
          </div>
          <div className="alice-stack">
            {reviewAlerts.slice(0, 2).map((alert) => (
              <div className="alice-alert-card" key={alert.title}>
                <strong>{alert.title}</strong>
                <p>{alert.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
