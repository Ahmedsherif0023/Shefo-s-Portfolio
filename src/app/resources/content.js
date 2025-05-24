import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Ahmed",
  lastName: "Sherif",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "React.js Developer",
  avatar: "/images/Avatar.png",
  email: "ahmedsherifoo23@gmail.com",
  location: "Egypt", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Arabic"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&#39;s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Ahmedsherif0023?tab=overview&from=2025-05-01&to=2025-05-22",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ahmedsheriif/",
  },
  {
    name: "Instagram",
    icon: "Instagram",
    link: "https://www.instagram.com/ishefo0/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,

  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Turning Your ideas alife</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Todo List | By SHEFO</strong>
      </>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I&apos;m Ahmed, a React.js developer, I build modern, interactive web apps
      using React, reusable components, and smart state management.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/ahmed-sherif-tg2x15",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Ahmed is a Egypt-based React.JS Dveleoper with a passion for
        transforming complex challenges into simple, elegant Web apps solutions.
        His work spans digital interfaces, interactive experiences, and the
        convergence of UI/Ux designs and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Freelancer",
        timeframe: "2022 - Present",
        role: "React.JS Dveleoper",
        achievements: [
          <>
            Turned lots of UI designs into fully functional web apps using
            React.js,
          </>,
          <>made fully responsive web apps using CSS and Tailwind CSS,</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/PersonalPortfolio.png",
            alt: "Personal Portfolio",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Tanta University",
        description: <>Studied Business.</>,
      },
      {
        name: "Build the Future",
        description: (
          <>Studied online marketing, personal branding and of course Coding.</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/Figmadesigns/E-commerce1.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/Figmadesigns/E-commerce2.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/PersonalPortfolio.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
