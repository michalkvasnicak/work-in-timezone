export function offsetToHours(offset: string, timezoneOffset?: string): number {
  const [hours, minutes] = offset.split(':');
  const hoursNum = Number(hours);
  const negative = hoursNum < 0;
  const utcTzOffset = timezoneOffset ? offsetToHours(timezoneOffset) : 0;
  const offsetNum = Math.abs(hoursNum) + Number(minutes) / 60;

  return (negative ? -1 * offsetNum : offsetNum) + utcTzOffset;
}
