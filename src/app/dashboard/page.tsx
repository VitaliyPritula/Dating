"use client";
import withAuth from "../utils/withAuth";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userData");
    router.push("../questions");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome to Dashboard 🎉</h1>
      <p className="mt-2">Це закрита сторінка. Видно тільки авторизованим користувачам.</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(Dashboard);