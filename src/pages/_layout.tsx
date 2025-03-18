import type { ReactNode } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { css } from "@/styled-system/css";

export const RootLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main
      className={css({
        minH: "calc(100vh - 3rem)",
        w: "full",
        p: 6,
        pt: 20,
      })}
    >
      {children}
    </main>
    <Footer />
  </>
);

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};

export default RootLayout;
