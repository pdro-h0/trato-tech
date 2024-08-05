import { api } from "../lib/api";

export const categoriesSevice = {
  search: async () => {
   const response = await api.get("/categories")
      return response.data;
  },
};
