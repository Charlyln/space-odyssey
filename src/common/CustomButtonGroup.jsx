import { colors } from '../utils/constants';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Typography } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme, customcolor }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: customcolor || '#44b700',
    top: '-2px',
    right: '-2px',
    color: customcolor || '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function CustomButtonGroup({ buttons, onChange, style, selected, value }) {
  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      onChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup style={style} size='small' value={value} exclusive onChange={handleChange}>
      {buttons.map((button) => (
        <ToggleButton
          key={button.label}
          value={button.value}
          variant='contained'
          style={{ background: button.selected && colors.blue.primary }}
        >
          <StyledBadge
            invisible={button.invisible}
            customcolor={button.customcolor}
            overlap='circular'
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            variant='dot'
          >
            <Typography component='span' variant='button' style={{ fontSize: '12px' }}>
              {button.label}
            </Typography>
          </StyledBadge>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
