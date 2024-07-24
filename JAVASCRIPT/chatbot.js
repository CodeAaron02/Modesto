const userMessage = [
  ["hi", "hey", "hello", "greetings"],
  ["sure", "yes", "no"],
  ["are you genious", "are you nerd", "are you intelligent"],
  ["i hate you", "i dont like you"],
  ["how are you", "how is life", "how are things", "how are you doing"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you", "who is your creator"],

  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself",
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "ok", "okay", "nice", "welcome"],
  ["thanks", "thank you"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["corona", "covid19", "coronavirus"],
  ["you are funny"],
  ["i dont know"],
  ["boring"],
  ["im tired"],
  [
    "what are your rates",
    "what is your rates",
    "rates",
    "how much",
    "magkano ang rates niyo",
    "magkano ang inyong rates nyo",
    "magkano rates nyo",
    "magkano rates nyo",
    "hello goodmorning, can i ask about your rates",
    "Hello goodmorning, can i ask about your rates",
  ],
  [
    "what are your packages",
    "packages",
    "ano ang packages niyo",
    "package",
    "ano ang services nyo",
  ],
  ["offers", "What are your offers"],
  [
    "location",
    "Where are you located?",
    "where are you?",
    "where is your place?",
  ],
  [
    "book",
    "how to book?",
    "how do i book",
    "how do i book in your resort?",
    "how do i book to your resort?",
    "booking",
    "reservation",
    "reserve",
    "how to reserve?",
    "how do i make a reservation?",
  ],
  [
    "contact",
    "contacts",
    "contact us",
    "email",
    "number",
    "No.",
    "Phone",
    "landline",
    "what are your contacts",
    "who do i contact?",
    "who to contact?",
  ],
  [
    "Activities",
    "activity",
    "what are your activities?",
    "what are youre activities",
    "what are you're activities?",
  ],
];
const botReply = [
  [
    "Hello! I am Modebot you can ask me about anything in our resort like packages, location, and rates.",
    "Hi! I am Modebot you can ask me about anything in our resort like packages, location, and rates.",
    "Hey! I am Modebot you can ask me about anything in our resort like packages, location, and rates.",
    "Hi there! I am Modebot you can ask me about anything in our resort like packages, location, and rates.",
  ],
  ["Okay"],
  ["Yes I am! "],
  ["I'm sorry about that. But I like you dude."],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually",
  ],
  ["I am always young."],
  ["I am just a bot", "I am a bot. What are you?"],
  ["Vince pogi"],
  ["I am Modebot"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Briyani", "Burger", "Sushi", "Pizza"],
  ["Dude!"],
  ["Yes?"],
  ["Please stay home"],
  ["Glad to hear it"],
  ["Say something interesting"],
  ["Sorry for that. Let's chat!"],
  ["Take some rest, Dude!"],
  ["Our rates are ranging from 150 to 180 pesos."],
  [
    "We have packages like DayTour Weekdays, DayTour Weekends & Holidays, Overnight, Day and Night for 22hrs. You can check their price lists in our Package Section.",
  ],
  [
    "We have packages like DayTour Weekdays, DayTour Weekends & Holidays, Overnight, Day and Night for 22hrs. You can check their price lists in our Package Section.",
  ],
  [
    "Modesto's farm and resort is located at Sitio 2, Sahingan, Balete, Batangas City you can search us in google, waze, maps.",
  ],
  [
    "You can book in our home page by clicking 'book now!'. Then fill up the forms, input the date and time when you would visit our resort then click 'done'. Your reservation would be sent to our human representative and will sent you a confirmation email.Thank you!",
  ],
  [
    "You can contact our human representative in our facebook page-https://www.facebook.com/profile.php?id=100090637717825&mibextid=JRoKGi, or contact us in this phone number-xxxxxxxxxx. For more details contact Ma'am Rowena Aguado in her facebook-https://www.facebook.com/rowena.aguado?mibextid=JRoKGi",
  ],
  [
    "Our activities includes swimming, billiard, table hockey, darts, and many more.",
  ],
];

const alternative = ["Did you spell it right?, can you repeat it again?"];

const synth = window.speechSynthesis;
const voices = [{ name: "Google UK English Female", lang: en - GB }];

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-GB";
  u.volume = 10;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  //containMessageCheck(string);
  if (item) return item;
  else return containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    [
      "Good Bye, dude",
      "Bye, See you!",
      "Dude, Bye. Take care of your health in this situation.",
    ],
    ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
    ["Have a pleasant evening!", "Good evening too", "Evening!"],
    ["Good morning, Have a great day!", "Morning, dude!"],
    ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"],
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"],
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}
function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}

// AI CHATHEAD

function openChatHead() {
  document.getElementById("chathead").style.display = "block";
}

function closeChatHead() {
  document.getElementById("chathead").style.display = "none";
}

// RESERVATION FORM

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const bookingDetails = {};
    for (const [key, value] of formData.entries()) {
      bookingDetails[key] = value;
    }

    // You can now process the booking details (e.g., send them to a server)
    console.log("Booking Details:", bookingDetails);

    // Clear form after submission (optional)
    form.reset();

    // Show success message (optional)
    alert("Booking successful!");
  });
});

// VOICE
