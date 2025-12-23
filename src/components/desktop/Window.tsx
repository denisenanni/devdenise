import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import WindowControls from './WindowControls';

interface WindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

function Window({ title, icon, children, className = '', id }: WindowProps) {
  const { currentDistro } = useTheme();
  const isLeftControls = currentDistro.windowStyle.controlsPosition === 'left';

  return (
    <motion.div
      id={id}
      role="region"
      aria-label={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden shadow-window ${className}`}
      style={{
        backgroundColor: 'var(--window-bg)',
        borderRadius: 'var(--window-radius)',
        border: '1px solid var(--window-border)',
      }}
    >
      {/* Window Header / Title Bar */}
      <div
        className="flex items-center px-4 select-none"
        style={{
          height: 'var(--window-header-height)',
          backgroundColor: 'var(--window-header)',
          borderBottom: '1px solid var(--window-border)',
        }}
      >
        {/* Controls on left side */}
        {isLeftControls && <WindowControls />}

        {/* Window Title */}
        <div
          className={`flex items-center gap-2 flex-1 ${
            isLeftControls ? 'justify-center' : 'justify-start'
          }`}
        >
          {icon && (
            <span className="w-4 h-4" style={{ color: 'var(--accent)' }}>
              {icon}
            </span>
          )}
          <span
            className="text-sm font-medium truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </span>
        </div>

        {/* Controls on right side */}
        {!isLeftControls && <WindowControls />}
      </div>

      {/* Window Content */}
      <div
        className="overflow-auto"
        style={{ color: 'var(--text-secondary)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default memo(Window);
