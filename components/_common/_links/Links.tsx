import Image from "next/image";
import React from "react";

import github from "./icons/github.svg";
import linkedin from "./icons/linkedin.svg";
import email from "./icons/email.svg";

export const Links = ({
  small = false,
  center = false,
}: {
  center?: boolean;
  small?: boolean;
}) => {
  return (
    <div className={`flex gap-5${center ? " justify-center" : ""}`}>
      <Link
        href="https://github.com/jonathanelmgren"
        src={github}
        alt="github"
        small={small}
      />
      <Link
        href="https://linkedin.com/in/jonathan-elmgren"
        src={linkedin}
        alt="linkedin"
        small={small}
      />
      <Link
        href="mailto:jonathan@elmgren.dev"
        src={email}
        alt="email"
        small={small}
      />
    </div>
  );
};

const Link = ({
  href,
  src,
  alt,
  small,
  ...props
}: {
  small: boolean;
  href: string;
  src: string;
  alt: string;
}) => (
  <a {...props} href={href} rel="noreferrer" target={"_blank"}>
    <Image
      unoptimized
      src={src}
      alt={alt}
      width={small ? "30" : "50"}
      height="50"
    />
  </a>
);
