import React from "react";
import Heropage from "@/components/_components/Heropage";
import Aboutsection from "@/components/_components/Aboutsection";
import MyWork from "@/components/_components/MyWork";
import ContactSection from "@/components/_components/ContactSection";

const page = () => {
  return (
    <>
      <Heropage />
      <Aboutsection />
      <MyWork />
      <ContactSection />
    </>
  );
};

export default page;
