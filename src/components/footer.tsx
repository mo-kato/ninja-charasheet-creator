import { APP_TITLE } from "@/constants";
import { css } from "@/styled-system/css";

function Footer() {
  return (
    <footer
      className={css({
        p: 4,
        h: 12,
        bgColor: "background.subtle",
        color: "foreground.subtle",
        fontSize: "sm",
        textAlign: "center",
      })}
    >
      © 2025 {APP_TITLE}&nbsp;&nbsp;All Rights Reserved. | 非公式ファンメイドサイト
    </footer>
  );
}

export default Footer;
