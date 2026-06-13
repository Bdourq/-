import { useState } from 'react';
import { 
  ShoppingBag, Check, Shield, Star, Award, Truck, Lock, Phone, MessageSquare, 
  ChevronRight, Sparkles, AlertTriangle, Eye, HelpCircle, Heart, ArrowUp, ArrowDown, Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsList, reviewsList, jordanGovernorates, lqLogoImg } from './data';
import VideoReview from './components/VideoReview';
import OrderForm from './components/OrderForm';
import AdminPanel from './components/AdminPanel';
import { Order } from './types';

export default function App() {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [recentOrderAlert, setRecentOrderAlert] = useState<Order | null>(null);
  const [selectedProdColorImages, setSelectedProdColorImages] = useState<Record<string, string>>({});
  const [selectedImages, setSelectedImages] = useState<Record<string, string>>({});

  const handleOrderCompleted = (order: Order) => {
    setRecentOrderAlert(order);
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setRecentOrderAlert(null);
    }, 6000);
  };

  const handleScrollToForm = (prodIndex: number) => {
    setSelectedProductIndex(prodIndex);
    const formElement = document.getElementById('fast-order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-natural-bg text-text-dark font-sans selection:bg-primary/20 selection:text-text-dark antialiased" dir="rtl">
      
      {/* Top Banner Offer */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary text-natural-bg py-2.5 px-4 text-center text-xs font-bold shadow-sm flex items-center justify-center gap-2 overflow-hidden">
        <span className="inline-flex h-2 w-2 rounded-full bg-natural-bg animate-ping shrink-0" />
        <span>عرض الموسم الحصري بالأردن: عبايات "لقطة كوليكشن" الملكية تفصيل مخصص شامل الشال والتوصيل مجاناً! 🌲</span>
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-natural-border z-40 shadow-sm transition-all animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2.5">
            <img 
              src={lqLogoImg} 
              alt="لقطة كوليكشن" 
              className="w-12 h-12 rounded-full object-cover shadow-md border border-natural-border shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-black text-primary tracking-tight flex items-center gap-1 leading-none">
                لُقطة كوليكشن
                <span className="text-secondary font-bold font-serif">.</span>
              </h1>
              <span className="text-[9px] md:text-[10px] text-secondary-dark block mt-0.5 font-mono tracking-widest">WWW.LOATAH.SHOP</span>
            </div>
          </div>

          {/* Quick Menu shortcuts */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-secondary-dark">
            <a href="#hero-section" className="hover:text-primary transition-colors">الرئيسية</a>
            <a href="#best-sellers" className="hover:text-primary transition-colors">الأكثر مبيعاً</a>
            <a href="#video-preview-section" className="hover:text-primary transition-colors">استعراض الفيديو الفائق</a>
            <a href="#why-us" className="hover:text-primary transition-colors">جودة الخامات</a>
            <a href="#reviews-section" className="hover:text-primary transition-colors bg-primary/5 text-primary-dark border border-primary/20 px-3 py-1 rounded-full text-xs">آراء الصبايا ⭐</a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdmin(true)}
              className="bg-natural-bg hover:bg-natural-border/35 text-text-dark border border-natural-border text-xs py-2 px-3 rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="hidden sm:inline">لوحة الإدارة</span>
            </button>
            <a
              href="#fast-order-form"
              className="bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 transition-all shadow-md shadow-primary/10"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>اطلبي الآن</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-natural-bg" id="hero-section">
        
        {/* Soft Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Copywriter content column - optimized for High Conversion */}
            <div className="lg:col-span-7 text-right space-y-6">
              
              <div className="inline-flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold text-primary-dark shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                أزياء أردنية وتركية تمزج بين الوقار الشرعي والراحة العملية
              </div>

              {/* Bold Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-dark leading-[1.25] tracking-tight">
                عبري عن وقاركِ وأناقتكِ الشرعية بأزياءٍ صُمِّمت لتُلائم يومكِ ونشاطكِ
              </h2>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg md:text-xl text-text-dark/95 leading-relaxed max-w-2xl font-serif">
                أرقى العبايات الملكية المنسوجة يدوياً لأجلكِ وبسعر استثنائي شامل الشال والشحن مجاناً لكافة محافظات الأردن. تخلصي من حيرة المقاسات الجاهزة واحصلي على مقاس مفصل خصيصاً لطولك ووزنك!
              </p>

              {/* Trust highlights items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <span className="bg-primary/10 text-primary-dark p-1.5 rounded-lg border border-primary/20 mt-1 shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-text-dark block text-xs md:text-sm font-bold">ضمان جودة الخياطة والخامات</strong>
                    <span className="text-secondary-dark text-[11px] md:text-xs">تفصيل دقيق وملائم لطلبك بأفضل الخامات الكورية الفاخرة</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="bg-secondary/15 text-secondary-dark p-1.5 rounded-lg border border-secondary/25 mt-1 shrink-0">
                    <Truck className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-text-dark block text-xs md:text-sm font-bold">توصيل شامل ومجاني بالكامل</strong>
                    <span className="text-secondary-dark text-[11px] md:text-xs">توصيل مجاني تماماً لباب بيتكِ ومرفق بشال ملكي هدية مع طلبية لقطة كولكشن!</span>
                  </div>
                </div>
              </div>

              {/* CTA and Action bar */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href="#best-sellers"
                  className="bg-secondary hover:bg-secondary-dark text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition duration-300 shadow-md text-center transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  تصفحي التشكيلة الجديدة اليوم
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </a>

                <a
                  href="#fast-order-form"
                  className="bg-primary hover:bg-primary-dark text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition duration-300 shadow-lg text-center transform hover:-translate-y-0.5 cursor-pointer shadow-primary/10"
                >
                  اطلبي تفصيلك الفوري فوراً
                </a>
              </div>

              <div className="text-xs text-secondary-dark flex items-center gap-1 pt-1 justify-center sm:justify-start">
                <span>توصيل آمن وسريع خلال 3 أيام عمل بالحد الأقصى</span>
                <span>•</span>
                <span>الدفع عند الاستلام نقداً أو كليك</span>
              </div>

            </div>

            {/* Model Preview Image with nice badge overlay */}
            <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
              <div className="relative w-full max-w-[340px] aspect-[3/4] bg-white rounded-3xl p-3 border border-natural-border shadow-2xl rotate-1 hover:rotate-0 transition duration-500">
                
                {/* Simulated Floating badge */}
                <div className="absolute top-6 -right-6 bg-primary text-white px-4 py-2 rounded-2xl shadow-lg z-20 font-bold rotate-6 text-xs text-center border-2 border-natural-border">
                  العرض الحصري!
                  <span className="block text-[10px] font-normal">عبايات بـ 18 دينار فقط 💸</span>
                </div>

                <div className="w-full h-full rounded-2xl overflow-hidden bg-white relative">
                  <img
                    src={productsList[0].image}
                    alt="لقطة كولكشن أزياء نسائية شرعية راقية أردنية"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white text-right">
                    <span className="text-xs font-bold tracking-widest text-[#8B735B]">سفيرة الأناقة الأردنية</span>
                    <strong className="block text-sm font-bold mt-0.5 font-serif">عباية كريب بلازما باللون الأخضر الزيتي الفاخر</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="bg-white py-6 border-y border-natural-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <span className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                <Shield className="w-5 h-5" />
              </span>
              <strong className="block text-xs md:text-sm text-text-dark pt-1.5 font-serif font-bold">ضمان رضا وثقة تامة</strong>
              <p className="text-secondary/80 text-[10px] md:text-xs">خياطة متقنة وخامات كريب كورية فاخرة تنال إعجابكِ من النظرة الأولى</p>
            </div>

            <div className="space-y-1 border-r border-natural-border pr-4">
              <span className="bg-secondary/10 text-secondary w-11 h-11 rounded-2xl flex items-center justify-center mx-auto border border-secondary/20">
                <Truck className="w-5 h-5" />
              </span>
              <strong className="block text-xs md:text-sm text-text-dark pt-1.5 font-serif font-bold">توصيل شامل ومجاني</strong>
              <p className="text-secondary/80 text-[10px] md:text-xs">توصيل مجاني ومباشر لباب بيتكِ شامل الشال في كافة محافظات المملكة</p>
            </div>

            <div className="space-y-1 border-r border-natural-border pr-4">
              <span className="bg-primary/15 text-primary-light w-11 h-11 rounded-2xl flex items-center justify-center mx-auto border border-primary/25">
                <Sparkles className="w-5 h-5" />
              </span>
              <strong className="block text-xs md:text-sm text-text-dark pt-1.5 font-serif font-bold">أقمشة غاية في الفخامة</strong>
              <p className="text-secondary/80 text-[10px] md:text-xs">انتقاء نخب أول من خامات الكريب بلازما الكوري فائق النعومة والوقار</p>
            </div>

            <div className="space-y-1 border-r border-natural-border pr-4">
              <span className="bg-secondary/15 text-secondary-dark w-11 h-11 rounded-2xl flex items-center justify-center mx-auto border border-secondary/30">
                <Award className="w-5 h-5" />
              </span>
              <strong className="block text-xs md:text-sm text-text-dark pt-1.5 font-serif font-bold">مقاومة للتكييف والتجعد</strong>
              <p className="text-secondary/80 text-[10px] md:text-xs">خياطة متينة ومريحة للغاية لتناسب الاستخدام اليومي المستمر</p>
            </div>

          </div>
        </div>
      </section>

      {/* Flagship Models Showcase Group (Best Sellers) */}
      <section className="py-16 max-w-6xl mx-auto px-4" id="best-sellers">
        
        {/* Core title */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block">
            التشكيلة الرسمية الجديدة لعام 2026
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-dark mt-4 leading-tight">
            التصاميم الأكثر طلباً وشعبية للأزياء النسائية الشرعية والعملية
          </h3>
          <p className="text-secondary-dark text-sm mt-3 leading-relaxed">
            استخرجنا من ملفات تفصيلنا أرقى القطع والخياطة التي حظيت بأعلى نسب رضا صبايا الأردن. اختاري موديلك المفضل وواجهتك لتعبئة الطلبية فوراً!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {productsList.map((prod, idx) => {
            const hasBulkAndOffers = !!prod.offerPrice;
            const currentImg = selectedImages[prod.id] || prod.image;
            
            return (
              <div 
                key={prod.id}
                className="group bg-white rounded-3xl border border-natural-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full"
              >
                
                {/* Product main images & headers */}
                <div className="relative aspect-[4/3] bg-natural-bg overflow-hidden shrink-0">
                  
                  {/* Category Indicator Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md text-text-dark text-[11px] font-bold py-1.5 px-3 rounded-full shadow-sm border border-natural-border flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                    <span>{prod.badgeText || (prod.origin === 'local' ? 'خياطة محلية مميزة 🇯🇴' : 'استيراد تركي فاخر 🇹🇷')}</span>
                  </div>

                  {/* Pricing dynamic badge on image */}
                  <div className="absolute bottom-4 left-4 z-20 bg-primary text-white py-1.5 px-4 rounded-full shadow-md font-bold text-xs md:text-sm">
                    {prod.price} JOD {prod.deliveryPrice === 0 ? 'شامل الشال والتوصيل مجاناً' : '+ التوصيل'}
                  </div>

                  {/* Quick video badge to scroll down */}
                  {prod.video && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProductIndex(idx);
                        const videoSection = document.getElementById('video-preview-section');
                        if (videoSection) {
                          videoSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="absolute top-4 left-4 z-20 bg-black/60 hover:bg-secondary text-white p-2 rounded-full shadow-md transition-all flex items-center gap-1 text-[10px] font-bold"
                      title="شاهد استعراض الفيديو حي"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                      <span>فيديو حي 🎥</span>
                    </button>
                  )}

                  {/* Media Thumbnail strip for easy access (Improve parking spaces and access) */}
                  {prod.images && prod.images.length > 0 && (
                    <div className="absolute bottom-4 right-4 left-4 z-20 flex gap-1.5 justify-end bg-black/40 backdrop-blur-sm p-1.5 rounded-xl opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 max-w-[85%] mx-auto overflow-x-auto no-scrollbar">
                      {prod.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImages(prev => ({ ...prev, [prod.id]: img }));
                          }}
                          className={`w-8 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                            currentImg === img
                              ? 'border-secondary scale-105 shadow-md'
                              : 'border-white/40 hover:border-white'
                          }`}
                        >
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}

                  <img
                    src={currentImg}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Descriptions */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary font-bold tracking-wide">
                        {prod.fabric}
                      </span>
                      {hasBulkAndOffers && (
                        <span className="bg-secondary/15 text-secondary border border-secondary/25 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          وفر الأوفر!
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-serif font-bold text-text-dark leading-tight">
                      {prod.name}
                    </h4>
                    
                    <p className="text-[#5A5A40] text-xs md:text-sm leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Highlights Bullet-points */}
                  <div className="bg-natural-bg rounded-2xl p-4 space-y-2 border border-natural-border">
                    <span className="text-[11px] font-bold text-secondary-dark block">امتيازات حزمة الشراء:</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-text-dark/90">
                      {prod.includes?.map((inc, i) => (
                        <span key={i} className="flex items-center gap-1 text-text-dark/95 truncate">
                          <Check className="w-3.5 h-3.5 text-primary-light shrink-0" />
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Color Palette Options */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#8B735B] block">التدرجات اللونية المتوفرة بالمتجر:</span>
                    <div className="flex flex-wrap gap-2">
                      {prod.colors.map((color) => (
                        <span 
                          key={color.name}
                          className="inline-flex items-center gap-1.5 bg-natural-bg text-text-dark text-xs px-2.5 py-1 rounded-full border border-natural-border font-medium"
                        >
                          <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: color.hex }} />
                          {color.name.split(' (')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Custom Action Buttons */}
                  <div className="pt-3 border-t border-natural-border space-y-2">
                    {prod.offerPrice && (
                      <p className="text-xs text-secondary font-semibold bg-[#8B735B]/10 p-2.5 rounded-xl text-center border border-[#8B735B]/20">
                        🎁 {prod.offerPrice.label}
                      </p>
                    )}
                    
                    <button
                      onClick={() => handleScrollToForm(idx)}
                      className="w-full bg-primary hover:bg-primary-dark hover:shadow-lg text-white font-bold text-sm py-3.5 px-4 rounded-full transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-primary/5"
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span>اطلبي هذا الموديل وميزاته</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* Model vertical video constraint section using dedicated VideoReview component */}
      <VideoReview 
        products={productsList} 
        activeProductIndex={selectedProductIndex}
        onSelectProduct={(index) => setSelectedProductIndex(index)}
      />

      {/* Persistence and Why choose us section */}
      <section className="py-16 bg-white border-b border-natural-border" id="why-us">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          
          <div className="max-w-2xl mx-auto">
            <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              سر خامات متجر لُقطة الفاخرة
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-dark mt-4">
              لماذا نعتبر متجر لُقطة الاختيار العملي والأكثر توفيراً بالأردن؟
            </h3>
            <p className="text-secondary-dark text-sm mt-3">
              نهتم في لقطة بأدق التفاصيل والوقار الشرعي لكي نمنح صبيات الأردن حشمة أنيقة وخامات أقمشة فاخرة تتحمل حركتها طوال فترات الدوام والمقاهي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            
            <div className="bg-white rounded-2xl p-5 border border-natural-border shadow-sm">
              <span className="bg-primary/10 text-primary w-10 h-10 rounded-xl flex items-center justify-center border border-primary/20 mb-3 font-mono font-bold">١</span>
              <h4 className="font-serif font-bold text-text-dark text-base">سهولة العناية والغسيل والكي</h4>
              <p className="text-xs text-secondary-dark mt-2 leading-relaxed">
                قماش "كريب بلازما الفاخر" الكوري لا يحتاج لكيّ مستمر، ومقاوم تماماً للتوبير والانكماش المتكرر ليوفر وقتكِ الثمين صباحاً للجامعة أو الدوام.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-primary/25 shadow-sm relative overflow-hidden group hover:border-primary/55 transition-colors">
              <div className="absolute top-0 left-0 bg-primary text-white text-[9px] px-2 py-0.5 rounded-br-lg font-bold font-sans">
                تفصيل محلي خاص 🇯🇴
              </div>
              <span className="bg-secondary/15 text-secondary w-10 h-10 rounded-xl flex items-center justify-center border border-secondary/25 mb-3 font-mono font-bold">٢</span>
              <h4 className="font-serif font-bold text-text-dark text-base">خياطة محلية مميزة بمشاغلنا في عمان</h4>
              <p className="text-xs text-secondary-dark mt-2 leading-relaxed font-serif">
                بخلاف الموديلين التركيتين (الموديل الأول والموديل الثاني) المستوردين والجاهزين، فإن عبايتنا الملكية بكسرات روحية تُفصّل يدوياً بالكامل في عمان وتصمم خصيصاً لتناسب مقاسك وحقك في طولك ووزنك بدقة متناهية لتكسبك فخامة تليق بوقارك.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-natural-border shadow-sm">
              <span className="bg-primary/10 text-primary-light w-10 h-10 rounded-xl flex items-center justify-center border border-primary/20 mb-3 font-mono font-bold">٣</span>
              <h4 className="font-serif font-bold text-text-dark text-base">توفير حقيقي لأعلى جودة تفصيل</h4>
              <p className="text-xs text-secondary-dark mt-2 leading-relaxed font-serif">
                بدلاً من دفع مبالغ خيالية في الأسواق الجاهزة، نحن نوفر لك أرقى خامات العبايات الملكية ونفصلها خصيصاً على طولكِ ووزنكِ بأسعار التكلفة المباشرة (18 دينار فقط).
              </p>
            </div>

          </div>

          <div className="bg-secondary/10 rounded-2xl border border-secondary/25 p-4 inline-flex items-center gap-2 text-xs md:text-sm text-secondary-dark leading-relaxed max-w-2xl">
            <AlertTriangle className="w-5 h-5 text-secondary shrink-0" />
            <span>
              <strong>تنبيه بشأن طاقة التفصيل:</strong> نظراً للطلب الكبير على تفصيل عبايات "لقطة كوليكشن" الملكية يدوياً، فإن قدرتنا الاستيعابية للمشاغل محدودة أسبوعياً. يرجى حجز لونكِ وقياسكِ الآن لتفادي التأخير!
            </span>
          </div>

        </div>
      </section>

      {/* Social Proof Reviews section */}
      <section className="py-16 max-w-6xl mx-auto px-4" id="reviews-section">
        
        <div className="text-center mb-10 max-w-xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            آراء زبوناتنا الموثقة عائلياً
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-dark mt-4">
            صبايا الأردن يشاركنَ بكل فخر تجربتهن مع لقطة
          </h3>
          <p className="text-secondary-dark text-xs md:text-sm mt-2">
            رضا زبوناتنا هو كنزنا الحقيقي، نقوم بجمع الآراء من تواصلنا المباشر والفيسبوك لتأكيد مستويات الثقة لعمليتكِ القادمة.
          </p>
        </div>

        {/* Reviews grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white rounded-2xl border border-natural-border p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-primary/45 transition-colors duration-300">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-serif">
                    {rev.author[0]}
                  </span>
                  <div>
                    <strong className="block text-xs text-text-dark font-serif">{rev.author}</strong>
                    <span className="text-[10px] text-secondary block">{rev.location}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-secondary">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[10px] text-secondary font-semibold mr-1">5.0</span>
                </div>

                <p className="text-xs text-[#5A5A40] leading-relaxed text-right font-serif">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-natural-border text-[10px] text-secondary flex justify-between items-center bg-natural-bg px-2.5 py-1.5 rounded-lg">
                <span className="truncate max-w-[120px] font-bold text-secondary-dark">{rev.productName.split(' ')[0]} ...</span>
                <span className="shrink-0">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic conversion alert popup that shows up from local storage simulations */}
        <div className="mt-8 text-center bg-secondary text-white rounded-full p-4 border border-natural-border shadow-md inline-flex items-center gap-2.5 max-w-xl mx-auto w-full justify-center">
          <Eye className="w-5 h-5 text-natural-bg shrink-0" />
          <span className="text-xs md:text-sm font-bold">
            تم طلب وتوصيل أكثر من <strong>٢,٤٥٠ قطعة</strong> لغاية اليوم في عمان والزرقاء وإربد والمحافظات!
          </span>
        </div>

      </section>



      {/* Main Order / Checkout Form area */}
      <section className="py-12 bg-natural-bg/55 border-t border-natural-border" id="fast-order-form-container">
        <div className="max-w-6xl mx-auto px-4">
          <OrderForm 
            products={productsList} 
            selectedProductIndex={selectedProductIndex}
            onOrderCompleted={handleOrderCompleted}
          />
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 max-w-3xl mx-auto px-4 space-y-8" id="faq-section">
        <div className="text-center">
          <HelpCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
          <h3 className="text-xl md:text-2xl font-serif font-bold text-text-dark">سُؤال وجواب - الأسئلة الشائعة من زبوناتنا</h3>
        </div>

        <div className="space-y-4 text-right">
          
          <div className="bg-white rounded-2xl border border-natural-border p-5 shadow-sm">
            <strong className="block text-xs md:text-sm text-text-dark font-serif font-bold border-b border-natural-border pb-2">هل التوصيل مجاني بالكامل وبأسرع وقت؟</strong>
            <p className="text-xs text-secondary-dark mt-2 leading-relaxed font-serif">
              <strong>نعم بكل تأكيد!</strong> تقديرًا لزبوناتنا الكريمات، فإن تكاليف شحن وتوصيل عبايات "لقطة كوليكشن" مجانية بالكامل لكافة أحياء ومحافظات المملكة الأردنية لتوفر عليكِ أي أعباء إضافية.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-natural-border p-5 shadow-sm">
            <strong className="block text-xs md:text-sm text-text-dark font-serif font-bold border-b border-natural-border pb-2">كيف أعرف مقاسي الصحيح لتفصيل عبايات لقطة كولكشن؟</strong>
            <p className="text-xs text-secondary-dark mt-2 leading-relaxed font-serif">
              كل ما عليكِ هو كتابة طولكِ بالسم ووزنكِ التقريبي كغم في خانة تخصيص الطلب. سيتولى أمهر الخياطين الأردنيين في لقطة تفصيل العباية لتكون منسدلة وذات طول مثالي لكِ تماماً لتوفر عليكِ حيرة القياس والتعديل اللاحق.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-natural-border p-5 shadow-sm">
            <strong className="block text-xs md:text-sm text-text-dark font-serif font-bold border-b border-natural-border pb-2">كم تستغرق عملية التوصيل الشاملة؟</strong>
            <p className="text-xs text-secondary-dark mt-2 leading-relaxed font-serif">
              صناعة وتفصيل العباية المخصصة يستغرق حوالي 3 أيام عمل بالكامل على أيدي الخياطين المحليين، ومن ثم يتم شحنها فوراً بمتوسط يومين ليصلكِ الطرد مجهزاً ومغلفاً بعناية بالغة.
            </p>
          </div>

        </div>
      </section>

      {/* Footer and final trigger CTA */}
      <footer className="bg-gray-950 text-gray-300 py-12 border-t border-rose-900/40 relative z-10 text-right">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <img 
                  src={lqLogoImg} 
                  alt="لقطة كوليكشن" 
                  className="w-10 h-10 rounded-full object-cover border border-rose-900/40 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <strong className="text-lg font-bold">لُقطة كوليكشن لبيع الأزياء</strong>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                العلامة التجارية الأردنية الفاخرة لتجهيز وتفصيل العبايات الشرعية والملكية الأنيقة بأرخص أسعار التكلفة الحقيقية وبأجود خامات الكريب بلازما الكورية.
              </p>
              
              <div className="text-xs font-mono text-gray-400 space-y-1.5">
                <p>📍 عمان - الأردن (شحن سريع لكافة المحافظات)</p>
                <p>✉️ الدعم الفني والمتابعة: info@loatah.shop</p>
                <p>📞 رقم الاتصال بالمتجر: +962 78 854 8943</p>
              </div>
            </div>

            {/* Column 2: Legal and customer trust policies */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm border-b border-gray-800 pb-2">ضمانات جودة لقطة:</h5>
              <ul className="text-xs text-gray-400 space-y-2.5">
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-rose-500" />
                  <span>تفصيل عبايات مخصص ودقيق حسب الطول والوزن خلال 3 أيام</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-rose-500" />
                  <span>شال ملكي فاخر متسق مجاناً يرافق كل عباية كهدية مميزة</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-rose-500" />
                  <span>تبديل المقاسات أو اللون في حال رغبتكِ مجاناً</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-rose-500" />
                  <span>المتابعة الراقية لطلبكِ وتوصيل مجاني يضمن هيبة الحشمة والوقار</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust badges as requested and links */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm border-b border-gray-800 pb-2">وسائل دفع موثوقة:</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-900 border border-gray-850 text-gray-300 text-[10px] px-3 py-2 rounded-xl font-bold">
                  💵 الدفع نقداً عند الاستلام (COD)
                </span>
                <span className="bg-gray-900 border border-gray-850 text-gray-300 text-[10px] px-3 py-2 rounded-xl font-bold">
                  🔗 خدمة كليك الأردنية (CliQ)
                </span>
              </div>

              <div className="pt-2 space-y-3">
                <span className="text-xs text-gray-400 block mb-1">تفضلي بمتابعتنا على شبكاتنا الاجتماعية:</span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/loqtahcollection?utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:from-pink-700 hover:to-amber-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-pink-950/45 transition-all justify-center sm:justify-start"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                    حسابنا الرسمي على انستجرام 📸
                  </a>
                  <a
                    href="https://facebook.com/loqtahcollection"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-blue-950/45 transition-all justify-center sm:justify-start"
                  >
                    <MessageSquare className="w-4 h-4" />
                    صفحتنا الرسمية على الفيسبوك 🔵
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Copy-wright container */}
          <div className="border-t border-gray-905 border-gray-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} لقطة كولكشن الأردن. جميع الحقوق محفوظة لعلامة <a href="http://www.loatah.shop" className="hover:text-rose-450 text-rose-500 font-bold underline">loatah.shop</a>.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAdmin(true)}
                className="hover:text-rose-500 transition-colors flex items-center gap-1 font-bold text-gray-400"
              >
                <Lock className="w-3.5 h-3.5" />
                الدخول لبوابة إدارة متجر لقطة
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Admin Panel overlay */}
      {showAdmin && (
        <AdminPanel 
          onClose={() => setShowAdmin(false)} 
        />
      )}

      {/* Floating alert notification for new live orders placed by users */}
      <AnimatePresence>
        {recentOrderAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 10 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-950 border-2 border-rose-500 p-4 rounded-2xl shadow-2xl text-white max-w-sm text-right flex gap-3 items-start"
          >
            <div className="bg-rose-605 bg-rose-600 text-white p-2 rounded-xl shrink-0 mt-0.5">
              <ShoppingBag className="w-5 h-5 animate-bounce" />
            </div>
            <div className="text-xs space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-400 text-[10px] tracking-wider uppercase">تم تأكيد طلب جديد الآن! 📣</span>
                <span className="font-mono text-[9px] text-gray-400">{recentOrderAlert.id}</span>
              </div>
              <strong className="block text-gray-100">{recentOrderAlert.customerName.split(' ')[0]} من {recentOrderAlert.governorate}</strong>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                قامت للتو بطلب <strong>{recentOrderAlert.productName.split(' "')[0].replace('عباية "', 'عباية ')}</strong> لـ {recentOrderAlert.quantity} قطع بقيمة {recentOrderAlert.totalPrice} د.أ!
              </p>
              <span className="text-[9px] text-emerald-400 block font-bold">تجهيز سريع قيد العمل ⚡</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
