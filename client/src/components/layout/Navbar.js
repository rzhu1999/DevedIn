import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/posts'>
                    <i className='fas fa-rss-square' />{' '}
                    <span className='hide-sm'>Posts</span>
                </Link>{' '}
            </li>
            <li>
                <Link to='/developers'>
                    <i className='fas fa-dove' />{' '}
                    <span className='hide-sm'>Developers</span>
                </Link>{' '}
            </li>

            <li>
                <Link to='/profiles'>
                    <i className='fas fa-couch' />{' '}
                    <span className='hide-sm'>Community</span>
                </Link>{' '}
            </li>

            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>{' '}
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/developers'>
                    <i className='fas fa-dove' />{' '}
                    <span className='hide-sm'>Developers</span>
                </Link>{' '}
                <Link to='/profiles'>
                    <i className='fas fa-couch' />{' '}
                    <span className='hide-sm'>Community</span>
                </Link>{' '}
            </li>
            <li>
                <Link to='/register'>
                    {' '}
                    <i className='fas fa-user-plus'> </i> Register
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    {' '}
                    <i className='fas fa-key'> </i> Login
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-primary'>
            <h1>
                <Link to='/'>
                    <i className='fab fa-codepen'></i> DevedIn
                </Link>
            </h1>
            {!loading && (
                <Fragment>
                    {' '}
                    {isAuthenticated ? authLinks : guestLinks}{' '}
                </Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
