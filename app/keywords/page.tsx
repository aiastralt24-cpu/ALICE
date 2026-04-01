import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { getActionRows } from "@/lib/alice-store";

export default async function KeywordsPage() {
  const actionRows = await getActionRows();

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Action Board"
        title="City and keyword priorities."
        actions={[
          { href: "/", label: "Overview", style: "secondary" },
          { label: "Add keyword set" },
        ]}
      />

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Decision table</span>
            <h2>Next actions</h2>
          </div>
          <Link href="/queue">Open review queue</Link>
        </div>
        <div className="alice-decision-table">
          <div className="alice-table-header alice-table-header-actions">
            <span>City</span>
            <span>Keyword</span>
            <span>Intent</span>
            <span>Rank</span>
            <span>Gap</span>
            <span>Next action</span>
            <span>Urgency</span>
          </div>
          {actionRows.map((group) => (
            <div className={`alice-table-row alice-table-row-actions alice-tone-${group.urgencyTone}`} key={`${group.keyword}-${group.city}`}>
              <div>
                <strong>{group.city}</strong>
                <p>{group.reason}</p>
              </div>
              <div>
                <strong>{group.keyword}</strong>
              </div>
              <div>
                <strong>{group.intent}</strong>
              </div>
              <div>
                <strong>{group.rank}</strong>
              </div>
              <div>
                <strong>{group.gap}</strong>
              </div>
              <div>
                <strong>{group.nextAction}</strong>
              </div>
              <div>
                <span className={`alice-status-pill alice-tone-${group.urgencyTone}`}>{group.urgency}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
