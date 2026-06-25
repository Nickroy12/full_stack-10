export const dynamic = "force-dynamic";
import { Hero } from "@/components/Home/Hero";
import MasterChef from "@/components/Home/MasterChef";
import Image from "next/image";
import PricingCards from "./pricing/page";
import FeaturePage from "./feature/page";
import Popular from "@/components/Home/Popular";

export default function Home() {
  return (
 <>
 <Hero/>
 <FeaturePage/>
 <MasterChef/>
 <Popular/>
 <PricingCards/>
 </>
  ); 
}
