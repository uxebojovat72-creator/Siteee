import Head from 'next/head'
import { fetchParks } from '../lib/api'

export async function getServerSideProps() {
  const parks = await fetchParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  return (
    <>
      <Head>
        <title>Пейнтлэнд Парк — Пейнтбол, лазертаг, квадроциклы в Подмосковье</title>
        <meta name="description" content="Пейнтбол, лазертаг, квадроциклы и тимбилдинг в Подмосковье. Два парка — Бухта Радости и Софрино." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Пейнтлэнд Парк</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 40 }}>
          Пейнтбол, лазертаг, квадроциклы и тимбилдинг в Подмосковье
        </p>

        <section>
          <h2 style={{ marginBottom: 20 }}>Наши парки</h2>
          {parks.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>
              Данные загружаются из базы. Добавьте парки в <strong>/admin</strong>.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {parks.map((park) => (
                <div
                  key={park.id}
                  style={{
                    background: 'var(--card)',
                    borderRadius: 'var(--radius)',
                    padding: 24,
                  }}
                >
                  <div style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: 4 }}>
                    {park.location}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>{park.name}</h3>
                  <p style={{ color: 'var(--muted)' }}>{park.short_description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer style={{ marginTop: 60, color: 'var(--muted)', fontSize: '.85rem' }}>
          <p>+7 (925) 010-85-35 &nbsp;·&nbsp; +7 (985) 643-68-88</p>
        </footer>
      </main>
    </>
  )
}
