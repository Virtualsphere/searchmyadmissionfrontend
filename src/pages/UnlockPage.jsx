import { Search, Lock } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function UnlockPage() {
    const [params] = useSearchParams();
  const course = params.get("course");
  const handlePayment = async () => {

    // const res = await fetch("http://localhost:5000/create-order", {
    //   method: "POST"
    // });

    // const data = await res.json();

    // const options = {
    // //   key: "RAZORPAY_KEY",
    // //   amount: data.amount,
    // //   currency: "INR",
    // //   name: "LLB Predictor",
    // //   description: "Unlock Full College Report",
    // //   order_id: data.id,

    //   handler: function () {
    //     localStorage.setItem("paidUser", "true");
    //     window.location.href = "/";
    //   }
    // };

    // const rzp = new window.Razorpay(options);
    // rzp.open();

    localStorage.setItem(`paid_${course}`, "true");

    if(course=="llb"){
      window.location.href = `/`;
    }else{
      window.location.href = `/${course}`;
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Lock className="text-indigo-600" size={32}/>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Unlock Full College Predictor
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          Pay <span className="font-semibold text-gray-800">₹49</span> to view
          all predicted colleges and download your detailed PDF report.
        </p>

        {/* Features */}
        <div className="text-left mb-8 space-y-3 text-gray-600 text-sm md:text-base">
          <p>✔ View all predicted colleges</p>
          <p>✔ Detailed admission probability</p>
          <p>✔ Download complete PDF report</p>
        </div>

        {/* Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg text-lg shadow-md"
        >
          Pay ₹49 & Unlock
        </button>

        {/* Secure note */}
        <p className="text-xs text-gray-400 mt-4">
          Secure payment powered by Razorpay
        </p>

      </div>

    </div>
  );
}