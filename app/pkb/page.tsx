import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { pkbFields, productRecords } from "@/lib/alice-data";

export default function PkbPage() {
  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Product Knowledge Base"
        title="Structured product truth for blog generation."
        description="Every approved product record should be reusable across blog drafting, FAQs, comparisons, and local landing pages."
        actions={[
          { href: "/", label: "Dashboard", style: "secondary" },
          { label: "Add product" },
        ]}
      />

      <section className="alice-dashboard-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Required fields</span>
              <h2>What each PKB record should hold</h2>
            </div>
          </div>
          <div className="alice-bullet-grid">
            {pkbFields.map((field) => (
              <div className="alice-bullet-card" key={field}>
                {field}
              </div>
            ))}
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Coverage</span>
              <h2>Current readiness</h2>
            </div>
          </div>
          <div className="alice-stack">
            <div className="alice-alert-card">
              <strong>4 product families mapped</strong>
              <p>Enough to start Quick Mode and the first comparison drafts.</p>
            </div>
            <div className="alice-alert-card">
              <strong>1 product line pending review</strong>
              <p>Industrial content should stay out of generation until specs are approved.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Records</span>
            <h2>Approved and pending products</h2>
          </div>
        </div>
        <div className="alice-table">
          {productRecords.map((product) => (
            <div className="alice-table-row alice-table-row-wide" key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <p>
                  {product.brand} · {product.category}
                </p>
              </div>
              <div>
                <span>USP</span>
                <strong>{product.usp}</strong>
              </div>
              <div>
                <span>Specs</span>
                <strong>{product.spec}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{product.status}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
