import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobsListings from '../components/JobsListings';
import ViewJobs from '../components/ViewJobs';
const HomePage = () => {
  return (
    <>
      <Hero/>
      <HomeCards/>
      <JobsListings isHome='true'/>
      <ViewJobs/>
    </>
  )
}

export default HomePage