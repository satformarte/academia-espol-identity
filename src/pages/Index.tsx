import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import CoursesGrid from "@/components/CoursesGrid";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CourseDetail from "@/pages/CourseDetail";


const Index = () => (
  <div className="min-h-screen bg-background">
    <Topbar />
    <Navbar />
    <HeroSlider />
    <StatsBar />
    <CoursesGrid />
    <WhyUs />
    <CtaBanner />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
