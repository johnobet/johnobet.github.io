import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { animate, AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Code,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  GithubLogo,
  Images as ImagesIcon,
  MapPin,
  Moon,
  Play,
  Sun,
  Trophy,
  VideoCamera,
  X,
} from '@phosphor-icons/react'
import { profile, about, stack, stats, heroFacts, photos, videos, apps, categories, harpooner, award, services } from './content'

const ease = [0.23, 1, 0.32, 1]
const nav = [
  ['Home', 'top'],
  ['About', 'about'],
  ['Works', 'works'],
  ['Contact', 'contact'],
]
const year = new Date().getFullYear()
const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=Project%20inquiry`
const icons = { photography: Camera, videography: VideoCamera, development: Code }

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, transform: 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ kicker, title, text }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold text-accent">{kicker}</p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted">{text}</p>}
    </Reveal>
  )
}

// One-time welcome screen, skipped on later visits in the same tab.
function Loader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    try {
      return !reduce && !sessionStorage.getItem('welcomed')
    } catch {
      return !reduce
    }
  })
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem('welcomed', '1')
      } catch {
        // Private mode: the welcome just plays again next time.
      }
    }, 1700)
    return () => clearTimeout(t)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-bg px-6 text-center"
          exit={{ opacity: 0, transform: 'translateY(-24px)' }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.div initial={{ opacity: 0, transform: 'translateY(16px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease }}>
            <p className="text-sm font-semibold text-accent">Welcome to my portfolio</p>
            <p className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">{profile.fullName}</p>
            <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full origin-left rounded-full bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const reduce = useReducedMotion()
  const toggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0c1214' : '#f6f8f9')
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
      className="press grid size-11 place-items-center rounded-full text-muted ring-1 ring-line hover:text-fg"
    >
      {dark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
    </button>
  )
}

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(([, id]) => io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [])
  return active
}

function Nav() {
  const active = useActiveSection()
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="text-lg font-bold tracking-tight text-accent">
          {profile.name}
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            {nav.map(([label, id]) => (
              <li key={id} className="relative">
                <a href={`#${id}`} className={`block py-2 transition-colors hover:text-fg ${active === id ? 'text-fg' : 'text-muted'}`}>
                  {label}
                </a>
                {active === id && <motion.span layoutId="nav-line" className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }} />}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

function Typed({ words }) {
  const reduce = useReducedMotion()
  const [word, setWord] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (reduce) return
    const full = length === words[word].length
    const t = setTimeout(
      () => {
        if (!deleting && full) return setDeleting(true)
        if (deleting && length === 0) {
          setDeleting(false)
          return setWord((word + 1) % words.length)
        }
        setLength(length + (deleting ? -1 : 1))
      },
      !deleting && full ? 1600 : deleting ? 35 : 75,
    )
    return () => clearTimeout(t)
  }, [word, length, deleting, reduce, words])
  return (
    <span aria-hidden="true">
      {reduce ? words[0] : words[word].slice(0, length)}
      <span className="caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] bg-accent" />
    </span>
  )
}

