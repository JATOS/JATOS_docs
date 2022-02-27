import React from 'react';

export default function Hl({children}) {
    return (
      <span
        style={{
            backgroundColor: '#dbdbdb',
            borderRadius: '2px',
            padding: '0.2rem',
        }}>
        {children}
      </span>
    );
  }