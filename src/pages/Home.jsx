import Banner from "../components/home/Banner";
import LatestJobs from "../components/home/LatestJobs";
import TopCategories from "../components/home/TopCategories";
import AboutPlatform from "../components/home/AboutPlatform";
import ThemeToggle from "../components/home/ThemeToggle";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestJobs />
      <TopCategories />
      <AboutPlatform />
      <ThemeToggle />
    </div>
  );
};

export default Home;
