import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import logo from "@/assets/logo.svg";

export default function signIn() {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
        setToken(response.data.accessToken);
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
      console.error("Login failed, error:", err);
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
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <div />
                {/* <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="remember-me"
                    className="block text-sm/6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div> */}

                <div className="text-sm/6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="flex cursor-pointer w-min items-center text-base justify-center rounded-md  px-8 py-1.5 text-p-sm font-semibold text-white shadow-xs bg-orange hover:bg-orange/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange/90"
                >
                  Login
                </button>
              </div>
              <div className="h-8  ">
                <p
                  className={` text-center text-sm font-medium text-black ${
                    error ? "block" : "hidden"
                  }`}
                >
                  {error}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
