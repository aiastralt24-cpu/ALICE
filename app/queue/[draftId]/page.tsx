import Link from "next/link";
import { notFound } from "next/navigation";

import { updateBlogDraftStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBlogDraftById, getStaticAliceGuidance } from "@/lib/alice-store";

type Props = {
  params: Promise<{
    draftId: string;
  }>;
};

export default async function DraftDetailPage({ params }: Props) {
  const { draftId } = await params;
  const draft = await getBlogDraftById(draftId);
  const { reviewChecklist, reviewAlerts } = getStaticAliceGuidance();

  if (!draft) {
    notFound();
  }

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Draft Detail"
        title={draft.title}
        description={`Review the ${draft.city} draft, decide its next state, and move on. This screen should feel like one decision, not many.`}
        actions={[
          { href: "/queue", label: "Back to queue", style: "secondary" },
        ]}
      />

      <section className="alice-detail-layout">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Draft summary</span>
              <h2>What this piece is trying to rank for</h2>
            </div>
          </div>
          <div className="alice-detail-grid">
            <div className="alice-detail-card">
              <span>Keyword</span>
              <strong>{draft.keyword}</strong>
            </div>
            <div className="alice-detail-card">
              <span>City</span>
              <strong>{draft.city}</strong>
            </div>
            <div className="alice-detail-card">
              <span>Mode</span>
              <strong>{draft.mode}</strong>
            </div>
            <div className="alice-detail-card">
              <span>Score</span>
              <strong>{draft.score}</strong>
            </div>
          </div>

          <section className="alice-narrative-block">
            <span className="alice-card-label">Editorial frame</span>
            <h3>Review this draft against the PKB, the city angle, and the publish standard.</h3>
            <p>
              In the next iteration this area should hold the full article, source references, and comments. For now it establishes the single-decision review pattern: inspect context, choose status, save, move on.
            </p>
          </section>

          <section className="alice-bullet-grid">
            <div className="alice-bullet-card">Check whether the article angle truly matches the keyword intent.</div>
            <div className="alice-bullet-card">Verify every technical claim against the approved product record.</div>
            <div className="alice-bullet-card">Make sure the city references sound local, not mass-generated.</div>
            <div className="alice-bullet-card">Only move to Approved when nothing else needs interpretation.</div>
          </section>
        </article>

        <aside className="alice-review-rail">
          <div className="alice-review-rail-card">
            <div className="alice-surface-head">
              <div>
                <span className="alice-card-label">Primary action</span>
                <h2>Set next status</h2>
              </div>
            </div>
            <form action={updateBlogDraftStatusAction} className="alice-review-form">
              <input name="id" type="hidden" value={draft.id} />
              <label className="alice-field">
                <span>Status</span>
                <select className="alice-input" defaultValue={draft.status} name="status">
                  <option>Ready for review</option>
                  <option>Needs fact check</option>
                  <option>Ready for SEO pass</option>
                  <option>Regenerate intro</option>
                  <option>Approved</option>
                  <option>Published</option>
                </select>
              </label>
              <button className="button button-primary" type="submit">
                Save status
              </button>
            </form>
          </div>

          <div className="alice-review-rail-card">
            <span className="alice-card-label">Checklist</span>
            <div className="alice-signal-list">
              {reviewChecklist.map((item) => (
                <div className="alice-signal-copy" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="alice-review-rail-card">
            <span className="alice-card-label">Current watch-outs</span>
            <div className="alice-stack alice-stack-tight">
              {reviewAlerts.map((alert) => (
                <div className="alice-alert-card" key={alert.title}>
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Flow status</span>
            <h2>What this prototype now proves</h2>
          </div>
        </div>
        <div className="alice-inline-note">
          <strong>Queue to detail to saved decision is working</strong>
          <p>
            Open the queue, pick a draft, review the context, choose the next status, and save it. That is the first workflow in ALICE that now behaves like a product instead of a static dashboard.
          </p>
        </div>
        <div style={{ marginTop: 14 }}>
          <Link className="button button-secondary" href="/queue">
            Back to queue
          </Link>
        </div>
      </section>
    </main>
  );
}
