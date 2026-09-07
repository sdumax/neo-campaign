import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { fetchYouTubeChannelData } from "@/lib/youtube";

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const handleOrUrl = body.handleOrUrl;

    if (!handleOrUrl || !handleOrUrl.trim()) {
      return NextResponse.json(
        { error: "YouTube handle or URL is required" },
        { status: 400 }
      );
    }

    const data = await fetchYouTubeChannelData(handleOrUrl.trim());

    if (!data) {
      return NextResponse.json(
        {
          error:
            "Could not find YouTube channel or YOUTUBE_API_KEY is not configured.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("YouTube sync error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube channel data" },
      { status: 500 }
    );
  }
}
