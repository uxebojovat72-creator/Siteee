const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const PRICES_STATIC = {
  paintball: {
    icon: '🎯',
    title: 'Пейнтбол',
    note: 'Включает полную экипировку: маска, комбинезон, перчатки, маркер',
    badge: 'С 12 лет',
    photo: '/bukhta_action1.jpg',
    plans: [
      {
        name: 'Мини',
        price: '1 800 ₽',
        unit: '/ чел',
        duration: '1 час',
        bullets: ['100 шаров', 'Полная экипировка', 'Инструктаж', 'До 10 игроков'],
      },
      {
        name: 'Стандарт',
        price: '2 500 ₽',
        unit: '/ чел',
        duration: '2 часа',
        bullets: ['200 шаров', 'Полная экипировка', 'Инструктаж', 'Несколько сценариев'],
        hot: true,
      },
      {
        name: 'Максимум',
        price: '3 500 ₽',
        unit: '/ чел',
        duration: '3 часа',
        bullets: ['350 шаров', 'Полная экипировка', 'Все игровые сценарии', 'Фотосессия'],
      },
    ],
  },
  lazertag: {
    icon: '⚡',
    title: 'Лазертаг',
    note: 'Безопасно с 5 лет — без шаров и боли, полный тактический опыт',
    badge: 'От 5 лет',
    photo: null,
    plans: [
      {
        name: 'Детский',
        price: '600 ₽',
        unit: '/ чел',
        duration: '45 мин',
        bullets: ['Игровой жилет + бластер', 'Инструктаж', 'От 5 лет', '1 раунд'],
      },
      {
        name: 'Стандарт',
        price: '900 ₽',
        unit: '/ чел',
        duration: '1.5 часа',
        bullets: ['Жилет + бластер', '3 игровых раунда', 'Статистика после игры', 'Инструктаж'],
        hot: true,
      },
      {
        name: 'Турнир',
        price: '1 400 ₽',
        unit: '/ чел',
        duration: '2.5 часа',
        bullets: ['Жилет + бластер', '5 раундов', 'Турнирная таблица', 'Призы победителям'],
      },
    ],
  },
  archery: {
    icon: '🏹',
    title: 'Арчеритаг',
    note: 'Стрельба из лука с мягкими стрелами — безопасная новинка сезона',
    badge: 'От 8 лет',
    photo: null,
    plans: [
      {
        name: 'Базовый',
        price: '800 ₽',
        unit: '/ чел',
        duration: '1 час',
        bullets: ['Лук + защитная маска', '20 стрел', 'Инструктаж', 'От 8 лет'],
      },
      {
        name: 'Расширенный',
        price: '1 200 ₽',
        unit: '/ чел',
        duration: '2 часа',
        bullets: ['Лук + маска', '40 стрел', 'Несколько форматов игры', 'Инструктаж'],
        hot: true,
      },
    ],
  },
  atv: {
    icon: '🏍️',
    title: 'Квадроциклы',
    note: 'Трассы разной сложности, опыт не нужен — проведём полный инструктаж',
    badge: 'С 12 лет',
    photo: null,
    plans: [
      {
        name: 'Пробный',
        price: '1 500 ₽',
        unit: '/ чел',
        duration: '20 мин',
        bullets: ['Квадроцикл-новичок', 'Инструктаж', 'Трасса для начинающих', 'Шлем + перчатки'],
      },
      {
        name: 'Стандарт',
        price: '2 500 ₽',
        unit: '/ чел',
        duration: '45 мин',
        bullets: ['Квадроцикл на выбор', 'Лесная трасса', 'Полная экипировка', 'Инструктаж'],
        hot: true,
      },
      {
        name: 'Профи',
        price: '4 000 ₽',
        unit: '/ чел',
        duration: '1.5 часа',
        bullets: ['Мощный квадроцикл', 'Трасса с препятствиями', 'Экипировка', 'Фото в подарок'],
      },
    ],
  },
  jeep: {
    icon: '🚙',
    title: 'Джипинг / УАЗ',
    note: 'Бездорожье на армейских УАЗах — до 8 человек в одной машине',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Маршрут «Берег»',
        price: '6 000 ₽',
        unit: '/ авто',
        duration: '1 час',
        bullets: ['До 8 пассажиров', 'Берег озера и поля', 'Опытный водитель', 'Фото на маршруте'],
      },
      {
        name: 'Маршрут «Лесной»',
        price: '10 000 ₽',
        unit: '/ авто',
        duration: '2 часа',
        bullets: ['До 8 пассажиров', 'Лес + берег реки', 'Опытный водитель', 'Фото + видео'],
        hot: true,
      },
    ],
  },
  rope: {
    icon: '🧗',
    title: 'Верёвочный парк',
    note: 'Трассы на высоте 3–8 м, страховка обязательна и входит в стоимость',
    badge: 'От 6 лет',
    photo: null,
    plans: [
      {
        name: 'Детский',
        price: '700 ₽',
        unit: '/ чел',
        duration: 'Неограничено',
        bullets: ['Трасса до 3 м', 'Страховочное снаряжение', 'Инструктор рядом', 'От 6 лет'],
      },
      {
        name: 'Взрослый',
        price: '1 000 ₽',
        unit: '/ чел',
        duration: 'Неограничено',
        bullets: ['Все трассы до 8 м', 'Страховочное снаряжение', 'Инструктаж', 'От 14 лет'],
        hot: true,
      },
      {
        name: 'Семейный',
        price: '2 500 ₽',
        unit: '/ семья',
        duration: 'Неограничено',
        bullets: ['До 4 человек', 'Все трассы', 'Снаряжение', 'Скидка ~20% vs разовых билетов'],
      },
    ],
  },
  birthday: {
    icon: '🎂',
    title: 'Дни рождения',
    note: 'Именинник получает скидку 50% на основную активность',
    badge: '🎁 Подарок',
    photo: null,
    plans: [
      {
        name: 'Детский праздник',
        price: '25 000 ₽',
        unit: null,
        duration: '3 часа',
        bullets: ['До 15 детей', 'Лазертаг или арчеритаг', 'Аниматор', 'Беседка', 'Торт'],
      },
      {
        name: 'Взрослый день рождения',
        price: '35 000 ₽',
        unit: null,
        duration: '4 часа',
        bullets: ['До 20 гостей', 'Пейнтбол или квадроциклы', 'Беседка с мангалом', 'Сценарий'],
        hot: true,
      },
      {
        name: 'VIP-праздник',
        price: '60 000 ₽',
        unit: null,
        duration: '6 часов',
        bullets: ['До 30 гостей', '2 активности на выбор', 'VIP-беседка', 'Питание', 'Ведущий'],
      },
    ],
  },
  corporate: {
    icon: '🏆',
    title: 'Корпоративы',
    note: 'Тимбилдинг, соревнования, командообразующие программы под ключ',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Базовый тимбилдинг',
        price: '2 000 ₽',
        unit: '/ чел',
        duration: '3 часа',
        bullets: ['От 20 человек', 'Пейнтбол или лазертаг', 'Ведущий', 'Игровой сценарий'],
      },
      {
        name: 'Расширенный',
        price: '3 500 ₽',
        unit: '/ чел',
        duration: '5 часов',
        bullets: ['От 20 человек', '2 активности на выбор', 'Ведущий + беседка', 'Банкет'],
        hot: true,
      },
      {
        name: 'Полный день',
        price: 'от 80 000 ₽',
        unit: null,
        duration: 'Весь день',
        bullets: ['От 30 человек', 'Все активности включены', 'Питание + фото-видео', 'Трансфер'],
      },
    ],
  },
  gazebo: {
    icon: '🏕️',
    title: 'Беседки и площадки',
    note: 'Можно приезжать со своей едой — всё готово для пикника и барбекю',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Малая беседка',
        price: '3 000 ₽',
        unit: null,
        duration: '4 часа',
        bullets: ['До 8 человек', 'Стол + лавки', 'Мангал', 'Дрова включены'],
      },
      {
        name: 'Большая беседка',
        price: '5 000 ₽',
        unit: null,
        duration: '4 часа',
        bullets: ['До 20 человек', 'Стол + лавки', 'Мангал', 'Дрова + освещение'],
        hot: true,
      },
      {
        name: 'VIP-беседка',
        price: '8 000 ₽',
        unit: null,
        duration: '4 часа',
        bullets: ['До 30 человек', 'Крытая терраса', 'Мангал', 'Дрова + свет + звук'],
      },
    ],
  },
}

export async function fetchParks() {
  const res = await fetch(`${API_URL}/api/parks/`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  return res.json()
}

export async function fetchPark(slug) {
  const res = await fetch(`${API_URL}/api/parks/${slug}/`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json()
}

export async function createBooking(data) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || API_URL}/api/bookings/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
  return { ok: res.ok, data: await res.json() }
}
