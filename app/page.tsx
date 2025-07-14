export default function Home() {
  return (
    <section className="
      text-center py-20 px-4

      bg-white text-blue-950         /* light mode */
      dark:bg-blue-950 dark:text-white   /* dark mode */
    ">
      <h1 className="text-4xl sm:text-5xl font-extrabold">
        Hi, I’m Sahran Saleem Merchant 👋
      </h1>
      <p className="mt-4 text-lg max-w-2xl mx-auto opacity-80">
        I’m a Computer Science student passionate about web apps, AI, and healthcare technology.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {['about', 'projects', 'contact'].map((slug) => (
          <a
            key={slug}
            href={`/${slug}`}
            className="
              px-6 py-3
              bg-blue-950/10 hover:bg-blue-950/20
              text-blue-950 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
              font-medium rounded-md transition
            "
          >
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </a>
        ))}
      </div>
    </section>
  );
}
