import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updatePartnerCreator, deletePartnerCreator } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const creatorId = parseInt(id, 10);
    if (isNaN(creatorId)) {
      return NextResponse.json({ error: "Invalid creator ID" }, { status: 400 });
    }

    const body = await req.json();

    await updatePartnerCreator(creatorId, {
      name: body.name,
      email: body.email !== undefined ? (body.email ? body.email.trim() : null) : undefined,
      handle: body.handle
        ? body.handle.startsWith("@")
          ? body.handle
          : `@${body.handle}`
        : undefined,
      avatar: body.avatar,
      bannerText: body.bannerText,
      bannerBg: body.bannerBg,
      bannerImage: body.bannerImage,
      subscribers: body.subscribers,
      videosCount: body.videosCount,
      bio: body.bio,
      channelUrl: body.channelUrl,
      isActive: body.isActive,
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : undefined,
      brandIds: body.brandIds,
      recentVideos: body.recentVideos,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating creator:", error);
    return NextResponse.json(
      { error: "Failed to update creator" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const creatorId = parseInt(id, 10);
    if (isNaN(creatorId)) {
      return NextResponse.json({ error: "Invalid creator ID" }, { status: 400 });
    }

    await deletePartnerCreator(creatorId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting creator:", error);
    return NextResponse.json(
      { error: "Failed to delete creator" },
      { status: 500 }
    );
  }
}
