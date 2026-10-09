import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  Aperture,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  EnvelopeSimple,
  Moon,
  Sun,
  Trophy,
} from '@phosphor-icons/react'
import { profile, about, stack, works, award, services } from './content'

const ease = [0.23, 1, 0.32, 1]
const nav = [
  ['About', '#about'],
  ['Works', '#works'],
  ['Contact', '#contact'],
]
// mailto: does nothing on PCs without an email app, so Hire me goes to the contact options instead.
const hireHref = '#contact'
const year = new Date().getFullYear()
const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=Project%20inquiry`

// Waits for the web fonts so the giant hero type doesn't jump from the fallback font mid-animation.
function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const done = () => setReady(true)
    document.fonts?.ready.then(done)
    const t = setTimeout(done, 1500)
    return () => clearTimeout(t)
  }, [])
  return ready
}

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

// Big type that slides up from behind a mask. The observed element is the unclipped wrapper.
function MaskText({ as = 'h2', className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={`overflow-hidden ${className}`}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
      {...rest}
    >
      <motion.span
        className="block"
        variants={{ hidden: { transform: 'translateY(105%)' }, shown: { transform: 'translateY(0%)' } }}
        transition={{ duration: 0.9, ease }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

function Counter({ n, dark }) {
  return (
    <p className={`absolute right-5 top-28 font-mono text-xs tabular-nums md:right-10 ${dark ? 'text-white/40' : 'text-fg/40'}`}>
      <span className={dark ? 'text-white' : 'text-fg'}>0{n}</span>/04
    </p>
  )
}

function SectionTitle({ children, dark }) {
  return (
    <MaskText className={`pb-[0.04em] font-display text-[22vw] uppercase leading-[0.88] tracking-tight md:text-[11rem] ${dark ? 'text-white' : 'text-fg'}`}>
      /{children}
    </MaskText>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const reduce = useReducedMotion()
  const toggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#161616' : '#e8e8e6')
      flushSync(() => setTheme(next))
    }
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode: the choice just won't be remembered.
    }
    if (!document.startViewTransition || reduce) return apply()
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="press grid size-11 place-items-center rounded-full border border-fg/15 hover:bg-fg/5"
    >
      {dark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
    </button>
  )
}

function Nav() {
  const reduce = useReducedMotion()
  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-40 px-4"
      initial={reduce ? false : { opacity: 0, transform: 'translateY(-16px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.8, delay: 0.1, ease }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl bg-pill pl-3 pr-3 text-fg shadow-[0_8px_30px_rgba(14,14,14,0.08)] ring-1 ring-fg/10 backdrop-blur-md md:pl-4">
        <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
          <span className="grid size-10 place-items-center rounded-lg bg-fg text-on-fg">
            <Aperture size={22} weight="bold" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] md:flex">
          {nav.map(([label, href], i) => (
            <li key={href} className="flex items-center gap-3">
              {i > 0 && <span className="text-fg/30">/</span>}
              <a href={href} className="py-2 transition-colors hover:text-rec">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={hireHref}
            className="press rounded-lg border border-fg px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-fg hover:text-on-fg"
          >
            Hire me
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

function Portrait() {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [missing, setMissing] = useState(false)
  const reduce = useReducedMotion()
  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [])
  if (missing)
    return (
      <div className="absolute bottom-0 left-1/2 z-10 flex h-[62dvh] w-[min(80vw,26rem)] -translate-x-1/2 items-center justify-center rounded-t-[12rem] border-2 border-dashed border-fg/25 p-8 text-center text-sm text-fg/60">
        Add your cut-out photo as <code className="mx-1 font-mono font-semibold">public/me.webp</code>
      </div>
    )
  // Waits for the image to load, then rises in with a blur so it eases into focus instead of popping.
  const hidden = reduce
    ? { opacity: 0, transform: 'translate(-50%, 0px) scale(1)', filter: 'blur(0px)' }
    : { opacity: 0, transform: 'translate(-50%, 56px) scale(1.04)', filter: 'blur(16px)' }
  return (
    <motion.img
      ref={ref}
      src={profile.portrait}
      alt={profile.fullName}
      fetchPriority="high"
      onLoad={() => setLoaded(true)}
      onError={() => setMissing(true)}
      initial={hidden}
      animate={loaded ? { opacity: 1, transform: 'translate(-50%, 0px) scale(1)', filter: 'blur(0px)' } : hidden}
      transition={{ duration: reduce ? 0.4 : 1.4, delay: 0.35, ease }}
      style={{ transformOrigin: '50% 100%' }}
      className="absolute bottom-0 left-1/2 z-10 h-[78dvh] max-w-none object-contain object-bottom md:h-[86dvh]"
    />
  )
}

function Hero() {
  const fontsReady = useFontsReady()
  const reduce = useReducedMotion()
  const title = profile.roles.map((r) => `${r} / `).join('')
  const show = (delay) => ({
    initial: reduce ? false : { opacity: 0, transform: 'translateY(20px)' },
    animate: fontsReady ? { opacity: 1, transform: 'translateY(0px)' } : undefined,
    transition: { duration: 0.9, delay, ease },
  })
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-paper text-fg">
      <div className="hero-spot pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute left-5 top-28 z-20 text-base font-medium leading-snug md:left-10 md:text-lg">
        {profile.heroLines.map((l, i) => (
          <motion.p key={l} {...show(0.15 + i * 0.08)}>
            {l}
          </motion.p>
        ))}
      </div>
      <motion.div className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none" aria-hidden="true" {...show(0.05)}>
        <div className="marquee-track flex w-max">
          {[0, 1].map((i) => (
            <span key={i} className="whitespace-nowrap pr-[0.15em] font-display text-[34vw] uppercase leading-none md:text-[19rem]">
              {title}
            </span>
          ))}
        </div>
      </motion.div>
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
          <ArrowUpRight size={120} weight="bold" className="mt-6 hidden text-white/25 md:block" aria-hidden="true" />
        </div>
        <Reveal delay={0.1} className="self-end">
          <p className="max-w-[56ch] text-lg leading-relaxed text-white/85 md:text-xl md:leading-relaxed">{about}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-white/50">Student at {profile.school}</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 grid max-w-6xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.06}>
            <h3 className="font-display text-3xl uppercase tracking-wide">{g.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-sm ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/[0.12]"
                >
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

const cardIn = {
  hidden: { opacity: 0, transform: 'translateY(32px)' },
  shown: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.8, ease } },
}

function WorkCard({ w, i }) {
  const Tag = w.href ? motion.a : motion.div
  return (
    <Tag
      variants={cardIn}
      {...(w.href && { href: w.href, target: '_blank', rel: 'noreferrer' })}
      className={`group block w-[82vw] shrink-0 snap-start sm:w-[24rem] ${i % 2 ? 'md:mt-14' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-fg/10 ring-1 ring-fg/10" style={w.bg && { background: w.bg }}>
        <img
          src={w.image}
          alt={`${w.title} cover`}
          loading="lazy"
          className={`size-full transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04] ${
            w.fit === 'contain' ? 'object-contain p-8' : 'object-cover'
          }`}
        />
        <span className="absolute left-3 top-3 rounded-md bg-ink/75 px-2 font-display text-xl leading-8 text-white">0{i + 1}</span>
        {w.href && (
          <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white text-ink opacity-0 shadow-md ring-1 ring-black/10 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight size={18} weight="bold" />
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-4xl uppercase leading-none tracking-wide">{w.title}</h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">
        {w.kind}
        {w.year && <> <span className="mx-1">/</span> {w.year}</>}
      </p>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-fg/75">{w.blurb}</p>
    </Tag>
  )
}

function Works() {
  const rail = useRef(null)
  const reduce = useReducedMotion()
  const scroll = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })
  const arrow = 'press grid size-11 place-items-center rounded-full border border-fg/15 hover:bg-fg hover:text-on-fg'
  return (
    <section id="works" className="relative bg-canvas px-5 pb-24 pt-32 text-fg md:px-10 md:pb-32 dark:border-t dark:border-white/[0.06]">
      <Counter n={3} />
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Works</SectionTitle>
        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="max-w-[34ch] text-xl leading-snug tracking-tight md:text-2xl">
              Apps that people use every day, and stories told with a camera. Built and shot from start to finish.
            </p>
          </Reveal>
          <a
            href={hireHref}
            className="press grid size-36 shrink-0 place-items-center rounded-full border border-fg/20 text-center text-sm font-semibold uppercase tracking-[0.14em] hover:bg-fg hover:text-on-fg"
          >
            Hire me
          </a>
        </div>

        <div className="mt-16 flex items-center justify-end gap-2">
          <button onClick={() => scroll(-1)} aria-label="Previous works" className={arrow}>
            <ArrowLeft size={16} weight="bold" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next works" className={arrow}>
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </div>

      <motion.div
        ref={rail}
        className="no-scrollbar mx-auto mt-6 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        initial={reduce ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {works.map((w, i) => (
          <WorkCard key={w.title} w={w} i={i} />
        ))}
      </motion.div>

      <Reveal className="mx-auto mt-24 max-w-6xl">
        <a
          href={award.href}
          target="_blank"
          rel="noreferrer"
          className="group grid items-center gap-8 rounded-2xl bg-panel p-5 md:grid-cols-[18rem_1fr] md:gap-14 md:p-8"
        >
          <img src={award.image} alt={`${award.place}, ${award.contest} certificate poster`} loading="lazy" className="w-full rounded-xl" />
          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-rec">
              <Trophy size={16} weight="fill" /> Recognition
            </p>
            <p className="mt-4 font-display text-7xl uppercase leading-[0.9] md:text-8xl">{award.place}</p>
            <p className="mt-3 text-xl font-semibold tracking-tight">{award.contest}</p>
            <p className="text-smoke">{award.org}</p>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-fg/80">
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

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(profile.email)
      ok = true
    } catch {
      // Older or embedded browsers: copy through a temporary text field.
      const t = document.createElement('textarea')
      t.value = profile.email
      t.style.position = 'fixed'
      t.style.opacity = '0'
      document.body.appendChild(t)
      t.select()
      ok = document.execCommand('copy')
      t.remove()
    }
    if (!ok) return window.prompt('Copy my email:', profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="press inline-flex h-12 items-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-white/10">
      {copied ? <Check size={18} weight="bold" /> : <Copy size={18} weight="bold" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

function Footer() {
  const links = [
    ['Gmail', gmailHref],
    ['Facebook', profile.facebook],
    ['GitHub', profile.github],
  ]
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-5 pt-32 text-white md:px-10 dark:border-t dark:border-white/[0.06]">
      <Counter n={4} dark />
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-16">
        <MaskText as="p" className="font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          Got a project?
        </MaskText>
        <Reveal delay={0.1}>
          <p className="mt-4 break-all text-lg text-white/80 md:text-2xl">{profile.email}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={gmailHref}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex h-12 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold uppercase tracking-[0.12em] text-ink hover:bg-white/85"
            >
              <EnvelopeSimple size={18} weight="bold" /> Email me
            </a>
            <CopyEmail />
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
          <ul className="space-y-2">
            {nav.map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-white/70 transition-colors hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s} className="text-white/70">
                {s}
              </li>
            ))}
          </ul>
          <ul className="col-span-2 space-y-2 md:col-span-1">
            {links.map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/70 transition-colors hover:text-white">
                  {l} <ArrowUpRight size={12} weight="bold" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MaskText as="p" className="mt-20 select-none whitespace-nowrap text-center font-display text-[24vw] uppercase leading-[0.8] tracking-tight" aria-hidden="true">
        {profile.name}
      </MaskText>
      <div className="mx-auto flex max-w-6xl justify-between gap-4 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
        <span>© {year} {profile.fullName}</span>
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
