export function getCurrentHour(): number {
  const now = new Date();

  return now.getHours() + now.getMinutes() / 60;
}
