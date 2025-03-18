import { useEffect, useReducer, useState } from "react";

import useParams from "@/hooks/use-params";
import { idSchema } from "@/schema";
import type { NinjaData } from "@/type";
import { computeStatus, createNewStatus } from "@/utils";

const useNinja = () => {
  const params = useParams();
  const [id, setId] = useState("");
  const [ninja, setNinja] = useReducer<NinjaData | null, [next: Partial<NinjaData>]>((prev, next) => {
    const status = prev ? { ...prev.status, ...next.status } : { ...createNewStatus({}), ...next.status };
    return {
      status,
      computedData: next.computedData ?? computeStatus(status),
    };
  }, null);

  useEffect(() => {
    const result = idSchema.safeParse(params.get("id"));
    const idStr = result.success ? result.data : "";
    if (!idStr) return;
    const dataStr = window.localStorage.getItem(idStr ?? "") ?? "";
    setId(idStr);
    let data: NinjaData;
    try {
      data = JSON.parse(dataStr);
    } catch (e) {
      return;
    }
    setNinja(data);
  }, [params]);

  return { ninja, id, setNinja };
};

export default useNinja;
