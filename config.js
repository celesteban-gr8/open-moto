/**
 * ✨ EDIT THIS FILE to customize the birthday greeting! ✨
 *
 * This is the ONLY file you need to modify.
 * No need to touch HTML, CSS, or any other JavaScript files.
 *
 * AVAILABLE SECTION TYPES:
 *   "greeting"      → Opening greeting with recipient's name
 *   "announcement"  → Birthday announcement text
 *   "chatbox"       → Chat message with typing animation
 *   "ideas"         → Sequential text reveals, one by one
 *   "quote"         → Styled quote card with optional author
 *   "countdown"     → Animated 3-2-1 countdown
 *   "stars"         → Twinkling stars background
 *   "fireworks"     → Colorful firework sparks burst
 *   "balloons"      → Floating balloon animation
 *   "profile"       → Profile photo with birthday wish
 *   "confetti"      → Confetti burst animation
 *   "closing"       → Closing message with replay button
 *
 * HOW TO USE:
 *   REMOVE a section  → Delete its object from the sections array
 *   DUPLICATE          → Copy-paste any section object
 *   REORDER            → Move the section object up/down in the array
 *   EDIT TEXT          → Change the string values
 */

const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "Keziah Blest !",
  photo: "./img/pretty.jpg",       // Place your photo in the img/ folder
  music: "./music/daylight.mpeg",      // Place your music in the music/ folder

  // ── Theme Colors ──────────────────────────────────────────────
  // A toggle button lets the viewer switch between dark & light mode.
  colors: {
    primary: "#f472b6",           // Main accent color (rose pink)
    accent: "#60a5fa",            // Secondary accent color (sky blue)
    dark: {
      background: "#FDB5CE",      // Slate 900
      text: "#f1f5f9",            // Slate 100
    },
    light: {
      background: "#86A788",      // Stone 50
      text: "#571f49",            // Slate 800
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  // Options: "dark" or "light"
  defaultMode: "dark",

  // ── Sections ──────────────────────────────────────────────────
  // Add, remove, duplicate, or reorder as you wish!
  sections: [
    {
      type: "greeting",
      title: "Hi ",
      subtitle: "I always like that name because it's unique ya know because it's not common and forgettable.",
    },
    {
      type: "countdown",
      from: 3,                    // Countdown from this number
      goText: "🥳",               // Text shown after countdown ends
    },

    {
      type: "profile",
      photo: "./img/pretty2.jpg",
    },

    {
  type: "fireworks2",
  count: 60,
  bursts: 6,
},

    {
      type: "announcement",
      text: "It's your birthday!! :D",
    },
    
    {
      type: "chatbox",
      message:
        "Happy birthday to you baba!! I hope that your day fills with happiness and today reminds you of how loved, special you are. May this year not be so harsh on you!",
      buttonText: "Send",
    },
    {
      type: "ideas",
      lines: [
        "That's what I was going to do.",
        "But then I stopped.",
        "I realised, I wanted to do something <strong>special</strong>.",
        "For you because... ",
        "You are Special <span>:)</span>",
      ],
      bigLetters: "SO",
    },
    {
      type: "quote",
      text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
      author: "Oprah Winfrey",
    },
    {
      type: "stars",
      count: 40,
    },
    {
      type: "balloons",
      count: 25,
    },
    {
      type: "profile",
    },
    {
      type: "confetti2",
      wishTitle: "Happy Birthday!",
      wishText: "May today remind you that your presence has always been a gift, long before anyone wrapped one for you -cel ;)",
    },

    {
      type: "fireworks",
      count: 24,
    },
    {
      type: "confetti",
      count: 9,
    },
    {
      type: "closing",
      text: "I hope you like it baba hehe, labyow.",
      replayText: "Or click, if you want to watch it again.",
    },
  ],
};
