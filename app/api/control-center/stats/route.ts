import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Stats query failed:", err);
    return NextResponse.json({
      total: { brands: 0, creators: 0 },
      byStatus: { new: 0, contacted: 0, converted: 0 },
      recent: [],
    });
  }
}
