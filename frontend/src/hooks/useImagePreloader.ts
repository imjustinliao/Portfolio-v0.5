import { useEffect, useRef } from 'react'
import { ProjectData } from '../components/ProjectCard'

type Priority = 'HIGH' | 'MEDIUM' | 'LOW'

interface QueueItem {
  url: string
  priority: Priority
}

class PreloadQueue {
  private queue: QueueItem[] = []
  private active = 0
  private maxConcurrency = 4
  private loaded = new Set<string>()

  add(url: string, priority: Priority) {
    if (this.loaded.has(url)) return
    
    // Check if already in queue, if so, update priority if higher
    const existingIndex = this.queue.findIndex(item => item.url === url)
    if (existingIndex !== -1) {
      const existing = this.queue[existingIndex]
      const priorityMap = { HIGH: 3, MEDIUM: 2, LOW: 1 }
      if (priorityMap[priority] > priorityMap[existing.priority]) {
        this.queue[existingIndex].priority = priority
        this.sort()
      }
      return
    }

    this.queue.push({ url, priority })
    this.sort()
    this.process()
  }

  clear(priorityLevel?: Priority) {
    if (priorityLevel) {
      this.queue = this.queue.filter(item => item.priority !== priorityLevel)
    } else {
      this.queue = []
    }
  }

  private sort() {
    const priorityMap = { HIGH: 3, MEDIUM: 2, LOW: 1 }
    this.queue.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority])
  }

  private process() {
    if (this.active >= this.maxConcurrency || this.queue.length === 0) return

    const item = this.queue.shift()!
    this.active++

    const img = new Image()
    img.src = item.url
    img.onload = () => {
      this.loaded.add(item.url)
      this.active--
      this.process()
    }
    img.onerror = () => {
      // Failed to load, but we still move on
      this.active--
      this.process()
    }
  }
}

export function useImagePreloader(
  projects: Record<number, ProjectData[]>,
  activeCategory: number,
  currentPage: number,
  itemsPerPage: number
) {
  const queueRef = useRef(new PreloadQueue())

  // 1. Global Init: Preload first page thumbnails for ALL categories (Medium Priority)
  useEffect(() => {
    Object.values(projects).forEach(categoryProjects => {
      const firstPage = categoryProjects.slice(0, itemsPerPage)
      firstPage.forEach(project => {
        if (project.image) queueRef.current.add(project.image, 'MEDIUM')
      })
    })
  }, []) // Run once on mount

  // 2. Active Category Logic
  useEffect(() => {
    const queue = queueRef.current
    const currentProjects = projects[activeCategory] || []
    
    // Clear low priority items from previous category/page to free up slots
    queue.clear('LOW')

    // Priority A: Current page slideshows (HIGH) - Instant Hover
    const currentStart = (currentPage - 1) * itemsPerPage
    const currentEnd = currentStart + itemsPerPage
    const currentView = currentProjects.slice(currentStart, currentEnd)
    
    currentView.forEach(project => {
      project.slideshow?.forEach(url => queue.add(url, 'HIGH'))
    })

    // Priority B: Next Page Thumbnails (MEDIUM) - Fast Pagination
    const nextStart = currentEnd
    const nextEnd = nextStart + itemsPerPage
    const nextView = currentProjects.slice(nextStart, nextEnd)

    nextView.forEach(project => {
      if (project.image) queue.add(project.image, 'MEDIUM')
    })

    // Priority C: Rest of the category (LOW) - Background fill
    currentProjects.forEach(project => {
      if (project.image) queue.add(project.image, 'LOW')
      project.slideshow?.forEach(url => queue.add(url, 'LOW'))
    })

  }, [activeCategory, currentPage])
}
