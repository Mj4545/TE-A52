import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight, Sparkles, Coffee, Moon } from 'lucide-react';

function App() {
  const [step, setStep] = useState(0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7eb9', '#ff758c', '#ffffff']
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      triggerConfetti();
    }
  };

  const stories = [
    {
      id: 0,
      icon: <Sparkles size={48} className="text-pink-400" />,
      title: "How it Started",
      text: "It all began with a simple swipe. When I matched with you, Sayali, I had no idea that a conversation would turn into something so special. Your smile in your photos was the first thing that caught my eye, but your personality is what kept me there.",
      bg: "from-pink-50 to-rose-100"
    },
    {
      id: 1,
      icon: <Coffee size={48} className="text-rose-500" />,
      title: "Our Dinner Date",
      text: "Then came the dinner. Seeing you in person was even better than I imagined. The laughter, the conversations, the way time seemed to fly... honestly, it felt perfect. I was so happy just being in your presence.",
      bg: "from-rose-50 to-orange-50"
    },
    {
      id: 2,
      icon: <Moon size={48} className="text-indigo-400" />,
      title: "The Unfortunate Turn",
      text: "But then, things took a turn due to circumstances completely out of our control. I saw how upset you became, and my heart sank. I hated seeing you distressed, and I hate even more that I couldn't fix it in that moment.",
      bg: "from-indigo-50 to-purple-50"
    },
    {
      id: 3,
      icon: <Heart size={48} className="text-red-500" />,
      title: "I Am Sorry",
      text: "Sayali, I am truly sorry for how the night ended. Please know that nothing that happened was a reflection of how much I enjoyed your company or how much I like you. You deserve a perfect evening, and I'm sad ours got interrupted.",
      bg: "from-red-50 to-pink-100"
    },
    {
      id: 4,
      icon: <Heart size={48} className="text-pink-600" />,
      title: "Can I Make It Up To You?",
      text: "I'd love the chance to wipe the slate clean and maybe try for that perfect ending another time. No pressure, just hoping you know how genuine my intentions are.",
      bg: "from-pink-100 to-white",
      isFinal: true
    }
  ];

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${stories[step].bg} transition-colors duration-1000 overflow-hidden relative`}>
      
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-20"
            initial={{ 
              y: Math.random() * window.innerHeight + 100, 
              x: Math.random() * window.innerWidth,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: -100,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Heart size={Math.random() * 30 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="z-10 w-full max-w-md p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/50"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {stories[step].icon}
              </motion.div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
              {stories[step].title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {stories[step].text}
            </p>

            {!stories[step].isFinal ? (
              <button
                onClick={handleNext}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-4">
                <a 
                  href="https://wa.me/?text=Hi%20Sayali,%20I%20saw%20your%20message%20and%20I%20forgive%20you!%20Let's%20talk." 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="block w-full py-4 text-center text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Yes, Let's Talk! 💕
                </a>
                <p className="text-xs text-gray-400 mt-2">
                  (This will open WhatsApp to message me)
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-8 flex justify-center space-x-2">
          {stories.map((s, idx) => (
            <div 
              key={s.id} 
              className={`h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
