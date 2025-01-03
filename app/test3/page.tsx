import React from 'react'
import ApiIntegrationBox from './ApiIntegration'
import HostawayFetch from './HostawayFetch'
import { getCustomerData } from './Hooks/getData';

const page = () => {


  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <ApiIntegrationBox/>

      {/* <HostawayFetch/> */}

    </div>
  )
}

export default page
