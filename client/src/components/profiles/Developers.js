import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

import { getProfiles } from '../../actions/profile';

const Developers = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className='large text-x-large'> Developers </h1>
                    <p className='lead'>
                        <i className='fas fa-piggy-bank fa-2x'> </i> Browse and
                        connect with DevedIn's developers
                    </p>
                    <div className='profiles'>
                        {profiles.map((profile) =>
                            profile.user.name === 'Rui Zhu' ||
                            profile.user.name === 'Xinyu Hou' ? (
                                <ProfileItem
                                    key={profile.id}
                                    profile={profile}
                                />
                            ) : (
                                <h4> </h4>
                            )
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Developers.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
