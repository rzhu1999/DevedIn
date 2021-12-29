import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        company,
        location,
        status,
        skills,
        githubusername,
        bio,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <h1 className='large text-x-large'>
                <span>Create Your Profile</span>
            </h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Tell us about yourself
            </p>
            <p className='text-small'>* = required fields</p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <select
                        name='status'
                        value={status}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='0'>
                            * Select Your Current Professional Status
                        </option>
                        <option value='Developer'>Developer</option>
                        <option value='Student'>Student</option>
                        <option value='Intern'>Intern</option>
                        <option value='Recruiter'>Recruiter</option>
                    </select>
                    <p className='text-small'>
                        Tell us where you are in your career
                    </p>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Company / School'
                        name='company'
                        value={company}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        id=''
                        value={location}
                        onChange={(e) => onChange(e)}
                    />
                    <p className='text-small'>
                        City & State suggested (eg. Seattle, WA)
                    </p>
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Skills'
                        name='skills'
                        value={skills}
                        onChange={(e) => onChange(e)}
                    />
                    <p className='text-small'>
                        Please use comma separated values (eg. Java, Python,
                        HTML)
                    </p>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Github Username'
                        name='githubusername'
                        value={githubusername}
                        onChange={(e) => onChange(e)}
                    />
                    <p className='text-small'>
                        If you want your latest github repos in your profile
                    </p>
                </div>

                <div className='form-group'>
                    <textarea
                        type='text'
                        placeholder='Introduce Yourself'
                        name='bio'
                        value={bio}
                        onChange={(e) => onChange(e)}
                    />
                    <p className='text-small'>Add a short bio of yourself</p>
                </div>

                <div className='my-2'>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type='button'
                        className='btn btn-light'
                    >
                        Add Social Networks (Optional)
                    </button>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        {' '}
                        <div className='form-group social-input'>
                            <i className='fab fa-instagram fa-2x'></i>
                            <input
                                type='text'
                                placeholder='Instagram URL'
                                name='instagram'
                                value={instagram}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group social-input'>
                            <i className='fab fa-facebook fa-2x'></i>
                            <input
                                type='text'
                                placeholder='Facebook URL'
                                name='facebook'
                                value={facebook}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group social-input'>
                            <i className='fab fa-linkedin fa-2x'></i>
                            <input
                                type='text'
                                placeholder='LinkedIn URL'
                                name='linkedin'
                                value={linkedin}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group social-input'>
                            <i className='fab fa-youtube fa-2x' />{' '}
                            <input
                                type='text'
                                placeholder='YouTube URL'
                                name='youtube'
                                value={youtube}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}

                <input
                    type='submit'
                    className='btn btn-highlight my-1'
                    placeholder='Submit'
                />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
