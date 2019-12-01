import { timezones } from './timezones';

export const availableTimezoneAbbrs = timezones.map(tz => tz.abbr);
export const availableTimezoneOffsets = timezones.map(tz => tz.offset);
export const timezonesByAbbr: {
  [tz: string]: { abbr: string; label: string; offset: string };
} = timezones.reduce((acc, tz) => ({ ...acc, [tz.abbr]: tz }), {});
export { timezones };

export * from './theme';
export * from './variables';
