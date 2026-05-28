import styles from "./component.module.css";

export default function FooterSection({ title, links }) {
  return (
    <div className={styles.footerSection}>
      <h4 className={styles.footerHeading}>{title}</h4>
      <ul className={styles.footerList}>
        {links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
