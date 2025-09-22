import User from "../models/User.js";

// Middleware to check if User is Authenticated
export const protect = async (req, res, next)=>{
  const {userId} = req.auth();
  if(!userId){
    res.json({success: false, message: "not authenticated"})
  }else{
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
}


// import User from "../models/User.js";

// // Middleware to check if User is Authenticated
// export const protect = async (req, res, next) => {
//   try {
//     // req.auth is now a function in the latest Clerk version
//     const authData = req.auth(); // call it as a function
//     const userId = authData?.userId;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     req.authData = { userId }; // attach userId for downstream usage
//     next();
//   } catch (err) {
//     console.log("Protect middleware error:", err.message);
//     return res.status(401).json({ success: false, message: "Not authenticated" });
//   }
// };


// authMiddleware.js
// import { currentUser } from "@clerk/express"; // if using Clerk backend SDK
// import { requireAuth } from "@clerk/express";

// export const protect = requireAuth({
//   onError: (err, req, res, next) => {
//     console.error("Auth error:", err);
//     res.status(401).json({ success: false, message: "Authentication failed" });
//   },
// });


// middleware/authMiddleware.js
// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = req.auth();

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     req.user = {
//       _id: userId,          // so controllers can use req.user._id
//       email: req.auth.email || "", // optional if Clerk gives it
//       username: req.auth.username || "User",
//     };

//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     res.status(401).json({ success: false, message: "Authentication failed" });
//   }
// };

