'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useFieldArray, useForm } from "react-hook-form";
import { WeekDays } from "./WeekDays";
import { daysOfWeek } from "./consts";
import { mileageGeneratorSchema } from "./schemas";
import { TMileageGenerator, TRandomizedTrip } from "./types";
import { getAllWeekNumbersBetweenDates, getPreviousMonthDates, numberToDay } from "./utils";
import { generateTripReport } from "./utils/generateRandomTrips";

const defaultRandomizedTrip: TRandomizedTrip = {
    startAdress: 'Angshestre 120',
    endAdress: 'Gunnar Engellaus väg 10',
    tripInKm: 110,
    purpose: 'Volvo Cars AB',
    comment: 'Jonathan Elmgren',
    roundTrip: true,
    daysOfWeek: ['1', '2', '3', '4', '5'],
    ignoreWeeksOfMonth: [],
    tripOffset: 4,
    tripDistribution: 100
}

const defaultFormValues: TMileageGenerator = {
    startingMileage: 0,
    endingMileage: 2657,
    dates: {
        from: new Date(),
        to: new Date(),
    },
    workTripsInPercent: 80,
    registrationPlate: 'YWC59T',
    trips: [defaultRandomizedTrip]
}

export const JournalForm = () => {
    const { firstDayOfPreviousMonth, lastDayOfPreviousMonth } = getPreviousMonthDates();
    const formMethods = useForm<TMileageGenerator>({
        resolver: zodResolver(mileageGeneratorSchema),
        defaultValues: { ...defaultFormValues, dates: { from: firstDayOfPreviousMonth, to: lastDayOfPreviousMonth } },
    });

    const { fields, append, remove } = useFieldArray({
        name: "trips",
        control: formMethods.control
    });

    const onSubmit = (data: TMileageGenerator) => {
        try {
            console.log(generateTripReport(data));
        } catch (e) {
            console.error(e)
        }
    };

    const addTrip = () => {
        append(defaultRandomizedTrip)
    }

    const dates = formMethods.getValues(`dates`);
    const weeks = getAllWeekNumbersBetweenDates(dates.from, dates.to);
    const errors = formMethods.formState.errors;
    return (
        <Form {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="mx-8 space-y-6">
                <div className="flex gap-4">
                    <div className="space-y-6">
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
                                name="dates.from"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>To</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formMethods.control}
                                name="dates.to"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>To</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                            name="workTripsInPercent"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>Amount of work trips - {value}%</FormLabel>
                                    <FormControl>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            defaultValue={[value]}
                                            onValueChange={(value) => onChange(value[0])}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        How many percent of the trips are work related?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grow space-y-2">
                        <Label>Trips</Label>
                        {fields.map((field, index) => (
                            <div className="space-y-2 border-[1px] p-4" key={field.id}>
                                <div className="flex justify-between items-center">
                                    <h4>Trip #{index + 1}</h4>
                                    <span className="cursor-pointer" onClick={() => remove(index)}><Cross1Icon /></span>
                                </div>
                                <div className="flex gap-4">
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

                                </div>
                                <div className="flex gap-4">
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
                                </div>

                                <div className="flex gap-4">
                                    <FormField
                                        control={formMethods.control}
                                        name={`trips.${index}.tripInKm`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trip in KM</FormLabel>
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
                                        name={`trips.${index}.tripOffset`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trip offset</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Trip in km"

                                                    />
                                                </FormControl>
                                                <FormDescription>Offset in km</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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

                                <Label>Weekdays</Label>
                                <div className="flex gap-2">
                                    {daysOfWeek.map((day) => (
                                        <FormField
                                            key={day}
                                            control={formMethods.control}
                                            name={`trips.${index}.daysOfWeek`}
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(day);
                                                return (
                                                    <FormItem className="">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(day)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, day])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== day
                                                                            )
                                                                        )
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className={cn('cursor-pointer font-normal block p-2 border-[1px] rounded-md', isChecked && 'border-primary')}>
                                                            {numberToDay(parseInt(day))}
                                                        </FormLabel>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <Label>Ignore weeks</Label>
                                    <WeekDays index={index} weeks={weeks} />
                                </div>
                                <FormField
                                    control={formMethods.control}
                                    name={`trips.${index}.tripDistribution`}
                                    render={({ field: { value, onChange } }) => (
                                        <FormItem>
                                            <FormLabel>Trip distrubution - {value}%</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    min={1}
                                                    max={100}
                                                    step={1}
                                                    defaultValue={[value]}
                                                    onValueChange={(value => onChange(value[0]))}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                How many percent of the total trips should be of this trip?
                                            </FormDescription>
                                            <FormMessage>{errors.trips?.root?.message}</FormMessage>
                                        </FormItem>
                                    )}
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

