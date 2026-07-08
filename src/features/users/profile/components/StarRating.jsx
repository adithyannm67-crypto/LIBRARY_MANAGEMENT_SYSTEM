import styles from "./component.module.css";
import { Star } from "lucide-react";

const StarRating=({ rating }) =>{
  return (
    <div className={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${styles.star} ${
            s <= rating ? styles.starFilled : styles.starMuted
          }`}
        />
      ))}
    </div>
  );
}

export default StarRating