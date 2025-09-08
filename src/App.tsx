import React, { useState } from 'react';
import { Twitter, ArrowLeft } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'question' | 'success' | 'vote1' | 'wrong' | 'finish'>('question');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showVoteOptions, setShowVoteOptions] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const goBack = () => {
    if (currentView === 'success') {
      setCurrentView('question');
      setInputValue('');
      setErrorMessage('');
      setIsShaking(false);
    } else if (currentView === 'vote1') {
      setCurrentView('success');
      setShowVoteOptions(false);
      setRating(null);
      clearCanvas();
    } else if (currentView === 'wrong') {
      setCurrentView('success');
      setShowVoteOptions(false);
    } else if (currentView === 'finish') {
      setCurrentView('vote1');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '19') {
      setErrorMessage('');
      setCurrentView('success');
    } else {
      setErrorMessage('Wrong. Try again.');
      setIsShaking(true);
      setInputValue('');
      
      // Remove shake animation after it completes
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const clearCanvas = () => {
    if (canvasRef) {
      const ctx = canvasRef.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
      }
    }
  };

  const submitDrawing = () => {
    const randomRating = Math.floor(Math.random() * 11); // 0 to 10
    setRating(randomRating);
  };

  const resetGame = () => {
    setCurrentView('question');
    setInputValue('');
    setErrorMessage('');
    setIsShaking(false);
    setShowVoteOptions(false);
    setRating(null);
  };

  const handleVote = (option: number) => {
    if (option === 1) {
      setCurrentView('vote1');
    } else {
      setCurrentView('wrong');
    }
  };

  if (currentView === 'finish') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        {/* Navigation elements */}
        <button
          onClick={goBack}
          className="fixed top-6 left-6 z-50 p-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="fixed top-6 right-6 z-50">
          <a 
            href="https://x.com/thebootygamesol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Twitter size={24} />
          </a>
        </div>
        
        <div className="text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Thank you for playing.
          </h1>
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            You're a true booty master
          </h2>
        </div>
      </div>
    );
  }

  if (currentView === 'wrong') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        {/* Navigation elements */}
        <button
          onClick={goBack}
          className="fixed top-6 left-6 z-50 p-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="fixed top-6 right-6 z-50">
          <a 
            href="https://x.com/thebootygamesol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Twitter size={24} />
          </a>
        </div>
        
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">
            Wrong
          </h1>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'vote1') {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation elements */}
        <button
          onClick={goBack}
          className="fixed top-6 left-6 z-50 p-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="fixed top-6 right-6 z-50">
          <a 
            href="https://x.com/thebootygamesol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Twitter size={24} />
          </a>
        </div>
        
        <div className="min-h-screen bg-black flex flex-col items-center justify-center">
          <h2 className="text-white text-2xl font-bold mb-8">Draw your own booty</h2>
          <div className="border-2 border-white">
            <canvas
              ref={setCanvasRef}
              width={400}
              height={400}
              className="bg-black cursor-crosshair"
              onMouseDown={(e) => {
                setIsDrawing(true);
                const canvas = e.currentTarget;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  const rect = canvas.getBoundingClientRect();
                  ctx.beginPath();
                  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                }
              }}
              onMouseMove={(e) => {
                if (!isDrawing) return;
                const canvas = e.currentTarget;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  const rect = canvas.getBoundingClientRect();
                  ctx.strokeStyle = 'white';
                  ctx.lineWidth = 8;
                  ctx.lineCap = 'round';
                  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                  ctx.stroke();
                }
              }}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
            />
          </div>
          
          {rating !== null ? (
            <div className="mt-8 text-center">
              <h3 className="text-white text-xl font-bold mb-4">Rating: {rating}/10</h3>
              <button
                onClick={() => setCurrentView('finish')}
                className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Finish
              </button>
            </div>
          ) : (
            <div className="mt-8 flex space-x-4">
              <button
                onClick={clearCanvas}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300"
              >
                Erase
              </button>
              <button
                onClick={submitDrawing}
                className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        {/* Navigation elements */}
        <button
          onClick={goBack}
          className="fixed top-6 left-6 z-50 p-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="fixed top-6 right-6 z-50">
          <a 
            href="https://x.com/thebootygamesol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <Twitter size={24} />
          </a>
        </div>
        
        <div className="absolute top-64 left-1/2 transform -translate-x-1/2">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
            Which booty is the most fuckable?
          </h1>
        </div>
        <img src="/New Project (74).png" alt="" className="w-[680px] h-[680px] object-contain" />
        
        <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2">
          {!showVoteOptions ? (
            <button
              onClick={() => setShowVoteOptions(true)}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Vote
            </button>
          ) : (
            <div className="flex space-x-4 animate-fade-in">
              {[1, 2, 3, 4, 5].map((option) => (
                <button
                  key={option}
                  onClick={() => handleVote(option)}
                  className="w-12 h-12 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Navigation elements */}
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 p-2 text-white hover:text-gray-300 transition-colors duration-200 opacity-50 cursor-not-allowed"
        disabled
      >
        <ArrowLeft size={24} />
      </button>
      <div className="fixed top-6 right-6 z-50">
        <a 
          href="https://x.com/thebootygamesol" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-200"
        >
          <Twitter size={24} />
        </a>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>
      
      {/* 19 randomly positioned bootie images */}
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '12%', left: '8%', width: '75px', height: '75px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '22%', left: '88%', width: '80px', height: '80px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '6%', left: '72%', width: '70px', height: '70px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '38%', left: '3%', width: '85px', height: '85px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '68%', left: '12%', width: '75px', height: '75px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '82%', left: '85%', width: '80px', height: '80px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '58%', left: '92%', width: '70px', height: '70px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '15%', left: '42%', width: '75px', height: '75px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '88%', left: '28%', width: '85px', height: '85px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '48%', left: '6%', width: '70px', height: '70px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '28%', left: '68%', width: '80px', height: '80px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '78%', left: '65%', width: '75px', height: '75px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '8%', left: '25%', width: '80px', height: '80px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '92%', left: '58%', width: '70px', height: '70px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '42%', left: '95%', width: '75px', height: '75px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '62%', left: '38%', width: '85px', height: '85px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '32%', left: '18%', width: '70px', height: '70px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '52%', left: '15%', width: '80px', height: '80px'}} />
      <img src="/New Project (73).png" alt="" className="absolute animate-bootie-shake filter brightness-0 invert" style={{top: '18%', left: '82%', width: '75px', height: '75px'}} />
      
      <div className="text-center z-10 max-w-md mx-auto px-6">
        <div className={`transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">
            How many booties do you see?
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-6 py-4 text-lg text-center bg-white/10 border-2 border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Submit Answer
            </button>
          </form>
          
          {errorMessage && (
            <div className="mt-6 animate-fade-in">
              <p className="text-red-400 font-medium text-lg">{errorMessage}</p>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

export default App;