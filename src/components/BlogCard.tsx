import Link from "next/link";

export default function BlogCard({ post }: { post: any }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className=" group block w-[230px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden transition hover:shadow-md mx-auto"
    >
      {/* Thumbnail */}
      {post.imageUrl && (
        <div className="aspect-[4/3.7] w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white leading-snug line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
          {stripMarkdown(post.excerpt || "")}
        </p>

        {/* Date Footer */}
        <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          📅 {publishedDate}
        </div>
      </div>
    </Link>
  );
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/[*_~`>#+-]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .trim();
}
