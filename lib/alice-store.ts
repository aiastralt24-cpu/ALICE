import { db } from "@/lib/db";
import {
  aliceBrands,
  generationQueue,
  ingestionRuns,
  keywordGroups,
  keywordPriorities,
  getUrgencyTone,
  pipelineMetrics,
  pkbFields,
  productRecords,
  reviewAlerts,
  reviewChecklist,
  extractionChecks,
  generationModes,
} from "@/lib/alice-data";

const useStaticData = process.env.VERCEL === "1" || process.env.ALICE_STATIC_DEMO === "1";

export async function getBrandProfiles() {
  if (useStaticData) {
    return aliceBrands;
  }

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
  if (useStaticData) {
    return ingestionRuns;
  }

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
  if (useStaticData) {
    return productRecords;
  }

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
  if (useStaticData) {
    return generationQueue;
  }

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
  if (useStaticData) {
    return generationQueue.find((item) => item.id === id) ?? null;
  }

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
  if (useStaticData) {
    return keywordGroups;
  }

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
  if (useStaticData) {
    return pipelineMetrics;
  }

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

function parsePercent(value: string) {
  const normalized = Number.parseInt(value.replace("%", ""), 10);
  return Number.isFinite(normalized) ? normalized : 0;
}

function getDraftTone(score: number) {
  if (score >= 80) {
    return "good";
  }

  if (score >= 60) {
    return "warn";
  }

  return "bad";
}

export async function getActionRows() {
  const [keywords, priorities] = await Promise.all([getKeywordGroups(), Promise.resolve(keywordPriorities)]);

  return keywords.map((group) => {
    const priority = priorities.find(
      (item) => item.city === group.city && group.keyword.toLowerCase().includes(item.focus.toLowerCase().split(" ")[0]),
    );

    const nextAction = priority?.nextMove ?? group.gap;
    const urgency = priority?.urgency ?? (Number.parseInt(group.rank.replace("#", ""), 10) > 12 ? "High" : "Medium");
    const reason =
      group.gap === "Need comparison blog"
        ? "comparison content missing"
        : group.gap === "Missing city landing page"
          ? "rank stalled without local landing page"
          : group.gap === "No published draft yet"
            ? "no published draft in this market"
            : "existing cluster needs execution";

    return {
      ...group,
      nextAction,
      urgency,
      urgencyTone: getUrgencyTone(urgency),
      reason,
    };
  });
}

export async function getProductInsights() {
  const [records, drafts] = await Promise.all([getProductRecords(), getGenerationQueue()]);

  return records.map((record) => {
    const missingFields = [
      !record.category ? "Category" : null,
      !record.audience ? "Audience" : null,
      !record.usp ? "USP" : null,
      !record.spec ? "Specs" : null,
    ].filter(Boolean) as string[];

    const usageCount = drafts.filter((draft) => {
      const loweredTitle = draft.title.toLowerCase();
      const loweredName = record.name.toLowerCase();
      return loweredTitle.includes("cpvc") && loweredName.includes("cpvc");
    }).length;

    const completeness = Math.max(40, 100 - missingFields.length * 18);

    return {
      ...record,
      missingFields,
      usageCount,
      completeness,
      completenessTone: completeness >= 85 ? "good" : completeness >= 65 ? "warn" : "bad",
      statusTone: record.status === "Approved" ? "good" : "warn",
      blockingReason: record.status !== "Approved" ? "Draft generation blocked until approval." : null,
    };
  });
}

export async function getQueueInsights() {
  const drafts = await getGenerationQueue();
  const alerts = reviewAlerts;

  return drafts.map((draft) => {
    const blocker =
      draft.city === "Ahmedabad"
        ? "Spec mismatch against approved pressure claim."
        : draft.city === "Pune"
          ? "FAQ and schema package still missing."
          : draft.city === "Mumbai"
            ? "Local context is too thin for publish."
            : "Ready for reviewer decision.";

    return {
      ...draft,
      scoreTone: getDraftTone(draft.score),
      blocker,
      blockerTone:
        draft.score >= 80 && draft.status !== "Needs fact check"
          ? "good"
          : draft.status === "Needs fact check" || draft.status === "Regenerate intro"
            ? "bad"
            : "warn",
    };
  });
}

export async function getIngestionInsights() {
  const runs = await getIngestionRuns();

  return runs.map((run) => {
    const confidenceValue = parsePercent(run.confidence);
    const missingFields = Math.max(0, 8 - run.productsFound);
    const flaggedClaims = run.status === "Approved" ? 0 : run.status === "Parsing" ? 1 : 2;
    const approvalBlocked = confidenceValue < 70 || flaggedClaims > 1;

    return {
      ...run,
      confidenceValue,
      missingFields,
      flaggedClaims,
      approvalBlocked,
      confidenceTone: confidenceValue >= 90 ? "good" : confidenceValue >= 75 ? "warn" : "bad",
      blockerReason: approvalBlocked ? "Approval blocked until low-confidence fields are checked." : "Ready for PKB approval.",
    };
  });
}
