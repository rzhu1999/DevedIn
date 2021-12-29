import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        form: '',
        to: '',
        current: false,
        gpa: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, gpa } = formData;

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    return (
        <Fragment>
            <h1 class='large text-x-large'>
                <span>Add education</span>
            </h1>
            <p class='lead'>
                <i class='fas fa-briefcase'> </i>
                Add your prior / current schools
            </p>
            <p class='text-small'>* = required fields</p>
            <form
                class='form'
                onSubmit={(e) => {
                    e.preventDefault();
                    addEducation(formData, history);
                }}
            >
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* School'
                        name='school'
                        value={school}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* Degree'
                        name='degree'
                        value={degree}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='Field of study'
                        name='fieldofstudy'
                        value={fieldofstudy}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <div class='form-group'>
                    <h4 class='text-white'>Start Date</h4>
                    <input
                        type='month'
                        name='from'
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <div class='form-group'>
                    <h4 class='text-white'>End Date (Expected)</h4>

                    <input
                        type='month'
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
                        I am currently a student here
                    </p>
                </div>

                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='GPA'
                        name='gpa'
                        value={gpa}
                        onChange={(e) => onChange(e)}
                    />
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
