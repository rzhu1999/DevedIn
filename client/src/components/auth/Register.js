import React, { Fragment, useState } from 'react';

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

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match'); // Change to alert later
        } else {
            console.log(formData);
        }
    };

    return (
        <Fragment>
            <h1 className='large text-x-large'>
                <span> Sign Up</span>
            </h1>
            <p className='lead'>
                <i className='fas fa-skiing'> Create Your Account</i>
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
                Already have an account? <a href='login.html'>Sign In</a>
            </p>
        </Fragment>
    );
};

export default Register;
