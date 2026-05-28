
import commonStyle from "#root/common.module.css";

export function Skeleton({ width, height ,children}) {
  return (
    <div
      className={commonStyle.skeleton}
      style={{ width: width, height: height }}
    >
      {children||null}
    </div>
  );
}
export function SkeletonText({ width, height }) {
  return (
    <div
      className={commonStyle.skeletonText}
      style={{ width: width, height: height }}
    ></div>
  );
}
export function SkeletonPhoto({ width, height }) {
  return (
    <div
      className={commonStyle.skeletonPhoto}
      style={{ width: width, height: height }}
    ></div>
  );
}
