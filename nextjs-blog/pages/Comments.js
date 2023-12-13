// components/Comments.js
import { useState, useEffect } from 'react';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetch('/api/comments')
            .then((response) => response.json())
            .then((data) => setComments(data));
    }, []);

    const handleCommentSubmit = () => {
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'User', comment: newComment }),
        })
            .then((response) => response.json())
            .then((data) => {
                setComments([...comments, data]);
                setNewComment('');
            });
    };

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.comment}</li>
                ))}
            </ul>
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
