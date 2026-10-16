import Image from "next/image";
import Link from "next/link";
import { POSTS, postMedia, type Post } from "../blog/posts";
import { LazyVideo } from "./LazyVideo";

const BRANDS = [
  "diesel",
  "qatar-airways",
  "columbia",
  "heineken",
  "burberry",
  "baileys",
  "on",
  "louis-vuitton",
  "bacardi",
  "the-north-face",
  "reebok",
  "alo",
];

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="blog-meta">
      <span>{post.category}</span>
      <span aria-hidden="true">/</span>
      <time>{post.date}</time>
    </p>
  );
}

/** Featured post beside a numbered list of the latest ones. `all` also adds a grid of every post. */
export function StoriesSection({ all = false }: { all?: boolean }) {
  const [featured, ...rest] = POSTS;
  const media = postMedia(featured);

  return (
    <section id="stories" className="blog-section" aria-labelledby="stories-heading">
      <div className="blog-inner">
        <div className="blog-head" data-reveal>
          <div>
            <p className="contact-page-eyebrow">
              Blog
            </p>
            <h2 id="stories-heading" className="blog-title">
              Stories
            </h2>
          </div>
          {!all && (
            <Link href="/blog" className="blog-all">
              All posts
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>

        <div className="blog-layout">
          <article className="blog-featured" data-reveal="scale">
            <Link href={`/blog/${featured.slug}`} className="blog-featured-link">
              <div className="blog-featured-media">
                <LazyVideo
                  src={media.video!}
                  poster={media.poster}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="blog-featured-tag">Featured</span>
              </div>
              <PostMeta post={featured} />
              <h3 className="blog-featured-title">{featured.title}</h3>
              <p className="blog-excerpt">{featured.excerpt}</p>
              <span className="blog-read">{featured.readTime}</span>
            </Link>
          </article>

          <div className="blog-latest">
            <p className="blog-latest-label">Latest</p>
            <ol className="blog-list" data-reveal-stagger data-reveal>
              {rest.slice(0, 4).map((post, i) => (
                <li key={post.slug} data-reveal-child>
                  <Link href={`/blog/${post.slug}`} className="blog-row">
                    <span className="blog-row-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="blog-row-body">
                      <PostMeta post={post} />
                      <span className="blog-row-title">{post.title}</span>
                    </span>
                    <span className="blog-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {all && (
          <div className="blog-grid" data-reveal-stagger data-reveal>
            {POSTS.map((post) => {
              const m = postMedia(post);
              return (
                <article key={post.slug} className="blog-card" data-reveal-child>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    <div className="blog-card-media">
                      <LazyVideo
                        src={m.video!}
                        poster={m.poster}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <PostMeta post={post} />
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        <div className="blog-brands" data-reveal="fade">
          <p className="blog-latest-label">
            Brands who are part of our success story
          </p>
          <div className="stories-logos-marquee" aria-hidden="true">
            <div className="stories-logos-track">
              {[0, 1].map((k) => (
                <div key={k} className="blog-logos-set">
                  {BRANDS.map((name) => (
                    <Image
                      key={name}
                      src={`/brands/${name}.png`}
                      alt=""
                      width={160}
                      height={64}
                      className="blog-logo"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
