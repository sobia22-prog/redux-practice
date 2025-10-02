import { Link } from "react-router-dom";

const ProductComponent = ({ products }) => {
  if (!products?.length) {
    return <div className="py-16 text-center text-gray-500">No products.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map(({ id, title, image, price, category }) => (
        <Link key={id} to={`/product/${id}`} className="group">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition group-hover:shadow-md">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-contain p-4 transition group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="line-clamp-2 text-sm font-medium text-gray-800">{title}</h3>
              <p className="text-xs text-gray-500">{category}</p>
              <p className="text-base font-semibold text-gray-900">${price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductComponent;
