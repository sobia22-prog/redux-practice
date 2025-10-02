import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  selectDetailById,
  selectDetailStatus,
  clearProduct,
} from "../redux/productSlice";
import Spinner from "../components/Spinner";

const ProductDetails = () => {
  const { productId } = useParams();
  const idNum = Number(productId);
  const dispatch = useDispatch();

  const product = useSelector(selectDetailById(idNum));
  const status = useSelector(selectDetailStatus);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
    return () => {
      if (!Number.isNaN(idNum)) dispatch(clearProduct(idNum));
    };
  }, [dispatch, productId, idNum]);

  if (status === "loading" && !product)
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  if (!product)
    return <div className="py-16 text-center text-gray-500">Not found.</div>;

  const { image, title, price, category, description } = product;

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
      <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl">
        <img
          src={image}
          alt={title}
          className="h-96 w-full max-w-md object-contain drop-shadow-md"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 text-lg font-semibold text-white shadow">
            ${price}
          </span>
          <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            {category}
          </span>
        </div>

        <p className="leading-relaxed text-gray-700">{description}</p>

        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg">
            Add to Cart
          </button>

          <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow">
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
