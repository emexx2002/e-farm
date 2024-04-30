import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "admin" | "buyer" | "seller"

interface Auth {
  username: string;
  password: string;
}

export const useCart = create(
  persist(
    combine(
      {
        cartItems: [],
        
      },
      (set) => ({
      
        setCartItem: (payload:any) => {
          set({ cartItems:  payload });
        },
    })
    ),
    {
      name: "efarm-cart",
      getStorage: () => localStorage,
    }
  )
);

export const CartActions = {
  setCartItem: (cartItem :any) => {
    useCart.getState().setCartItem(cartItem);
  },
 
};
