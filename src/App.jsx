import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  Aperture,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  EnvelopeSimple,
  Images as ImagesIcon,
  Moon,
  Play,
  Sun,
  Trophy,
  X,
} from '@phosphor-icons/react'
import { profile, about, stack, photos, videos, apps, harpooner, award, services } from './content'

const ease = [0.23, 1, 0.32, 1]
const nav = [
  ['About', '#about'],
  ['Photography', '#photography'],
  ['Videography', '#videography'],
  ['Development', '#development'],
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
      <span className={dark ? 'text-white' : 'text-fg'}>0{n}</span>/06
    </p>
  )
}

function SectionTitle({ children, dark, compact }) {
  return (
    <MaskText
      className={`pb-[0.04em] font-display uppercase leading-[0.88] tracking-tight ${
        compact ? 'text-[15vw] md:text-[7.5rem] lg:text-[10rem]' : 'text-[22vw] md:text-[11rem]'
      } ${dark ? 'text-white' : 'text-fg'}`}
    >
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
        <ul className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] lg:flex">
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

function useFilter(items) {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(items.map((x) => x.cat))]
  return { cat, setCat, cats, shown: cat === 'All' ? items : items.filter((x) => x.cat === cat) }
}

function Filters({ id, items, filter, dark }) {
  return (
    <Reveal className="mt-10">
      <div role="group" aria-label={`Filter ${id} by category`} className="flex flex-wrap gap-2">
        {filter.cats.map((c) => {
          const on = c === filter.cat
          const count = c === 'All' ? items.length : items.filter((x) => x.cat === c).length
          const idle = dark ? 'text-white/70 ring-white/15 hover:text-white' : 'text-fg/70 ring-fg/15 hover:text-fg'
          return (
            <button
              key={c}
              onClick={() => filter.setCat(c)}
              aria-pressed={on}
              className={`press relative rounded-full px-4 py-3 text-sm font-medium ring-1 ring-inset ${
                on ? `ring-transparent ${dark ? 'text-ink' : 'text-on-fg'}` : idle
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`chip-${id}`}
                  className={`absolute inset-0 rounded-full ${dark ? 'bg-white' : 'bg-fg'}`}
                  transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                />
              )}
              <span className="relative">
                {c}
                <span className="ml-2 font-mono text-[11px] opacity-60">{count}</span>
              </span>
            </button>
          )
        })}
      </div>
    </Reveal>
  )
}

// Wipes its content in from the bottom the first time it scrolls into view.
function Wipe({ className = '', children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease }}
    >
      {children}
    </motion.div>
  )
}

// Keyed children fade out, and the rest slide into the free space, when a filter changes.
function FilterItem({ className = '', children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      layout={!reduce}
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  )
}

function MediaCard({ item, dark, onOpen }) {
  const Tag = onOpen ? 'button' : 'a'
  const action = onOpen ? { type: 'button', onClick: () => onOpen(item) } : { href: item.href, target: '_blank', rel: 'noreferrer' }
  return (
    <Tag {...action} className="group block w-full text-left">
      <Wipe className={`relative aspect-[3/2] overflow-hidden rounded-xl ${dark ? 'bg-white/10' : 'bg-fg/10'}`}>
        <img
          src={item.cover}
          alt={`${item.title} cover`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
        />
        {item.views && <span className="absolute left-3 top-3 rounded-md bg-ink/75 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white">{item.views}</span>}
        <span className="absolute bottom-3 right-3 flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-ink shadow-md ring-1 ring-black/10 transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-105">
          {item.images ? (
            <>
              <ImagesIcon size={18} weight="bold" /> {item.images.length}
            </>
          ) : item.views ? (
            <Play size={18} weight="fill" />
          ) : (
            <ArrowUpRight size={18} weight="bold" />
          )}
        </span>
      </Wipe>
      <h3 className="mt-5 font-display text-4xl uppercase leading-none tracking-wide">{item.title}</h3>
      <p className={`mt-2 font-mono text-[11px] uppercase tracking-[0.1em] ${dark ? 'text-white/55' : 'text-smoke'}`}>
        {item.cat}
        {item.year && <> <span className="mx-1">/</span> {item.year}</>}
      </p>
      <p className={`mt-3 max-w-[46ch] text-sm leading-relaxed ${dark ? 'text-white/75' : 'text-fg/75'}`}>{item.blurb}</p>
    </Tag>
  )
}

function Gallery({ id, items, dark, onOpen }) {
  const filter = useFilter(items)
  return (
    <>
      <Filters id={id} items={items} filter={filter} dark={dark} />
      <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {filter.shown.map((item, i) => (
            <FilterItem key={item.title} className={i % 2 ? 'sm:mt-14' : ''}>
              <MediaCard item={item} dark={dark} onOpen={onOpen} />
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

  const arrow = 'press grid size-11 shrink-0 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-ink'
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
      className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-ink p-4 text-white backdrop:bg-transparent md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto grid h-full max-w-5xl grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-display text-2xl uppercase tracking-wide md:text-3xl">{item.title}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/55">
              {item.cat} <span className="mx-1">/</span> {i + 1} of {total}
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
              className="max-h-full max-w-full rounded-lg object-contain md:min-w-[60%]"
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

function WorkSection({ id, n, title, intro, dark, children }) {
  return (
    <section
      id={id}
      className={`relative px-5 pb-24 pt-32 md:px-10 md:pb-32 dark:border-t dark:border-white/[0.06] ${dark ? 'bg-ink text-white' : 'bg-canvas text-fg'}`}
    >
      <Counter n={n} dark={dark} />
      <div className="mx-auto max-w-6xl">
        <SectionTitle dark={dark} compact>
          {title}
        </SectionTitle>
        <Reveal>
          <p className="mt-6 max-w-[38ch] text-xl leading-snug tracking-tight md:text-2xl">{intro}</p>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

function Photography() {
  const [open, setOpen] = useState(null)
  return (
    <WorkSection id="photography" n={3} title="Photography" intro="Campus life as it happens, from ceremonies and stages to the people behind the paper.">
      <Gallery id="photography" items={photos} onOpen={setOpen} />
      <Reveal className="mt-16">
        <a href={harpooner.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-sm font-semibold">
          <img src={harpooner.logo} alt="" loading="lazy" className="size-11 rounded-full object-cover ring-1 ring-fg/10" />
          <span className="underline-offset-4 group-hover:underline">More on {harpooner.name}</span>
          <ArrowUpRight size={14} weight="bold" />
        </a>
      </Reveal>
      <AnimatePresence>{open && <Lightbox key={open.title} item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </WorkSection>
  )
}

function Videography() {
  return (
    <WorkSection id="videography" n={4} title="Videography" intro="Highlights and documentaries shot for The Harpooner. Each one opens on Facebook." dark>
      <Gallery id="videography" items={videos} dark />
      <Reveal className="mt-24">
        <a
          href={award.href}
          target="_blank"
          rel="noreferrer"
          className="group grid items-center gap-8 rounded-2xl bg-panel p-5 text-fg md:grid-cols-[18rem_1fr] md:gap-14 md:p-8"
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
    </WorkSection>
  )
}

function Tags({ tags }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="rounded-lg bg-fg/[0.06] px-3 py-2 text-sm ring-1 ring-fg/10">
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
  return (
    <Wipe className="overflow-hidden rounded-2xl bg-ink ring-1 ring-fg/10">
      <video
        ref={ref}
        src={app.video}
        poster={app.poster}
        aria-label={`${app.title} demo video`}
        className="aspect-video w-full"
        muted
        loop
        playsInline
        controls
        preload="none"
      />
    </Wipe>
  )
}

function AppFeature({ app }) {
  return (
    <article>
      <DemoVideo app={app} />
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div className="flex items-center gap-4">
            <img src={app.icon} alt="" loading="lazy" className="size-14 rounded-xl bg-[#0f5f5c] object-contain p-2" />
            <div>
              <h3 className="font-display text-5xl uppercase leading-none tracking-wide">{app.title}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">
                {app.kind} <span className="mx-1">/</span> {app.year}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-fg/80">{app.blurb}</p>
          <Tags tags={app.tags} />
        </Reveal>
        <ul className="self-center">
          {app.features.map((f, i) => (
            <Reveal key={f} delay={i * 0.07}>
              <li className="flex gap-3 border-t border-fg/10 py-4 text-sm leading-relaxed">
                <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-rec" /> {f}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </article>
  )
}

function AppCard({ app }) {
  return (
    <a href={app.href} target="_blank" rel="noreferrer" className="group grid gap-6 rounded-2xl bg-panel p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
      <div>
        <h3 className="font-display text-4xl uppercase leading-none tracking-wide">{app.title}</h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">
          {app.kind} <span className="mx-1">/</span> {app.year}
        </p>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-fg/80">{app.blurb}</p>
        <Tags tags={app.tags} />
      </div>
      <span className="press grid size-11 place-items-center rounded-full border border-fg/20 group-hover:bg-fg group-hover:text-on-fg">
        <ArrowUpRight size={18} weight="bold" />
      </span>
    </a>
  )
}

function Development() {
  const filter = useFilter(apps)
  return (
    <WorkSection id="development" n={5} title="Development" intro="Apps built end to end, from the database and API to the screen in your hand.">
      <Filters id="development" items={apps} filter={filter} />
      <div className="mt-10 grid gap-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {filter.shown.map((app) => (
            <FilterItem key={app.title}>{app.video ? <AppFeature app={app} /> : <AppCard app={app} />}</FilterItem>
          ))}
        </AnimatePresence>
      </div>
    </WorkSection>
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
      <Counter n={6} dark />
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
        <Photography />
        <Videography />
        <Development />
      </main>
      <Footer />
    </>
  )
}
