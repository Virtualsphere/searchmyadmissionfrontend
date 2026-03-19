import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../url/BaseUrl";
import { useState } from "react";

export default function Unlock() {

  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.get("email"),
          exam: params.get("exam"),
          course: params.get("course"),
          rank: Number(params.get("rank")),
          region: params.get("region"),
          category: params.get("category"),
          amount: 49,
          payment: true
        })
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/";
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
          Pay ₹49 to access complete college predictions
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Processing..." : "Pay ₹49"}
        </button>

      </div>

    </div>
  );
}