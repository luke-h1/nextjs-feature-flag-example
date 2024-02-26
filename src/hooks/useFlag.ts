import fetcher from "@frontend/util/fetcher";
import useSWR from "swr";

export default function useFlag(key: string) {
  const { data } = useSWR(`/api/flags/${key}/status`, fetcher);
  return !!data;
}
