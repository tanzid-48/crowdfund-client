import HeroSlider from "@/components/home/HeroSlider";
import Testimonials from "@/components/home/Testimonials";
import TopFundedCampaigns from "@/components/home/TopFundedCampaigns";


export default function Home() {
  return (
    <>
       <HeroSlider />
       <TopFundedCampaigns />
      <Testimonials />
    </>
  );
}
