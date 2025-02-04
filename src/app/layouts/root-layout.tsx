import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { Navigation } from "@/widgets/layouts";

import "../styles/globals.css";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" style={{ colorScheme: "dark" }}>
      <body className="flex justify-center">
        <main className="my-8 w-full max-w-screen-sm space-y-8 px-4">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
};
