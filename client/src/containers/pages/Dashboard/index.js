import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  selectIsAdmin,
  selectIsManager,
  selectIsUser,
  selectLoggedIn,
} from 'store/selectors/auth';

class Dashboard extends Component {
  componentDidMount() {
    const {
      history,
      isAdmin,
      isManager,
      isUser,
      loggedIn,
    } = this.props;

    if (loggedIn === false) {
      history.push('/login');
      return;
    }

    if (isAdmin || isUser) {
      history.push('/timezone');
    } else if (isManager) {
      history.push('/user');
    }
  }

  render() {
    return null;
  }
}

Dashboard.propTypes = {
  isAdmin: PropTypes.bool,
  isManager: PropTypes.bool,
  isUser: PropTypes.bool,
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
};

Dashboard.defaultProps = {
  isAdmin: false,
  isManager: false,
  isUser: true,
  loggedIn: false,
  history: null,
};

const selectors = createStructuredSelector({
  isAdmin: selectIsAdmin,
  isManager: selectIsManager,
  isUser: selectIsUser,
  loggedIn: selectLoggedIn,
});
const actions = {};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(Dashboard);

