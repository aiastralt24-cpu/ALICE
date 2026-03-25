import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { generationModes, generationQueue, reviewAlerts, reviewChecklist } from "@/lib/alice-data";

export default function QueuePage() {
  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Blog Queue"
        title="Review what ALICE wants to publish next."
        description="The first release should bias toward speed with oversight: score drafts, catch factual risk, and approve with confidence."
        actions={[
          { href: "/", label: "Dashboard", style: "secondary" },
          { label: "Generate draft" },
        ]}
      />

      <section className="alice-dashboard-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Drafts</span>
              <h2>Active queue</h2>
            </div>
          </div>
          <div className="alice-table">
            {generationQueue.map((draft) => (
              <div className="alice-table-row alice-table-row-wide" key={draft.id}>
                <div>
                  <strong>{draft.title}</strong>
                  <p>
                    {draft.city} · {draft.keyword}
                  </p>
                </div>
                <div>
                  <span>Mode</span>
                  <strong>{draft.mode}</strong>
                </div>
                <div>
                  <span>Score</span>
                  <strong>{draft.score}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{draft.status}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Alerts</span>
              <h2>What needs human attention</h2>
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

      <section className="alice-dashboard-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Review checklist</span>
              <h2>Publish gate</h2>
            </div>
          </div>
          <div className="alice-bullet-grid">
            {reviewChecklist.map((item) => (
              <div className="alice-bullet-card" key={item}>
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Generation modes</span>
              <h2>Where each draft type fits</h2>
            </div>
          </div>
          <div className="alice-stack">
            {generationModes.map((mode) => (
              <div className="alice-chip-card" key={mode.name}>
                <div>
                  <strong>{mode.name}</strong>
                  <p>{mode.useCase}</p>
                </div>
                <div className="alice-chip-metrics">
                  <span>{mode.credits}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
