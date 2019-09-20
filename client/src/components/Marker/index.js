import React from 'react';

function Marker(props) {
  return (
    <div>
      <i className="fa fa-taxi" />
        {props.text}
    </div>
  );
}

export default Marker;
