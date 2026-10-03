export const portfolioData = {
  siteName: "MyPortofolio",

  profile: {
    name: "Achmad Nobe Anta Ananda",
    role: "FRONTEND DEVELOPER & UI BUILDER",
    tagline:
      "Saya membangun antarmuka web yang bersih, responsif, dan interaktif menggunakan React, Tailwind CSS, dan alur kerja modern.",
    status: "Learning & building",
    email: "nobedes32@gmail.com",
    whatsapp: "+62 822-4128-8336",
    whatsappAlt: "+62 819-1469-7372",
    socials: {
      github: "https://github.com/Nobecuy",
      linkedin: "https://www.linkedin.com/in/ananda-nobe-4871123b3",
      emailLink: "mailto:nobedes32@gmail.com",
      whatsappLink: "https://wa.me/6281914697372",
      whatsappLinkAlt: "https://wa.me/6282241288336",
    },
  },

  about: {
    bio: [
      "Saya membangun antarmuka web yang bersih, responsif, dan interaktif menggunakan React, Tailwind CSS, dan alur kerja modern."
    ],
    focus:
      "Saat ini fokus pada web development dan integrasi AI, menggunakan alur kerja berbasis AI untuk membangun solusi kustom.",
    philosophy:
      "Progress over perfection. Setiap project — berhasil maupun gagal — adalah catatan pertumbuhan. Saya di sini untuk belajar, membangun, dan berkontribusi.",
    whatIDo: [
      {
        title: "Web Interface Development",
        description:
          "Mengubah desain menjadi halaman web responsif yang bisa diakses di berbagai device.",
      },
      {
        title: "Component-based UI",
        description: "Belajar membangun UI modular dan reusable dengan React.",
      },
      {
        title: "Styling & Layout Systems",
        description:
          "Transisi dari Bootstrap yang familiar menuju Tailwind CSS yang lebih fleksibel.",
      },
    ],
    skills: [
      { name: "HTML & CSS", level: "comfortable", percent: 75 },
      { name: "JavaScript", level: "functional", percent: 65 },
      { name: "Bootstrap", level: "familiar", percent: 80 },
      { name: "React", level: "beginner", percent: 40 },
      { name: "Tailwind CSS", level: "beginner", percent: 40 },
      { name: "Git & GitHub", level: "basic", percent: 50 },
      { name: "Tools", level: "comfortable", percent: 70 },
    ],
    levelLabels: {
      comfortable: "Comfortable",
      functional: "Functional",
      familiar: "Familiar",
      beginner: "Beginner",
      basic: "Basic",
    },
    levelDescriptions: {
      comfortable:
        "Bisa ngoding mandiri, tahu best practice dasar, masih googling tapi jarang stuck di syntax.",
      functional:
        "Logika beres, DOM manipulation lancar, ES6+ tahu arrow function, destructuring, async/await.",
      familiar:
        "Pernah pakai intensif, tahu grid system, komponen, utilities Bootstrap.",
      beginner:
        "Baru beberapa project, masih sering lihat docs, paham konsep dasar (component, props, hooks).",
      basic:
        "Commit, push, pull, branch dasar. Belum advanced (rebase, conflict complex).",
    },
  },

  learning: {
    currentlyLearning: [
      {
        topic: "React",
        items: [
          "Hooks (useState, useEffect)",
          "Component composition",
          "React Router",
        ],
      },
      {
        topic: "Tailwind CSS",
        items: [
          "Utility-first workflow",
          "Responsive design",
          "Dark mode & custom config",
        ],
      },
      {
        topic: "JavaScript Deep Dive",
        items: ["Async programming", "Fetch API", "Modular code"],
      },
    ],
    nextGoals: ["Blazor", ".Net", "Database (PostgreSQL / MongoDB)"],
  },

  projects: [
    {
      id: 0,
      slug: "perspective-architect",
      title: "Perspective Architect",
      description:
        "Website portofolio arsitektur & interior — galeri proyek, showcase, dan alur kontak.",
      tags: ["React", "Vite", "Tailwind"],
      image: "/perspective_architect.png",
      github: "#",
      demo: "https://perspective-architect-web-chi.vercel.app/",
      featured: true,
      year: "2026",
      badges: [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],
    },

    {
      id: 1,
      slug: "KnitHouse",
      title: "KnitHouse",
      description:
        "Website portofolio KnitHouse - galeri, about, dan alur kontak.",
      tags: ["React", "Vite", "Tailwind"],
      image: "/Mock1.jpg",
      github: "#",
      demo: "https://knit-house.vercel.app/",
      featured: true,
      year: "2026",
      badges:  [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],  
    },

    {
      id: 2,
      slug: "voyage-luxe",
      title: "Voyage Luxe",
      description:
        "Landing page travel premium dengan desain elegant — hero section, destinations, dan booking experience.",
      tags: ["React", "Vite", "Tailwind", "GSAP"],
      image: "/Mock2.jpg",
      github: "#",
      demo: "https://web-travel-kappa.vercel.app/",
      featured: true,
      year: "2026",
      badges:  [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],
    },

    {
      id: 3,
      slug: "lumina-studio",
      title: "Lumina Studio",
      description:
        "Landing page Photo Studio premium dengan desain elegant — hero section, pricelist, contact, dan booking experience.",
      tags: ["React", "Vite", "Tailwind", "GSAP"],
      image: "/Mock4.jpg",
      github: "#",
      demo: "https://lumina-studio-neon.vercel.app/",
      featured: true,
      year: "2026",
      badges:  [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],
    },
    {
      id: 4,
      slug: "Kroma",
      title: "Kroma Cafe",
      description:
        "Landing page Cafe dengan desain elegant — hero section, pricelist, contact, dan ambience.",
      tags: ["React", "Vite", "Tailwind"],
      image: "/cafe.png",
      github: "#",
      demo: "https://cafe-example-mu.vercel.app/",
      featured: true,
      year: "2026",
      badges: [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],
    },
    {
      id: 5,
      slug: "Atelier",
      title: "Atelier Studio",
      description:
        "Landing page Studio dengan desain elegant — hero section, services, pricelist, contact, dan studio assets.",
      tags: ["React", "Vite", "Tailwind"],
      image: "/PremiumCafe.png",
      github: "#",
      demo: "https://cafe-example-premium.vercel.app/",
      featured: true,
      year: "2026",
      badges: [
        { text: "AI-Assisted Build", type: "ai" },
        { text: "Rapid Prototype", type: "speed" }
      ],
    },
  ],
};