import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );
  // console.log(products)

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Filter products dynamically
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (status === "loading")
    return <p className="text-black dark:text-white">Loading products...</p>;
  if (status === "failed")
    return <p className="text-black dark:text-white">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 my-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or category"
          className="border px-4 py-2 w-full md:w-1/3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Novel">Novel</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          <option value="History">History</option>
          <option value="Fantasy">Fantasy</option>
        </select>

        <div className="flex items-center gap-2">
          <span>Price:</span>
          <input
            type="number"
            placeholder="Min"
            className="border px-2 py-1 w-20 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            className="border px-2 py-1 w-20 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/products/${product._id}`}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
