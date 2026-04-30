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
      {/* ── SERVICES ── */}
      <section className="svc-bg s" id="services">
        <div className="s-eyebrow rv">Что мы предлагаем</div>
        <h2 className="s-h rv">Наши форматы<br />отдыха</h2>
        <div className="svc-g">
          {[
            { bg: "url('/photo_paintball.jpg')", name: 'Пейнтбол', price: 'от 1 600 ₽' },
            { bg: 'linear-gradient(135deg,#0a0f1a,#1a2850)', name: 'Лазертаг', price: 'от 600 ₽' },
            { bg: "url('/photo_atv.jpg')", name: 'Квадроциклы', price: 'от 15 000 ₽' },
            { bg: "url('/photo_uaz.jpg')", name: 'Джипинг / УАЗ', price: 'Уточнить' },
            { bg: 'linear-gradient(135deg,#0e1f0a,#2a5014)', name: 'Верёвочный парк', price: 'Уточнить' },
            { bg: 'linear-gradient(135deg,#1f0e0a,#501428)', name: 'День рождения', price: 'Именинникам', badge: 'Скидка 50%' },
          ].map(({ bg, name, price, badge }) => (
            <div className="svc-c rv" key={name}>
              <div className="svc-photo" style={{ backgroundImage: bg }} />
              <div className="svc-overlay" />
              {badge && <div className="svc-badge">{badge}</div>}
              <div className="svc-bot">
                <div className="svc-n">{name}</div>
                <div className="svc-p">{price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-bg s">
        <div className="about-i">
          <div className="about-vis rv">
            <div className="about-photo" />
            <div className="about-badge">🌿 С 2008 года</div>
          </div>
          <div className="about-tx">
            <div className="s-eyebrow rv">О нас</div>
            <h2 className="s-h rv">Пэйнтлэнд Парк — место, где отдыхают семьи</h2>
            <p className="rv">Мы создаём безопасные и уютные пространства для активного отдыха на природе с 2008 года. Два парка в Подмосковье — каждый с собственным характером.</p>
            <p className="rv">Подходит для детей от 5 лет, подростков, компаний и корпоративов. Выезжаем на ваш объект.</p>
            <div className="feat-g rv">
              {[
                { icon: '🏞️', name: 'Бухта Радости', val: 'Мытищи, у водохранилища' },
                { icon: '🌲', name: 'Парк Софрино', val: 'Пушкинский р-н' },
                { icon: '🚗', name: 'Выезд к вам', val: 'Дача, школа, офис' },
                { icon: '📅', name: 'Работаем', val: 'Ежедневно 09–21' },
              ].map(({ icon, name, val }) => (
                <div className="feat" key={name}>
                  <div className="feat-icon">{icon}</div>
                  <div className="feat-n">{name}</div>
                  <div className="feat-v">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <div className="nums">
        {[['15+','лет опыта'],['2','парка'],['50К+','игроков'],['100%','безопасно']].map(([n, l]) => (
          <div className="num rv" key={l}>
            <div className="num-n">{n}</div>
            <div className="num-l">{l}</div>
          </div>
        ))}
      </div>

      {/* ── PRICING ── */}
      <section className="price-bg s" id="prices">
        <div className="s-eyebrow rv">Стоимость</div>
        <h2 className="s-h rv">Цены и пакеты</h2>
        <div className="price-g">
          <div className="pc rv">
            <div className="pc-name">Старт</div>
            <div className="pc-price">600 <span>₽/чел</span></div>
            <ul className="pc-ul">
              <li>Лазертаг 1 час</li><li>Базовая экипировка</li><li>Инструктор</li><li>От 5 лет</li>
            </ul>
            <a href="#booking" className="btn-main" style={{ display: 'block', textAlign: 'center' }}>Записаться</a>
          </div>
          <div className="pc hot rv">
            <div className="pc-badge">ХИТ</div>
            <div className="pc-name">Пейнтбол PRO</div>
            <div className="pc-price">1 600 <span>₽/чел</span></div>
            <ul className="pc-ul">
              <li>Пейнтбол 2 часа</li><li>Полная экипировка</li><li>200 шаров включено</li><li>Профи инструктор</li><li>Сценарная игра</li>
            </ul>
            <a href="#booking" className="btn-main" style={{ display: 'block', textAlign: 'center' }}>Записаться</a>
          </div>
          <div className="pc rv">
            <div className="pc-name">Корпоратив</div>
            <div className="pc-price">2 000 <span>₽/чел</span></div>
            <ul className="pc-ul">
              <li>Тимбилдинг под ключ</li><li>Несколько активностей</li><li>Беседка с мангалом</li><li>Ведущий и аниматор</li>
            </ul>
            <a href="#booking" className="btn-main" style={{ display: 'block', textAlign: 'center' }}>Записаться</a>
          </div>
        </div>
        <Link href="/prices" className="prices-all rv">
          <div>
            <div className="prices-all-tag">Полный прайс-лист</div>
            <div className="prices-all-title">Все программы и цены на услуги</div>
            <div className="prices-all-sub">Лазертаг, пейнтбол, тимбилдинг, квадроциклы, джипинг, зимние активности и спецпредложения школам</div>
          </div>
          <div className="prices-all-arr">→</div>
        </Link>
      </section>
    </>
  )
}
