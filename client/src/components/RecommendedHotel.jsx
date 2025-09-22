import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";

import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filteredHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

//   const filteredHotels = () => {
//   const filteredHotels = rooms
//     .slice()
//     .filter((room) => searchedCities.includes(room.hotel?.city));

//   console.log("Rooms:", rooms);
//   console.log("Searched Cities:", searchedCities);
//   console.log("Filtered Hotels:", filteredHotels);

//   setRecommended(filteredHotels);
// };


  useEffect(() => {
    filteredHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        {/* <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {
          roomsDummyData.slice(0,4).map((room, index)=>(
            <HotelCard key={room._id} room={room} index={index} />
          ))
        }
      </div> */}

        <Title
          title="Recommended Hotels"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experience."
        />

        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-7xl">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
