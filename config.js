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
    primary: "#f03c99",           // Main accent color (rose pink)
    accent: "#571f49",            // Secondary accent color (sky blue)
    dark: {
      background: "#f798c9",      // Slate 900
      text: "#ffffff",            // Slate 100
    },
    light: {
      background: "#86A788",      // Stone 50
      text: "#571e49",            // Slate 800
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
      type: "announcement",
      text: "It's your birthday!! :D",
      type: "fireworks2",
      count: 60,                   // Number of sparks per burst
      burts: 24,                    // Number of bursts
    },

    {
      type: "chatbox",
      message:
        "Happy birthday baba!! I hope that your day fills with happiness and today reminds you of how loved, special you are. May this year not be so harsh on you!",
      buttonText: "Send",
    },

    {
      type: "ideas",
      lines: [
        "That's what i just wanna say to you but i thought that its kinda... plain.",
        "Thats why I made this.",
        "I realized, I wanted to do something <strong>special</strong>, <br>that no one has ever done to you and something that'll be memorable to you.",
        "because... ",
        "You are <strong>Special</strong> baba !<span>:)</span>",
      ],
      bigLetters: "SO",
    },

    {
      type: "quote",
      text: "May today remind you that your presence has always been a gift, long before anyone wrapped one for you.",
      author: "Cel",
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
      banner: "./img/banner.jpg",
      wishTitle: "Happy Birthday!",
      wishText: "I hope this birthday becomes one of those days that you'll look back on <br> and smile not because it was perfect, but because it felt special garod ;)",
    },

    {
      type: "confetti2",
    },

    {
      type: "fireworks",
      count: 24,
    },
    {
      type: "confetti",
      count: 9,
    },

    {type: "balloons", count: 20

    },

    {
      type: "closing",
      text: "I hope you like it baba hehe, labyow.",
      replayText: "Or click, if you want to watch it again.",
    },
  ],
};
