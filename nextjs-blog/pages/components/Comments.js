// components/Comments.js

import { useState } from 'react';

const Comments = () => {
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async () => {
        try {
            if (newComment.trim() !== '') {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: 'User', comment: newComment }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Comment added:', data);
                    setNewComment('');
                } else {
                    throw new Error('Failed to add comment');
                }
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <div>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Add Comment</button>
            </div>
        </div>
    );
};

export default Comments;
