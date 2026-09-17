import {
  Bebas_Neue,
  Cormorant_Garamond,
  DM_Sans,
  Fraunces,
  Instrument_Serif,
  Manrope,
  Space_Grotesk,
} from "next/font/google";

/* Platform typography */
export const platformSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-platform-sans",
  display: "swap",
});

export const platformSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-platform-serif",
  display: "swap",
});

/* Concept typography library (each concept picks a pairing) */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontVariables = [
  platformSans.variable,
  platformSerif.variable,
  fraunces.variable,
  cormorant.variable,
  spaceGrotesk.variable,
  bebas.variable,
  manrope.variable,
].join(" ");
