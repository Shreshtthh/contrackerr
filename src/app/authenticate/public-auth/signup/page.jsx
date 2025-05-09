"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ContractorSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/public-sec/signup", formData);
      if (res.data.success) {
        router.push("/authenticate/public-auth/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#060611] text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-teal-400 text-center">
          Public Signup
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded transition" >
            Sign Up
          </button>
        </form>
        {/* <hr />
        <div className="flex justify-center">
          <LoginWithGoogle />
        </div> */}

        <p className="text-gray-400 text-sm text-center mt-3">
          Already have an account?{" "}
          <a href="/authenticate/public-auth/login" className="text-teal-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

// export function LoginWithGoogle() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   console.log(session?.user.jwt);
//   useEffect(() => {
//     if (session?.user?.jwt) {
//       const userData = {
//         token: session.user.jwt,
//         id: session.user.id,
//         name: session.user.username,
//         email: session.user.email,
//         role: session.user.role,
//       };
//       console.log("token:", session.user.jwt);
//       const decoded = jwtDecode(session.user.jwt);

//       console.log(decoded);
//       localStorage.setItem("token", session.user.jwt); // ✅

   
//       router.push("/public-sec");
//     }
//   }, [session]);

//   return (
//     <button
//       onClick={() => signIn("google")}
//       className="bg-gray-700 text-white px-9 py-2 rounded-3xl my-3 justify-self-center border-2 border-gray-600"
//     >
//       Login with Google
//     </button>
//   );
// }
