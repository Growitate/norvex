import { useState, useEffect } from "react";

const ADMIN_STORAGE_KEY = "norva_admin_session_auth";
export const ADMIN_HARDCODED_PASSWORD = "norva@admin2026";

export function getAdminAuthState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function loginAdmin(password: string): boolean {
  if (password.trim() === ADMIN_HARDCODED_PASSWORD) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      window.dispatchEvent(new Event("norva_admin_auth_changed"));
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    window.dispatchEvent(new Event("norva_admin_auth_changed"));
  }
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthenticated(getAdminAuthState());
    setIsLoading(false);

    const handleAuthChange = () => {
      setIsAuthenticated(getAdminAuthState());
    };

    window.addEventListener("norva_admin_auth_changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("norva_admin_auth_changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login: loginAdmin,
    logout: logoutAdmin,
  };
}
