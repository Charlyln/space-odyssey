import React from 'react';

export default function HeaderAction({ children }) {
  return <div style={{ position: 'absolute', right: '0', bottom: '0', padding: '15px', display: 'flex' }}>{children}</div>;
}
