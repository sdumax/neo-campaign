const videos = [
  {
    title: "Pixverse Integration",
    url: "https://www.youtube.com/embed/1bXBYDFdkOQ",
  },
  {
    title: "Kling Integration",
    url: "https://www.youtube.com/embed/ngjYe5KTVqM",
  },
  {
    title: "Kling Integration II",
    url: "https://www.youtube.com/embed/E39_Kqk0iKw",
  },
  {
    title: "Higgsfield Integration",
    url: "https://www.youtube.com/embed/--w3Rumz9sM",
  },
  {
    title: "TopView Integration",
    url: "https://www.youtube.com/embed/L4ijTsL7tJI",
  },
  {
    title: "Capcut Collaboration",
    url: "https://www.youtube.com/embed/CDv0YqOtvEU",
  },
];

export function VideoGrid() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto container md:px-24 px-6">
        <div className="mb-14 text-center" data-aos="fade-up">
          <p className="mx-auto max-w-3xl text-2xl font-medium leading-relaxed text-muted-foreground sm:text-3xl">
            Some of our creators&apos; videos are to this day the
            <br />
            most viral videos they&apos;ve had generating traction
            <br />
            and results in the long run
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map((video, index) => (
            <div
              key={video.title}
              data-aos="fade-up"
              data-aos-delay={String(index * 100)}
              className="overflow-hidden rounded-(--radius) bg-card">
              <iframe
                src={video.url}
                title={video.title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
