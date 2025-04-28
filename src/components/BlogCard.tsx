import Link from "next/link";

export default function BlogCard({ post }: { post: any }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const stripMarkdown = (markdown: string) =>
    markdown
      .replace(/[*_~`>#+-]/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .trim();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md w-full max-w-sm mx-auto"
    >
      {/* Thumbnail */}
      {post.imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-5">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-semibold px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white line-clamp-2 transition-colors group-hover:text-primary-600">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-neutral-700 dark:text-neutral-400 line-clamp-3">
          {stripMarkdown(post.excerpt || "")}
        </p>

        {/* Footer: Date & Read Time */}
        <div className="flex justify-between items-center mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>📅 {publishedDate}</span>
          <span>⏱️ {Math.max(Math.ceil((post.content?.length || 400) / 800), 1)} min read</span>
        </div>
      </div>
    </Link>
  );
}
