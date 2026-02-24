import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Menu,
  ArrowRight,
  Mail,
  Sparkles,
  BookOpen,
  Heart,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  { key: "recipes", label: "Recipes" },
  { key: "weeknight", label: "Weeknight Dinners" },
  { key: "baking", label: "Baking" },
  { key: "home", label: "Home Tips" },
  { key: "family", label: "Family Life" },
  { key: "beauty", label: "Beauty & Style" },
];

const SAMPLE_POSTS = [
  {
    id: "p1",
    title: "Cozy Lemon Yogurt Cake (with a Marshmallow Twist)",
    excerpt:
      "A bright, soft cake that feels like sunshine — plus a fun topping idea for family nights.",
    date: "Feb 2026",
    category: "baking",
    readingTime: "6 min",
  },
  {
    id: "p2",
    title: "My Favorite Weeknight Dinner Formula (No Stress)",
    excerpt:
      "A simple template that makes dinner feel doable — even when everyone’s hungry right now.",
    date: "Feb 2026",
    category: "weeknight",
    readingTime: "5 min",
  },
  {
    id: "p3",
    title: "Sunday Reset: A Calm Home Routine That Actually Sticks",
    excerpt:
      "A gentle checklist for laundry, meals, and momentum — without the overwhelm.",
    date: "Jan 2026",
    category: "home",
    readingTime: "7 min",
  },
  {
    id: "p4",
    title: "Easy Family Favorites: 10 Recipes We Repeat",
    excerpt:
      "The meals everyone actually eats — plus little shortcuts that save time.",
    date: "Jan 2026",
    category: "recipes",
    readingTime: "8 min",
  },
  {
    id: "p5",
    title: "Everyday Glow: My Simple, Real-Life Beauty Routine",
    excerpt:
      "Quick steps, practical products, and a routine that works on busy mornings.",
    date: "Dec 2025",
    category: "beauty",
    readingTime: "6 min",
  },
  {
    id: "p6",
    title: "A Little Life Update: What We’re Loving Lately",
    excerpt:
      "The small moments, the big lessons, and the everyday joys at home.",
    date: "Dec 2025",
    category: "family",
    readingTime: "4 min",
  },
];

