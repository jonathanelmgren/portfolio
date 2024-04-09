"use client";
import { ChangeEvent, useState } from "react";
import { Links } from "../_common/_links/Links";

type message = {
  status: "error" | "success";
  msg: string;
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<message | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMsg({
          status: "success",
          msg: "Thank you. I will be in contact with you shortly.",
        });
      } else {
        const json = await res.json();
        if (json.error) {
          throw new Error(json.error);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setMsg({ status: "error", msg: e.message });
      } else {
        setMsg({ status: "error", msg: "Something went wrong" });
      }
    }
    setLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block py-2.5 px-0 w-full text-sm text-primary"
          >
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            name="message"
            required
            onChange={handleChange}
            className={`border-0 bg-transparent border-b-2 border-primary resize-none w-full ${formData.message.length > 1 ? "h-52" : "h-12"} transition-[height] overflow-hidden p-2 focus:border-2 focus:outline-none`}
            placeholder=""
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-12 py-2.5 text-center block"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <div className="mt-8">
          <Links center />
        </div>
        {msg && (
          <p
            className={`${msg.status === "success" ? "text-green-300" : "text-red-300"} p-4 capitalize text-xl text-center`}
          >
            {msg.status}: {msg.msg}
          </p>
        )}
      </form>
    </div>
  );
};
