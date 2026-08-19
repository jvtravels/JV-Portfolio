export type Article = {
  slug: string;
  image: string;
  title: string;
  description: string;
  date: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "the-art-of-moodboarding",
    image: "/Articles/A1.png",
    title: "The Art of Moodboarding",
    description: "Have you ever found yourself staring at the blank artboard for hours or even days sometimes?",
    date: "Mar 2025",
    body: [
      "Have you ever found yourself staring at the blank artboard for hours or even days sometimes? Before a single pixel gets placed, a moodboard is where I go to figure out what a brand should feel like, not just look like.",
      "A good moodboard isn't a mood board of pretty things. It's a set of decisions in disguise: this palette, not that one. This kind of type, not that kind. It narrows the space of possible directions before you've spent a single hour in Figma.",
      "The best ones I've made started with words, not images — three adjectives that had to be true at once, even when they pulled in different directions. Tension between references is where the interesting decisions live.",
    ],
  },
  {
    slug: "what-does-your-brand-sound-like",
    image: "/Articles/A2.png",
    title: "What Does Your Brand Sound Like?",
    description: "A ₹10 UPI payment at a neighbourhood shop often gets a clearer confirmation than a five-minute digital task.",
    date: "Jan 2025",
    body: [
      "A ₹10 UPI payment at a neighbourhood shop often gets a clearer confirmation than a five-minute digital task inside a well-funded product. That gap is a tone problem, not a technology problem.",
      "Sonic identity, microcopy, error tones — these are usually the last 5% of a project, bolted on right before launch. But they're often the only moment a user actually notices the brand is speaking to them at all.",
      "I've started treating tone-of-voice as a design deliverable with the same rigor as a color palette: opening tone, success tone, error tone, attention tone, each with a one-line definition the whole team can point to.",
    ],
  },
  {
    slug: "the-product-worked-the-experience-didnt",
    image: "/Articles/A3.png",
    title: "The Product Worked. The Experience Didn't.",
    description: "I once watched someone use an onboarding flow I had designed.",
    date: "Nov 2024",
    body: [
      "I once watched someone use an onboarding flow I had designed. Every screen worked exactly as specified. And yet halfway through, they sighed, out loud, at a form that was technically correct and emotionally exhausting.",
      "That's the gap between \"it works\" and \"it feels fine to use.\" Functional correctness is the floor, not the ceiling — and it's the easiest thing to mistake for a finished product.",
      "The fix wasn't a redesign. It was cutting two fields, reordering three others, and rewriting one error message so it explained what to do next instead of just what went wrong.",
    ],
  },
];
