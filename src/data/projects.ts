import type { ProjectData } from '../components/ProjectCard'

// DATA INSTRUCTIONS:
// 1. To ADD a new project: Copy one of the objects inside the [] (between { ... }) and paste it.
// 2. To EDIT a project: Change the values (strings inside "...") for name, description, etc.
// 3. To DELETE a project: Remove the entire object { ... } and the comma after it.
// 4. The 'id' must be unique (e.g. 'high-delta-1', 'high-delta-2').
// 5. Images and GIFs should be in the 'public' folder (e.g. /UI/image.jpg).

export const projects: Record<number, ProjectData[]> = {
  // Category 0: High-delta Work
  0: [
    {
      id: 'high-delta-1',
      name: 'VibeChk',
      description: 'A cutting-edge platAplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cutt cutting-edge platA cutting-edge platA cutting-edge platA cutting-edge platA cutting-edge platform redefining how we connect and share vibes. Built with React and modern web technologies to create seamless social experiences.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG', // Replace with actual GIF path when available
      links: [
        { text: 'Demo', url: 'https://example.com' },
        { text: 'GitHub', url: 'https://github.com' }
      ],
      timeline: 'June 2025 - July 2025',
      location: 'Bothell, WA',
      role: 'Founder & Designer',
      deltaScore: 95
    },
    {
      id: 'high-delta-2',
      name: 'Project Two',
      description: 'Another high-impact proatA latA cuttplatplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttplatA cuttnd user-centric design principles.',
      image: '/UI/i2.JPG',
      gif: '/UI/i2.JPG',
      links: [
        { text: 'Case Study', url: '#' }
      ],
      timeline: 'Aug 2024 - Dec 2024',
      location: 'Seattle, WA',
      role: 'Lead Developer',
      deltaScore: 88
    },
    {
      id: 'high-delta-3',
      name: 'Innovation Hub',
      description: 'A collaborative space for creators to brainstorm and execute ideas with real-time tools.',
      image: '/UI/i3.JPG',
      gif: '/UI/i3.JPG',
      links: [
        { text: 'Live Site', url: '#' },
        { text: 'Docs', url: '#' }
      ],
      timeline: 'Jan 2024 - May 2024',
      location: 'Remote',
      role: 'Product Manager',
      deltaScore: 92
    },
    {
      id: 'high-delta-4',
      name: 'Future Vision',
      description: 'Exploring the boundaries of AR/VR in web interfaces.',
      image: '/UI/i1.JPG',
      gif: '/UI/i1.JPG',
      links: [
        { text: 'Demo', url: '#' }
      ],
      timeline: '2023',
      location: 'San Francisco, CA',
      role: 'Researcher',
      deltaScore: 85
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
