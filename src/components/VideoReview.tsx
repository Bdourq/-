import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Minimize, Maximize, RefreshCw, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface VideoReviewProps {
  products: Product[];
  activeProductIndex: number;
  onSelectProduct: (index: number) => void;
}

export default function VideoReview({ products, activeProductIndex, onSelectProduct }: VideoReviewProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulatedViews, setSimulatedViews] = useState(1480);
  const [useHtmlVideo, setUseHtmlVideo] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeProduct = products[activeProductIndex];
  
  // Create a beautiful file slide deck using the high quality photos
  const gallery = activeProduct.images || [activeProduct.image];
  const activeSlideIndex = Math.min(Math.floor((progress / 100) * gallery.length), gallery.length - 1);
  const currentImage = gallery[activeSlideIndex] || activeProduct.image;

  // Increase views slowly to simulate live high-converting traffic activity!
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedViews((v) => v + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update progress bar to simulate video playback timeline (only if we're not using native video player)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !useHtmlVideo) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop slideshow
          }
          return prev + 1.2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, useHtmlVideo]);

  // Synchronize controls with native HTML5 element when available
  useEffect(() => {
    if (videoRef.current && useHtmlVideo) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // If auto-play blocked or source failed, fallback gracefully to our visual custom slide-deck
          setUseHtmlVideo(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, useHtmlVideo, activeProductIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="py-12 bg-[#FAF8F5] border-y border-natural-border font-serif" id="video-preview-section">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Strict Constraint Constraint Warning / Standard UX Title (No overlapping text rule) */}
        <div className="text-center mb-8">
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            🎥 استعراض حي بجودة فائقة 4K ULTRA HD
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark tracking-tight font-serif">
            شاهدي تفاصيل القماش والخياطة بالفيديو الطولي
          </h2>
          <p className="text-secondary-dark mt-2 text-sm md:text-base font-serif">
            تم تصوير الموديلات بأبعاد طولية (9:16) لتناسب شاشة موبايلكِ بوضوح تام، لرؤية دقيقة للخامة والتفاصيل قبل الطلب.
          </p>
        </div>

        {/* Dynamic Model Selector (No Text Overlap, Strictly Placed Outside) */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 font-serif">
          {products.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => {
                onSelectProduct(idx);
                setProgress(0);
                // Try playing video file first on manual changes!
                setUseHtmlVideo(true);
              }}
              className={`px-4 py-2 text-xs md:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 border cursor-pointer font-serif ${
                activeProductIndex === idx
                  ? 'bg-secondary text-white border-secondary shadow-md'
                  : 'bg-white text-[#2C2C24] border-natural-border hover:bg-[#FAF8F5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeProductIndex === idx ? 'bg-white animate-pulse' : 'bg-secondary'}`} />
              {prod.name.split(' - ')[0].split(' "')[0].replace('عباية "', 'عباية ')}
            </button>
          ))}
        </div>

        {/* Active Product Specs - STRICTLY Placement ABOVE the video to guide user */}
        <div className="bg-white rounded-t-2xl border-t border-x border-natural-border p-4 md:p-6 shadow-sm font-serif">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-secondary font-bold uppercase tracking-wider font-serif">
                الموديل المستعرض حالياً
              </span>
              <h3 className="text-lg md:text-xl font-bold text-text-dark mt-0.5 font-serif">
                {activeProduct.name}
              </h3>
              <p className="text-xs md:text-sm text-secondary-dark mt-1 font-serif">
                الخامة الأساسية: <strong className="text-text-dark font-semibold font-serif">{activeProduct.fabric}</strong>
              </p>
            </div>
            <div className="bg-natural-bg border border-natural-border rounded-xl px-4 py-2 shrink-0 text-center md:text-right font-serif">
              <span className="text-secondary-dark text-xs block font-serif">سعر العرض الخاص</span>
              <span className="text-xl md:text-2xl font-black text-secondary-dark text-[#5A5A40] font-sans">
                {activeProduct.price} <span className="text-sm font-serif font-normal">دنانير أردنية</span>
              </span>
              {activeProduct.originalPrice && (
                <span className="text-xs text-secondary-dark/60 line-through block mt-0.5 font-serif">
                  السعر الأصلي: {activeProduct.originalPrice} دينار
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 9:16 Vertical Video Player simulation with NO overlapping text */}
        <div className="relative aspect-[9/16] w-full max-w-[340px] mx-auto bg-black rounded-b-2xl md:rounded-2xl shadow-xl overflow-hidden border-2 border-text-dark flex flex-col justify-between">
          
          {/* Black Bars or Styled Simulation Video Container */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />
          
          {/* Active Product Visual Render inside the player container */}
          <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center">
            {useHtmlVideo && activeProduct.video ? (
              <video
                key={activeProduct.video}
                ref={videoRef}
                src={activeProduct.video}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                muted={isMuted}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  console.log("Failed to load video file; playing slideshow instead!");
                  setUseHtmlVideo(false);
                }}
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  if (el.duration) {
                    setProgress((el.currentTime / el.duration) * 100);
                  }
                }}
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct.id}-${activeSlideIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={currentImage}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle banner warning user of slideshow status */}
                  <div className="absolute top-16 left-0 right-0 bg-black/65 py-1 px-2 text-center text-[10px] text-gray-300">
                    استعراض صور تفصيلية للموديل بالتناوب
                  </div>

                  {/* Simulated Zoom-In Subtle Motion on the visual image, representing video focus flow */}
                  <span className="absolute inset-0 bg-transparent flex items-center justify-center">
                    {!isPlaying && (
                      <span className="bg-secondary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition duration-300 pointer-events-auto z-20">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </span>
                    )}
                  </span>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Top Status Overlays (NO text that labels the product on the video, purely professional stream layout UI) */}
          <div className="relative z-10 p-4 flex justify-between items-start w-full font-serif">
            <div className="flex items-center gap-2">
              <span className="w-2 md:w-2.5 h-2 md:w-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="bg-black/40 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded font-mono font-medium">LIVE</span>
              <span className="bg-black/40 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded font-mono font-medium">4K / HDR</span>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] text-white flex items-center gap-1 font-serif">
              <Eye className="w-3.5 h-3.5 text-secondary" />
              <span className="font-serif">{simulatedViews} صبيّة يشاهدن الآن</span>
            </div>
          </div>

          {/* Bottom Player Overlay Controls */}
          <div className="relative z-10 p-4 w-full mt-auto flex flex-col gap-3 font-serif">
            
            {/* Timeline Progress Slider */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="bg-secondary h-full rounded-full transition-all duration-100 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Interactive Buttons */}
            <div className="flex items-center justify-between text-white font-serif">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-secondary" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Loop simulated label */}
              <span className="text-[10px] bg-black/40 text-gray-200 px-2 py-1 rounded select-none flex items-center gap-1 font-mono">
                <RefreshCw className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
                0:1{Math.floor(progress/10)} / 0:15
              </span>
            </div>
          </div>
        </div>

        {/* STRICT DESIGN: Descriptive Specs STRICTLY Placement BELOW the video container to avoid overlap */}
        <div className="mt-4 bg-white border border-natural-border rounded-2xl p-5 md:p-6 shadow-sm font-serif">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-text-dark border-b border-natural-border pb-2 flex items-center gap-2 font-serif">
                <Sparkles className="w-4 h-4 text-secondary" />
                تفاصيل الإبداع ورونق التصميم من متجر لُقطة:
              </h4>
              <ul className="mt-3 space-y-2 text-xs md:text-sm text-secondary-dark">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>قصة مريحة وعملية تناسب الحركة السريعة للدوامات والزيارات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>مظهر منسدل راقٍ لا يتطلب كياً مستمراً (موفرة للوقت والجهد).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>ألوان عصرية فخمة مختارة بعناية لتناسب درجات لون البشرة العربية.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-text-dark border-b border-natural-border pb-2 flex items-center gap-2 font-serif">
                📏 دليل المقاسات للتأكيد المالي:
              </h4>
              <div className="mt-3 text-xs md:text-sm text-secondary-dark space-y-2">
                {activeProduct.hasMeasurements ? (
                  <div className="bg-[#FAF8F5] p-3 rounded-lg border border-natural-border/70">
                    <p className="font-bold text-[#5A5A40] mb-1 font-serif">تفصيل مخصص بالكامل!</p>
                    <p className="text-secondary-dark leading-relaxed font-serif">
                      هذا الموديل لا يخضع للمقاسات الجاهزة المحيرة. عبايتك تفصل خصيصاً لكِ بناءً على <strong>طولكِ ووزنكِ بالظبط</strong> لمنحكِ قواماً لائقاً يجمع بين الفخامة الجمالية والراحة التامة.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2 font-serif">المقاسات المتوفرة لهذا الموديل تترواح بين:</p>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes?.map((size) => (
                        <span key={size} className="bg-[#FAF8F5] text-text-dark font-bold px-2.5 py-1 rounded text-xs border border-natural-border font-serif">
                          {size}
                        </span>
                      ))}
                    </div>
                    <p className="text-secondary-dark text-[11px] mt-2 leading-relaxed font-serif">
                      * طقم المقاسات مصمم وفقاً للقياسات العربية القياسية، مصممة بدقة لتناسب القوام الطبيعي وتمنحه انسياباً جميلاً ومريحاً.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-natural-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-serif">
            <span className="text-xs text-secondary-dark flex items-center gap-1 font-serif">
              🔒 ضمان جودة تفصيل مميزة وتوصيل مجاني بالكامل شامل الشال.
            </span>
            <a
              href="#fast-order-form"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold text-sm px-6 py-3.5 rounded-xl transition duration-300 shadow-lg text-center transform hover:-translate-y-0.5 cursor-pointer font-serif"
            >
              اطلبي هذا الموديل فوراً ({activeProduct.price} JOD)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
