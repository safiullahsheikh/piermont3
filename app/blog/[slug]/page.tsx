import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, pageMeta } from "../../site";
import { LazyVideo } from "../../components/LazyVideo";
import { getProject, projectHref } from "../../work/projects";
import { POSTS, getPost, postMedia } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: postMedia(post).poster,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Piermont Studios"],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const media = postMedia(post);
  const project = getProject(post.project)!;
  const next = POSTS[(POSTS.indexOf(post) + 1) % POSTS.length];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${media.poster}`,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Organization", name: "Piermont Studios", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Piermont Studios",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main">
        <section className="about-hero hero-bg relative overflow-hidden">
          <div className="about-hero-inner">
            <p className="about-kicker" data-reveal>
              {post.category}
            </p>
            <div className="about-rule" data-reveal>
              <span className="about-rule-accent" />
              <span className="about-rule-rest" />
            </div>
            <h1 className="blog-post-title" data-reveal="scale">
              {post.title}
            </h1>
            <p className="blog-meta" data-reveal>
              <time>{post.date}</time>
              <span aria-hidden="true">/</span>
              <span>{post.readTime}</span>
            </p>
          </div>
        </section>

        <section className="work-media">
          <div className="work-media-inner" data-reveal="scale">
            <LazyVideo
              src={media.video!}
              poster={media.poster}
              className="work-media-img object-cover"
              style={{
                width: `min(100%, calc(80svh * ${project.width} / ${project.height}))`,
                aspectRatio: `${project.width} / ${project.height}`,
              }}
            />
          </div>
        </section>

        <article className="work-story">
          <div className="work-story-inner">
            <p className="work-intro" data-reveal>
              {post.excerpt}
            </p>
            <ol className="work-steps">
              {post.body.map((part, i) => (
                <li key={part.heading} className="work-step" data-reveal>
                  <span className="work-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="work-step-title">{part.heading}</h2>
                  <p className="work-step-body">{part.text}</p>
                </li>
              ))}
            </ol>
            <Link href={projectHref(project)} className="blog-all" data-reveal>
              Read the {project.client} case study
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <section className="work-next">
          <Link href={`/blog/${next.slug}`} className="work-next-link">
            <span className="work-next-label">Next story</span>
            <span className="work-next-name">{next.title}</span>
            <span className="work-next-service">{next.category}</span>
          </Link>
        </section>

        <section className="about-cta" data-reveal="scale">
          <div className="about-cta-inner">
            <h2 className="about-cta-heading">
              Ready to get
              <br />
              started?
            </h2>
            <Link href="/contact" className="about-cta-button">
              Start Project
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
