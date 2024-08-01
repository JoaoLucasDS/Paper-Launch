import { Link } from "@nextui-org/link";
import { Head } from "./head";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from 'framer-motion';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import Logo from '@/components/logo-b';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <NextUINavbar maxWidth="xl" position="sticky">


        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

      </NextUINavbar>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <AnimatePresence mode='wait'>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={{
              pageInitial: {
                opacity: 0,
                x: 0,
              },
              pageAnimate: {
                opacity: 1,
                y: 0,
              },
              pageExit: {
                opacity: 0,
                x: 0,
              },
            }}
          >
          {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="w-full flex items-center justify-center font-bold py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span>Powered by</span>
          <p className=" text-default">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
