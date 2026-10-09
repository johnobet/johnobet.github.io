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
  'John Obet Olchondra is a developer and visual storyteller from Bohol. He builds mobile and web apps end to end, from the database and API to the screen in your hand. Behind the camera, he is a photojournalist and videographer for The Harpooner, the student publication of BISU Candijay Campus, covering university programs, sports meets, and graduation recaps.'

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

// TODO: replace the picsum placeholders with real images in public/works/.
export const works = [
  {
    title: 'StayEase',
    kind: 'Mobile app',
    year: '2026',
    blurb:
      'Boarding house finder and booking app for students. Map search, visit scheduling, chat, and online rent payments.',
    tags: ['Flutter', 'Firebase', 'FastAPI', 'PayMongo'],
    image: 'https://picsum.photos/seed/stayease-boarding-room/900/700',
  },
  {
    title: 'Stewards of our Island',
    kind: 'Documentary video',
    year: 'Award',
    blurb:
      'From Coast to Karst. A short film on the people protecting Bohol, made with The Harpooner team. 3rd place, Geopark video contest.',
    tags: ['Videography', 'Editing'],
    image: 'https://picsum.photos/seed/bohol-coast-karst/900/700',
    href: 'https://www.facebook.com/photo.php?fbid=122210357990468009',
  },
  {
    title: '50th Commencement',
    kind: 'Graduation recap video',
    blurb: 'Co-produced cinematic recap of the 50th Commencement Exercises, built around the graduating class and their families.',
    tags: ['Videography', 'Editing'],
    image: 'https://picsum.photos/seed/graduation-caps-toss/900/700',
    href: 'https://www.facebook.com/bisuTheHarpooner/videos/1325924788965864/',
  },
  {
    title: 'Paugnat ug Pasundayag',
    kind: 'Intramurals coverage',
    year: '2026',
    blurb: 'Photo coverage of the sports, mass dances, and cultural shows, plus the opening day video highlights reel.',
    tags: ['Photography', 'Videography'],
    image: 'https://picsum.photos/seed/intramurals-mass-dance/900/700',
    href: 'https://www.facebook.com/bisuTheHarpooner/posts/1043365161952192/',
  },
  {
    title: "World Teachers' Day",
    kind: 'Event videography',
    year: '2025',
    blurb: 'Primary videographer for the general program, coordinating multi-angle coverage with the student production team.',
    tags: ['Videography', 'Multi-cam'],
    image: 'https://picsum.photos/seed/teachers-day-stage/900/700',
    href: 'https://www.facebook.com/bisumcSCV/posts/1746643420795365/',
  },
  {
    title: 'The Harpooner',
    kind: 'Photojournalism',
    year: 'Ongoing',
    blurb: 'Campus news, features, and sports meets like Paugnat sa Kusog, shot for the student publication of BISU Candijay Campus.',
    tags: ['Photography', 'Video'],
    image: 'https://picsum.photos/seed/campus-photojournalism/900/700',
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

export const process = [
  {
    word: 'Define',
    text: 'Every project starts with questions, not code or a camera. Who is it for, what problem does it solve, and what does done look like.',
    image: 'https://picsum.photos/seed/planning-notes-desk/1000/1100',
  },
  {
    word: 'Design',
    text: 'Wireframes for apps, shot lists for stories. I plan the structure first so building and filming move fast.',
    image: 'https://picsum.photos/seed/wireframe-sketch/1000/1100',
  },
  {
    word: 'Deliver',
    text: 'Build, test, ship. Apps go live with real users, stories get published on deadline.',
    image: 'https://picsum.photos/seed/camera-on-location/1000/1100',
  },
]

export const services = ['Mobile apps', 'Web apps', 'Photo coverage', 'Video production']
