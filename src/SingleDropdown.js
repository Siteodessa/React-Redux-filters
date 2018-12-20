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
        <div className="dd-header" onClick={(ev) => this.props.toggleList(ev, this.props.filterTypes[this.props.field].options[0].key)}>
          <div className="dd-header-title">{this.props.filterTypes[this.props.field].headerTitle}</div>
          {this.props.filterTypes[this.props.field].listOpen
            ? <FontAwesome name="angle-up"/>
            : <FontAwesome name="angle-down"/>
          }
          <span className="gray_icon"><img alt="search" src={PlaceIcon} /></span>
        </div>
        {this.props.filterTypes[this.props.field].listOpen && <ul className="dd-list">
           {this.props.filterTypes[this.props.field].options.map((item) => (
             <li className="dd-list-item" key={item.title} onClick={() => this.props.selectedOption(item.id, item.key, item.value)}>
               {item.title} {item.selected && <FontAwesome name="check"/>}
             </li>
            ))}
        </ul>}
      </div>
    )
  }
}

export default SingleDropdown;
