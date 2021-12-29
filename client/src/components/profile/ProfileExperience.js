import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
    experience: { company, title, location, current, to, from, description },
}) => {
    return (
        <div>
            <h3 className='text text-light'>{company}</h3>
            <p>
                <Moment format='YYYY/MM'>{from}</Moment> -{' '}
                {!to ? ' Now' : <Moment format='YYYY/MM'>{to}</Moment>}
            </p>
            <h4 className='text text-primary-regular my-1-primary '>
                Position:{' '}
            </h4>{' '}
            {title}
            <h4 className='text text-primary-regular my-1-primary '>
                Description:{' '}
            </h4>{' '}
            {description}
        </div>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
