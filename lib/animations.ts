import type { Variants } from 'framer-motion';

export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 }
    },
};

export const slideInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    },
};

export const slideInLeftVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    },
};

export const slideInRightVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    },
};

export const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 }
    },
};

export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    },
};

export const pulseVariants: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
};

export const markerPulseVariants: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
        scale: [1, 1.3, 1],
        opacity: [0.8, 0.3, 0.8],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
};

export const drawerVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 200
        }
    },
};

export const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    },
};
