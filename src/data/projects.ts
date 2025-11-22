import type { ProjectData } from '../components/ProjectCard'

// DATA INSTRUCTIONS:
// 1. To ADD a new project: Copy one of the objects inside the [] (between { ... }) and paste it.
// 2. To EDIT a project: Change the values (strings inside "...") for name, description, etc.
// 3. To DELETE a project: Remove the entire object { ... } and the comma after it.
// 4. The 'id' must be unique (e.g. 'high-delta-1', 'high-delta-2').
// 5. Images should be in the 'public' folder (e.g. /UI/image.jpg) or hosted on Cloudflare R2.
// 6. SLIDESHOW: Add 'slideshow: ["url1.jpg", "url2.jpg", ...]' for auto-cycling photos on hover.
//    - Photos cycle every 1.5 seconds with smooth fade transitions
//    - Can be a single image: slideshow: ['image.jpg']
//    - Or multiple images for auto-cycling animation

export const projects: Record<number, ProjectData[]> = {
  // Category 0: Leadership
  0: [
    {
      id: 'high-delta-1',
      name: 'Reunify Labs',
      description: 'An AI stealth lab I co-founded to explore AI-native ideas that redefines how people experience technology and life. Here’s our thesis: life is about experience, filled with endless possibilities. Whether it’s regarded as positive or negative, the delta must be intense enough to transcend human exploration. Current team: me, Thomas Suen, & Manish Ram.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stealth.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/shown.png'],
      links: [
        { text: 'Official Website', url: 'https://reunifylabs.com' },
        { text: 'Twitter', url: 'https://x.com/reunifylabs' },
      ],
      timeline: '9.25.25 - Present',
      location: 'TBA',
      role: 'Co-Founder & C#O',
      deltaScore: '∞'
    },
    {
      id: 'tech-2',
      name: 'DubMatch Official',
      description: 'DubMatch is a college-only dating app my capstone teammate Andriy and I are building, inspired by what I learned from launching VibeChk — basically VibeChk 2.0, but redesigned for dating and college life. I designed and launched our website, helped grow early signups, and I’m responsible for the product vision, front-end development, and distribution. The app focuses on meeting in person first instead of endless texting, using personalized matching and real-time campus cues to make meetups feel natural and spontaneous. We’re preparing to launch on iOS for Valentine’s Day 2026, bringing back a simple, fun way for students to connect in real life.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/dubmatch.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/dubmatch%202.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/dubmatch%201.png'],
      links: [
        { text: 'Official Website', url: 'https://dubmatch.com/' },
        { text: 'Instagram', url: 'https://www.instagram.com/dubmatch25/' },
        { text: 'TikTok', url: 'https://www.tiktok.com/@dubmatch25' },
        { text: 'Prototype', url: 'https://www.figma.com/design/m50V6Hlxk3bKwDOwDQOw1a/DubMatch?node-id=0-1&t=6P8TPQrrmq4w7BMR-1' }
      ],
      timeline: '10.10.25 - Present',
      location: 'Bothell, WA',
      role: 'Co-founder & Lead',
      deltaScore: 45
    },
    {
      id: 'VibeChk Official',
      name: 'VibeChk Official',
      description: 'I co-founded VibeChk, a location-based social app that helps people meet in real life through creator discovery and coffee chat invites. I designed the entire UI in Figma, coded the front end in Swift, designed the brand through organic UGC, and handled all customer problems while Thomas focused on backend development. We launched on the App Store, grew to 100+ downloads globally, and secured 50+ early waitlist signups through videos and a simple web landing page I built. It was our first fully launched project, giving me real-world experience in prototyping, distribution, product launch, iteration, user interviews, and shipping under tight deadlines. Along the way, I started to grow my personal branding on X, LinkedIn, and Instagram through UGCs.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%202.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%203.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%204.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%205.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%206.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%207.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%208.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%209.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%2010.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibeA1.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibeA2.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibeA3.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibeA4.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%20main%2011.jpeg'],
      links: [
        { text: 'Official Website', url: 'https://vibechk.io/' },
        { text: 'App Store', url: 'https://apps.apple.com/us/app/vibechk/id6748249688' },
        { text: 'Instagram', url: 'https://www.instagram.com/vibechkofficial/' },
        { text: 'Twitter', url: 'https://x.com/VibeChkApp' },
        { text: 'Prototype', url: 'https://www.figma.com/design/Nn03qPBuzJpY1aiDcmo7K5/Other-Work?node-id=0-1&p=f&t=t0mB7ZoixFzjjVBR-0' }
      ],
      timeline: '5.30.25 - 9.17.25',
      location: 'Bothell, WA',
      role: 'Co-founder & CEO',
      deltaScore: 48
    },
    {
      id: 'high-delta-2',
      name: 'Launchpad S25',
      description: 'Launchpad S25 was UWB’s first student-run startup incubator, a five-week program where students turned their crazy ideas into realities. I was responsible of finding program mentors and guest speakers, team coordination (eg. recording team interviews, room decoration, marketing), and structuring the weekly agenda and demo day logistics. We brought together 50 students or 20 teams throughout the program, eventually pitching on Demo Day with 120 attendees, including VC / investors and Ehud Halberstam (Chordio, YC S22).',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp.jpeg',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%201.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%202.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%203.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%204.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%205.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%206.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%207.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%208.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%209.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2010.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2012.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2013.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2014.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2015.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2016.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2017.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2018.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2019.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2020.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/lp%2021.JPEG'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno2.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno3.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno4.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno5.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno6.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno7.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno8.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno9.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno10.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno11.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno%2014.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno%2015.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno%2016.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno%2017.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno12.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/inno13.jpg'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%202.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%203.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%204.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%205.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%206.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%207.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%208.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm%209.png'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%202.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%203.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%204.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%205.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%206.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%207.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%208.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/bch%209.JPG'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie.jpeg',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie2.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie3.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie5.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/aie8.jpeg'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/math.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/math.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/math%202.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/math%203.JPG'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc2.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc3.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc4.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc5.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc6.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc7.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc8.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc17.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc9.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc10.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc11.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc12.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc13.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc14.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc15.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc16.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc18.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tsc19.JPG'],
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
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/acm.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc2.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc3.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc4.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc5.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc6.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc7.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc8.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc9.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc10.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc11.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc12.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc13.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc14.PNG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc15.jpeg'],
      links: [
        { text: 'Official Website', url: 'https://www.bellevuecollegeacm.org/' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/company/acm-bellevue-college/' },
        { text: 'Instagram', url: 'https://www.instagram.com/acm_bellevuecollege/' },
        { text: 'Discord', url: 'https://discord.gg/7Bs68SEEhp' },
        { text: 'Post', url: 'https://www.instagram.com/p/C02juIfPD8w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
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
      slideshow: ['/UI/i2.JPG'],
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
      name: 'Portofolio Website - v0.5',
      description: 'This is the site you\'re on right now. I designed everything - from the menu and mute / unmute icon, logos, and layout to the glowing flow animations, music player, and custom square cursor effect. I used liquid-glass UI elements throughout the footer and nav bar, along with interactive motion and subtle lighting to create a modern, expressive vibe. It\'s still an evolving project, but v0.5 represents my first step toward building a truly AI-native personal site (for v1).',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/web1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/web1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/web0.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/web2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/web3.png'],
      links: [
        { text: 'Live Site', url: 'https://justinliao.me/' },
        { text: 'GitHub', url: 'https://github.com/imjustinliao/Portfolio-v0.5' },
        { text: 'Prototype', url: 'https://www.figma.com/proto/7HZt1aXQl4FfILlwF6qQ8V/Side-Projects?page-id=0%3A1&node-id=2070-1559&viewport=22129%2C21298%2C0.17&t=KjUgh41cMKPMT62U-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1834%3A1551&show-proto-sidebar=1' }
      ],
      timeline: '11.16.25 - 11.20.25',
      location: 'Localhost: justinliao',
      role: 'Designer & Engineer',
      deltaScore: 55
    },
    {
      id: 'tech-2',
      name: 'VolunTier App',
      description: 'I designed VolunTier, a mobile app that helps students find volunteer opportunities aligned with their skills and goals. I led the Figma UI design across three iterations and co-developed the web app with Thomas while also launching the website to promote beta signups. The app introduces badges, impact tracking, and certificate issuance to make volunteering more fun and accessible for both students and organizers. It was my first time designing a multi-state social project with two user groups (volunteers and organizers), and it taught me how to structure complex flows into a simple, intuitive experience.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vol8.png'],
      links: [
        { text: 'Official Website', url: 'https://volun-tier.com/' },
        { text: 'Prototype', url: 'https://www.figma.com/proto/A6DiJGu5UNDpXKFgrT6oBM/VolunTier?page-id=0%3A1&node-id=4601-1349&p=f&viewport=103155%2C90978%2C0.83&t=8xjwLgCmoBLleuP2-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4601%3A1349&show-proto-sidebar=1' },
      ],
      timeline: 'March 2025 - May 2025',
      location: 'Figma: justinliao',
      role: 'UI Designer',
      deltaScore: 28
    },
    {
      id: 'tech-3',
      name: 'UWB Innovators Hub Website - v0',
      description: 'A website I designed and co-developed for the UWB Innovators Hub. The site serves as a platform for students to connect, collaborate, and innovate. It features sections for events, resources, and member profiles. It is responsive on all devices; this project helped me enhance my web development skills and understand the importance of user experience in design.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/innoweb.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/innoweb.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/innoweb2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/innoweb3.png'],
      links: [
        { text: 'Prototype', url: 'https://www.canva.com/design/DAGZ-3c3KJs/WC4BioaIsnv9Ls016kXRoA/edit?utm_content=DAGZ-3c3KJs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' }
      ],
      timeline: '1.1.25 - 4.5.25',
      location: 'Canva x Figma: justinliao',
      role: 'Lead Designer',
      deltaScore: 18
    },
    {
      id: 'tech-4',
      name: 'Desktop Organizing Script',
      description: 'I built this Python script to keep my desktop clean by automatically organizing files from the Downloads folder into categorized folders on my Desktop. Using the watchdog library, the script monitors Downloads for new files and instantly sorts them into folders based on type, such as Images, Videos, Documents...etc. It’s a continuous process that runs in the background, making file management hands-free and time-efficient. This project taught me about file handling, automation, and real-time monitoring with the Watchdog API, creating a streamlined workspace.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/desk.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/desk.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/desk2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/desk3.png'],
      links: [
        { text: 'GitHub', url: 'https://github.com/imjustinliao/Desktop-Organizer' }
      ],
      timeline: '10.24.24 - 11.7.24',
      location: 'Localhost: justinliao',
      role: 'Engineer',
      deltaScore: 23
    },
    {
      id: 'tech-5',
      name: 'Stock Market Browser Extension',
      description: 'I developed this browser extension to track real-time stock prices and display key data from daily to yearly changes. Using JavaScript, HTML, and CSS, the extension pulls data from the Alpha Vantage API and ensures that the stock list is saved using the Chrome Storage API, even after closing the browser. It features automatic updates every 30 minutes during market hours and a manual refresh button for instant updates. Through this project, I gained experience with API integration, persistent data storage, and UI/UX improvements. Feel free to try it out on my GitHub repo.',
      image: 'https://github.com/imjustinliao/Stock-Market-Browser-Extension/blob/main/bull.png?raw=true',
      slideshow: ['https://github.com/imjustinliao/Stock-Market-Browser-Extension/blob/main/bull.png?raw=true', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stock.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stock2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stock3.png'],
      links: [
        { text: 'GitHub', url: 'https://github.com/imjustinliao/Stock-Market-Browser-Extension' }
      ],
      timeline: '10.18.24 - 10.24.24',
      location: 'Localhost: justinliao',
      role: 'Engineer',
      deltaScore: 22
    },
    {
      id: 'tech-6',
      name: 'Calingual AI',
      description: 'At Leaner Startup AI Hacks 6.0, my team placed in the top 5 for Callingual AI, an AI-powered customer support agent with emotional intelligence and multilingual voice interaction. I helped design the system architecture, ran competitor analysis, and identified a key gap: most AI agents can’t adapt emotionally. We addressed this by integrating Hume AI for emotion detection and Twilio for real-time voice, allowing dynamic tone shifts, dialect support, and more human-like conversations. I also worked on our business model, mapping subscription pricing and projected operating costs. The project gave me hands-on experience in product strategy, market validation, and designing scalable AI experiences under tight deadlines.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call12.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call3.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call7.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call4.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/call5.JPG'],
      links: [
        { text: 'Pitch Presentation', url: 'https://youtu.be/HFucELcB4kM' },
        { text: 'Leaner Startup AI Hacks', url: 'https://leanerstartups.com/event-registration/ai-hackathon-may-2024/' }
      ],
      timeline: '5.19.24',
      location: 'Seattle, WA',
      role: 'Co-founder & Engineer',
      deltaScore: 25
    },
    {
      id: 'tech-7',
      name: 'C$ Stalker',
      description: 'This is a web app that simulates real-time stock trading using mainly Python and Flask. I co-developed with Ethan Leonard, I focused on front-end enhancements to create an engaging and user-friendly experience. Using IEX API, the app lets users simulate stock trading in a dynamic environment with auto-updating charts, while integrated AI chatbots from OpenAI offer instant insights and guidance for the user.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%24.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%24.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%243.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%244.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%245.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%246.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/c%242.jpeg'],
      links: [
        { text: 'GitHub', url: 'https://github.com/ethan-leonard/CS_Stockers' }
      ],
      timeline: '11.8.23 - 11.25.23',
      location: 'Localhost: justinliao',
      role: 'Front-end Engineer & Co-developer',
      deltaScore: 12
    },
    {
      id: 'tech-8',
      name: 'BC ACM Website - v1',
      description: 'I co-developed the club website for BC Computer Programming Club (now BC ACM), starting as a member in April 2023 and later being promoted to VP in July 2023. Collaborating with four leaders, I built our first ACM club website from scratch using HTML, CSS, JavaScript, Node.js, and Express.js, which increased club membership to over 250 students. I handled the front-end development and implemented Formspree for the contact page, while also guiding students in setting up collaborative Git environments and creating their portfolio websites.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc%20website2.JPG',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc%20website2.JPG', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc%20website3.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/cpc%20website.png'],
      links: [
        { text: 'GitHub', url: 'https://github.com/bellevue-college-acm/WebDevTeam' }
      ],
      timeline: 'March 2023 - October 2023',
      location: 'Localhost: justinliao',
      role: 'Front-end Engineer & Co-developer',
      deltaScore: 8
    },
    {
      id: 'tech-9',
      name: 'Binary, Octal, Hexadecimal Converters',
      description: 'My coding journey began with this Binary Decimal Converter, a Python tool I created to convert between binary and decimal with flexible precision settings. Developed during my first Python bootcamp back in Taiwan, I expanded to binary-to-octal and binary-to-hexadecimal conversions as I dove deeper into the logic of base conversions. This project sharpened my mathematical thinking, problem-solving, and sparked my passion for programming.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/converter6.png'],
      links: [
        { text: 'GitHub', url: 'https://github.com/imjustinliao/Binary-to-Decimal-Converter' }
      ],
      timeline: 'March 2021',
      location: 'Localhost: justinliao',
      role: 'Engineer',
      deltaScore: 25
    }
  ],

  // Category 3: Content Creation
  3: [
    {
      id: 'content-1',
      name: 'Founders x Customer',
      description: 'This is a weekly interview series where I bring tech startup founders face-to-face with their actual customers and challenge them to sell their product on the spot. I’ll pick the founder, pick the customer, set up the meeting, and film the interaction as a way to showcase real persuasion, product thinking, and founder storytelling. It’s meant to be fun, raw, and honest. Coming soon.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tba.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tba.png'],
      links: [
        { text: 'YouTube', url: 'https://www.youtube.com/@imjustinliao' },
        { text: 'Instagram', url: 'https://www.instagram.com/imjustinliao/' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/in/justin-liao23/' }
      ],
      timeline: 'TBA',
      location: 'YouTube | Instagram | LinkedIn',
      role: 'Creator',
      deltaScore: 60
    },
    {
      id: 'content-2',
      name: 'Justin\'s Life Vlogs',
      description: 'This is a casual weekly vlog series documenting my life before I move into a new phase—what I worked on, where I went, what I ate, and who I spent time with. It’s filmed in a simple, cinematic style, more like a personal journal than polished content. It’s a way for me to look back on the small details that shaped the journey. Coming soon.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tba.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tba.png'],
      links: [
        { text: 'YouTube', url: 'https://www.youtube.com/@imjustinliao' },
        { text: 'Instagram', url: 'https://www.instagram.com/imjustinliao/' }
      ],
      timeline: 'TBA',
      location: 'YouTube | Instagram',
      role: 'Creator',
      deltaScore: 75
    },
    {
      id: 'content-3',
      name: 'Meta OS Parody',
      description: 'I made this parody after Meta’s OS demo failed during the Ray-Ban AI Glasses launch, mixing memes with my own personality to introduce myself to the tech/startup crowd. I filmed a one-shot scene (redid it 6+ times) pretending to be “Mark,” flipping through Forbes, saying “nonono,” then switching into Enjoy the Ride as I walked into my room singing. I edited everything in CapCut and redesigned the glasses UI in Figma—notifications, WhatsApp calls, overlays, filters, animations, and the final “Shot on iPhone” intro. I also included cameos of tech Twitter creators and friends. It took around three days to film and produce, and it ended up reaching 4.1k on X, 2.5k on LinkedIn, and 2.4k on Instagram, becoming one of my highest-quality edits so far.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark.jpeg',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark3.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark4.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark5.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark 6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark7.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark9.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark10.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark11.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark12.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark13.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark14.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark15.jpg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark16.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark17.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/mark18.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/OqOVUH60g3E' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1970549505209835826?s=20' },
        { text: 'Post', url: 'https://www.instagram.com/reel/DO9EZI4jxUf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_foundersjourney-activity-7376317068725448704-RQ-C?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' }
      ],
      timeline: '9.19.25 - 9.21.25',
      location: 'YouTube | X | Instagram | LinkedIn',
      role: 'Creator',
      deltaScore: 65
    },
    {
      id: 'content-4',
      name: 'VibeChk Official Launch',
      description: 'This was the first cinematic launch film I made for VibeChk, where I acted as the main character and co-directed the entire project. I wrote the outline, recruited 15+ friends for the scenes, and directed the story flow, audio cues, and transitions while Claire Teske and Michael Talluto handled filming and editing. The short follows a narrative I created about a burnt-out Gen Z founder waking up in a 2030 world where people meet in real life again—founders talking on the streets, creators building together, and spontaneous meetups happening everywhere. It became my most ambitious visual project so far and also my highest-engagement post, reaching 4.1k on X, 8.3k on LinkedIn, and 2.3k on Instagram, which brought in new VibeChk users and helped me network with a lot more builders.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%201.jpeg',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%201.jpeg', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%202.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%203.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%204.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%205.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%206.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%207.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%208.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%209.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%2010.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%2011.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%2012.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%2013.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vibechk%2014.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/2xVtcuz__n4' }, 
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_challengeaccepted-startups-activity-7353471282228670465-mQcV?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1947704406964899987?s=20' },
        { text: 'Post', url: 'https://www.instagram.com/reel/DMawV_7PzMp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
      ],
      timeline: '7.20.25 - 7.22.25',
      location: 'YouTube | LinkedIn | X | Instagram',
      role: 'Creator',
      deltaScore: 55
    },
    {
      id: 'content-5',
      name: 'VibeChk Pre-Launch',
      description: 'This was the pre-launch edit for VibeChk, but with more of a documentary vibe, using behind-the-scenes shots of the actors I invited while filming the main launch video. I edited it with a NEMZZZ-type beat, which is a popular track in Gen Z startup UGC, and focused on smooth, simple transitions that matched the energy. It reached about 3k views on Instagram, which was the highest on my account at the time (with only ~320 followers), and it helped other young builders discover my work and reach out.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcl11.png'],
      links: [
        { text: 'Post', url: 'https://www.instagram.com/reel/DMW65F8u9td/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_startups-technology-genzfounders-activity-7353089336680067072-8qu8?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1947180062757036050?s=20' },
      ],
      timeline: '7.20.25',
      location: 'Instagram | LinkedIn | X',
      role: 'Creator',
      deltaScore: 45
    },
    {
      id: 'content-6',
      name: 'VibeChk Pre-trailer',
      description: 'I made this pre-trailer to hype the VibeChk launch and introduce the idea of “meet builders IRL,” which fits our Gen Z audience who don’t really vibe with professional LinkedIn culture. It was a full-day edit featuring the rap track Indicisive by Kidwild, a mix of smooth transitions, and a grind-mode aesthetic to show what we were building. It ended with “Launching on Tuesday” and “Comment ‘vibe’ for priority access,” which a lot of people actually did. It became my most engaging piece at the time, hitting 6.5k views on LinkedIn, 2.1k on Instagram, and 1.1k on X.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/vcp8.png'],
      links: [
        { text: 'Post', url: 'https://www.instagram.com/reel/DMNvlFWx3tx/?utm_source=ig_web_copy_link' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_cold-dms-and-emails-are-dead-gen-zs-are-activity-7351640380171280384-dStE?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1945872141670625576?s=20' },
      ],
      timeline: '7.17.25',
      location: 'Instagram | LinkedIn | X',
      role: 'Creator',
      deltaScore: 47
    },
    {
      id: 'content-7',
      name: 'Side Hustle Timelapse',
      description: 'This was a quick 13-second timelapse I made to capture the day-and-night grind of me and Thomas building our projects. I used continuous transitions and added short lines of text like “your time is limited,” “we are creating,” and “60 days, three viral apps” to give it that Gen Z hustle-energy vibe. It was meant to be simple but motivational, and it ended up hitting around 2k views across platforms. It’s one of those edits that shows how much can be said in just a few seconds when the pacing and message line up well with the music.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/tl6.png'],
      links: [
        { text: 'Shorts', url: 'https://youtube.com/shorts/N-KKPQ0Mra4?feature=share' },
        { text: 'Post', url: 'https://www.instagram.com/p/DLvg-nfBIS2/' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_watch-us-build-3-consumer-apps-in-60-days-activity-7348035787336142850-jGGY?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' }
      ],
      timeline: '7.5.25',
      location: 'YouTube | Instagram | LinkedIn ',
      role: 'Creator',
      deltaScore: 30
    },
    {
      id: 'content-8',
      name: '3 Viral Apps in 60 Days',
      description: 'This was my first UGC-style video to promote my personal brand and build early hype for the VibeChk launch. I spent three days filming and editing with Thomas, shooting over 100 clips because I kept refilming until it felt right. The final cut is a one-minute cinematic edit with filters, transitions, manual voiceover, custom captions, layered sound effects, and a bunch of small details to keep it tight. It reached 2.6k views on X, 2.3k on LinkedIn, and 1.8k on Instagram, which led to random people reaching out, asking what I was building, and signing up for the waitlist.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat11.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat12.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat13.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat14.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat15.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat16.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat17.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/goat18.png'],
      links: [
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1940804339771064778?s=20' },
        { text: 'Post', url: 'https://www.linkedin.com/posts/justin-liao23_startup-founders-buildinpublic-activity-7346574112409993219-GC2z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqj-gBKLiytH8UF5DEfADF8Pv13_WJNX8' },
        { text: 'Post', url: 'https://www.instagram.com/p/DL_cZiTxbY_/' }
      ],
      timeline: '6.30.25 - 7.2.25',
      location: 'X | LinkedIn | Instagram',
      role: 'Creator',
      deltaScore: 51
    },
    {
      id: 'content-9',
      name: 'Demo Day Trailer',
      description: 'I produced a cinematic trailer for Innovators Hub’s Demo Day, blending storytelling, suspense, and humor while introducing the event theme. Everything was filmed on an iPhone 15 Pro and manually edited with CapCut, the trailer introduced the Launchpad program and elevated the overall production quality for over 120+ attendees.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo2.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo7.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo11.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo12.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo13.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo14.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo15.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo16.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo17.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo18.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo19.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo20.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo21.png','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/demo22.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/vs2VFVVnW2I' },
        { text: 'Post', url: 'https://www.instagram.com/reel/DKiJI0uhTIo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1930396054408900970?s=20' }
      ],
      timeline: '5.30.25',
      location: 'YouTube | Instagram | X',
      role: 'Creator',
      deltaScore: 42
    },
    {
      id: 'content-10',
      name: 'Porsche GT3RS Edits',
      description: 'I made this Porsche GT3RS edit purely out of passion — literally two hours before a final. I grabbed different GT3RS and GT3R clips from YouTube, mixed them together, and synced everything to the phonk track Sleepwalker. The fun part was matching the music with the engine sound and timing each cut so the video feels fast, smooth, and alive. It was all done in CapCut, and even though it was a quick project, it’s still one of my favorite edits I’ve made.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p11.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p12.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p13.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p14.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p15.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p16.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p17.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/p18.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/1P-xY6MPEeQ' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1930396054408900970?s=20' }
      ],
      timeline: '3.7.25',
      location: 'YouTube | X',
      role: 'Creator',
      deltaScore: 17
    },
    {
      id: 'content-11',
      name: 'Steve Jobs Motivation Edits',
      description: 'This edit was inspired by a clip I saw on Instagram. I started by filming my laptop with my phone as Steve Jobs began speaking, then used a glitch transition to jump into full-screen for the main part of the interview. At the end, it transitions back into real life the same way it started. It was a simple idea, but it ended up being my first post on X to pass 1k views, eventually reaching 5k+, which felt big at the time since I was just starting to grow on the platform.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/steve7.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/DfOIJtyJ9jE' },
        { text: 'Post', url: 'https://x.com/imjustinliao/status/1917674643936473480?s=20' }
      ],
      timeline: '2.8.25',
      location: 'YouTube | X',
      role: 'Creator',
      deltaScore: 19
    },
    {
      id: 'content-12',
      name: 'OPTT Stock Analysis',
      description: 'I made this as a troll video in Fall 2024, pretending to be one of those fake YouTube stock “gurus.” It was during the time I first started investing and was bag-holding about $1k of OPTT after buying the top, so I turned the whole situation into a joke. I used the Yahoo Finance intro as a transition, added stock-market background crowd noise, and gave an overly confident breakdown of OPTT and RCAT. I shared it in the stock group I founded and somehow convinced a few friends to buy in too—some made money and some ended up bag-holding with me. It was a fun project and one of my early comedy edits around finance.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/optt11.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/WB9_A2mhC8U' }
      ],
      timeline: '12.6.24',
      location: 'YouTube',
      role: 'Creator',
      deltaScore: 15
    },
    {
      id: 'content-13',
      name: 'Motiversity Remix',
      description: 'This was a quick comedy edit I made right after the Stanford rejection. I took motivational clips from YouTube and suddenly cut them into me giving random “life advice,” switching back and forth for comedic timing. It was all done in CapCut, and it was my first time mixing viral-style transitions with clips of myself. It ended up being one of those spontaneous edits that turned out funnier than expected.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/motiversity6.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/1ncohrdTtA4' }
      ],
      timeline: '3.27.24',
      location: 'YouTube',
      role: 'Creator',
      deltaScore: 9
    },
    {
      id: 'content-14',
      name: 'Stanford Rejection Reaction',
      description: 'I made this video in 2024 when I applied to transfer from BC and genuinely thought I had a shot at Stanford. It was meant to be a sarcastic joke, filmed right before decisions came out — I talked about random “signs” like how I dreamed I got in, wore a red shirt, and pointed at a tree outside calling it the Stanford tree. When the rejection came, I turned the whole thing into a playful parody with You and Whose Army in the background, plus a few dramatic gym shots and push-ups in the middle of the road for humor. I ended it with a simple “Go Husky,” basically saying UW, I’m coming.',
      image: 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford1.png',
      slideshow: ['https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford1.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford2.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford3.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford4.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford5.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford6.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford7.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford8.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford9.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford.jpeg','https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford10.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford11.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford12.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford13.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford14.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford15.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford16.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford17.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford18.png', 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev/stanford19.png'],
      links: [
        { text: 'Watch', url: 'https://youtu.be/QNH_VSecoRQ' }
      ],
      timeline: '3.27.24',
      location: 'YouTube',
      role: 'Creator',
      deltaScore: 25
    }
  ]
}
