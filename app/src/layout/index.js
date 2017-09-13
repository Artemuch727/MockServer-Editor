import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';

import SideBar from './sidebar';
import Content from './content';
import Header from './header';
import Footer from './footer';

import * as dataActions from '../actions'

const propTypes = {
    application: PropTypes.object.isRequired,
    fetchResources: PropTypes.func.isRequired,
    selectItemForEdit: PropTypes.func.isRequired
};

const defaultProps = {
    application: {},
    fetchResources: null,
    selectItemForEdit: null
};

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      editContent: false
    }
  }

  componentDidMount(){
    this.props.fetchResources();
  }

  renderContent(){
    const {selected} = this.props && this.props.application;

    if (selected){
      return (
        <Content />
      )
    }

    return null;
  }

  render(){


    return(
      <div>
        <Header />
        <div className="page-content">
          {
            this.renderContent()
          }
          <SideBar
            content={this.props.application.data}
            onItemSelect={this.props.selectItemForEdit}
            onItemDelete={this.props.deleteSelectedItem}
          />
        </div>
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = state => ({
  application: state.application
})

const mapDispatchToProps = (dispatch) => ({
  fetchResources: bindActionCreators(
      dataActions.fetchResources, dispatch
  ),
  selectItemForEdit: bindActionCreators(
      dataActions.selectItemForEdit, dispatch
  ),
  deleteSelectedItem: bindActionCreators(
      dataActions.deleteSelectedItem, dispatch
  ),
})

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
