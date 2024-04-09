import { Space_Grotesk } from "next/font/google";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space--grotesk",
  weight: ["300", "400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={spaceGrotesk.variable}>
      <head />
      <body>{children}</body>
    </html>
  );
}
