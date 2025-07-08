import { useRef } from 'react';
import type { FC, ButtonHTMLAttributes } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import { GestureType } from '../../constants/gestures';
import styles from './styles.module.scss';

interface ChoiceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gesture: GestureType;
  selected?: boolean;
  animate?: boolean;
  animationDelay?: number;
  shaking?: boolean;
}

/**
 * Button component for selecting rock, paper, or scissors
 */
const ChoiceButton: FC<ChoiceButtonProps> = ({
  gesture,
  selected = false,
  animate = false,
  animationDelay = 0,
  shaking = false,
  className = '',
  style,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getGestureIcon = () => {
    switch (gesture) {
      case GestureType.ROCK:
        return <FaHandRock aria-hidden="true" />;
      case GestureType.PAPER:
        return <FaHandPaper aria-hidden="true" />;
      case GestureType.SCISSORS:
        return <FaHandScissors aria-hidden="true" />;
    }
  };

  console.log('getGestureIcon()', getGestureIcon());

  const buttonClasses = [
    styles.choiceButton,
    styles[gesture],
    selected ? styles.selected : '',
    animate ? styles.entering : '',
    shaking ? styles.shaking : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonStyle = {
    ...style,
    animationDelay: animate && animationDelay > 0 ? `${animationDelay}ms` : undefined,
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={`Select ${gesture}`}
      className={buttonClasses}
      style={buttonStyle}
      data-testid={`choice-button-${gesture}`}
      {...props}
    >
      {getGestureIcon()}
    </button>
  );
};

export default ChoiceButton;
