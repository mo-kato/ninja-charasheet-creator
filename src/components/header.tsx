import { Link } from "waku";

import { APP_TITLE } from "@/constants";
import { css } from "@/styled-system/css";

function Header() {
  return (
    <header
      className={css({
        bgColor: "background.subtle",
        boxShadow: "0 0 10px var(--colors-primary-100), 0 0 15px var(--colors-primary-100)",
        h: 12,
        display: "flex",
        alignItems: "center",
        p: 4,
        position: "fixed",
        top: 0,
        w: "full",
        zIndex: 1,
      })}
    >
      <Link to="/">{APP_TITLE}</Link>
    </header>
  );
}

export default Header;
