import { EmailButton } from "./EmailButton";
import { Lottie } from "./Lottie";

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:gap-0 mt-20 md:mt-0">
      <div className="flex flex-col gap-6 md:gap-10 ">
        <h1
          className={
            "font-bold flex-2 text-6xl md:text-7xl text-primary  xl:text-[7rem]"
          }
        >
          Hello
          <br /> I&apos;m{" "}
          <span className={"underline"}>
            Jonathan
            <br /> Elmgren
          </span>
        </h1>
        <p className="text-primary text-xl">
          Current assignment:{" "}
          <a
            className="text-primaryDark underline-offset-4 underline"
            target="_blank"
            href="https://volvocars.com/"
          >
            Volvo Cars
          </a>
        </p>
        <EmailButton />
      </div>
      <div className="max-w-md md:max-w-2xl w-full">
        <Lottie />
      </div>
    </div>
  );
};
