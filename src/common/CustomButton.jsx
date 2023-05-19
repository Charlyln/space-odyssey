import './css/custombutton.css';

export default function CustomButton({
  name,
  color,
  onClick,
  width,
  height,
  fontSize,
  disabled,
  alone,
  style,
  primary,
  secondary,
  textColor,
}) {
  return (
    <button
      className='cybr_btn'
      style={{
        minWidth: `${width}px`,
        height: `${height}px`,
        lineHeight: `${height}px`,
        '--font-size': `${fontSize}px`,
        opacity: disabled ? 0.3 : 1,
        '--color': textColor,
        '--primary': primary,
        '--shadow-primary': secondary,
        ...style,
      }}
      onClick={onClick}
    >
      {name}
      <span aria-hidden>_</span>

      {!disabled && (
        <>
          <span aria-hidden className='cybr_btn__glitch' style={{ '--shadow-primary': secondary }}>
            {name}
          </span>

          {/* {!alone && (
            <span aria-hidden className='cybr_btn__tag'>
              R25
            </span>
          )} */}
        </>
      )}
    </button>
  );
}
