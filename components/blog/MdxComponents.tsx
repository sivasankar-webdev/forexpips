import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

// Enforces consistent heading structure + styling for all MDX post content.
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-display text-2xl text-ink" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-xl text-ink" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-ink/90" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/90 [&.contains-task-list]:list-none [&.contains-task-list]:pl-0" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  input: (props) => (
    <input className="mr-2 accent-gold" {...props} disabled readOnly />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink/90" {...props} />
  ),
  a: ({ href = "", ...props }) => (
    <Link
      href={href}
      className="text-gold underline underline-offset-2"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-2 border-gold pl-4 italic text-slate"
      {...props}
    />
  ),
  img: ({ src = "", alt = "" }) => (
    <span className="mt-6 block">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={420}
        className="w-full rounded-sm border border-ink/10"
        sizes="(max-width: 768px) 100vw, 700px"
      />
      {alt && (
        <span className="mt-2 block text-center text-xs text-slate">
          {alt}
        </span>
      )}
    </span>
  ),
};
