export interface SubtitleItem {
  time: number;
  text: string;
}

export const subtitleData: SubtitleItem[] = [
  { time: 0, text: "Welcome to this comprehensive tutorial on React hooks." },
  { time: 5, text: "In this video, we'll explore how hooks revolutionized React development." },
  { time: 7, text: "We'll start with the basics of useState, the most commonly used hook." },
  { time: 12, text: "useState allows functional components to have local state." },
  { time: 16, text: "Here's how you can declare a state variable." }
];