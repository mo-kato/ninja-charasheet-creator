import { useMemo } from "react";
import { useRouter } from "waku";

const useParams = () => {
  const { query } = useRouter();
  const params = useMemo(() => new URLSearchParams(query), [query]);

  return params;
};

export default useParams;
