import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { useDummyStore } from "../../store/dummyStore";
import UserCartProducts from "../user/UserCartProducts";

function Checkout() {
  const productById = useDummyStore((s) => s.productById);
  const getUserCart = useCartStore((s) => s.getUserCart);
  const cart = useCartStore((s) => s.cart);

  useEffect(() => {
    getUserCart();
  }, [cart]);

  const subtotalNum = productById.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const gstNum = subtotalNum * 0.18;
  const totalNum = subtotalNum + gstNum;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Checkout
      </h2>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100 px-6 py-4">
          {productById.map((item) => (
            <UserCartProducts item={item} key={item.id} />
          ))}
        </div>

        <div className="bg-gray-50 p-6 space-y-4 border-t border-gray-200">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">₹{subtotalNum.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (18%)</span>
            <span className="font-medium">₹{gstNum.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Amount</span>
            <span>₹{totalNum.toFixed(2)}</span>
          </div>

          <div className="pt-4">
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
