import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar'; 

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filterTag, setFilterTag] = useState('');
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            setFirstName(user.name);
        }

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts/all');
                console.log(response, "res");

                if (response && response.data) {
                    setPosts(response.data);  
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [navigate]); 

    const filteredPosts = filterTag ? posts.filter(post => post.tags.some(tag => tag.includes(filterTag))) : posts;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/posts/delete/${postId}`);
            if (response.status === 200) {
                setPosts(posts.filter(post => post._id !== postId));
                alert('Post deleted successfully');
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('Failed to delete post');
        }
    };

    return (
        <>
            <NavBar name={firstName} />

            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <h2>All Blog Posts</h2>
                    </Col>
                    <Col className="text-end">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Filter by tag"
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={() => setFilterTag('')}>
                                Clear
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col className="text-end">
                        <Link to="/create-post">
                            <Button variant="success">Create Post</Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col className="text-end">
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Col>
                </Row>

                <Row>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Col md={4} key={post._id} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{post.subtitle}</Card.Subtitle>
                                        <Card.Text>
                                            {post.content.substring(0, 100)}...
                                        </Card.Text>
                                        <Link to={`/post/${post._id}`}>
                                            <Button variant="primary" className="w-100">
                                                View Post
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="danger" 
                                            className="mt-3 w-100"
                                            onClick={() => handleDeletePost(post._id)}
                                        >
                                            Delete Post
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <div className="text-center">
                                <h5 className="text-muted">No posts found.</h5>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default Home;
