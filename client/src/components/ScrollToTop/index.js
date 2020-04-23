import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

export class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

ScrollToTop.defaultProps = {
  location: {},
  children: null,
};

export default withRouter(ScrollToTop);