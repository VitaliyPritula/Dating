"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/AuthProvider"; // шлях підлаштуй

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedPage(props: P) {
    const { isAuthenticated } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // якщо не авторизований → редірект
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null; // поки редірект — нічого не рендеримо

    return <Component {...props} />;
  };
}