// Replace these with Leighann's real photos (recommended sizes below)
// - hero: 1600x1200 (or wider)
// - minis: 800x800
// - headshot: 800x800
const BRAND_IMAGES = {
  hero: "",
  minis: ["", "", ""],
  headshot: "",
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="text-sm text-black/70 hover:text-black transition">
      {label}
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <div className="flex items-center gap-2 text-xs tracking-wide text-black/60">
          <Sparkles className="h-4 w-4" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm md:text-base text-black/70 max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ImageCard({
  label,
  src,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  src?: string;
  aspect?: string;
}) {
  if (src) {
    return (
      <div
        className={classNames(
          "relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm",
          aspect
        )}
      >
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return <PlaceholderImage label={label} aspect={aspect} />;
}

function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={classNames(
        "relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white via-white to-black/5",
        aspect
      )}
    >
      <div className="absolute inset-0 opacity-[0.55] [background:radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.06),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.05),transparent_38%),radial-gradient(circle_at_40%_80%,rgba(0,0,0,0.04),transparent_40%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center px-6">
          <div className="text-xs text-black/50">Image</div>
          <div className="text-sm md:text-base font-medium text-black/70">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({
  title,
  excerpt,
  date,
  category,
  readingTime,
}: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
}) {
  const catLabel =
    CATEGORIES.find((c) => c.key === category)?.label ?? "Blog";

  return (
    <a
      href="#"
      className="group block rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur hover:bg-white/90 transition"
    >
      <div className="space-y-3">
        <PlaceholderImage label={catLabel} aspect="aspect-[16/10]" />
        <div className="flex items-center gap-2 text-xs text-black/60">
          <Pill>{catLabel}</Pill>
          <span>•</span>
          <span>{date}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-semibold tracking-tight group-hover:underline underline-offset-4">
            {title}
          </h3>
          <p className="text-sm text-black/70 line-clamp-2">{excerpt}</p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-black/70">
          <span>Read</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}

export default function LoveLeighannMarieHomeMock() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_POSTS.filter((p) => {
      const inCat = cat === "all" ? true : p.category === cat;
      const inQ = q
        ? (p.title + " " + p.excerpt).toLowerCase().includes(q)
        : true;
      return inCat && inQ;
    });
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_30%),radial-gradient(circle_at_10%_5%,rgba(0,0,0,0.05),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.04),transparent_55%),radial-gradient(circle_at_30%_90%,rgba(0,0,0,0.04),transparent_55%)]">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="leading-tight">
                <div className="text-base md:text-lg font-semibold tracking-tight">
                  Love Leighann Marie
                  <span className="text-black/50"></span>
                </div>
                <div className="text-xs text-black/60">
                  Home, family, food, and everyday joy.
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-5">
              <NavLink label="Home" href="#top" />
              <NavLink label="Blog" href="#blog" />
              <NavLink label="Recipes" href="#recipes" />
              <NavLink label="Home & Family" href="#home-family" />
              <NavLink label="Beauty & Style" href="#beauty-style" />
              <NavLink label="About" href="#about" />
              <NavLink label="Work With Me" href="#work" />
              <NavLink label="Shop" href="#shop" />
              <NavLink label="Contact" href="#contact" />
            </nav>

            <div className="flex items-center gap-2">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 hover:bg-white transition"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <a
                href="#subscribe"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="mx-auto max-w-6xl px-4">
        <section className="pt-10 md:pt-14">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap gap-2">
                <Pill>Cozy lifestyle</Pill>
                <Pill>Recipes</Pill>
                <Pill>Home + family</Pill>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Welcome — I’m Leighann.
              </h1>
              <p className="text-base md:text-lg text-black/70 max-w-xl">
                Simple recipes, calm home routines, and everyday moments that make
                life feel a little lighter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#start"
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
                >
                  Start here <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#recipes"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black shadow-sm hover:bg-white transition"
                >
                  Browse recipes <BookOpen className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#subscribe"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black shadow-sm hover:bg-white transition"
                >
                  Subscribe <Mail className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl border border-black/10 bg-white/70 p-3">
                  <div className="text-xs text-black/60">New posts</div>
                  <div className="text-lg font-semibold">Weekly</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-3">
                  <div className="text-xs text-black/60">Focus</div>
                  <div className="text-lg font-semibold">Real life</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-3">
                  <div className="text-xs text-black/60">Best for</div>
                  <div className="text-lg font-semibold">Busy days</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="space-y-3"
            >
              <ImageCard
                label="Leighann — featured"
                src={BRAND_IMAGES.hero}
                aspect="aspect-[4/3]"
              />
              <div className="grid grid-cols-3 gap-3">
                <ImageCard label="Mini 1" src={BRAND_IMAGES.minis[0]} aspect="aspect-square" />
                <ImageCard label="Mini 2" src={BRAND_IMAGES.minis[1]} aspect="aspect-square" />
                <ImageCard label="Mini 3" src={BRAND_IMAGES.minis[2]} aspect="aspect-square" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Start here cards */}
        <section id="start" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="Start Here"
            title="A simple path if you’re new"
            subtitle="Three quick ways to get oriented — then you can browse by category or search." 
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Heart className="h-4 w-4" />
                <span>New here?</span>
              </div>
              <p className="mt-2 text-sm text-black/70">
                Meet Leighann, see what this site is about, and start with the
                most-loved posts.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center text-sm text-black/70 hover:text-black"
              >
                Go to Start Here <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4" />
                <span>Fan favorites</span>
              </div>
              <p className="mt-2 text-sm text-black/70">
                The top 10 posts readers come back to — recipes, routines, and
                little wins.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center text-sm text-black/70 hover:text-black"
              >
                See favorites <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>My story</span>
              </div>
              <p className="mt-2 text-sm text-black/70">
                A warm, honest About page — what matters here, and why this blog
                exists.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center text-sm text-black/70 hover:text-black"
              >
                Read About <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="recipes" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="Browse"
            title="Featured categories"
            subtitle="Keep categories tight for clarity and SEO. These tiles can lead to a category page with filters." 
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href="#"
                className="group rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur hover:bg-white/90 transition"
              >
                <PlaceholderImage label={c.label} aspect="aspect-[16/10]" />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{c.label}</div>
                    <div className="text-xs text-black/60">Browse posts</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-black/60 transition group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Latest posts */}
        <section id="blog" className="mt-12 md:mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow="Fresh"
              title="Latest posts"
              subtitle="Two-column feed, clean cards, and pagination on the real site." 
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts…"
                  className="h-10 w-full sm:w-64 rounded-xl border border-black/10 bg-white/70 pl-10 pr-3 text-sm outline-none focus:bg-white"
                />
              </div>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:bg-white"
              >
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((p) => (
              <PostCard
                key={p.id}
                title={p.title}
                excerpt={p.excerpt}
                date={p.date}
                category={p.category}
                readingTime={p.readingTime}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <button className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black shadow-sm hover:bg-white transition">
              Load more
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Popular right now */}
        <section className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <SectionTitle
                eyebrow="Reader love"
                title="Popular right now"
                subtitle="A short list helps people find the best stuff fast." 
              />
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-black/70 hover:text-black"
              >
                View all <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "The 5-minute dinner plan",
                "Best soft chocolate chip cookies",
                "Morning routine for calm days",
                "My pantry staples list",
                "Easy beauty favorites",
                "How I organize family schedules",
              ].map((t, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:bg-white transition"
                >
                  <span className="text-sm font-medium">{t}</span>
                  <ArrowRight className="h-4 w-4 text-black/60" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About / Work / Shop / Contact placeholders (wire these to real pages later) */}
        <section id="about" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="About"
            title="A little about Leighann"
            subtitle="This is a placeholder section for the demo. On the real site, this becomes a full About page with photos, story, and trust-building details."
          />
          <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-sm md:text-base text-black/70 max-w-3xl">
              Hi — I’m Leighann. I share cozy recipes, simple home routines, and real-life moments that help busy families feel more grounded.
              This space is all about practical comfort: food that works on weeknights, habits that stick, and little joys at home.
            </p>
          </div>
        </section>

        <section id="work" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="Work With Me"
            title="Brand partnerships + collaborations"
            subtitle="Demo placeholder. This becomes a dedicated page with media kit, rates, examples, and contact form."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Sponsored posts", "Recipe development", "UGC + short-form"].map((t) => (
              <div key={t} className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold">{t}</div>
                <p className="mt-2 text-sm text-black/70">
                  Clear deliverables, cozy aesthetic, and a family-first audience.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="Shop"
            title="Favorites + recommendations"
            subtitle="Demo placeholder. This becomes a curated shop page with affiliate disclosures and category filters."
          />
          <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-sm md:text-base text-black/70">
              Add your “favorites” collections here (kitchen, home, beauty, family).
            </p>
          </div>
        </section>

        <section id="contact" className="mt-12 md:mt-16">
          <SectionTitle
            eyebrow="Contact"
            title="Say hello"
            subtitle="Demo placeholder. This becomes a real contact page + form + social links."
          />
          <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-sm md:text-base text-black/70">
              For now, the Subscribe form below is your main capture. A contact form can be added here later.
            </p>
          </div>
        </section>

        {/* Email capture */}
        <section id="subscribe" className="mt-12 md:mt-16 pb-16">
          <div className="rounded-3xl border border-black/10 bg-black p-6 md:p-10 text-white shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs text-white/80">
                  <Mail className="h-4 w-4" />
                  <span>Newsletter</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Get new posts + little freebies
                </h3>
                <p className="text-sm md:text-base text-white/80 max-w-xl">
                  A friendly note when something new goes live — recipes, routines,
                  and the cozy stuff.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 md:p-5">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid gap-3"
                >
                  <input
                    placeholder="First name"
                    className="h-11 rounded-xl border border-white/15 bg-white/10 px-3 text-sm outline-none placeholder:text-white/60 focus:bg-white/15"
                  />
                  <input
                    placeholder="Email"
                    className="h-11 rounded-xl border border-white/15 bg-white/10 px-3 text-sm outline-none placeholder:text-white/60 focus:bg-white/15"
                  />
                  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black hover:opacity-90 transition">
                    Join
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <p className="text-xs text-white/70">
                    Add privacy policy + cookie banner on the real site.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-lg font-semibold tracking-tight">
                Love Leighann Marie <span className="text-black/50"></span>
              </div>
              <p className="text-sm text-black/70">
                Cozy home ideas, family life, and recipes that feel like a hug.
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Shop
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm hover:bg-white"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Quick links</div>
              <div className="grid gap-2 text-sm text-black/70">
                <a href="#" className="hover:text-black">
                  About
                </a>
                <a href="#" className="hover:text-black">
                  Work With Me
                </a>
                <a href="#" className="hover:text-black">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-black">
                  Terms & Disclaimer
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Ad + SEO readiness</div>
              <ul className="text-sm text-black/70 space-y-1 list-disc pl-5">
                <li>Clean permalinks and category pages</li>
                <li>Fast images + alt text</li>
                <li>Recipe schema (if recipes)</li>
                <li>Cookie banner + policy pages</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-xs text-black/60">
            © {new Date().getFullYear()} Love Leighann Marie
          </div>
        </div>
      </footer>
    </div>
  );
}
