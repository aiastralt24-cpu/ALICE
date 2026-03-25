import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { keywordGroups, keywordPriorities } from "@/lib/alice-data";

export default function KeywordsPage() {
  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Keyword Tracker"
        title="Prioritize city and product opportunities."
        description="Use the tracker to see which combinations deserve fresh content, which ones need optimization, and where competitors are still ahead."
        actions={[
          { href: "/", label: "Dashboard", style: "secondary" },
          { label: "Add keyword set" },
        ]}
      />

      <section className="alice-dashboard-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Priority cities</span>
              <h2>Next actions by market</h2>
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

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Tracker note</span>
              <h2>How to use this board</h2>
            </div>
          </div>
          <div className="alice-inline-note">
            <strong>Pick one move per city</strong>
            <p>ALICE works best when keyword decisions feed directly into draft generation or optimization, not passive reporting.</p>
          </div>
        </article>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Priority map</span>
            <h2>Keyword and city watchlist</h2>
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
