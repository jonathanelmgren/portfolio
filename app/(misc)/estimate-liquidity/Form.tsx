"use client";

import { cn } from "@/lib/utils";
import {
    addDays,
    addMonths,
    compareAsc,
    format,
    isBefore,
    isSameDay,
    parseISO
} from "date-fns";
import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 2, // Minimum number of fraction digits
    maximumFractionDigits: 2, // Maximum number of fraction digits
  });

type Entry = {
  amount: number;
  vat: number;
  description: string;
  recurring: boolean;
  date: string;
};

type IncomeEntry = Entry & {
  dueDays: number;
};

type ExpenseEntry = Entry;

type Transaction = {
    date: string;
    description: string;
    amount: number;
    type: "income" | "expense";
}

const initialExpenses: ExpenseEntry[] = [
  {
    amount: 29000,
    vat: 0,
    date: "2024-04-12",
    description: "Arbetsgiv. avgift",
    recurring: true,
  },
  {
    amount: 5150,
    vat: 0,
    date: "2024-04-12",
    description: "Prel. vinstskatt",
    recurring: true,
  },
  {
    amount: 36500,
    vat: 0,
    date: "2024-04-25",
    description: "Lön",
    recurring: true,
  },
  {
    amount: 13500,
    vat: 12.5,
    date: "2024-04-01",
    description: "Tesla",
    recurring: true,
  },
  {
    amount: 1000,
    vat: 25,
    date: "2024-04-28",
    description: "Mobil",
    recurring: true,
  },
];

