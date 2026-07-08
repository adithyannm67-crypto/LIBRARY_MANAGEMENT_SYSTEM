"use client";

import styles from "./component.module.css";

import { Edit3, MapPin, Calendar, Check } from "lucide-react";

import { useAuth } from "#root/context/AuthContext.jsx";


const ProfileHeader = () => {
    const { user } = useAuth();
  return (
    <div className={styles.profileHeader}>
      {/* Avatar */}
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <button className={styles.editButton}>
          <Edit3 className={styles.editIcon} />
        </button>
      </div>

      {/* Identity */}

      <div className={styles.identity}>
        <div className={styles.identityHeader}>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{user?.name}</h2>

            <div className={styles.userMeta}>
              <span className={styles.metaItem}>
                <MapPin className={styles.metaIcon} />
                {/* For a new user i shoul show a symbol to add location */}
                Westfield Public Library
              </span>

              <span className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                Member since{" "}
                {new Date(user?.created_at).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className={styles.cardInfo}>
              <span className={styles.cardBadge}>
                <Check className={styles.badgeIcon} />
                Card #WPL-004821
              </span>
            </div>
          </div>

          <button className={styles.editProfileBtn}>
            <Edit3 className={styles.editProfileIcon} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
