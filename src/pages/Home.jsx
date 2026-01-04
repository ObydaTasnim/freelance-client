import Banner from "../components/home/Banner";
import LatestJobs from "../components/home/LatestJobs";
import TopCategories from "../components/home/TopCategories";
import AboutPlatform from "../components/home/AboutPlatform";
import ThemeToggle from "../components/home/ThemeToggle";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import Blogs from "../components/home/Blogs";
import Newsletter from "../components/home/Newsletter";
import FAQ from "../components/home/FAQ";
// import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestJobs />
      <TopCategories />
      <AboutPlatform />
      <Statistics />
      <Testimonials />
      <Blogs />
      <Newsletter />
      <FAQ />
      {/* <CTA /> */}
      <ThemeToggle />
    </div>
  );
};

export default Home;
