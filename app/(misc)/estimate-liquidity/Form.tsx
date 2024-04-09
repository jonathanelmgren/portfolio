"use client";

import { useState } from "react";

type Entry = {
  amount: number;
  vat: number;
  date: string;
  description: string;
};

const initialEntries: Entry[] = [];

const Form = () => {
  const [incomeEntries, setIncomeEntries] = useState<Entry[]>(initialEntries);
  const [expenseEntries, setExpenseEntries] = useState<Entry[]>(initialEntries);

  const addEntry = (entry: Entry, type: "income" | "expense") => {
    if (type === "income") {
      setIncomeEntries((prevEntries) => [...prevEntries, entry]);
    } else {
      setExpenseEntries((prevEntries) => [...prevEntries, entry]);
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

  return (
    <div className="flex justify-center mt-10 w-full">
      <div className="flex flex-col w-1/2 mx-4">
        <h2 className="text-lg font-bold mb-4">Income</h2>
        <div>
          {incomeEntries.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-green-200 p-2 my-2"
            >
              <span>{entry.amount} SEK</span>
              <span>VAT: {entry.vat}%</span>
              <span>{entry.description}</span>
              <span>{entry.date}</span>
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

      <div className="flex flex-col w-1/2 mx-4">
        <h2 className="text-lg font-bold mb-4">Expenses</h2>
        <div>
          {expenseEntries.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-red-200 p-2 my-2"
            >
              <span>{entry.amount} SEK</span>
              <span>VAT: {entry.vat}%</span>
              <span>{entry.date}</span>
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
  );
};

export default Form;

const EntryForm: React.FC<{
  type: "income" | "expense";
  onAddEntry: (entry: Entry) => void;
}> = ({ type, onAddEntry }) => {
  const [amount, setAmount] = useState("");
  const [vat, setVat] = useState("25");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      amount: parseFloat(amount),
      vat: parseFloat(vat),
      date,
      description,
    };
    onAddEntry(entry);
    setAmount("");
    setVat("25");
    setDate("");
    setDescription("");
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
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-1 border rounded w-28"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Add
      </button>
    </form>
  );
};
