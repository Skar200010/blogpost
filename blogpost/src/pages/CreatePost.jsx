import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        tags: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log(token)

        try {
            const response = await axios.post(
                'http://localhost:3000/api/posts/create',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
                    },
                }
            );
            alert('Post created successfully!');
            navigate('/'); 
        } catch (error) {
            alert('Failed to create post');
        }
    };

    return (
        <Container>
            <h2>Create a New Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter post content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post tags (comma-separated)"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Post
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePost;
