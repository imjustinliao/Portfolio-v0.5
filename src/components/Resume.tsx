import { useState, useEffect, useRef } from 'react'

interface ExperienceItem {
  company: string
  role: string
  date: string
  location: string
}

interface EducationItem {
  school: string
  degree: string
  date: string
}

const education: EducationItem[] = [
  {
    school: 'University of Washington',
    degree: 'Bachelor in Computer Science',
    date: '2024 - 2026',
  },
  {
    school: 'Coursera Google',
    degree: 'UX Design Professional Certificate',
    date: '2025 - 2026',
  },
  {
    school: 'Bellevue College & HS',
    degree: 'Associate in Arts & Science',
    date: '2021 - 2024',
  },
]

const experience: ExperienceItem[] = [
  {
    company: 'Reunify Labs',
    role: 'Founder',
    date: 'May 2024 - Present',
    location: 'Bothell, WA',
  },
  {
    company: 'VibeChk',
    role: 'Founder | Designer',
    date: 'June 2025 - August 2025',
    location: 'Bothell, WA',
  },
  {
    company: 'UWB Innovators Hub',
    role: 'Founder | Co-president',
    date: 'October 2024 - Present',
    location: 'Bothell, WA',
  },
  {
    company: 'UWB ACM',
    role: 'Sponsorship Co-lead | Core Officer',
    date: 'September 2024 - June 2025',
    location: 'Bothell, WA',
  },
  {
    company: 'Bellevue College',
    role: 'Math Tutor',
    date: 'January 2024 - June 2024',
    location: 'Bellevue, WA',
  },
  {
    company: 'BC Innovators Hub',
    role: 'Founder | President',
    date: 'July 2023 - August 2024',
    location: 'Bellevue, WA',
  },
  {
    company: 'BC ACM',
    role: 'Co-VP',
    date: 'July 2023 - June 2024',
    location: 'Bellevue, WA',
  },
]

const skills = [
  [
    'Sketching',
    'UI/UX Design',
    'User Interview',
    'User Research',
    'User Testing',
    '-',
    'AI & ML',
    'iOS Development',
    'Web Development',
    '-',
    'Content Creation',
    'Video Editing',
    'Market Analysis + GTM',
    '-',
    'Prototyping',
    'Project Management',
    'Product Strategy',
    'Product Development',
    'Public Speaking',
    'Team Leadership',
  ],
  [
    'C++',
    'Python',
    'HTML5 / CSS',
    'JavaScript',
    'React.js',
    'TypeScript',
    'Swift',
    'Swift UI',
    'SQL',
  ],
  [
    'Figma',
    'Miro',
    'Git',
    'Docker',
    'Clang',
    'Linux',
    'VS Code',
    'Xcode',
    'Firebase',
    'AWS Cloud',
  ],
]

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Only animate once
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full px-[3vw] pb-20">
      {/* Horizontal Line - Aligned with content */}
      <div className="w-full h-[1px] bg-[#C9C9C9] mt-[clamp(80px,15vh,140px)] mb-[clamp(20px,3vh,30px)]" />

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16">
        
        {/* Education Column */}
        <div 
          className={`flex flex-col gap-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="text-[clamp(20px,2vw,24px)] font-normal text-white font-['Helvetica_Neue',_sans-serif]">
            Education
          </h3>
          <div className="flex flex-col gap-[clamp(20px,2.5vh,28px)]">
            {education.map((item, index) => (
              <div key={index} className="flex flex-col text-[clamp(15px,1.5vw,17px)] font-light text-[#d9d9d9] leading-relaxed">
                <span className="text-white font-normal">{item.school}</span>
                <span>{item.degree}</span>
                <span className="text-[#999]">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Column */}
        <div 
          className={`flex flex-col gap-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <h3 className="text-[clamp(20px,2vw,24px)] font-normal text-white font-['Helvetica_Neue',_sans-serif]">
            Experience
          </h3>
          <div className="flex flex-col gap-[clamp(20px,2.5vh,28px)]">
            {experience.map((item, index) => (
              <div key={index} className="flex flex-col text-[clamp(15px,1.5vw,17px)] font-light text-[#d9d9d9] leading-relaxed">
                <span className="text-white font-normal">{item.company}</span>
                <span>{item.role}</span>
                <span className="text-[#999]">{item.date}</span>
                <span className="text-[#999]">{item.location}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Column */}
        <div 
          className={`flex flex-col gap-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <h3 className="text-[clamp(20px,2vw,24px)] font-normal text-white font-['Helvetica_Neue',_sans-serif]">
            Skills
          </h3>
          <div className="flex flex-col gap-[clamp(20px,2.5vh,28px)] text-[clamp(15px,1.5vw,17px)] font-light text-[#d9d9d9] leading-relaxed">
            {skills.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col">
                {group.map((skill, skillIndex) => (
                  <span key={skillIndex}>{skill}</span>
                ))}

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
