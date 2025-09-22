import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {

  const {rooms, navigate} = useAppContext();



  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      {/* <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {
          roomsDummyData.slice(0,4).map((room, index)=>(
            <HotelCard key={room._id} room={room} index={index} />
          ))
        }
      </div> */}

      <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experience.' />


      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-7xl">
  {rooms.slice(0,4).map((room, index) => (
    <HotelCard key={room._id} room={room} index={index} />
  ))}
</div>
    <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer'>
      View All Destinations
    </button>
    </div>
  )
}

export default FeaturedDestination
