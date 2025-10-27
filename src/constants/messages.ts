export const STATUS_MESSAGES = [
  "Awesome!",
  "You rock!",
  "You are really good at this!",
  "Too easy, right?",
  "Do your fingers hurt yet?",
  "Fabuloso!",
  "Fantastic!",
  "Next, please!",
  "When will it get harder?",
] as const;

export type StatusMessage = typeof STATUS_MESSAGES[number];

export function getRandomMessage(): string {
  return STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)];
}
