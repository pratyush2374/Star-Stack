import styles from "../dashboard.module.css";

const ComponentName = () => {
    const logout = () => {
        window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <img
                        src="/star.png"
                        alt="Review"
                        className={styles.reviewImage}
                    />
                    <h1 className={styles.title}>StarStack</h1>
                </div>

                <button className={styles.logoutButton} onClick={logout}>
                    <span>Log out</span>
                    <svg 
                        className={styles.logoutIcon} 
                        viewBox="0 0 24 24" 
                        width="20" 
                        height="20"
                    >
                        <path 
                            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default ComponentName;