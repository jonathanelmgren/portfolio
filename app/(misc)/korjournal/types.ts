import * as z from "zod";
import { mileageGeneratorSchema, randomizeTripSchema, tripSchema } from "./schemas";

export type TRandomizedTrip = z.infer<typeof randomizeTripSchema>;
export type TTrip = z.infer<typeof tripSchema>;
export type TMileageGenerator = z.infer<typeof mileageGeneratorSchema>;
