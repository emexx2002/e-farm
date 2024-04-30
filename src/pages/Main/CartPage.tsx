import { useMutation } from "react-query";
import { formatAmount } from "../../utils/Helpfunctions";
import { CartActions, useCart } from "../../zustand/cart.store";
import { ProductService } from "../../services/product.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

// CartPage.tsx
const CartPage = () => {
  const cartItems:any = useCart(s => s.cartItems)
  const [address, setAddress] = useState("")
const [cart, setCart] = useState<any>(cartItems || [])
  const navigate = useNavigate()

  const saveCartToLocalStorage = () => {
    CartActions.setCartItem(cart)
  };

  const totalPrice = cartItems.reduce((total:any, item:any) => {
    return total + (item.price * item.quantity);
  }, 0);

  const itemsForBuy = cart.map((item : any) => ({
    id: item._id,
    quantity: item.quantity
  }));

  const BuyItems = useMutation(
    async (values: any) => {
    
      return ProductService.buyProduct(values)
    },
    {
      onSuccess: (response:any) => {
      
        navigate("/order-successful")
        
      },
      onError: (err: any) => {
        // form.setSubmitting(false)
        toast.error(err)
      },
    }
  );

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  const removeFromCart = (idToRemove: any) => {
    setCart((prevCart : any) => prevCart.filter((item:any) => item._id !== idToRemove));
  };
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Card */}
          {
            cart.map((items : any) => <div className="bg-white object-contain p-4 shadow-md rounded-lg">
            <img
              src={items.image}
              alt="Product"
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
            />
            <div className="text-center mb-2">{items.name}</div>
            <div className="text-center text-gray-600">Price: {formatAmount(items.price)}</div>
            <div className="flex justify-center mt-4">
              <button onClick={() => removeFromCart(items._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Remove
              </button>
            </div>
          </div>)
          }
          
          {/* Repeat the above product card for each product in the cart */}
        </div>
        <div> 
          <input onChange={(e:any) => setAddress(e.target.value)} className="w-[350px] px-6 py-3" placeholder="enter your address" />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold">Total:</span> {formatAmount(totalPrice)}
          </div>
          <button onClick={() => {
            const body = {
              purchaseData: itemsForBuy,
              address: address
            }
            BuyItems.mutate(body)
            }} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    );
  };
  
  export default CartPage;
  