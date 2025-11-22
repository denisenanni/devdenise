export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const getReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const createAnimationProps = (variant: { initial: Record<string, number | string>; animate: Record<string, number | string>; transition: Record<string, number | string> }, inView: boolean) => {
  const isReducedMotion = getReducedMotion();

  if (isReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: inView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration: 0.3 },
    };
  }

  return {
    initial: variant.initial,
    animate: inView ? variant.animate : variant.initial,
    transition: variant.transition,
  };
};
