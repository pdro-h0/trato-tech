import { api } from "../lib/api";

export const itensServie = {
  search: async () => {
    const response = await api.get("/itens");

    return response.data;
  },
};
