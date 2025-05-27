import { useState } from "react";
import axios from "axios";
import logo from "@/assets/logo.svg";

export default function register() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({ email: "", password: "", password2: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.password2) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        email: form.email,
        password: form.password,
      });
      if (response.status === 200) {
        window.location.href = "/login";
      }
    } catch (err) {
      if (
        err.response?.data.message === "User with this email already exists"
      ) {
        setError("User with this email already exists");
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img alt="Feedflow Logo" src={logo} className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-8 shadow-sm sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password Repeat
                </label>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={form.password2}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {error && <p className="text-center text-orange">{error}</p>}
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="flex cursor-pointer w-min items-center text-base justify-center rounded-md  px-8 py-1.5 text-p-sm font-semibold text-white shadow-xs bg-orange hover:bg-orange/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange/90"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="text-center mt-8">
              <a href="/login" className="underline">
                Login?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
