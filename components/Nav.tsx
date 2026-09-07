import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-ink/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl text-ink">
          Pip &amp; Structure
        </Link>
        <nav className="flex gap-6 text-sm text-slate">
          <Link href="/blog" className="hover:text-ink">
            Analysis
          </Link>
          <Link href="/blog?tag=ICT" className="hover:text-ink">
            ICT/SMC
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
