import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const metadata = {
  title: "VividForge — Digital media for business",
  description: "Agency-quality digital media at self-service speed and price.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "VividForge" },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
};

export const viewport = {
  themeColor: "#12173A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
