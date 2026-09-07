import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import JsonLd from "@/components/seo/JsonLd";
import PostCard from "@/components/blog/PostCard";
import { mdxComponents } from "@/components/blog/MdxComponents";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { buildArticleJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    image: post.image,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated,
    image: post.image,
  });

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <JsonLd data={jsonLd} />

      <p className="text-xs uppercase tracking-wide text-gold">
        {post.pair ?? post.tags[0]}
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">{post.title}</h1>
      <p className="mt-3 text-sm text-slate">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.readingTime}
      </p>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={420}
          priority
          className="mt-8 w-full rounded-sm border border-ink/10"
        />
      )}

      <div className="mt-8">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-8">
          <h2 className="font-display text-xl text-ink">Related reading</h2>
          <div className="mt-4">
            {related.map((r) => (
              <PostCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
