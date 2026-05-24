import "./App.css";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
    href: "mailto:mailontrading@gmail.com",
    Icon: MdEmail,
  },
];

export default function App() {
  return (
    <main className="page">
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
    </main>
  );
}