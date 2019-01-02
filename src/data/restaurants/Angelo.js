export const Angelo = {
    name: "Angelo",
    routeName: "Angelo",
    description: "fina hrana i tako ........",
    minOrderPrice: 10,
    workTime: "08.00 - 22.00",
    closingHours: "22:00",
    address: "dfsas",
    menu: [
      {
        categoryName: "Kuhano",
        foodList: [
          {
            foodName: "Gulaš",
            description: "Paradajz sos, šunka, sir, gljive",
            options: [
              { option: "", price: 3, },
            ],
            condiments: []
          },
          {
            foodName: "Supa",
            description: "Paradajz sos, šunka, sir, gljive",
            options: [
              { option: "", price: 3 },
            ],
            condiments: []
          },
          {
            foodName: "Čorba",
            description: "Paradajz sos, šunka, sir, gljive",
            options: [
              { option: "", price: 3 },
            ],
            condiments: []
          },
        ]
      },
      {
        categoryName: "Roštilj",
        foodList: [
          {
            foodName: "Ćevapi",
            description: "Paradajz sos, šunka, sir, gljive",
            options: [
              { option: "mali", price: 9 },
              { option: "srednji", price: 3 },
              { option: "veliki", price: 4 },
            ],
            condiments: [
              { condimentName: "Kečap " },
              { condimentName: "Senf " },
              { condimentName: "Majonez " },
            ]
          },
          {
            foodName: "Pljeskavica",
            description: "Paradajz sos, šunka, sir, gljive... Prilog po želji. ",
            options: [
              { price: 3 },
            ],
            condiments: [
              { condimentName: "Kečap " },
              { condimentName: "Senf " },
              { condimentName: "Majonez " },
              { condimentName: "Pomfrit" },
            ]
          },
        ]
      },
      {
        categoryName: "Doručak",
        foodList: [
          {
            foodName: "Jaja",
            description: "Kuhane, pržene, porcija od 300g + pogačice ...",
            options: [
              { price: 3 },
            ],
            condiments: [
              { condimentName: "kečap" },
              { condimentName: "senf" },
              { condimentName: "majonez" },
              { condimentName: "tartar sos" },
            ],
          },
          {
            foodName: "Hrenovke",
            description: "Kuhane, pržene, porcija od 300g + pogačice ...",
            options: [
              { price: 3 },
            ],
            condiments: [
              { condimentName: "senf" },
              { condimentName: "kečap" },
              { condimentName: "majonez" },
            ]
          },
        ]
      },
    ],
  }