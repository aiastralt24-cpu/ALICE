import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { getKeywordGroups, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function KeywordsPage() {
  const keywordGroups = await getKeywordGroups();
  const { keywordPriorities } = getStaticAliceGuidance();

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Keyword Tracker"
        title="City and keyword priorities."
        actions={[
          { href: "/", label: "Overview", style: "secondary" },
          { label: "Add keyword set" },
        ]}
      />

      <section className="alice-detail-layout">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Priority cities</span>
              <h2>Next actions</h2>
            </div>
          </div>
          <div className="alice-stack">
            {keywordPriorities.map((item) => (
              <div className="alice-row-card" key={`${item.city}-${item.focus}`}>
                <div>
                  <strong>{item.city}</strong>
                  <p>{item.focus}</p>
                </div>
                <div>
                  <span>Next move</span>
                  <strong>{item.nextMove}</strong>
                </div>
                <div>
                  <span>Urgency</span>
                  <strong>{item.urgency}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="alice-review-rail">
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Use this board</span>
            <div className="alice-inline-note">
              <strong>Pick one move per city</strong>
              <p>Use this list to trigger a draft or optimization, not passive reporting.</p>
            </div>
          </div>
          <div className="alice-review-rail-card">
            <span className="alice-card-label">What comes next</span>
            <div className="alice-signal-list">
              <div className="alice-signal-copy">Choose one city with the highest urgency.</div>
              <div className="alice-signal-copy">Route missing content into the review queue.</div>
              <div className="alice-signal-copy">Only track ranking gaps that can trigger work.</div>
            </div>
          </div>
        </aside>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Priority map</span>
            <h2>Watchlist</h2>
          </div>
        </div>
        <div className="alice-table">
          {keywordGroups.map((group) => (
            <div className="alice-table-row alice-table-row-wide" key={`${group.keyword}-${group.city}`}>
              <div>
                <strong>{group.keyword}</strong>
                <p>{group.city}</p>
              </div>
              <div>
                <span>Intent</span>
                <strong>{group.intent}</strong>
              </div>
              <div>
                <span>Rank</span>
                <strong>{group.rank}</strong>
              </div>
              <div>
                <span>Gap</span>
                <strong>{group.gap}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
