import Link from "next/link";

import { createIngestionRunAction, updateIngestionRunStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBrandProfiles, getIngestionRuns, getPipelineMetrics, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function IngestionPage() {
  const [brands, ingestionRuns, pipelineMetrics] = await Promise.all([
    getBrandProfiles(),
    getIngestionRuns(),
    getPipelineMetrics(),
  ]);
  const { extractionChecks } = getStaticAliceGuidance();

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
              <span className="alice-card-label">Create run</span>
              <h2>Log a brochure ingestion</h2>
            </div>
          </div>
          <form action={createIngestionRunAction} className="alice-form-grid">
            <label className="alice-field">
              <span>File name</span>
              <input className="alice-input" name="fileName" placeholder="FlowGuard_CPVC_Product_Brochure.pdf" required />
            </label>
            <label className="alice-field">
              <span>Brand</span>
              <select className="alice-input" defaultValue={brands[0]?.name ?? ""} name="brand" required>
                {brands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="alice-field">
              <span>Status</span>
              <select className="alice-input" defaultValue="Needs review" name="status">
                <option>Needs review</option>
                <option>Parsing</option>
                <option>Approved</option>
              </select>
            </label>
            <label className="alice-field">
              <span>Reviewer</span>
              <input className="alice-input" defaultValue="Pending" name="reviewer" />
            </label>
            <label className="alice-field">
              <span>Confidence</span>
              <input className="alice-input" defaultValue="80%" name="confidence" />
            </label>
            <label className="alice-field">
              <span>Products found</span>
              <input className="alice-input" defaultValue="1" min="0" name="productsFound" type="number" />
            </label>
            <label className="alice-field alice-field-full">
              <span>Uploaded at</span>
              <input className="alice-input" defaultValue="Today" name="uploadedAt" />
            </label>
            <div className="alice-form-actions alice-field-full">
              <button className="button button-primary" type="submit">
                Save ingestion run
              </button>
            </div>
          </form>
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
              <div className="alice-row-card alice-row-card-actions" key={run.id}>
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
                <form action={updateIngestionRunStatusAction} className="alice-inline-form">
                  <input name="id" type="hidden" value={run.id} />
                  <select className="alice-input alice-input-compact" defaultValue={run.status} name="status">
                    <option>Parsing</option>
                    <option>Needs review</option>
                    <option>Approved</option>
                  </select>
                  <button className="button button-secondary" type="submit">
                    Update
                  </button>
                </form>
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
