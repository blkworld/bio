import "./App.css";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const profile = {
  name: "Vincerenism",
  eyebrow: "",
  bio: "",
  avatar: "/profile.jpg",
};

const links = [
  {
    title: "Instagram",
    desc: "",
    href: "https://instagram.com/vincerenism",
    Icon: FaInstagram,
  },
  {
    title: "TikTok",
    desc: "",
    href: "https://tiktok.com/@vincerenism",
    Icon: FaTiktok,
  },
  {
    title: "Email",
    desc: "",
    href: "mailto:hello@example.com",
    Icon: MdEmail,
  },
];

export default function App() {
  return (
    <main className="page">
      <section className="card">
        <header className="hero">
          <img className="avatar" src={profile.avatar} alt={profile.name} />

          <div>
            {profile.eyebrow && <p className="eyebrow">{profile.eyebrow}</p>}
            <h1>{profile.name}</h1>
            {profile.handle && <p className="handle">{profile.handle}</p>}
            {profile.bio && <p className="bio">{profile.bio}</p>}
          </div>
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

                <span className="copy">
                  <span className="title">{link.title}</span>
                  {link.desc && <span className="desc">{link.desc}</span>}
                </span>

                <span className="arrow">↗</span>
              </a>
            );
          })}
        </nav>

        <footer>
          <span></span>
          <span>VINCERE AUT MORI</span>
        </footer>
      </section>
    </main>
  );
}