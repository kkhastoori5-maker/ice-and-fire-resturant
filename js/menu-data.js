/**
 * Ice & Fire Restaurant - Official Menu & Data Store
 * Faisal Tower, Mini Market Rd, Satellite Town, Quetta
 * Contact: 081-2444351 / 0333-7840004
 */

const DEFAULT_RESTAURANT_INFO = {
  name: "Ice & Fire Restaurant",
  tagline: "Cafe, Restaurant & Bar • A Fusion Concept",
  phone: "081-2444351",
  whatsapp: "0333-7840004",
  address: "Faisal Tower, 5283+MX6, Mini Market Rd, Satellite Town, Quetta, Pakistan",
  googleMapsUrl: "https://maps.google.com/?q=5283%2BMX6+Satellite+Town+Quetta+Pakistan",
  minFreeDelivery: 1000,
  deliveryFee: 100,
  timing: "12:00 PM - 02:00 AM (Daily)",
  facebook: "fb@iceandfireresturant",
  instagram: "Insta@iceandfireresturant"
};

const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Dishes", icon: "✨" },
  { id: "starter", name: "Starters & Fries", icon: "🍟" },
  { id: "soup", name: "Gourmet Soups", icon: "🍲" },
  { id: "burger", name: "Burgers & Grill", icon: "🍔" },
  { id: "sandwich", name: "Artisan Sandwiches", icon: "🥪" },
  { id: "pasta", name: "Italian Pastas", icon: "🍝" },
  { id: "mocktail", name: "Special Mocktails", icon: "🍹" },
  { id: "margarita", name: "Ice Margaritas", icon: "🍸" },
  { id: "hot-beverages", name: "Hot Beverages & Coffee", icon: "☕" },
  { id: "smoke-item", name: "Smoke Experience", icon: "💨" },
  { id: "icecream-shakes", name: "Ice Cream Shakes", icon: "🥤" },
  { id: "fresh-fruit-shakes", name: "Fresh Fruit Shakes", icon: "🥭" },
  { id: "fresh-juice", name: "Pure Fresh Juices", icon: "🍊" },
  { id: "handmade-icecream", name: "Hand Made Ice Cream", icon: "🍨" }
];