function Socials() {
  const links = [
    ['Facebook', profile.facebook, FacebookLogo],
    ['GitHub', profile.github, GithubLogo],
    ['Email', gmailHref, EnvelopeSimple],
  ]
  return (
    <ul className="flex gap-2">
      {links.map(([label, href, Icon]) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="press grid size-11 place-items-center rounded-xl bg-surface text-muted ring-1 ring-line hover:text-accent">
            <Icon size={20} weight="bold" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Portrait() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      initial={reduce ? false : { opacity: 0, transform: 'translateY(32px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 1, delay: 0.3, ease }}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-accent-soft to-surface ring-1 ring-line">
        <img src={profile.portrait} alt={profile.fullName} fetchPriority="high" className="size-full object-contain object-bottom pt-6" />
      </div>
      {heroFacts.map((f, i) => (
        <motion.div
          key={f.label}
          className={`absolute rounded-2xl bg-surface/90 px-4 py-3 shadow-lg ring-1 ring-line backdrop-blur ${i ? 'bottom-10 right-2 md:-right-6' : 'left-2 top-10 md:-left-6'}`}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, delay: i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="text-lg font-bold leading-tight text-accent">{f.value}</p>
          <p className="text-xs text-muted">{f.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden px-5 pb-20 pt-28 lg:min-h-[100dvh] lg:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
              <MapPin size={15} weight="fill" /> {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Developer &<span className="block text-accent">Visual Storyteller</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 h-8 text-xl font-medium md:text-2xl">
              <span className="sr-only">{profile.roles.join(', ')}</span>
              <Typed words={profile.roles} />
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{profile.lead}</p>
          </Reveal>
          <Reveal delay={0.32}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.chips.map((c) => (
                <li key={c} className="rounded-lg bg-surface px-3 py-1.5 text-sm ring-1 ring-line">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#works" className="press inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-on-accent hover:bg-accent-strong">
              View my works <ArrowDown size={16} weight="bold" />
            </a>
            <a href="#contact" className="press inline-flex h-12 items-center rounded-xl bg-surface px-6 text-sm font-semibold ring-1 ring-line hover:ring-accent">
              Contact
            </a>
            <Socials />
          </Reveal>
        </div>
        <Portrait />
      </div>
    </section>
  )
}

function CountUp({ n, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || reduce) return
    const run = animate(0, n, { duration: 1.4, ease, onUpdate: (v) => (ref.current.textContent = `${Math.round(v)}${suffix}`) })
    return () => run.stop()
  }, [inView, reduce, n, suffix])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function About() {
  return (
    <section id="about" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="About me" title="Code and camera, one storyteller" />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[64ch] text-center text-lg leading-relaxed text-muted">{about}</p>
          <p className="mt-4 text-center text-sm text-muted">Student at {profile.school}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="lift rounded-2xl bg-surface p-6 ring-1 ring-line">
                <p className="text-4xl font-bold tracking-tight text-accent">
                  <CountUp n={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06}>
              <h3 className="text-sm font-semibold">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t.name} className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-sm text-muted ring-1 ring-line">
                    {t.slug && <img src={`https://cdn.simpleicons.org/${t.slug}/14a08f`} alt="" width="14" height="14" loading="lazy" className="size-3.5" />}
                    {t.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function useFilter(items) {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(items.map((x) => x.cat))]
  return { cat, setCat, cats, shown: cat === 'All' ? items : items.filter((x) => x.cat === cat) }
}

function Filters({ id, filter }) {
  return (
    <div role="group" aria-label={`Filter ${id} by category`} className="flex flex-wrap justify-center gap-1 rounded-2xl bg-surface p-1 ring-1 ring-line sm:mx-auto sm:w-fit sm:rounded-full">
      {filter.cats.map((c) => {
        const on = c === filter.cat
        return (
          <button
            key={c}
            onClick={() => filter.setCat(c)}
            aria-pressed={on}
            className={`press relative min-h-11 rounded-full px-4 text-sm font-medium ${on ? 'text-on-accent' : 'text-muted hover:text-fg'}`}
          >
            {on && <motion.span layoutId={`chip-${id}`} className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }} />}
            <span className="relative">{c}</span>
          </button>
        )
      })}
    </div>
  )
}

// Filtered-out items fade away while the rest slide into the free space.
function FilterItem({ children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  )
}

function MediaCard({ item, onOpen }) {
  const Tag = onOpen ? 'button' : 'a'
  const action = onOpen ? { type: 'button', onClick: () => onOpen(item) } : { href: item.href, target: '_blank', rel: 'noreferrer' }
  return (
    <Tag {...action} className="lift group block h-full w-full overflow-hidden rounded-2xl bg-surface text-left ring-1 ring-line">
      <span className="relative block aspect-[3/2] overflow-hidden bg-line">
        <img
          src={item.cover}
          alt={`${item.title} cover`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
        />
        {item.views && <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">{item.views}</span>}
        <span className="absolute bottom-3 right-3 flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full bg-white px-3 text-sm font-semibold text-[#0f1c24] shadow-md">
          {item.images ? (
            <>
              <ImagesIcon size={16} weight="bold" /> {item.images.length}
            </>
          ) : item.views ? (
            <Play size={16} weight="fill" />
          ) : (
            <ArrowUpRight size={16} weight="bold" />
          )}
        </span>
      </span>
      <span className="block p-4">
        <span className="block font-semibold tracking-tight">{item.title}</span>
        <span className="mt-0.5 block text-xs font-medium text-accent">
          {item.cat}
          {item.year && ` · ${item.year}`}
        </span>
        <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted">{item.blurb}</span>
      </span>
    </Tag>
  )
}

function Gallery({ id, items, onOpen }) {
  const filter = useFilter(items)
  return (
    <>
      <Filters id={id} filter={filter} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {filter.shown.map((item) => (
            <FilterItem key={item.title}>
              <MediaCard item={item} onOpen={onOpen} />
            </FilterItem>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

// Native <dialog> for the focus trap and Esc. It stays open during the exit fade, then closes on unmount.
function Lightbox({ item, onClose }) {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const total = item.images.length
  const go = (step) => setI((n) => (n + step + total) % total)

  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    const root = document.documentElement
    dialog.showModal()
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = ''
      dialog.close()
      opener?.focus({ preventScroll: true })
    }
  }, [])

  const arrow = 'press grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-white/25 hover:bg-white hover:text-[#0f1c24]'
  return (
    <motion.dialog
      ref={ref}
      aria-label={`${item.title} photos`}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-[#0c1214] p-4 text-white backdrop:bg-transparent md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto grid h-full max-w-5xl grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xl font-bold tracking-tight">{item.title}</p>
            <p className="text-sm text-white/60">
              {item.cat} · {i + 1} of {total}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close photos" className={arrow}>
            <X size={18} weight="bold" />
          </button>
        </div>
        <div className="relative grid min-h-0 place-items-center overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={item.images[i]}
              src={item.images[i]}
              alt={`${item.title}, photo ${i + 1} of ${total}`}
              className="max-h-full max-w-full rounded-xl object-contain md:min-w-[60%]"
              initial={reduce ? false : { opacity: 0, transform: 'scale(0.98)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            />
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-4">
          <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
            Full album on Facebook <ArrowUpRight size={14} weight="bold" />
          </a>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous photo" className={arrow}>
              <ArrowLeft size={16} weight="bold" />
            </button>
            <button onClick={() => go(1)} aria-label="Next photo" className={arrow}>
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </motion.dialog>
  )
}

function Photography() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <Gallery id="photography" items={photos} onOpen={setOpen} />
      <a href={harpooner.href} target="_blank" rel="noreferrer" className="group mt-8 flex items-center justify-center gap-3 text-sm font-semibold">
        <img src={harpooner.logo} alt="" loading="lazy" className="size-10 rounded-full object-cover ring-1 ring-line" />
        <span className="underline-offset-4 group-hover:underline">More on {harpooner.name}</span>
        <ArrowUpRight size={14} weight="bold" />
      </a>
      <AnimatePresence>{open && <Lightbox key={open.title} item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}

function Videography() {
  return (
    <>
      <Gallery id="videography" items={videos} />
      <a href={award.href} target="_blank" rel="noreferrer" className="lift group mt-8 grid items-center gap-6 rounded-2xl bg-surface p-4 ring-1 ring-line sm:grid-cols-[9rem_1fr] md:p-5">
        <img src={award.image} alt={`${award.place}, ${award.contest} certificate poster`} loading="lazy" className="w-full rounded-xl" />
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Trophy size={16} weight="fill" /> {award.place}
          </p>
          <p className="mt-1 text-lg font-semibold tracking-tight">{award.contest}</p>
          <p className="text-sm text-muted">{award.org}</p>
          <p className="mt-2 text-sm text-muted">
            <em>{award.entry}</em>, with {award.team}.
          </p>
        </div>
      </a>
    </>
  )
}

function Tags({ tags }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="rounded-lg bg-accent-soft px-2.5 py-1 text-sm font-medium text-accent">
          {t}
        </li>
      ))}
    </ul>
  )
}

// Plays muted only while on screen, so the page doesn't download the video until someone reaches it.
function DemoVideo({ app }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    if (inView) ref.current.play().catch(() => {})
    else ref.current.pause()
  }, [inView, reduce])
  return <video ref={ref} src={app.video} poster={app.poster} aria-label={`${app.title} demo video`} className="aspect-video w-full bg-black" muted loop playsInline controls preload="none" />
}

function AppFeature({ app }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
      <DemoVideo app={app} />
      <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={app.icon} alt="" loading="lazy" className="size-12 rounded-xl bg-[#0f5f5c] object-contain p-2" />
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{app.title}</h3>
              <p className="text-xs font-medium text-accent">
                {app.kind} · {app.year}
              </p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-muted">{app.blurb}</p>
          <Tags tags={app.tags} />
          <a href={app.apk.href} download className="press mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-strong">
            <DownloadSimple size={18} weight="bold" /> Download for Android
          </a>
          <p className="mt-2 text-xs text-muted">APK · {app.apk.size} · Your phone may ask you to allow the install.</p>
        </div>
        <ul className="self-center">
          {app.features.map((f) => (
            <li key={f} className="flex gap-3 border-t border-line py-3 text-sm leading-relaxed first:border-t-0">
              <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" /> {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function AppCard({ app }) {
  return (
    <a href={app.href} target="_blank" rel="noreferrer" className={`lift group grid overflow-hidden rounded-2xl bg-surface ring-1 ring-line ${app.image ? 'md:grid-cols-2' : ''}`}>
      {app.image && (
        <span className="block overflow-hidden bg-line">
          <img
            src={app.image}
            alt={`${app.title} home page`}
            loading="lazy"
            className="aspect-[16/10] size-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
          />
        </span>
      )}
      <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{app.title}</h3>
          <p className="text-xs font-medium text-accent">
            {app.kind} · {app.year}
          </p>
          <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">{app.blurb}</p>
          <Tags tags={app.tags} />
        </div>
        <span className="grid size-11 place-items-center rounded-full ring-1 ring-line transition-colors group-hover:bg-accent group-hover:text-on-accent group-hover:ring-accent">
          <ArrowUpRight size={18} weight="bold" />
        </span>
      </div>
    </a>
  )
}

function Development() {
  const filter = useFilter(apps)
  return (
    <>
      <Filters id="development" filter={filter} />
      <div className="mt-8 grid gap-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {filter.shown.map((app) => (
            <FilterItem key={app.title}>{app.video ? <AppFeature app={app} /> : <AppCard app={app} />}</FilterItem>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

const bodies = { photography: <Photography />, videography: <Videography />, development: <Development /> }

function CategoryCard({ c, on, compact, onClick }) {
  const Icon = icons[c.id]
  return (
    <button
      onClick={onClick}
      aria-expanded={on}
      aria-controls="works-panel"
      className={`group relative w-full overflow-hidden rounded-2xl bg-[#0f1c24] text-left text-white transition-[height,box-shadow] duration-500 ease-[var(--ease-out-strong)] ${
        compact ? 'h-24 md:h-28' : 'h-56 md:h-96'
      } ${on ? 'ring-[3px] ring-accent' : 'ring-1 ring-line'}`}
    >
      <img src={c.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <span className="absolute inset-x-0 bottom-0 block p-3 md:p-5">
        <Icon size={22} weight="bold" className={compact ? 'hidden md:block' : ''} />
        <span className="mt-1 block text-sm font-semibold tracking-tight md:text-2xl">{c.title}</span>
        {!compact && <span className="hidden text-sm text-white/75 md:block">{c.items.length} projects</span>}
      </span>
    </button>
  )
}

function Works() {
  const [openId, setOpenId] = useState(null)
  const cards = useRef(null)
  const reduce = useReducedMotion()
  const open = categories.find((c) => c.id === openId)

  useEffect(() => {
    if (openId) cards.current.scrollIntoView({ block: 'start' })
  }, [openId])

  return (
    <section id="works" className="scroll-mt-16 bg-tint px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Portfolio showcase" title="My works" text="Pick a card to see the projects." />
        <div ref={cards} className="mt-10 grid scroll-mt-[4.75rem] grid-cols-3 gap-3 md:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <CategoryCard c={c} on={c.id === openId} compact={!!openId} onClick={() => setOpenId(c.id === openId ? null : c.id)} />
            </Reveal>
          ))}
        </div>
        <div id="works-panel">
          <AnimatePresence mode="wait" initial={false}>
            {open && (
              <motion.div
                key={open.id}
                className="pt-8"
                initial={reduce ? false : { opacity: 0, transform: 'translateY(20px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="mx-auto mb-6 max-w-[56ch] text-center text-muted">{open.intro}</p>
                {bodies[open.id]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
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
    <button onClick={copy} className="press inline-flex h-12 items-center gap-2 rounded-xl bg-bg px-5 text-sm font-semibold ring-1 ring-line hover:ring-accent">
      {copied ? <Check size={18} weight="bold" /> : <Copy size={18} weight="bold" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Contact" title="Got a project?" text="Open for freelance work in apps, photo coverage and video." />
        <div className="mt-10 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="h-full rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8">
              <h3 className="text-2xl font-bold tracking-tight">Say hello</h3>
              <p className="mt-2 break-all text-muted">{profile.email}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={gmailHref} target="_blank" rel="noreferrer" className="press inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-strong">
                  <EnvelopeSimple size={18} weight="bold" /> Email me
                </a>
                <CopyEmail />
              </div>
              <div className="mt-6">
                <Socials />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8">
              <h3 className="text-2xl font-bold tracking-tight">What I do</h3>
              <ul className="mt-4">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-3 border-t border-line py-3 text-sm first:border-t-0">
                    <Check size={18} weight="bold" className="shrink-0 text-accent" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
      <footer className="border-t border-line px-5 py-6 text-center text-sm text-muted">
        © {year} {profile.fullName}
      </footer>
    </>
  )
}
