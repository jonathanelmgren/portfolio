import "../../globals.css";
import Form from "./Form";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-16">Estimate your liquidity</h1>
      <Form />
    </div>
  );
};

export default Page;
