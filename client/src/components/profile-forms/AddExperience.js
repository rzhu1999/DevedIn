import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        form: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } =
        formData;

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    return (
        <Fragment>
            <h1 class='large text-x-large'>
                <span>Add an experience</span>
            </h1>
            <p class='lead'>
                <i class='fas fa-briefcase'> </i>
                Add your prior / current positions
            </p>
            <p class='text-small'>* = required fields</p>
            <form
                class='form'
                onSubmit={(e) => {
                    e.preventDefault();
                    addExperience(formData, history);
                }}
            >
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* Job Title'
                        name='title'
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* Company'
                        name='company'
                        value={company}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={(e) => onChange(e)}
                    />
                    <p class='text-small'>
                        City & State suggested (eg. Seattle, WA)
                    </p>
                </div>

                <div class='form-group'>
                    <h4 class='text-small'>Start Date</h4>
                    <input
                        type='date'
                        name='from'
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <div class='form-group'>
                    <h4 class='text-small'>End Date</h4>

                    <input
                        type='date'
                        name='to'
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />

                    <p class='text-small'>
                        <input
                            type='checkbox'
                            name='current'
                            checked={current}
                            value={current}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    current: !current,
                                });
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        I currently work here
                    </p>
                </div>

                <div class='form-group'>
                    <textarea
                        name='description'
                        cols='30'
                        rows='5'
                        placeholder='Job Description'
                        value={description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>

                <input
                    type='submit'
                    class='btn btn-highlight my-1'
                    placeholder='Submit'
                />
                <a class='btn btn-light my-1' href='dashboard.html'>
                    Go Back
                </a>
            </form>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
