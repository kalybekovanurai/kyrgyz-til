import { readCollection, writeCollection, withTimestamps } from './storage';

async function seedCollection(collection: string, items: Array<Record<string, unknown>>) {
  const existing = await readCollection(collection);
  if (existing.length > 0) return;
  await writeCollection(collection, items.map((item) => withTimestamps(item)));
}

export const seedNews = [
  {
    id: '1',
    title: 'Мамлекеттик тилди өнүктүрүү боюнча жаңы программа кабыл алынды',
    titleRu: 'Принята новая программа по развитию государственного языка',
    date: '2026-05-10',
    category: 'laws',
    image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000&auto=format&fit=crop',
    content: 'Жаңы программа кыргыз тилинин билим берүү, мамлекеттик башкаруу, медиа жана санарип кызматтарындагы колдонулушун кеңейтүүгө багытталат.',
    contentRu: 'Новая программа направлена на расширение использования кыргызского языка в образовании, государственном управлении, медиа и цифровых сервисах.',
  },
  {
    id: '2',
    title: 'Бишкекте “Тил - улуттун күзгүсү” фестивалы өттү',
    titleRu: 'В Бишкеке прошел фестиваль “Язык - зеркало нации”',
    date: '2026-05-08',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1523240715632-d984bb4b990a?q=80&w=1000&auto=format&fit=crop',
    content: 'Фестивалдын алкагында адабий кечелер, көргөзмөлөр жана тил маданияты боюнча мастер-класстар уюштурулду.',
    contentRu: 'В рамках фестиваля прошли литературные вечера, выставки и мастер-классы по культуре речи.',
  },
];

export const seedNewspapers = [
  { id: 'issue_1', number: '№15 (450)', date: '2026-05-01', pdfUrl: 'http://localhost:4000/uploads/kyrgyz-tili-15.pdf', title: 'Май айындагы чыгарылыш' },
  { id: 'issue_2', number: '№14 (449)', date: '2026-04-15', pdfUrl: 'http://localhost:4000/uploads/kyrgyz-tili-14.pdf', title: 'Апрель айындагы чыгарылыш' },
];

export const seedMedia = [
  {
    id: 'p1',
    type: 'podcast',
    category: 'history',
    title: 'Кыргыз тилинин тарыхы',
    titleRu: 'История кыргызского языка',
    guest: 'Самат Асанов',
    guestRu: 'Самат Асанов',
    date: '2026-05-05',
    url: 'https://www.youtube.com/',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2fccd27ee1f3?q=80&w=1000&auto=format&fit=crop',
    description: 'Кыргыз тилинин келип чыгышы жана өнүгүү этаптары тууралуу подкаст.',
    descriptionRu: 'Подкаст о происхождении и этапах развития кыргызского языка.',
  },
  {
    id: 'v1',
    type: 'survey',
    category: 'culture',
    title: 'Жаштардын тилге болгон көз карашы',
    titleRu: 'Отношение молодежи к языку',
    date: '2026-05-02',
    url: 'https://www.youtube.com/',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
    description: 'Жаштар кыргыз тилин интернетте канчалык активдүү колдонушат?',
    descriptionRu: 'Насколько активно молодежь использует кыргызский язык в интернете?',
  },
];

export const seedLessons = [
  {
    id: 'text',
    type: 'text',
    title: 'Текст менен иштөө',
    titleRu: 'Работа с текстом',
    content: 'Бул сабакта окуучу кыргыз тилиндеги чакан текстти окуп, негизги ойду табууну, жаңы сөздөрдү белгилөөнү жана сүйлөм түзүүнү үйрөнөт.\n\nТапшырма: “Эне тил” темасында 5 сүйлөмдөн турган чакан текст жазыңыз.',
    contentRu: 'В этом уроке ученик учится читать небольшой текст на кыргызском языке, находить главную мысль, отмечать новые слова и составлять предложения.\n\nЗадание: напишите короткий текст из 5 предложений на тему “Родной язык”.',
  },
  {
    id: 'video',
    type: 'video',
    title: 'Орфография боюнча видео сабак',
    titleRu: 'Видеоурок по орфографии',
    content: 'Видео сабакта кыргыз тилиндеги үндүү жана үнсүз тыбыштардын жазылышы, баш тамга жана тыныш белгилери боюнча негизги эрежелер түшүндүрүлөт.',
    contentRu: 'В видеоуроке объясняются основные правила написания гласных и согласных, употребления заглавных букв и знаков препинания в кыргызском языке.',
    videoUrl: 'https://www.youtube.com/',
  },
  {
    id: 'test',
    type: 'test',
    title: 'Кыргыз тили боюнча тест',
    titleRu: 'Тест по кыргызскому языку',
    content: 'Бул бөлүмдө окуучу кыргыз тили боюнча негизги түшүнүктөрдү текшерет. Суроолор лексика, орфография жана сүйлөм түзүлүшү боюнча түзүлгөн.',
    contentRu: 'В этом разделе ученик проверяет базовые знания кыргызского языка. Вопросы составлены по лексике, орфографии и структуре предложения.',
  },
];

export async function seedData() {
  await seedCollection('news', seedNews);
  await seedCollection('newspapers', seedNewspapers);
  await seedCollection('media', seedMedia);
  await seedCollection('lessons', seedLessons);
}
