import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// API to create a new room for a hotel
export const createRoom = async (req, res) => {
  try {
    //*******log for debugging*********
    //      console.log("req.body:", req.body);
    // console.log("req.files:", req.files);

    const { roomType, pricePerNight, amenities } = req.body;

    //*******log for debugging*********
    //      console.log("roomType:", roomType);
    // console.log("pricePerNight:", pricePerNight);
    // console.log("amenities:", amenities);

    const hotel = await Hotel.findOne({ owner: req.auth.userId });


    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    // Upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);
      
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images,
    });
    
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to all rooms for a specific hotel
export const getOwnereRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// export const toggleRoomAvailability = async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     const roomData = await Room.findById(roomId);

//     if (!roomData) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     roomData.isAvailable = !roomData.isAvailable;
//     await roomData.save(); // 🔥 save changes

//     res.json({ success: true, message: "Room availability updated", room: roomData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

//*******chat gpt full create room code*********
//               export const createRoom = async (req, res) => {
//   try {
//     console.log("req.body:", req.body);
//     console.log("req.files:", req.files);
//     console.log("req.authData:", req.authData);

//     const { roomType, pricePerNight, amenities } = req.body;

//     const hotel = await Hotel.findOne({ owner: req.authData.userId });
//     if (!hotel) return res.status(404).json({ success: false, message: "No Hotel found" });

//     // Check if files exist
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ success: false, message: "No images uploaded" });
//     }

//     // Upload images to Cloudinary using buffer
//     const images = await Promise.all(
//       req.files.map(
//         (file) =>
//           new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { folder: "rooms" },
//               (error, result) => {
//                 if (error) reject(error);
//                 else resolve(result.secure_url);
//               }
//             );
//             stream.end(file.buffer);
//           })
//       )
//     );

//     // Create room
//     const room = await Room.create({
//       hotel: hotel._id,
//       roomType,
//       pricePerNight: Number(pricePerNight),
//       amenities: JSON.parse(amenities),
//       images,
//     });

//     res.json({ success: true, message: "Room created successfully", room });
//   } catch (error) {
//     console.error("createRoom error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




// export const getOwnereRooms = async (req, res) => {
//   try {
//     const authData = req.authData || req.auth(); // support both styles
//     const hotelData = await Hotel.findOne({ owner: authData.userId });

//     if (!hotelData) {
//       return res.json({ success: false, message: "No hotel found for this user" });
//     }

//     const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
//     res.json({ success: true, rooms });
//   } catch (error) {
//     console.error("getOwnereRooms error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };