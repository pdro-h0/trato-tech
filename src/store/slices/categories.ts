import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesSevice } from "../../services/categories-service";
import { createStandaloneToast } from "@chakra-ui/react";
import { fetchData } from "./itens";

const { toast } = createStandaloneToast();

export interface categoriesInitialState {
  nome: string;
  thumbnail: string;
  header: string;
  id: string;
  descricao: string;
}

const initialState: categoriesInitialState[] = [];

export const searchCategory = createAsyncThunk(
  "categories/search",
  categoriesSevice.search
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        searchCategory.fulfilled,
        (state, { payload }: PayloadAction<categoriesInitialState[]>) => {
          toast({
            title: "Sucesso!!!",
            description: "Categorias carregadas com sucesso.",
            status: "success",
            duration: 3500,
            isClosable: true,
          });

          return payload;
        }
      )
      .addCase(searchCategory.pending, () => {
        toast({
          title: "Carregando...",
          status: "loading",
          duration: 3500,
          isClosable: true,
        });
      })
      .addCase(searchCategory.rejected, () => {
        toast({
          title: "Erro",
          description: "Erro ao carregar categorias.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        return payload.categories;
      });
  },
});

export const categories = categoriesSlice.reducer;
