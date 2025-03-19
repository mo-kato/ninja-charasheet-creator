import type { ReactNode } from "react";
import { Link } from "waku";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { css } from "@/styled-system/css";
import { grid } from "@/styled-system/patterns";

export const RootLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <div
      className={grid({
        minH: "calc(100vh - 3rem)",
        gridTemplateColumns: "16rem 1fr",
        gridGap: 0,
        w: "full",
        pt: 20,
      })}
    >
      <nav>
        <ul
          className={css({
            textAlign: "center",
            position: "sticky",
            top: 24,
            "& > li": {
              pb: 4,
              "& > a": {
                fontWeight: "bold",
                _hover: {
                  _before: {
                    content: "'◆'",
                  },
                  _after: {
                    content: "'◆'",
                  },
                },
              },
            },
          })}
        >
          <li>
            <Link to="/create">新規作成な</Link>
          </li>
          <li>
            <Link to="/list">作ったニンジャを見る</Link>
          </li>
        </ul>
      </nav>
      <main
        className={css({
          w: "calc(100vw - 16rem)",
          pr: 6,
          pb: 6,
        })}
      >
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};

export default RootLayout;
