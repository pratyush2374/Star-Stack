import React from "react";
import styles from "./signup.module.css";

const SignUp = () => {

  const googleLogin = () => {
    console.log("Google login");
  };
    return (
        <div className={styles.container}>
            <div className={styles.signupBox}>
                <div className={styles.leftSide}>
                    <img
                        src="/Review.png"
                        alt="Review"
                        className={styles.reviewImage}
                    />
                </div>

                <div className={styles.rightSide}>
                    <h1 className={styles.title}>StarStack</h1>
                    <p className={styles.description}>
                        Gather all your review data in one place for your
                        business and take the necessary actions to enhance your
                        growth and customer satisfaction. Start managing your
                        reviews effortlessly with us.
                    </p>

                    <div
                        className={styles.googleBtn}
                        onClick={googleLogin}
                    >
                        <div className={styles.googleIconWrapper}>
                            <img
                                className={styles.googleIcon}
                                src="/google.svg"
                                alt="Google logo"
                            />
                        </div>
                        <p className={styles.btnText}>Sign in with Google</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
