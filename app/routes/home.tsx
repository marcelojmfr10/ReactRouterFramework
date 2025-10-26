import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Navigate, redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App!!!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return redirect('/chat');
}

export default function Home() {
  return <Navigate to="/chat" />
  // return (
  //   <div>
  //     <h1>hola</h1>
  //   </div>)
}
