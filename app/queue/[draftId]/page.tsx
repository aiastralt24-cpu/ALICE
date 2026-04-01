import Link from "next/link";
import { notFound } from "next/navigation";

import { updateBlogDraftStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBlogDraftById, getStaticAliceGuidance } from "@/lib/alice-store";

type Props = {
  params: Promise<{
    draftId: string;
  }>;
  searchParams?: Promise<{
    notice?: string;
  }>;
};

function getNoticeMessage(notice?: string) {
  if (notice === "demo-mode") {
    return "Demo mode on Vercel is read-only. The preview uses sample data and does not save changes.";
  }

  if (notice === "status-saved") {
    return "Status saved. The queue now reflects the next review step.";
  }

  return null;
}

export default async function DraftDetailPage({ params, searchParams }: Props) {
  const { draftId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const draft = await getBlogDraftById(draftId);
  const { reviewChecklist, reviewAlerts } = getStaticAliceGuidance();

  if (!draft) {
    notFound();
  }

  const notice = getNoticeMessage(resolvedSearchParams?.notice);

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Draft Detail"
        title={draft.title}
        variant="detail"
        actions={[
          { href: "/queue", label: "Back to queue", style: "secondary" },
        ]}
      />

      {notice ? <div className="alice-notice-banner">{notice}</div> : null}

      <section className="alice-detail-layout">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Summary</span>
              <h2>{draft.city} · {draft.keyword}</h2>
            </div>
            <span className="alice-status-pill alice-status-pill-review">{draft.status}</span>
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

          <section className="alice-bullet-grid">
            <div className="alice-bullet-card">Match the article to the search intent.</div>
            <div className="alice-bullet-card">Check claims against approved product facts.</div>
            <div className="alice-bullet-card">Keep local references specific and believable.</div>
            <div className="alice-bullet-card">Approve only when nothing is ambiguous.</div>
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
              <p className="alice-helper-copy">Save the next review state and return to the queue when this draft is ready.</p>
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
              <div className="alice-alert-card alice-tone-warn">
                <strong>Why this is next</strong>
                <p>Review queue is prioritizing this draft because its publish blockers are still unresolved.</p>
              </div>
              {reviewAlerts.slice(0, 2).map((alert) => (
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
            <span className="alice-card-label">Next step</span>
            <h2>Move it forward</h2>
          </div>
        </div>
        <div className="alice-inline-note">
          <strong>Save the next decision</strong>
          <p>Use one status only. If the draft is still uncertain, send it back before publish.</p>
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
