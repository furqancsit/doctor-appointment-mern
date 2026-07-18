import React from 'react'
import Hero from './Hero'
import DoctorsPage from './DoctorsList'
import DoctorsList from './DoctorsList'
// import Specialties from './Specialties'
import HowItWorks from '../components/HowItWorks'
import CTASection from '../components/CTASection'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero />
      <DoctorsList showSearch={true}
        showFilters={true} />
      <HowItWorks />
      {/* <Specialties /> */}
      <CTASection/>
      <Testimonials/>

    </div>
  )
}

export default Home