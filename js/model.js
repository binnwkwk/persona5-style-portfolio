/* =====================================================================
   MODEL — portfolio content and state. Edit this file to update the site.
   ===================================================================== */

const Model = {
  githubUser: "binnwkwk",
  contactEmail: "abingnteng888@gmail.com",

  state: {
    screen: "home",
    menuIndex: 0,
    reposLoaded: false,
    skillsBuilt: false,
  },

  // Featured portfolio projects. Replace links with exact project repositories
  // when you have their final URLs.
  featured: [
    {
      title: "WhatsApp Bot",
      tag: "BOT DEVELOPMENT",
      color: "#3dff6e",
      url: "https://github.com/binnwkwk",
      cta: "Explore GitHub →",
      img: "assets/projects/whatsapp-bot.png",
      desc: "A WhatsApp bot project focused on useful commands, automation, and a clean chat experience. Visit my GitHub profile for the current source code and project details.",
    },
    {
      title: "Telegram Userbot",
      tag: "AUTOMATION",
      color: "#29a9eb",
      url: "https://github.com/binnwkwk",
      cta: "Explore GitHub →",
      img: "assets/projects/telegram-userbot.png",
      desc: "A Telegram userbot project with utility-focused commands and modular features. More details and source code are available through my GitHub profile.",
    },
    {
      title: "Web Projects",
      tag: "WEB DEVELOPMENT",
      color: "#e60012",
      url: "https://github.com/binnwkwk/persona5-style-portfolio",
      cta: "View portfolio repo →",
      img: "assets/projects/web-projects.png",
      desc: "Web experiments and portfolio projects built to explore interface design, front-end development, and interactive user experiences.",
    },
  ],

  // The featured cards above are general portfolio categories rather than
  // specific repository names, so do not hide any repositories from the feed.
  featuredRepoNames: [],

  fallbackRepos: [],
  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    PHP: "#4F5D95",
    CSS: "#663399",
    HTML: "#e34c26",
    Java: "#b07219",
    "C++": "#f34b7d",
  },

  // Skill-bar values are visual self-ratings; adjust them to match your
  // current experience. Remove any technology you do not use.
  skills: [
    {
      group: "Web Development",
      items: [
        ["HTML", 75],
        ["CSS", 70],
        ["JavaScript", 70],
        ["Responsive UI", 65],
      ],
    },
    {
      group: "Bot Development",
      items: [
        ["Node.js", 70],
        ["WhatsApp Bot Development", 75],
        ["Telegram Bot / Userbot", 70],
        ["API Integration", 65],
      ],
    },
    {
      group: "Tools & Workflow",
      items: [
        ["Git & GitHub", 65],
        ["JSON & Configuration", 70],
        ["Debugging", 65],
      ],
    },
  ],

  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(
        r => !r.fork && !skip.has(r.name)
      );
      return { repos, live: true };
    } catch {
      return {
        repos: this.fallbackRepos.filter(r => !skip.has(r.name)),
        live: false,
      };
    }
  },
};
