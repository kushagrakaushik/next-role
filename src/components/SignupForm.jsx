import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 

export default function SignupForm({defaultMode}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(defaultMode);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup" && password !== confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
    }

    try {
        if (mode === "signup") {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        navigate("/dashboard");
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-[0_0_40px_rgba(139,92,246,0.15)]">

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        <button type="button"
          onClick={() => setMode("login")}
          className={`flex-1 pb-2 text-sm font-medium transition-all duration-500 ${
            mode === "login"
              ? "text-white border-b-2 border-violet-500"
              : "text-zinc-400"
          } hover:text-white hover:border-b-2 hover:border-violet-500`}
        >
          Login
        </button>

        <button type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 pb-2 text-sm font-medium transition-all duration-500 ${
            mode === "signup"
              ? "text-white border-b-2 border-violet-500"
              : "text-zinc-400"
          } hover:text-white hover:border-b-2 hover:border-violet-500`}
        >
          Sign Up
        </button>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-zinc-100">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          {mode === "login"
            ? "Login to continue your career journey"
            : "Start building your career path"}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        {error && <div className="p-2 bg-red-500/20 border border-red-500 text-red-300 text-sm rounded">{error}</div>}

        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
        />

        {mode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />
        )}

        {/* Remember / Forgot */}
        {mode === "login" && (
          <div className="flex justify-between text-sm text-zinc-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-violet-500" />
              Remember me
            </label>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-zinc-800" />
        <span className="text-zinc-500 text-sm">or continue with</span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>

      {/* Social */}
      <div className="flex gap-3">
        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-lg flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
            className="h-5"
          />
        </button>

        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-lg flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            className="h-5 invert"
          />
        </button>
      </div>

      {/* Switch */}
      <p className="text-center text-sm text-zinc-400">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-violet-400 hover:underline cursor-pointer"
        >
          {mode === "login" ? "Sign up" : "Login"}
        </span>
      </p>
    </div>
  );
}