const initialIncomes: IncomeEntry[] = [
  {
    amount: 150000,
    date: "2024-02-29",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 112500,
    date: "2024-03-31",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 9000,
    date: "2024-03-31",
    description: "Marie Brunnberg",
    recurring: false,
    vat: 25,
    dueDays: 20,
  },
  {
    amount: 1500,
    date: "2024-04-30",
    description: "Marie Brunnberg",
    recurring: false,
    vat: 25,
    dueDays: 20,
  },
  {
    amount: 800,
    date: "2024-04-30",
    description: "Provins Insrc.",
    recurring: false,
    vat: 25,
    dueDays: 20,
  },
  {
    amount: 120000,
    date: "2024-04-30",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 155000,
    date: "2024-05-31",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 124000,
    date: "2024-06-30",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 62000,
    date: "2024-07-31",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 93000,
    date: "2024-08-31",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
  {
    amount: 124000,
    date: "2024-09-30",
    description: "Volvo",
    recurring: false,
    vat: 25,
    dueDays: 60,
  },
];

const Form = () => {
    const todayTwoMonthsAhead = addMonths(new Date(), 2);
  const [incomeEntries, setIncomeEntries] =
    useState<IncomeEntry[]>(initialIncomes);
  const [expenseEntries, setExpenseEntries] =
    useState<ExpenseEntry[]>(initialExpenses);
  const [currentLiquidity, setCurrentLiquidity] = useState(188000);
  const [estimateDate, setEstimateDate] = useState(format(todayTwoMonthsAhead, "yyyy-MM-dd"));
  const [totalTransactions, setTotalTransactions] = useState<Transaction[]>([]);
  const [estimatedLiquidity, setEstimatedLiquidity] = useState(0);

  const addEntry = (
    entry: IncomeEntry | ExpenseEntry,
    type: "income" | "expense",
  ) => {
    if (type === "income") {
      setIncomeEntries(
        (prevEntries) => [...prevEntries, entry] as IncomeEntry[],
      );
    } else {
      setExpenseEntries(
        (prevEntries) => [...prevEntries, entry] as ExpenseEntry[],
      );
    }
  };

  const removeEntry = (index: number, type: "income" | "expense") => {
    if (type === "income") {
      setIncomeEntries((prevEntries) =>
        prevEntries.filter((_, i) => i !== index),
      );
    } else {
      setExpenseEntries((prevEntries) =>
        prevEntries.filter((_, i) => i !== index),
      );
    }
  };

  useEffect(() => {
    const totalIncome = incomeEntries.flatMap((entry) => {
      const totalOccurrences = getRecurringDates(
        entry,
        estimateDate,
      );
      return totalOccurrences.map((date) => ({ ...entry, date }));
    });
    const totalExpenses = expenseEntries.flatMap((entry) => {
      const totalOccurrences = getRecurringDates(entry, estimateDate);
      return totalOccurrences.map((date) => ({ ...entry, date }));
    });

    const vatExpenses: ExpenseEntry[] = totalIncome.map((entry) => {
      const vatAmount = (entry.amount * entry.vat) / 100;
      const date = new Date(entry.date);
      const datePlusTwoMonths = addMonths(date, 2);
      datePlusTwoMonths.setDate(12);
      const formattedDate = format(datePlusTwoMonths, "yyyy-MM-dd");
      return {
        amount: vatAmount,
        vat: 0,
        date: formattedDate,
        description: `VAT - ${entry.description}`,
        recurring: true,
      };
    }).filter(entry => parseISO(entry.date) <= parseISO(estimateDate));
    const expensesWithVat = [...totalExpenses, ...vatExpenses];

    const totalTransactions = [...totalIncome, ...expensesWithVat].map(entry => {
        const type = 'dueDays' in entry ? "income" : "expense";
        const date = 'dueDays' in entry && typeof entry.dueDays === 'number' ? format(
            addDays(new Date(entry.date), entry.dueDays),
            "yyyy-MM-dd",
          ) : entry.date;
        const amountWithVat = entry.amount + (entry.amount * entry.vat) / 100;
        const isWithinEstimateDate = parseISO(date) <= parseISO(estimateDate);
        const isAfterToday = parseISO(date) >= new Date();
    
        return isWithinEstimateDate && isAfterToday ? {
            date,
            description: entry.description,
            amount: type === "income" ? amountWithVat : -amountWithVat,
            type,
        } as const : false;
    }).filter(Boolean) as Transaction[];

    totalTransactions.sort((a, b) =>
    compareAsc(parseISO(a.date), parseISO(b.date)),
    );

    setTotalTransactions(totalTransactions);
  }, [incomeEntries, expenseEntries, currentLiquidity, estimateDate]);

  useEffect(() => {
    const totalAmount = totalTransactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, currentLiquidity);

    setEstimatedLiquidity(totalAmount);
  },[totalTransactions, currentLiquidity])

  return (
    <div>
      <div className="flex gap-2 mt-8">
        <label htmlFor="current_liquidity" className="text-xl">
          Your current liquidity:
        </label>
        <input
          type="number"
          id="current_liquidity"
          placeholder="VAT (%)"
          value={currentLiquidity}
          onChange={(e) => setCurrentLiquidity(parseFloat(e.target.value))}
          className="p-1 border rounded "
          required
        />
      </div>
      <div className="flex gap-2 mt-8">
        <label htmlFor="current_liquidity" className="text-xl">
          Date you would like to estimate liquidity for:
        </label>
        <input
          type="date"
          id="estimate_date"
          value={estimateDate}
          onChange={(e) => setEstimateDate(e.target.value)}
          className="p-1 border rounded"
          required
        />
      </div>
      <div className="flex gap-2 mt-8 items-center">
        <label htmlFor="current_liquidity" className="text-xl">
          Estimated liquidity
        </label>
        <input
          type="text"
          value={formatter.format(estimatedLiquidity)}
          className="p-1 border rounded"
          readOnly
          disabled
        /> <span>at {estimateDate}</span>
      </div>
      <div className="flex justify-center mt-10 w-full gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Income</h2>
          <div>
            {incomeEntries.map((entry, index) => (
              <div
                key={`${index}-${entry.date}-${entry.amount}`}
                className="flex justify-between items-center bg-green-200 p-2 my-2"
              >
                <span>{entry.amount} SEK</span>
                <span>VAT: {entry.vat}%</span>
                <span>{entry.description}</span>
                <span>{entry.date}</span>
                <span>{entry.dueDays}</span>
                <span>R: {entry.recurring ? "Yes" : "No"}</span>
                <button
                  onClick={() => removeEntry(index, "income")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <EntryForm
              type="income"
              onAddEntry={(entry) => addEntry(entry, "income")}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Expenses</h2>
          <div>
            {expenseEntries.map((entry, index) => (
              <div
              key={`${index}-${entry.date}-${entry.amount}`}
              className="flex justify-between items-center bg-red-200 p-2 my-2"
              >
                <span>{entry.amount} SEK</span>
                <span>VAT: {entry.vat}%</span>
                <span>{entry.description}</span>
                <span>{entry.date}</span>
                <span>R: {entry.recurring ? "Yes" : "No"}</span>
                <button
                  onClick={() => removeEntry(index, "expense")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <EntryForm
              type="expense"
              onAddEntry={(entry) => addEntry(entry, "expense")}
            />
          </div>
        </div>
      </div>
      <h2 className="text-lg font-bold mb-4">Transactions</h2>
      <div className="max-w-96 h-96 overflow-auto">

      {totalTransactions.map((transaction) => (
          <div key={JSON.stringify(transaction)} className={cn("flex gap-4 p-2 items-center justify-between", transaction.amount < 0 ? 'bg-red-50' : 'bg-green-50')}>
          <div className="grow-0 shrink-0">{transaction.date}</div>
          <div style={{whiteSpace:'nowrap', overflow:'hidden'}}>{transaction.description}</div>
          <div>{formatter.format(transaction.amount)}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Form;

const EntryForm: React.FC<{
  type: "income" | "expense";
  onAddEntry: (entry: IncomeEntry | ExpenseEntry) => void;
}> = ({ type, onAddEntry }) => {
  const [amount, setAmount] = useState("");
  const [vat, setVat] = useState("25");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [dueDays, setDueDays] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      amount: parseFloat(amount),
      vat: parseFloat(vat),
      dueDays: parseFloat(dueDays),
      date,
      description,
      recurring,
    };
    onAddEntry(entry);
    setAmount("");
    setVat("25");
    setDate("");
    setDescription("");
    setRecurring(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-1 border rounded w-28"
      />
      <input
        type="number"
        placeholder="Amount (SEK)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-1 border rounded w-20"
        required
      />
      <input
        type="number"
        placeholder="VAT (%)"
        value={vat}
        onChange={(e) => setVat(e.target.value)}
        className="p-1 border rounded w-20"
        required
      />

      {type === "income" && (
        <input
          type="number"
          placeholder="Due days"
          value={dueDays}
          onChange={(e) => setDueDays(e.target.value)}
          className="p-1 border rounded w-20"
          required
        />
      )}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-1 border rounded w-28"
            required
          />
      <div className="flex  items-center gap-1">
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
          className="p-1"
        />
        <label>Recurring</label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Add
      </button>
    </form>
  );
};

function getRecurringDates(entry: Entry, goalDateString: string): string[] {
    const goalDate = new Date(goalDateString);
  if (!entry.recurring && isBefore(entry.date, goalDate) || isSameDay(entry.date, goalDate)) {
    return [entry.date];
  }

  const dates: string[] = [];
  const formatString = "yyyy-MM-dd";
  let currentDate = new Date(entry.date);

  while (isBefore(currentDate, goalDate) || isSameDay(currentDate, goalDate)) {
    dates.push(format(currentDate, formatString));
    currentDate = addMonths(currentDate, 1);
  }

  return dates;
}
