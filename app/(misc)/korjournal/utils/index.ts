import { eachWeekOfInterval, getWeek } from "date-fns";

export function getPreviousMonthDates() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  // First day of the previous month
  const firstDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentMonth - 1,
    1,
  );

  // Last day of the previous month
  const lastDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentMonth,
    0,
  ); // 0th day of current month is last day of previous month

  return { firstDayOfPreviousMonth, lastDayOfPreviousMonth };
}

export function numberToDay(dayNumber: number) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return days[dayNumber];
}

export const getAllWeekNumbersBetweenDates = (
  startDate: Date,
  endDate: Date,
) => {
  const weeks = eachWeekOfInterval(
    { start: startDate, end: endDate },
    {
      weekStartsOn: 1,
    },
  );
  return weeks.map((week) => getWeek(week));
};
