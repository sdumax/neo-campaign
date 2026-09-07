export interface YouTubeChannelStats {
  channelId: string;
  name: string;
  handle: string;
  avatar: string;
  bannerImage: string | null;
  description: string;
  subscribers: string;
  rawSubscriberCount: number;
  videosCount: string;
  rawVideoCount: number;
  customUrl: string;
  recentVideos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    publishedAt: string;
    url: string;
  }>;
}

function formatCount(num: number): string {
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${formatted.slice(0, -2)}M`
      : `${formatted}M`;
  }
  if (num >= 1_000) {
    const formatted = (num / 1_000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${formatted.slice(0, -2)}K`
      : `${formatted}K`;
  }
  return num.toString();
}

function formatTimeAgo(dateString: string): string {
  const publishedDate = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000
  );

  const days = Math.floor(diffSeconds / (24 * 3600));
  if (days >= 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  const hours = Math.floor(diffSeconds / 3600);
  return `${Math.max(1, hours)} hour${hours > 1 ? "s" : ""} ago`;
}

export function extractYouTubeHandle(input: string): {
  type: "handle" | "id" | "username";
  value: string;
} {
  const trimmed = input.trim();

  // If full URL: https://youtube.com/@handle or https://youtube.com/channel/UC...
  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      const pathname = url.pathname.replace(/\/$/, "");

      if (pathname.startsWith("/@")) {
        return { type: "handle", value: pathname.substring(2) };
      }
      if (pathname.startsWith("/channel/")) {
        return { type: "id", value: pathname.replace("/channel/", "") };
      }
      if (pathname.startsWith("/c/") || pathname.startsWith("/user/")) {
        return {
          type: "username",
          value: pathname.replace(/^\/(c|user)\//, ""),
        };
      }
    }
  } catch {
    // Fallthrough if not a valid URL
  }

  // Handle format @name or name
  if (trimmed.startsWith("@")) {
    return { type: "handle", value: trimmed.substring(1) };
  }
  if (trimmed.startsWith("UC") && trimmed.length >= 20) {
    return { type: "id", value: trimmed };
  }

  return { type: "handle", value: trimmed };
}

export async function fetchYouTubeChannelData(
  input: string
): Promise<YouTubeChannelStats | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn("YOUTUBE_API_KEY is not set in environment variables");
    return null;
  }

  const { type, value } = extractYouTubeHandle(input);

  try {
    let channelQuery = "";
    if (type === "handle") {
      channelQuery = `forHandle=@${encodeURIComponent(value)}`;
    } else if (type === "id") {
      channelQuery = `id=${encodeURIComponent(value)}`;
    } else {
      channelQuery = `forUsername=${encodeURIComponent(value)}`;
    }

    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails,brandingSettings&${channelQuery}&key=${apiKey}`
    );

    if (!channelRes.ok) {
      console.error(
        `YouTube API channel query failed: ${channelRes.status} ${channelRes.statusText}`
      );
      return null;
    }

    const channelData = await channelRes.json();
    if (!channelData.items || channelData.items.length === 0) {
      console.warn(`No YouTube channel found for query: ${input}`);
      return null;
    }

    const channel = channelData.items[0];
    const snippet = channel.snippet;
    const statistics = channel.statistics;
    const branding = channel.brandingSettings;
    const rawBanner = branding?.image?.bannerExternalUrl || null;
    const bannerImage = rawBanner
      ? rawBanner.includes("=")
        ? rawBanner
        : `${rawBanner}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`
      : null;
    const uploadsPlaylistId =
      channel.contentDetails?.relatedPlaylists?.uploads;

    const rawSubscribers = parseInt(statistics.subscriberCount || "0", 10);
    const rawVideos = parseInt(statistics.videoCount || "0", 10);
    const subscribers = formatCount(rawSubscribers);
    const videosCount = rawVideos.toString();

    const recentVideos: YouTubeChannelStats["recentVideos"] = [];

    if (uploadsPlaylistId) {
      try {
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&key=${apiKey}`
        );

        if (playlistRes.ok) {
          const playlistData = await playlistRes.json();
          const videoItems = playlistData.items || [];
          const videoIds = videoItems
            .map(
              (item: { snippet?: { resourceId?: { videoId?: string } } }) =>
                item.snippet?.resourceId?.videoId
            )
            .filter(Boolean);

          const videoStatsMap: Record<string, number> = {};
          if (videoIds.length > 0) {
            const statsRes = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(
                ","
              )}&key=${apiKey}`
            );
            if (statsRes.ok) {
              const statsData = await statsRes.json();
              for (const v of statsData.items || []) {
                videoStatsMap[v.id] = parseInt(
                  v.statistics?.viewCount || "0",
                  10
                );
              }
            }
          }

          for (const item of videoItems) {
            const vSnippet = item.snippet;
            const videoId = vSnippet?.resourceId?.videoId;
            if (!videoId) continue;

            const viewsNum = videoStatsMap[videoId] || 0;
            const thumbnail =
              vSnippet.thumbnails?.high?.url ||
              vSnippet.thumbnails?.medium?.url ||
              vSnippet.thumbnails?.default?.url ||
              "/home1.png";

            recentVideos.push({
              id: videoId,
              title: vSnippet.title || "Recent Video",
              thumbnail,
              views: `${formatCount(viewsNum)} views`,
              publishedAt: formatTimeAgo(vSnippet.publishedAt || new Date().toISOString()),
              url: `https://www.youtube.com/watch?v=${videoId}`,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch recent YouTube videos:", err);
      }
    }

    const handle = snippet.customUrl
      ? snippet.customUrl.startsWith("@")
        ? snippet.customUrl
        : `@${snippet.customUrl}`
      : `@${value}`;

    return {
      channelId: channel.id,
      name: snippet.title || value,
      handle,
      avatar:
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        "/creator1.png",
      bannerImage,
      description: snippet.description || "",
      subscribers,
      rawSubscriberCount: rawSubscribers,
      videosCount,
      rawVideoCount: rawVideos,
      customUrl: `https://youtube.com/${handle}`,
      recentVideos,
    };
  } catch (error) {
    console.error("Error in fetchYouTubeChannelData:", error);
    return null;
  }
}
