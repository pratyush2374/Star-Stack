import { useState } from 'react';
import styles from "../dashboard.module.css";

const Reviews = () => {
    // Sample review data - in real app, this would come from props or API
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "Pratyush Sharma",
            email: "kr.pratyushsharma2374@gmail.com",
            date: "2024-03-26 14:30",
            rating: 4,
            review: "Food is amazing and the service is also good",
            reply: "",
            isReplying: false,
            isEditing: false
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@example.com",
            date: "2024-03-25 15:45",
            rating: 5,
            review: "Exceptional experience! Will definitely come back",
            reply: "",
            isReplying: false,
            isEditing: false
        }
    ]);

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <span 
                key={index} 
                className={`${styles.star} ${index < rating ? styles.filled : ''}`}
            >
                ★
            </span>
        ));
    };

    const handleReply = (reviewId) => {
        setReviews(reviews.map(review => 
            review.id === reviewId 
                ? { ...review, isReplying: true }
                : review
        ));
    };

    const handleSendReply = (reviewId, replyText) => {
        setReviews(reviews.map(review => 
            review.id === reviewId 
                ? { ...review, reply: replyText, isReplying: false }
                : review
        ));
    };

    const handleEditReply = (reviewId) => {
        setReviews(reviews.map(review => 
            review.id === reviewId 
                ? { ...review, isEditing: true }
                : review
        ));
    };

    const handleUpdateReply = (reviewId, updatedReply) => {
        setReviews(reviews.map(review => 
            review.id === reviewId 
                ? { ...review, reply: updatedReply, isEditing: false }
                : review
        ));
    };

    const ReplySection = ({ review }) => {
        const [replyText, setReplyText] = useState(review.reply || '');

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
                            {review.isEditing ? 'Update' : 'Send'}
                        </button>
                    </div>
                ) : review.reply ? (
                    <div className={styles.replyContent}>
                        <p className={styles.replyText}>{review.reply}</p>
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
                {reviews.map(review => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewerInfo}>
                            <div className={styles.left}>
                                <img
                                    src="profile.svg"
                                    alt="Profile"
                                    className={styles.profileImage}
                                />
                                <div className={styles.details}>
                                    <h1 className={styles.reviewerName}>{review.name}</h1>
                                    <h2 className={styles.reviewerEmail}>{review.email}</h2>
                                    <h2 className={styles.reviewDate}>{review.date}</h2>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <h1 className={styles.rating}>{review.rating}/5</h1>
                                <div className={styles.stars}>
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.userReview}>
                            <h2 className={styles.reviewText}>{review.review}</h2>
                            {!review.reply && !review.isReplying && (
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