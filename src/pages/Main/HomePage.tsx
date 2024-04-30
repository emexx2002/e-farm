import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { ProductService } from '../../services/product.service'
import { useAuth } from '../../zustand/auth.store'
import { formatAmount } from '../../utils/Helpfunctions'
import toast from 'react-hot-toast'
import { CartActions, useCart } from '../../zustand/cart.store'

const HomePage = () => {
const profile = useAuth((s) => s.profile)
const newData:any = useCart((s) => s.cartItems)
const [cart, setCart] = useState<any>(newData || [])


  // Function to save cart to localStorage
  const saveCartToLocalStorage = () => {
    CartActions.setCartItem(cart)
  };

  // Function to add a product to the cart
  const addToCart = (product: any, quantity: number) => {
    // Check if the product is already in the cart
    const updatedCart = cart.map((item: any) => {
      if (item._id === product._id) {
        // If the product is already in the cart, update its quantity
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });

    // If the product is not in the cart, add it to the cart with the specified quantity
    if (!updatedCart.some((item : any)  => item._id === product._id)) {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    toast.success("Added to cart")
  };

  // useEffect to save cart to localStorage when cart changes
  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  const { data: allProducts, isLoading, refetch } = useFetchWithParams(
    ["query-all-products", {

    }, profile],
    ProductService.getAllProducts,
    {
        onSuccess: (data: any) => {
            // console.log(data.data);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    }
)


  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our E-commerce Store</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Product Card 1 */}

          {
            allProducts && allProducts.data.map((items:any) =>   <div className="bg-white p-4 shadow-md rounded-lg">
            <NavLink onClick={() => localStorage.setItem("selectedProd", JSON.stringify(items))} to={`/product/${items._id}`}>
              <img
                src={items.image !== "" ? items.image : "https://via.placeholder.com/300"}
                alt="Product 1"
                className="w-full h-40 object-contain rounded-lg mb-4"
              />
              <div className="text-center mb-2">{items.name}</div>
              <div className="text-center text-gray-600">Price: {formatAmount(items.price)}</div>
            </NavLink>
            <div className="flex justify-center mt-4">
              <button onClick={() => addToCart(items, 1)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div> )
          }

        </div>
      </div>
    </div>
  )
}

export default HomePage