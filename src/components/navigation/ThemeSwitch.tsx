import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { IoMdSunny, IoMdMoon, IoMdDesktop } from "react-icons/io";
import cx from "clsx";
import React, { useEffect, useState } from "react";

const themes = [
  {
    key: "light",
    label: "Light",
    icon: <IoMdSunny />,
  },
  {
    key: "dark",
    label: "Dark",
    icon: <IoMdMoon />,
  },

  {
    key: "system",
    label: "System",
    icon: <IoMdDesktop />,
  },
];

const ThemeSwitcher = () => {
  const [preferredTheme, setPreferredTheme] = useState<null | string>(null);

  useEffect(() => {
    try {
      let found = localStorage.getItem("theme");
      setPreferredTheme(found);
    } catch (error) {}
  }, []);

  useEffect(() => {
    const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (_e: MediaQueryListEvent) => {
      setPreferredTheme("system");
    };
    prefersDarkQuery.addEventListener("change", updateTheme);

    return () => {
      prefersDarkQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger
          className={cx(
            "inline-flex select-none justify-center rounded-md px-2.5 py-2 text-sm font-medium",
            "bg-white text-gray-900 hover:bg-gray-50 dark:bg-white/10 dark:text-gray-100 hover:dark:bg-white/10",
            "border border-gray-300 dark:border-transparent",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          )}
        >
          {(function () {
            switch (preferredTheme) {
              case "light":
                return (
                  <IoMdSunny className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
              case "dark":
                return (
                  <IoMdMoon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
              default:
                return (
                  <IoMdDesktop className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
            }
          })()}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="center"
            sideOffset={5}
            className={cx(
              "z-200 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-32 rounded-lg px-1.5 py-1 shadow-md",
              "bg-gray-50 dark:bg-white/10"
            )}
          >
            {themes.map(({ key, label, icon }, i) => {
              return (
                <DropdownMenuPrimitive.Item
                  key={`theme-${i}`}
                  className={cx(
                    "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                    "text-gray-500 focus:bg-gray-200 dark:text-gray-400 dark:focus:bg-white/20"
                  )}
                  onClick={() => {
                    (window as any).__setPreferredTheme(key);
                    setPreferredTheme(key);
                  }}
                >
                  {React.cloneElement(icon, {
                    className: "w-5 h-5 mr-2 text-gray-700 dark:text-gray-300",
                  })}
                  <span className="flex-grow text-gray-700 dark:text-gray-300">
                    {label}
                  </span>
                </DropdownMenuPrimitive.Item>
              );
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default ThemeSwitcher;
