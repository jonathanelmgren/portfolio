import React from "react";
import type { Paths as PathType } from "../../lib/consts/paths";
import { Paths } from "../../lib/consts/paths";
import { Links } from "../_common/_links/Links";

export interface NavItem {
  href: PathType;
  text: string;
}

interface Props {
  close?: () => void;
}

const links: NavItem[] = [
  { href: Paths.header, text: "Home" },
  { href: Paths.whatido, text: "What I do" },
  { href: Paths.work, text: "Case" },
  { href: Paths.about, text: "About" },
  { href: Paths.contact, text: "Contact" },
];

export const NavItems = ({ close }: Props) => {
  return (
    <div className="h-full relative flex flex-col gap-14 ml-12 mt-12">
      {links.map((l) => (
        <a
          className="text-white text-2xl"
          key={l.href}
          href={l.href}
          onClick={() => close && close()}
        >
          {l.text}
        </a>
      ))}
      <Links small />
    </div>
  );
};
