import React from 'react';
import NotFoundImg from '../tempMedia/404NotFound.jpg';
function notfound() {
  return (
    <img
      src={NotFoundImg}
      alt="404 Not Found"
      style={{ width: '100%' }}
    />
  );
}

export default notfound;
