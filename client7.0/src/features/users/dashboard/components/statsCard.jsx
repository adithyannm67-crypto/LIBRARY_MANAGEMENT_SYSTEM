import style from "./component.module.css";

export default function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <div className={style.statCard}>
      <div className={style.statHeader}>
        <div className={style.statIconBox}>
          <Icon className={style.statIcon} />
        </div>
        <span className={style.statLabel}>{label}</span>
      </div>

      <div className={style.statBody}>
        <div className={style.statValue}>{value}</div>

        <p className={style.statSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
