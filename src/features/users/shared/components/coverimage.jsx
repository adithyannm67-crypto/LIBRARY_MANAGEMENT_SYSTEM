import common from "../styles/common.styles.module.css";
import Image from "next/image";

const Cover = ({ coverurl, width, height, priority, title }) => {
  
  return (
    <div
      className={common.bookCover}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {coverurl ? (
        <Image
          src={coverurl}
          alt={`${title} cover`}
          height={height}
          width={width}
          priority={priority}
          className={common.coverImage}
        />
      ) : (
        <div style={{ width: `${width}px`, height: `${height}px` }}></div>
      )}
    </div>
  );
};

export default Cover;
