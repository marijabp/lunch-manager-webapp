export const Healthy = {
    name: "Healthy",
    routeName: "Healthy",
    description: "fina hrana i tako",
    minOrderPrice: 8,
    closingHours: "23:00",
    address: "dfsasjkdajkda",
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