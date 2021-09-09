import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// import axios from 'axios'; // Access backend

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match'); // Change to alert later
        } else {
            // const newUser = {
            //     name: name,
            //     email: email,
            //     password: password,
            // };

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     };

            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/user', body, config);
            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data);
            // }
            console.log('SUCCESS');
        }
    };

    return (
        <Fragment>
            <h1 className='large text-x-large'>
                <span> Sign Up</span>
            </h1>
            <p className='lead'>
                <i className='fas fa-skiing'> </i> Create Your Account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                    <small className='form-text'>
                        DevedIn uses Gravatar, so use a Gravatar email if you
                        want a profile image
                    </small>
                </div>

                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        minLength='6'
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        minLength='6'
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <input type='submit' value='Register' className='btn btn' />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

export default Register;
