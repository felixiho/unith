import HomePage from "@/features/home";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-3 sm:p-6">
      <h1 className="text-3xl text-center mb-3 font-bold">SPA APP</h1>
      <Suspense>
        <HomePage />
      </Suspense>
    </main>
  );
}
