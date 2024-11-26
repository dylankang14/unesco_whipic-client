"use client";

import { LoginSchemaType } from "@/app/nextApi/auth/login/route";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/nextApi/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error111:", error);
      setErrors({ fieldErrors: { password: ["로그인 아이디와 비밀번호를 잘못 입력하셨습니다."] } });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh gap-6 p-5">
      <Image
        src={"/logo.svg"}
        width={350}
        height={136}
        alt="유네스코 세계유산 국제설명센터 로고"
        className="w-3/4 max-w-[300px]"
      />
      <h1 className="text-xl md:text-2xl font-semibold">파일관리 시스템</h1>
      <form onSubmit={handleSubmit} className="border py-6 px-8 rounded-md flex flex-col gap-4 w-[340px] bg-slate-100">
        <div className="flex flex-col gap-2">
          <label htmlFor="id">아이디</label>
          <Input
            type="text"
            name="id"
            id="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            errors={errors?.fieldErrors?.userId}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pw">비밀번호</label>
          <Input
            type="password"
            name="password"
            id="pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            errors={errors?.fieldErrors?.password}
          />
        </div>
        <div className="pt-2">
          <Button className="w-full" isLoading={isLoading} text="로그인" />
        </div>
      </form>
    </div>
  );
}
