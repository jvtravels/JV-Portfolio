export type FAQ = {
  question: string;
  answer: string;
};

export const FAQS: FAQ[] = [
  {
    question: "How do I work with founders, PMs, and engineers?",
    answer:
      "Mostly by talking early and often.\n\nI'm not a big fan of disappearing for two weeks and coming back with a grand reveal. I'd rather put rough thinking on the table, get challenged, and challenge back.\n\nWe figure it out together — it usually leads to a better product and fewer surprises.",
  },
  {
    question: "What kind of team am I looking for next?",
    answer:
      "A team that cares about making something genuinely good.\n\nI like working with people who are curious, open to debate, close to the product, and comfortable figuring things out together.\n\nBonus points if the whiteboard gets used a lot.",
  },
  {
    question: "Where do I start when the problem is still unclear?",
    answer:
      "Definitely not with Figma.\n\nI start by asking a lot of questions and understanding how people actually work. Then I figure out what matters versus what just sounds important.\n\nOnce that's clearer, the design part gets a lot easier.",
  },
  {
    question: "How do I use AI in my design process?",
    answer:
      "I use it to think faster, explore more directions, and prototype earlier.\n\nIt helps me spend less time on repetitive work and more time making the decisions that actually shape the product.",
  },
];
