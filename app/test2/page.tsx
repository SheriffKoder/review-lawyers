"use client"
import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import styles from "./CardFlip.module.css"; // Import custom styles

const page: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFocus = () => {
    setIsFlipped(true);
  };

  const handleBlur = () => {
    setIsFlipped(false);
  };

  return (
    <div className={styles.cardContainer}>
      {/* The card itself */}
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front side of the card */}
        <div className={styles.cardFront}>
          <p>Front of Card</p>
        </div>

        {/* Back side of the card */}
        <div className={styles.cardBack}>
          <p>CVC</p>
        </div>
      </div>

      {/* Stripe CardElement */}
            <input type="text"
                      onFocus={handleFocus}
                      onBlur={handleBlur}/>

    </div>
  );
};

export default page;
