import { useEffect, useRef, useState } from "react";
import { getProducts } from "../api/get/getProducts";
import logo_dark from "../assets/images/logo-dark.png";
import html2canvas from "html2canvas";
import Navbar from "../components/shared/Navbar";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export default function PdfPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData") as string);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProducts() {
      try {
        console.log("Fetching products for user ID:", userData.id);
        const res = await getProducts(userData.id);
        console.log("API response:", res);
        if (Array.isArray(res?.data)) {
          const filteredProducts = res.data.map((product: any) => ({
            name: product.name,
            price: product.rate as number,
            quantity: product.qty as number,
          }));
          console.log("Filtered products:", filteredProducts);
          setProducts(filteredProducts);
        } else {
          console.log("No data received from API or data is not an array");
        }
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Products state updated:", products);
    console.log("Total Charges:", calculateTotal());
    console.log("GST (18%):", calculateGST());
  }, [products]);

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const calculateGST = () => {
    return calculateTotal() * 0.18;
  };

  const downloadPdf = async () => {
    const element = pdfRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/api/products/generate-pdf`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imgData }), // Send the Base64 image data
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "invoice.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error("Failed to generate PDF");
        }
      } catch (error) {
        console.error("Error generating PDF", error);
      }
    }
  };

  return (
    <div className="bg-black">
      {/* Navbar */}
      <Navbar
        navButton={
          <button
            onClick={downloadPdf}
            className="bg-[#CCF575] rounded-lg px-4 py-2 relative transform transition-transform duration-300 hover:-translate-x-4 text-sm md:text-base"
            disabled={loading}
          >
            {loading ? "Loading..." : "Download PDF"}
          </button>
        }
      />

      {/* Main content */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden min-h-[297mm] p-4 sm:p-6 md:p-10"
        id="pdf-section"
        ref={pdfRef}
      >
        <div className="border-b py-3 flex flex-col sm:flex-row justify-center align-middle">
          <div className="w-full sm:w-[95%] flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold">INVOICE GENERATOR</h1>
            <img src={logo_dark} alt="logo" className="h-10 sm:h-12" />
          </div>
        </div>
        <div className="px-2 sm:px-6 md:px-10 py-8">
          <div className="bg-[url('./assets/images/banner-image.png')] bg-cover text-white rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <span>Traveller Name</span>
              <span>Date: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">{userData.name}</div>
            <div>{userData.email}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-8">
              <thead>
                <tr className="bg-gradient-to-r from-[#303661] to-[#263406] text-white">
                  <th className="py-2 px-4 text-left rounded-l-full">Product</th>
                  <th className="py-2 px-4 text-center">Qty</th>
                  <th className="py-2 px-4 text-center">Rate</th>
                  <th className="py-2 px-4 text-right rounded-r-full">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-[#FAFAFA]" : "bg-white"
                    } rounded-full my-2 shadow-lg`}
                  >
                    <td className="py-2 px-4 rounded-l-full">{product.name}</td>
                    <td className="py-2 px-4 text-center">{product.quantity}</td>
                    <td className="py-2 px-4 text-center">{product.price}</td>
                    <td className="py-2 px-4 text-right rounded-r-full">
                      INR {(product.price * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-10">
            <div className="w-full sm:w-[40%] border border-[#A2A2A2] rounded-lg p-4">
              <div className="flex justify-between mb-6">
                <span className="text-[#A2A2A2]">Total Charges</span>
                <span className="text-[#A2A2A2]">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-[#A2A2A2]">GST (18%)</span>
                <span className="text-[#A2A2A2]">
                  ₹{calculateGST().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">
                  ₹ {(calculateTotal() + calculateGST()).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs sm:text-sm text-gray-600">
            <p>
              Date: <b>{new Date().toLocaleDateString()}</b>{" "}
            </p>
          </div>

          <div className="mt-12 sm:mt-32 bg-[#272833] text-white text-xs sm:text-sm rounded-full py-3 px-6 sm:px-14">
            <p>
              We are pleased to provide any further information you may require
              and look forward to assisting with your next order. Rest assured,
              it will receive our prompt and dedicated attention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
