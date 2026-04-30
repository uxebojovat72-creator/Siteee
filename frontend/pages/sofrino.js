import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Sofrino() {
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
    { img: '/photo_paintball.jpg', badge: 'С 12 лет', name: 'Пейнтбол', price: 'от 1 800 ₽' },
    { img: '/sofrino_lasertag.jpg', badge: 'От 5 лет', name: 'Лазертаг', price: 'от 600 ₽' },
    { img: '/sofrino_archery.jpg', badge: 'От 8 лет', name: 'Арчеритаг', price: 'от 1 500 ₽' },
    { img: '/sofrino_quads.jpg', badge: null, name: 'Квадроциклы', price: 'от 2 500 ₽' },
    { img: '/sofrino_quest.jpg', badge: null, name: 'Квесты', price: 'от 2 000 ₽' },
    { img: '/sofrino_husky1.jpg', badge: null, name: 'Хаски и упряжки', price: 'Уточнить' },
  ];

  const infra = [
    { icon: '🏚️', name: 'Заброшенное здание', desc: 'Трёхэтажная локация для сценариев городского боя — уникально для Подмосковья' },
    { icon: '🌲', name: 'Лесные поля', desc: 'Просторные площадки с природными и искусственными укрытиями' },
    { icon: '🏍️', name: 'Авторские трассы', desc: 'Лесные маршруты для квадроциклов — разработаны инструкторами парка' },
    { icon: '🔥', name: 'Отапливаемая зона', desc: 'Тёплое пространство для отдыха между играми — удобно зимой' },
    { icon: '🍕', name: 'Питание на месте', desc: 'Пицца и ресторанное меню — не нужно привозить еду с собой' },
    { icon: '🚿', name: 'Раздевалки', desc: 'Просторные раздевалки для переодевания и хранения вещей' },
    { icon: '🔫', name: 'Оружейная', desc: 'Выдача снаряжения, масок, маркеров и защитной экипировки' },
    { icon: '🐕', name: 'Хаски и упряжки', desc: 'Фотосессии, хаскитерапия, зимой — собачьи и оленьи упряжки' },
    { icon: '🅿️', name: 'Парковка', desc: 'Удобная бесплатная парковка у входа в парк' },
  ];

  const tickerItems = ['ПЕЙНТБОЛ','ЛАЗЕРТАГ','КВАДРОЦИКЛЫ','АРЧЕРИТАГ','ХАСКИ','ДЖИПИНГ','ТИМБИЛДИНГ'];

  return (
    <>
      <Head>
        <title>Парк Софрино — Пэйнтлэнд Парк | Пейнтбол и активный отдых</title>
        <meta name="description" content="Пейнтбол, лазертаг, квадроциклы и активный отдых в Пушкинском районе Подмосковья. Лесные трассы, заброшенное здание для игр, хаски. Работаем круглый год." />
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
          style={{ backgroundImage: "url('/sofrino_hero.jpg')", backgroundPosition: 'center 45%' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-breadcrumb">
            <Link href="/">Главная</Link>
            <span>›</span>
            <Link href="/#locations">Наши парки</Link>
            <span>›</span>
            <span className="current">Парк Софрино</span>
          </div>
          <div className="hero-tag">
            <div className="hero-tag-dot" />
            <span className="hero-tag-txt">Пушкинский район · Круглый год</span>
          </div>
          <h1 className="hero-title">
            ПАРК
            <em>СОФРИНО</em>
            <span className="hero-sub">экстрим в лесных угодьях</span>
          </h1>
          <p className="hero-desc">Пейнтбол, лазертаг, квадроциклы и авторские трассы в Пушкинском районе. Уникальная площадка с заброшенным зданием и лесными полями — работаем круглый год.</p>
          <div className="hero-btns">
            <Link href="/#booking" className="btn-main">Забронировать →</Link>
            <a href="#activities" className="btn-sec">Активности</a>
          </div>
          <div className="hero-stats">
            <div className="hs"><div className="hs-n">60</div><div className="hs-l">игроков макс.</div></div>
            <div className="hs"><div className="hs-n">12+</div><div className="hs-l">сценариев</div></div>
            <div className="hs"><div className="hs-n">365</div><div className="hs-l">дней в году</div></div>
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
        <h2 className="s-h rv">Экстрим в лесу —<br />круглый год</h2>
        <p className="s-lead rv">
          Парк Софрино — уникальная площадка для пейнтбола и лазертага в Пушкинском районе Подмосковья.
          В отличие от стандартных полей, здесь есть настоящий лес, авторские трассы для квадроциклов и
          заброшенное трёхэтажное здание — идеальная локация для тактических сценариев городского боя.
        </p>
        <p className="s-lead rv" style={{ marginTop: '10px' }}>
          Парк вмещает до 60 игроков одновременно и работает <strong>круглый год</strong> в любую погоду.
          Отапливаемая зона отдыха, питание на месте и профессиональные инструкторы — всё включено.
        </p>
        <div className="feature-card rv">
          <div className="feature-bg" style={{ backgroundImage: "url('/sofrino_archery_target.jpg')" }} />
          <div className="feature-overlay" />
          <div className="feature-body">
            <div className="feature-pill">🏚️ Только у нас</div>
            <div className="feature-title">Заброшенное<br />трёхэтажное здание</div>
            <div className="feature-desc">
              Настоящий Urban Warfare — бои в коридорах, на этажах, через окна.
              Уникальная для Подмосковья локация, которой нет ни на одной другой площадке.
              Полная экипировка и инструктор обязательны.
            </div>
            <div className="feature-tags">
              <span className="feature-tag">Городской бой</span>
              <span className="feature-tag">CQB-сценарии</span>
              <span className="feature-tag">3 этажа</span>
              <span className="feature-tag">Пейнтбол · Лазертаг</span>
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
              <div className="act-photo" style={{ backgroundImage: `url('${a.img}')` }} />
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
        <p className="s-lead rv">Парк работает в любую погоду — зимой и летом, в будни и выходные. Всё необходимое для комфортного и безопасного отдыха на месте.</p>
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
        <p className="s-lead rv">Московская область, Пушкинский городской округ, деревня Могильцы, парк-отель «Софрино».</p>
        <div className="route-g">
          <div className="route-c rv">
            <div className="route-icon">🚂</div>
            <div>
              <div className="route-name">На электричке</div>
              <div className="route-text">
                С <strong>Ярославского вокзала</strong> до станции <strong>Софрино</strong>,
                затем маршрутка <strong>№59</strong> до остановки «Парк Софрино».
              </div>
            </div>
          </div>
          <div className="route-c rv">
            <div className="route-icon">🚗</div>
            <div>
              <div className="route-name">На автомобиле</div>
              <div className="route-text">
                По <strong>Ярославскому шоссе</strong> (А-104) до Пушкино, далее по указателям на Софрино.
                Бесплатная парковка на территории.
              </div>
            </div>
          </div>
          <div className="route-c rv">
            <div className="route-icon">🗺️</div>
            <div>
              <div className="route-name">На карте</div>
              <div className="route-text">
                <a href="https://yandex.ru/maps/?pt=37.981713,56.105264&z=15" target="_blank" rel="noreferrer">
                  Открыть в Яндекс Картах →
                </a>
                <br />
                <span style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                  Координаты: 56.1053, 37.9817
                </span>
              </div>
            </div>
          </div>
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
            <div className="cc-v"><a href="tel:+79856436888">+7 (985) 643-68-88</a></div>
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
            <div className="cc-s">10:00 – 22:00</div>
          </div>
          <div className="cc rv">
            <div className="cc-icon">📍</div>
            <div className="cc-l">Адрес</div>
            <div className="cc-v" style={{ fontSize: '.72rem' }}>
              Пушкинский р-н,<br />дер. Могильцы
            </div>
            <div className="cc-s">Парк-отель «Софрино»</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-s">
        <div
          className="cta-photo"
          style={{ backgroundImage: "url('/sofrino_husky2.jpg')", backgroundPosition: 'center 30%' }}
        />
        <div className="cta-in">
          <div className="cta-badge">🎯 Бронируйте прямо сейчас</div>
          <div className="cta-h rv">Ждём вас<br />в <span className="hl">Парке Софрино</span></div>
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
              <a href="tel:+79856436888">📞 +7 (985) 643-68-88</a>
              <a href="tel:+79250108535">📞 +7 (925) 010-85-35</a>
              <a href="mailto:info888@plpark.ru">✉️ info888@plpark.ru</a>
            </div>
          </div>
          <div>
            <div className="ft-nav-title">Навигация</div>
            <nav className="ft-nav">
              <Link href="/">← Главная</Link>
              <Link href="/bukhta">Бухта Радости</Link>
              <Link href="/prices">Цены</Link>
              <Link href="/#booking">Бронирование</Link>
              <Link href="/#contacts">Контакты</Link>
            </nav>
          </div>
          <div className="ft-bot">
            <span>© 2026 Пэйнтлэнд Парк</span>
            <span>Парк Софрино · Пушкинский район</span>
          </div>
        </div>
      </footer>
    </>
  );
}
