import { PrismaClient } from "@prisma/client";

import { aliceBrands, generationQueue, ingestionRuns, keywordGroups, productRecords } from "@/lib/alice-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.blogDraft.deleteMany();
  await prisma.ingestionRun.deleteMany();
  await prisma.keywordTarget.deleteMany();
  await prisma.productRecord.deleteMany();
  await prisma.brandProfile.deleteMany();

  const brandMap = new Map<string, string>();

  for (const brand of aliceBrands) {
    const created = await prisma.brandProfile.create({
      data: {
        slug: brand.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        name: brand.name,
        tone: brand.tone,
        priorityCities: brand.priorityCities.join("|"),
      },
    });

    brandMap.set(brand.name, created.id);
  }

  for (const run of ingestionRuns) {
    await prisma.ingestionRun.create({
      data: {
        id: run.id,
        fileName: run.fileName,
        status: run.status,
        productsFound: run.productsFound,
        confidence: run.confidence,
        reviewer: run.reviewer,
        uploadedAt: run.uploadedAt,
        brandId: brandMap.get(run.brand)!,
      },
    });
  }

  for (const record of productRecords) {
    await prisma.productRecord.create({
      data: {
        id: record.id,
        name: record.name,
        category: record.category,
        audience: record.audience,
        usp: record.usp,
        spec: record.spec,
        status: record.status,
        brandId: brandMap.get(record.brand)!,
      },
    });
  }

  for (const draft of generationQueue) {
    await prisma.blogDraft.create({
      data: {
        id: draft.id,
        title: draft.title,
        city: draft.city,
        keyword: draft.keyword,
        mode: draft.mode,
        score: draft.score,
        status: draft.status,
      },
    });
  }

  for (const keyword of keywordGroups) {
    await prisma.keywordTarget.create({
      data: {
        keyword: keyword.keyword,
        city: keyword.city,
        intent: keyword.intent,
        rank: keyword.rank,
        trend: keyword.trend,
        gap: keyword.gap,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
