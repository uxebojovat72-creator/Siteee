import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="" className={styles.logoImg} />
            ПЭЙНТЛЭНД ПАРК
          </div>
          <p className={styles.desc}>
            Активный отдых в Подмосковье. Пейнтбол, лазертаг, квадроциклы
            и тимбилдинг с 2008 года.
          </p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Навигация</div>
            <Link href="/">Главная</Link>
            <Link href="/#services">Услуги</Link>
            <Link href="/prices">Все цены</Link>
            <Link href="/bukhta">Бухта Радости</Link>
            <Link href="/#contacts">Контакты</Link>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>Контакты</div>
            <a href="tel:+79250108535">+7 (925) 010-85-35</a>
            <a href="tel:+79856436888">+7 (985) 643-68-88</a>
            <a href="mailto:info888@plpark.ru">info888@plpark.ru</a>
            <span>Ежедневно 09:00–21:00</span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Пэйнтлэнд Парк</span>
        <span>Москва и Подмосковье</span>
      </div>
    </footer>
  )
}
