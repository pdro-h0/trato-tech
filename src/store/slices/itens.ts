import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { itensServie } from "../../services/itens-service";
import { createStandaloneToast } from "@chakra-ui/react";
import { api } from "../../lib/api";

const { toast } = createStandaloneToast();

export interface itensInitialState {
  id: number;
  titulo: string;
  descricao: string;
  foto: string;
  favorito: boolean;
  preco: number;
  categoria: string;
}

interface RegisterItemPayload {
  titulo: string;
  descricao: string;
  foto: string;
  preco: number;
  categoria: string;
}

const initialState: itensInitialState[] = [];

export const searchItens = createAsyncThunk("itens/search", itensServie.search);
export const fetchData = createAsyncThunk("data/fetch", async() =>{
   const categoriesRes = await api.get("/categories")
   const itensRes = await api.get("/itens")

   return {
     categories: categoriesRes.data,
     itens: itensRes.data,
   };
})

const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    changeFavorite: (state, { payload }: PayloadAction<number>) => {
      state = state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    registerItem: (state, { payload }: PayloadAction<RegisterItemPayload>) => {
      const newItem: itensInitialState = {
        ...payload,
        id: state.length + 1,
        favorito: false,
      };
      state.push(newItem);
    },
    changeItem: (
      state,
      { payload }: PayloadAction<{ id: number; item: { title: string } }>
    ) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deleteItem: (state, { payload }: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        searchItens.fulfilled,
        (state, { payload }: PayloadAction<itensInitialState[]>) => {
          toast({
            title: "Sucesso!!!",
            description: "Itens carregadas com sucesso.",
            status: "success",
            duration: 3500,
            isClosable: true,
          });

          return payload;
        }
      )
      .addCase(searchItens.pending, () => {
        toast({
          title: "Carregando...",
          status: "loading",
          duration: 3500,
          isClosable: true,
        });
      })
      .addCase(searchItens.rejected, () => {
        toast({
          title: "Erro",
          description: "Erro ao carregar itens.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        toast({
          title: "Sucesso!!!",
          description: "Itens carregadas com sucesso.",
          status: "success",
          duration: 3500,
          isClosable: true,
        });

        return payload.itens;
      })
      .addCase(fetchData.pending, () => {
        toast({
          title: "Carregando...",
          status: "loading",
          duration: 3500,
          isClosable: true,
        });
      })
      .addCase(fetchData.rejected, () => {
        toast({
          title: "Erro",
          description: "Erro ao carregar itens.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      });
  },
});

export const itens = itensSlice.reducer;

export const { changeFavorite, registerItem, changeItem, deleteItem } =
  itensSlice.actions;
