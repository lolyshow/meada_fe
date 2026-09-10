import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maeda | Maelda",
  description: "This is a place to shop for your food items",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
