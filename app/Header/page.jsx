"use client";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

//import { MdNightsStay } from "react-icons/md";
//import { WiDayCloudy } from "react-icons/wi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

import { FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

//import { SiStackblitz } from "react-icons/si";
import Link from "next/link";

export const generalLinks = [
  {
    href: "/project",
    label: "Projets",
    target: "_blank",
    Icon: <FaCode />,
  },
  {
    href: "https://github.com/mouhamedhanne",
    label: "GitHub",
    target: "_blank",
    Icon: <FaGithub />,
  },
  {
    href: "https://twitter.com/mouhamedhanne13",
    label: "Twitter",
    target: "_blank",
    Icon: <FaXTwitter />,
  },
  {
    href: "/newsletter",
    label: "GitHub",
    target: "_blank",
    Icon: <FaEnvelope />,
  },
];

{
  /*
  {
    href: "/experience",
    label: "experience",
    Icon: <SiStackblitz />,
  },
 */
}

function Headpage() {
  let mouseX = useMotionValue(Infinity);

  return (
    <div>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="  fixed z-50 flex bottom-8 left-1/2 -translate-x-1/2 "
      >
        <div className="flex items-end h-16 gap-4 px-4 pb-2.5 mx-auto outline-0 rounded-2xl box-gen ring-1 backdrop-blur-md dark:ring-[#1a1a1a] ">
          {generalLinks.map((link, i) => {
            return (
              <div key={i}>
                <AppIcon
                  href={link.href}
                  rel={link.target === "_blank" ? "noopener noreferrer" : ""}
                  target={link.target}
                  aria-label={link.label}
                  outline={link.outline}
                  mouseX={mouseX}
                  imgs={link.Icon}
                />
              </div>
            );
          })}
          <hr className=" h-10 w-[1px]  bg-neutral-300 dark:bg-neutral-700 mt-2.5 border-none" />

          <ThemeToggleNav mouseX={mouseX} />
        </div>
      </motion.div>
    </div>
  );
}

export default Headpage;

function AppIcon({ mouseX, imgs, href }) {
  let ref = useRef();

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [50, 140, 50]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="z-30 flex items-center justify-center rounded-full  border border-neutral-400/20 dark:border-neutral-700 dark:bg-neutral-900/70 cursor-pointer aspect-square "
      >
        <span className="text-3xl">{imgs}</span>
      </motion.div>
    </Link>
  );
}

export function ThemeToggleNav({ className, rel, mouseX, ...props }) {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "light" ? "dark" : "light";
  let [mounted, setMounted] = useState(false);
  let ref = useRef();

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="z-30 flex items-center justify-center w-10 rounded-full cursor-pointer bg-neutral-200/70 dark:bg-neutral-900/70 aspect-square "
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      onClick={() => setTheme(otherTheme)}
    >
      <FontAwesomeIcon
        icon={faSun}
        className="w-6/12 transition dark:hidden dark:stroke-neutral-300 stroke-neutral-900"
      />
      <FontAwesomeIcon
        icon={faMoon}
        className="hidden w-6/12 transition  dark:block dark:stroke-neutral-300 stroke-neutral-900"
      />
    </motion.div>
  );
}

{
  /*  <WiDayCloudy className="w-6/12 transition dark:hidden dark:stroke-neutral-300 stroke-neutral-900" />
      <MdNightsStay className="hidden w-6/12 transition  dark:block dark:stroke-neutral-300 stroke-neutral-900" />
  */
}
