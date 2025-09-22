
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res)=>{
  try {
    const {name, address, contact, city} = req.body
    const owner = req.user._id;

    //check if user i already registered
    const hotel = await Hotel.findOne({owner})

    if(hotel){
      return res.json({success: false, message: "Hotel already Registered"})
    }

    await Hotel.create({name, address, contact, city, owner});

    await User.findByIdAndUpdate(owner, {role: "hotelOwner"});

    res.json({success: true, message: "Hotel registered Successfully"})

  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

// // Get all hotels (public)
// export const getAllHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find().populate("owner", "username email");
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels", error: error.message });
//   }
// };