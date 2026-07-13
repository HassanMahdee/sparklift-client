import HeroBanner from "@/components/hero-banner";
import FeaturedCampaigns from "@/components/homepage/featured-campaigns";
import WhyChooseUs from "@/components/homepage/why-choose-us";
import Testimonials from "@/components/homepage/testimonials";
import OurImpacts from "@/components/homepage/our-impacts";
import JoinSupporter from "@/components/homepage/join-supporter";
import FundraiseCreator from "@/components/homepage/fundraise-creator";
import SubscribeNewsletter from "@/components/homepage/subscribe-newsletter";
import ContactUs from "@/components/homepage/contact-us";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedCampaigns />
      <WhyChooseUs />
      <Testimonials />
      <OurImpacts />
      <JoinSupporter />
      <FundraiseCreator />
      <SubscribeNewsletter />
      <ContactUs />
    </div>
  );
}
