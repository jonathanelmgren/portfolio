import { format } from "date-fns";
import { TDriversLogReport } from "../../types";

export const PDFLayoutCSS = `
html {
    font-family: sans-serif;
}
table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    margin-top: 16px;
    width: 100%;
    table-layout: auto;
  }
  
  table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .25em;
  }
  
  table th,
  table td {
    padding: .5em;
    text-align: center;
    font-size: .65em;
  }
  
  table th {
    font-size: .7em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .col-100 {
        width: 100px;
  }
`;

const MILEAGE_COMPENSATION = 0.95; // per km

export const PDFLayout = (data: TDriversLogReport) => {
  if (data.trips.length === 0) throw new Error("No trips in data");

  const firstDate = data.trips[0].date;
  const lastDate = data.trips[data.trips.length - 1].date;

  const fromYear = format(firstDate, "yyyy");
  const toYear = format(lastDate, "yyyy");

  const fromMonth = format(firstDate, "M");
  const toMonth = format(firstDate, "M");

  const formattedDate = (date: Date) => format(date, "d/M");

  return (
    <div>
      <h1>Körjournal</h1>
      <div>
        <span>
          Bilens registreringsnummer: <strong>{data.registrationPlate}</strong>
        </span>
        <span style={{ marginLeft: "16px" }}>
          År:{" "}
          <strong>
            {fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`}
          </strong>
        </span>
        <span style={{ marginLeft: "16px" }}>
          Månad:{" "}
          <strong>
            {fromMonth === toMonth ? fromMonth : `${fromMonth} - ${toMonth}`}
          </strong>
        </span>
      </div>
      <div style={{ marginTop: "16px" }}>
        <span>Totalt antal körda mil: {data.totalKm}km</span>
        <span style={{ marginLeft: "16px" }}>
          Totalt antal privatmil: {data.totalKmInPrivateTrips}km
        </span>
        <span style={{ marginLeft: "16px" }}>
          Totalt antal tjänstemil: {data.totalKmInWorkTrips}km
        </span>
        <span style={{ marginLeft: "16px" }}>
          Total ersättning:{" "}
          <strong>{data.totalKmInWorkTrips * MILEAGE_COMPENSATION}:-</strong>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "70px" }}>Datum</th>
            <th style={{ width: "70px" }}>Start (km)</th>
            <th style={{ width: "70px" }}>Slut (km)</th>
            <th style={{ width: "70px" }}>Reslängd (km)</th>
            <th>Startadress</th>
            <th>Ärende</th>
            <th>Slutadress</th>
            <th>Anteckningar</th>
          </tr>
        </thead>
        <tbody>
          {data.trips.map((trip, i) => (
            <tr key={i}>
              <td style={{ width: "70px" }}>{formattedDate(trip.date)}</td>
              <td style={{ width: "70px" }}>{trip.startingMileage}</td>
              <td style={{ width: "70px" }}>{trip.endingMileage}</td>
              <td style={{ width: "70px" }}>{trip.tripInKm}</td>
              <td>{trip.startAdress}</td>
              <td>{trip.purpose}</td>
              <td>{trip.endAdress}</td>
              <td>{trip.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
