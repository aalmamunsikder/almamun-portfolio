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
      email: "almamun.sikder@example.com",
      phone: "+8801234567890",
      location: "Dhaka, Bangladesh",
      availableForWork: true
    },
    socialLinks: [
      {
        id: "sl1",
        platform: "GitHub",
        url: "https://github.com/almamun",
        icon: "github"
      },
      {
        id: "sl2",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/almamun",
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
        url: "https://wa.me/8801234567890",
        icon: "whatsapp"
      }
    ]
  },
  projects: [
    {
      id: "p1",
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with payment processing, inventory management, and analytics.",
      imageUrl: "https://picsum.photos/800/600?random=1",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://ecommerce-demo.example.com",
      githubUrl: "https://github.com/alexchen/ecommerce",
      featured: true
    },
    {
      id: "p2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      imageUrl: "https://picsum.photos/800/600?random=2",
      tags: ["React", "Firebase", "Material UI"],
      liveUrl: "https://taskapp.example.com",
      githubUrl: "https://github.com/alexchen/taskapp",
      featured: true
    },
    {
      id: "p3",
      title: "Weather Dashboard",
      description: "A weather dashboard that displays forecast data and historical trends.",
      imageUrl: "https://picsum.photos/800/600?random=3",
      tags: ["JavaScript", "Chart.js", "Weather API"],
      liveUrl: "https://weather.example.com",
      githubUrl: "https://github.com/alexchen/weather",
      featured: false
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