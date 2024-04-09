"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { DesktopNav } from "./Desktop";
import { MobileNav } from "./Mobile";
import { NavItems } from "./NavItems";

const breakpoints = {
  mobile: 600,
  tablet: 750,
  laptop: 1000,
  desktop: 2000,
} as const;

const easeOut = (
  currentIteration: number,
  startValue: number,
  changeInValue: number,
  totalIterations: number,
) =>
  changeInValue *
    (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) +
  startValue;

export const SideMenu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [curve, setCurve] = useState(
    "M60,500H0V0h60c0,0,20,172,20,250S60,900,60,500z",
  );
  const [axis, setAxis] = useState({ x: 0, y: 0 });
  const dimensions = useWindowDimensions();
  const mousePosition = useMousePosition();
  let width = 0;
  let height = 0;

  let targetX = 0;
  let xitteration = 50;
  let yitteration = 50;

  let hoverZone = 350;

  useEffect(() => {
    animatedCurve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition]);

  if (!dimensions) return <></>;
  width = dimensions.width;
  height = dimensions.height;

  function animatedCurve() {
    if (axis.x > mousePosition.x - 1 && axis.x < mousePosition.x + 1) {
      xitteration = 0;
    } else {
      if (menuExpanded) {
        targetX = 0;
      } else {
        xitteration = 0;
        if (mousePosition.x > hoverZone) {
          targetX = 0;
        } else {
          targetX = -((20 / 100) * (mousePosition.x - hoverZone));
        }
      }
      xitteration++;
    }

    setAxis((prevState) => ({
      ...prevState,
      x: easeOut(xitteration, axis.x, targetX - axis.x, 100),
      y: easeOut(yitteration, axis.y, mousePosition.y - axis.y, 100),
    }));

    const anchorDistance = 200;
    const curviness = anchorDistance - 60;

    setCurve(
      "M60," +
        height +
        "H0V0h60v" +
        (axis.y - anchorDistance) +
        "c0," +
        curviness +
        "," +
        axis.x +
        "," +
        curviness +
        "," +
        axis.x +
        "," +
        anchorDistance +
        "S60," +
        axis.y +
        ",60," +
        (axis.y + anchorDistance * 2) +
        "V" +
        height +
        "z",
    );
  }

  return breakpoints.laptop < width ? (
    <DesktopNav
      axis={axis}
      curve={curve}
      menuState={menuExpanded}
      openMenu={setMenuExpanded}
    >
      <NavItems />
    </DesktopNav>
  ) : (
    <MobileNav menuState={menuExpanded} openMenu={setMenuExpanded}>
      <NavItems close={() => setMenuExpanded(false)} />
    </MobileNav>
  );
};
