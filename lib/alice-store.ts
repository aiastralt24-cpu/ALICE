import { db } from "@/lib/db";
import {
  aliceBrands,
  generationQueue,
  ingestionRuns,
  keywordGroups,
  keywordPriorities,
  pipelineMetrics,
  pkbFields,
  productRecords,
  reviewAlerts,
  reviewChecklist,
  extractionChecks,
  generationModes,
} from "@/lib/alice-data";

export async function getBrandProfiles() {
  try {
    const brands = await db.brandProfile.findMany({
      orderBy: { name: "asc" },
    });

    if (!brands.length) {
      return aliceBrands;
    }

    return brands.map((brand) => ({
      name: brand.name,
      tone: brand.tone,
      priorityCities: brand.priorityCities.split("|"),
    }));
  } catch {
    return aliceBrands;
  }
}

export async function getIngestionRuns() {
  try {
    const runs = await db.ingestionRun.findMany({
      include: { brand: true },
      orderBy: { createdAt: "desc" },
    });

    if (!runs.length) {
      return ingestionRuns;
    }

    return runs.map((run) => ({
      id: run.id,
      fileName: run.fileName,
      brand: run.brand.name,
      status: run.status,
      productsFound: run.productsFound,
      confidence: run.confidence,
      reviewer: run.reviewer,
      uploadedAt: run.uploadedAt,
    }));
  } catch {
    return ingestionRuns;
  }
}

export async function getProductRecords() {
  try {
    const records = await db.productRecord.findMany({
      include: { brand: true },
      orderBy: { name: "asc" },
    });

    if (!records.length) {
      return productRecords;
    }

    return records.map((record) => ({
      id: record.id,
      name: record.name,
      brand: record.brand.name,
      category: record.category,
      audience: record.audience,
      usp: record.usp,
      spec: record.spec,
      status: record.status,
    }));
  } catch {
    return productRecords;
  }
}

export async function getGenerationQueue() {
  try {
    const drafts = await db.blogDraft.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!drafts.length) {
      return generationQueue;
    }

    return drafts.map((draft) => ({
      id: draft.id,
      title: draft.title,
      city: draft.city,
      keyword: draft.keyword,
      mode: draft.mode,
      score: draft.score,
      status: draft.status,
    }));
  } catch {
    return generationQueue;
  }
}

export async function getBlogDraftById(id: string) {
  try {
    const draft = await db.blogDraft.findUnique({
      where: { id },
    });

    if (!draft) {
      return generationQueue.find((item) => item.id === id) ?? null;
    }

    return {
      id: draft.id,
      title: draft.title,
      city: draft.city,
      keyword: draft.keyword,
      mode: draft.mode,
      score: draft.score,
      status: draft.status,
    };
  } catch {
    return generationQueue.find((item) => item.id === id) ?? null;
  }
}

export async function getKeywordGroups() {
  try {
    const keywords = await db.keywordTarget.findMany({
      orderBy: [{ city: "asc" }, { keyword: "asc" }],
    });

    if (!keywords.length) {
      return keywordGroups;
    }

    return keywords.map((keyword) => ({
      keyword: keyword.keyword,
      city: keyword.city,
      intent: keyword.intent,
      rank: keyword.rank,
      trend: keyword.trend,
      gap: keyword.gap,
    }));
  } catch {
    return keywordGroups;
  }
}

export async function getPipelineMetrics() {
  try {
    const [approvedProducts, draftCount, keywordCount] = await Promise.all([
      db.productRecord.count({ where: { status: "Approved" } }),
      db.blogDraft.count(),
      db.keywordTarget.count(),
    ]);

    return [
      {
        label: "Products approved",
        value: String(approvedProducts || 0),
        note: "Ready for drafting and comparison templates",
      },
      {
        label: "Drafts in review",
        value: String(draftCount || 0),
        note: "Waiting on factual or SEO approval",
      },
      {
        label: "Priority city clusters",
        value: String(keywordCount || 0),
        note: "Tracked across top launch markets",
      },
      pipelineMetrics[3],
    ];
  } catch {
    return pipelineMetrics;
  }
}

export function getStaticAliceGuidance() {
  return {
    extractionChecks,
    generationModes,
    keywordPriorities,
    pkbFields,
    reviewAlerts,
    reviewChecklist,
  };
}
