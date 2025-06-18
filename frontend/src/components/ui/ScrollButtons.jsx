import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollButtons = ({containerRef}) => {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setAtTop(scrollTop === 0);
      setAtBottom(scrollTop + windowHeight >= docHeight-100 ); // 100px buffer
    };

    // Initial check
    handleScroll();

    // Event listeners
    // window.addEventListener('resize', checkScrollHeight);
    window.addEventListener('scroll', handleScroll);

    return () => {
      // window.removeEventListener('resize', checkScrollHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
      {/* Up Arrow */}
      <button
        onClick={scrollToTop}
        disabled={atTop}
        className={`p-1 w-10 h-10 rounded-full shadow-lg transition-all duration-300 flex justify-center items-center 
          ${ atTop ? 'bg-amber-900 cursor-not-allowed opacity-70' : 'bg-amber-950 hover:bg-amber-900 cursor-pointer' }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className='w-7 h-7 text-white'/>
      </button>

      {/* Down Arrow */}
      <button
        onClick={scrollToBottom}
        disabled={atBottom}
        className={`p-1 w-10 h-10 rounded-full shadow-lg transition-all duration-300  flex justify-center items-center ${
          atBottom ? 'bg-amber-900 cursor-not-allowed opacity-70' : 'bg-amber-950 hover:bg-amber-900 cursor-pointer'
        }`}
        aria-label="Scroll to bottom"
      >
       <ChevronDown className='w-7 h-7 text-white'/>
      </button>
    </div>
  );
};

export default ScrollButtons;