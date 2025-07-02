export const Theme = {
  background: 'linear-gradient(135deg,rgb(60, 0, 255),rgb(30, 0, 255))',
  glass: 'rgba(255, 255, 255, 0.05)',
  primary: '#007aff',
  secondary: '#ff375f',
  text: '#ffffff',
  border: 'rgba(255, 255, 255, 0.08)',
  highlight: 'rgba(255, 255, 255, 0.12)',
};

export const glassEffect = {
  background: Theme.glass,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${Theme.border}`,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', 
};

