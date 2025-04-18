import type { ReactNode } from "react";
import "../global.css";

import { APP_TITLE } from "@/constants";

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>{APP_TITLE}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
