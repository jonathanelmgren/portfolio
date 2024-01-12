import { eachDayOfInterval, format, getDay, getWeek, isSameDay } from "date-fns";
import { TMileageGenerator, TRandomizedTrip, TTrip } from "../types";

const minKm = 60
const maxKm = 300

export const generateTripReport = (data: TMileageGenerator): TTrip[] => {
    const { dates, workTripsInPercent, startingMileage, endingMileage, trips: randomTrips } = data;

    const trips: TTrip[] = [];

    const datesArray = eachDayOfInterval({ start: dates.from, end: dates.to });

    const totalMileage = endingMileage - startingMileage;
    const totalWorkMileage = totalMileage * (workTripsInPercent / 100);
    const totalPrivateMileage = totalMileage - totalWorkMileage;

    let currentMileage = startingMileage;

    for (const randomTrip of randomTrips) {
        const { tripDistribution, daysOfWeek, ignoreWeeksOfMonth, tripInKm, roundTrip } = randomTrip;

        const availableMileagesForThisTrip = totalWorkMileage * (tripDistribution / 100);
        let amountOfTripsNeeded = Math.ceil(availableMileagesForThisTrip / tripInKm);
        if (roundTrip) amountOfTripsNeeded = Math.ceil(amountOfTripsNeeded / 2);
        let availableDays: Date[] = []
        const takenDays = trips.map(trip => new Date(trip.date))
        for (const day of datesArray) {
            const week = getWeek(day);
            const dayOfWeek = getDay(day);
            const isTaken = takenDays.some(takenDay => isSameDay(takenDay, day))
            if (daysOfWeek.includes(dayOfWeek.toString() as typeof daysOfWeek[number]) && !ignoreWeeksOfMonth.includes(week) && !isTaken) {
                availableDays.push(day)
            }
        }

        if (amountOfTripsNeeded > availableDays.length) throw new Error('Not enough days to cover all trips, consider lowering amount of work trips');

        let addedTrip = 0;
        while (availableDays.length > 0 && addedTrip < amountOfTripsNeeded && availableMileagesForThisTrip > ((addedTrip + 1) * tripInKm)) {
            const randomIndex = Math.floor(Math.random() * availableDays.length);
            const day = availableDays[randomIndex];
            const newTrip = {
                date: day.toString(),
                startMileage: currentMileage,
                endMileage: currentMileage + tripInKm,
                ...randomTrip
            }
            trips.push(newTrip);
            if (roundTrip) {
                trips.push(createRoundTrip(newTrip));
                currentMileage += tripInKm;
                addedTrip++
            }
            currentMileage += tripInKm;
            addedTrip++
            availableDays.splice(randomIndex, 1)

        }
    }


    // Private trips
    let daysLeft = datesArray.filter(day => !trips.some(trip => isSameDay(day, new Date(trip.date))))
    while (daysLeft.length > 0 && currentMileage < endingMileage) {
        const randomIndex = Math.floor(Math.random() * daysLeft.length);
        const day = daysLeft[randomIndex];
        const tripInKm = getRandomBiased(minKm, maxKm);
        const endMileage = currentMileage + tripInKm
        if (endMileage > endingMileage) {
            trips.push({
                date: day.toString(),
                startMileage: currentMileage,
                endMileage: endingMileage,
                tripInKm: endingMileage - currentMileage,
                startAdress: 'privat',
                endAdress: 'privat',
                purpose: 'privat',
                comment: 'privat',
            });
            break;
        }
        trips.push({
            date: day.toString(),
            startMileage: currentMileage,
            endMileage: currentMileage + tripInKm,
            tripInKm: tripInKm,
            startAdress: 'privat',
            endAdress: 'privat',
            purpose: 'privat',
            comment: 'privat',
        });
        currentMileage += tripInKm;
        daysLeft.splice(randomIndex, 1)

    }
    const sortedTripsByDate = trips.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let currentFixedMileage = 0;
    const fixedMileages = sortedTripsByDate.map((trip) => {
        const newMileage = currentFixedMileage + trip.tripInKm
        const t = {
            ...trip,
            startMileage: currentFixedMileage,
            endMileage: currentFixedMileage + trip.tripInKm,
        }
        currentFixedMileage = newMileage
        return t
    })

    return fixedMileages;
};

