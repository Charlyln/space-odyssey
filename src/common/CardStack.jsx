import React from 'react';

export default function CardStack({ children }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{children}</div>;
}
