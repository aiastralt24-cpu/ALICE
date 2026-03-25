import Link from "next/link";

import { createProductRecordAction, updateProductRecordStatusAction } from "@/app/actions";
import { AlicePageIntro } from "@/components/alice-page-intro";
import { getBrandProfiles, getProductRecords, getStaticAliceGuidance } from "@/lib/alice-store";

export default async function PkbPage() {
  const [brands, productRecords] = await Promise.all([getBrandProfiles(), getProductRecords()]);
  const { pkbFields } = getStaticAliceGuidance();

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
            <span className="alice-card-label">Create record</span>
            <h2>Add a product to the PKB</h2>
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
            <div className="alice-table-row alice-table-row-wide alice-table-row-with-actions" key={product.id}>
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
              <form action={updateProductRecordStatusAction} className="alice-inline-form">
                <input name="id" type="hidden" value={product.id} />
                <select className="alice-input alice-input-compact" defaultValue={product.status} name="status">
                  <option>Pending review</option>
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
