"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

const useStaticDemo = process.env.VERCEL === "1" || process.env.ALICE_STATIC_DEMO === "1";

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
  if (useStaticDemo) {
    redirect("/ingestion?notice=demo-mode");
  }

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
  redirect("/ingestion?notice=upload-saved");
}

export async function updateIngestionRunStatusAction(formData: FormData) {
  if (useStaticDemo) {
    redirect("/ingestion?notice=demo-mode");
  }

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
  redirect("/ingestion?notice=run-updated");
}

export async function createProductRecordAction(formData: FormData) {
  if (useStaticDemo) {
    redirect("/pkb?notice=demo-mode");
  }

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
  redirect("/pkb?notice=record-saved");
}

export async function updateProductRecordStatusAction(formData: FormData) {
  if (useStaticDemo) {
    redirect("/pkb?notice=demo-mode");
  }

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
  redirect("/pkb?notice=status-updated");
}

export async function updateBlogDraftStatusAction(formData: FormData) {
  if (useStaticDemo) {
    const id = getString(formData, "id");
    redirect(id ? `/queue/${id}?notice=demo-mode` : "/queue");
  }

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
  redirect(`/queue/${id}?notice=status-saved`);
}
