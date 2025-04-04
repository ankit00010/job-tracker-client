"use client";
import { fetchService } from "@/services/fetch_services";
import { UserType } from "@/types/UserTypes";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useState } from "react";

export interface AdminContextType {
  loginUser: () => Promise<void>;
  handleUserChange: (key: string, value: string) => void;
  user: UserType;
  registerUser: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });

  const handleUserChange = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const registerUser = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/auth/register",
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    const responseData = await response.data;

    console.log(responseData);

    if (response.code === 200) {
      //reset it
      setUser({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
      alert(responseData.message);
      localStorage.setItem("token", responseData.token);
      return;
    } else {
      alert(responseData.message);
      return;
    }
  };
  const loginUser = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/auth/login",
      data: {
        email: user.email,
        password: user.password,
      },
    });

    const responseData = await response.data;

    console.log(responseData);

    if (response.code === 200) {
      localStorage.setItem("token", responseData.token);
      router.push("/");
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  };

  const admin_context_value = {
    loginUser,
    handleUserChange,
    user,
    registerUser,
  };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
