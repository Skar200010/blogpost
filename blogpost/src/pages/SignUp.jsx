import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must not exceed 50 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Handle Form Submission
    const handleSignup = async (values, { setSubmitting, setErrors }) => {
        try {
            await axios.post('http://localhost:3000/api/auth/signup', values);
            alert('Signup successful! Please login.');
            navigate('/login');
        } catch (error) {
            setErrors({ email: 'Email already exists' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div
                className="card p-3"
                style={{
                    width: '30rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    margin: '0 auto',
                }}
            >
                <h2 className="text-center mb-4">Signup</h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing up...' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="text-center mt-3">
                    <small>
                        Already have an account? <a href="/login">Login</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Signup;
