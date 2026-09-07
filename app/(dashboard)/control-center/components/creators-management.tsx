"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  Check,
  X,
  Loader2,
  Sparkles,
  Upload,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { convertFileToBase64 } from "@/lib/image-upload";
import { authFetch } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface Brand {
  id: number;
  name: string;
  logo?: string | null;
}

interface VideoInput {
  title: string;
  thumbnail: string;
  views: string;
  publishedAt: string;
  url: string;
}

interface Creator {
  id: number;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  bannerText: string | null;
  bannerBg: string | null;
  bannerImage: string | null;
  subscribers: string;
  videosCount: string;
  bio: string;
  channelUrl: string;
  isActive: boolean;
  sortOrder: number;
  collaborations: Brand[];
  recentVideos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    publishedAt: string;
    url: string;
  }>;
}

export function CreatorsManagement() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncingYouTube, setSyncingYouTube] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Bulk Refresh State
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [bulkRefreshMessage, setBulkRefreshMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Brand Management State
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandLogo, setNewBrandLogo] = useState<string | null>(null);
  const [creatingBrand, setCreatingBrand] = useState(false);

  // Multi-upload Brand Logos State
  interface PendingBrandItem {
    id: string;
    name: string;
    logo: string;
    fileName: string;
    fileSize?: string;
  }
  const [pendingBrandItems, setPendingBrandItems] = useState<PendingBrandItem[]>([]);
  const [brandUploadDragActive, setBrandUploadDragActive] = useState(false);
  const [brandModalError, setBrandModalError] = useState<string | null>(null);
  const brandMultiFileInputRef = useRef<HTMLInputElement>(null);
  const brandLogoInputRef = useRef<HTMLInputElement>(null);

  // Helper to infer brand name from filename
  const cleanBrandNameFromFilename = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    let cleaned = nameWithoutExt.replace(/[-_+]/g, " ");
    cleaned = cleaned.replace(
      /\b(logo|icon|brand|official|transparent|dark|white|black|light|vector|symbol)\b/gi,
      ""
    );
    cleaned = cleaned.trim().replace(/\s+/g, " ");
    if (!cleaned) cleaned = nameWithoutExt.trim();
    return cleaned
      .split(" ")
      .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handle: "",
    channelUrl: "",
    avatar: "/creator1.png",
    bannerText: "",
    bannerBg: "bg-zinc-900",
    bannerImage: "" as string,
    subscribers: "0",
    videosCount: "0",
    bio: "",
    isActive: true,
    sortOrder: 0,
    selectedBrandIds: [] as number[],
    recentVideos: [
      {
        title: "Latest AI Integration",
        thumbnail: "/home1.png",
        views: "1.2m views",
        publishedAt: "2 weeks ago",
        url: "",
      },
      {
        title: "Workflow Automation Guide",
        thumbnail: "/home2.png",
        views: "850K views",
        publishedAt: "3 weeks ago",
        url: "",
      },
      {
        title: "Top AI Tools Breakdown",
        thumbnail: "/home3.png",
        views: "2.1m views",
        publishedAt: "1 month ago",
        url: "",
      },
    ] as VideoInput[],
  });

  const refreshCreators = async () => {
    try {
      const res = await authFetch("/api/control-center/creators");
      if (res.ok) {
        const data = await res.json();
        setCreators(data.creators || []);
        setBrands(data.brands || []);
      }
    } catch (err) {
      console.error("Failed to refresh creators:", err);
    }
  };

  const handleRefreshAll = async () => {
    setRefreshingAll(true);
    setBulkRefreshMessage(null);
    try {
      const res = await authFetch("/api/control-center/creators/refresh-all", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBulkRefreshMessage({
          text: `Refreshed ${data.synced} of ${data.total} creators from YouTube!`,
          type: "success",
        });
        refreshCreators();
      } else {
        setBulkRefreshMessage({
          text: data.error || "Failed to refresh creators.",
          type: "error",
        });
      }
    } catch {
      setBulkRefreshMessage({
        text: "Network error refreshing creators.",
        type: "error",
      });
    } finally {
      setRefreshingAll(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await authFetch("/api/control-center/creators");
        if (res.ok && !ignore) {
          const data = await res.json();
          setCreators(data.creators || []);
          setBrands(data.brands || []);
        }
      } catch (err) {
        console.error("Failed to load creators:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const openAddModal = () => {
    setEditingCreator(null);
    setSyncMessage(null);
    setFormData({
      name: "",
      email: "",
      handle: "",
      channelUrl: "",
      avatar: "/creator1.png",
      bannerText: "",
      bannerBg: "bg-zinc-900",
      bannerImage: "",
      subscribers: "0",
      videosCount: "0",
      bio: "",
      isActive: true,
      sortOrder: creators.length,
      selectedBrandIds: [],
      recentVideos: [
        {
          title: "Latest AI Integration",
          thumbnail: "/home1.png",
          views: "1.2m views",
          publishedAt: "2 weeks ago",
          url: "",
        },
        {
          title: "Workflow Automation Guide",
          thumbnail: "/home2.png",
          views: "850K views",
          publishedAt: "3 weeks ago",
          url: "",
        },
        {
          title: "Top AI Tools Breakdown",
          thumbnail: "/home3.png",
          views: "2.1m views",
          publishedAt: "1 month ago",
          url: "",
        },
      ],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (creator: Creator) => {
    setEditingCreator(creator);
    setSyncMessage(null);
    setFormData({
      name: creator.name,
      email: creator.email || "",
      handle: creator.handle,
      channelUrl: creator.channelUrl,
      avatar: creator.avatar,
      bannerText: creator.bannerText || "",
      bannerBg: creator.bannerBg || "bg-zinc-900",
      bannerImage: creator.bannerImage || "",
      subscribers: creator.subscribers,
      videosCount: creator.videosCount,
      bio: creator.bio,
      isActive: creator.isActive,
      sortOrder: creator.sortOrder,
      selectedBrandIds: creator.collaborations.map((b) => b.id),
      recentVideos:
        creator.recentVideos.length > 0
          ? creator.recentVideos.map((v) => ({
              title: v.title,
              thumbnail: v.thumbnail,
              views: v.views,
              publishedAt: v.publishedAt,
              url: v.url,
            }))
          : [
              {
                title: "Latest AI Integration",
                thumbnail: "/home1.png",
                views: "1.2m views",
                publishedAt: "2 weeks ago",
                url: creator.channelUrl,
              },
            ],
    });
    setIsModalOpen(true);
  };

  // YouTube Sync Handler
  const handleSyncYouTube = async () => {
    const query = formData.handle || formData.channelUrl || formData.name;
    if (!query || !query.trim()) {
      setSyncMessage({
        text: "Please enter a YouTube handle or Channel URL first.",
        type: "error",
      });
      return;
    }

    setSyncingYouTube(true);
    setSyncMessage(null);

    try {
      const res = await authFetch("/api/control-center/youtube-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handleOrUrl: query.trim() }),
      });

      const json = await res.json();

      if (res.ok && json.data) {
        const d = json.data;
        setFormData((prev) => ({
          ...prev,
          name: d.name || prev.name,
          handle: d.handle,
          channelUrl: d.customUrl || prev.channelUrl,
          subscribers: d.subscribers,
          videosCount: d.videosCount,
          avatar: d.avatar || prev.avatar,
          bannerImage: d.bannerImage || prev.bannerImage,
          bio: d.description || prev.bio,
          recentVideos:
            d.recentVideos && d.recentVideos.length > 0
              ? d.recentVideos
              : prev.recentVideos,
        }));
        setSyncMessage({
          text: `Synced successfully! (${d.subscribers} subscribers, ${d.videosCount} videos, bio, avatar & banner auto-extracted)`,
          type: "success",
        });
      } else {
        setSyncMessage({
          text: json.error || "Channel not found. Check handle or API key.",
          type: "error",
        });
      }
    } catch {
      setSyncMessage({
        text: "Failed to connect to YouTube sync service.",
        type: "error",
      });
    } finally {
      setSyncingYouTube(false);
    }
  };

  // Brand Logo File Upload Handlers (Single & Bulk)
  const handleProcessBrandFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).slice(0, 20);
    if (fileArray.length === 0) return;

    const newItems: PendingBrandItem[] = [];
    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const base64 = await convertFileToBase64(file, 400, 200, 0.9);
        const name = cleanBrandNameFromFilename(file.name);
        const sizeKB = (file.size / 1024).toFixed(0) + " KB";
        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          name,
          logo: base64,
          fileName: file.name,
          fileSize: sizeKB,
        });
      } catch (err) {
        console.error(`Failed to process brand logo ${file.name}:`, err);
      }
    }

    if (newItems.length > 0) {
      setPendingBrandItems((prev) => [...prev, ...newItems].slice(0, 20));
    }
  };

  const handleBulkLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleProcessBrandFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleBrandLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertFileToBase64(file, 300, 150, 0.9);
      setNewBrandLogo(base64);
    } catch (err) {
      console.error("Brand logo upload failed:", err);
    }
  };

  const handleSaveBulkBrands = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingBrandItems.length === 0) return;

    const validItems = pendingBrandItems.filter(
      (item) => item.name.trim().length > 0
    );
    if (validItems.length === 0) return;

    setCreatingBrand(true);
    setBrandModalError(null);
    try {
      const res = await authFetch("/api/control-center/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brands: validItems.map((b) => ({
            name: b.name.trim(),
            logo: b.logo || undefined,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const createdBrands: Brand[] =
          data.brands || (data.brand ? [data.brand] : []);
        if (createdBrands.length > 0) {
          setBrands((prev) => {
            const brandMap = new Map<number, Brand>();
            prev.forEach((b) => brandMap.set(b.id, b));
            createdBrands.forEach((b) => brandMap.set(b.id, b));
            return Array.from(brandMap.values()).sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          });

          const newIds = createdBrands.map((b) => b.id);
          setFormData((prev) => ({
            ...prev,
            selectedBrandIds: Array.from(
              new Set([...prev.selectedBrandIds, ...newIds])
            ),
          }));

          setPendingBrandItems([]);
          setBrandModalError(null);
          setIsBrandModalOpen(false);
        } else {
          setBrandModalError("No brands were saved. Please check the inputs.");
        }
      } else {
        setBrandModalError(data.error || "Failed to save brands to database.");
      }
    } catch (err: unknown) {
      console.error("Failed to bulk create brands:", err);
      setBrandModalError(
        err instanceof Error ? err.message : "Connection error while saving brands."
      );
    } finally {
      setCreatingBrand(false);
    }
  };

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    setCreatingBrand(true);
    setBrandModalError(null);
    try {
      const res = await authFetch("/api/control-center/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newBrandName.trim(),
          logo: newBrandLogo || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.brand) {
        setBrands((prev) => [...prev, data.brand]);
        setFormData((prev) => ({
          ...prev,
          selectedBrandIds: [...prev.selectedBrandIds, data.brand.id],
        }));
        setNewBrandName("");
        setNewBrandLogo(null);
        setBrandModalError(null);
        setIsBrandModalOpen(false);
      } else {
        setBrandModalError(data.error || "Failed to create brand.");
      }
    } catch (err: unknown) {
      console.error("Failed to create brand:", err);
      setBrandModalError(
        err instanceof Error ? err.message : "Connection error while creating brand."
      );
    } finally {
      setCreatingBrand(false);
    }
  };

  const handleQuickCreateBrandFromSearch = async (name: string) => {
    if (!name.trim()) return;
    try {
      const res = await authFetch("/api/control-center/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.brand) {
          setBrands((prev) => {
            if (prev.some((b) => b.id === data.brand.id)) return prev;
            return [...prev, data.brand].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          });
          setFormData((prev) => ({
            ...prev,
            selectedBrandIds: Array.from(
              new Set([...prev.selectedBrandIds, data.brand.id])
            ),
          }));
          setBrandSearch("");
        }
      }
    } catch (err) {
      console.error("Failed to quick create brand:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.handle || !formData.channelUrl) return;

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email.trim(),
        handle: formData.handle,
        channelUrl: formData.channelUrl,
        avatar: formData.avatar,
        bannerText: formData.bannerText,
        bannerBg: formData.bannerBg,
        bannerImage: formData.bannerImage || null,
        subscribers: formData.subscribers,
        videosCount: formData.videosCount,
        bio: formData.bio,
        isActive: formData.isActive,
        sortOrder: formData.sortOrder,
        brandIds: formData.selectedBrandIds,
        recentVideos: formData.recentVideos.map((v) => ({
          ...v,
          url: v.url || formData.channelUrl,
        })),
      };

      if (editingCreator) {
        const res = await authFetch(
          `/api/control-center/creators/${editingCreator.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (res.ok) {
          setIsModalOpen(false);
          refreshCreators();
        }
      } else {
        const res = await authFetch("/api/control-center/creators", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsModalOpen(false);
          refreshCreators();
        }
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (creator: Creator) => {
    try {
      await authFetch(`/api/control-center/creators/${creator.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !creator.isActive }),
      });
      refreshCreators();
    } catch (err) {
      console.error("Toggle active failed:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this creator?")) return;

    try {
      await authFetch(`/api/control-center/creators/${id}`, {
        method: "DELETE",
      });
      refreshCreators();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredCreators = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const selectedBrandsList = brands.filter((b) =>
    formData.selectedBrandIds.includes(b.id)
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search creators by name, handle, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={handleRefreshAll}
            disabled={refreshingAll}
            className="border-border hover:bg-muted font-semibold text-xs h-10 px-3.5 gap-2 normal-case tracking-normal"
          >
            <RefreshCw
              className={cn("size-3.5", refreshingAll && "animate-spin text-primary")}
            />
            <span>{refreshingAll ? "Refreshing All..." : "Refresh All Partners"}</span>
          </Button>
          <Button
            onClick={openAddModal}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-10 px-4 gap-2 normal-case tracking-normal"
          >
            <Plus size={16} />
            <span>Add New Creator</span>
          </Button>
        </div>
      </div>

      {bulkRefreshMessage && (
        <div
          className={cn(
            "p-3 rounded-lg text-xs font-medium border flex items-center justify-between",
            bulkRefreshMessage.type === "success"
              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
              : "bg-red-950/20 border-red-500/30 text-red-400"
          )}
        >
          <span>{bulkRefreshMessage.text}</span>
          <button
            type="button"
            onClick={() => setBulkRefreshMessage(null)}
            className="hover:opacity-75"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Creators Table / List */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-muted-foreground gap-3">
          <Loader2 className="animate-spin size-5 text-primary" />
          <span>Loading creators...</span>
        </div>
      ) : filteredCreators.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/30">
          <Sparkles className="size-8 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-base font-semibold text-foreground">
            No creators found
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "No creators matched your search query."
              : "Get started by adding your first partner creator to display on the Partners page."}
          </p>
          {!searchQuery && (
            <Button
              onClick={openAddModal}
              className="mt-4 bg-primary text-primary-foreground font-semibold text-xs h-9 px-4 normal-case"
            >
              Add Creator
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Creator</th>
                  <th className="px-6 py-3.5">Stats</th>
                  <th className="px-6 py-3.5">Collaborations</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCreators.map((creator) => (
                  <tr
                    key={creator.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 rounded-full overflow-hidden bg-background border border-border shrink-0">
                          <Image
                            src={creator.avatar}
                            alt={creator.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            unoptimized={creator.avatar.startsWith("data:")}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground flex items-center gap-1.5">
                            <span>{creator.name}</span>
                            <a
                              href={creator.channelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink size={12} />
                            </a>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {creator.handle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="font-medium text-foreground">
                        {creator.subscribers}
                      </span>{" "}
                      subs •{" "}
                      <span className="font-medium text-foreground">
                        {creator.videosCount}
                      </span>{" "}
                      videos
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {creator.collaborations.length > 0 ? (
                          creator.collaborations.map((b) => (
                            <span
                              key={b.id}
                              className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                            >
                              {b.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            None
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(creator)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                          creator.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 hover:bg-zinc-500/20"
                        }`}
                      >
                        {creator.isActive ? (
                          <>
                            <Eye size={12} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => openEditModal(creator)}
                          className="hover:text-primary"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleDelete(creator.id)}
                          className="hover:text-destructive text-muted-foreground"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Creator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-[#0f0f12] text-foreground p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {editingCreator ? "Edit Creator" : "Add Partner Creator"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure creator profile, YouTube metrics, banner, and
                  collaborations.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </Button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-6">
              {/* YouTube Auto-Sync Bar */}
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <svg className="size-4 text-red-500 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube Auto-Sync</span>
                  </span>
                  <Button
                    type="button"
                    onClick={handleSyncYouTube}
                    disabled={syncingYouTube}
                    size="xs"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs h-8 px-3 gap-1.5 normal-case"
                  >
                    {syncingYouTube ? (
                      <Loader2 className="animate-spin size-3.5" />
                    ) : (
                      <RefreshCw size={13} />
                    )}
                    <span>Fetch from YouTube</span>
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Input handle (e.g. <code>@jacksons_ai</code>) or full URL
                  below, then click &quot;Fetch from YouTube&quot; to
                  auto-populate stats, avatar, and recent videos.
                </p>
                {syncMessage && (
                  <p
                    className={`text-xs font-medium ${
                      syncMessage.type === "success"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {syncMessage.text}
                  </p>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    YouTube Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @jacksons_ai"
                    value={formData.handle}
                    onChange={(e) =>
                      setFormData({ ...formData, handle: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jacksons AI"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Email Address * (Used for &quot;Message&quot; button)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. creator@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Channel URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://youtube.com/@jacksons_ai"
                    value={formData.channelUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, channelUrl: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Stats (Synced from YouTube or manual override) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Subscribers Count (from YouTube API)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 624K"
                    value={formData.subscribers}
                    onChange={(e) =>
                      setFormData({ ...formData, subscribers: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Videos Count (from YouTube API)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 25"
                    value={formData.videosCount}
                    onChange={(e) =>
                      setFormData({ ...formData, videosCount: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* YouTube Media Assets (Avatar & Banner Auto-Synced) */}
              <div className="space-y-3 rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    YouTube Media Assets
                  </span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                    Auto-synced from YouTube
                  </span>
                </div>

                {/* Banner Preview */}
                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-border/80 bg-gradient-to-r from-zinc-900 via-purple-950/20 to-zinc-900 flex items-center justify-center">
                  {formData.bannerImage ? (
                    <Image
                      src={formData.bannerImage}
                      alt="YouTube Banner"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground font-mono">
                      No custom YouTube banner found — Modern fallback gradient active
                    </span>
                  )}
                </div>

                {/* Avatar & Channel Details Preview */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative size-12 rounded-full overflow-hidden border-2 border-primary ring-2 ring-primary/20 shrink-0 bg-background shadow">
                    <Image
                      src={formData.avatar || "/creator1.png"}
                      alt="Avatar"
                      fill
                      className="object-cover"
                      sizes="48px"
                      unoptimized={formData.avatar?.startsWith("data:")}
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">
                      {formData.name || "Channel Profile"}
                    </div>
                    <div className="text-muted-foreground">
                      {formData.handle || "@handle"} • {formData.subscribers} subscribers
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Description */}
              <div>
                <label className="text-xs font-semibold text-foreground">
                  Channel Bio Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short channel bio to display on the creator card & detail sheet..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Searchable Brand Collaborations Section */}
              <div className="space-y-3 rounded-xl border border-border bg-card/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-foreground">
                      Brand Collaborations
                    </label>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Select brands this creator has partnered with to display on their profile.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => setIsBrandModalOpen(true)}
                    className="text-xs h-7 px-2.5 gap-1.5 normal-case shrink-0"
                  >
                    <Plus size={12} />
                    <span>Upload / Add Brand</span>
                  </Button>
                </div>

                {/* Selected Brands Chips (Always visible when brands are attached) */}
                {selectedBrandsList.length > 0 && (
                  <div className="rounded-lg border border-primary/25 bg-primary/5 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                        Selected Brands ({selectedBrandsList.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, selectedBrandIds: [] })
                        }
                        className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                      {selectedBrandsList.map((b) => (
                        <span
                          key={b.id}
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 border border-primary/30 px-2 py-1 text-xs font-medium text-foreground shadow-xs"
                        >
                          {b.logo ? (
                            <div className="relative size-3.5 shrink-0">
                              <Image
                                src={b.logo}
                                alt={b.name}
                                fill
                                className="object-contain"
                                unoptimized={b.logo.startsWith("data:")}
                              />
                            </div>
                          ) : (
                            <Check size={11} className="text-primary shrink-0" />
                          )}
                          <span>{b.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                selectedBrandIds:
                                  formData.selectedBrandIds.filter(
                                    (id) => id !== b.id
                                  ),
                              })
                            }
                            className="size-3.5 rounded-full hover:bg-destructive hover:text-destructive-foreground text-muted-foreground flex items-center justify-center ml-0.5 transition-colors"
                            title="Remove"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search & Filter Brands Input */}
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search available brands or type to add new..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full rounded-md border border-border bg-card pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  {brandSearch && (
                    <button
                      type="button"
                      onClick={() => setBrandSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Available Brands / Search Results */}
                <div className="space-y-1.5">
                  {filteredBrands.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border border-border/50 rounded-lg bg-card/60">
                      {filteredBrands.map((b) => {
                        const isSelected = formData.selectedBrandIds.includes(b.id);
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                selectedBrandIds: isSelected
                                  ? formData.selectedBrandIds.filter(
                                      (id) => id !== b.id
                                    )
                                  : [...formData.selectedBrandIds, b.id],
                              });
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-all ${
                              isSelected
                                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {isSelected ? (
                              <Check size={12} />
                            ) : (
                              b.logo && (
                                <div className="relative size-3.5 shrink-0">
                                  <Image
                                    src={b.logo}
                                    alt={b.name}
                                    fill
                                    className="object-contain"
                                    unoptimized={b.logo.startsWith("data:")}
                                  />
                                </div>
                              )
                            )}
                            <span>{b.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : brandSearch.trim() ? (
                    <div className="rounded-lg border border-dashed border-border p-3 text-center bg-card/30 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        No existing brand matching &ldquo;{brandSearch}&rdquo;
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={() =>
                          handleQuickCreateBrandFromSearch(brandSearch)
                        }
                        className="text-xs h-7 px-3 gap-1.5 text-primary border-primary/40 hover:bg-primary/10 normal-case"
                      >
                        <Plus size={12} />
                        <span>Create & Attach &ldquo;{brandSearch.trim()}&rdquo;</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border p-3 text-center bg-card/20 text-xs text-muted-foreground">
                      No brands in library. Click &ldquo;Upload / Add Brand&rdquo; above to get started.
                    </div>
                  )}
                </div>
              </div>

              {/* Visibility Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="size-4 rounded border-border text-primary focus:ring-primary"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs font-medium text-foreground cursor-pointer"
                >
                  Publish and display on the live Partners page
                </label>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="normal-case text-xs h-10 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-10 px-6 normal-case"
                >
                  {saving ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : editingCreator ? (
                    "Save Changes"
                  ) : (
                    "Create Creator"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Multi-Upload Brand Collaborator Modal */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-[#111115] text-foreground p-6 md:p-7 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border shrink-0">
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                  <span>Brand Collaborator Logos</span>
                  {pendingBrandItems.length > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                      {pendingBrandItems.length} selected
                    </span>
                  )}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-upload logos or add brands. Names are auto-inferred and editable before saving.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => {
                  setPendingBrandItems([]);
                  setIsBrandModalOpen(false);
                }}
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Hidden Multi File Input */}
            <input
              ref={brandMultiFileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleBulkLogoUpload}
              className="hidden"
            />

            {/* Modal Content Body */}
            <div className="overflow-y-auto space-y-4 pr-1 flex-1">
              {brandModalError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive flex items-center justify-between">
                  <span>{brandModalError}</span>
                  <button
                    type="button"
                    onClick={() => setBrandModalError(null)}
                    className="text-destructive hover:text-destructive/80 font-bold ml-2"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}

              {/* Drag & Drop Multi-Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setBrandUploadDragActive(true);
                }}
                onDragLeave={() => setBrandUploadDragActive(false)}
                onDrop={async (e) => {
                  e.preventDefault();
                  setBrandUploadDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    await handleProcessBrandFiles(e.dataTransfer.files);
                  }
                }}
                onClick={() => brandMultiFileInputRef.current?.click()}
                className={cn(
                  "relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2",
                  brandUploadDragActive
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                    : "border-border/80 bg-card/40 hover:border-primary/50 hover:bg-card/70"
                )}
              >
                <div className="size-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                  <Upload size={20} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-foreground">
                    Click to select multiple brand logos
                  </span>
                  <span className="text-xs text-muted-foreground"> or drag & drop files here</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Supports SVG, PNG, WebP, JPG (Up to 20 files per batch)
                </p>
              </div>

              {/* Pending Uploads Batch List */}
              {pendingBrandItems.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-foreground">
                      Batch Queue ({pendingBrandItems.length} items)
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => brandMultiFileInputRef.current?.click()}
                      className="text-xs h-7 px-2.5 gap-1.5 normal-case"
                    >
                      <Plus size={12} />
                      <span>Add More Images</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
                    {pendingBrandItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative rounded-xl border border-border bg-card/70 p-3 flex items-center gap-3 group hover:border-primary/40 transition-colors"
                      >
                        {/* Logo Thumbnail Box */}
                        <div className="relative size-12 shrink-0 rounded-lg bg-black/60 border border-border/80 flex items-center justify-center p-1.5 overflow-hidden">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>

                        {/* Editable Name & File Info */}
                        <div className="flex-1 min-w-0 pr-6">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPendingBrandItems((prev) =>
                                prev.map((p) =>
                                  p.id === item.id ? { ...p, name: val } : p
                                )
                              );
                            }}
                            placeholder="Brand Name"
                            className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground focus:outline-none focus:border-primary"
                          />
                          <div className="text-[10px] text-muted-foreground truncate mt-1 flex items-center gap-1.5">
                            <span className="truncate">{item.fileName}</span>
                            {item.fileSize && (
                              <span className="shrink-0 text-zinc-500">
                                ({item.fileSize})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Remove Item Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setPendingBrandItems((prev) =>
                              prev.filter((p) => p.id !== item.id)
                            )
                          }
                          className="absolute top-2 right-2 size-6 rounded-full bg-muted/60 hover:bg-destructive hover:text-destructive-foreground text-muted-foreground flex items-center justify-center transition-colors"
                          title="Remove item"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Optional Single Manual Brand Entry */
                <div className="rounded-xl border border-border/60 bg-card/30 p-4 space-y-3">
                  <span className="text-xs font-semibold text-foreground">
                    Or add a single brand manually
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-muted-foreground">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. OpenAI, Runway"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="mt-1 w-full rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium text-muted-foreground">
                          Logo (Optional)
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => brandLogoInputRef.current?.click()}
                          className="text-[11px] h-5 px-1.5 text-primary normal-case"
                        >
                          Select Image
                        </Button>
                        <input
                          ref={brandLogoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBrandLogoUpload}
                          className="hidden"
                        />
                      </div>
                      {newBrandLogo ? (
                        <div className="mt-1 relative h-8 rounded-md border border-border bg-card flex items-center justify-center p-1">
                          <div className="relative h-6 w-24">
                            <Image
                              src={newBrandLogo}
                              alt="Logo preview"
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewBrandLogo(null)}
                            className="absolute top-1 right-1 size-4 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => brandLogoInputRef.current?.click()}
                          className="mt-1 h-8 rounded-md border border-dashed border-border bg-card/40 flex items-center justify-center text-[11px] text-muted-foreground cursor-pointer hover:border-primary/50"
                        >
                          <span>Upload logo file</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border shrink-0">
              <div>
                {pendingBrandItems.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => setPendingBrandItems([])}
                    className="text-xs text-muted-foreground hover:text-destructive normal-case"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    setPendingBrandItems([]);
                    setIsBrandModalOpen(false);
                  }}
                  className="normal-case h-8 text-xs px-3"
                >
                  Cancel
                </Button>
                {pendingBrandItems.length > 0 ? (
                  <Button
                    type="button"
                    disabled={creatingBrand}
                    onClick={handleSaveBulkBrands}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-8 px-4 gap-1.5 normal-case"
                  >
                    {creatingBrand ? (
                      <Loader2 className="animate-spin size-3.5" />
                    ) : (
                      <Check size={13} />
                    )}
                    <span>
                      Save & Attach {pendingBrandItems.length}{" "}
                      {pendingBrandItems.length === 1 ? "Brand" : "Brands"}
                    </span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={creatingBrand || !newBrandName.trim()}
                    onClick={handleCreateBrand}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-8 px-4 normal-case"
                  >
                    {creatingBrand ? (
                      <Loader2 className="animate-spin size-3.5" />
                    ) : (
                      "Save & Attach Brand"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
