const expressAsyncHandler = require("express-async-handler");
const chatbotModel = require("../model/chatbot");
const chatData = [
  {
    question: "Hello",
    answer: "Hi there! How can I help you with your day-old chick order today?",
  },
  {
    question: "Hi",
    answer: "Hello! How can I assist you with your day-old chick needs?",
  },
  {
    question: "Good morning",
    answer: "Good morning! How can I help you with your day-old chick order?",
  },
  {
    question: "Good afternoon",
    answer:
      "Good afternoon! How can I assist you with your day-old chick needs?",
  },
  {
    question: "Good evening",
    answer: "Good evening! How can I help you with your day-old chick order?",
  },
  {
    question: "What types of chicks do you offer?",
    answer:
      "We offer a variety of chicks including layers, broilers, and specialty breeds.",
  },
  {
    question: "What are the prices of your chicks?",
    answer:
      "Prices vary depending on the breed and quantity. Please visit our pricing page or contact us for detailed information.",
  },
  {
    question: "How do I place an order?",
    answer:
      "You can place an order through our website, over the phone, or by visiting our farm.",
  },
  {
    question: "Do you have a minimum order quantity?",
    answer: "Yes, the minimum order quantity is 10 chicks.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, bank transfers, and cash on delivery.",
  },
  {
    question: "How long does it take to process an order?",
    answer: "Orders are typically processed within 1-2 business days.",
  },
  {
    question: "Can I pre-order chicks for a future date?",
    answer:
      "Yes, you can pre-order chicks for a future date. Please specify the desired delivery date when placing your order.",
  },
  {
    question: "Do you ship chicks nationwide?",
    answer:
      "Yes, we ship chicks nationwide. Shipping fees may apply depending on your location.",
  },
  {
    question: "How are the chicks shipped?",
    answer:
      "Chicks are shipped in specially designed boxes to ensure their safety and comfort during transit.",
  },
  {
    question: "What is the cost of shipping?",
    answer:
      "Shipping costs vary based on the quantity of chicks and your location. Please contact us for a shipping quote.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you will receive a tracking number once your order has been shipped.",
  },
  {
    question: "What should I do when the chicks arrive?",
    answer:
      "When your chicks arrive, immediately place them in a brooder with heat, food, and water.",
  },
  {
    question: "Do you provide instructions for chick care?",
    answer:
      "Yes, we provide detailed instructions for chick care with every order.",
  },
  {
    question: "What if some chicks arrive dead or unhealthy?",
    answer:
      "Please contact us immediately if any chicks arrive dead or unhealthy. We offer a live arrival guarantee.",
  },
  {
    question: "Do you offer vaccinations for the chicks?",
    answer:
      "Yes, we offer vaccinations for certain diseases. Please inquire about our vaccination options when placing your order.",
  },
  {
    question: "Can I visit your farm to see the chicks?",
    answer:
      "Yes, farm visits are welcome by appointment. Please contact us to schedule a visit.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer refunds or replacements for any chicks that arrive dead or unhealthy. Please contact us within 24 hours of receiving your order.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via phone, email, or through the contact form on our website.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, we offer bulk discounts for large orders. Please contact us for more information.",
  },
  {
    question: "Are your chicks free-range or cage-raised?",
    answer:
      "Our chicks are raised in a free-range environment to ensure they are healthy and well-socialized.",
  },
  {
    question: "Do you offer any special breeds?",
    answer:
      "Yes, we offer a selection of specialty breeds. Please visit our website or contact us for more details.",
  },
  {
    question: "How often do you have new chicks available?",
    answer:
      "We have new chicks available weekly. Availability may vary based on the breed and demand.",
  },
  {
    question: "Can I change my order after it has been placed?",
    answer:
      "Changes to your order can be made within 24 hours of placing it. Please contact us as soon as possible to make any changes.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer gift cards. They can be purchased through our website or at our farm.",
  },
  {
    question: "What age are the chicks when shipped?",
    answer:
      "The chicks are typically one day old when shipped to ensure they arrive at your location as healthy as possible.",
  },
  {
    question: "Do you offer any guarantees on the sex of the chicks?",
    answer:
      "We offer sexed chicks for an additional fee, but there is a small chance of error. We guarantee at least 90% accuracy.",
  },
  {
    question: "How do I care for the chicks after they arrive?",
    answer:
      "After arrival, place the chicks in a brooder with a heat lamp, provide fresh water and chick starter feed, and ensure they have enough space to move around comfortably.",
  },
  {
    question: "What temperature should the brooder be?",
    answer:
      "The brooder should be kept at around 95°F (35°C) for the first week. Gradually decrease the temperature by 5°F each week until the chicks are fully feathered.",
  },
  {
    question: "What type of feed should I give the chicks?",
    answer:
      "Feed the chicks a high-quality chick starter feed that contains at least 18-20% protein for the first 6-8 weeks.",
  },
  {
    question: "How much space do the chicks need?",
    answer:
      "Each chick needs about 0.5 square feet of space for the first two weeks. As they grow, increase the space to about 1 square foot per chick.",
  },
  {
    question: "Can I mix different breeds of chicks together?",
    answer:
      "Yes, different breeds of chicks can be raised together as long as they are of similar size and temperament.",
  },
  {
    question: "Do you provide any guarantees on the health of the chicks?",
    answer:
      "Yes, we provide a live arrival guarantee. If any chicks arrive dead or unhealthy, please contact us immediately for a refund or replacement.",
  },
  {
    question: "What should I do if a chick looks sick?",
    answer:
      "If a chick looks sick, isolate it from the others, keep it warm, and provide fresh water and feed. Contact a veterinarian if necessary.",
  },
  {
    question: "Can I return the chicks if I change my mind?",
    answer:
      "Unfortunately, we cannot accept returns of live chicks due to biosecurity and health concerns. Please make sure you are ready to care for them before ordering.",
  },
  {
    question: "Do you offer any discounts for schools or educational programs?",
    answer:
      "Yes, we offer discounts for schools and educational programs. Please contact us for more details.",
  },
  {
    question: "How do I know which breed is right for me?",
    answer:
      "Consider what you want from your chickens (e.g., egg production, meat, pets) and research the characteristics of different breeds. You can also contact us for personalized recommendations.",
  },
  {
    question: "What is the lifespan of a chick?",
    answer:
      "Chickens can live for 5-10 years, depending on the breed and care they receive.",
  },
  {
    question: "How do I keep the chicks safe from predators?",
    answer:
      "Ensure the brooder and coop are secure with no gaps or holes that predators can get through. Use sturdy wire mesh and keep the area well-lit at night.",
  },
  {
    question: "What should I do if my chicks stop eating or drinking?",
    answer:
      "Check the temperature of the brooder, ensure fresh water and feed are available, and observe for any signs of illness. Contact a veterinarian if the problem persists.",
  },
];

const insertChatData = async () => {
  try {
    await chatbotModel.insertMany(chatData);
    console.log("Chat data inserted successfully");
  } catch (error) {
    console.error("Error inserting chat data: ", error);
  }
};

const getAnswer = expressAsyncHandler(async (req, res, next) => {
  try {
    const { question } = req.body;
    // Use a regular expression with the 'i' flag for case-insensitive matching
    const match = await chatbotModel.findOne({
      question: { $regex: new RegExp(`^${question}$`, "i") },
    });

    if (!match) {
      return next(res.send({
        success: false,
        answer: "Invalid question!",
      }));
    }

    const answer = match?.answer;

    res.send({
      success: true,
      answer,
    });
  } catch (error) {
    console.log('err',error)
    return next(
      res.send({
        success: false,
        message: error.message,
      })
    );
  }
});

module.exports = { insertChatData, getAnswer };
