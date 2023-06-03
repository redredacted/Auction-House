import { useMemo } from 'react';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const getSizeClasse = (size: string) => {
  switch (size) {
    case 'small':
      return 'px-2 py-1 text-sm';
    case 'medium':
      return 'px-4 py-2 text-base';
    case 'large':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
}

const getModeClasses = (primary: boolean) => {
  if (primary) {
    return 'text-white bg-pink-600 border-pink-600 dark:bg-pink-700 dark:border-pink-700';
  } else {
    return 'text-slate-700 bg-transparent border-slate-700 dark:text-white dark:border-white';
  }
}

const BASE_BUTTON_CLASSES = 'cursor-pointer rounded-full border-2 font-bold leading-none inline-block'

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const computedClasses = useMemo(() => {
    const sizeClasses = getSizeClasse(size);
    const modeClasses = getModeClasses(primary);

    return [modeClasses, sizeClasses].join(' ');
  }, [primary, size]);
  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};