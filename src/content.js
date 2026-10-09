// Everything you'd want to edit lives here. Images go in /public.

export const profile = {
  name: 'John Obet',
  fullName: 'John Obet Olchondra',
  roles: ['Full Stack Developer', 'Photojournalist', 'Videographer'],
  heroLines: ['Android & Full Stack Developer', 'Photojournalist & Videographer'],
  // Cut-out portrait (transparent PNG). Drop it at public/me.png.
  portrait: 'me.png',
  email: 'johnobetolchondra47@gmail.com',
  facebook: 'https://www.facebook.com/obt.johnny',
  github: 'https://github.com/johnobet',
  school: 'Bohol Island State University, Candijay Campus',
}

export const about =
  'John Obet Olchondra is a developer and visual storyteller from Bohol. He builds mobile and web apps end to end, from the database and API to the screen in your hand. Behind the camera, he is a photojournalist and videographer for The Harpooner, the official student publication of BISU Candijay Campus, covering campus events, intramurals, and commencement exercises.'

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

// Images live in public/works/. `fit: 'contain'` shows the whole image (logos, icons) on `bg`.
export const works = [
  {
    title: 'StayEase',
    kind: 'Mobile app',
    year: '2026',
    blurb:
      'Boarding house finder and booking app for students. Map search, visit scheduling, chat, and online rent payments.',
    tags: ['Flutter', 'Firebase', 'FastAPI', 'PayMongo'],
    image: 'works/stayease-icon.png',
    fit: 'contain',
    bg: '#0f5f5c',
  },
  {
    title: 'Stewards of our Island',
    kind: 'Documentary video',
    year: 'Award',
    blurb:
      'From Coast to Karst. Entry to the Bohol Island Geopark Video Content Creation Contest, made with The Harpooner team. Won 3rd place.',
    tags: ['Videography'],
    image: 'works/stewards.jpg',
    href: 'https://www.facebook.com/photo.php?fbid=122210357990468009',
  },
  {
    title: '50th Commencement',
    kind: 'Video highlights',
    year: '2026',
    blurb: 'Highlights of the 50th Commencement Exercises of BISU Candijay Campus. Videographer with Wendell Jotojot, edited by Ahron Badili.',
    tags: ['Videography'],
    image: 'works/commencement.jpg',
    href: 'https://www.facebook.com/bisuTheHarpooner/videos/1325924788965864/',
  },
  {
    title: 'Paugnat ug Pasundayag',
    kind: 'Video highlights',
    year: '2026',
    blurb: 'Opening day highlights of the campus intramurals. Videographer, edited by Ahron Badili.',
    tags: ['Videography'],
    image: 'works/paugnat.jpg',
    href: 'https://www.facebook.com/bisuTheHarpooner/videos/1076696284890567/',
  },
  {
    title: 'The Harpooner',
    kind: 'Photojournalism',
    year: 'Ongoing',
    blurb: 'Photos and videos of campus news and events for the official student publication of BISU Candijay Campus.',
    tags: ['Photography', 'Videography'],
    image: 'works/harpooner-logo.jpg',
    fit: 'contain',
    bg: '#ffffff',
    href: 'https://www.facebook.com/bisuTheHarpooner/',
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
