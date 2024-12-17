import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import ViewPost from './pages/ViewPost';

const App = () => {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<UpdatePost />} />
                    <Route path="/post/:id" element={<ViewPost />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
