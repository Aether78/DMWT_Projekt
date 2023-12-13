import { useState, useEffect } from 'react';

export default function Home() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetch('/api/comments')
            .then((response) => response.json())
            .then((data) => setComments(data))
            .catch((error) => console.error('Error fetching comments:', error));
    }, []);

    const handleAddComment = async () => {
        try {
            await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            });
            setNewComment('');
            // Refresh comments after adding a new one
            const response = await fetch('/api/comments');
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.comment_text}</li>
                ))}
            </ul>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
}
