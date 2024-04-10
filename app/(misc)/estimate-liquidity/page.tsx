import "../../globals.css";
import Form from "./Form";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-16">Estimate your liquidity</h1>
      <p>
        All VAT in Income will be considered as expense on the 12th each month,
        two months ahead of the invoicing date
      </p>
      <Form />
    </div>
  );
};

export default Page;
