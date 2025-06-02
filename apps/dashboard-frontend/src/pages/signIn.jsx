import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import logo from "@/assets/logo.svg";

export default function signIn() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setEmail = useUserStore((state) => state.setEmail);

  const backendUrl = "http://localhost:3000";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function setErrorAndClearPassword(message) {
    setError(message);
    setForm((prev) => ({ ...prev, password: "" }));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        console.log("Login successful, response:", response);
        setToken(response.data.accessToken);
        setUserId(response.data.userId);
        setEmail(response.data.email);

        window.location.href = "/dashboard";
      } else if (response.status === 400) {
        switch (response.data.message) {
          case "User not found":
            setErrorAndClearPassword("No account found with this email.");
            break;
          case "Invalid credentials":
            setErrorAndClearPassword("Incorrect password. Please try again.");
            break;
          default:
            setErrorAndClearPassword("Invalid email or password.");
            break;
        }
        setErrorAndClearPassword("Invalid email or password.");
      }
    } catch (err) {
      // console.error("Login failed, error:", err);
      setErrorAndClearPassword(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img alt="Feedflow Logo" src={logo} className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-black focus:outline-2 focus:-outline-offset-2 "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-black focus:outline-2 focus:-outline-offset-2 "
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div />

                <div className="text-sm/6">
                  <a href="#" className="font-semibold text-black">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="h-8 mb-0">
                <p
                  className={` text-center text-sm font-medium text-black ${
                    error ? "block" : "hidden"
                  }`}
                >
                  {error}
                </p>
              </div>
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="flex cursor-pointer w-min items-center text-base justify-center rounded-md  px-8 py-1.5 text-p-sm font-semibold text-white shadow-xs bg-orange hover:bg-orange/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange/90"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-8">
              <a href="/register" className="underline">
                Register?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
