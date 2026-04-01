import Link from "next/link";

import { updateBlogDraftStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getQueueInsights, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function QueuePage() {
  const generationQueue = await getQueueInsights();
  const { generationModes, reviewChecklist } = getStaticAliceGuidance();
  const priorityDraft = generationQueue[0];

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Blog Queue"
        title="Review the work."
        variant="section"
        actions={[
          { href: `/queue/${priorityDraft.id}`, label: "Open priority draft" },
          { href: "/", label: "Overview", style: "secondary" },
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
            {priorityDraft.city} · {priorityDraft.keyword}
          </p>
          <div className="alice-focus-meta">
            <span>{priorityDraft.city}</span>
            <span>{priorityDraft.mode}</span>
            <span>Score {priorityDraft.score}</span>
          </div>
          <div className="alice-inline-actions">
            <Link className="button button-primary" href={`/queue/${priorityDraft.id}`}>
              Review draft
            </Link>
          </div>
        </article>

        <aside className="alice-focus-rail">
          <div className="alice-rail-section">
            <span className="alice-card-label">What is blocking publish</span>
            <div className="alice-signal-list">
              {[priorityDraft.blocker, ...reviewChecklist.slice(0, 2)].map((item) => (
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
              <h2>Active drafts</h2>
            </div>
          </div>
          <div className="alice-decision-table">
            <div className="alice-table-header alice-table-header-queue">
              <span>Draft</span>
              <span>City</span>
              <span>Score</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {generationQueue.map((draft) => (
              <div className={`alice-table-row alice-table-row-queue alice-tone-${draft.blockerTone}`} key={draft.id}>
                <div>
                  <Link className="alice-link-strong" href={`/queue/${draft.id}`}>
                    {draft.title}
                  </Link>
                  <p>{draft.keyword}</p>
                </div>
                <div>
                  <strong>{draft.city}</strong>
                </div>
                <div>
                  <span className={`alice-status-pill alice-tone-${draft.scoreTone}`}>{draft.score}</span>
                </div>
                <form action={updateBlogDraftStatusAction} className="alice-inline-form alice-inline-form-compact" id={`queue-status-${draft.id}`}>
                  <input name="id" type="hidden" value={draft.id} />
                  <select className="alice-input alice-input-compact" defaultValue={draft.status} name="status">
                    <option>Ready for review</option>
                    <option>Needs fact check</option>
                    <option>Ready for SEO pass</option>
                    <option>Regenerate intro</option>
                    <option>Approved</option>
                    <option>Published</option>
                  </select>
                  <span className={`alice-status-pill alice-tone-${draft.blockerTone}`}>{draft.status}</span>
                </form>
                <div className="alice-table-action">
                  <Link className="button button-primary" href={`/queue/${draft.id}`}>
                    Review
                  </Link>
                  <button className="button button-secondary button-compact" form={`queue-status-${draft.id}`} type="submit">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface alice-surface-muted">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Blockers</span>
              <h2>What is blocking publish</h2>
            </div>
          </div>
          <div className="alice-stack">
            {generationQueue.slice(0, 3).map((draft) => (
              <div className={`alice-alert-card alice-tone-${draft.blockerTone}`} key={draft.id}>
                <strong>{draft.city}</strong>
                <p>{draft.blocker}</p>
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
              <h2>Checklist</h2>
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
              <h2>Why this is next</h2>
            </div>
          </div>
          <div className="alice-stack">
            {generationModes.slice(0, 3).map((mode) => (
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
