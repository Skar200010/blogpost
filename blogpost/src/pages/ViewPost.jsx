import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                alert('Failed to fetch post');
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{post.subtitle}</Card.Subtitle>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text>
                        <strong>Tags:</strong> {post.tags.join(', ')}
                    </Card.Text>
                    <Button variant="primary" href={`/update-post/${id}`}>
                        Edit Post
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewPost;
