"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Button from "../components/Button";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 text-foreground items-center justify-center p-20">
        <p className="text-muted tracking-widest text-xs">{"// verifying_credentials..."}</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col flex-1 text-foreground p-6 sm:p-10">
      <header className="flex items-center justify-between py-5 border-b border-panel-border mb-10">
        <Link href="/" className="glitch neon-text text-primary text-xl font-bold tracking-[0.3em]">
          DEVFORGE
        </Link>
        <span className="text-secondary neon-text">@{user.name || user.handle || "user"}</span>
      </header>

      <section className="bg-panel border border-panel-border rounded-md p-8 max-w-2xl mx-auto w-full text-center">
        <h1 className="text-3xl text-primary font-bold mb-4">Welcome to the Inner Circle</h1>
        <p className="text-muted mb-8 text-sm">
          This is a protected route. If you were not logged in, you would have been redirected back to the login page immediately.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button href="/" variant="primary">
            Return Home
          </Button>
        </div>
      </section>
    </div>
  );
}
