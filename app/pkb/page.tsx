import Link from "next/link";

import { createProductRecordAction, updateProductRecordStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBrandProfiles, getProductInsights, getStaticAliceGuidance } from "@/lib/alice-store";

type Props = {
  searchParams?: Promise<{
    notice?: string;
  }>;
};

function getNoticeMessage(notice?: string) {
  if (notice === "demo-mode") {
    return "Demo mode on Vercel is read-only. The preview uses sample data and does not save changes.";
  }

  if (notice === "record-saved") {
    return "Product record saved. Approved records are now ready for drafting.";
  }

  if (notice === "status-updated") {
    return "Product status updated. Drafting rules now use the latest approved state.";
  }

  return null;
}

export default async function PkbPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const [brands, productRecords] = await Promise.all([getBrandProfiles(), getProductInsights()]);
  const { pkbFields } = getStaticAliceGuidance();
  const notice = getNoticeMessage(resolvedSearchParams?.notice);
  const blockingRecords = productRecords.filter((product) => product.blockingReason);
  const incompleteRecords = productRecords.filter((product) => product.missingFields.length > 0);

  return (
    <main className="alice-screen-shell">
      <AlicePageIntro
        eyebrow="Product Knowledge Base"
        title="Product records for drafting."
        actions={[
          { href: "/", label: "Overview", style: "secondary" },
          { label: "Add product" },
        ]}
      />

      {notice ? <div className="alice-notice-banner">{notice}</div> : null}

      <section className="alice-detail-layout">
        <article className="alice-surface alice-surface-strong">
          <div className="alice-surface-head">
            <div>
              <span className="alice-card-label">Create record</span>
              <h2>New product</h2>
            </div>
          </div>
          <form action={createProductRecordAction} className="alice-form-grid">
            <label className="alice-field">
              <span>Product name</span>
              <input className="alice-input" name="name" placeholder="FlowGuard CPVC Pipe System" required />
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
              <span>Category</span>
              <input className="alice-input" name="category" placeholder="Plumbing" required />
            </label>
            <label className="alice-field">
              <span>Audience</span>
              <input className="alice-input" name="audience" placeholder="Plumbers" />
            </label>
            <label className="alice-field alice-field-full">
              <span>USP</span>
              <input className="alice-input" name="usp" placeholder="Corrosion-free and long-life performance" />
            </label>
            <label className="alice-field alice-field-full">
              <span>Specs</span>
              <input className="alice-input" name="spec" placeholder="15mm-100mm · up to 400 PSI" />
            </label>
            <label className="alice-field">
              <span>Status</span>
              <select className="alice-input" defaultValue="Pending review" name="status">
                <option>Pending review</option>
                <option>Approved</option>
              </select>
            </label>
            <div className="alice-form-actions alice-field-full">
              <button className="button button-primary" type="submit">
                Save product record
              </button>
            </div>
          </form>
        </article>

        <aside className="alice-review-rail">
          <div className="alice-review-rail-card">
            <span className="alice-card-label">What is missing before approval</span>
            <div className="alice-signal-list">
              {(incompleteRecords[0]?.missingFields.length ? incompleteRecords[0].missingFields : pkbFields.slice(0, 3)).map((field) => (
                <div className="alice-signal-copy" key={field}>
                  {field}
                </div>
              ))}
            </div>
          </div>
          <div className="alice-review-rail-card">
            <span className="alice-card-label">Why this matters</span>
            <div className="alice-stack alice-stack-tight">
              <div className={`alice-alert-card ${blockingRecords.length ? "alice-tone-bad" : "alice-tone-good"}`}>
                <strong>{blockingRecords.length} records blocking drafts</strong>
                <p>{blockingRecords.length ? "Draft generation is waiting on approval." : "No blocking records in the PKB."}</p>
              </div>
              <div className={`alice-alert-card ${incompleteRecords.length ? "alice-tone-warn" : "alice-tone-good"}`}>
                <strong>{incompleteRecords.length} records missing fields</strong>
                <p>{incompleteRecords.length ? "Complete missing fields before widening generation." : "Core PKB fields are present."}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="alice-surface">
        <div className="alice-surface-head">
          <div>
            <span className="alice-card-label">Records</span>
            <h2>Records</h2>
          </div>
        </div>
        <div className="alice-decision-table">
          <div className="alice-table-header alice-table-header-products">
            <span>Product</span>
            <span>Status</span>
            <span>Completeness</span>
            <span>Used in drafts</span>
            <span>Missing fields</span>
            <span>Action</span>
          </div>
          {productRecords.map((product) => (
            <div className={`alice-table-row alice-table-row-products alice-tone-${product.completenessTone}`} key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <p>
                  {product.brand} · {product.category}
                </p>
              </div>
              <div>
                <span className={`alice-status-pill alice-tone-${product.statusTone}`}>{product.status}</span>
              </div>
              <div>
                <strong>{product.completeness}%</strong>
              </div>
              <div>
                <strong>{product.usageCount}</strong>
              </div>
              <div>
                <strong>{product.missingFields.length ? product.missingFields.join(", ") : "Complete"}</strong>
                <p>{product.blockingReason ?? product.usp}</p>
              </div>
              <form action={updateProductRecordStatusAction} className="alice-inline-form">
                <input name="id" type="hidden" value={product.id} />
                <select className="alice-input alice-input-compact" defaultValue={product.status} name="status">
                  <option>Pending review</option>
                  <option>Approved</option>
                </select>
                <button className="button button-secondary" type="submit">
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
