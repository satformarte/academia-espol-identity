import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import CoursesGrid from "@/components/CoursesGrid";
import RecentCourses from "@/components/RecentCourses";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Topbar />
    <Navbar />
    <HeroSlider />
    <StatsBar />
    <CoursesGrid />
    <RecentCourses />
    <WhyUs />
    <CtaBanner />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;