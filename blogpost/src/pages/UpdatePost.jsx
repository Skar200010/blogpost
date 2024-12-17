import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const UpdatePost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        tags: '',
    });
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                setFormData(response.data);
            } catch (error) {
                alert('Failed to fetch post data');
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/posts/update/${id}`, formData);
            alert('Post updated successfully!');
            navigate('/'); 
        } catch (error) {
            alert('Failed to update post');
        }
    };

    return (
        <Container>
            <h2>Update Post</h2>
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
                    Update Post
                </Button>
            </Form>
        </Container>
    );
};

export default UpdatePost;
