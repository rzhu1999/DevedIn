import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
    education: { school, degree, fieldofstudy, current, to, from, gpa },
}) => {
    return (
        <div>
            <h3 className='text text-light'>{school}</h3>
            <p>
                <Moment format='YYYY/MM'>{from}</Moment> -{' '}
                {!to ? ' Now' : <Moment format='YYYY/MM'>{to}</Moment>}
            </p>
            <h4 className='text text-primary-regular'>Degree: </h4> {degree}
            <h4 className='text text-primary-regular'>Field of Study: </h4>{' '}
            {fieldofstudy}
            <h4 className='text text-primary-regular'>GPA: </h4> {gpa}
        </div>
    );
};

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
};

export default ProfileEducation;
