import { BASE_URL } from "../url/BaseUrl";
import { useState } from "react";

export default function Unlock() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("predictorData"));

    if (!user) {
      alert("Session expired. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          amount: 499,
          payment: true,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isPaid", "true");

        window.location.href = "/comparison";
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">
          Unlock Full Results 🔓
        </h1>

        <p className="text-gray-600 mb-6">
          Pay ₹499 to access complete college comparison
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Processing..." : "Pay ₹499"}
        </button>
      </div>
    </div>
  );
}