// ProductPage.tsx
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../../services/product.service";
import toast from "react-hot-toast";
import { CartActions, useCart } from "../../zustand/cart.store";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()
  const [details, setDetails] = useState<any>({})

  

  const {id} = useParams()

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

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Handle adding product to cart
    addToCart(details, quantity)
  };


  useEffect(() => {

    const selected:any = localStorage.getItem("selectedProd")
    setDetails(JSON.parse(selected))
  },[])
  


  return (
    <div className="container mx-auto mt-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-0-8">Back to Home Page</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Image */}
        <div className="md:order-2">
          <img
            src={details?.image ? details?.image : "https://via.placeholder.com/400"}
            alt="Product"
            className="w-full h-auto rounded-lg"
          />
        </div>
        {/* Product Details */}
        <div className="md:order-1">
          <h1 className="text-3xl font-bold mb-4">{details && details?.name}</h1>
          <p className="text-gray-600 mb-4">{details?.description}</p>
          <div className="flex items-center mb-4">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-gray-300 px-3 py-1 rounded-full mr-2"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-gray-300 px-3 py-1 rounded-full ml-2"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
