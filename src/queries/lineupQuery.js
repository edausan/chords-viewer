import { useQuery } from "@tanstack/vue-query";
import { GetAllLineups } from "../api/lineup";

export const useLineups = useQuery({
	queryKey: ["lineups"],
	queryFn: async () => {
		const lineups = await GetAllLineups();
		return lineups;
	},
});