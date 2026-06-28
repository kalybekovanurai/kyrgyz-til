export const seedSiteSettings = [
  {
    id: 'home',
    title: 'Башкы бет',
    titleRu: 'Главная',
    data: {
      hero: {
        slides: [
          {
            titleKy: 'Эне тилим - элдүүлүгүм, тил тагдыры - эл тагдыры!',
            titleRu: 'Родной язык - наследие народа, судьба языка - судьба народа!',
            descriptionKy: 'Кыргыз тили веб-порталы - мамлекеттик тилди өнүктүрүү, сактоо жана заманбап технологиялар менен интеграциялоо үчүн бирдиктүү аянтча.',
            descriptionRu: 'Веб-портал кыргызского языка - единая платформа для развития, сохранения и интеграции государственного языка с современными технологиями.',
            image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000&auto=format&fit=crop',
          },
          {
            titleKy: 'Заманбап технологиялар кыргыз тилинин кызматында',
            titleRu: 'Современные технологии на службе кыргызского языка',
            descriptionKy: 'Санарип доордо эне тилибиздин кадыр-баркын көтөрүү жана аны келечек муундарга жеткирүү биздин негизги максатыбыз.',
            descriptionRu: 'Наша главная цель - повысить престиж родного языка в цифровую эпоху и передать его будущим поколениям.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop',
          },
        ],
      },
      quickLinks: [
        { titleKy: 'Кыргыз тили гезити', titleRu: 'Газета Кыргыз тили', path: '/newspaper', icon: 'newspaper', color: 'bg-blue-500' },
        { titleKy: 'Окуу борбору', titleRu: 'Учебный центр', path: '/learning', icon: 'learning', color: 'bg-green-500' },
        { titleKy: 'Медиа', titleRu: 'Медиа', path: '/media', icon: 'media', color: 'bg-red-500' },
        { titleKy: 'Байланыш', titleRu: 'Контакты', path: '/contact', icon: 'contact', color: 'bg-orange-500' },
      ],
      subscription: {
        titleKy: '«Кыргыз тили» гезитине жазылуу',
        titleRu: 'Подписка на газету «Кыргыз тили»',
        descriptionKy: 'Гезиттин жаңы сандарынан кабардар болуп туруу жана PDF версияларын электрондук почтаңызга алуу үчүн жазылыңыз.',
        descriptionRu: 'Подпишитесь, чтобы получать новости о свежих выпусках и PDF-версии газеты.',
        safeTextKy: 'Маалыматтар коопсуз сакталат',
        safeTextRu: 'Данные надежно защищены',
      },
    },
  },
  {
    id: 'about',
    title: 'Биз жөнүндө',
    titleRu: 'О нас',
    data: {
      hero: {
        titleKy: 'Биз жөнүндө',
        titleRu: 'О нас',
        subtitleKy: 'Веб-порталдын миссиясы, максаттары жана ишмердүүлүк багыттары',
        subtitleRu: 'Миссия, цели и направления деятельности веб-портала',
      },
      mission: {
        titleKy: 'Биздин миссия',
        titleRu: 'Наша миссия',
        leadKy: 'Кыргыз тилин санариптештирүү жана аны жаштарга заманбап форматта жеткирүү.',
        leadRu: 'Цифровизация кыргызского языка и его продвижение в современном формате.',
        textKy: 'Портал кыргыз тилин үйрөнүү, жайылтуу жана коомдук талкууга чыгаруу үчүн бирдиктүү маалыматтык аянтча катары түзүлдү.',
        textRu: 'Портал создан как единая информационная площадка для изучения, развития и общественного обсуждения кыргызского языка.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBRsK4QoIlpL52j2CV6BWjytpADMk7Y2hLg&s',
        cards: [
          { titleKy: 'Билим берүү', titleRu: 'Образование', descriptionKy: 'Тил үйрөнүү ресурстарын санарип форматка өткөрүү.', descriptionRu: 'Перевод учебных ресурсов в цифровой формат.', icon: 'book' },
          { titleKy: 'Коомчулук', titleRu: 'Сообщество', descriptionKy: 'Кыргыз тилдүү медиа чөйрөнү колдоо жана жайылтуу.', descriptionRu: 'Поддержка и развитие кыргызскоязычной медиа-среды.', icon: 'users' },
        ],
      },
      activities: {
        titleKy: 'Ишмердүүлүк багыттары',
        titleRu: 'Направления деятельности',
        items: [
          { titleKy: 'Илимий изилдөөлөр', titleRu: 'Научные исследования', bg: 'bg-blue-50' },
          { titleKy: 'Санариптик долбоорлор', titleRu: 'Цифровые проекты', bg: 'bg-green-50' },
          { titleKy: 'Окутуу-методикалык иштер', titleRu: 'Учебно-методическая работа', bg: 'bg-red-50' },
          { titleKy: 'Коомдук иш-чаралар', titleRu: 'Общественные мероприятия', bg: 'bg-orange-50' },
        ],
      },
    },
  },
  {
    id: 'contacts',
    title: 'Байланыш',
    titleRu: 'Контакты',
    data: {
      phone: '+996 (312) 66-00-00',
      footerPhone: '+996 312 21-01-43',
      email: 'info@kyrgyztil.kg',
      addressKy: 'Бишкек ш., Чүй проспекти 265 А',
      addressRu: 'г. Бишкек, проспект Чуй 265 А',
      social: { facebook: '', instagram: '', youtube: '' },
      footerDescriptionKy: 'Кыргыз тили веб-порталы. Эне тилим - элдүүлүгүм, тил тагдыры - эл тагдыры.',
      footerDescriptionRu: 'Веб-портал кыргызского языка. Родной язык - наследие народа.',
    },
  },
  {
    id: 'partners',
    title: 'Өнөктөштөр',
    titleRu: 'Партнеры',
    data: {
      items: [
        { nameKy: 'Улуттук тил комиссиясы', nameRu: 'Национальная комиссия по языку', roleKey: 'partners.item.role.strategic', icon: 'КТ', url: '' },
        { nameKy: 'Кыргыз улуттук университети', nameRu: 'Кыргызский национальный университет', roleKey: 'partners.item.role.scientific', icon: 'КУ', url: '' },
        { nameKy: 'Билим берүү министрлиги', nameRu: 'Министерство образования', roleKey: 'partners.item.role.state', icon: 'БМ', url: '' },
        { nameKy: 'ЮНЕСКО', nameRu: 'ЮНЕСКО', roleKey: 'partners.item.role.international', icon: 'UN', url: '' },
      ],
    },
  },
  {
    id: 'methodology',
    title: 'Методикалык материалдар',
    titleRu: 'Методические материалы',
    data: {
      files: [
        { titleKy: 'Методика №1', titleRu: 'Методика №1', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { titleKy: 'Методика №2', titleRu: 'Методика №2', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { titleKy: 'Методика №3', titleRu: 'Методика №3', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { titleKy: 'Методика №4', titleRu: 'Методика №4', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      ],
    },
  },
  {
    id: 'language-policy',
    title: 'Тил саясаты',
    titleRu: 'Языковая политика',
    data: {
      lawUrl: 'http://cbd.minjust.gov.kg/act/view/ru-ru/111956',
      programUrl: '',
      adsItemsKy: ['Талкуулоо', 'Каталарды оңдоо', 'Нормативдер', 'Сунуштар'],
      adsItemsRu: ['Обсуждение', 'Исправление ошибок', 'Нормативы', 'Предложения'],
    },
  },
  {
    id: 'newspaper',
    title: 'Кыргыз тили гезити',
    titleRu: 'Газета Кыргыз тили',
    data: {
      subscriptionIndex: '12456',
      articles: [
        {
          category: 'main',
          titleKy: 'Кыргыз тили санарип доорунда',
          titleRu: 'Кыргызский язык в цифровую эпоху',
          descriptionKy: 'Бул макала гезиттин тандалган рубрикасына тиешелүү кыскача материал катары көрсөтүлөт.',
          descriptionRu: 'Эта статья показана как краткий материал выбранной рубрики газеты.',
        },
        {
          category: 'main',
          titleKy: 'Билим берүүдө тил саясаты',
          titleRu: 'Языковая политика в образовании',
          descriptionKy: 'Бул макала гезиттин тандалган рубрикасына тиешелүү кыскача материал катары көрсөтүлөт.',
          descriptionRu: 'Эта статья показана как краткий материал выбранной рубрики газеты.',
        },
      ],
    },
  },
];
