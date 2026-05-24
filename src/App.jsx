import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { FaInstagram, FaTiktok} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const SHOW_GALLERY = false;

const profile = {
  name: "Vinc Trades",
  slogan: "—Trading is the hardest way to make easy money.",
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

function useGalleryColumnCount() {
  const getColumnCount = () => {
    if (window.innerWidth <= 520) return 2;
    if (window.innerWidth <= 900) return 3;
    if (window.innerWidth <= 1200) return 4;
    return 5;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return columnCount;
}

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
  const columnCount = useGalleryColumnCount();

  const galleryColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => []);

    galleryImages.forEach((src, index) => {
      columns[index % columnCount].push(src);
    });

    return columns;
  }, [columnCount]);

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
      <section
        className="galleryGrid"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {galleryColumns.map((column, columnIndex) => (
          <div className="galleryColumn" key={columnIndex}>
            {column.map((src) => (
              <button
                className="galleryItem"
                type="button"
                onClick={() => setSelectedImage(src)}
                key={src}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
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