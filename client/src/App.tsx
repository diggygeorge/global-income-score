import OutputPage from './pages/OutputPage';

import { ThemeProvider } from './styles/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <OutputPage />
    </ThemeProvider>
  );
}
