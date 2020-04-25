import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import {
  selectIsAdmin,
  selectIsManager,
  selectIsUser,
} from 'store/selectors/auth';

class Dashboard extends Component {
  componentDidMount() {
    const { 
      history,
      isAdmin,
      isManager,
      isUser,
    } = this.props;

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
  history: PropTypes.object,
};

Dashboard.defaultProps = {
  isAdmin: false,
  isManager: false,
  isUser: true,
  history: {},
};

const selectors = createStructuredSelector({
  isAdmin: selectIsAdmin,
  isManager: selectIsManager,
  isUser: selectIsUser,
});
const actions = {};

export default compose(
  withRouter,
  connect(
    selectors,
    actions,
  ),
)(Dashboard);

