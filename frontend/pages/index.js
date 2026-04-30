import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const TICKER_ITEMS = ['ПЕЙНТБОЛ','ЛАЗЕРТАГ','КВАДРОЦИКЛЫ','ДЖИПИНГ','ТИМБИЛДИНГ','ВЕРЁВОЧНЫЙ ПАРК','ДНИ РОЖДЕНИЯ','КОРПОРАТИВЫ']

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePark, setActivePark] = useState('bukhta')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 55)
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (menuOpen && !e.target.closest('#mainNav') && !e.target.closest('.hdr-drawer')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <Head>
        <title>Пэйнтлэнд Парк — Активный отдых в Подмосковье</title>
        <meta name="description" content="Пейнтбол, лазертаг, квадроциклы и тимбилдинг в Подмосковье. Два парка — Бухта Радости и Софрино. Скидка 50% именинникам." />
        <meta name="keywords" content="пейнтбол Подмосковье, лазертаг дети, квадроциклы аренда, тимбилдинг корпоратив" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Пэйнтлэнд Парк — Активный отдых в Подмосковье" />
        <meta property="og:description" content="Пейнтбол, лазертаг, квадроциклы и тимбилдинг. Два парка. Скидка 50% именинникам." />
        <meta property="og:locale" content="ru_RU" />
        <meta name="theme-color" content="#2d5a3d" />
      </Head>

      {/* ── HEADER ── */}
      <nav id="mainNav">
        <a href="#" className="hdr-logo">
          <img src="/logo.png" alt="Логотип" className="hdr-logo-img" />
          ПЭЙНТЛЭНД ПАРК
        </a>
        <div className="hdr-links">
          <a href="#services">Услуги</a>
          <a href="#prices">Цены</a>
          <a href="#locations">Парки</a>
          <a href="#contacts">Контакты</a>
        </div>
        <a href="#booking" className="hdr-cta">Забронировать</a>
        <button
          className={`hdr-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Меню"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`hdr-drawer${menuOpen ? ' open' : ''}`}>
        <a href="#services" onClick={closeMenu}>Услуги</a>
        <a href="#prices" onClick={closeMenu}>Цены</a>
        <a href="#locations" onClick={closeMenu}>Парки</a>
        <a href="#contacts" onClick={closeMenu}>Контакты</a>
        <a href="#booking" className="hdr-drawer-cta" onClick={closeMenu}>Забронировать игру</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-tag">
            <div className="hero-tag-dot" />
            <span className="hero-tag-txt">Москва · Подмосковье · с 2008</span>
          </div>
          <h1 className="hero-title">
            ТЕРРИТОРИЯ
            <em>ВАШЕГО</em>
            <span className="hero-sub">отдыха в Подмосковье</span>
          </h1>
          <p className="hero-desc">Пейнтбол, лазертаг, квадроциклы и уютные беседки. Для детей от 5 лет, компаний и корпоративов.</p>
          <div className="park-switch">
            {[['bukhta','📍 Бухта Радости'],['sofrino','📍 Парк Софрино']].map(([key, label]) => (
              <button
                key={key}
                className={`park-btn${activePark === key ? ' active' : ''}`}
                onClick={() => setActivePark(key)}
              >{label}</button>
            ))}
          </div>
          <div className="hero-btns">
            <a href="#booking" className="btn-main">Забронировать →</a>
            <a href="#services" className="btn-sec">Наши услуги</a>
          </div>
          <div className="hero-stats">
            <div className="hs"><div className="hs-n">15+</div><div className="hs-l">лет опыта</div></div>
            <div className="hs"><div className="hs-n">2</div><div className="hs-l">парка</div></div>
            <div className="hs"><div className="hs-n">50К+</div><div className="hs-l">игроков</div></div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <span className="ticker-t">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>
              <img src="/logo.png" alt="" className="ticker-logo" />
              {item}&nbsp;&nbsp;
            </span>
          ))}
        </span>
      </div>
    </>
  )
}