const DEFAULT_MENU_ITEMS = [
  // --- STARTER ---
  {
    id: "item-1",
    num: 1,
    name: "Pizza Fries",
    urdu: "پیزا فرائیز",
    category: "starter",
    price: 540,
    badge: "Bestseller 🔥",
    description: "Golden crispy fries loaded with melted mozzarella, pizza sauce, chicken chunks, and black olives.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-2",
    num: 2,
    name: "Masala Lemon Fries",
    urdu: "مصالحہ لیمن فرائیز",
    category: "starter",
    price: 220,
    badge: "Tangy & Spicy",
    description: "Crispy hand-cut potato fries tossed in zesty chatpata spices and fresh lemon squeeze.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-3",
    num: 3,
    name: "Mayo Garlic Fries",
    urdu: "مائیو گارلک فرائیز",
    category: "starter",
    price: 240,
    badge: "Popular",
    description: "Classic French fries smothered in signature creamy roasted garlic mayonnaise.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-4",
    num: 4,
    name: "French Fries",
    urdu: "فرائیز",
    category: "starter",
    price: 210,
    badge: "Classic",
    description: "Crispy, salted golden French fries served fresh and hot with dip.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- SOUP (Full / Half) ---
  {
    id: "item-5",
    num: 5,
    name: "Ice & Fire Special Soup",
    urdu: "آئس اینڈ فائر اسپیشل سوپ",
    category: "soup",
    price: 1040,
    halfPrice: 550,
    hasSizes: true,
    badge: "Chef Signature ⭐",
    description: "Our legendary house special soup packed with shredded chicken, prawns, black mushrooms, and chili broth.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-6",
    num: 6,
    name: "Chicken Corn Soup",
    urdu: "چکن کارن سوپ",
    category: "soup",
    price: 890,
    halfPrice: 440,
    hasSizes: true,
    badge: "Favorite",
    description: "Rich traditional chicken broth with tender shredded chicken, sweet corn, and egg ribbons.",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-7",
    num: 7,
    name: "Hot & Sour Soup (Red / White)",
    urdu: "ہاٹ اینڈ ساور سوپ (ریڈ / وائٹ)",
    category: "soup",
    price: 930,
    halfPrice: 460,
    hasSizes: true,
    badge: "Spicy 🔥",
    description: "Authentic spicy and tangy soup with minced chicken, fresh seasonal vegetables, mushrooms, and egg drops.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-8",
    num: 8,
    name: "Chicken Thai Soup",
    urdu: "چکن تھائی سوپ",
    category: "soup",
    price: 880,
    halfPrice: 440,
    hasSizes: true,
    badge: "Aromatic",
    description: "Fragrant clear broth infused with lemongrass, ginger, tender chicken chunks, and fresh green chilies.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-9",
    num: 9,
    name: "Chicken Vegetable Soup",
    urdu: "چکن ویجیٹیبل سوپ",
    category: "soup",
    price: 880,
    halfPrice: 490,
    hasSizes: true,
    badge: "Healthy",
    description: "Wholesome clear soup packed with diced chicken, cabbage, carrots, sweet peas, and mild herbs.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-10",
    num: 10,
    name: "Vegetable Soup",
    urdu: "ویجیٹیبل سوپ",
    category: "soup",
    price: 650,
    halfPrice: 350,
    hasSizes: true,
    badge: "Vegetarian 🌱",
    description: "Light and comforting soup simmered with garden vegetables, gentle herbs, and a savory broth.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- SANDWICH ---
  {
    id: "item-11",
    num: 11,
    name: "Ice & Fire Special Bombai Sandwich",
    urdu: "آئس اینڈ فائر اسپیشل بمبئی سینڈوچ",
    category: "sandwich",
    price: 550,
    badge: "Specialty ⭐",
    description: "Triple-layered toasted bread stuffed with spiced shredded chicken, masala mix, cheese, and signature mint mayo.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-12",
    num: 12,
    name: "Chicken Mexican Sandwich",
    urdu: "چکن میکسیکن سینڈوچ",
    category: "sandwich",
    price: 540,
    badge: "Fiery 🔥",
    description: "Grilled Mexican salsa chicken, jalapenos, melted cheese, and capsicum in grilled artisan bread.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-13",
    num: 13,
    name: "Club Sandwich",
    urdu: "کلب سینڈوچ",
    category: "sandwich",
    price: 440,
    badge: "Classic",
    description: "Traditional double decker sandwich with chicken, boiled egg, cheese slice, lettuce, and tomatoes.",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-14",
    num: 14,
    name: "Chicken Sandwich",
    urdu: "چکن سینڈوچ",
    category: "sandwich",
    price: 310,
    badge: "Value",
    description: "Simple, tender shredded chicken filling blended with mayonnaise and mild black pepper on soft toast.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-15",
    num: 15,
    name: "Zinger Sandwich",
    urdu: "زنگر سینڈوچ",
    category: "sandwich",
    price: 530,
    badge: "Crispy",
    description: "Crispy golden fried zinger fillet tucked between toasted bread with secret garlic sauce and crisp lettuce.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-16",
    num: 16,
    name: "Bar B Q Cheese Sandwich",
    urdu: "بار بی کیو چیز سینڈوچ",
    category: "sandwich",
    price: 520,
    badge: "Smoky BBQ",
    description: "Charcoal-smoked BBQ shredded chicken topped with melted cheddar cheese slice and creamy sauce.",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- BURGER & GRILL ---
  {
    id: "item-17",
    num: 17,
    name: "Chicken Zinger Burger",
    urdu: "چکن زنگر برگر",
    category: "burger",
    price: 560,
    badge: "Bestseller 🔥",
    description: "Crispy batter-fried chicken thigh fillet topped with iceberg lettuce and creamy mayo inside a sesame bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-18",
    num: 18,
    name: "Chicken Zinger Cheese Burger",
    urdu: "چکن زنگر چیز برگر",
    category: "burger",
    price: 590,
    badge: "Cheesy",
    description: "Extra crispy chicken zinger crowned with an oozing slice of melted cheddar cheese and signature burger sauce.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-19",
    num: 19,
    name: "Double Decker Zinger Cheese Burger",
    urdu: "ڈبل ڈیکر زنگر چیز برگر",
    category: "burger",
    price: 750,
    badge: "Giant Feast 👑",
    description: "Two monster crispy zinger fillets, double cheese slices, crunchy lettuce, and special Ice & Fire sauce.",
    image: "https://images.unsplash.com/photo-1583032015879-11ba2d3122c4?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-20",
    num: 20,
    name: "Chicken Burger",
    urdu: "چکن برگر",
    category: "burger",
    price: 410,
    badge: "Classic",
    description: "Juicy minced chicken patty seasoned with aromatic herbs, onions, tomatoes, and mayonnaise.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-21",
    num: 21,
    name: "Chicken Cheese Burger",
    urdu: "چکن چیز برگر",
    category: "burger",
    price: 440,
    badge: "Popular",
    description: "Grilled chicken patty with melted cheese slice, crisp greens, and creamy house dressing.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-22",
    num: 22,
    name: "Chicken Lava Burger",
    urdu: "چکن لاوا برگر",
    category: "burger",
    price: 590,
    badge: "Molten Cheese 🔥",
    description: "Stuffed chicken patty bursting with molten cheese lava from the center. A true sensation!",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-23",
    num: 23,
    name: "Beef Burger",
    urdu: "بیف برگر",
    category: "burger",
    price: 430,
    badge: "Beef Classic",
    description: "100% pure prime beef minced patty, flame-broiled to perfection with caramelized onions and pickles.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-24",
    num: 24,
    name: "Beef Cheese Burger",
    urdu: "بیف چیز برگر",
    category: "burger",
    price: 470,
    badge: "Juicy",
    description: "Flame-grilled juicy beef patty smothered in rich melted cheddar cheese and smoky BBQ relish.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-25",
    num: 25,
    name: "Beef Lava Burger",
    urdu: "بیف لاوا برگر",
    category: "burger",
    price: 610,
    badge: "Molten Lava 🔥",
    description: "Succulent beef patty stuffed with exploding cheddar and mozzarella lava. Cheese lovers' paradise.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-26",
    num: 26,
    name: "Special Grilled Burger",
    urdu: "اسپیشل گرلڈ برگر",
    category: "burger",
    price: 710,
    badge: "Chef Deluxe ⭐",
    description: "Char-grilled thick chicken or beef steak fillet, smoked beef bacon slice, mushrooms, and herb garlic sauce.",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- PASTA ---
  {
    id: "item-78",
    num: 78,
    name: "Chicken Lasanga Pasta",
    urdu: "چکن لزانیا پاستا",
    category: "pasta",
    price: 970,
    badge: "Baked Delight ⭐",
    description: "Layers of pasta sheets packed with seasoned chicken mince, creamy bechamel, rich marinara, and gratinated cheese.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-79",
    num: 79,
    name: "Fettuccine Pasta",
    urdu: "فیٹوچینی پاستا",
    category: "pasta",
    price: 890,
    badge: "Italian Classic",
    description: "Ribbon fettuccine tossed in a silky parmesan cream sauce with grilled garlic herb chicken slices.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-80",
    num: 80,
    name: "Smoke Italian Pasta",
    urdu: "سموک اٹالین پاستا",
    category: "pasta",
    price: 840,
    badge: "Smoky Aroma",
    description: "Penne pasta infused with charcoal smoked chicken, bell peppers, sun-dried herbs, and spicy rose cream sauce.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-81",
    num: 81,
    name: "Alfredo Pasta",
    urdu: "الفریڈو پاستا",
    category: "pasta",
    price: 930,
    badge: "Rich & Creamy",
    description: "Tender penne coated in velvety white alfredo sauce made from pure butter, heavy cream, mushrooms, and parmesan.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- MOCKTAIL ---
  {
    id: "item-82",
    num: 82,
    name: "Blue Lagoon",
    urdu: "بلیو لاگون",
    category: "mocktail",
    price: 470,
    badge: "Ice Frost ❄️",
    description: "Electrifying blue curacao syrup shaken with fresh lemon juice, sparkling soda, crushed ice, and citrus twist.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-83",
    num: 83,
    name: "Pink Lady",
    urdu: "پنک لیڈی",
    category: "mocktail",
    price: 510,
    badge: "Floral & Fruity",
    description: "Exotic blend of grenadine, fresh berries, lime, and crushed ice served with a sparkling fizz.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-84",
    num: 84,
    name: "Pina Colada",
    urdu: "پینا کولاڈا",
    category: "mocktail",
    price: 490,
    badge: "Tropical",
    description: "Rich creamy coconut cream blended with pure pineapple juice and ice. Smooth, sweet, and tropical.",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-85",
    num: 85,
    name: "Strawberry Freeze",
    urdu: "اسٹرابیری فریز",
    category: "mocktail",
    price: 470,
    badge: "Subzero Freeze ❄️",
    description: "Subzero frozen strawberry puree blended with fresh mint and sparkling soda. Super refreshing.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-86",
    num: 86,
    name: "Oreo Shake",
    urdu: "اوریو شیک",
    category: "mocktail",
    price: 470,
    badge: "Choco Crunch",
    description: "Real Oreo cookies blended with chocolate fudge, whole milk, and vanilla ice cream, topped with cookie crumbles.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-87",
    num: 87,
    name: "Kit Kat Shake",
    urdu: "کٹ کیٹ شیک",
    category: "mocktail",
    price: 590,
    badge: "Indulgence",
    description: "Crispy Kit Kat wafer bars crushed and whipped into a decadent creamy chocolate ice cream milkshake.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-88",
    num: 88,
    name: "Cold Coffee",
    urdu: "کولڈ کافی",
    category: "mocktail",
    price: 480,
    badge: "Chilled Brew",
    description: "Rich espresso shot blended with chilled creamy milk, chocolate drizzle, and vanilla ice cream scoop.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- MARGARITA ---
  {
    id: "item-89",
    num: 89,
    name: "Special Ice & Fire Margarita",
    urdu: "آئس اینڈ فائر مارگریٹا",
    category: "margarita",
    price: 490,
    badge: "Signature Clash ❄️🔥",
    description: "Dual-layer frozen cocktail with subzero icy blueberry slush over a fiery strawberry citrus kick with chili-salted rim.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-90",
    num: 90,
    name: "Mint Margarita",
    urdu: "منٹ مارگریٹا",
    category: "margarita",
    price: 330,
    badge: "Quetta Favorite",
    description: "Fresh garden mint leaves, freshly squeezed lemons, rock salt, crushed ice, and lemon-lime fizz.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-91",
    num: 91,
    name: "Blue Berry Margrita",
    urdu: "بلیو بیری مارگریٹا",
    category: "margarita",
    price: 410,
    badge: "Chilled Berry",
    description: "Sweet and tart wild blueberry syrup shaken with fresh citrus juice and crushed ice crystals.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-92",
    num: 92,
    name: "Lemonade",
    urdu: "لیمونیڈ",
    category: "margarita",
    price: 290,
    badge: "Refreshing",
    description: "Pure freshly pressed lemons, sugar syrup, rock salt, and ice-cold soda water.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- HOT BEVERAGES ---
  {
    id: "item-93",
    num: 93,
    name: "Special Caramel Coffee",
    urdu: "اسپیشل کیریمل کافی",
    category: "hot-beverages",
    price: 440,
    badge: "Barista Special",
    description: "Freshly roasted espresso with steamed silky milk, rich buttery caramel swirl, and caramel drizzle on top.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-94",
    num: 94,
    name: "Special Marshmallow Hot Choc",
    urdu: "اسپیشل مارشمیلو ہاٹ چاکلیٹ",
    category: "hot-beverages",
    price: 490,
    badge: "Warm Comfort ☕",
    description: "Thick European hot chocolate topped with pillowy soft toasted marshmallows and cocoa dusting.",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-95h",
    num: 95,
    name: "Cappuccino Coffee",
    urdu: "کیپوچینو کافی",
    category: "hot-beverages",
    price: 370,
    badge: "Classic Brew",
    description: "Bold dark espresso shot balanced with equal parts steamed milk and thick micro-foam with latte art.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-96h",
    num: 96,
    name: "Latte Coffee",
    urdu: "لاٹے کافی",
    category: "hot-beverages",
    price: 370,
    badge: "Smooth",
    description: "Smooth espresso blended with abundant velvety steamed milk and delicate foam finish.",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-97h",
    num: 97,
    name: "Black Coffee",
    urdu: "بلیک کافی",
    category: "hot-beverages",
    price: 250,
    badge: "Pure Espresso",
    description: "Pure, intense hot black coffee brewed from freshly ground Arabica beans without milk.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-98h",
    num: 98,
    name: "Hot Chocolate",
    urdu: "ہاٹ چاکلیٹ",
    category: "hot-beverages",
    price: 380,
    badge: "Rich Cacao",
    description: "Creamy melted dark Dutch chocolate whisked with steaming whole milk.",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-100h",
    num: 100,
    name: "Moka Coffee",
    urdu: "موکا کافی",
    category: "hot-beverages",
    price: 360,
    badge: "Choco Espresso",
    description: "Delicious combination of bold espresso, sweet chocolate sauce, and steamed milk with whipped cream.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- SMOKE ITEM ---
  {
    id: "item-101",
    num: 101,
    name: "Special Smoke Ice Cream",
    urdu: "اسپیشل سموک آئس کریم",
    category: "smoke-item",
    price: 990,
    badge: "Liquid Nitrogen Cloud 💨",
    description: "Dramatic dragon's breath liquid nitrogen infused ice cream sundae with wafting icy clouds, wafer sticks, and nuts.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- ICE CREAM SHAKES ---
  {
    id: "item-95s",
    num: 95,
    name: "Ice & Fire Special Ice Shake",
    urdu: "آئس اینڈ فائر اسپیشل آئس شیک",
    category: "icecream-shakes",
    price: 460,
    badge: "House Special ⭐",
    description: "Our signature multi-scoop sundae shake loaded with dry fruits, caramel swirl, and chocolate flakes.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-96s",
    num: 96,
    name: "Vanilla Ice Cream Shake",
    urdu: "ونیلا آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Classic",
    description: "Creamy Madagascar vanilla bean ice cream blended with cold fresh milk into a dreamy shake.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-97s",
    num: 97,
    name: "Strawberry Ice Cream Shake",
    urdu: "اسٹرابیری آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Berry Sweet",
    description: "Pink strawberry ice cream blended with sweet strawberry drizzle and chilled whole milk.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-98s",
    num: 98,
    name: "Chocolate Ice Cream Shake",
    urdu: "چاکلیٹ آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Choco Rich",
    description: "Deep dark chocolate ice cream whipped with Belgian cocoa sauce and chilled whole milk.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-99s",
    num: 99,
    name: "Kulfa Ice Cream Shake",
    urdu: "کلفہ آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Traditional",
    description: "Traditional royal kulfa ice cream infused with saffron, cardamom, and almond notes blended thick.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-100s",
    num: 100,
    name: "Kaju Ice Cream Shake",
    urdu: "کاجو آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Cashew Delight",
    description: "Rich roasted cashew nut ice cream whipped into a creamy, nutty, luxurious milkshake.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-101s",
    num: 101,
    name: "Pista Ice Cream Shake",
    urdu: "پستہ آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Pistachio",
    description: "Vibrant green pistachio ice cream blended with roasted pista shavings and sweet milk.",
    image: "https://images.unsplash.com/photo-1588710929895-6b45a4478144?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-102s",
    num: 102,
    name: "Blue Berry Ice Cream Shake",
    urdu: "بلیو بیری آئس کریم شیک",
    category: "icecream-shakes",
    price: 340,
    badge: "Fruity",
    description: "Blueberry ripple ice cream whipped into a refreshing thick shake with berry notes.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- FRESH FRUIT SHAKE (Seasonal Fruits) ---
  {
    id: "item-103",
    num: 103,
    name: "Ice & Fire Special Fruit Shake",
    urdu: "آئس اینڈ فائر اسپیشل فروٹ شیک",
    category: "fresh-fruit-shakes",
    price: 360,
    badge: "Supreme Blend ⭐",
    description: "A royal medley of seasonal fruits (mango, banana, peach, dates) blended fresh with thick farm milk and honey.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-104",
    num: 104,
    name: "Mango Shake",
    urdu: "مینگو شیک",
    category: "fresh-fruit-shakes",
    price: 230,
    badge: "Seasonal King",
    description: "Thick pulp of sweet Pakistani Chaunsa / Sindhri mangoes blended with pure milk and crushed ice.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-105",
    num: 105,
    name: "Banana Shake",
    urdu: "بنانا شیک",
    category: "fresh-fruit-shakes",
    price: 210,
    badge: "Nutritious",
    description: "Ripe golden bananas blended with fresh cold milk and a touch of organic honey.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-106",
    num: 106,
    name: "Strawberry Shake",
    urdu: "اسٹرابیری شیک",
    category: "fresh-fruit-shakes",
    price: 270,
    badge: "Fresh Berry",
    description: "Freshly plucked farm strawberries pureed with chilled milk and light sugar.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-107",
    num: 107,
    name: "Checko Shake (Chikoo)",
    urdu: "چیکو شیک",
    category: "fresh-fruit-shakes",
    price: 230,
    badge: "Caramel Taste",
    description: "Sweet brown sapodilla (chikoo) fruit blended with chilled creamy milk.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-108",
    num: 108,
    name: "Pineapple Shake",
    urdu: "پائن ایپل شیک",
    category: "fresh-fruit-shakes",
    price: 300,
    badge: "Zesty Sweet",
    description: "Juicy golden pineapple chunks blended with cold milk into a refreshing shake.",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-109",
    num: 109,
    name: "Peach Shake",
    urdu: "آڑو شیک",
    category: "fresh-fruit-shakes",
    price: 230,
    badge: "Quetta Peach",
    description: "Fresh fragrant Balochistan peaches whipped into a velvety smooth shake.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-110",
    num: 110,
    name: "Cocktail Shake",
    urdu: "کاکٹیل شیک",
    category: "fresh-fruit-shakes",
    price: 250,
    badge: "Fruit Mix",
    description: "A harmonious combination of assorted fresh fruit chunks in a creamy, sweet milk base.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-111",
    num: 111,
    name: "Khajoor Shake (Date Shake)",
    urdu: "کھجور شیک",
    category: "fresh-fruit-shakes",
    price: 250,
    badge: "Energy Booster",
    description: "Soft premium dates blended with milk, nuts, and natural honey. Wholesome and energizing.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- FRESH JUICE ---
  {
    id: "item-112",
    num: 112,
    name: "Falsa Juice",
    urdu: "فالسہ جوس",
    category: "fresh-juice",
    price: 280,
    badge: "Seasonal Special",
    description: "Pure freshly pressed purple falsa berry juice with rock salt and crushed ice. Cools the soul.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-113",
    num: 113,
    name: "Orange Juice",
    urdu: "اورنج جوس",
    category: "fresh-juice",
    price: 280,
    badge: "Vitamin C Boost",
    description: "100% pure cold-pressed sweet citrus oranges, pulp included, zero artificial sugar.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-114",
    num: 114,
    name: "Peach Juice",
    urdu: "آڑو جوس",
    category: "fresh-juice",
    price: 300,
    badge: "Fresh Pressed",
    description: "Nectar of sweet ripe peaches freshly pressed with chilled ice.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-115",
    num: 115,
    name: "Strawberry Juice",
    urdu: "اسٹرابیری جوس",
    category: "fresh-juice",
    price: 300,
    badge: "Pure Berry",
    description: "Fresh crushed crimson strawberries with a drop of fresh lemon juice and crushed ice.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },

  // --- HAND MADE ICE CREAM ---
  {
    id: "item-116",
    num: 116,
    name: "Ice & Fire Coctail Ice Cream",
    urdu: "آئس اینڈ فائر کاکٹیل آئس کریم",
    category: "handmade-icecream",
    price: 460,
    badge: "Masterpiece ⭐",
    description: "Handcrafted artisan gelato scoops crowned with fresh fruit cocktail, dry nuts, wafer, and fruit syrup.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-117",
    num: 117,
    name: "Faloda Ice Cream",
    urdu: "فالودہ آئس کریم",
    category: "handmade-icecream",
    price: 290,
    badge: "Royal Dessert",
    description: "Handcrafted kulfa ice cream served over silky vermicelli falooda noodles, basil seeds, and rooh afza syrup.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-118",
    num: 118,
    name: "Blue Berry Ice Cream",
    urdu: "بلیو بیری آئس کریم",
    category: "handmade-icecream",
    price: 250,
    badge: "Chilled Berry",
    description: "Rich artisanal cream churned with real crushed blueberries for an intense fruity experience.",
    image: "https://images.unsplash.com/photo-1588710929895-6b45a4478144?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-119",
    num: 119,
    name: "Milk Ice Cream",
    urdu: "ملک آئس کریم",
    category: "handmade-icecream",
    price: 330,
    badge: "Pure Cream",
    description: "Traditional pure buffalo milk ice cream slow-churned to velvety smooth, naturally sweet perfection.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-120",
    num: 120,
    name: "Tuti Frutti Ice Cream",
    urdu: "ٹوٹی فروٹی آئس کریم",
    category: "handmade-icecream",
    price: 270,
    badge: "Colorful",
    description: "Creamy delight speckled with colorful candied fruits and delicate citrus essence.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-121",
    num: 121,
    name: "Pine Apple Ice Cream",
    urdu: "پائن ایپل آئس کریم",
    category: "handmade-icecream",
    price: 260,
    badge: "Tangy & Sweet",
    description: "Slow-churned artisan ice cream folded with golden pineapple chunks and juice.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-122",
    num: 122,
    name: "Kulfa Ice Cream",
    urdu: "کلفہ آئس کریم",
    category: "handmade-icecream",
    price: 250,
    badge: "Desi Heritage",
    description: "Traditional condensed milk slow-cooked with cardamom, saffron, and crushed almonds.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-123",
    num: 123,
    name: "Kaju Ice Cream",
    urdu: "کاجو آئس کریم",
    category: "handmade-icecream",
    price: 250,
    badge: "Cashew Nutty",
    description: "Roasted cashew nuts pulverized into a luxurious creamy handmade ice cream base.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-124",
    num: 124,
    name: "Pista Ice Cream",
    urdu: "پستہ آئس کریم",
    category: "handmade-icecream",
    price: 250,
    badge: "Pistachio Classic",
    description: "Handcrafted rich pistachio ice cream loaded with crunchy salted roasted pista pieces.",
    image: "https://images.unsplash.com/photo-1588710929895-6b45a4478144?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-125",
    num: 125,
    name: "Chocolate Ice Cream",
    urdu: "چاکلیٹ آئس کریم",
    category: "handmade-icecream",
    price: 260,
    badge: "Rich Chocolate",
    description: "Pure dark chocolate and fresh cream churned into a decadent, velvety smooth scoop.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-126",
    num: 126,
    name: "Mango Ice Cream",
    urdu: "مینگو آئس کریم",
    category: "handmade-icecream",
    price: 230,
    badge: "Mango Churn",
    description: "Freshly churned ripe mango pulp with heavy sweet cream. Summertime favorite.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-127",
    num: 127,
    name: "Strawberry Ice Cream",
    urdu: "اسٹرابیری آئس کریم",
    category: "handmade-icecream",
    price: 230,
    badge: "Strawberry Cream",
    description: "Creamy pink handmade ice cream packed with natural farm strawberry pieces.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-128",
    num: 128,
    name: "Vanilla Ice Cream",
    urdu: "ونیلا آئس کریم",
    category: "handmade-icecream",
    price: 230,
    badge: "Timeless Vanilla",
    description: "Pure classic vanilla ice cream handcrafted with real whole cream and vanilla extract.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-fp-special",
    num: "FP-1",
    name: "Family Pack Ice Cream (Special)",
    urdu: "فیملی پیک آئس کریم (اسپیشل)",
    category: "handmade-icecream",
    price: 1150,
    halfPrice: 580,
    hasSizes: true,
    badge: "Family Feast 👨‍👩‍👧‍👦",
    description: "Large family tub with special dry fruit loaded hand made ice cream. Available in 1 Litre (Special 1150) or 500ml (580).",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "item-fp-plain",
    num: "FP-2",
    name: "Family Pack Ice Cream (Plain)",
    urdu: "فیملی پیک آئس کریم (پلین)",
    category: "handmade-icecream",
    price: 1050,
    halfPrice: 550,
    hasSizes: true,
    badge: "Family Classic",
    description: "Generous family pack of smooth classic handcrafted ice cream. Available in 1 Litre (Plain 1050) or 500ml (550).",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    inStock: true
  }
];

// Reference Menu Scans from the uploaded images
const MENU_SCANS = [
  {
    title: "Official Cover & Concept",
    image: "assets/images/hero-cover.png",
    subtitle: "Ice & Fire Restaurant • A Fusion Concept • Quetta"
  },
  {
    title: "Menu Page 1 - Starters, Soups, Burgers & Sandwiches",
    image: "assets/images/menu-starters-burgers.png",
    subtitle: "Pizza Fries, Lava Burgers, Zinger, Soups & Club Sandwiches"
  },
  {
    title: "Menu Page 2 - Pastas, Mocktails, Margaritas & Hot Beverages",
    image: "assets/images/menu-pasta-beverages.png",
    subtitle: "Lasagna, Fettuccine, Blue Lagoon, Smoke Ice Cream, Coffees"
  },
  {
    title: "Menu Page 3 - Ice Cream Shakes, Fresh Juices & Hand Made Ice Cream",
    image: "assets/images/menu-shakes-icecream.png",
    subtitle: "Hand Made Ice Cream, Fresh Fruit Shakes, Falooda, Family Packs"
  }
];

// --- STORAGE SYSTEM ---
const STORAGE_KEYS = {
  MENU: "ice_fire_menu_items",
  INFO: "ice_fire_restaurant_info",
  ORDERS: "ice_fire_orders",
  RESERVATIONS: "ice_fire_reservations",
  ADMIN_AUTH: "ice_fire_admin_auth"
};

function getRestaurantInfo() {
  const saved = localStorage.getItem(STORAGE_KEYS.INFO);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* fallback */ }
  }
  return { ...DEFAULT_RESTAURANT_INFO };
}

function saveRestaurantInfo(info) {
  localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(info));
}

function getMenuItems() {
  const saved = localStorage.getItem(STORAGE_KEYS.MENU);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) { /* fallback */ }
  }
  // Initialize storage with defaults
  saveMenuItems(DEFAULT_MENU_ITEMS);
  return [...DEFAULT_MENU_ITEMS];
}

function saveMenuItems(items) {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
}

function resetMenuItems() {
  saveMenuItems(DEFAULT_MENU_ITEMS);
  saveRestaurantInfo(DEFAULT_RESTAURANT_INFO);
  return [...DEFAULT_MENU_ITEMS];
}

function getOrders() {
  const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* fallback */ }
  }
  return [];
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function getReservations() {
  const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* fallback */ }
  }
  return [];
}

function saveReservations(reservations) {
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
}

// Global exposure
window.IceFireDB = {
  DEFAULT_RESTAURANT_INFO,
  DEFAULT_CATEGORIES,
  DEFAULT_MENU_ITEMS,
  MENU_SCANS,
  getRestaurantInfo,
  saveRestaurantInfo,
  getMenuItems,
  saveMenuItems,
  resetMenuItems,
  getOrders,
  saveOrders,
  getReservations,
  saveReservations
};
