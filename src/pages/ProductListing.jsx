import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectListStatus,
  selectError,
} from "../redux/productSlice";
import ProductComponent from "../components/ProductComponent";
import Spinner from "../components/Spinner";

const ProductListing = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectListStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  if (status === "failed")
    return <div className="py-16 text-center text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Products</h2>
      <ProductComponent products={products} />
    </div>
  );
};
export default ProductListing;
