import * as z from "zod";
import { driversLogGeneratorSchema, driversLogReportSchema } from "./schemas";

export type TRandomizedTrip = TDriversLogGenerator["trips"][number];
export type TTrip = TDriversLogReport["trips"][number];

export type TDriversLogGenerator = z.infer<typeof driversLogGeneratorSchema>;
export type TDriversLogReport = z.infer<typeof driversLogReportSchema>;
