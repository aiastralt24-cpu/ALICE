"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const value = Number(getString(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

async function getBrandIdByName(name: string) {
  const brand = await db.brandProfile.findFirst({
    where: { name },
    select: { id: true },
  });

  if (!brand) {
    throw new Error(`Brand not found: ${name}`);
  }

  return brand.id;
}

export async function createIngestionRunAction(formData: FormData) {
  const fileName = getString(formData, "fileName");
  const brandName = getString(formData, "brand");
  const status = getString(formData, "status") || "Needs review";
  const reviewer = getString(formData, "reviewer") || "Pending";
  const confidence = getString(formData, "confidence") || "0%";
  const uploadedAt = getString(formData, "uploadedAt") || "Today";
  const productsFound = getInt(formData, "productsFound");

  if (!fileName || !brandName) {
    return;
  }

  const brandId = await getBrandIdByName(brandName);

  await db.ingestionRun.create({
    data: {
      id: `ing-${crypto.randomUUID()}`,
      fileName,
      brandId,
      status,
      reviewer,
      confidence,
      uploadedAt,
      productsFound,
    },
  });

  revalidatePath("/ingestion");
  revalidatePath("/");
}

export async function updateIngestionRunStatusAction(formData: FormData) {
  const id = getString(formData, "id");
  const status = getString(formData, "status");

  if (!id || !status) {
    return;
  }

  await db.ingestionRun.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/ingestion");
  revalidatePath("/");
}

export async function createProductRecordAction(formData: FormData) {
  const name = getString(formData, "name");
  const brandName = getString(formData, "brand");
  const category = getString(formData, "category");
  const audience = getString(formData, "audience");
  const usp = getString(formData, "usp");
  const spec = getString(formData, "spec");
  const status = getString(formData, "status") || "Pending review";

  if (!name || !brandName || !category) {
    return;
  }

  const brandId = await getBrandIdByName(brandName);

  await db.productRecord.create({
    data: {
      id: `prd-${crypto.randomUUID()}`,
      name,
      brandId,
      category,
      audience,
      usp,
      spec,
      status,
    },
  });

  revalidatePath("/pkb");
  revalidatePath("/");
}

export async function updateProductRecordStatusAction(formData: FormData) {
  const id = getString(formData, "id");
  const status = getString(formData, "status");

  if (!id || !status) {
    return;
  }

  await db.productRecord.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/pkb");
  revalidatePath("/");
}

export async function updateBlogDraftStatusAction(formData: FormData) {
  const id = getString(formData, "id");
  const status = getString(formData, "status");

  if (!id || !status) {
    return;
  }

  await db.blogDraft.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/queue");
  revalidatePath(`/queue/${id}`);
  revalidatePath("/");
}
