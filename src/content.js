// Everything you'd want to edit lives here. Images go in /public.

export const profile = {
  name: 'John Obet',
  fullName: 'John Obet Olchondra',
  roles: ['Full Stack Developer', 'Photojournalist', 'Videographer'],
  location: 'Bohol, Philippines',
  lead: 'I build mobile and web apps end to end, and I cover campus stories with a camera for The Harpooner, the student publication of BISU Candijay Campus.',
  chips: ['Flutter', 'React', 'FastAPI', 'Photography', 'Videography'],
  // Cut-out portrait (transparent WebP). Drop it at public/me.webp.
  portrait: 'me.webp',
  email: 'johnobetolchondra47@gmail.com',
  facebook: 'https://www.facebook.com/obt.johnny',
  github: 'https://github.com/johnobet',
  school: 'Bohol Island State University, Candijay Campus',
}

export const about =
  'John Obet Olchondra is a developer and visual storyteller from Bohol. He builds mobile and web apps end to end, from the database and API to the screen in your hand. Behind the camera, he is a photojournalist and videographer for The Harpooner, the official student publication of BISU Candijay Campus, covering campus events, intramurals, and commencement exercises.'

export const stats = [
  { n: 11, suffix: '', label: 'Projects on this site' },
  { n: 43, suffix: 'K', label: 'Views on my top video' },
  { n: 3, suffix: 'rd', label: 'Place, Geopark video contest' },
]

export const heroFacts = [
  { value: '3rd Place', label: 'Geopark video contest' },
  { value: '43K views', label: '50th Commencement video' },
]

// slug = Simple Icons name (https://simpleicons.org). No slug = text only.
export const stack = [
  {
    group: 'Languages',
    items: [
      { name: 'Dart', slug: 'dart' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Python', slug: 'python' },
      { name: 'C', slug: 'c' },
    ],
  },
  {
    group: 'Mobile',
    items: [
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'OpenStreetMap', slug: 'openstreetmap' },
    ],
  },
  {
    group: 'Web',
    items: [
      { name: 'React', slug: 'react' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'HTML', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
    ],
  },
  {
    group: 'Backend & Data',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'Cloudinary', slug: 'cloudinary' },
      { name: 'PayMongo' },
      { name: 'Render', slug: 'render' },
      { name: 'Git', slug: 'git' },
    ],
  },
]

// `cat` drives the filter buttons: a new category shows up by itself. Images live in public/works/.
const shot = (name) => `works/photos/${name}.jpg`

export const photos = [
  {
    title: 'BSOA Pinning Ceremony',
    cat: 'Event Coverage',
    year: '2026',
    blurb: 'The seventh BS Office Administration pinning and orientation program at BISU Candijay, from the nameplates to the speakers.',
    cover: shot('pinning-3'),
    images: ['pinning-3', 'pinning-1', 'pinning-2', 'pinning-4'].map(shot),
    href: 'https://www.facebook.com/share/p/1KNU8FYBa7/',
  },
  {
    title: 'Short and Sweet Play',
    cat: 'Stage & Performance',
    year: '2025',
    blurb: 'Stage coverage of the musical play that won BISU Candijay the championship.',
    cover: shot('musical-2'),
    images: ['musical-2', 'musical-3', 'musical-4'].map(shot),
    href: 'https://www.facebook.com/share/p/19nAgePiti/',
  },
  {
    title: 'The Harpooner Staff',
    cat: 'Portrait',
    year: '2026',
    blurb: 'Editorial portraits of the A.Y. 2026 to 2027 editorial board and staff.',
    cover: shot('board-2'),
    images: ['board-2', 'board-1', 'board-3'].map(shot),
    href: 'https://www.facebook.com/share/p/19vwLYpRra/',
  },
  {
    title: 'LEAP for School Leaders',
    cat: 'Event Coverage',
    year: '2026',
    blurb: 'Leadership seminar by the School of Advanced Studies, held at Candijay Elementary School.',
    cover: shot('leap-4'),
    images: ['leap-4', 'leap-1', 'leap-2', 'leap-3'].map(shot),
    href: 'https://www.facebook.com/share/p/1EdwLJRrtX/',
  },
]

