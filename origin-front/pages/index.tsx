import { IAuthState } from "@/interface";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/redux";

export default function Home() {
  
  const { user } = useAppSelector((state: any) => state.auth);

  console.log(user);

  return (
    <>
      <main></main>
    </>
  );
}
