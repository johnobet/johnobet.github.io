import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Aperture, ArrowUpRight, ArrowLeft, ArrowRight, Trophy } from '@phosphor-icons/react'
import { profile, about, stack, works, award, services } from './content'

const ease = [0.23, 1, 0.32, 1]
const nav = [
  ['About', '#about'],
  ['Works', '#works'],
  ['Contact', '#contact'],
]
const hireHref = `mailto:${profile.email}?subject=Project%20inquiry`

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, transform: 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ n, dark }) {
  return (
    <p className={`absolute right-5 top-28 font-sans text-sm tabular-nums md:right-10 ${dark ? 'text-white/40' : 'text-ink/40'}`}>
      <span className={dark ? 'text-white' : 'text-ink'}>0{n}</span>/04
    </p>
  )
}

function SectionTitle({ children, dark }) {
  return (
    <Reveal>
      <h2 className={`font-display text-[22vw] uppercase leading-[0.85] tracking-tight md:text-[11rem] ${dark ? 'text-white' : 'text-ink'}`}>
        /{children}
      </h2>
    </Reveal>
  )
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl bg-white/90 pl-3 pr-3 shadow-[0_8px_30px_rgba(14,14,14,0.08)] ring-1 ring-ink/5 backdrop-blur md:pl-4">
        <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
          <span className="grid size-10 place-items-center rounded-lg bg-ink text-white">
            <Aperture size={22} weight="bold" />
          </span>
          <span className="text-sm font-bold uppercase tracking-wide">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-wider md:flex">
          {nav.map(([label, href], i) => (
            <li key={href} className="flex items-center gap-3">
              {i > 0 && <span className="text-ink/30">/</span>}
              <a href={href} className="py-2 transition-colors hover:text-rec">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={hireHref}
          className="press rounded-lg border border-ink px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-ink hover:text-white"
        >
          Hire me
        </a>
      </nav>
    </header>
  )
}

function Portrait() {
  const [missing, setMissing] = useState(false)
  const reduce = useReducedMotion()
  if (missing)
    return (
      <div className="absolute bottom-0 left-1/2 z-10 flex h-[62dvh] w-[min(80vw,26rem)] -translate-x-1/2 items-center justify-center rounded-t-[12rem] border-2 border-dashed border-ink/25 bg-paper/60 p-8 text-center text-sm text-ink/60">
        Add your cut-out photo as <code className="mx-1 font-semibold">public/me.png</code>
      </div>
    )
  return (
    <motion.img
      src={profile.portrait}
      alt={profile.fullName}
      onError={() => setMissing(true)}
      initial={reduce ? false : { opacity: 0, transform: 'translate(-50%, 40px)' }}
      animate={{ opacity: 1, transform: 'translate(-50%, 0px)' }}
      transition={{ duration: 1, delay: 0.2, ease }}
      className="absolute bottom-0 left-1/2 z-10 h-[78dvh] max-w-none object-contain object-bottom md:h-[86dvh]"
    />
  )
}

function Hero() {
  const title = profile.roles.map((r) => `${r} / `).join('')
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-paper">
      <div className="absolute left-5 top-28 z-20 text-base font-medium leading-snug md:left-10 md:text-lg">
        {profile.heroLines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((i) => (
            <span key={i} className="whitespace-nowrap pr-[0.15em] font-display text-[34vw] uppercase leading-none text-ink md:text-[19rem]">
              {title}
            </span>
          ))}
        </div>
      </div>
      <h1 className="sr-only">
        {profile.fullName}, {profile.roles.join(', ')}
      </h1>
      <Portrait />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative bg-ink px-5 pb-24 pt-32 text-white md:px-10 md:pb-32">
      <Counter n={2} dark />
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div>
          <SectionTitle dark>About</SectionTitle>
          <ArrowUpRight size={120} weight="bold" className="mt-6 hidden text-white/30 md:block" aria-hidden="true" />
        </div>
        <Reveal delay={0.1} className="self-end">
          <p className="max-w-[56ch] text-lg leading-relaxed text-white/85">{about}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Student at {profile.school}
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 grid max-w-6xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.06}>
            <h3 className="font-display text-3xl uppercase">{g.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li key={t.name} className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-sm ring-1 ring-white/10">
                  {t.slug && (
                    <img src={`https://cdn.simpleicons.org/${t.slug}/ffffff`} alt="" width="16" height="16" loading="lazy" className="size-4" />
                  )}
                  {t.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WorkCard({ w, i }) {
  const Tag = w.href ? 'a' : 'div'
  return (
    <Tag
      {...(w.href && { href: w.href, target: '_blank', rel: 'noreferrer' })}
      className={`group block w-[82vw] shrink-0 snap-start sm:w-[24rem] ${i % 2 ? 'md:mt-14' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10" style={w.bg && { background: w.bg }}>
        <img
          src={w.image}
          alt={`${w.title} cover`}
          loading="lazy"
          className={`size-full transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-[1.03] ${
            w.fit === 'contain' ? 'object-contain p-8' : 'object-cover'
          }`}
        />
        <span className="absolute left-3 top-3 rounded-md bg-ink/75 px-2 font-display text-xl leading-8 text-white">0{i + 1}</span>
        {w.href && (
          <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white text-ink shadow-md ring-1 ring-ink/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight size={18} weight="bold" />
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-4xl uppercase leading-none">{w.title}</h3>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke">
        {w.kind}
        {w.year && <> <span className="mx-1">/</span> {w.year}</>}
      </p>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-ink/75">{w.blurb}</p>
    </Tag>
  )
}

function Works() {
  const rail = useRef(null)
  const scroll = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section id="works" className="relative bg-white px-5 pb-24 pt-32 md:px-10 md:pb-32">
      <Counter n={3} />
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Works</SectionTitle>
        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="max-w-[34ch] text-xl leading-snug md:text-2xl">
              Apps that people use every day, and stories told with a camera. Built and shot from start to finish.
            </p>
          </Reveal>
          <a
            href={hireHref}
            className="press grid size-36 shrink-0 place-items-center rounded-full border border-ink/20 text-center text-sm font-bold uppercase tracking-wider hover:bg-ink hover:text-white"
          >
            Hire me
          </a>
        </div>

        <div className="mt-16 flex items-center justify-end gap-2">
          <button onClick={() => scroll(-1)} aria-label="Previous works" className="press grid size-11 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-white">
            <ArrowLeft size={16} weight="bold" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next works" className="press grid size-11 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-white">
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </div>

      <div ref={rail} className="no-scrollbar mx-auto mt-6 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {works.map((w, i) => (
          <WorkCard key={w.title} w={w} i={i} />
        ))}
      </div>

      <Reveal className="mx-auto mt-24 max-w-6xl">
        <a
          href={award.href}
          target="_blank"
          rel="noreferrer"
          className="group grid items-center gap-8 rounded-2xl bg-paper p-5 md:grid-cols-[18rem_1fr] md:gap-14 md:p-8"
        >
          <img src={award.image} alt={`${award.place}, ${award.contest} certificate poster`} loading="lazy" className="w-full rounded-xl" />
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rec">
              <Trophy size={16} weight="fill" /> Recognition
            </p>
            <p className="mt-4 font-display text-7xl uppercase leading-[0.9] md:text-8xl">{award.place}</p>
            <p className="mt-3 text-xl font-semibold">{award.contest}</p>
            <p className="text-smoke">{award.org}</p>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-ink/80">
              Entry: <em>{award.entry}</em>. Produced with {award.team}.
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 group-hover:underline">
              View the post <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </a>
      </Reveal>
    </section>
  )
}

function Footer() {
  const links = [
    ['Email', `mailto:${profile.email}`],
    ['Facebook', profile.facebook],
    ['GitHub', profile.github],
  ]
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-5 pt-32 text-white md:px-10">
      <Counter n={4} dark />
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-16">
        <Reveal>
          <p className="font-display text-5xl uppercase leading-none md:text-7xl">Got a project?</p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block break-all text-lg text-white/80 underline-offset-4 hover:text-white hover:underline md:text-2xl">
            {profile.email}
          </a>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
          <ul className="space-y-2">
            {nav.map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-white/70 hover:text-white">{l}</a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s} className="text-white/70">{s}</li>
            ))}
          </ul>
          <ul className="col-span-2 space-y-2 md:col-span-1">
            {links.map(([l, h]) => (
              <li key={l}>
                <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="inline-flex items-center gap-1 text-white/70 hover:text-white">
                  {l} <ArrowUpRight size={12} weight="bold" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-20 select-none whitespace-nowrap text-center font-display text-[24vw] uppercase leading-[0.8] tracking-tight" aria-hidden="true">
        {profile.name}
      </p>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-white/10 py-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>Open for freelance work</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
      </main>
      <Footer />
    </>
  )
}
