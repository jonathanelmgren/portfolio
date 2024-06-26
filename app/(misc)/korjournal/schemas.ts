import { z } from "zod";
import { daysOfWeek } from "./consts";

const commonTripSchema = {
  startAdress: z.string(),
  endAdress: z.string(),
  tripInKm: z.coerce
    .number({ invalid_type_error: "Only numbers allowed!" })
    .positive(),
  purpose: z.string().min(1, { message: "Cannot be empty" }),
  comment: z.string().min(1, { message: "Cannot be empty" }),
};

export const driversLogGeneratorSchema = z
  .object({
    startingMileage: z.coerce
      .number({ invalid_type_error: "Only numbers allowed!" })
      .min(-1),
    endingMileage: z.coerce
      .number({ invalid_type_error: "Only numbers allowed!" })
      .positive(),
    workTripsInPercent: z
      .number()
      .min(0, {
        message: "Percentage must be at least 1",
      })
      .max(100, {
        message: "Percentage can be max 100",
      }),
    registrationPlate: z
      .string()
      .regex(
        /^[A-HJ-PR-UW-Z]{3}[0-9]{2}[A-HJ-PR-UW-Z0-9]{1}$/,
        "Must be a valid registration plate",
      ),
    dates: z.object({
      from: z.date(),
      to: z.date(),
    }),
    trips: z.array(
      z.object({
        roundTrip: z.boolean().optional(),
        daysOfWeek: z
          .array(z.enum(daysOfWeek))
          .refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),
        ignoreWeeksOfMonth: z.array(z.number()),
        tripDistribution: z
          .number()
          .min(0, {
            message: "Percentage must be at least 1",
          })
          .max(100, {
            message: "Percentage can be max 100",
          }),
        ...commonTripSchema,
      }),
    ),
  })
  .refine((data) => data.startingMileage < data.endingMileage, {
    message: "Must be > than starting mileage",
    path: ["endingMileage"],
  })
  .refine(
    (data) => {
      const trips = data.trips;
      const totalPercentage = trips.reduce(
        (acc, trip) => acc + trip.tripDistribution,
        0,
      );
      return totalPercentage === 100;
    },
    {
      message: "Total percentage must be 100",
      path: ["trips"],
    },
  );

export const driversLogReportSchema = z.object({
  registrationPlate: z
    .string()
    .regex(
      /^[A-HJ-PR-UW-Z]{3}[0-9]{2}[A-HJ-PR-UW-Z0-9]{1}$/,
      "Must be a valid registration plate",
    ),
  totalKmInWorkTrips: z.number().positive(),
  totalKmInPrivateTrips: z.number().positive(),
  totalKm: z.number().positive(),
  trips: z.array(
    z.object({
      date: z.date(),
      startingMileage: z.number().positive(),
      endingMileage: z.number().positive(),
      ...commonTripSchema,
    }),
  ),
});
