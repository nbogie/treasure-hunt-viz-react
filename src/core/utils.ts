export function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => (Math.random() < 0.5 ? -1 : 1));
}
export function pick<T>(choices: T[]): T {
    return choices[Math.floor(Math.random() * choices.length)];
}
