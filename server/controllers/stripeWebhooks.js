import Stripe from "stripe";
import Booking from "../models/Booking.js";

//API to handle stripe webhooks
export const stripeWebhooks = async (request, response) =>{
    //stripe gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if(event.type === 'payment_intent.succeeded'){
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting Session metadata
      const session = await stripeInstance.checkout.sessions.list({payment_intent: paymentIntentId,})

      const {bookingId} = session.data[0].metadata;

      //update booking status to paid
      await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod: "Stripe"})
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    response.json({received: true});
}



// import Stripe from "stripe";
// import Booking from "../models/Booking.js";

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//   const sig = request.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   //Listen for completed Checkout Sessions
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     const bookingId = session.metadata?.bookingId;
//     if (bookingId) {
//       await Booking.findByIdAndUpdate(bookingId, {
//         isPaid: true, // boolean
//         paymentMethod: "stripe",
//       });
//       console.log(`Booking ${bookingId} marked as paid`);
//     }
//   } else {
//     console.log(`Unhandled event type ${event.type}`);
//   }

//   response.json({ received: true });
// };


// import Stripe from "stripe";
// import Booking from "../models/Booking.js";

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//    console.log("✅ Stripe webhook received");  // add this
//   const sig = request.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("❌ Webhook signature verification failed:", err.message);
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   console.log("✅ Stripe event received:", event.type);

//   if (event.type === "checkout.session.succeeded") {
//     const session = event.data.object;
//     console.log("Session metadata:", session.metadata);

//     const bookingId = session.metadata?.bookingId;
//     if (bookingId) {
//       try {
//         await Booking.findByIdAndUpdate(bookingId, {
//           isPaid: true,
//           paymentMethod: "stripe",
//         });
//         console.log(`✅ Booking ${bookingId} marked as paid`);
//       } catch (dbErr) {
//         console.error("❌ Failed to update booking:", dbErr);
//       }
//     } else {
//       console.error("❌ No bookingId in session metadata");
//     }
//   } else {
//     console.log(`Unhandled event type ${event.type}`);
//   }

//   response.json({ received: true });
// };
