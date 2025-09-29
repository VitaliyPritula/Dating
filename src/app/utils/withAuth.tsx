"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedPage(props: P) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) return null;

    return <Component {...props} />;
  };
}