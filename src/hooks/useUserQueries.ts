import { useQuery } from "@tanstack/react-query";
import { getMainUser } from "@/server/getUserInfo";

export const useMainUser = () => {
  return useQuery({
    queryKey: ["mainUser"],
    queryFn: getMainUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
