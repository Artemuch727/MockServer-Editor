import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Item from './item';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class ListExampleChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isCollapsed: true,
      deleteDialogOpen: false,
      itemForDelete: {},
      itemForAdd: {}
    }
  }

  handleOpen = () => {
    this.setState({deleteDialogOpen: true});
  };

  handleClose = () => {
    this.setState({deleteDialogOpen: false});
  };

  handleValidate = () => {
    this.props.actions.delete(this.props.label, this.state.itemForDelete.id);
    this.setState({itemForDelete: {}})
    this.setState({deleteDialogOpen: false});

  };

  renderDeleteDialog(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        onClick={this.handleValidate}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Delete item" onClick={this.handleOpen} />
        <Dialog
          title="Delete Dialog"
          actions={actions}
          modal={true}
          open={this.state.deleteDialogOpen}
        >
          <p> Are you sure? </p>
        </Dialog>
      </div>
    );
  }

  toggleListCollapsed = () => {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  editItemContent = (item) => {
    console.log(item);
    this.props.actions.select(item);
  }

  deleteItemContent = (item) => {
    console.log(item);
    this.setState({itemForDelete: item})
    this.handleOpen();
  }

  handleClickAdd = () => {
    let item = {};
    if (this.props.items && this.props.items.length > 0){
      item = Object.assign({}, this.props.items[this.props.items.length-1]);
      Object.keys(item).map((key)=> item[key] = '');
      item.id = this.props.items[this.props.items.length-1].id + 1;
    }else {
      switch (this.props.label) {
        case 'employees':
          item = {id: 1, firstName: '', lastName: '', departmentId: ''}
          break;
        case 'departments':
          item = {id: 1, name: ''}
          break;
        default:
          break;
      }
    }

    this.props.actions.select(item);
  }

  render(){
    return(
      <List>
        <RaisedButton
          label={this.props.label}
          fullWidth={true}
          onClick={this.toggleListCollapsed}
        />
        {
          this.props.items && !this.state.isCollapsed && this.props.items.map((item) => {
            return(
              <Item
                key={item.id}
                item={item}
                itemType={this.props.label}
                onEditContent={this.editItemContent}
                onDeleteContent={this.deleteItemContent}
              />
            )
          })
        }
        <ListItem
          onClick={this.handleClickAdd}
          primaryText="+ add item"
          style={{color: "#00b7e8"}}
        />
        {this.state.deleteDialogOpen && this.renderDeleteDialog()}
      </List>
    )
  }
}
