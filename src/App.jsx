import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [input, setInput] = useState("");
  const [expand, setExpand] = useState(true);
  const [search, setSearch] = useState("");

  const PAGE_SIZE = 10;

  const handlePagination = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page)
      setPage(selectedPage);
  };

  useEffect(() => {
    fetchProduct();
  }, [page, search]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const fetchProduct = async () => {
    const cachedProducts = JSON.parse(localStorage.getItem("products"));
    if (cachedProducts[input]) {
      setProducts(cachedProducts[input]);
      return;
    }
    const skip = (page - 1) * PAGE_SIZE;
    const url = search.trim()
      ? `https://dummyjson.com/products/search?q=${search}&limit=${PAGE_SIZE}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}&select=title,price,thumbnail`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data?.products) {
      setProducts(data?.products);
      setTotalPage(Math.ceil(data?.total / PAGE_SIZE));
      localStorage.setItem("products", JSON.stringify({ ...cachedProducts, [input]: data?.products }));
    }
  };

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Pagination</h1>
      <div className="search-container">
      <div className="search-content">
        <input
          className="search-input"
          placeholder="Search products..."
          onFocus={() => setExpand(true)}
          onBlur={() => setExpand(false)}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {expand && (
        <div className="search-results">
          {products.map((item) => (
            <div className="search-data">{item?.title}</div>
          ))}
        </div>
      )}
      </div>
      {products?.length > 0 && (
        <div className="products">
          {products.map((item) => (
            <ProductCard
              key={item?.id}
              title={item?.title}
              thumbnail={item?.thumbnail}
            />
          ))}
        </div>
      )}
      {products.length > 0 && (
        <Pagination
          handlePagination={handlePagination}
          totalPage={totalPage}
          page={page}
        />
      )}
    </div>
  );
}
