import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white rounded-full text-black shadow-lg flex items-center justify-center transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;