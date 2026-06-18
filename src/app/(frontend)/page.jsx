"use client";

import { useEffect, useState } from "react";
import AgeGate from "@/components/AgeGate";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Categories from "@/components/Categories";
import ResearchCompounds from "@/components/ResearchCompounds";
import SpartaStandard from "@/components/SpartaStandard";
import CollagenBooster from "@/components/CollagenBooster";
import FAQ from "@/components/FAQ";
import Blogs from "@/components/Blogs";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  return (
    <>
      {!isVerified && <AgeGate onVerify={handleVerify} />}
      <div
        style={{
          height: isVerified ? "auto" : "100vh",
          overflow: isVerified ? "visible" : "hidden",
        }}
      >
        <main>
          <Hero />
          <AboutUs />
          <Categories />
          <ResearchCompounds />
          <SpartaStandard />
          <CollagenBooster />
          <FAQ />
          <Blogs />
        </main>
      </div>
    </>
  );
}
