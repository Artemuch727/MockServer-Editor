import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton';
import ListExampleChat from '../../components/list'

export default class SideBar extends React.Component {
  renderContent() {
    const {content} = this.props;

    return Object.keys(content).map((key) => {
      return(
        <div key={key} className="sidebar-content">
          <ListExampleChat
             label={key}
             isOpen={true}
             items={content[key]}
             actions={{
               'select': this.props.onItemSelect,
               'delete': this.props.onItemDelete
             }}
           />
           <Divider />
        </div>
      )
    })
}

render() {
    return (
      <div className="sidebar">
        {this.renderContent()}
      </div>
    );
  }
}
