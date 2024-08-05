import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface cartInitialState {
  id: number;
  quantity: number;
}

interface IPayload {
  id: number;
  quantity: number;
}

const initialState: cartInitialState[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCart: (state, { payload }: PayloadAction<number>) => {
      const hasItem = state.some((item) => item.id === payload);
      if (!hasItem) {
        return [
          ...state,
          {
            id: payload,
            quantity: 1,
          },
        ];
      }
      return state.filter((item) => item.id !== payload);
    },
    changeQuantity: (state, { payload }: PayloadAction<IPayload>) => {
      state = state.map((itemOnCart) => {
        if (itemOnCart.id === payload.id) {
          itemOnCart.quantity += payload.quantity;
        }
        return itemOnCart;
      });
    },
    resetCart: (state) =>{
      state = initialState
      return state
    }
  },
});

export const cart = cartSlice.reducer;

export const { changeCart, changeQuantity, resetCart } = cartSlice.actions;
