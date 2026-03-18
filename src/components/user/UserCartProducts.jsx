import { useNavigate } from "react-router-dom";

function UserCartProducts({ item }) {
  if (!item) return null;
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-2 py-1 pl-1 pr-4 group">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl flex items-center justify-center border border-gray-50 overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-14 h-14 object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3
            className="font-semibold text-gray-800 text-[15px] hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => navigate(`/${item.title}`)}
          >
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            <span>{item.category}</span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>{item.availabilityStatus}</span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>{item?.brand}</span>
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col gap-1">
        <span className="font-bold text-gray-900 text-[16px]">
          ${item.price?.toFixed(2)}
        </span>
        <span className="text-[13px] text-gray-400 font-medium">
          Qty: {item.quantity}
        </span>
        <span className="text-base text-gray-500 font-medium">
          ${item.price?.toFixed(2) * item.quantity}
        </span>
      </div>
    </div>
  );
}

export default UserCartProducts;
