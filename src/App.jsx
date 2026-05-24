import { useEffect, useState } from "react";
import "./App.css";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const SHOW_GALLERY = true;

const profile = {
  name: "Vinc Trades",
  slogan: "Follow my other socials and stay connected.",
  avatar: "/profile.jpg",
  header: "/header.gif",
};

const links = [
  {
    title: "Instagram",
    href: "https://instagram.com/vincerenism",
    Icon: FaInstagram,
  },
  {
    title: "TikTok",
    href: "https://tiktok.com/@vincerenism",
    Icon: FaTiktok,
  },
  {
    title: "Email",
    href: "mailto:hello@example.com",
    Icon: MdEmail,
  },
];

const galleryImages = Object.entries(
  import.meta.glob("./gallery/*.{jpg,jpeg,png,webp,gif}", {
    eager: true,
    query: "?url",
    import: "default",
  })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

function HomePage() {
  return (
    <main className="page">
      <div className="homeStack">
        <section className="card">
          <div className="cover">
            <img src={profile.header} alt="" />
          </div>

          <div className="content">
            <header className="profile">
              <img className="avatar" src={profile.avatar} alt={profile.name} />
              <h1>{profile.name}</h1>
              <p className="slogan">{profile.slogan}</p>
            </header>

            <nav className="links" aria-label="Social links">
              {links.map((link) => {
                const Icon = link.Icon;

                return (
                  <a
                    className="link"
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    key={link.title}
                  >
                    <span className="tag">
                      <Icon />
                    </span>

                    <span className="title">{link.title}</span>

                    <span className="arrow">↗</span>
                  </a>
                );
              })}
            </nav>

            <footer>VINCERE AUT MORI</footer>
          </div>
        </section>

        {SHOW_GALLERY && (
          <a className="galleryTextLink" href="#gallery">
            Gallery
          </a>
        )}
      </div>
    </main>
  );
}

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <main className="galleryPage">
      <section className="galleryGrid">
        {galleryImages.map((src) => (
          <button
            className="galleryItem"
            type="button"
            onClick={() => setSelectedImage(src)}
            key={src}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </section>

      <a className="backHomeButton" href="#">
        Back to Home
      </a>

      {selectedImage && (
        <button
          className="zoomOverlay"
          type="button"
          onClick={() => setSelectedImage(null)}
          aria-label="Close image preview"
        >
          <img src={selectedImage} alt="" />
        </button>
      )}
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (page === "#gallery" && SHOW_GALLERY) {
    return <GalleryPage />;
  }

  return <HomePage />;
}