"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Field from "./Field";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({ confirm: "", form: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmRef = useRef(null);

  const isLogin = mode === "login";

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      console.error("Error:", err.message);
      setErrors((prev) => ({ ...prev, form: err.message }));
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirm) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      confirmRef.current?.focus();
      return;
    }

    setErrors((prev) => ({ ...prev, confirm: "" }));

    try {
      await signup(name, email, password);
      router.push("/");
    } catch (err) {
      console.error("Error:", err.message);
      setErrors((prev) => ({ ...prev, form: err.message }));
    }
  }

  return (
    <div className="w-full max-w-md neon-border bg-panel rounded-lg p-8">
      <Link
        href="/"
        className="block text-center text-primary neon-text font-bold tracking-[0.3em] mb-1 cursor-pointer"
      >
        DEVFORGE
      </Link>

      <p className="text-center text-xs text-muted tracking-widest mb-8">
        {"// access_terminal"}
      </p>

      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="flex flex-col gap-4"
      >
        {!isLogin && (
          <Field
            id="name"
            label="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            placeholder="n3on_rider"
          />
        )}

        <Field
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@grid.net"
        />

        <Field
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: "" }));
          }}
          placeholder="••••••••"
        />

        {!isLogin && (
          <Field
            id="confirm-password"
            label="confirm password"
            type="password"
            value={confirm}
            inputRef={confirmRef}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            error={errors.confirm}
            placeholder="••••••••"
          />
        )}

        {errors.form && (
          <p
            role="alert"
            aria-live="polite"
            className="text-xs text-red-400 tracking-widest"
          >
            {"// "}
            {errors.form}
          </p>
        )}

        <Button type="submit" variant="primary" className="mt-2 w-full">
          {isLogin ? "Log in" : "Register"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted mt-6">
        {isLogin ? "No account yet? " : "Already wired in? "}
        <button
          type="button"
          onClick={() => {
            setMode(isLogin ? "signup" : "login");
            setErrors({ confirm: "" });
          }}
          className="text-primary hover:text-primary-strong underline underline-offset-4 cursor-pointer"
        >
          {isLogin ? "Register" : "Log in"}
        </button>
      </p>

      <Link
        href="/"
        className="block text-center text-xs text-muted hover:text-primary mt-4 cursor-pointer"
      >
        ← back to home
      </Link>
    </div>
  );
}
