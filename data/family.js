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
      birth: { date: "1911" },
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
      firstName: "Федір", lastName: "Дяченко", patronymic: "Митрофанович",
      gender: "m",
      spouses: [{ id: "chernukha-nadiia" }]
    },
    {
      id: "chernukha-nadiia",
      firstName: "Надія", lastName: "Чернуха", patronymic: "Михайлівна",
      gender: "f"
    },
    {
      id: "menshova-olena",
      firstName: "Олена", lastName: "Меньшова", maidenName: "Дяченко",
      gender: "f", fatherId: "diachenko-fedir", motherId: "chernukha-nadiia",
      death: { date: "2021" }
    }
  ]
};
