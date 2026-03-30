import Link from "next/link";

import { createIngestionRunAction, updateIngestionRunStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBrandProfiles, getIngestionRuns, getPipelineMetrics, getStaticAliceGuidance } from "@/lib/alice-store";

type Props = {
  searchParams?: Promise<{
    notice?: string;
  }>;
};

function getNoticeMessage(notice?: string) {
  if (notice === "demo-mode") {
    return "Demo mode on Vercel is read-only. The preview uses sample data and does not save changes.";
  }

  if (notice === "upload-saved") {
    return "Upload saved. Review the latest run and move approved records into products.";
  }

  if (notice === "run-updated") {
    return "Run updated. The document queue now reflects the latest review state.";
  }

  return null;
}

export default async function IngestionPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const [brands, ingestionRuns, pipelineMetrics] = await Promise.all([
    getBrandProfiles(),
    getIngestionRuns(),
    getPipelineMetrics(),
  ]);
  const { extractionChecks } = getStaticAliceGuidance();
  const notice = getNoticeMessage(resolvedSearchParams?.notice);

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Brochure Ingestion"
        title="Capture product knowledge from source documents."
        actions={[
          { href: "/", label: "Overview", style: "secondary" },
          { label: "New upload" },
        ]}
      />

      {notice ? <div className="alice-notice-banner">{notice}</div> : null}

      <section className="alice-module-grid alice-module-grid-compact">
        {pipelineMetrics.slice(0, 3).map((metric) => (
          <article className="alice-module-card" key={metric.label}>
            <span className="alice-card-label">{metric.label}</span>
            <h2>{metric.value}</h2>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="alice-detail-layout">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Create run</span>
              <h2>New upload</h2>
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

        <aside className="alice-review-rail">
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Checklist</span>
            <div className="alice-signal-list">
              {extractionChecks.slice(0, 3).map((item) => (
                <div className="alice-signal-copy" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Ready next</span>
            <strong>{ingestionRuns[0]?.fileName}</strong>
            <p className="alice-focus-copy alice-focus-copy-compact">
              {ingestionRuns[0]?.brand} · {ingestionRuns[0]?.status}
            </p>
            <Link className="alice-inline-link" href="/pkb">
              Open products
            </Link>
          </div>
        </aside>
      </section>

      <section className="alice-surface">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Runs</span>
              <h2>Recent runs</h2>
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
      </section>
    </main>
  );
}
