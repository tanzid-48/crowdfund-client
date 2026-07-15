import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TopFundedCampaigns from "@/components/home/TopFundedCampaigns";


export default function Home() {
  return (
    <>
       <HeroSlider />
       <TopFundedCampaigns />
        <HowItWorks />
      <Testimonials />
    </>
  );
}
