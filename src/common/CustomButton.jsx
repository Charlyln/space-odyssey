import { colors } from '../utils/constants';

const sizes = {
  small: {
    width: '70',
    height: '25',
    fontSize: '12',
  },
  medium: {
    width: '120',
    height: '40',
    fontSize: '15',
  },
  large: {
    width: '200',
    height: '50',
    fontSize: '20',
  },
};

export default function CustomButton({ label, color, onClick, size, disabled, style, textColor, opacity }) {
  return (
    <button
      disabled={disabled}
      className='cybr_btn'
      style={{
        minWidth: `${sizes[size].width}px`,
        height: `${sizes[size].height}px`,
        lineHeight: `${sizes[size].height}px`,
        '--font-size': `${sizes[size].fontSize}px`,
        opacity: opacity ? opacity : disabled ? 0.3 : 1,
        '--color': textColor || '#121212',
        '--primary': colors[color].primary,
        '--shadow-primary': colors[color].secondary,
        ...style,
      }}
      onClick={onClick}
    >
      {label}
      <span aria-hidden>_</span>

      {!disabled && (
        <>
          <span aria-hidden className='cybr_btn__glitch' style={{ '--shadow-primary': colors[color].secondary }}>
            {label}
          </span>
        </>
      )}
    </button>
  );
}
