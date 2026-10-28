// Дані родини.
//
// Поля людини (усі, крім id, необов'язкові):
//   id          унікальний ключ, латиницею, напр. "dychko-serhii"
//   firstName, lastName, patronymic, maidenName (дівоче прізвище)
//   gender      "m" або "f"
//   birth       { date: "1925-03-14" | "1925-03" | "1925" | "--03-14" (без року), place: "..." }
//   death       { date, place, burial }
//   photo       шлях до фото, напр. "photos/dychko-serhii.jpg"
//   fatherId, motherId
//   spouses     [{ id, married: "1948", divorced: "..." }]  (достатньо вказати в одного з пари)
//   facts       { "Професія": "...", "Освіта": ["школа", "університет"] }  (масив показується списком)
//   bio         текст, абзаци розділяються порожнім рядком
//   events      [{ date, title, text }]
//   gallery     [{ src, caption }]
//   sources     [{ title, url }]  (звідки взято відомості)

window.FAMILY = {
  title: "Родина Дичко",
  subtitle: "",
  // Від кого будується дерево: зверху ця людина з братами й сестрами, нижче предки.
  startId: "dychko-serhii",
  people: [
    {
      id: "dychko-anatolii",
      photo: "photos/dychko-anatolii.jpg",
      firstName: "Анатолій", lastName: "Дичко", patronymic: "Вікторович",
      gender: "m", fatherId: "dychko-viktor", motherId: "dychko-liubov",
      birth: { date: "1969-04-26" },
      spouses: [{ id: "dychko-svitlana" }]
    },
    {
      id: "dychko-svitlana",
      photo: "photos/dychko-svitlana.jpg",
      firstName: "Світлана", lastName: "Дичко", patronymic: "Антонівна", maidenName: "Наконечна",
      gender: "f", fatherId: "nakonechnyi-anton", motherId: "nakonechna-lidiia",
      birth: { date: "1974-01-01" }
    },
    {
      id: "khamchych-kseniia",
      photo: "photos/khamchych-kseniia.jpg",
      firstName: "Ксенія", lastName: "Хамчич", patronymic: "Анатоліївна", maidenName: "Дичко",
      gender: "f", fatherId: "dychko-anatolii", motherId: "dychko-svitlana",
      birth: { date: "1996-10-24", place: "с. Нововасилівка, Миколаївська область" },
      facts: {
        "Професія": "Бухгалтер",
        "Освіта": [
          "Нововасилівська ЗОШ І–ІІІ ступенів, 1–9 класи",
          "Снігурівська районна гімназія імені Т. Г. Шевченка",
          "Миколаївський національний аграрний університет, бакалавр і магістр, спеціальність «Облік і оподаткування»"
        ]
      },
      spouses: [{ id: "khamchych-yaroslav" }]
    },
    {
      id: "khamchych-yaroslav",
      photo: "photos/khamchych-yaroslav.jpg",
      firstName: "Ярослав", lastName: "Хамчич",
      gender: "m",
      birth: { date: "1996-08-25" }
    },
    {
      id: "khamchych-veniamin",
      photo: "photos/khamchych-veniamin.jpg",
      firstName: "Веніамін", lastName: "Хамчич", patronymic: "Ярославович",
      gender: "m", fatherId: "khamchych-yaroslav", motherId: "khamchych-kseniia",
      birth: { date: "2021-04-24" }
    },
    {
      id: "dychko-serhii",
      photo: "photos/dychko-serhii.jpg",
      firstName: "Сергій", lastName: "Дичко", patronymic: "Анатолійович",
      gender: "m", fatherId: "dychko-anatolii", motherId: "dychko-svitlana",
      birth: { date: "2002-08-08", place: "с. Нововасилівка, Миколаївська область" },
      facts: {
        "Професія": "Програміст",
        "Освіта": [
          "Нововасилівська ЗОШ І–ІІІ ступенів, 1–4 класи",
          "Снігурівська районна гімназія імені Т. Г. Шевченка, 5–11 класи",
          "Чорноморський національний університет імені Петра Могили, бакалавр, спеціальність «Комп'ютерні науки»"
        ]
      }
    },
    // Батьки Анатолія та його брат і сестра
    {
      id: "dychko-viktor",
      firstName: "Віктор", lastName: "Дичко",
      gender: "m",
      birth: { date: "1944-09-05" },
      spouses: [{ id: "dychko-liubov" }]
    },
    {
      id: "dychko-liubov",
      firstName: "Любов", lastName: "Дичко", patronymic: "Василівна", maidenName: "Авраменко",
      gender: "f", fatherId: "avramenko-vasyl", motherId: "avramenko-arkseniia",
      birth: { date: "1949-05-15" },
      death: { date: "2023-08-16" }
    },
    {
      id: "dychko-volodymyr",
      firstName: "Володимир", lastName: "Дичко", patronymic: "Вікторович",
      gender: "m", photo: "photos/dychko-volodymyr.jpg", fatherId: "dychko-viktor", motherId: "dychko-liubov",
      spouses: [{ id: "dychko-tetiana" }]
    },
    {
      id: "dychko-tetiana",
      firstName: "Тетяна", lastName: "Дичко", maidenName: "Чепіль",
      gender: "f",
      photo: "photos/dychko-tetiana.jpg"
    },
    {
      id: "dychko-inna",
      photo: "photos/dychko-inna.jpg",
      firstName: "Інна", lastName: "Дичко", patronymic: "Володимирівна",
      gender: "f", fatherId: "dychko-volodymyr", motherId: "dychko-tetiana",
      birth: { date: "1996-06-01" }
    },
    {
      id: "dychko-alona",
      photo: "photos/dychko-alona.jpg",
      firstName: "Альона", lastName: "Дичко", patronymic: "Володимирівна",
      gender: "f", fatherId: "dychko-volodymyr", motherId: "dychko-tetiana",
      birth: { date: "--03-01" }
    },
    {
      id: "kovalenko-tetiana",
      firstName: "Тетяна", lastName: "Коваленко", patronymic: "Вікторівна", maidenName: "Дичко",
      gender: "f", photo: "photos/kovalenko-tetiana.jpg", fatherId: "dychko-viktor", motherId: "dychko-liubov",
      spouses: [{ id: "kovalenko-andrii" }]
    },
    {
      id: "kovalenko-andrii",
      firstName: "Андрій", lastName: "Коваленко",
      gender: "m",
      photo: "photos/kovalenko-andrii.jpg"
    },
    {
      id: "ocheretianyi-yevhen",
      firstName: "Євген", lastName: "Очеретяний", patronymic: "Андрійович",
      gender: "m", photo: "photos/ocheretianyi-yevhen.jpg", fatherId: "kovalenko-andrii", motherId: "kovalenko-tetiana",
      birth: { date: "1999-10-08" }
    },
    {
      id: "kovalenko-volodymyr",
      firstName: "Володимир", lastName: "Коваленко", patronymic: "Андрійович",
      gender: "m", photo: "photos/kovalenko-volodymyr.jpg", fatherId: "kovalenko-andrii", motherId: "kovalenko-tetiana",
      birth: { date: "2004-04-21" }
    },

    // Батьки Світлани та її брат
    {
      id: "nakonechnyi-anton",
      photo: "photos/nakonechnyi-anton.jpg",
      firstName: "Антон", lastName: "Наконечний", patronymic: "Семенович",
      gender: "m", fatherId: "nakonechnyi-semen", motherId: "dembytska-mariia",
      birth: { date: "1946-03-15", place: "с. Коси, Вінницька область" },
      spouses: [{ id: "nakonechna-lidiia" }]
    },
    {
      id: "nakonechna-lidiia",
      photo: "photos/nakonechna-lidiia.jpg",
      firstName: "Лідія", lastName: "Наконечна", patronymic: "Марківна", maidenName: "Дяченко",
      gender: "f", fatherId: "diachenko-fedir", motherId: "chernukha-nadiia",
      birth: { date: "1948-10-13", place: "Новокандакове" }
    },
    {
      id: "nakonechnyi-volodymyr",
      photo: "photos/nakonechnyi-volodymyr.jpg",
      firstName: "Володимир", lastName: "Наконечний", patronymic: "Антонович",
      gender: "m", fatherId: "nakonechnyi-anton", motherId: "nakonechna-lidiia",
      birth: { date: "1974-08-13" },
      spouses: [{ id: "nakonechna-iryna" }]
    },
    {
      id: "nakonechna-iryna",
      photo: "photos/nakonechna-iryna.jpg",
      firstName: "Ірина", lastName: "Наконечна", patronymic: "Анатоліївна", maidenName: "Батьо",
      gender: "f",
      birth: { date: "--06-18" }
    },
    {
      id: "nakonechnyi-volodymyr-2005",
      photo: "photos/nakonechnyi-volodymyr-2005.jpg",
      firstName: "Володимир", lastName: "Наконечний", patronymic: "Володимирович",
      gender: "m", fatherId: "nakonechnyi-volodymyr", motherId: "nakonechna-iryna",
      birth: { date: "2005-04-18" }
    },
    {
      id: "nakonechnyi-artem",
      photo: "photos/nakonechnyi-artem.jpg",
      firstName: "Артем", lastName: "Наконечний", patronymic: "Володимирович",
      gender: "m", fatherId: "nakonechnyi-volodymyr", motherId: "nakonechna-iryna",
      birth: { date: "2020-12-01" }
    },

    // Прадіди
    {
      id: "avramenko-vasyl",
      firstName: "Василь", lastName: "Авраменко", patronymic: "Кирилович",
      gender: "m",
      birth: { date: "1911" },
      facts: {
        "Нагороди": "Медаль «За бойові заслуги» (1945)",
        "Військове звання": "Гвардії рядовий",
        "Посада": "Кухар 2-го стрілецького батальйону"
      },
      bio: "Народився 1911 року. У березні 1944 року його призвав Снігурівський райвійськкомат Миколаївської області, з квітня 1944 року був на фронті. Служив гвардії рядовим, кухарем 2-го стрілецького батальйону 309-го гвардійського стрілецького полку 109-ї гвардійської стрілецької дивізії 2-го Українського фронту.\n\n20 травня 1945 року нагороджений медаллю «За бойові заслуги». У нагородному наказі написано, що з жовтня 1944 року в боях у важких гірсько-лісистих місцевостях він готував гарячу й смачну їжу і в будь-який час дня й ночі доставляв її на передову, не зважаючи на вогонь і контратаки ворога. Його назвали хорошим кухарем, який любить свою справу. Поранень не мав.\n\nСусідні записи в тому ж наказі описують бої полку біля міста Брно в Чехословаччині у квітні й травні 1945 року.",
      events: [
        { date: "1944-03", title: "Призваний до армії", text: "Снігурівський райвійськкомат, Миколаївська область" },
        { date: "1944-04", title: "На фронті" },
        { date: "1944-10", title: "Бої в гірсько-лісистій місцевості", text: "Кухар 2-го стрілецького батальйону, доставляв їжу на передову" },
        { date: "1945-05-20", title: "Нагороджений медаллю «За бойові заслуги»", text: "309-й гвардійський стрілецький полк, 109-а гвардійська стрілецька дивізія" }
      ],
      gallery: [
        { src: "photos/docs/avramenko-vasyl-nagoroda-1945.jpg", caption: "Наказ про нагородження медаллю «За бойові заслуги», 20.05.1945, пункт 1" }
      ],
      sources: [
        { title: "Пам'ять народу: Авраменко Василий Кириллович, 1911", url: "https://pamyat-naroda.ru/heroes/?adv_search=y&last_name=Авраменко&first_name=Василий&middle_name=Кириллович" }
      ],
      spouses: [{ id: "avramenko-arkseniia" }]
    },
    {
      id: "avramenko-arkseniia",
      firstName: "Арксенія", lastName: "Авраменко", patronymic: "Іванівна",
      gender: "f"
    },
    {
      id: "nakonechnyi-semen",
      firstName: "Семен", lastName: "Наконечний", patronymic: "Ілліч",
      gender: "m",
      birth: { date: "1911", place: "с. Коси, Вінницька область" },
      facts: { "Нагороди": "Орден Вітчизняної війни I ступеня" },
      bio: "Народився 1911 року в селі Коси на Поділлі, тепер це Могилів-Подільський район Вінницької області. Коси старе село, перші згадки про нього датуються серединою XVI століття.\n\nУчасник Другої світової війни, нагороджений орденом Вітчизняної війни I ступеня.",
      sources: [
        { title: "Пам'ять народу: Наконечный Семен Ильич, 1911", url: "https://pamyat-naroda.ru/heroes/?adv_search=y&last_name=Наконечный&first_name=Семен&middle_name=Ильич" },
        { title: "Вікіпедія: Коси (Могилів-Подільський район)", url: "https://uk.wikipedia.org/wiki/Коси_(Могилів-Подільський_район)" }
      ],
      spouses: [{ id: "dembytska-mariia" }]
    },
    {
      id: "dembytska-mariia",
      firstName: "Марія", lastName: "Дембицька", patronymic: "Фамінна",
      gender: "f",
      birth: { date: "1914" }
    },
    {
      id: "diachenko-fedir",
      photo: "photos/diachenko-fedir.jpg",
      firstName: "Федір", lastName: "Дяченко", patronymic: "Митрофанович",
      gender: "m",
      birth: { date: "1916", place: "с. Єлизаветівка, Новокандаківська сільрада, Снігурівський район, Миколаївська область" },
      death: { date: "1945-04-18", place: "Нойгарденберг, Бранденбург, Німеччина", burial: "Первинне поховання: північна околиця Нойгарденберга, Бранденбург, Німеччина" },
      facts: {
        "Нагороди": ["Медаль «За відвагу» (23.02.1945)", "Орден Вітчизняної війни II ступеня (20.06.1945, посмертно)"],
        "Військова частина": "4-а стрілецька рота 2-го батальйону 1010-го стрілецького полку 266-ї стрілецької дивізії",
        "Військовий фах": "Ручний кулеметник"
      },
      bio: "Народився 1916 року в селі Єлизаветівка Новокандаківської сільради на Снігурівщині. Там же жила його дружина Надія Михайлівна. За одним з документів, на початку війни він потрапив у полон і пізніше був звільнений. 13 квітня 1944 року, одразу після звільнення Миколаївщини, його призвав Снігурівський райвійськкомат. Пройшов 188-й армійський запасний стрілецький полк, у травні 1944 року направлений до 266-ї стрілецької дивізії, з липня 1944 року на фронті. Воював червоноармійцем, ручним кулеметником 4-ї стрілецької роти 2-го батальйону 1010-го стрілецького полку 266-ї Артемівської Червонопрапорної ордена Суворова стрілецької дивізії.\n\n12 лютого 1945 року в бою за прорив сильно укріпленої оборони біля села Амт-Кініц у Німеччині він непомітно висунувся попереду бойових порядків і вогнем кулемета знищив снайпера та вогневу точку противника. За це 23 лютого 1945 року нагороджений медаллю «За відвагу». До того нагород не мав, поранень теж.\n\nЗагинув 18 квітня 1945 року, на третій день Берлінської наступальної операції. Похований на північній околиці села Нойгарденберг у Бранденбурзі, неподалік Зеєловських висот. 20 червня 1945 року посмертно нагороджений орденом Вітчизняної війни II ступеня. Орден разом з листом командування полку надіслали дружині, Надії Михайлівні: «Ваш чоловік у боротьбі за свободу Радянської Батьківщини загинув на полі бою смертю хоробрих».",
      events: [
        { date: "1944-04-13", title: "Призваний до армії", text: "Снігурівський райвійськкомат, Миколаївська область" },
        { date: "1944-05-17", title: "Направлений до 266-ї стрілецької дивізії", text: "З 188-го армійського запасного стрілецького полку" },
        { date: "1944-07-19", title: "На фронті" },
        { date: "1945-02-12", title: "Бій біля села Амт-Кініц, Німеччина", text: "Знищив снайпера і вогневу точку противника" },
        { date: "1945-02-23", title: "Нагороджений медаллю «За відвагу»", text: "Наказ по 1010-му стрілецькому полку № 2/н" },
        { date: "1945-04-18", title: "Загинув у бою", text: "Похований на північній околиці Нойгарденберга, Бранденбург" },
        { date: "1945-06-20", title: "Посмертно нагороджений орденом Вітчизняної війни II ступеня", text: "Наказ по 26-му гвардійському стрілецькому корпусу № 0123/н" }
      ],
      gallery: [
        { src: "photos/docs/diachenko-fedir-medal-1945.jpg", caption: "Наказ про нагородження медаллю «За відвагу», пункт 12: опис бою 12.02.1945" },
        { src: "photos/docs/diachenko-fedir-orden-1945.jpg", caption: "Наказ про нагородження орденом Вітчизняної війни II ступеня, пункт 5" },
        { src: "photos/docs/diachenko-fedir-vtraty-1945.jpg", caption: "Іменний список безповоротних втрат, запис 239: убитий 18.04.1945" },
        { src: "photos/docs/diachenko-fedir-spysok-1944.jpg", caption: "Список 1944 року, запис 72: призваний 13.04.1944, вибув до 266-ї стрілецької дивізії 17.05.1944" },
        { src: "photos/docs/diachenko-fedir-posvidchennia-1945.jpg", caption: "Тимчасові посвідчення до ордена і медалі, 1945" },
        { src: "photos/docs/diachenko-fedir-lyst-1945.jpg", caption: "Лист командування полку дружині, Надії Михайлівні" }
      ],
      sources: [
        { title: "Пам'ять народу: Дьяченко Федор Митрофанович, 1916", url: "https://pamyat-naroda.ru/heroes/person-hero124674877/" },
        { title: "Вікіпедія: 266-я стрелковая дивизия (3-го формирования)", url: "https://ru.wikipedia.org/wiki/266-я_стрелковая_дивизия_(3-го_формирования)" }
      ],
      spouses: [{ id: "chernukha-nadiia" }]
    },
    {
      id: "chernukha-nadiia",
      firstName: "Надія", lastName: "Чернуха", patronymic: "Михайлівна",
      gender: "f",
      facts: { "Місце проживання (1944–1945)": "с. Єлизаветівка, Новокандаківська сільрада, Снігурівський район" }
    },
    {
      id: "menshova-olena",
      firstName: "Олена", lastName: "Меньшова", maidenName: "Дяченко",
      gender: "f", fatherId: "diachenko-fedir", motherId: "chernukha-nadiia",
      birth: { date: "1939-01-28" },
      death: { date: "2021" }
    }
  ]
};
