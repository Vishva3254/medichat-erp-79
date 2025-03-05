
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.3, 
  className = "" 
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps extends FadeInProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const SlideIn = ({ 
  children, 
  delay = 0, 
  duration = 0.3, 
  direction = 'up', 
  distance = 20,
  className = "" 
}: SlideInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up': 
      case 'down': return { y: 0 };
      case 'left':
      case 'right': return { x: 0 };
      default: return { y: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, ...getFinalPosition() }}
      exit={{ opacity: 0, ...getInitialPosition() }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerChildrenProps extends FadeInProps {
  staggerDelay?: number;
}

export const StaggerChildren = ({ 
  children, 
  delay = 0, 
  duration = 0.3, 
  staggerDelay = 0.1,
  className = "" 
}: StaggerChildrenProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  duration = 0.3,
  className = "" 
}: FadeInProps) => {
  return (
    <motion.div
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration } 
        },
        hidden: { 
          opacity: 0, 
          y: 10,
          transition: { duration } 
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
