import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LapList = ({ laps }) => {
  return (
    <ul className="lap-list">
      <AnimatePresence>
        {laps.map((lap, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            Lap {index + 1}: {lap}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default LapList;
