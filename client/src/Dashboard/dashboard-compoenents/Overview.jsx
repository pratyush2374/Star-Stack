import styles from "../dashboard.module.css";

const Overview = ({ user, averageRating }) => {

    return (
        <div className={styles.parent}>
            <div className={styles.overall}>
                <div className={styles.profile}>
                    <img
                        src="profile.svg"
                        alt="Profile"
                        className={styles.profileImage}
                    />
                    <div className={styles.profileInner}>
                        <h1 className={styles.profileName}>{user.fullName}</h1>
                        <h2 className={styles.profileEmail}>{user.email}</h2>
                    </div>
                </div>

                <div className={styles.overAllStats}>
                    <img
                        src="star-symbol-icon.svg"
                        alt="Star"
                        className={styles.starIcon}
                    />
                    <div className={styles.overallInner}>
                        <h1 className={styles.statsTitle}>Overall Stats</h1>
                        <h2 className={styles.statsScore}>{averageRating}/5</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