export const videos = [
  {
    title: '50th Commencement',
    cat: 'Graduation',
    year: '2026',
    views: '43K views',
    blurb: 'Highlights of the 50th Commencement Exercises of BISU Candijay Campus. Videographer with Wendell Jotojot, edited by Ahron Badili.',
    cover: 'works/commencement.jpg',
    href: 'https://www.facebook.com/share/v/1FcV8exhbM/',
  },
  {
    title: 'Paugnat ug Pasundayag',
    cat: 'Event Highlights',
    year: '2026',
    views: '42K views',
    blurb: 'Opening day highlights of the campus intramurals. Videographer, edited by Ahron Badili.',
    cover: 'works/paugnat.jpg',
    href: 'https://www.facebook.com/share/v/1DCBXr4uD4/',
  },
  {
    title: '17th BISU Charter Day',
    cat: 'Event Highlights',
    views: '20K views',
    blurb: 'All six BISU campuses together at the Candijay Cultural Center. Videographer with Wendell Jotojot and Denver Ugay, edited by Ahron Badili.',
    cover: 'works/charter.jpg',
    href: 'https://www.facebook.com/share/v/18sVE6BHJo/',
  },
  {
    title: 'Stewards of our Island',
    cat: 'Documentary',
    year: 'Award',
    blurb: 'From Coast to Karst. Entry to the Bohol Island Geopark Video Content Creation Contest, made with The Harpooner team. Won 3rd place.',
    cover: 'works/stewards.jpg',
    href: 'https://www.facebook.com/photo.php?fbid=122210357990468009',
  },
]

export const apps = [
  {
    title: 'StayEase',
    cat: 'Mobile Apps',
    kind: 'Android app',
    year: '2026',
    blurb: 'Find, visit, reserve and pay for rooms and homes across Bohol, in one app. Renters see listings on a map with real distances, and owners get one place to list, approve tenants and track rent.',
    features: [
      'Map search with distances to school, work or any pinned place',
      'Visit requests, room reservations and chat with owners',
      'Rent payments through PayMongo, with GCash and cards',
      'Owner tools and an admin side for verifying listings',
    ],
    tags: ['Flutter', 'Firebase', 'FastAPI', 'PayMongo', 'Cloudinary', 'OpenStreetMap'],
    icon: 'works/stayease-icon.png',
    video: 'works/stayease-demo.mp4',
    apk: { href: 'downloads/StayEase.apk', size: '59 MB' },
    poster: 'works/stayease-poster.jpg',
  },
  {
    title: 'Gym System',
    cat: 'Web',
    kind: 'Web app',
    year: '2026',
    blurb: 'A gym website and member system with live machine availability, class booking, visit requests and clear membership plans. Opens the live demo.',
    tags: ['Next.js', 'Railway'],
    image: 'works/gym-cover.jpg',
    href: 'https://gym-production-d188.up.railway.app/',
  },
  {
    title: 'This Portfolio',
    cat: 'Web',
    kind: 'Website',
    year: '2026',
    blurb: 'The site you are on. Designed and built from scratch, with a light and dark theme and motion throughout.',
    tags: ['React', 'Tailwind CSS', 'Motion', 'Vite'],
    href: 'https://github.com/johnobet/johnobet.github.io',
  },
]

export const harpooner = {
  name: 'The Harpooner',
  logo: 'works/harpooner-logo.jpg',
  href: 'https://www.facebook.com/bisuTheHarpooner/',
}

// The three cards in Works. Each one opens its own full-screen view at #id.
export const categories = [
  {
    id: 'photography',
    title: 'Photography',
    intro: 'Campus life as it happens, from ceremonies and stages to the people behind the paper.',
    cover: shot('musical-2'),
    items: photos,
  },
  {
    id: 'videography',
    title: 'Videography',
    intro: 'Highlights and documentaries shot for The Harpooner. Each one opens on Facebook.',
    cover: 'works/commencement.jpg',
    items: videos,
    dark: true,
  },
  {
    id: 'development',
    title: 'Development',
    intro: 'Apps built end to end, from the database and API to the screen in your hand.',
    cover: 'works/stayease-cover.jpg',
    items: apps,
  },
]

export const award = {
  place: '3rd Place',
  contest: 'Video Content Creation Contest',
  org: 'Bohol Island UNESCO Global Geopark',
  entry: 'Stewards of our Island: From Coast to Karst',
  team: 'The Harpooner, BISU Candijay Campus',
  image: 'award-geopark.jpg',
  href: 'https://www.facebook.com/photo.php?fbid=122210357990468009',
}

export const services = ['Mobile apps', 'Web apps', 'Photo coverage', 'Video production']
