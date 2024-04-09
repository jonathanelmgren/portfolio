import { eachDayOfInterval, getDay, getWeek, isSameDay } from "date-fns";
import { TDriversLogGenerator, TDriversLogReport, TTrip } from "../types";

const minKm = 40;
const maxKm = 300;

export const generateLogReport = (
  data: TDriversLogGenerator,
): TDriversLogReport => {
  const {
    dates,
    workTripsInPercent,
    startingMileage,
    endingMileage,
    trips: randomTrips,
  } = data;

  const report: TDriversLogReport = {
    registrationPlate: data.registrationPlate,
    totalKmInWorkTrips: 0,
    totalKmInPrivateTrips: 0,
    totalKm: 0,
    trips: [],
  };

  const trips: TTrip[] = [];

  const datesArray = eachDayOfInterval({ start: dates.from, end: dates.to });

  const totalMileage = endingMileage - startingMileage;
  const totalWorkMileage = totalMileage * (workTripsInPercent / 100);

  let currentMileage = startingMileage;

  for (const randomTrip of randomTrips) {
    const {
      tripDistribution,
      daysOfWeek,
      ignoreWeeksOfMonth,
      tripInKm,
      roundTrip,
    } = randomTrip;

    const availableMileagesForThisTrip =
      totalWorkMileage * (tripDistribution / 100);
    const amountOfTripsNeeded = Math.ceil(
      availableMileagesForThisTrip / tripInKm,
    );
    let availableDays: Date[] = [];
    const takenDays = trips.map((trip) => new Date(trip.date));
    for (const day of datesArray) {
      const week = getWeek(day);
      const dayOfWeek = getDay(day);
      const isTaken = takenDays.some((takenDay) => isSameDay(takenDay, day));
      if (
        daysOfWeek.includes(
          dayOfWeek.toString() as (typeof daysOfWeek)[number],
        ) &&
        !ignoreWeeksOfMonth.includes(week) &&
        !isTaken
      ) {
        availableDays.push(day);
      }
    }

    if (roundTrip && amountOfTripsNeeded > availableDays.length * 2)
      throw new Error(
        "Not enough days to cover all trips, consider lowering amount of work trips",
      );
    if (!roundTrip && amountOfTripsNeeded > availableDays.length)
      throw new Error(
        "Not enough days to cover all trips, consider lowering amount of work trips",
      );

    let addedTrip = 0;
    let drivenThisTrip = 0;
    while (
      availableDays.length > 0 &&
      addedTrip <= amountOfTripsNeeded &&
      availableMileagesForThisTrip > drivenThisTrip + tripInKm
    ) {
      const randomIndex = Math.floor(Math.random() * availableDays.length);
      const day = availableDays[randomIndex];
      const newTrip: TTrip = {
        date: day,
        startingMileage: currentMileage,
        endingMileage: currentMileage + tripInKm,
        tripInKm: tripInKm,
        startAdress: randomTrip.startAdress,
        endAdress: randomTrip.endAdress,
        purpose: randomTrip.purpose,
        comment: randomTrip.comment,
      };
      trips.push(newTrip);
      if (roundTrip) {
        trips.push(createRoundTrip(newTrip));
        currentMileage += tripInKm;
        addedTrip++;
        drivenThisTrip += tripInKm;
      }
      currentMileage += tripInKm;
      drivenThisTrip += tripInKm;
      addedTrip++;
      availableDays.splice(randomIndex, 1);
    }
  }

  // Private trips
  let daysLeft = datesArray.filter(
    (day) => !trips.some((trip) => isSameDay(day, new Date(trip.date))),
  );
  while (daysLeft.length > 0 && currentMileage < endingMileage) {
    const randomIndex = Math.floor(Math.random() * daysLeft.length);
    const day = daysLeft[randomIndex];
    const tripInKm = weightedRandom(minKm, maxKm);
    const endMileage = currentMileage + tripInKm;
    if (endMileage > endingMileage) {
      trips.push({
        date: day,
        startingMileage: currentMileage,
        endingMileage: endingMileage,
        tripInKm: endingMileage - currentMileage,
        startAdress: "Privat",
        endAdress: "Privat",
        purpose: "Privat",
        comment: "Privat",
      });
      break;
    }
    trips.push({
      date: day,
      startingMileage: currentMileage,
      endingMileage: currentMileage + tripInKm,
      tripInKm: tripInKm,
      startAdress: "Privat",
      endAdress: "Privat",
      purpose: "Privat",
      comment: "Privat",
    });
    currentMileage += tripInKm;
    daysLeft.splice(randomIndex, 1);
  }
  const sortedTripsByDate = trips.sort(
    (a, b) => a.date.getDate() - b.date.getDate(),
  );
  let currentFixedMileage = startingMileage;
  const fixedMileages = sortedTripsByDate.map((trip) => {
    const newMileage = currentFixedMileage + trip.tripInKm;
    const t: TTrip = {
      ...trip,
      startingMileage: currentFixedMileage,
      endingMileage: currentFixedMileage + trip.tripInKm,
    };
    currentFixedMileage = newMileage;
    return t;
  });

  report.trips = fixedMileages;
  report.totalKm = endingMileage - startingMileage;
  report.totalKmInWorkTrips = report.trips
    .filter((trip) => trip.purpose !== "Privat")
    .reduce((acc, trip) => acc + trip.tripInKm, 0);
  report.totalKmInPrivateTrips = report.trips
    .filter((trip) => trip.purpose === "Privat")
    .reduce((acc, trip) => acc + trip.tripInKm, 0);

  return report;
};

function weightedRandom(min: number, max: number) {
  const ranges = [
    { from: min, to: min + (max - min) * 0.25, weight: 60 }, // Lower quarter has a high weight
    { from: min + (max - min) * 0.25, to: min + (max - min) * 0.5, weight: 25 }, // Next quarter has a lower weight
    { from: min + (max - min) * 0.5, to: min + (max - min) * 0.75, weight: 10 }, // Next quarter has an even lower weight
    { from: min + (max - min) * 0.75, to: max, weight: 5 }, // Upper quarter has the lowest weight
  ];

  // Create a weighted list
  let weightedList = [];
  for (const range of ranges) {
    for (let i = 0; i < range.weight; i++) {
      weightedList.push(range);
    }
  }

  // Select a random range
  const selectedRange =
    weightedList[Math.floor(Math.random() * weightedList.length)];

  // Return a random number from the selected range
  return Math.round(
    Math.random() * (selectedRange.to - selectedRange.from) +
      selectedRange.from,
  );
}

const createRoundTrip = (trip: TTrip): TTrip => ({
  date: trip.date,
  startingMileage: trip.endingMileage,
  endingMileage: trip.endingMileage + trip.tripInKm,
  startAdress: trip.endAdress,
  endAdress: trip.startAdress,
  purpose: "Returresa",
  comment: trip.comment,
  tripInKm: trip.tripInKm,
});
