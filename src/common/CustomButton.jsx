import './custombutton.css';

export default function CustomButton({ name, color, onClick }) {
  return (
    <button className='cybr_btn' style={{ '--primary-hue': color }} onClick={onClick} >
      {name}
      <span aria-hidden>_</span>
      <span aria-hidden className='cybr_btn__glitch'>
        {name}
      </span>
      <span aria-hidden className='cybr_btn__tag'>
        R25
      </span>
    </button>
  );
}
