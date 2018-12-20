import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import PlaceIcon from './css/placeholder.svg';



class SingleDropdown extends React.Component {
  constructor(props){
    super(props);
    this.props = props
  }
  render() {
    return (
      <div className="dd-wrapper">
          <strong> {this.props.filterTypes[this.props.field].headerTitle}</strong>
        {<ul className="dd-list">
           {this.props.filterTypes[this.props.field].options.map((item) => (
             <li className="dd-list-item" key={item.title} onClick={() => this.props.selectedOption(item.id, item.key, item.value)}>
                <span className="selectsquare">{item.selected && <FontAwesome name="check"/>}</span>{item.title}
             </li>
            ))}
        </ul>}
      </div>
    )
  }
}

export default SingleDropdown;
