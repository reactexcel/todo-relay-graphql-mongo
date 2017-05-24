import React from 'react';
import PropTypes from 'prop-types';

export default class Todo extends React.Component {
  static propTypes = {
    //viewer: PropTypes.object.isRequired,
  };

  render() {
    console.log('--------arun11')
    console.log( this.props.viewer )
    return (
      <div>Todo Page</div>
    );
  }
}