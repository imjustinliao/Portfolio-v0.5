const INFLUENCES = [
  "Stoicism", "myself", "my family", "Steve Jobs", "Peter Thiel", "Elon Musk", 
  "Buddism", "Jeff Bezos", "Naval Ravikant", "Larry Ellison", "Socrates", 
  "Jensen Huang", "Ethan Leonard", "Manish Ram", "Thomas Suen", "Berky", 
  "Hawa Drammeh", "Marc Andreessen", "Ben Horowitz", "Zaha Hadid", 
  "Mark Zuckerberg", "Paul Graham", "Sam Altman", "Jack Dorsey", "Brian Chesky", 
  "Jony Ive", "Thomas Edison", "Pavel Durov", "Jim Rohn", "Dan Coe", 
  "Napolean Hill", "Jordan B. Peterson", "Donald Trump", "Rachel Lou", 
  "Sean Imoto", "Daniil Morozov", "Josh Monsalvatge", "James Floyd", "Roy Lee", 
  "Keli G.", "Abraham Guan", "Ehud Halberstam", "David Lee", "John D. Rockefeller", 
  "Richard Branson", "Warren Buffett", "Albert Einstein", "Mike Tyson", 
  "Friedrich Nietzsche", "Henry Ford", "Richard Feynman", "Ray Dalio", 
  "Jack Wu", "Swanand Wagh", "Jamie Dimon", "Kelly Huang", "Malaika Khan", 
  "Yannis Paniaras", "Dale Carnegie"
]

const sorted = [...INFLUENCES].sort((a, b) => a.localeCompare(b))
const randomIndex = Math.floor(Math.random() * sorted.length)
const result = [...sorted.slice(randomIndex), ...sorted.slice(0, randomIndex)]

console.log("Original Length:", INFLUENCES.length)
console.log("Result Length:", result.length)
console.log("First 5:", result.slice(0, 5))
console.log("Is Unique:", new Set(result).size === result.length)
