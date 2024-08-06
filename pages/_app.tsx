import type { AppProps } from "next/app";

import { RecoilRoot } from 'recoil';

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <RecoilRoot>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider defaultTheme="light"> 
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </RecoilRoot> 
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
