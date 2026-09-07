export interface CreatorVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedAt: string;
  url: string;
}

export interface BrandCollaboration {
  name: string;
  logo?: string;
}

export interface PartnerCreator {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  bannerText?: string;
  bannerBg?: string;
  bannerImage?: string | null;
  subscribers: string;
  videosCount: string;
  bio: string;
  channelUrl: string;
  recentVideos: CreatorVideo[];
  collaborations: BrandCollaboration[];
}
