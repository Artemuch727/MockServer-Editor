import React from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as dataActions from '../../actions'

import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ListExampleChat from '../../components/list'
import FlatButton from 'material-ui/FlatButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './styles.css';

const styles = {
  customWidth: {
    width: 150,
  },
};

class Content extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'selected': {},
      isNew: false,
    }
  }

  componentDidMount(){
    const {selected} = this.props.application;
    if (selected){
      this.setState({selected: selected})
    }
  }

  componentWillReceiveProps(nextProps){
    const {selected} = nextProps.application;
    if (selected){
      this.setState({selected: selected})
    }
  }

  handleChangeSelect = (event, index, value) => this.setState({selected: {...this.state.selected, departmentId: value}});

  getLastItemIndex(type){
    const {data} = this.props.application
    const itemsCount = data[type].length;

    if (data[type][itemsCount - 1]){
      return data[type][itemsCount - 1].id;
    }

    return (-1);
  }

  handleClose = () => {
    this.setState({selected: {}});
    this.props.selectItemForEdit({});
  }

  handleSaveChanges = () => {
    if (this.state.selected.departmentId){
      if (this.getLastItemIndex('employees') >= this.state.selected.id){
        this.props.saveChanges('employees', this.state.selected);
      }else {
        this.props.addNewItem('employees', this.state.selected);
      }
    }else {
      if (this.getLastItemIndex('departments') >= this.state.selected.id){
        this.props.saveChanges('departments', this.state.selected);
      }else {
        this.props.addNewItem('departments', this.state.selected);
      }
    }
    this.handleClose();
  }

  handleCancelChanges = () => {
    this.handleClose();
  }

  renderContent(){
    const {selected} = this.state;

    return Object.keys(selected).map((key) => {
      if (key == 'departmentId'){
        return(
          <div className="content-item-select">
            <SelectField
              floatingLabelText="department"
              value={this.state.selected.departmentId}
              onChange={this.handleChangeSelect}
            >
            {
              this.props.application.data.departments.map((item) => {
                return(
                  <MenuItem value={item.id} primaryText={item.name} />
                )
              })
            }
            </SelectField>
          </div>
        )
      }
      return(
        <div className="content-item">
          <TextField
              id={key}
              value={selected[key]}
              floatingLabelText={key}
              disabled={key == 'id'}
              onChange={this.handleChange}
              fullWidth={key != 'id'}
          />
          <br />
        </div>
      )
    })
  }

  handleChange = (event) => {
    this.setState({selected: {...this.state.selected, [event.target.id]: event.target.value}})
  }

  render() {
    const {selected} = this.state;

    if (Object.keys(selected).length > 0){
      return(
        <div className='content'>
          {this.renderContent()}
          <div className='content-actions'>
            <FlatButton label="Save" primary={true} onClick={this.handleSaveChanges}/>
            <FlatButton label="Cancel" secondary={true} onClick={this.handleCancelChanges} />
          </div>
        </div>
      )
    }

    return null;
  }
}

const mapStateToProps = state => ({
    application: state.application
})

const mapDispatchToProps = (dispatch) => ({
  selectItemForEdit: bindActionCreators(
      dataActions.selectItemForEdit, dispatch
  ),
  addNewItem: bindActionCreators(
      dataActions.addNewItem, dispatch
  ),
  saveChanges: bindActionCreators(
      dataActions.saveChanges, dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);
