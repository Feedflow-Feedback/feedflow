import HeroSection from "@/components/landingPage/heroSection";
import KeyFeatures from "@/components/landingPage/keyFeatures";
import Navbar from "../components/landingPage/navbar";
import HowItWorks from "@/components/landingPage/howItWorks";
import CallToAction from "@/components/landingPage/callToAction";
import Footer from "@/components/landingPage/footer";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <KeyFeatures />
        <HowItWorks />
        <CallToAction />
        <Footer />
        {/* <p className="flex justify-center ">Home</p>
        <a href="/login">Login</a>
        <a href="/register">Register</a> */}
      </div>
    </>
  );
}
