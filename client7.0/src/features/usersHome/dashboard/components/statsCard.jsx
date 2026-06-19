import style from "../../components/component.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppData } from "#root/providers/AppDataContext.jsx";

export default function StatCard({ icon: Icon, label, value, subtitle }) {
  const { loading } = useAppData();
  return (
    <div className={style.statCard}>
      <div className={style.statHeader}>
        <div
          className={style.statIconBox}
          style={{ backgroundColor: !loading && "var(--accent)" }}
        >
          {loading ? (
            <Skeleton style={{ position: "absolute", inset: 0 }} />
          ) : (
            <Icon className={style.statIcon} />
          )}
        </div>
        <span className={style.statLabel}>
          {loading ? <Skeleton /> : label}
        </span>
      </div>

      <div className={style.statBody}>
        <div className={style.statValue}>{loading ? <Skeleton /> : value}</div>

        <p className={style.statSubtitle}>
          {loading ? <Skeleton /> : subtitle}
        </p>
      </div>
    </div>
  );
}
