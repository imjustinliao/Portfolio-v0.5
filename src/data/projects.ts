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
      role: 'Founder / Organizer',
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
        { text: 'Discord', url: 'https://discord.com/invite/DzWEhESsZw' },
        { text: 'DevPost', url: 'https://uwb-hacks-save-the-world.devpost.com/' }
      ],
      timeline: 'September 2024 - June 2025',
      location: 'Bothell, WA',
      role: 'Core Officer',
      deltaScore: 20
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
