import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { ThemeSwitch } from "@/components/theme-switch";

import Logo from '@/components/logo-b';

import {
  SearchIcon,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="start"
      >
        
        <Logo size="50px"/>
        <div className="inline-flex flex-col ">
          <span className="font-bold text-1xl tracking-wider absolute top-3 left-14">
            PAPER
          </span>
          <span className="font-bold text-1xl tracking-tighter absolute top-7 left-14">
            LAUNCH
          </span>
        </div>
        
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

    </NextUINavbar>
  );
};
