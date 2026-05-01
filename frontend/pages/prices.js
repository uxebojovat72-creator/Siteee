import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRICES_STATIC } from '../lib/api'
import styles from './prices.module.css'

function SchoolsSection({ cat }) {
  const [activeGroup, setActiveGroup] = useState(0)
  return (
    <div>
      <div className={styles.groupTabs}>
        {cat.groupLabels.map((label, i) => (
          <button
            key={i}
            className={`${styles.groupTab} ${i === activeGroup ? styles.groupTabActive : ''}`}
            onClick={() => setActiveGroup(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <table className={styles.schoolsTable}>
        <thead>
          <tr>
            <th>Программа</th>
            <th>Цена / чел</th>
          </tr>
        </thead>
        <tbody>
          {cat.plans.map((plan, i) => (
            <tr key={i}>
              <td>{plan.name}</td>
              <td>
                {plan.flat
                  ? <>{plan.prices[0].toLocaleString('ru')} ₽ <span className={styles.schoolsFlat}>фиксированно</span></>
                  : <>{plan.prices[activeGroup].toLocaleString('ru')} ₽</>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PlanCard({ plan }) {
  return (
    <div className={`${styles.plan} ${plan.hot ? styles.planHot : ''}`}>
      {plan.hot && <div className={styles.planBadge}>ХИТ</div>}
      <div className={styles.planName}>{plan.name}</div>

      {plan.priceWk && plan.priceWe ? (
        <div className={styles.planPrices}>
          <div className={styles.priceWk}>
            <small>Пн–Чт</small>
            <strong>{plan.priceWk}</strong>
          </div>
          <div className={styles.priceWe}>
            <small>Пт–Вс</small>
            <strong>{plan.priceWe}</strong>
          </div>
        </div>
      ) : (
        <div className={styles.planPrice}>
          {plan.price}
          {plan.unit && <span> {plan.unit}</span>}
        </div>
      )}

      {plan.duration && <div className={styles.planDuration}>⏱ {plan.duration}</div>}

      {plan.bullets && plan.bullets.length > 0 && (
        <ul className={styles.planList}>
          {plan.bullets.map((b, j) => <li key={j}>{b}</li>)}
        </ul>
      )}

      <Link href="/#booking" className={styles.planBtn}>
        Записаться
      </Link>
    </div>
  )
}

export default function Prices({ prices }) {
  const categories = Object.entries(prices)

  return (
    <>
      <Head>
        <title>Цены и услуги — Пэйнтлэнд Парк</title>
        <meta name="description" content="Актуальные цены на пейнтбол, лазертаг, квадроциклы, джипинг, верёвочный парк, дни рождения и корпоративы в Подмосковье." />
      </Head>

      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <span className={styles.heroDot} />
            <span>Актуально на 2026 год</span>
          </div>
          <h1 className={styles.heroTitle}>
            Цены и услуги
          </h1>
          <p className={styles.heroDesc}>
            Пейнтбол, лазертаг, квадроциклы, джипинг, верёвочный парк,
            дни рождения и корпоративы — все тарифы в одном месте.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/#booking" className={styles.btnMain}>Забронировать →</Link>
            <a href="tel:+79250108535" className={styles.btnSec}>📞 +7 (925) 010-85-35</a>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <Link href="/">Главная</Link>
        <span>→</span>
        <span>Цены и услуги</span>
      </div>

      {/* QUICK NAV */}
      <div className={styles.quickNav}>
        {categories.map(([key, cat]) => (
          <a key={key} href={`#${key}`} className={styles.quickBtn}>
            <span>{cat.icon}</span> {cat.title}
          </a>
        ))}
      </div>

      {/* NOTICE */}
      <div className={styles.notice}>
        <span className={styles.noticeIcon}>ℹ️</span>
        <span>Цены будних дней (Пн–Чт) выделены зелёным, выходных и праздников (Пт–Вс) — оранжевым. При бронировании уточняйте актуальный тариф.</span>
      </div>

      {/* PRICE BLOCKS */}
      <main className={styles.main}>
        {categories.map(([key, cat]) => (
          <section key={key} id={key} className={styles.section}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionIcon}>{cat.icon}</div>
              <div>
                <div className={styles.eyebrow}>Услуга</div>
                <h2 className={styles.sectionTitle}>{cat.title}</h2>
                {cat.note && <p className={styles.sectionNote}>{cat.note}</p>}
              </div>
              {cat.badge && <div className={styles.sectionBadge}>{cat.badge}</div>}
            </div>

            {cat.photo && (
              <div className={styles.sectionPhoto}>
                <img src={cat.photo} alt={cat.title} />
              </div>
            )}

            {cat.type === 'schools' ? (
              <SchoolsSection cat={cat} />
            ) : (
              <div className={styles.plans}>
                {cat.plans.map((plan, i) => (
                  <PlanCard key={i} plan={plan} />
                ))}
              </div>
            )}

            {cat.extraNote && (
              <div className={styles.extraNote}>
                {cat.extraNote}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaPhoto} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>🎂 Специальное предложение</div>
          <h2 className={styles.ctaTitle}>
            Именинникам<br />
            <span className={styles.ctaHl}>скидка 50%</span>
          </h2>
          <p className={styles.ctaDesc}>Сообщите о дне рождения при бронировании.</p>
          <Link href="/#booking" className={styles.btnMain}>
            Хочу скидку →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.eyebrow}>Вопросы о ценах</div>
        <h2 className={styles.faqTitle}>Часто спрашивают</h2>
        <div className={styles.faqList}>
          {[
            ['Нужно ли бронировать заранее?', 'Да, рекомендуем бронировать за 1–2 дня, особенно на выходные. В будни часто доступны места в день обращения.'],
            ['Есть ли скидки для групп?', 'Да. При группе от 15 человек — скидка 10%, от 25 человек — 15%. Детали уточняйте по телефону.'],
            ['Как оплатить?', 'После подтверждения бронирования мы отправляем ссылку на онлайн-оплату. Принимаем карты, СБП и наличные на месте.'],
            ['Что включает экипировка?', 'Для пейнтбола: маска, комбинезон, перчатки, маркер, шары по тарифу. Для лазертага: жилет и бластер. Всё чистое и продезинфицированное.'],
            ['Можно ли приехать без подготовки?', 'Конечно! Перед каждой игрой инструктор проводит инструктаж и объясняет правила. Никакого опыта не нужно.'],
            ['Почему цены в выходные выше?', 'В пятницу–воскресенье и праздники нагрузка на парк значительно возрастает. Повышенный тариф обеспечивает комфортный уровень сервиса и экипировки для всех гостей.'],
          ].map(([q, a], i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return { props: { prices: PRICES_STATIC } }
}
