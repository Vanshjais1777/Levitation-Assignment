import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircle, ArrowDown, ArrowUp, Trash2 } from "lucide-react"; // Import Trash2 icon
import Navbar from "../components/shared/Navbar";
import { createProduct } from "../api/post/createProduct";
import { deleteProduct } from "../api/delete/deleteProduct"; // Import deleteProduct function
import UserContext from "../context/UserContext";
import { getProducts } from "../api/get/getProducts";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string; // Add id field
  name: string;
  price: number;
  quantity: number;
}

interface FormInputs {
  name: string;
  price: number;
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const { setLogin } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("userData") as string);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts(userData.id); // API call to get the products
        if (res?.data) {
          const filteredProducts = res.data.map((product: any) => ({
            id: product.id, // Ensure id is included
            name: product.name,
            price: product.rate as number,
            quantity: product.qty as number,
          }));
          setProducts(filteredProducts); // Set the products in state
        }
      } catch (error) {
        console.log("Error fetching products", error);
      }
    }
    fetchProducts();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const totalvalue = data.price * data.quantity;
    const res = await createProduct(
      userData.id,
      data.name,
      data.quantity,
      data.price,
      totalvalue
    );
    if (res?.data) {
      setProducts([...products, { ...data, id: res.data.id }]); // Add the new product with id
    }
    reset();
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId)); // Remove the deleted product from state
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const calculateGST = () => {
    return calculateTotal() * 0.18;
  };

  function handleNavigate() {
    setLogin(false);
    localStorage.clear();
    localStorage.setItem("isLoggedIn", "false");
    navigate("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black relative">
      <Navbar
        navButton={
          <button
            onClick={handleNavigate}
            className="bg-[#CCF575] rounded-lg px-6 relative transform transition-transform duration-300 hover:-translate-x-4"
          >
            LogOut
          </button>
        }
      />
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[25%] h-[25%] rounded-full bg-[#4F59A8] mix-blend-screen filter blur-3xl opacity-25"></div>
      <main className="container mx-auto px-4 py-8 text-white my-auto">
        <h1 className="text-4xl font-bold mt-20 mb-3 text-center md:text-left">
          Add Products
        </h1>
        <h4 className="text-[#B8B8B8] mb-6 text-center md:text-left">
          This is basic signup page which is used for levitation <br />{" "}
          assignment purpose.
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                {...register("name", { required: "Product name is required" })}
                id="name"
                placeholder="Enter the product name"
                className="w-full p-4 bg-[#1F1F1F] text-white rounded border border-[#424647] outline-none placeholder:font-thin"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Product Price
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be positive" },
                })}
                id="price"
                type="number"
                placeholder="Enter the price"
                className="w-full p-4 bg-[#1F1F1F] text-white rounded border border-[#424647] outline-none placeholder:font-thin"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1"
              >
                Quantity
              </label>
              <input
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
                id="quantity"
                type="number"
                placeholder="Enter the Qty"
                className="w-full p-4 bg-[#1F1F1F] text-white rounded border border-[#424647] outline-none placeholder:font-thin"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-4 rounded-lg text-[#CCF575] bg-[#1F1F1F] w-full md:w-auto"
          >
            Add Product <PlusCircle className="ml-2 h-4 w-4" />
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300 rounded-tl-lg rounded-tr-lg overflow-hidden">
            <thead className="font-thin bg-[#FFFFFFE6] text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-between md:justify-start">
                    Product name <ArrowUp className="ml-5 hidden md:block" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-between md:justify-start">
                    Quantity <ArrowDown className="ml-4 hidden md:block" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border border-[#424647]">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    INR {(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length >= 0 && (
                <>
                  <tr className="border border-[#424647]">
                    <td colSpan={2}></td>
                    <td colSpan={1} className="px-6 py-4 text-left font-medium">
                      +GST 18%
                    </td>
                    <td className="px-6 py-4 font-medium">
                      INR {(calculateTotal() + calculateGST()).toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {products.length > 0 && (
          <div className="mt-8 text-center">
            <button
              className="w-full max-w-md px-4 py-3 text-[#CCF575] bg-[#1F1F1F] rounded-lg"
              onClick={() => navigate("/pdf")}
            >
              Generate PDF Invoice
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
