import style from "./page.module.css";
import { BookOpen, TrendingUp, Calendar } from "lucide-react";
import StatCard from "../components/StatCard/page";

export default function StatsSection({ borrowedBooks }) {
  return (
    <div className={style.statsGrid}>
      <StatCard
        icon={BookOpen}
        label="Currently Borrowed"
        value={borrowedBooks.length}
        subtitle="2 books due this week"
      />
      <StatCard
        icon={TrendingUp}
        label="Books Read This Year"
        value={12}
        subtitle="+3 from last month"
      />
      <StatCard
        icon={Calendar}
        label="Next Due Date"
        value="Apr 25"
        subtitle="The Midnight Library"
      />
    </div>
  );
}
