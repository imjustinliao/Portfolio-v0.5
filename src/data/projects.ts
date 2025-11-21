import type { ProjectData } from '../components/ProjectCard'

// DATA INSTRUCTIONS:
// 1. To ADD a new project: Copy one of the objects inside the [] (between { ... }) and paste it.
// 2. To EDIT a project: Change the values (strings inside "...") for name, description, etc.
// 3. To DELETE a project: Remove the entire object { ... } and the comma after it.
// 4. The 'id' must be unique (e.g. 'high-delta-1', 'high-delta-2').
// 5. Images and GIFs should be in the 'public' folder (e.g. /UI/image.jpg).

export const projects: Record<number, ProjectData[]> = {
  // Category 0: Leadership
  0: [
    {
      id: 'high-delta-1',
      name: 'Reunify Labs',
      description: 'An AI stealth lab I co-founded to explore AI-native ideas that redefines how people experience technology and life. Here’s our thesis: life is about experience, filled with endless possibilities. Whether it’s regarded as positive or negative, the delta must be intense enough to transcend human exploration. Current team: me, Thomas Suen, & Manish Ram.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG', // Replace with actual GIF path when available
      links: [
        { text: 'Official Website', url: 'https://reunifylabs.com' },
        { text: 'Twitter', url: 'https://x.com/reunifylabs' },
      ],
      timeline: '9.25.25 - Present',
      location: 'TBA',
      role: 'Co-Founder & C#O',
      deltaScore: 98
    },
    {
      id: 'high-delta-2',
      name: 'Launchpad S25',
      description: 'Launchpad S25 was UWB’s first student-run startup incubator, a five-week program where students turned their crazy ideas into realities. I was responsible of finding program mentors and guest speakers, team coordination (eg. recording team interviews, room decoration, marketing), and structuring the weekly agenda and demo day logistics. We brought together 50 students or 20 teams throughout the program, eventually pitching on Demo Day with 120 attendees, including VC / investors and Ehud Halberstam (Chordio, YC S22).',
      image: '/UI/i2.JPG',
      gif: '/UI/i2.JPG',
      links: [
        { text: 'Website', url: 'https://www.uwinnovators.com/demo-day.html' },
        { text: 'Trailer', url: 'https://youtu.be/BGR0M8OaaL8?si=Pck6Nq-ltvE_3T-r' },
        { text: 'Pre-Interview', url: 'https://www.instagram.com/reel/DKIMjxuB5lj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { text: 'Post', url: 'https://www.instagram.com/p/DJHrbYMvqFl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
      ],
      timeline: '4.14.25 - 6.3.25',
      location: 'Bothell, WA',
      role: 'Founder & Organizer',
      deltaScore: 40
    },
    {
      id: 'high-delta-3',
      name: 'UWB Innovators Hub',
      description: 'I co-founded UWB Innovators Hub as an extension of my Bellevue College chapter and grew it to 200+ members in four months at a commuter campus (UW Bothell). I shaped the club’s vision, coordinated with my team on plans, scaled our social media, and organized company tours at T-Mobile Innovation, Expedia, Valve, Google, and Microsoft. We also launched the first UWB startup incubator and co-hosted UWB Hacks 25 with ACM. I treated the club as building a great product, which I mentored and provided critical feedback to my team on event planning, brand design, and improvement across all domains.',
      image: '/UI/i3.JPG',
      gif: '/UI/i3.JPG',
      links: [
        { text: 'Official Website', url: 'https://uwinnovators.com' },
        { text: 'LinkedIn', url: 'https://linkedin.com/company/innovators-hub-incubator/' },
        { text: 'Instagram', url: 'https://www.instagram.com/uwb_innovatorshub/' },
        { text: 'Discord', url: 'https://discord.gg/4nx2TmENhQ' }
      ],
      timeline: 'October 2024 - Present',
      location: 'Bothell, WA',
      role: 'Founder & Co-President',
      deltaScore: 42
    },
    {
      id: 'high-delta-4',
      name: 'UWB ACM',
      description: 'I was recruited as a core officer to support general events and an annual Hackathon. For UWB Hacks 25, I co-led the sponsorship team to recruit industry professional judges, meeting with companies and reaching out to hundreds of engineers, designers, and founders to bring in 100+ judges. The event had 500+ participants, which was one of the largest hackathons ever held at UWB.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Official Website', url: 'https://uwbacm.org/' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/company/uwb-acm-club/' },
        { text: 'Instagram', url: 'https://www.instagram.com/uwb_acm/' }, 
        { text: 'DevPost', url: 'https://uwb-hacks-save-the-world.devpost.com/' },
        { text: 'Discord', url: 'https://discord.com/invite/DzWEhESsZw' }
      ],
      timeline: 'September 2024 - June 2025',
      location: 'Bothell, WA',
      role: 'Core Officer',
      deltaScore: 20
    }, 
    {
      id: 'high-delta-5',
      name: 'BC Hacks 24',
      description: 'I worked alongside leaders from four tech clubs to run BC Hacks 2024, a six-month effort that combined planning, funding (over $20k), logistics, and design. I drafted the full event schedule, designed the website and Devpost, and helped shape the judging system while coordinating with sponsors and mentors. During the hackathon, I mentored 50+ students on their pitch decks and presentations, contributing to one of BC’s most successful hackathons.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'DevPost', url: 'https://bc-hacks-2024.devpost.com/' },
        { text: 'Website', url: 'https://bchacks.dev/' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_hackathon-mentorship-bchacks2024-activity-7206344308491264001-jgRh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' }
      ],
      timeline: '6.8.24 - 6.9.24',
      location: 'Bellevue, WA',
      role: 'Co-Organizer',
      deltaScore: 35
    },
    {
      id: 'high-delta-6',
      name: 'AI Entrepreneurial & Networking Event',
      description: 'I designed and hosted a two-hour AI entrepreneurship event featuring YC founders Ehud Halberstam and Prem Kumar, along with 5 special guests from Microsoft. I produced a cinematic trailer, created the full event flow, wrote an intro speech and questions during the panel, and managed marketing & team logistics, which helped attract 142 attendees with high engagement from start to end. It became the highest retention tech event at Bellevue College.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Recording', url: 'https://youtu.be/LVSiIHz8T_s' },
        { text: 'Trailer', url: 'https://youtu.be/Ftus4xyXoPw' },
        { text: 'Timelapse', url: 'https://youtu.be/NbJrGhYjnOI' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_ai-entrepreneurs-innovation-activity-7203806463272574976-ZlWI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' }
      ],
      timeline: '5.31.24',
      location: 'Bellevue, WA',
      role: 'Lead Organizer',
      deltaScore: 38
    },
    {
      id: 'high-delta-7',
      name: 'Bellevue College ASC',
      description: 'This was the first-ever job that I had in my life. I worked as a college math tutor specializing in calculus, linear algebra, and differential equations. On average, I helped 10+ students weekly to solve homework problems with clear, simple explanations. I learned to engage with students of all levels and backgrounds, which enhances my communication on team leadership.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Website', url: 'https://www.bellevuecollege.edu/asc/math-lab/' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_mathtutor-newjob-computerscience-activity-7150271172020981761-FXrO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' }
      ],
      timeline: '1.1.24 - 6.20.24',
      location: 'Bellevue, WA',
      role: 'Math Tutor',
      deltaScore: 25
    }, 
    {
      id: 'high-delta-8',
      name: 'BC Tech Startup Club (aka. Innovators Hub)',
      description: 'I founded Tech Startup Club to build a community of innovators myself, focusing on tech entrepreneurship for students in STEM. I led weekly meetings, designed our brand, recruited new leadership, managed the Discord community, and organized events like a Python ML workshop, private tours with ACM, and the AI Entrepreneurial & Networking Event. The club reached 200 members in a year, and we collaborated with BC Hacks 24 while developing our own “Party App - BAM!” concept through UI design, database planning, and market research.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Official Website', url: 'https://www.innovatorshub.us/' },
        { text: 'Instagram', url: 'https://www.instagram.com/bc_innovatorshub/' },
        { text: 'Project BAM!', url: 'https://imjustinliao.github.io/portfolio/subpages/bc_innovatorshub.html' }
      ],
      timeline: 'July 2023 - August 2024',
      location: 'Bellevue, WA',
      role: 'Founder & President',
      deltaScore: 33
    },
    {
      id: 'high-delta-9',
      name: 'BC ACM',
      description: 'I joined the Bellevue College ACM leadership team to support a growing community of builders. I mentored a small group of students in front-end development, helped run industry panels / workshops, and worked with the team to organize private company visits (eg. Expedia, Amazon, Microsoft). Our club reached 400+ active members within a year, becoming the largest tech club on campus.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Official Website', url: 'https://www.bellevuecollegeacm.org/' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/company/acm-bellevue-college/' },
        { text: 'Instagram', url: 'https://www.instagram.com/acm_bellevuecollege/' },
        { text: 'Discord', url: 'https://discord.gg/7Bs68SEEhp' },
        { text: 'Centific Tour', url: 'https://www.instagram.com/p/C02juIfPD8w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
      ],
      timeline: 'July 2023 - June 2024',
      location: 'Bellevue, WA',
      role: 'Co-Vice President',
      deltaScore: 28
    }
  ],

  // Category 1: Intuitive Arts
  1: [
    {
      id: 'art-1',
      name: 'Digital Canvas',
      description: 'An exploration of generative art using p5.js and WebGL.',
      image: '/UI/i2.JPG',
      gif: '/UI/i2.JPG',
      links: [
        { text: 'View Gallery', url: '#' }
      ],
      timeline: 'Ongoing',
      location: 'Studio',
      role: 'Artist',
      deltaScore: 90
    }
  ],

  // Category 2: Technical Projects
  2: [
    {
      id: 'tech-1',
      name: 'System Core',
      description: 'Low-level optimization engine for high-frequency data processing.',
      image: '/UI/i3.JPG',
      gif: '/UI/i3.JPG',
      links: [
        { text: 'GitHub', url: '#' }
      ],
      timeline: '2024',
      location: 'Lab',
      role: 'Engineer',
      deltaScore: 87
    }
  ],

  // Category 3: Content Creation
  3: [
    {
      id: 'content-1',
      name: 'Design Thoughts',
      description: 'A video essay series dissecting modern UI/UX trends.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Watch', url: '#' }
      ],
      timeline: '2025',
      location: 'YouTube',
      role: 'Creator',
      deltaScore: 82
    }
  ]
}
