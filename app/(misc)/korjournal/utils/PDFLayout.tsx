import { format } from "date-fns";
import { TDriversLogReport } from "../types";

export const PDFLayout = (data: TDriversLogReport) => {
    if (data.trips.length === 0) throw new Error('No trips in data');

    const fromYear = data.trips[0].date.getFullYear();
    const toYear = data.trips[data.trips.length - 1].date.getFullYear();

    const formattedDate = (date: Date) => format(date, 'd/M')

    return (
        <div>
            <h1>Körjournal</h1>
            <div>
                <span>
                    Bilens registreringsnummer: {data.registrationPlate}
                </span>
                <span>
                    År: {fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`}
                </span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Start (km)</th>
                        <th>Slut (km)</th>
                        <th>Reslängd (km)</th>
                        <th>Startadress</th>
                        <th>Ärende</th>
                        <th>Slutadress</th>
                        <th>Anteckningar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.trips.map((trip, i) => (
                        <tr key={i}>
                            <td>{formattedDate(trip.date)}</td>
                            <td>{trip.startingMileage}</td>
                            <td>{trip.endingMileage}</td>
                            <td>{trip.tripInKm}</td>
                            <td>{trip.startAdress}</td>
                            <td>{trip.purpose}</td>
                            <td>{trip.endAdress}</td>
                            <td>{trip.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}