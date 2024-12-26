import { useEffect, useState } from "react";
import styles from "../dashboard.module.css";
import axios from "axios";

const Reviews = ({ reviewData }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setReviews(reviewData);
    }, [reviewData]);

    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <span
                    key={index}
                    className={`${styles.star} ${
                        index < rating ? styles.filled : ""
                    }`}
                >
                    ★
                </span>
            ));
    };

    const handleReply = (reviewId) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === reviewId
                    ? { ...review, isReplying: true }
                    : review
            )
        );
    };

    const handleSendReply = async (reviewId, replyText) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === reviewId
                    ? { ...review, reply: replyText, response: replyText, isReplying: false }
                    : review
            )
        );

        try {
            const response = await axios.post(
                "http://localhost:3001/user/add-reply",
                {
                    reviewId,
                    reply: replyText,
                }
            );

            if (response.status === 200) {
                alert("Reply added successfully!");
            } else {
                alert("Failed to add reply");
            }
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const handleEditReply = (reviewId) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === reviewId ? { ...review, isEditing: true } : review
            )
        );
    };

    const handleUpdateReply = async (reviewId, updatedReply) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/user/add-reply",
                {
                    reviewId,
                    reply: updatedReply,
                }
            );

            if (response.status === 200) {
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review.id === reviewId
                            ? { 
                                ...review, 
                                reply: updatedReply, 
                                response: updatedReply, 
                                isEditing: false 
                              }
                            : review
                    )
                );
                alert("Reply edited successfully!");
            } else {
                alert("Failed to edit reply");
            }
        } catch (error) {
            console.error("Error updating reply:", error);
        }
    };

    const ReplySection = ({ review }) => {
        const [replyText, setReplyText] = useState(review.reply || review.response || "");
        const hasReply = review.reply || review.response;

        return (
            <div className={styles.replySection}>
                {review.isReplying || review.isEditing ? (
                    <div className={styles.replyInput}>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className={styles.textarea}
                        />
                        <button
                            className={styles.sendButton}
                            onClick={() => {
                                if (review.isEditing) {
                                    handleUpdateReply(review.id, replyText);
                                } else {
                                    handleSendReply(review.id, replyText);
                                }
                            }}
                        >
                            {review.isEditing ? "Update" : "Send"}
                        </button>
                    </div>
                ) : hasReply ? (
                    <div className={styles.replyContent}>
                        <p className={styles.replyText}>{hasReply}</p>
                        <button
                            className={styles.editButton}
                            onClick={() => handleEditReply(review.id)}
                        >
                            Edit Reply
                        </button>
                    </div>
                ) : null}
            </div>
        );
    };

    return (
        <div className={styles.reviewSection}>
            <h1 className={styles.sectionTitle}>Your Reviews</h1>
            <div className={styles.reviewsList}>
                {reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewerInfo}>
                            <div className={styles.left}>
                                <img
                                    src="profile.svg"
                                    alt="Profile"
                                    className={styles.profileImage}
                                />
                                <div className={styles.details}>
                                    <h1 className={styles.reviewerName}>
                                        {review.customerName}
                                    </h1>
                                    <h2 className={styles.reviewerEmail}>
                                        {review.customerEmail}
                                    </h2>
                                    <h2 className={styles.reviewDate}>
                                        {review.date}
                                    </h2>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <h1 className={styles.rating}>
                                    {review.rating}/5
                                </h1>
                                <div className={styles.stars}>
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.userReview}>
                            <h2 className={styles.reviewText}>
                                {review.content}
                            </h2>
                            {!review.reply && !review.response && !review.isReplying && (
                                <button
                                    className={styles.replyButton}
                                    onClick={() => handleReply(review.id)}
                                >
                                    Reply
                                </button>
                            )}
                        </div>
                        <ReplySection review={review} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;