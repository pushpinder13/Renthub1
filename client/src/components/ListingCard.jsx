// import { useState } from "react";
// import "../styles/ListingCard.scss";
// import {
//   ArrowForwardIos,
//   ArrowBackIosNew,
//   Favorite,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths,
//   city,
//   province,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//     );
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];

//   const isLiked = wishList?.find((item) => item?._id === listingId);

//   const patchWishList = async () => {
//     if (!user) {
//       alert("Please sign in to add properties to your wish list.");
//       return; 
//     }
//     if (user?._id !== creator._id) {
//       const response = await fetch(
//         `http://localhost:3001/users/${user?._id}/${listingId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       dispatch(setWishList(data.wishList));
//     }
//   };

//   return (
//     <div
//       className="listing-card"
//       onClick={() => {
//         navigate(`/properties/${listingId}`);
//       }}
//     >
//       <div className="slider-container">
//         <div
//           className="slider"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {listingPhotoPaths?.map((photo, index) => (
//             <div key={index} className="slide">
//               <img
//                 src={`http://localhost:3001/${photo?.replace("public", "")}`}
//                 alt={`photo ${index + 1}`}
//               />
//               <div
//                 className="prev-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToPrevSlide();
//                 }}
//               >
//                 <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//               </div>
//               <div
//                 className="next-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToNextSlide();
//                 }}
//               >
//                 <ArrowForwardIos sx={{ fontSize: "15px" }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3>
//         {city}, {province}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <button
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation();
//           patchWishList();
//         }}
//         disabled={!user}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ListingCard;

import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.some((item) => item?._id === listingId);

  // Navigate to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  // Navigate to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // Update wishlist
  const patchWishList = async () => {
    if (!user) {
      alert("Please sign in to add properties to your wish list.");
      return;
    }

    if (user?._id === creator._id) {
      alert("You cannot add your own property to your wish list.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update wishlist. Please try again later.");
      }

      const data = await response.json();
      dispatch(setWishList(data.wishList));

      if (isLiked) {
        alert("Property removed from your wish list.");
      } else {
        alert("Property added to your wish list.");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert(error.message);
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      {/* Image slider */}
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listing details */}
      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

      {/* Favorite button */}
      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
