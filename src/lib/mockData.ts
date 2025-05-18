import { PortfolioData } from "./types";

export const mockPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Al Mamun Sikder",
    title: "Full Stack Developer",
    tagline: "Building modern web experiences",
    avatar: "https://i.pravatar.cc/300",
    bio: "Passionate Full Stack Developer with expertise in modern web technologies. I create efficient, scalable, and user-friendly applications that solve real-world problems.",
    resumeUrl: "https://example.com/resume.pdf",
    contactInfo: {
      email: "aalmamunsikder@gmail.com",
      phone: "+8801600086773",
      location: "Dhaka, Bangladesh",
      availableForWork: true
    },
    socialLinks: [
      {
        id: "sl1",
        platform: "GitHub",
        url: "https://github.com/aalmamunmamun",
        icon: "github"
      },
      {
        id: "sl2",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/aalmamunmamun",
        icon: "linkedin"
      },
      {
        id: "sl3",
        platform: "Twitter",
        url: "https://twitter.com/almamun",
        icon: "twitter"
      },
      {
        id: "sl4",
        platform: "WhatsApp",
        url: "https://wa.me/8801600086773",
        icon: "whatsapp"
      }
    ]
  },
  projects: [
    {
      id: "p1",
      title: "CloudPC Platform",
      description: "A full-featured cloud pc platform with payment processing, inventory management, and analytics.",
      imageUrl: "https://smartpc-new-ui.vercel.app/",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://smartpc-new-ui.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/smartpc-new-ui",
      featured: true
    },
    {
      id: "p2",
      title: "CloudPC Admin Panel",
      description: "A cloud pc admin panel for managing cloud pc users and devices.",
      imageUrl: "https://smartpc-admin-panel.vercel.app/",
      tags: ["React", "Firebase", "Material UI"],
      liveUrl: "https://smartpc-new-admin-panel.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/smartpc-new-admin-panel",
      featured: true
    },
    {
      id: "p3",
      title: "SwiftPay Nexus",
      description: "A payment gateway for mobile banking and mobile money transfer.",
      imageUrl: "https://swiftpay-nexus.vercel.app/",
      tags: ["JavaScript", "Chart.js", "Weather API"],
      liveUrl: "https://swiftpay-nexus.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/swiftpay-nexus",
      featured: false
    },
    {
      id: "p4",
      title: "Aamrash Ecommerce",
      description: "An ecommerce platform for selling products online.",
      imageUrl: "https://aamrash-ecommerce.vercel.app/",
      tags: ["Python", "TensorFlow", "React", "GPT-3"],
      liveUrl: "https://aamrash-ecommerce.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/aamrash-ecommerce",
      featured: true
    },
    {
      id: "p5",
      title: "Ice Cream Ecommerce",
      description: "An ecommerce platform for selling ice creams online.",
      imageUrl: "https://ice-cream-ecommerce.vercel.app/",
      tags: ["Next.js", "WebSockets", "Crypto API", "Tailwind"],
      liveUrl: "https://ice-cream-ecommerce.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/ice-cream-ecommerce",
      featured: true
    },
    {
      id: "p6",
      title: "Genesis NFT Gallery",
      description: "Buy, Create & Sell Unique NFTs File.",
      imageUrl: "https://genesis-nft-gallery.vercel.app/",
      tags: ["React", "WebRTC", "Socket.io", "AWS"],
      liveUrl: "https://genesis-nft-gallery.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/genesis-nft-gallery",
      featured: true
    },
    {
      id: "p7",
      title: "Panel Perfect Clone",
      description: "A clone of Panel Perfect, a platform for creating and managing panels for market research.",
      imageUrl: "https://panel-perfect-clone.vercel.app/",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://panel-perfect-clone.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/panel-perfect-clone",
      featured: true
    },
    {
      id: "p8",
      title: "NexusChat",
      description: "A chat application for connecting people with similar interests.",
      imageUrl: "https://nexuschat-two.vercel.app/",
      tags: ["Vue.js", "MQTT", "Node.js", "IoT"],
      liveUrl: "https://nexuschat-two.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/nexuschat-two",
      featured: true
    },
    {
      id: "p9",
      title: "Vibely Dating Website",
      description: "A dating website for connecting people with similar interests.",
      imageUrl: "https://vibely-dating-website.vercel.app/",
      tags: ["Angular", "TensorFlow.js", "MongoDB", "i18n"],
      liveUrl: "https://vibely-dating-website.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/vibely-dating-website",
      featured: true
    },
    {
      id: "p10",
      title: "Baraka Space",
      description: "A space for connecting people with similar interests.",
      imageUrl: "https://baraka-space.vercel.app/",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://baraka-space.vercel.app/",
      githubUrl: "https://github.com/aalmamunmamun/baraka-space",
      featured: true
    }
  ],
  skills: [
    // Frontend Skills
    {
      id: "s1",
      name: "React",
      icon: "react",
      level: 95,
      category: "Frontend"
    },
    {
      id: "s2",
      name: "Next.js",
      icon: "nextjs",
      level: 90,
      category: "Frontend"
    },
    {
      id: "s3",
      name: "JavaScript",
      icon: "javascript",
      level: 95,
      category: "Frontend"
    },
    {
      id: "s4",
      name: "TypeScript",
      icon: "typescript",
      level: 90,
      category: "Frontend"
    },
    {
      id: "s5",
      name: "HTML5/CSS3",
      icon: "html",
      level: 95,
      category: "Frontend"
    },
    {
      id: "s6",
      name: "Tailwind CSS",
      icon: "tailwind",
      level: 90,
      category: "Frontend"
    },
    {
      id: "s7",
      name: "Redux",
      icon: "redux",
      level: 85,
      category: "Frontend"
    },
    {
      id: "s8",
      name: "Framer Motion",
      icon: "framer",
      level: 80,
      category: "Frontend"
    },

    // Backend Skills
    {
      id: "s9",
      name: "Node.js",
      icon: "nodejs",
      level: 90,
      category: "Backend"
    },
    {
      id: "s10",
      name: "Express",
      icon: "express",
      level: 85,
      category: "Backend"
    },
    {
      id: "s11",
      name: "Python",
      icon: "python",
      level: 80,
      category: "Backend"
    },
    {
      id: "s12",
      name: "Django",
      icon: "django",
      level: 75,
      category: "Backend"
    },
    {
      id: "s13",
      name: "GraphQL",
      icon: "graphql",
      level: 85,
      category: "Backend"
    },
    {
      id: "s14",
      name: "REST API",
      icon: "api",
      level: 90,
      category: "Backend"
    },

    // Database Skills
    {
      id: "s15",
      name: "MongoDB",
      icon: "mongodb",
      level: 90,
      category: "Database"
    },
    {
      id: "s16",
      name: "PostgreSQL",
      icon: "postgresql",
      level: 85,
      category: "Database"
    },
    {
      id: "s17",
      name: "MySQL",
      icon: "mysql",
      level: 80,
      category: "Database"
    },
    {
      id: "s18",
      name: "Firebase",
      icon: "firebase",
      level: 85,
      category: "Database"
    },

    // DevOps Skills
    {
      id: "s19",
      name: "Docker",
      icon: "docker",
      level: 80,
      category: "DevOps"
    },
    {
      id: "s20",
      name: "AWS",
      icon: "aws",
      level: 75,
      category: "DevOps"
    },
    {
      id: "s21",
      name: "CI/CD",
      icon: "cicd",
      level: 75,
      category: "DevOps"
    },
    {
      id: "s22",
      name: "Git",
      icon: "git",
      level: 90,
      category: "DevOps"
    },

    // Mobile Skills
    {
      id: "s23",
      name: "React Native",
      icon: "reactnative",
      level: 80,
      category: "Mobile"
    },
    {
      id: "s24",
      name: "Flutter",
      icon: "flutter",
      level: 70,
      category: "Mobile"
    },
    {
      id: "s25",
      name: "Responsive Design",
      icon: "responsive",
      level: 95,
      category: "Mobile"
    },

    // Design Skills
    {
      id: "s26",
      name: "Figma",
      icon: "figma",
      level: 85,
      category: "Design"
    },
    {
      id: "s27",
      name: "Adobe XD",
      icon: "adobexd",
      level: 75,
      category: "Design"
    },
    {
      id: "s28",
      name: "UI/UX Design",
      icon: "uiux",
      level: 80,
      category: "Design"
    }
  ],
  experiences: [
    {
      id: "e1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "2021-03-01",
      endDate: "2023-08-15",
      description: "Led the frontend development team in designing and implementing user interfaces for enterprise applications. Improved performance by 40% and introduced component-based architecture.",
      technologies: ["React", "TypeScript", "Redux", "Material UI"],
      current: false
    },
    {
      id: "e2",
      jobTitle: "Full Stack Developer",
      company: "Digital Solutions",
      location: "Austin, TX",
      startDate: "2018-06-01",
      endDate: "2021-02-28",
      description: "Developed and maintained multiple web applications for clients in various industries. Worked on both frontend and backend components of applications.",
      technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
      current: false
    },
    {
      id: "e3",
      jobTitle: "Junior Web Developer",
      company: "WebCreate Agency",
      location: "Seattle, WA",
      startDate: "2016-09-01",
      endDate: "2018-05-30",
      description: "Assisted in the development of websites and web applications for clients. Learned and applied best practices in web development.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
      current: false
    }
  ],
  education: [
    {
      id: "ed1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2012-09-01",
      endDate: "2016-05-30",
      location: "Berkeley, CA",
      description: "Studied computer science with a focus on software engineering and web development. Participated in multiple hackathons and coding competitions.",
      current: false,
      achievements: [
        "Dean's List 2013-2016",
        "1st place in University Hackathon 2015",
        "Computer Science Student Association Vice President"
      ]
    },
    {
      id: "ed2",
      institution: "Coding Bootcamp",
      degree: "Certificate",
      fieldOfStudy: "Full Stack Web Development",
      startDate: "2016-06-01",
      endDate: "2016-08-30",
      location: "San Francisco, CA",
      description: "Intensive 12-week program covering modern web development technologies and best practices.",
      current: false,
      achievements: [
        "Developed a full-featured web application as capstone project",
        "Recognized for Best UI/UX Design"
      ]
    }
  ]
}; 