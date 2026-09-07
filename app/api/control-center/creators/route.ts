import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getAllAdminCreators,
  createPartnerCreator,
  getCollaborationBrands,
} from "@/lib/db";

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [creators, brands] = await Promise.all([
      getAllAdminCreators(),
      getCollaborationBrands(),
    ]);

    return NextResponse.json({ creators, brands });
  } catch (error) {
    console.error("Error fetching admin creators:", error);
    return NextResponse.json(
      { error: "Failed to fetch creators" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.handle || !body.channelUrl) {
      return NextResponse.json(
        { error: "Name, email, handle, and channelUrl are required" },
        { status: 400 }
      );
    }

    const creatorId = await createPartnerCreator({
      name: body.name,
      email: body.email.trim(),
      handle: body.handle.startsWith("@") ? body.handle : `@${body.handle}`,
      avatar: body.avatar || "/creator1.png",
      bannerText: body.bannerText,
      bannerBg: body.bannerBg,
      bannerImage: body.bannerImage,
      subscribers: body.subscribers || "0",
      videosCount: body.videosCount || "0",
      bio: body.bio || "",
      channelUrl: body.channelUrl,
      isActive: body.isActive !== undefined ? body.isActive : true,
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : 0,
      brandIds: body.brandIds || [],
      recentVideos: body.recentVideos || [],
    });

    return NextResponse.json({ success: true, creatorId });
  } catch (error) {
    console.error("Error creating creator:", error);
    return NextResponse.json(
      { error: "Failed to create creator" },
      { status: 500 }
    );
  }
}
