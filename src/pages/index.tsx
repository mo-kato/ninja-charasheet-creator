import { css } from "@/styled-system/css";
import { Link } from "waku";

export const Home = () => (
  <ul
    className={css({
      mx: "auto",
      maxW: 96,
      pt: 12,
      textAlign: "center",
      "& > li": {
        pb: 12,
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
    <li>
      <Link to="/about">このサイトはなんですか？</Link>
    </li>
  </ul>
);

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};

export default Home;
