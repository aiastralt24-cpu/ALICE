import Link from "next/link";

import { AlicePageIntro } from "@/components/alice-page-intro";
import { extractionChecks, ingestionRuns, pipelineMetrics } from "@/lib/alice-data";

export default function IngestionPage() {
  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Brochure Ingestion"
        title="Capture product knowledge from source documents."
        description="Start with Astral Pipes brochures, review OCR confidence, and approve product extraction before generation."
        actions={[
          { href: "/", label: "Dashboard", style: "secondary" },
          { label: "New upload" },
        ]}
      />

      <section className="alice-module-grid alice-module-grid-compact">
        {pipelineMetrics.slice(0, 3).map((metric) => (
          <article className="alice-module-card" key={metric.label}>
            <span className="alice-card-label">{metric.label}</span>
            <h2>{metric.value}</h2>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="alice-screen-grid">
        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Upload lane</span>
              <h2>Drop brochures here</h2>
            </div>
          </div>
          <div className="alice-dropzone">
            <strong>PDF, DOCX, or scanned images</strong>
            <p>Expected flow: upload, OCR parse, field extraction, human approval, PKB publish.</p>
          </div>
        </article>

        <article className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Runs</span>
              <h2>Extraction history</h2>
            </div>
          </div>
          <div className="alice-stack">
            {ingestionRuns.map((run) => (
              <div className="alice-row-card" key={run.id}>
                <div>
                  <strong>{run.fileName}</strong>
                  <p>
                    {run.brand} · {run.uploadedAt}
                  </p>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{run.status}</strong>
                </div>
                <div>
                  <span>Review</span>
                  <strong>{run.reviewer}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Approval checklist</span>
            <h2>What reviewers should verify</h2>
          </div>
        </div>
        <div className="alice-bullet-grid">
          {extractionChecks.map((item) => (
            <div className="alice-bullet-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
