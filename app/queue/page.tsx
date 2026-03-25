import Link from "next/link";

import { updateBlogDraftStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getGenerationQueue, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function QueuePage() {
  const generationQueue = await getGenerationQueue();
  const { generationModes, reviewAlerts, reviewChecklist } = getStaticAliceGuidance();
  const priorityDraft = generationQueue[0];

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Blog Queue"
        title="Review what is ready, block what is risky."
        description="The queue should behave like a worklist, not a report. One draft should clearly feel like the next decision."
        actions={[
          { href: `/queue/${priorityDraft.id}`, label: "Open priority draft" },
          { href: "/", label: "Dashboard", style: "secondary" },
        ]}
      />

      <section className="alice-focus-band alice-focus-band-compact">
        <article className="alice-focus-panel">
          <div className="alice-focus-head">
            <div>
              <span className="alice-card-label">Priority review</span>
              <h2>{priorityDraft.title}</h2>
            </div>
            <span className="alice-status-pill alice-status-pill-review">{priorityDraft.status}</span>
          </div>
          <p className="alice-focus-copy">
            Resolve this first so the team always has one obvious next action. Everything else in the queue is secondary until this draft moves.
          </p>
          <div className="alice-focus-meta">
            <span>{priorityDraft.city}</span>
            <span>{priorityDraft.mode}</span>
            <span>Score {priorityDraft.score}</span>
          </div>
        </article>

        <aside className="alice-focus-rail">
          <div className="alice-rail-section">
            <span className="alice-card-label">Review rules</span>
            <div className="alice-signal-list">
              {reviewChecklist.slice(0, 4).map((item) => (
                <div className="alice-signal-copy" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="alice-work-grid">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Drafts</span>
              <h2>Active worklist</h2>
            </div>
          </div>
          <div className="alice-stack alice-stack-tight">
            {generationQueue.map((draft) => (
              <div className="alice-work-card" key={draft.id}>
                <div>
                  <Link className="alice-link-strong" href={`/queue/${draft.id}`}>
                    {draft.title}
                  </Link>
                  <p>
                    {draft.city} · {draft.keyword}
                  </p>
                </div>
                <div>
                  <div className="alice-work-facts">
                    <span>{draft.mode}</span>
                    <span>Score {draft.score}</span>
                    <span>{draft.city}</span>
                  </div>
                </div>
                <form action={updateBlogDraftStatusAction} className="alice-inline-form">
                  <input name="id" type="hidden" value={draft.id} />
                  <select className="alice-input alice-input-compact" defaultValue={draft.status} name="status">
                    <option>Ready for review</option>
                    <option>Needs fact check</option>
                    <option>Ready for SEO pass</option>
                    <option>Regenerate intro</option>
                    <option>Approved</option>
                    <option>Published</option>
                  </select>
                  <Link className="button button-secondary" href={`/queue/${draft.id}`}>
                    Review
                  </Link>
                  <button className="button button-secondary" type="submit">
                    Update
                  </button>
                </form>
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface alice-surface-muted">
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

      <section className="alice-support-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Publish gate</span>
              <h2>Use the same standard every time</h2>
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
              <h2>When to use each mode</h2>
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
