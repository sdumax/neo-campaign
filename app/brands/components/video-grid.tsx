const videos = [
  { title: "Pixverse Integration" },
  { title: "Kling Integration" },
  { title: "Kling Integration II" },
  { title: "Higgsfield Integration" },
  { title: "TopView Integration" },
  { title: "OpenArt Integration" },
];

export function VideoGrid() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mx-auto max-w-3xl text-2xl font-medium leading-relaxed text-muted-foreground sm:text-3xl">
            Some of our creators&apos; videos are to this day the
            <br />
            most viral videos they&apos;ve had generating traction
            <br />
            and results in the long run
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.title}
              className="overflow-hidden rounded-[var(--radius)] bg-card">
              <div className="relative aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6 fill-white text-white">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium text-foreground">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
