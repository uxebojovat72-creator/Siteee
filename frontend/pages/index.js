import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
 
const TICKER_ITEMS = ['ПЕЙНТБОЛ','ЛАЗЕРТАГ','КВАДРОЦИКЛЫ','ДЖИПИНГ','ТИМБИЛДИНГ','ВЕРЁВОЧНЫЙ ПАРК','ДНИ РОЖДЕНИЯ','КОРПОРАТИВЫ']

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePark, setActivePark] = useState('bukhta')
  const [form, setForm] = useState({ name:'', phone:'', date:'', people:'', park:'Бухта Радости', activity:'Пейнтбол' })
  const [formStatus, setFormStatus] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatName, setChatName] = useState('')
  const [chatPhone, setChatPhone] = useState('')
  const [chatReady, setChatReady] = useState(false)
  const [chatSending, setChatSending] = useState(false)
  const [chatInteracted, setChatInteracted] = useState(false)
  const [chatSessionId, setChatSessionId] = useState(null)
  const [reviewsOpen, setReviewsOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(true)
  const [chatOpen, setChatOpen]     = useState(false)
  const [bubbles, setBubbles] = useState([
    { type:'in',  text:'Привет! Хочу организовать день рождения 🎉' },
    { type:'out', text:'Привет! Сколько гостей и какой возраст детей?' },
    { type:'in',  text:'10 детей, 7–10 лет, суббота 3 мая' },
    { type:'out', text:'Отлично! Для этого возраста идеально подойдёт лазертаг. Забронируем? ✅' },
  ])
  const bubblesRef = useRef(null)
  const pollRef = useRef(null)
  const lastSeenTsRef = useRef(0)

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

  useEffect(() => {
    if (bubblesRef.current) bubblesRef.current.scrollTop = bubblesRef.current.scrollHeight
  }, [bubbles])

  // Open booking accordion when navigated via anchor link
  useEffect(() => {
    const onHash = () => { if (window.location.hash === '#booking') setBookingOpen(true) }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Restore session from localStorage on page load / refresh
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('paintland_chat')
      if (!savedSession) return
      lastSeenTsRef.current = Date.now()
      setChatSessionId(savedSession)
      setChatReady(true)
      setChatInteracted(true)
      const savedName = localStorage.getItem('paintland_chat_name')
      const savedPhone = localStorage.getItem('paintland_chat_phone')
      if (savedName) setChatName(savedName)
      if (savedPhone) setChatPhone(savedPhone)
      fetch(`/api/messages?session=${savedSession}`)
        .then(r => r.ok ? r.json() : { messages: [] })
        .then(({ messages }) => {
          if (messages && messages.length > 0) {
            setBubbles(messages.map(m => ({ type: m.type, text: m.text })))
            // Poll only for messages newer than what we already loaded
            const maxTs = Math.max(...messages.map(m => m.ts))
            lastSeenTsRef.current = Math.max(lastSeenTsRef.current, maxTs)
          }
        })
        .catch(() => {})
    } catch {}
  }, [])

  // Poll for manager replies once the session is active
  useEffect(() => {
    if (!chatReady || !chatSessionId) return
    const poll = async () => {
      try {
        const res = await fetch(`/api/messages?session=${chatSessionId}`)
        if (!res.ok) return
        const { messages } = await res.json()
        const newOuts = messages.filter(m => m.type === 'out' && m.ts > lastSeenTsRef.current)
        if (newOuts.length > 0) {
          newOuts.forEach(m => setBubbles(prev => [...prev, { type:'out', text: m.text }]))
          lastSeenTsRef.current = Math.max(...newOuts.map(m => m.ts))
        }
      } catch {}
    }
    pollRef.current = setInterval(poll, 3000)
    return () => clearInterval(pollRef.current)
  }, [chatReady, chatSessionId])

  const closeMenu = () => setMenuOpen(false)

  const handleChatFocus = () => {
    if (!chatInteracted) {
      setChatInteracted(true)
      setBubbles([])
    }
  }

  const doSendChat = async (name, phone, message, existingSessionId) => {
    if (chatSending) return
    setChatSending(true)
    setBubbles(prev => [...prev, { type:'in', text: message }])
    setChatInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, hp: '', session_id: existingSessionId || undefined }),
      })
      if (res.ok || res.status === 201) {
        const data = await res.json()
        const sid = data.session_id
        if (sid) {
          setChatSessionId(sid)
          try {
            localStorage.setItem('paintland_chat', sid)
            localStorage.setItem('paintland_chat_name', name)
            localStorage.setItem('paintland_chat_phone', phone)
          } catch {}
        }
        // Set baseline only on first send — subsequent sends must NOT reset it
        // (resetting would cause manager replies arriving simultaneously to be skipped)
        if (!chatReady) lastSeenTsRef.current = Date.now()
        setChatReady(true)
        setBubbles(prev => [...prev, { type:'sys', text: 'Отправлено — менеджер ответит в чате ✓' }])
      } else {
        setBubbles(prev => [...prev, { type:'out', text: 'Что-то пошло не так. Позвоните нам: +7 (925) 010-85-35' }])
      }
    } catch {
      setBubbles(prev => [...prev, { type:'out', text: 'Нет соединения. Позвоните нам: +7 (925) 010-85-35' }])
    } finally {
      setChatSending(false)
    }
  }

  const handleFirstSend = (e) => {
    e.preventDefault()
    const v = chatInput.trim()
    if (!v || !chatName.trim() || !chatPhone.trim()) return
    doSendChat(chatName.trim(), chatPhone.trim(), v, null)
  }

  const handleReply = () => {
    const v = chatInput.trim()
    if (!v) return
    doSendChat(chatName, chatPhone, v, chatSessionId)
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setFormStatus('loading')
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://paintlandpark.ru'
    const res = await fetch(`${apiUrl}/api/web/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        date: form.date,
        people: String(form.people),
        park: form.park,
        activity: form.activity,
      }),
    })
    const data = await res.json()
    setFormStatus(data.status === 'ok' ? 'ok' : 'error')
  } catch {
    setFormStatus('error')
  }
  }

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
            { bg: "url('/photo_lasertag.jpg')", name: 'Лазертаг', price: 'от 600 ₽' },
            { bg: "url('/photo_atv.jpg')", name: 'Квадроциклы', price: 'от 15 000 ₽' },
            { bg: "url('/photo_uaz.jpg')", name: 'Джиппинг', price: 'Уточнить' },
            { bg: "url('/photo_ropepark.jpg')", name: 'Верёвочный парк', price: 'Уточнить' },
            { bg: "url('/photo_birthday.png')", name: 'День рождения', price: 'Именинникам', badge: 'Скидка 50%' },
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
      {/* ── GALLERY ── */}
      <section className="s" id="gallery" style={{ background: 'var(--bg2)' }}>
        <div className="s-eyebrow rv">Атмосфера</div>
        <h2 className="s-h rv">Как это выглядит</h2>
        <div className="gal-g">
          {[
            { img: '/photo_paintball.jpg', label: 'Пейнтбол', big: true },
            { img: '/photo_atv.jpg',       label: 'Квадроциклы' },
            { img: '/photo_uaz.jpg',       label: 'Джиппинг' },
            { img: '/photo_couple.jpg',    label: 'Снаряжение' },
            { img: '/photo_husky.jpg',     label: 'Хаски' },
          ].map(({ img, label, big }) => (
            <div className={`gal-c rv${big ? ' big' : ''}`} key={label}>
              <div className="gal-photo" style={{ backgroundImage: `url('${img}')` }} />
              <div className="gal-lbl">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="rev-bg s">
        <button className="acc-hdr rv" onClick={() => setReviewsOpen(o => !o)} aria-expanded={reviewsOpen}>
          <div>
            <div className="s-eyebrow">Отзывы</div>
            <h2 className="s-h">Что говорят наши гости</h2>
          </div>
          <span className={`acc-chev${reviewsOpen ? ' open' : ''}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </button>
        <div className={`acc-body${reviewsOpen ? ' open' : ''}`}>
          <div className="rev-g" style={{ paddingTop: 24 }}>
            {[
              { text: 'Организовали день рождения — лазертаг для детей. Инструктор всё объяснил, дети в полном восторге!', who: 'Наталья, мама троих детей' },
              { text: 'Отличный корпоратив! Всё включено, персонал доброжелательный, атмосфера уютная. Вернёмся снова!', who: 'Сергей, HR-директор' },
              { text: 'Приехали большой компанией. Квадроциклы, пейнтбол, шашлыки — идеально провели день!', who: 'Артур' },
            ].map(({ text, who }) => (
              <div className="rev" key={who}>
                <div className="rev-q">"</div>
                <div className="rev-stars">★ ★ ★ ★ ★</div>
                <div className="rev-txt">{text}</div>
                <div className="rev-who">— {who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="s" id="locations" style={{ background: 'var(--bg2)' }}>
        <div className="s-eyebrow rv">Наши площадки</div>
        <h2 className="s-h rv">Два парка<br />в Подмосковье</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 24 }} id="locCards">
          <div className="loc-card rv" onClick={() => window.location.href = '/bukhta'}>
            <div className="loc-card-img" style={{ backgroundImage: "url('/bukhta_banner.png')" }} />
            <div className="loc-card-body">
              <div className="loc-card-tag">📍 Мытищи</div>
              <div className="loc-card-name">Бухта Радости</div>
              <div className="loc-card-desc">На берегу Пироговского водохранилища. Сосновый лес, чистый воздух.</div>
              <Link href="/bukhta" className="loc-card-link" onClick={e => e.stopPropagation()}>Подробнее о парке →</Link>
            </div>
          </div>
          <div className="loc-card rv" onClick={() => window.location.href = '/sofrino'}>
            <div className="loc-card-img" style={{ backgroundImage: "url('/sofrino_banner.png')" }} />
            <div className="loc-card-body">
              <div className="loc-card-tag">📍 Пушкинский р-н</div>
              <div className="loc-card-name">Парк Софрино</div>
              <div className="loc-card-desc">Просторные поля и трассы для квадроциклов в экологически чистом районе.</div>
              <Link href="/sofrino" className="loc-card-link" onClick={e => e.stopPropagation()}>Подробнее о парке →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TELEGRAM ── */}
      <section className="s tg-sec" id="telegram" style={{ background: 'var(--forest)' }}>
        <div className="tg-inner rv">
          <div className="tg-text">
            <div className="tg-badge">✈️ Telegram Mini App</div>
            <h2 className="tg-h">Бронируйте в один клик через Telegram</h2>
            <p className="tg-desc">Наш бот позволяет выбрать дату, количество гостей и оплатить онлайн — всё не выходя из Telegram.</p>
            <a href="https://t.me/paintballclub_bot" target="_blank" rel="noreferrer" className="tg-btn">Открыть в Telegram →</a>
          </div>
          <div className="tg-qr rv">
            <div className="tg-qr-box">
              <div className="tg-qr-inner">
                <svg viewBox="0 0 100 100" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white" rx="8"/>
                  <rect x="8" y="8" width="26" height="26" fill="none" stroke="#2d5a3d" strokeWidth="3" rx="2"/>
                  <rect x="12" y="12" width="18" height="18" fill="#2d5a3d" rx="1"/>
                  <rect x="66" y="8" width="26" height="26" fill="none" stroke="#2d5a3d" strokeWidth="3" rx="2"/>
                  <rect x="70" y="12" width="18" height="18" fill="#2d5a3d" rx="1"/>
                  <rect x="8" y="66" width="26" height="26" fill="none" stroke="#2d5a3d" strokeWidth="3" rx="2"/>
                  <rect x="12" y="70" width="18" height="18" fill="#2d5a3d" rx="1"/>
                  <rect x="40" y="8" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="50" y="8" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="40" y="40" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="54" y="50" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="70" y="40" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="82" y="40" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="40" y="72" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="66" y="80" width="6" height="6" fill="#2d5a3d" rx="1"/>
                  <rect x="76" y="72" width="6" height="6" fill="#2d5a3d" rx="1"/>
                </svg>
              </div>
              <p className="tg-qr-label">Сканируй и бронируй</p>
            </div>
          </div>
        </div>
      </section>
      {/* ── BOOKING ── */}
      <section className="s" id="booking" style={{ background:'var(--white)' }}>
        <button className="acc-hdr rv" onClick={() => setBookingOpen(o => !o)} aria-expanded={bookingOpen}>
          <div>
            <div className="s-eyebrow">Бронирование</div>
            <h2 className="s-h">Оставить заявку</h2>
          </div>
          <span className={`acc-chev${bookingOpen ? ' open' : ''}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </button>
        <div className={`acc-body${bookingOpen ? ' open' : ''}`}>
        <div className="book-vis rv">
          <div className="book-photo" />
          <div className="book-deco">БРОНЬ</div>
          <div className="book-pill">⚡ Ответим за 15 минут</div>
        </div>
        {formStatus === 'ok' ? (
          <div className="rv" style={{ textAlign:'center', padding:'32px 0' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:12 }}>✅</div>
            <div style={{ fontFamily:'Geologica,sans-serif', fontWeight:700, fontSize:'1.1rem', color:'var(--forest)' }}>Заявка принята!</div>
            <p style={{ color:'var(--muted)', marginTop:8, fontSize:'.85rem' }}>Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form className="rv" onSubmit={handleSubmit}>
            <div className="form-g">
              <div className="fi">
                <label>Имя</label>
                <input type="text" placeholder="Иван Петров" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required />
              </div>
              <div className="fi">
                <label>Телефон</label>
                <input type="tel" placeholder="+7 (999) 000-00-00" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} required />
              </div>
              <div className="fi">
                <label>Дата</label>
                <input type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} />
              </div>
              <div className="fi">
                <label>Человек</label>
                <input type="number" placeholder="10" min="2" value={form.people} onChange={e => setForm(f=>({...f,people:e.target.value}))} />
              </div>
              <div className="fi">
                <label>Площадка</label>
                <select value={form.park} onChange={e => setForm(f=>({...f,park:e.target.value}))}>
                  <option>Бухта Радости</option>
                  <option>Парк Софрино</option>
                  <option>Выезд на объект</option>
                </select>
              </div>
              <div className="fi">
                <label>Активность</label>
                <select value={form.activity} onChange={e => setForm(f=>({...f,activity:e.target.value}))}>
                  <option>Пейнтбол</option><option>Лазертаг</option><option>Квадроциклы</option>
                  <option>Джиппинг</option><option>Тимбилдинг</option><option>День рождения</option>
                </select>
              </div>
              <div className="fi full">
                <button type="submit" className="btn-main" style={{ width:'100%', textAlign:'center', fontSize:'.88rem', padding:14 }} disabled={formStatus==='loading'}>
                  {formStatus==='loading' ? 'Отправляем...' : 'Отправить заявку →'}
                </button>
                <p style={{ fontSize:'.65rem', color:'var(--muted)', marginTop:8, textAlign:'center' }}>После подтверждения — ссылка на онлайн-оплату</p>
              </div>
            </div>
          </form>
        )}
        </div>
      </section>

      {/* ── CHAT ── */}
      <section className="chat-bg s">
        <button className="acc-hdr rv" onClick={() => setChatOpen(o => !o)} aria-expanded={chatOpen}>
          <div>
            <div className="s-eyebrow">Онлайн-поддержка</div>
            <h2 className="s-h">Напишите нам</h2>
            <p style={{ marginTop:6, fontSize:'.85rem', color:'var(--muted)', lineHeight:1.6, maxWidth:300 }}>Поможем выбрать программу и рассчитаем стоимость.</p>
          </div>
          <span className={`acc-chev${chatOpen ? ' open' : ''}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </button>
        <div className={`acc-body${chatOpen ? ' open' : ''}`}>
        <div className="chat-box rv">
          <div className="chat-head">
            <div className="chat-dot" />
            <div><div className="chat-nm">Пэйнтлэнд Парк</div><div className="chat-st">онлайн · отвечаем быстро</div></div>
          </div>
          <div className="bubbles" ref={bubblesRef}>
            {bubbles.map((b, i) => (
              b.type === 'sys'
                ? <div key={i} className="bub-sys">{b.text}</div>
                : <div key={i} className={`bub ${b.type}`}>{b.text}</div>
            ))}
            {chatSending && <div className="bub out chat-typing"><span /><span /><span /></div>}
          </div>
          {!chatReady ? (
            <form className="chat-pre-form" onSubmit={handleFirstSend} noValidate>
              <div className="chat-pre-fields">
                <input
                  type="text" placeholder="Ваше имя *" required
                  value={chatName} onChange={e => setChatName(e.target.value)}
                  onFocus={handleChatFocus}
                  className="chat-pre-inp"
                />
                <input
                  type="tel" placeholder="+7 (___) ___-__-__ *" required
                  value={chatPhone} onChange={e => setChatPhone(e.target.value)}
                  onFocus={handleChatFocus}
                  className="chat-pre-inp"
                />
              </div>
              {/* honeypot — hidden from real users */}
              <input type="text" name="website" value="" onChange={()=>{}} tabIndex={-1} aria-hidden="true" style={{ position:'absolute', left:'-9999px', opacity:0, pointerEvents:'none' }} />
              <div className="chat-inp">
                <input type="text" placeholder="Ваш вопрос..." value={chatInput} onChange={e => setChatInput(e.target.value)} onFocus={handleChatFocus} />
                <button type="submit" className="chat-send" disabled={chatSending || !chatName.trim() || !chatPhone.trim() || !chatInput.trim()}>→</button>
              </div>
              <p className="chat-pre-hint">Менеджер ответит вам по телефону и в чате</p>
            </form>
          ) : (
            <div className="chat-inp">
              <input type="text" placeholder="Ваш вопрос..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==='Enter' && handleReply()} />
              <button className="chat-send" onClick={handleReply} disabled={chatSending || !chatInput.trim()}>→</button>
            </div>
          )}
        </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-s">
        <div className="cta-photo" />
        <div className="cta-in">
          <div className="cta-badge">🎂 Специальное предложение</div>
          <div className="cta-h rv">
            Именинникам<br />
            <span className="hl">скидка 50%</span><br />
            <span className="dm">на пейнтбол</span>
          </div>
          <a href="#booking" className="btn-main" style={{ display:'inline-block', marginTop:28, padding:'14px 40px' }}>Хочу скидку →</a>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="s" style={{ background:'var(--white)' }}>
        <div className="s-eyebrow rv">Вопросы</div>
        <h2 className="s-h rv">Часто спрашивают</h2>
        <div className="rv" style={{ marginTop:20 }}>
          {[
            ['Со скольки лет можно играть в пейнтбол?', 'С 12 лет в присутствии родителей. Для младших — лазертаг (от 5 лет) и кидбол.'],
            ['Нужно привозить своё снаряжение?', 'Нет — всё необходимое предоставляется. Экипировка и инвентарь включены в стоимость пакета.'],
            ['Можно организовать корпоратив с выездом?', 'Да! Выезжаем на вашу территорию: дача, парк, офис, школа. Обсудим детали при бронировании.'],
            ['Как оплатить? Есть онлайн-оплата?', 'После подтверждения заявки присылаем ссылку на оплату. Принимаем карты, СБП и наличные на месте.'],
            ['Как получить скидку 50% именинникам?', 'Сообщите о дне рождения при бронировании — именинник получает скидку 50% на пейнтбол и лазертаг.'],
          ].map(([q, a]) => (
            <details className="fq" key={q}>
              <summary>{q}</summary>
              <div className="fq-body">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section className="s" id="contacts" style={{ background:'var(--bg2)' }}>
        <div className="s-eyebrow rv">Контакты</div>
        <h2 className="s-h rv">Как с нами связаться</h2>
        <div className="cc-g">
          {[
            { icon:'📞', label:'Телефон 1', val:'+7 (925) 010-85-35', sub:'Бухта Радости' },
            { icon:'📞', label:'Телефон 2', val:'+7 (985) 643-68-88', sub:'Парк Софрино' },
            { icon:'✉️', label:'Email',     val:'info888@plpark.ru',  sub:'Пишите нам', small:true },
            { icon:'🕐', label:'Работаем', val:'Ежедневно',           sub:'09:00 – 21:00' },
          ].map(({ icon, label, val, sub, small }) => (
            <div className="cc rv" key={label}>
              <div className="cc-icon">{icon}</div>
              <div className="cc-l">{label}</div>
              <div className="cc-v" style={small ? { fontSize:'.75rem' } : {}}>{val}</div>
              <div className="cc-s">{sub}</div>
            </div>
          ))}
        </div>
        <a href="https://paintballclub.ru/contacts/" target="_blank" rel="noreferrer" className="btn-sec" style={{ display:'inline-block', marginTop:20, borderColor:'var(--forest)', color:'var(--forest)' }}>
          Смотреть на карте →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-logo">
          <img src="/logo.png" alt="Логотип" className="foot-logo-img" />
          ПЭЙНТЛЭНД ПАРК
        </div>
        <p className="foot-desc">Активный отдых в Подмосковье. Пейнтбол, лазертаг, квадроциклы и тимбилдинг с 2008 года.</p>
        <nav className="foot-nav">
          <a href="#">Главная</a>
          <a href="#services">Услуги</a>
          <a href="#prices">Цены</a>
          <a href="#booking">Бронирование</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="foot-bot">
          <span>© 2026 Пэйнтлэнд Парк</span>
          <span>Актуально на апрель 2026</span>
        </div>
      </footer>
    </>
  )
}
