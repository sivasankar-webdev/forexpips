import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="border-b border-ink/10 py-6">
      <Link href={`/blog/${post.slug}`} className="group flex gap-5">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            width={160}
            height={100}
            className="hidden h-24 w-40 shrink-0 rounded-sm border border-ink/10 object-cover sm:block"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-gold">
            {post.pair ?? post.tags[0]}
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink group-hover:underline">
            {post.title}
          </h2>
          <p className="mt-2 text-slate">{post.description}</p>
          <p className="mt-3 text-xs text-slate/70">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingTime}
          </p>
        </div>
      </Link>
    </article>
  );
}
