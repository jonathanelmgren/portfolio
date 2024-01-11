'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const tripSchema = z.object({
    date: z.string(),
    startMileage: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    endMileage: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    tripInKm: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    startAdress: z.string(),
    endAdress: z.string(),
    purpose: z.string(),
    comment: z.string(),
});

const randomizeTripSchema = z.object({
    startAdress: z.string(),
    endAdress: z.string(),
    tripInKm: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    purpose: z.string(),
    comment: z.string(),
    work: z.boolean(),
    roundTrip: z.boolean(),
});

const mileageSchema = z.object({
    startingMileage: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    endingMileage: z.coerce.number({ invalid_type_error: 'Only numbers allowed!' }).positive(),
    workTripsInPercent: z
        .number()
        .min(0, {
            message: "Price must be at least 0.",
        })
        .max(100, {
            message: "Price must be at most 100.",
        }),
    registrationPlate: z.string().regex(/^[A-HJ-PR-UW-Z]{3}[0-9]{2}[A-HJ-PR-UW-Z0-9]{1}$/, 'Must be a valid registration plate'),
    year: z.string().regex(/^(19|20)\d{2}$/, { message: "Invalid year. Year must be between 1900 and 2099." }),
    month: z.string().regex(/^(0?[1-9]|1[012])$/, { message: "Invalid month. Month must be between 1 and 12." }),
    trips: z.array(randomizeTripSchema),
}).refine(data => data.startingMileage < data.endingMileage, {
    message: 'Must be > than starting mileage',
    path: ['endingMileage'],

});

const defaultRandomizedTrip: z.infer<typeof randomizeTripSchema> = {
    startAdress: '',
    endAdress: '',
    tripInKm: 0,
    purpose: '',
    comment: '',
    work: true,
    roundTrip: true
}

export const JournalForm = () => {
    const formMethods = useForm<z.infer<typeof mileageSchema>>({
        resolver: zodResolver(mileageSchema),
        defaultValues: {
            startingMileage: 0,
            endingMileage: 0,
            year: new Date().getFullYear().toString(),
            month: new Date().getMonth().toString(),
            workTripsInPercent: 80,
            registrationPlate: '',
            trips: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "trips",
        control: formMethods.control
    });

    const onSubmit = (data: z.infer<typeof mileageSchema>) => {
        console.log(data);
    };

    const addTrip = () => {
        append(defaultRandomizedTrip)
    }

    return (
        <Form {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6 max-w-5xl w-full mx-8">
                <div className="flex gap-4">
                    <div className="max-w-96 w-full">
                        <div className="flex gap-4">
                            <FormField
                                control={formMethods.control}
                                name="startingMileage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starting Mileage</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter starting mileage in kilometers"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>In kilometers</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formMethods.control}
                                name="endingMileage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ending Mileage</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter ending mileage in kilometers"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>In kilometers</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4">
                            <FormField
                                control={formMethods.control}
                                name="registrationPlate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Registration plate</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formMethods.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grow space-y-2">
                        <Label>Trips</Label>
                        {fields.map((field, index) => (
                            <div className="space-y-2 border-[1px] p-4 m-2" key={field.id}>
                                <div className="flex justify-between items-center">
                                    <h4>Trip #{index + 1}</h4>
                                    <span className="cursor-pointer" onClick={() => remove(index)}><Cross1Icon /></span>
                                </div>
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.startAdress`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Start adress"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.endAdress`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="End adress"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.tripInKm`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Trip in km"

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.purpose`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Purpose"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.comment`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Comment"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.work`}
                                    render={({ field, }) => {
                                        const { value, ...rest } = field;
                                        return (
                                            <FormItem className="flex space-y-0 items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        {...rest}
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>Is work trip?</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.roundTrip`}
                                    render={({ field, }) => {
                                        const { value, ...rest } = field;
                                        return (
                                            <FormItem className="flex space-y-0 items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        {...rest}
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>Round trip?</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                        ))}
                        <Button type="button" variant={'secondary'} className="w-full" onClick={addTrip}><PlusIcon className="w-4 aspect-square" /> Add trip</Button>
                    </div>
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
