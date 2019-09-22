import React from 'react';

function Marker(props) {
  const { iconName, iconColor } = props;
  return (
    <div>
      <i style={{ color: iconColor }} className={`fa fa-${iconName}`} />
    </div>
  );
}

export default Marker;
