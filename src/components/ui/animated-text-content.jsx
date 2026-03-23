import { useState, useEffect } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';

export const AnimatedTextContent = ({ scrollProgress }) => {
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  const mainText = "Describe your website the way you naturally think about it — by speaking or typing. VOCODE's AI understands your intent, designs the structure, and generates a complete website experience automatically, without forcing you through manual setup or configuration screens.";
  
  const highlightText = "You shouldn't have to switch apps and context to take or consume notes. It should stay within the same workflow!";

  // Listen to scroll progress changes
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setCurrentScrollProgress(latest);
  });

  useEffect(() => {
    // Trigger animations immediately for testing
    const timer = setTimeout(() => {
      setTypingStarted(true);
      // Start highlight animation after typing completes
      const highlightTimer = setTimeout(() => {
        setShowHighlight(true);
      }, 3000);
      
      return () => clearTimeout(highlightTimer);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Also keep the scroll-based trigger
  useEffect(() => {
    if (currentScrollProgress > 0.2 && !typingStarted) {
      setTypingStarted(true);
      const timer = setTimeout(() => {
        setShowHighlight(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScrollProgress, typingStarted]);

  return (
    <div className="h-full w-full p-6 md:p-8 text-left overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">THE END OF CONTEXT SWITCHING</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">From thought to website — without breaking your flow</h2>
        <p className="text-gray-400 text-sm">VOCODE is built to protect that creative flow.</p>
      </div>

      {/* Animated Main Content */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <TypewriterText 
            text={mainText}
            isActive={typingStarted}
            className="text-gray-300 text-sm leading-relaxed"
          />
        </div>
        
        <div className="relative">
          <HighlightedText 
            text={highlightText}
            isActive={showHighlight}
            className="text-gray-300 text-sm leading-relaxed"
          />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          You stay focused on the idea. VOCODE handles everything else.
        </p>
      </div>

      {/* Key Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Highlights</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Create websites using voice or text, just like a conversation</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">AI interprets intent, structure, and visual hierarchy automatically</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Seamless, automatic progression from idea to finished website</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300 text-sm">Zero setup, zero configuration, zero context switching</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Typewriter effect component
const TypewriterText = ({ text, isActive, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setShowCursor(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 50); // Slower typing for better visibility

    return () => clearInterval(timer);
  }, [isActive, text]);

  return (
    <div className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          className="inline-block w-1 h-5 bg-white ml-1 align-text-top shadow-lg"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}
    </div>
  );
};

// Highlight effect component
const HighlightedText = ({ text, isActive, className }) => {
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowHighlight(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className={`${className} relative`}>
      <span className="relative z-10">{text}</span>
      {showHighlight && (
        <motion.div
          className="absolute inset-0 bg-blue-200/40 rounded"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};
