"use client";
import React, { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/app/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthPage = ({ isSignIn }: { isSignIn: boolean }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        const res = await axios.post(`${HTTP_BACKEND}/users/signin`, {
          username: username || undefined,
          email: email || undefined,
          password,
        });
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        await axios.post(`${HTTP_BACKEND}/users/signup`, {
          username,
          email,
          password,
        });
        router.push("/signin");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4 font-sans">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6965db]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#6965db] rounded-lg flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              SketchSync
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            {isSignIn
              ? "Sign in to continue to your boards"
              : "Get started with SketchSync for free"}
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6965db] focus:ring-1 focus:ring-[#6965db] transition-all"
                  required
                />
              </div>
            )}

            {isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Username or Email
                </label>
                <input
                  type="text"
                  placeholder="johndoe or john@example.com"
                  value={username}
                  onChange={(e) => {
                    const val = e.target.value;
                    setUsername(val);
                    if (val.includes("@")) {
                      setEmail(val);
                      setUsername("");
                    } else {
                      setEmail("");
                    }
                  }}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6965db] focus:ring-1 focus:ring-[#6965db] transition-all"
                  required
                />
              </div>
            )}

            {!isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6965db] focus:ring-1 focus:ring-[#6965db] transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6965db] focus:ring-1 focus:ring-[#6965db] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6965db] hover:bg-[#5b57d1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#6965db]/20 hover:shadow-[#6965db]/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#a8a5ff] hover:text-[#6965db] font-medium transition-colors"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#a8a5ff] hover:text-[#6965db] font-medium transition-colors"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
