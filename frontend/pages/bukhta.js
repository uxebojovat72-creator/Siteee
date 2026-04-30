import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Bukhta() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 55);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const burger = document.getElementById('burger');
      const drawer = document.getElementById('drawer');
      if (burger && drawer && !burger.contains(e.target) && !drawer.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const activities = [
    { img: '/bukhta_action2.jpg',    badge: 'С 12 лет',  name: 'Пейнтбол',     price: 'от 1 800 ₽' },
    { img: null,                      badge: 'От 5 лет',  name: 'Лазертаг',     price: 'от 600 ₽',   gradient: 'linear-gradient(135deg,#060d1a,#101e40)' },
    { img: null,                      badge: 'От 8 лет',  name: 'Арчеритаг',    price: 'от 1 500 ₽', gradient: 'linear-gradient(135deg,#1a0e06,#3d2010)' },
    { img: '/photo_atv.jpg',          badge: null,        name: 'Квадроциклы',  price: 'от 2 500 ₽' },
    { img: '/photo_uaz.jpg',          badge: null,        name: 'Джипинг / УАЗ',price: 'Уточнить' },
    { img: '/photo_husky.jpg',        badge: null,        name: 'Хаски',         price: 'Уточнить' },
  ];

  const infra = [
    { icon: '🌊', name: 'Пироговское водохранилище', desc: 'Парк расположен прямо на берегу — уникальный вид и свежий воздух' },
    { icon: '🌲', name: 'Сосновый лес',               desc: 'Игровые поля среди настоящего леса — природные укрытия и атмосфера' },
    { icon: '🏕️', name: 'Беседки и юрты',            desc: 'Уютные беседки с мангалами, юрты и большой шатёр для любого размера компании' },
    { icon: '🔥', name: 'Мангальные зоны',            desc: 'Оборудованные мангальные зоны с дровами и необходимым инвентарём' },
    { icon: '🐕', name: 'Площадка с животными',       desc: 'Хаски, кролики и другие животные — особый восторг для детей' },
    { icon: '🎯', name: 'Специализированные поля',    desc: 'Отдельные поля для пейнтбола, лазертага и арчеритага с профессиональным оборудованием' },
    { icon: '🏍️', name: 'Трассы для квадроциклов',   desc: 'Маршруты по лесу и вдоль водохранилища — для детей и взрослых' },
    { icon: '🛡️', name: 'Полная экипировка',          desc: 'Маски, комбинезоны, перчатки — всё чистое, продезинфицированное' },
    { icon: '🅿️', name: 'Парковка',                   desc: 'Бесплатная парковка на территории парка' },
  ];

  const tickerItems = ['ПЕЙНТБОЛ','ЛАЗЕРТАГ','АРЧЕРИТАГ','КВАДРОЦИКЛЫ','ХАСКИ','ДНИ РОЖДЕНИЯ','КОРПОРАТИВЫ'];

  return (
    <>
      <Head>
        <title>Бухта Радости — Пэйнтлэнд Парк | Активный отдых в Мытищах</title>
        <meta name="description" content="Пейнтбол, лазертаг, квадроциклы и активный отдых на берегу Пироговского водохранилища. Беседки, мангалы, хаски. Мытищинский район Подмосковья." />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* HEADER */}
      <nav id="mainNav">
        <Link href="/" className="hdr-logo">
          <img src="/logo.png" alt="Логотип" className="hdr-logo-img" />
          ПЭЙНТЛЭНД ПАРК
        </Link>
        <div className="hdr-links">
          <Link href="/#services">Услуги</Link>
          <Link href="/prices">Цены</Link>
          <Link href="/#locations">Парки</Link>
          <Link href="/#contacts">Контакты</Link>
        </div>
        <Link href="/" className="hdr-back">← На главную</Link>
        <button
          className={`hdr-burger${menuOpen ? ' open' : ''}`}
          id="burger"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`hdr-drawer${menuOpen ? ' open' : ''}`} id="drawer">
        <Link href="/" className="drawer-back" onClick={() => setMenuOpen(false)}>← На главную</Link>
        <Link href="/#services" onClick={() => setMenuOpen(false)}>Услуги</Link>
        <Link href="/prices" onClick={() => setMenuOpen(false)}>Цены</Link>
        <Link href="/#locations" onClick={() => setMenuOpen(false)}>Парки</Link>
        <Link href="/#contacts" onClick={() => setMenuOpen(false)}>Контакты</Link>
        <Link href="/#booking" className="drawer-cta" onClick={() => setMenuOpen(false)}>Забронировать игру</Link>
      </div>

      {/* HERO */}
      <section className="hero">
        <div
          className="hero-img"
          style={{ backgroundImage: "url('/bukhta_action1.jpg')", backgroundPosition: 'center 40%' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-breadcrumb">
            <Link href="/">Главная</Link>
            <span>›</span>
            <Link href="/#locations">Наши парки</Link>
            <span>›</span>
            <span className="current">Бухта Радости</span>
          </div>
          <div className="hero-tag">
            <div className="hero-tag-dot" />
            <span className="hero-tag-txt">Мытищи · Пироговское водохранилище</span>
          </div>
          <h1 className="hero-title">
            БУХТА
            <em>РАДОСТИ</em>
            <span className="hero-sub">парк активного отдыха</span>
          </h1>
          <p className="hero-desc">Пейнтбол, лазертаг, квадроциклы и уютные беседки на берегу Пироговского водохранилища. Сосновый лес, чистый воздух и 15+ лет опыта.</p>
          <div className="hero-btns">
            <Link href="/#booking" className="btn-main">Забронировать →</Link>
            <a href="#activities" className="btn-sec">Активности</a>
          </div>
          <div className="hero-stats">
            <div className="hs"><div className="hs-n">15+</div><div className="hs-l">лет опыта</div></div>
            <div className="hs"><div className="hs-n">6</div><div className="hs-l">активностей</div></div>
            <div className="hs"><div className="hs-n">50К+</div><div className="hs-l">гостей</div></div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <span className="ticker-t">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i}><img src="/logo.png" alt="" className="ticker-logo" /> {t} &nbsp;&nbsp;</span>
          ))}
        </span>
      </div>

      {/* ABOUT */}
      <section className="s" style={{ background: 'var(--white)' }} id="about">
        <div className="s-eyebrow rv">О парке</div>
        <h2 className="s-h rv">Место, где лес<br />встречает водохранилище</h2>
        <p className="s-lead rv">
          «Бухта Радости» — живописный парк активного отдыха на берегу Пироговского водохранилища
          в Мытищинском районе Подмосковья. Сосновый лес, чистый воздух и вода создают идеальную
          атмосферу для отдыха — от детского дня рождения до корпоратива.
        </p>
        <p className="s-lead rv" style={{ marginTop: '10px' }}>
          На территории парка расположены специализированные игровые поля, беседки с мангалами,
          юрты, большой шатёр и площадка для животных. Работаем с 2008 года.
        </p>
        <div className="feature-card rv">
          <div className="feature-bg" style={{ backgroundImage: "url('/bukhta_banner.png')" }} />
          <div className="feature-overlay" />
          <div className="feature-body">
            <div className="feature-pill">🌊 Уникально</div>
            <div className="feature-title">На берегу<br />водохранилища</div>
            <div className="feature-desc">
              Единственный парк активного отдыха прямо у воды — Пироговское водохранилище,
              сосновый лес и свежий воздух. Идеальное место для отдыха с семьёй или коллегами.
            </div>
            <div className="feature-tags">
              <span className="feature-tag">Пироговское вдхр.</span>
              <span className="feature-tag">Сосновый лес</span>
              <span className="feature-tag">Беседки и юрты</span>
              <span className="feature-tag">Хаски</span>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="s" id="activities" style={{ background: 'var(--bg2)' }}>
        <div className="s-eyebrow rv">Что попробовать</div>
        <h2 className="s-h rv">Активности в парке</h2>
        <div className="act-g">
          {activities.map((a, i) => (
            <div className="act-c rv" key={i}>
              <div
                className="act-photo"
                style={a.img
                  ? { backgroundImage: `url('${a.img}')` }
                  : { background: a.gradient }}
              />
              <div className="act-overlay" />
              {a.badge && <div className="act-badge">{a.badge}</div>}
              <div className="act-bot">
                <div className="act-name">{a.name}</div>
                <div className="act-age">{a.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }} className="rv">
          <Link href="/prices" className="btn-main">Полный прайс-лист →</Link>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="s" style={{ background: 'var(--white)' }}>
        <div className="s-eyebrow rv">Территория</div>
        <h2 className="s-h rv">Инфраструктура парка</h2>
        <p className="s-lead rv">Всё необходимое для комфортного и безопасного отдыха — на месте. Работаем ежедневно с 9:00 до 21:00.</p>
        <div className="infra-g">
          {infra.map((item, i) => (
            <div className="infra-c rv" key={i}>
              <div className="infra-icon">{item.icon}</div>
              <div className="infra-name">{item.name}</div>
              <div className="infra-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTE */}
      <section className="s" style={{ background: 'var(--bg2)' }} id="route">
        <div className="s-eyebrow rv">Навигация</div>
        <h2 className="s-h rv">Как добраться</h2>
        <p className="s-lead rv">Московская область, Мытищинский р-н, пос. Пироговский, берег Пироговского водохранилища.</p>
        <div className="route-g">
          <div className="route-c rv">
            <div className="route-icon">🚂</div>
            <div>
              <div className="route-name">На электричке</div>
              <div className="route-text">
                С <strong>Ярославского вокзала</strong> до станции <strong>Мытищи</strong>,
                далее автобус <strong>№22</strong> или маршрутка до остановки «Пироговский».
              </div>
            </div>
          </div>
          <div className="route-c rv">
            <div className="route-icon">🚗</div>
            <div>
              <div className="route-name">На автомобиле</div>
              <div className="route-text">
                По <strong>Ярославскому шоссе</strong> до Мытищ, затем по указателям
                на Пироговское водохранилище. Бесплатная парковка на территории.
              </div>
            </div>
          </div>
          <div className="route-c rv">
            <div className="route-icon">🗺️</div>
            <div>
              <div className="route-name">На карте</div>
              <div className="route-text">
                <a href="https://yandex.ru/maps/?pt=37.7423,55.9461&z=15" target="_blank" rel="noreferrer">
                  Открыть в Яндекс Картах →
                </a>
                <br />
                <span style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                  Координаты: 55.9461, 37.7423
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="map-wrap rv" style={{ marginTop: '24px', borderRadius: '20px', overflow: 'hidden' }}>
          <img src="/bukhta_map.jpg" alt="Карта Бухты Радости" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* CONTACTS */}
      <section className="s" id="contacts" style={{ background: 'var(--white)' }}>
        <div className="s-eyebrow rv">Связаться</div>
        <h2 className="s-h rv">Контакты парка</h2>
        <div className="cc-g">
          <div className="cc rv">
            <div className="cc-icon">📞</div>
            <div className="cc-l">Телефон</div>
            <div className="cc-v"><a href="tel:+79250108535">+7 (925) 010-85-35</a></div>
            <div className="cc-s">Звоните и пишите</div>
          </div>
          <div className="cc rv">
            <div className="cc-icon">✉️</div>
            <div className="cc-l">Email</div>
            <div className="cc-v" style={{ fontSize: '.75rem' }}>
              <a href="mailto:info888@plpark.ru">info888@plpark.ru</a>
            </div>
            <div className="cc-s">Пишите нам</div>
          </div>
          <div className="cc rv">
            <div className="cc-icon">🕐</div>
            <div className="cc-l">Режим работы</div>
            <div className="cc-v">Ежедневно</div>
            <div className="cc-s">09:00 – 21:00</div>
          </div>
          <div className="cc rv">
            <div className="cc-icon">📍</div>
            <div className="cc-l">Адрес</div>
            <div className="cc-v" style={{ fontSize: '.72rem' }}>
              Мытищинский р-н,<br />пос. Пироговский
            </div>
            <div className="cc-s">Пироговское вдхр.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-s">
        <div
          className="cta-photo"
          style={{ backgroundImage: "url('/bukhta_action1.jpg')", backgroundPosition: 'center 30%' }}
        />
        <div className="cta-in">
          <div className="cta-badge">🌊 Бронируйте прямо сейчас</div>
          <div className="cta-h rv">Ждём вас<br />в <span className="hl">Бухте Радости</span></div>
          <p className="cta-sub rv">Оставьте заявку — ответим за 15 минут</p>
          <Link
            href="/#booking"
            className="btn-main"
            style={{ display: 'inline-block', marginTop: '24px', padding: '15px 40px' }}
          >
            Забронировать игру →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="ft-inner">
          <div>
            <Link href="/" className="ft-logo">
              <img src="/logo.png" alt="Логотип" className="ft-logo-img" />
              ПЭЙНТЛЭНД ПАРК
            </Link>
            <p className="ft-desc">Активный отдых в Подмосковье. Пейнтбол, лазертаг, квадроциклы и тимбилдинг с 2008 года.</p>
          </div>
          <div>
            <div className="ft-nav-title">Контакты</div>
            <div className="ft-contacts">
              <a href="tel:+79250108535">📞 +7 (925) 010-85-35</a>
              <a href="tel:+79856436888">📞 +7 (985) 643-68-88</a>
              <a href="mailto:info888@plpark.ru">✉️ info888@plpark.ru</a>
            </div>
          </div>
          <div>
            <div className="ft-nav-title">Навигация</div>
            <nav className="ft-nav">
              <Link href="/">← Главная</Link>
              <Link href="/sofrino">Парк Софрино</Link>
              <Link href="/prices">Цены</Link>
              <Link href="/#booking">Бронирование</Link>
              <Link href="/#contacts">Контакты</Link>
            </nav>
          </div>
          <div className="ft-bot">
            <span>© 2026 Пэйнтлэнд Парк</span>
            <span>Бухта Радости · Мытищи</span>
          </div>
        </div>
      </footer>
    </>
  );
}
