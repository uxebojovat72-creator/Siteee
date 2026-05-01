const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const PRICES_STATIC = {
  paintball: {
    icon: '🎯',
    title: 'Пейнтбол',
    note: 'Экипировка включена: штаны, куртка, бронежилет, перчатки, маска, маркер',
    badge: 'С 12 лет',
    photo: '/bukhta_action1.jpg',
    extraNote: 'Дополнительно: Шары 2000 шт. — 4 000 ₽ | Дымы/гранаты — 550 ₽/шт | Надувные укрытия (6 шт.) — 8 000 ₽ | Палатки (10 шт.) — 4 000 ₽ | Сапоги — 200 ₽',
    plans: [
      {
        name: '400 шаров',
        price: 'от 1 800 ₽', priceWk: '1 800 ₽', priceWe: '2 000 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['400 шаров на игрока', 'Полная экипировка', 'Инструктаж', 'Детский 12–16 лет: 1 600/1 800 ₽'],
      },
      {
        name: '600 шаров',
        price: 'от 2 200 ₽', priceWk: '2 200 ₽', priceWe: '2 400 ₽',
        unit: '/ чел', duration: '1.5–2 часа', hot: true,
        bullets: ['600 шаров на игрока', 'Полная экипировка', 'Инструктаж', 'Детский: 2 000/2 200 ₽'],
      },
      {
        name: 'Квест «9-РОТА»',
        price: 'от 3 000 ₽', priceWk: '3 000 ₽', priceWe: '3 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Учебка + 200 шаров + дымы + гранаты', 'Часть 1: стрельба и тактика', 'Часть 2: боевые условия'],
      },
      {
        name: 'Квест «Аватар»',
        price: 'от 3 000 ₽', priceWk: '3 000 ₽', priceWe: '3 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['400 шаров', 'Вычисли предателя', 'Командное задание'],
      },
      {
        name: 'Квест «Сталкер» / «Противостояние»',
        price: 'от 2 800 ₽', priceWk: '2 800 ₽', priceWe: '3 000 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['400 шаров', 'Тактическая игра'],
      },
      {
        name: '«Зарница без погон»',
        price: 'от 3 000 ₽', priceWk: '3 000 ₽', priceWe: '3 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['400 шаров', 'Медики, штаб, задания', 'Командная игра'],
      },
      {
        name: '«Голодные игры» (Микс)',
        price: 'от 3 200 ₽', priceWk: '3 200 ₽', priceWe: '3 400 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Пейнтбол + дымовые шашки', 'Гранаты + луки и стрелы'],
      },
    ],
  },

  lazertag: {
    icon: '⚡',
    title: 'Лазертаг и Квесты',
    note: 'Безопасно с 5 лет — без шаров и боли, полный тактический опыт',
    badge: 'От 5 лет',
    photo: null,
    plans: [
      {
        name: 'Базовый 1 час',
        price: 'от 600 ₽', priceWk: '600 ₽', priceWe: '700 ₽',
        unit: '/ чел', duration: '1 час',
        bullets: ['От 20 человек', 'Жилет + бластер', 'Инструктаж'],
      },
      {
        name: 'Базовый 2 часа',
        price: 'от 1 200 ₽', priceWk: '1 200 ₽', priceWe: '1 400 ₽',
        unit: '/ чел', duration: '2 часа', hot: true,
        bullets: ['От 10 человек', 'Несколько раундов'],
      },
      {
        name: 'Для всех желающих',
        price: '25 000 ₽',
        unit: null, duration: '2 часа',
        bullets: ['20 тагов', 'Фиксированная цена', 'Не нужно набирать группу'],
      },
      {
        name: 'Квест-лазертаг',
        price: 'от 1 600 ₽', priceWk: '1 600 ₽', priceWe: '2 000 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Захват точки, бомба, задания'],
      },
      {
        name: '«Сталкер» / «Звёздные войны»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Актёры, костюмы, сюжет'],
      },
      {
        name: '«Остров сокровищ»',
        price: 'от 2 200 ₽', priceWk: '2 200 ₽', priceWe: '2 400 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Пиратское шоу с актёрами'],
      },
      {
        name: '«НЛО» / «Зарница»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Военно-патриотический сюжет'],
      },
      {
        name: '«Анти-Новый год» / «Гринч»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Иммерсивный зимний квест'],
      },
      {
        name: '«Освободите Умку»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '2 часа',
        bullets: ['Спасательная операция в лесу'],
      },
    ],
  },

  archery: {
    icon: '🏹',
    title: 'Арчеритаг',
    note: 'Стрельба из лука с мягкими стрелами — безопасно от 8 лет',
    badge: 'От 8 лет',
    photo: null,
    plans: [
      {
        name: 'Базовый 1 час',
        price: 'от 1 500 ₽', priceWk: '1 500 ₽', priceWe: '1 700 ₽',
        unit: '/ чел', duration: '1 час',
        bullets: ['Лук + стрелы с мягкими наконечниками', 'Защитная экипировка и маска', 'Инструктаж'],
      },
      {
        name: 'Квест «Стрелы Робин Гуда»',
        price: 'от 2 200 ₽', priceWk: '2 200 ₽', priceWe: '2 400 ₽',
        unit: '/ чел', duration: '1.5–2 часа', hot: true,
        bullets: ['Куртка, штаны, бронежилет, маска', 'Задания и квест', 'Командная игра'],
      },
    ],
  },

  timebuild: {
    icon: '🏆',
    title: 'Тимбилдинг',
    note: 'Командообразующие программы под ключ — от 10 человек',
    badge: 'От 10 чел',
    photo: null,
    plans: [
      {
        name: '«Микс-Гейм» / «Крейзи-Гейм»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Сборка активностей из разных программ', 'Улица или помещение'],
      },
      {
        name: '«Джуманджи»',
        price: 'от 2 500 ₽', priceWk: '2 500 ₽', priceWe: '2 700 ₽',
        unit: '/ чел', duration: '1.5–2 часа', hot: true,
        bullets: ['Логика, кубик, испытания'],
      },
      {
        name: '«Тропа с хаски»',
        price: 'от 2 500 ₽', priceWk: '2 500 ₽', priceWe: '2 700 ₽',
        unit: '/ чел', duration: '1–1.5 часа',
        bullets: ['Команда работает с хаски', 'Задания, полоса препятствий'],
      },
      {
        name: 'LOST «Остаться в живых»',
        price: 'от 2 200 ₽', priceWk: '2 200 ₽', priceWe: '2 400 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Выживание, полоса препятствий', 'Реквизит включён'],
      },
      {
        name: '«Король и Шут»',
        price: 'от 2 500 ₽', priceWk: '2 500 ₽', priceWe: '2 700 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Квест по сюжетам песен КиШ'],
      },
      {
        name: '«По следу ЙЕТИ»',
        price: 'от 2 200 ₽', priceWk: '2 200 ₽', priceWe: '2 400 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Приключение-поиск в лесу'],
      },
      {
        name: '«Искатели приключений»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Детский LOST в лесу'],
      },
      {
        name: '«Город головоломок»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Гигантские ребусы и фигуры'],
      },
      {
        name: '«Старорусские забавы»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Перетягивание каната, бои на подушках'],
      },
      {
        name: '«Отцы и дети» / «Мастера игры»',
        price: 'от 2 000 ₽', priceWk: '2 000 ₽', priceWe: '2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа',
        bullets: ['Викторины и состязания'],
      },
    ],
  },

  animation: {
    icon: '🎭',
    title: 'Анимация',
    note: 'Ростовые куклы и тематические шоу — для детских и взрослых праздников',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Мишка Умка',
        price: 'от 4 000 ₽', priceWk: '4 000 ₽ / 30 мин', priceWe: '12 000 ₽ / 3 ч',
        unit: null, duration: '30 мин — 3 часа',
        bullets: ['Ростовая кукла', 'Танцы, фотосессия'],
      },
      {
        name: 'Динозавр',
        price: 'от 3 000 ₽', priceWk: '3 000 ₽ / 30 мин', priceWe: '10 000 ₽ / 3 ч',
        unit: null, duration: '30 мин — 3 часа',
        bullets: ['Ростовая кукла', 'Интерактивное шоу'],
      },
      {
        name: 'Дед Мороз и Снегурочка',
        price: 'от 8 000 ₽', priceWk: '8 000 ₽ / 30 мин', priceWe: '24 000 ₽ / 3 ч',
        unit: null, duration: '30 мин — 3 часа',
        bullets: ['Поздравление', 'Игры и хоровод', 'Новогодний формат'],
      },
    ],
  },

  atv: {
    icon: '🏍️',
    title: 'Квадроциклы',
    note: 'CF Moto 500 см³, двухместные. Шлем и перчатки включены. Минимум 2 часа',
    badge: 'С 12 лет',
    photo: null,
    plans: [
      {
        name: 'Квадроцикл CF Moto 500',
        price: 'от 15 000 ₽',
        unit: null, duration: 'мин. 2 часа', hot: true,
        bullets: ['CF Moto 500 см³, двухместный', 'Шлем и перчатки включены', 'Инструктор на 5 машин обязателен', 'Маршруты по лесу и полю'],
      },
      {
        name: 'Инструктор (сопровождение)',
        price: 'от 15 000 ₽',
        unit: null, duration: 'мин. 2 часа',
        bullets: ['1 машина сопровождения', 'Оплачивается отдельно'],
      },
      {
        name: 'Снегоходы',
        price: '7 500 ₽/час',
        unit: null, duration: 'мин. 2 часа',
        bullets: ['Зимний сезон', 'Поля, спуски, драйв'],
      },
      {
        name: 'Экипировка',
        price: '1 000 ₽',
        unit: '/ комплект', duration: null,
        bullets: ['Непромокаемый костюм', 'Штаны + куртка + бахилы УЗК'],
      },
    ],
  },

  jeep: {
    icon: '🚙',
    title: 'Джиппинг на УАЗ',
    note: 'До 3 человек + инструктор-водитель. Непромокаемая форма включена',
    badge: null,
    photo: null,
    extraNote: 'Разведка (предварительная прокладка маршрута, установка точек, карта): оплачивается разово.',
    plans: [
      { name: 'До 40 км',  price: '22 000 ₽', priceWk: '22 000 ₽', priceWe: '24 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 80 км',  price: '24 000 ₽', priceWk: '24 000 ₽', priceWe: '27 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 100 км', price: '26 000 ₽', priceWk: '26 000 ₽', priceWe: '29 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 120 км', price: '28 000 ₽', priceWk: '28 000 ₽', priceWe: '30 000 ₽', unit: '/ авто', duration: null, bullets: [], hot: true },
      { name: 'До 140 км', price: '29 000 ₽', priceWk: '29 000 ₽', priceWe: '32 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 160 км', price: '31 000 ₽', priceWk: '31 000 ₽', priceWe: '33 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 180 км', price: '33 000 ₽', priceWk: '33 000 ₽', priceWe: '34 000 ₽', unit: '/ авто', duration: null, bullets: [] },
      { name: 'До 200 км', price: '35 000 ₽', priceWk: '35 000 ₽', priceWe: '36 000 ₽', unit: '/ авто', duration: null, bullets: [] },
    ],
  },

  winter: {
    icon: '❄️',
    title: 'Зимние развлечения',
    note: 'Сезонные активности — животные, упряжки, чумы. Уточняйте наличие.',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Катание на верблюде',
        price: 'от 50 000 ₽', priceWk: '50 000 ₽ / 1 ч', priceWe: '80 000 ₽ / 2 ч',
        unit: null, duration: 'от 1 часа',
        bullets: ['Кормление, фотосессия'],
      },
      {
        name: 'Упряжка с 2 оленями',
        price: 'от 70 000 ₽', priceWk: '70 000 ₽ / 1 ч', priceWe: '105 000 ₽ / 2 ч',
        unit: null, duration: 'от 1 часа',
        bullets: ['Северный каюр, упряжь'],
      },
      {
        name: 'Хаски-упряжка (5–8 собак)',
        price: 'от 55 000 ₽', priceWk: '55 000 ₽ / 1 ч', priceWe: '85 000 ₽ / 2 ч',
        unit: null, duration: 'от 1 часа',
        bullets: ['Круг 300 м', 'До 20 чел/час'],
      },
      {
        name: 'Сани с 1 лошадью',
        price: 'от 55 000 ₽', priceWk: '55 000 ₽ / 1 ч', priceWe: '+ доп. ч 27 000 ₽',
        unit: null, duration: 'от 1 часа',
        bullets: ['До 25 чел/ч', 'Выезд 10 км включён'],
      },
      {
        name: 'Сани с 2 лошадьми (Двойка)',
        price: 'от 65 000 ₽', priceWk: '65 000 ₽ / 1 ч', priceWe: '+ доп. ч 35 000 ₽',
        unit: null, duration: 'от 1 часа', hot: true,
        bullets: ['Русская запряжка'],
      },
      {
        name: 'Тройка белых коней',
        price: 'от 110 000 ₽', priceWk: '110 000 ₽ / 1 ч', priceWe: '+ доп. ч 55 000 ₽',
        unit: null, duration: 'от 1 часа',
        bullets: ['VIP-статус', 'Нарядная тройка'],
      },
      {
        name: 'Аренда Чума (диам. 4.5 м)',
        price: '70 000 ₽',
        unit: null, duration: '4 часа',
        bullets: ['Шкуры, печка, ковры'],
      },
      {
        name: 'Чукотский тимбилдинг',
        price: '60 000 ₽/ч',
        unit: null, duration: 'от 1 часа',
        bullets: ['Артист, танцы, обряды'],
      },
    ],
  },

  husky: {
    icon: '🐺',
    title: 'Хаски',
    note: 'Прогулки, катание, фотосессии — доставка до 10 км от МКАД включена',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Фотозона «I love husky»',
        price: '25 000 ₽',
        unit: null, duration: 'до 3 часов',
        bullets: ['2 хаски + инструктор', 'Баннер «I love husky»', 'До 10 км от МКАД включено'],
      },
      {
        name: 'Хаскитерапия',
        price: '35 000 ₽',
        unit: null, duration: '2 часа', hot: true,
        bullets: ['3 хаски', 'Прогулки и общение', '3 тюбинга (зимой)', 'Фотосессия'],
      },
    ],
  },

  birthday: {
    icon: '🎂',
    title: 'Дни рождения',
    note: 'Именинник получает скидку 50% на основную активность',
    badge: '🎁 Скидка 50%',
    photo: null,
    plans: [
      {
        name: 'Детский праздник',
        price: 'от 600 ₽', priceWk: 'от 600 ₽', priceWe: 'от 700 ₽',
        unit: '/ чел', duration: '1–2 часа',
        bullets: ['Лазертаг или арчеритаг', 'Именинник −50%', 'От 10 детей'],
      },
      {
        name: 'Взрослый день рождения',
        price: 'от 1 800 ₽', priceWk: 'от 1 800 ₽', priceWe: 'от 2 000 ₽',
        unit: '/ чел', duration: '1.5–2 часа', hot: true,
        bullets: ['Пейнтбол, лазертаг или джиппинг', 'Именинник −50%', 'Беседка по запросу'],
      },
      {
        name: 'Аниматор в ростовом костюме',
        price: 'от 3 000 ₽',
        unit: null, duration: '30 мин — 3 ч',
        bullets: ['Мишка, Динозавр или Дед Мороз', 'Фотосессия', 'Танцы и игры'],
      },
    ],
  },

  corporate: {
    icon: '💼',
    title: 'Корпоративы',
    note: 'Скидка 10% от 30 чел, 15% от 50 чел. В выходные +10–20%',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Пейнтбол / Лазертаг',
        price: 'от 600 ₽', priceWk: 'от 600 ₽', priceWe: 'от 700 ₽',
        unit: '/ чел', duration: '1–2 часа',
        bullets: ['От 10 человек', 'Полная экипировка', 'Ведущий по запросу'],
      },
      {
        name: 'Тимбилдинг-программа',
        price: 'от 2 000 ₽', priceWk: 'от 2 000 ₽', priceWe: 'от 2 200 ₽',
        unit: '/ чел', duration: '1.5–2 часа', hot: true,
        bullets: ['«Микс-Гейм», «Джуманджи» и др.', 'Ведущий включён'],
      },
      {
        name: 'Полный день',
        price: 'от 2 500 ₽',
        unit: '/ чел', duration: 'Весь день',
        bullets: ['2–3 активности на выбор', 'Беседка или банкетный зал', 'Ведущий + фотограф'],
      },
    ],
  },

  schools: {
    icon: '🎒',
    title: 'Школам',
    note: 'Будни (Пн–Чт) · Выезд к вам или приезд к нам',
    badge: null,
    photo: null,
    type: 'schools',
    groupLabels: ['15–30 чел', '31–50 чел', '51–80 чел', '81–100 чел'],
    plans: [
      { name: 'Лазертаг (1 час)',       prices: [450, 400, 350, 300],               flat: false },
      { name: 'Лазертаг (2 часа)',      prices: [700, 650, 600, 550],               flat: false },
      { name: 'Лазертаг-Квест (2 ч)',   prices: [800, 750, 700, 650],               flat: false },
      { name: 'Иммерсивный квест',      prices: [1200, 1100, 1000, 900],            flat: false },
      { name: 'Пейнтбол (200 шаров)',   prices: [1800, 1750, 1700, 1650],           flat: false },
      { name: 'Пейнтбол (400 шаров)',   prices: [2000, 1950, 1900, 1850],           flat: false },
      { name: 'Пейнтбол-квест 9-РОТА',  prices: [2700, 2600, 2500, 2400],           flat: false },
      { name: 'Арчеритаг (1.5 ч)',      prices: [1100, 1000, 900, 800],             flat: false },
      { name: 'Тир (стрелковый ряд)',   prices: [12000, 12000, 12000, 12000],       flat: true  },
    ],
  },

  gazebo: {
    icon: '🏕️',
    title: 'Беседки и площадки',
    note: 'Можно приезжать со своей едой — мангал и дрова уже есть',
    badge: null,
    photo: null,
    plans: [
      {
        name: 'Малая беседка',
        price: '3 000 ₽',
        unit: null, duration: '4 часа',
        bullets: ['До 8 человек', 'Стол + лавки', 'Мангал + дрова'],
      },
      {
        name: 'Большая беседка',
        price: '5 000 ₽',
        unit: null, duration: '4 часа', hot: true,
        bullets: ['До 20 человек', 'Стол + лавки', 'Мангал + освещение'],
      },
      {
        name: 'VIP-беседка',
        price: '8 000 ₽',
        unit: null, duration: '4 часа',
        bullets: ['До 30 человек', 'Крытая терраса', 'Мангал + свет + звук'],
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
