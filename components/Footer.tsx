import { SITE } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Market commentary for
          educational purposes — not financial advice.
        </p>
      </div>
    </footer>
  );
}
