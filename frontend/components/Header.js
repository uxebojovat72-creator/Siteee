import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="" className={styles.logoImg} />
          ПЭЙНТЛЭНД ПАРК
        </Link>
        <div className={styles.links}>
          <Link href="/#services">Услуги</Link>
          <Link href="/prices">Цены</Link>
          <Link href="/bukhta">Парки</Link>
          <Link href="/#contacts">Контакты</Link>
        </div>
        <Link href="/#booking" className={styles.cta}>Забронировать</Link>
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <Link href="/#services" onClick={close}>Услуги</Link>
        <Link href="/prices" onClick={close}>Цены</Link>
        <Link href="/bukhta" onClick={close}>Бухта Радости</Link>
        <Link href="/#contacts" onClick={close}>Контакты</Link>
        <Link href="/#booking" className={styles.drawerCta} onClick={close}>
          Забронировать игру
        </Link>
      </div>
    </>
  )
}
