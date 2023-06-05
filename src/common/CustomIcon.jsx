import React from 'react';
import { getIcon } from '../utils/helpers/icons.helper';

export default function CustomIcon({ size, icon, style }) {
  return <img style={{ width: `${size}px`, height: `${size}px`, ...style }} src={getIcon(icon)} alt={icon} />;
}
