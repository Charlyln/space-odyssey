import './css/custombutton.css';

export default function CustomButton({ name, color, onClick, width, height, fontSize, disabled, alone, style }) {
  return (
    <button
      className='cybr_btn'
      style={{
        '--primary-hue': color,
        minWidth: `${width}px`,
        height: `${height}px`,
        lineHeight: `${height}px`,
        '--font-size': `${fontSize}px`,
        opacity: disabled ? 0.3 : 1,
        '--primary': disabled ? null : 'hsl(var(--primary-hue), 85%, calc(var(--primary-lightness, 50) * 1%))',
        ...style,
      }}
      onClick={onClick}
    >
      {name}
      <span aria-hidden>_</span>

      {!disabled && (
        <>
          <span aria-hidden className='cybr_btn__glitch'>
            {name}
          </span>

          {!alone && (
            <span aria-hidden className='cybr_btn__tag'>
              R25
            </span>
          )}
        </>
      )}
    </button>
  );
}
