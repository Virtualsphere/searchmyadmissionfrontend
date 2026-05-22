import { BASE_URL } from "../url/BaseUrl";
import { useState, useEffect } from "react";

export default function Unlock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("predictorData"));
    setUser(storedUser);
  }, []);

  const handlePayment = async () => {
    if (!user) {
      setError("Session expired. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          exam: user.exam,
          course: user.course,
          rank: user.rank,
          region: user.region,
          category: user.category,
          amount: 1
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const { order, keyId } = orderData;

      // Step 2: Open Razorpay checkout
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "IP University College Predictor",
        description: `${user.course} - ${user.exam}`,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await fetch(`${BASE_URL}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                exam: user.exam,
                course: user.course,
                rank: user.rank,
                region: user.region,
                category: user.category,
                amount: 1,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              localStorage.setItem("isPaid", "true");
              window.location.href = "/comparison";
            } else {
              setError(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            setError("Error verifying payment: " + err.message);
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: user.email
        },
        theme: {
          color: "#3b82f6"
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled. Please try again.");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || "Error initiating payment");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Unlock Full Results
          </h1>
          <p className="text-gray-600">
            Get AI-powered college comparisons & recommendations
          </p>
        </div>

        {/* Features */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Detailed college comparison with AI insights</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Admission probability & seat security analysis</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Personalized AI verdict & recommendations</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Risk assessment & strategy planning</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Price Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white text-center">
          <p className="text-sm opacity-90 mb-2">One-time payment</p>
          <div className="text-4xl font-bold">₹1</div>
          <p className="text-xs opacity-75 mt-1">Secure payment via Razorpay</p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={loading || !user}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            loading || !user
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            <>
              <span>🔒</span>
              Pay ₹1 Now
            </>
          )}
        </button>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span>🛡️</span>
            Secured by Razorpay. No card details stored.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>Questions? <a href="/support" className="text-blue-600 hover:underline">Contact support</a></p>
        </div>
      </div>
    </div>
  );
}