function getRandomBiased(min: number, max: number) {
    const random = Math.sqrt(Math.random());
    return Math.round(random * (max - min) + min);
}

const decideTripType = (
    workTripsInPercent: number,
    amountOfWorkTrips: number,
    totalDays: number,
    daysLeft: number,
    currentMileage: number,
    endingMileage: number,
    consecutiveWorkTrips: number
): 'private' | 'work' | undefined => {
    const workTripsInPercentAsDecimal = workTripsInPercent / 100;
    const totalWorkTrips = Math.round(totalDays * workTripsInPercentAsDecimal);

    // Calculate remaining work trips needed
    const remainingWorkTrips = totalWorkTrips - amountOfWorkTrips;

    // Remaining mileage that needs to be covered
    const remainingMileage = endingMileage - currentMileage;

    if (remainingMileage < minKm) return undefined;

    // Dynamic skip day chance based on remaining mileage and days
    const mileageToDaysRatio = remainingMileage / daysLeft;
    let skipDayChance = 0.5 - mileageToDaysRatio;
    skipDayChance = Math.max(0, Math.min(skipDayChance, 1));

    // Decide randomly whether to skip a day
    if (Math.random() < skipDayChance && remainingMileage > 0) {
        return undefined;
    }

    if (remainingMileage <= 0) {
        return undefined;
    }

    const probabilityOfWorkTrip = remainingWorkTrips / daysLeft;

    // Increase the chance of a private trip based on consecutive work trips
    const increasedChanceForPrivate = Math.min(0.2 * consecutiveWorkTrips, 0.8); // Adjust as needed
    const isWork = (Math.random() < (probabilityOfWorkTrip - increasedChanceForPrivate));

    return isWork ? 'work' : 'private';
};

const createRoundTrip = (trip: TTrip): TTrip => (
    {
        date: trip.date,
        startMileage: trip.endMileage,
        endMileage: trip.endMileage + trip.tripInKm,
        startAdress: trip.endAdress,
        endAdress: trip.startAdress,
        purpose: trip.purpose,
        comment: trip.comment,
        tripInKm: trip.tripInKm,
    }
)

const randomizeTrip = (day: Date, isProbablyWork: boolean, randomTrips: TRandomizedTrip[], currentMileage: number): TTrip[] | undefined => {
    if (isProbablyWork) {
        const randomTrip = randomTrips[Math.floor(Math.random() * randomTrips.length)];
        const { daysOfWeek, ignoreWeeksOfMonth, roundTrip, ...trip } = randomTrip

        const week = getWeek(day);
        const dayOfWeek = getDay(day);

        if (!daysOfWeek.includes(dayOfWeek.toString() as typeof daysOfWeek[number])) return maybeCreatePrivateTrip(day, currentMileage);
        if (ignoreWeeksOfMonth.includes(week)) return maybeCreatePrivateTrip(day, currentMileage);

        const workTrip = {
            date: format(day, 'd/L'),
            startMileage: currentMileage,
            endMileage: currentMileage + trip.tripInKm,
            ...trip,
        }
        const workTrips: TTrip[] = [workTrip]

        if (roundTrip) {
            const roundTrip = createRoundTrip(workTrip)
            workTrips.push(roundTrip)
        }

        return workTrips
    } else {
        return [createPrivateTrip(day, currentMileage)]
    }
}

const maybeCreatePrivateTrip = (day: Date, currentMileage: number): [TTrip] | undefined => {
    const random = Math.random()
    if (random < 0.5) {
        return [createPrivateTrip(day, currentMileage)]
    }
    return undefined
}

const createPrivateTrip = (day: Date, currentMileage: number, customTripInKm?: number): TTrip => {
    const randomizeTripInKm = Math.round(Math.random() * (minKm - maxKm) + maxKm);

    const tripInKm = customTripInKm || randomizeTripInKm;

    return {
        date: format(day, 'd/L'),
        startMileage: currentMileage,
        endMileage: currentMileage + tripInKm,
        tripInKm: tripInKm,
        startAdress: 'privat',
        endAdress: 'privat',
        purpose: 'privat',
        comment: 'privat',
    }
}
