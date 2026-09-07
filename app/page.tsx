import Link from "next/link";
import MarketPulse from "@/components/blog/MarketPulse";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Forex analysis built on market structure, not headlines.
          </h1>
          <p className="mt-4 max-w-md text-slate">
            Pair-by-pair breakdowns, ICT and Smart Money Concepts explained
            plainly, and weekly outlooks you can actually use in a trading
            plan.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-block border border-ink px-5 py-2.5 text-sm text-ink hover:bg-ink hover:text-paper"
          >
            Read the latest analysis
          </Link>
        </div>
        <MarketPulse />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="font-display text-2xl text-ink">Recent posts</h2>
        <div className="mt-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
