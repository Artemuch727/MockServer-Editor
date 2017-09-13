import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon  />
  </IconButton>
);

export default class Item extends React.Component {
  handleEditClick = (event) => {
    const {item} = this.props;
    event.stopPropagation();
    this.props.onEditContent(item);
  }

  handleDeleteClick = (event) => {
    const {item} = this.props;
    event.stopPropagation();
    this.props.onDeleteContent(item);
  }


  getItemContent(){
    const {item, itemType} = this.props;

    if (itemType === 'departments'){
      return `${item.name}`
    }

    return `${item.firstName} ${item.lastName}`;
  }

  renderRightMenu(){
    return(
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>
      </IconMenu>
    )
  }

  render(){
    const {item} = this.props;

    return(
        <ListItem
          onClick={this.handleClick}
          primaryText={this.getItemContent()}
          rightIconButton={this.renderRightMenu()}
        />
    )
  }
}
