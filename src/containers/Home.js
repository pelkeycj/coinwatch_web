//  @flow
/**
 * Created by connor on 11/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { signout } from '../actions/session';
import Navigation from './Navigation';
import Banner from '../components/Banner';
import InfoSection from '../components/InfoSection';
import Images from '../static/Images';
import Strings from '../static/Strings';


const styles = StyleSheet.create({

});

type Props = {
  signout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
};

class Home extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.history.push('/watching');
    }
  }

  props: Props

  handleLogout() {
    this.props.signout(this.context.router);
  }

  render() {
    const { currentUser, isAuthenticated } = this.props;
    return (
      <div>
        <Navigation />
        <Banner />
        {/*}
        <InfoSection
          text={Strings.section_1_text}
          img={Images.stock_graph}
          text_first={true}
        />
        */}

      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { signout }
)(Home);
