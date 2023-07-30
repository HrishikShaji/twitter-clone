import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FollowBar from "@/components/FollowBar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className="h-screen bg-black">
          <div className="container h-full mx-auto max-w-6xl">
            <div className="grid grid-cols-5 h-full">
              <Sidebar />
              <div className="col-span-3 border-x border-neutral-800">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </body>
      </Provider>
    </html>
  );
}
