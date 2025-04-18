import { getDateStart, getDateDaysAgo, formatDurationTime } from './dates';

describe('dates helper functions', () => {
  test('getTodayStart should return today at 00:00:00', () => {
    const todayStart = getDateStart(new Date());
    const now = new Date();
    const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    expect(todayStart).toEqual(expected);
  });

  test('getYesterdayStart should return yesterday at 00:00:00', () => {
    const yesterdayStart = getDateDaysAgo(new Date(), 1);
    const now = new Date();
    const expected = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    expect(yesterdayStart).toEqual(expected);
  });

  test('getDateDaysAgo should return the correct date for N days ago', () => {
    const now = new Date('2025-04-13T12:00:00Z');
    const daysAgo = 5;
    const result = getDateDaysAgo(now, daysAgo);
    const expected = new Date('2025-04-08T00:00:00Z');

    expect(result).toEqual(expected);
  });

  test('formatDurationTime should format milliseconds into HH:mm h', () => {
    const duration = 3600000 + 30 * 60000; // 1 hour and 30 minutes in milliseconds
    const result = formatDurationTime(duration);
    const expected = '01:30 h';

    expect(result).toBe(expected);
  });
});
