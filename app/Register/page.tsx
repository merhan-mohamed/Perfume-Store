"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All Fields Are Required");
      return;
    }

    try {
      const ExistUserresponse = await fetch("api/UserExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await ExistUserresponse.json();
      if (user) {
        setError("User already exists.");
        return;
      }
      const response = await fetch("api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/SignIn")
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error During Registration:", error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg rounded-lg border-t-4 p-5 border-[#f03635]">
        <h1 className="text-xl  font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#f03635] text-white font-bold cursor-pointer px-6 py-2 rounded-sm">
            Register
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <Link href="/SignIn" className="text-sm mt-3 text-right">
            Already have an account? <span className="underline">Sign in</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
