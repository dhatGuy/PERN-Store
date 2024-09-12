import type { Kysely } from "kysely";

export async function seed(db: Kysely<any>): Promise<void> {
  await db
    .insertInto("product")
    .values([
      {
        id: 1,
        name: "Swiss Cheese",
        slug: "swiss-cheese",
        price: 956.97,
        description:
          "Swiss cheese is a mild cow's milk cheese with a firmer texture than baby Swiss. The flavor is light, sweet, and nutty. Swiss cheese is distinguished by its luster, pale yellow color, and large holes (called eyes) caused by carbon dioxide released during the maturation process.",
        image_url: "https://i.ibb.co/N16wJ48/swiss-cheese.png",
      },
      {
        id: 2,
        name: "Pears",
        slug: "pears",
        price: 759.19,
        description:
          "Pears are rich in essential antioxidants, plant compounds, and dietary fiber. They pack all of these nutrients in a fat free, cholesterol free, 100 calorie package.",
        image_url: "https://i.ibb.co/4fn5HJv/pear.png",
      },
      {
        id: 3,
        name: "Wasabi Paste",
        slug: "wasabi-paste",
        price: 669.45,
        description:
          "Wasabi paste is spicy and pungent in flavour and is most commonly served with sushi and sashimi.",
        image_url: "https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg",
      },
      {
        id: 4,
        name: "Soup - Cambells Chicken",
        slug: "soup-cambells-chicken",
        price: 707.1,
        description:
          "You'll enjoy serving delicious, nutritious Campbells Chicken Noodle Soup to your children. Kids love Campbells Chicken Noodle Soup because it has bite-sized chicken, slurpable noodles, and a warm, savory broth. 12 cans weighing 10.75 oz each. Cans with a condensed flavor and an easy-to-open pop top. It's a quick and easy way to warm up mealtime for your kids at any time.",
        image_url: "https://i.ibb.co/Vp9fw0F/campbell-chicken-soup.jpg",
      },
      {
        id: 5,
        name: "Triple Sec-Mcguinness",
        slug: "triple-sec-mcguinness",
        price: 753.58,
        description:
          'When mixed with your favorite cocktail, McGuinness Triple Sec becomes three times more delicious. The drink\'s name means "dry" in French, and "triple" implies three times as dry, so it\'s no surprise that people fall in love with this whisky flavor.',
        image_url: "https://i.ibb.co/3TVtKHm/triple.jpg",
      },
      {
        id: 6,
        name: "Sage Ground",
        slug: "sage-ground",
        price: 936.89,
        description:
          "Sage is an excellent herb for seasoning fatty meats like pork, lamb, mutton, and game (goose or duck). It also complements onions, eggplant, tomatoes, and potatoes. Sage is frequently used in stuffings and cheeses.",
        image_url: "https://i.ibb.co/B65SyN5/sage-ground.jpg",
      },
      {
        id: 7,
        name: "Beef Consomme",
        slug: "beef-consume",
        price: 897.34,
        description:
          "A sauce or soup base made from clarified meat stock (usually beef, veal, or poultry, but also fish) into a clear and flavorful liquid broth. Egg whites are used to clarify the meat stock as well as any additional ingredients such as vegetables and/or herbs. While the mixture is being brought to a boil, it is being stirred. The boiled solution is no longer stirred as the egg whites solidify on top of the mixture, allowing the fats and impurities to be absorbed or attached to the white.",
        image_url: "https://i.ibb.co/Np4L8bs/beef-consomme.jpg",
      },
      {
        id: 8,
        name: "Sausage Chorizo",
        slug: "sausage-chorizo",
        price: 782.82,
        description:
          "Chorizo is a highly seasoned chopped or ground pork sausage that is commonly found in Spanish and Mexican cuisine. Mexican chorizo is made from fresh (raw, uncooked) pork, whereas Spanish chorizo is typically smoked.",
        image_url: "https://i.ibb.co/hXsSSCt/Sausage-Chorizo.jpg",
      },
      {
        id: 9,
        name: "Apple Custard",
        slug: "apple-custard",
        price: 802.23,
        description:
          "Custard apples have delicious mellow flesh that is almost as soft as custard. Custard apples are thought to have originated in South America and the West Indies. These apples are usually heart or oval in shape and can weigh up to 450g. They have quilted skin that is light tan or greenish in color and turns brown as the fruit ripens.",
        image_url:
          "https://i.ibb.co/ctRZSqC/sugar-apple-custard-apple-sharifa-1.jpg",
      },
      {
        id: 10,
        name: "Bacardi Breezer",
        slug: "bacardi-breezer",
        price: 890.29,
        description:
          "The Bacardi Breezer is an excellent way to enjoy the world's most popular rum – Bacardi. Bacardi Breezer Cranberry is a refreshing drink made from Bacardi rum, real cranberry juice, and carbonated water.",
        image_url: "https://i.ibb.co/4f81wgz/bacardi.png",
      },
      {
        id: 11,
        name: "Pita Bread",
        slug: "pita-bread",
        price: 935.72,
        description:
          "A versatile flat bread that is soft and slightly chewy on the inside and often has a pocket inside as a result of baking the bread in a hot oven. Pita bread is frequently mistakenly thought to be unleavened, but it is usually leavened with yeast. The bread can be eaten plain or with a drizzle of olive oil.",
        image_url:
          "https://i.ibb.co/G21ZsqY/Original-Pita-Bread-Front-1200x1200.jpg",
      },
      {
        id: 12,
        name: "English Muffins",
        slug: "english-muffins",
        price: 979.29,
        description:
          "A small, round, yeast-leavened sourdough bread that is commonly sliced horizontally, toasted, and buttered. In North America and Australia, it is commonly eaten for breakfast, often with sweet or savory toppings such as fruit jam or honey, or eggs, sausage, bacon, or cheese.",
        image_url: "https://i.ibb.co/B6pr46Z/muffins.png",
      },
      {
        id: 13,
        name: "Mince - Meat Filling",
        slug: "mince-meat-filling",
        price: 611.56,
        description:
          "Mincemeat is a combination of chopped dried fruit, distilled spirits, and spices, as well as occasionally beef suet, beef, or venison. Usually used as filling for mince pies during Christmas, but it tastes great mixed with vanilla ice cream, as well",
        image_url: "https://i.ibb.co/mCMhF9N/meat-filling.jpg",
      },
      {
        id: 14,
        name: "Pate - Cognac",
        slug: "pate-cognac",
        price: 787.14,
        description:
          "Pâté made with pork liver and meat that has been infused with cognac. The spirits complement the pâté's rich, smooth flavor, which is sure to appeal to foodies.",
        image_url: "https://i.ibb.co/8j9ghkk/Pate-Cognac.jpg",
      },
      {
        id: 15,
        name: "Lamb Shoulder (Boneless)",
        slug: "lamb-shoulder",
        price: 605,
        description:
          "Great for roasts, stews or any lamb recipe that has a marinade or a long slow cooking time and temperature.",
        image_url: "https://i.ibb.co/h9Bm7nP/lamb-shoulder.png",
      },
      {
        id: 16,
        name: "Icecream - Dark Super Cone",
        slug: "icecream-dark-super-cone",
        price: 867.05,
        description:
          "Natural flavors, colors, and fragrances Contains no peanuts or nuts. 4 cones of French Vanilla ice cream and 4 cones of Dark Chocolate ice cream with a thick dark chocolate core These Super Cones are made with 100% Canadian dairy and are wrapped in dark chocolate sugar cones with a chocolate topping. A fantastic flavor offering in a great family package.\nDelectables for a single serving. Produced in a peanut and nut-free environment.",
        image_url: "https://i.ibb.co/KXqcnsG/icecream.png",
      },
      {
        id: 17,
        name: "Puree Raspberry",
        slug: "puree-raspberry",
        price: 717.68,
        description:
          "Make the perfect summer sorbet to cool off in style! This 100% natural frozen puree is made of 90% fruit and 10% sugar, with no artificial flavors, colorings, or preservatives: simple, fresh, and delicious! Make sorbets, smoothies, ice creams, jellies and jams, sauces, and pastry fillings with this raspberry puree.",
        image_url: "https://i.ibb.co/1LX9RMw/puree-raspberry.jpg",
      },
      {
        id: 18,
        name: "Black Currant Jelly",
        slug: "black-currant jelly",
        price: 898.42,
        description:
          "The natural flavor of the fruit is preserved by gently cooking in the French countryside tradition.\nSweetened only with vineyard ripened grape and fruit juices, 100 percent from fruit Authentic French Recipe, Gently cooked to preserve the natural flavor of the fruit, Gluten-Free, Only Natural Sugars, Non-Genetically Modified Ingredients, No Cane Sugars, Corn Syrups, Artificial Sweeteners, Colors, Flavors, or Preservatives, All Natural Ingredients",
        image_url: "https://i.ibb.co/znrFfPt/jam.jpg",
      },
      {
        id: 19,
        name: "Rice - 7 Grain Blend",
        slug: "rice-7-grain-blend",
        price: 732.36,
        description:
          "Rice with a brown hue. Barley. Millet. Flax seed is a type of seed. Wheat. Quinoa in a red color. Rice from the wild. Microwave for 90 seconds in the pouch. USDA certified organic. 100% Whole Grain: 44 g or more per serving Consume 48 g or more of whole grains per day. You're only 90 seconds away from a nutritious side dish or a meal on its own. It's that easy!",
        image_url: "https://i.ibb.co/Srv1Hjr/rice.png",
      },
      {
        id: 20,
        name: "Saskatoon Berries - Frozen",
        slug: "saskatoon-berries-frozen",
        price: 606.2,
        description:
          "Raw plant-based superfood jam-packed with nutrients to get you through the day! We can keep all of the benefits and flavors of fresh Saskatoon Berries by freeze drying them, making them an easy on-the-go treat! They're great as a healthy snack or added to cereals, smoothies, salads, and baking. A healthy diet high in vegetables and fruits may lower the risk of certain types of cancer.",
        image_url: "https://i.ibb.co/ZcPjq1Y/berry.png",
      },
    ])
    .execute();

  console.log("Seed data inserted successfully");
}
