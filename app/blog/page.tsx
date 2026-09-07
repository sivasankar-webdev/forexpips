import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Forex Market Analysis & Outlooks",
  description:
    "Weekly forex outlooks, ICT/SMC concept breakdowns, and pair-by-pair analysis.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink">
        Analysis
      </h1>

      <div className="mt-8">
        {posts.length === 0 && (
          <p className="text-slate">No posts yet.</p>
        )}

        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}