import { NextResponse } from "next/server";
import {
  getBrands,
  getCreators,
  getBrandCount,
  getCreatorCount,
} from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "all";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const offset = (page - 1) * limit;

  try {
    let data: unknown[];
    let total: number;

    if (type === "brands") {
      data = await getBrands(limit, offset);
      total = await getBrandCount();
    } else if (type === "creators") {
      data = await getCreators(limit, offset);
      total = await getCreatorCount();
    } else {
      const [brands, creators, brandsCount, creatorsCount] = await Promise.all([
        getBrands(limit, offset),
        getCreators(limit, offset),
        getBrandCount(),
        getCreatorCount(),
      ]);
      data = [...brands, ...creators]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, limit);
      total = brandsCount + creatorsCount;
    }

    return NextResponse.json({ data, total, page, limit });
  } catch (err) {
    console.error("Responses query failed:", err);
    return NextResponse.json({ data: [], total: 0, page, limit });
  }
}
