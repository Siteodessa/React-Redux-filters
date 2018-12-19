import React from 'react';
import { connect } from 'react-redux';
import { Menu } from './Menu';

const Card = ({card}) => {
return (
  <div>
  <Menu />
  {card.task}
  </div>
)
}

// Catch error when a card is not found
const mapStateToProps =(state, ownProps) => {
  return {
    card: state.cards.find(card => Number(card.id) === Number(ownProps.match.params.id))
  }
};
export default connect(mapStateToProps)(Card)
