// Animated Onboarding Tour UI using React + Framer Motion + Tailwind CSS

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: 'Welcome to the App!',
    description: 'Let us guide you through the main features with a quick tour.',
  },
  {
    id: 2,
    title: 'Explore the Navbar',
    description: 'Use the navigation bar to access different sections of the app.',
  },
  {
    id: 3,
    title: 'Customize in Settings',
    description: 'Adjust your preferences and profile information in Settings.',
  },
  {
    id: 4,
    title: 'You are All Set!',
    description: 'Enjoy exploring the app. You can always revisit this tour from Settings.',
  },
];

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const OnboardingStep = ({ step, onNext, onSkip, isLast }) => (
  <motion.div
    className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variants}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{step.title}</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
    <div className="flex justify-center gap-4">
      {!isLast && (
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 text-sm"
          onClick={onSkip}
        >
          Skip
        </button>
      )}
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        onClick={onNext}
      >
        {isLast ? 'Finish' : 'Next'}
      </button>
    </div>
  </motion.div>
);

const ProgressDots = ({ currentStep }) => (
  <div className="flex justify-center mt-4 space-x-2">
    {steps.map((_, index) => (
      <span
        key={index}
        className={`w-3 h-3 rounded-full ${
          index === currentStep
            ? 'bg-indigo-600'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      ></span>
    ))}
  </div>
);

const OnboardingTour = () => {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (current === steps.length - 1) {
      setCompleted(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handleSkip = () => setCompleted(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      {!completed ? (
        <>
          <AnimatePresence mode="wait">
            <OnboardingStep
              key={steps[current].id}
              step={steps[current]}
              onNext={handleNext}
              onSkip={handleSkip}
              isLast={current === steps.length - 1}
            />
          </AnimatePresence>
          <ProgressDots currentStep={current} />
        </>
      ) : (
        <motion.div
          className="text-center text-green-600 dark:text-green-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCheckCircle size={64} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Tour Completed!</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            You are now ready to explore the app.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OnboardingTour;
