import { useState, useEffect, FormEvent } from 'react';
import { Product, Order } from '../types';
import { jordanGovernorates } from '../data';
import { ShoppingBag, CheckCircle, Smartphone, MapPin, Scale, Ruler, Check, AlertCircle, ShoppingCart } from 'lucide-react';

interface OrderFormProps {
  products: Product[];
  selectedProductIndex: number;
  onOrderCompleted: (order: Order) => void;
}

export default function OrderForm({ products, selectedProductIndex, onOrderCompleted }: OrderFormProps) {
  const [activeProduct, setActiveProduct] = useState<Product>(products[selectedProductIndex]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [governorate, setGovernorate] = useState<string>('عمان');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Sync state if selectedProductIndex changes from outside parent
  useEffect(() => {
    const prod = products[selectedProductIndex];
    setActiveProduct(prod);
    setSelectedColor(prod.colors[0]?.name || '');
    if (prod.sizes && prod.sizes.length > 0) {
      setSelectedSize(prod.sizes[0]);
    } else {
      setSelectedSize('');
    }
    setQty(1);
    setIsSuccess(false);
  }, [selectedProductIndex, products]);

  // Handle local dynamic selection
  const handleProductChange = (prodId: string) => {
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      setActiveProduct(prod);
      setSelectedColor(prod.colors[0]?.name || '');
      if (prod.sizes && prod.sizes.length > 0) {
        setSelectedSize(prod.sizes[0]);
      } else {
        setSelectedSize('');
      }
      setQty(1);
    }
  };

  // Pricing calculations
  const calculatePricing = () => {
    let subtotal = activeProduct.price * qty;
    
    // Apply special bulk discount offers if any
    if (activeProduct.offerPrice && qty >= activeProduct.offerPrice.quantity) {
      const setsCount = Math.floor(qty / activeProduct.offerPrice.quantity);
      const remainingCount = qty % activeProduct.offerPrice.quantity;
      subtotal = (setsCount * activeProduct.offerPrice.price) + (remainingCount * activeProduct.price);
    }

    // Abaya has 0 shipping. Others have 3 JOD.
    const selectedGov = jordanGovernorates.find(g => g.name === governorate);
    const shippingCost = activeProduct.deliveryPrice === 0 ? 0 : (selectedGov?.shipping || 3);
    const total = subtotal + shippingCost;

    return { subtotal, shippingCost, total };
  };

  const { subtotal, shippingCost, total } = calculatePricing();

  const validateForm = () => {
    const errors: string[] = [];
    if (!fullName.trim() || fullName.trim().length < 3) {
      errors.push('الرجاء إدخال الاسم الثلاثي الكريم لتسهيل شحن الطلبية.');
    }
    
    // Jordanian phone validator (e.g. 079, 078, 077, 10 digits)
    const phoneRegex = /^(079|078|077|075|074|79|78|77)\d{7}$/;
    if (!phoneRegex.test(phone.trim().replace(/\s+/g, ''))) {
      errors.push('الرجاء إدخال رقم هاتف خلوي أردني صحيح يبدأ بـ 079 أو 078 أو 077 ويتكون من 10 أرقام.');
    }

    if (!selectedColor) {
      errors.push('الرجاء اختيار لون الموديل المفضل لديكِ.');
    }

    if (activeProduct.sizes && activeProduct.sizes.length > 0) {
      if (!selectedSize) {
        errors.push('الرجاء اختيار قياسكِ المناسب للموديل من القائمة.');
      }
    }

    if (activeProduct.hasMeasurements) {
      if (!height || isNaN(Number(height)) || Number(height) < 100 || Number(height) > 220) {
        errors.push('الرجاء تحديد الطول التقريبي بالسنتيمتر (مثال: 160) للتفصيل المتقن.');
      }
      if (!weight || isNaN(Number(weight)) || Number(weight) < 30 || Number(weight) > 180) {
        errors.push('الرجاء تحديد الوزن التقريبي بالكيلوجرام للتفصيل المتقن لجسم الموديل.');
      }
    }

    if (!address.trim() || address.trim().length < 5) {
      errors.push('الرجاء تحديد عنوان التسليم بالتفصيل (الحي، اسم الشارع، أو بالقرب من مَعلَم معروف).');
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  // Submit via local data engine
  const handleInstantSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrder: Order = {
      id: 'LQT-' + Math.floor(100000 + Math.random() * 900000),
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerAddress: address.trim(),
      governorate,
      productId: activeProduct.id,
      productName: activeProduct.name,
      color: selectedColor,
      size: selectedSize || undefined,
      height: activeProduct.hasMeasurements ? height : undefined,
      weight: activeProduct.hasMeasurements ? weight : undefined,
      quantity: qty,
      totalPrice: total,
      notes: notes.trim() || undefined,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const currentOrders: Order[] = JSON.parse(localStorage.getItem('loatah_orders') || '[]');
    currentOrders.unshift(newOrder);
    localStorage.setItem('loatah_orders', JSON.stringify(currentOrders));

    setPlacedOrder(newOrder);
    setIsSuccess(true);
    onOrderCompleted(newOrder);

    // Scroll to success screen top
    const formElement = document.getElementById('fast-order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp Order Submission (High Conversion for Jordanian E-Commerce)
  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build the Arabic Whatsapp Order Text Message
    const sizePart = activeProduct.sizes && activeProduct.sizes.length > 0
      ? `📐 القياس الأساسي: *${selectedSize}*` + (activeProduct.hasMeasurements ? `\n📏 تفصيل مخصص للوزن والطول:\n   • الطول: *${height} سم*\n   • الوزن: *${weight} كغم*` : '')
      : `📏 تفصيل خاص:\n   • الطول: *${height} سم*\n   • الوزن: *${weight} كغم*`;

    const text = `السلام عليكم ورحمة الله وبركاته، حابة أطلب من متجر لُقطة لواتاه كولكشن الموديل التالي:

🛍️ المنتج: *${activeProduct.name}*
🎨 اللون المختار: *${selectedColor}*
${sizePart}
📦 الكمية المطلوبة: *${qty} قطعة*

👤 اسم المستلمة: *${fullName}*
📞 رقم الهاتف: *${phone}*
📍 مدينة التسليم: *${governorate}*
🏡 العنوان السكني: *${address}*
📝 ملاحظات التوصيل: *${notes ? notes : 'لا يوجد'}*

💵 المجموع الإجمالي: *${total} دينار أردني* (شامل التوصيل والشال الدفع نقداً عند الاستلام).`;

    const encodedText = encodeURIComponent(text);
    // WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+962788548943&text=${encodedText}`;
    
    // Automatically perform the simulation of saving too!
    const simulateOrder: Order = {
      id: 'LQT-WA-' + Math.floor(100000 + Math.random() * 900000),
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerAddress: address.trim(),
      governorate,
      productId: activeProduct.id,
      productName: activeProduct.name,
      color: selectedColor,
      size: selectedSize || undefined,
      height: activeProduct.hasMeasurements ? height : undefined,
      weight: activeProduct.hasMeasurements ? weight : undefined,
      quantity: qty,
      totalPrice: total,
      notes: `طلب عبر الواتساب | ${notes.trim()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    const currentOrders: Order[] = JSON.parse(localStorage.getItem('loatah_orders') || '[]');
    currentOrders.unshift(simulateOrder);
    localStorage.setItem('loatah_orders', JSON.stringify(currentOrders));

    setPlacedOrder(simulateOrder);
    setIsSuccess(true);
    onOrderCompleted(simulateOrder);

    // Open whatsapp in new window safely
    window.open(whatsappUrl, '_blank');
  };

  if (isSuccess && placedOrder) {
    return (
      <div className="bg-white rounded-3xl border-2 border-secondary p-6 md:p-8 shadow-2xl text-center max-w-2xl mx-auto" id="fast-order-form">
        <div className="w-16 h-16 bg-natural-bg text-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-natural-border">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-text-dark">ألف مبروك! تم تسجيل طلبيتكِ بنجاح</h3>
        <p className="text-secondary-dark font-serif font-medium mt-1 text-sm md:text-base">تعتبر طلبيتكِ مؤكدة 100% وسنقوم بالتجهيز الفوري!</p>
        
        {/* Invoice Summary Box */}
        <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-natural-border text-right mt-6 space-y-3">
          <div className="flex justify-between border-b border-natural-border pb-2 text-xs text-secondary-dark font-serif">
            <span>رقم العملية الداخلي: <strong className="font-mono text-text-dark">{placedOrder.id}</strong></span>
            <span>تاريخ الطلب: {new Date(placedOrder.createdAt).toLocaleDateString('ar-JO')}</span>
          </div>
          
          <div className="text-sm font-serif">
            <span className="text-secondary-dark">المنتج المختار:</span>
            <p className="font-bold text-text-dark mt-0.5">{placedOrder.productName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-serif">
            <div>
              <span className="text-secondary-dark block">اللون والخيارات:</span>
              <strong className="text-text-dark">{placedOrder.color}</strong>
            </div>
            <div>
              {placedOrder.size ? (
                <>
                  <span className="text-secondary-dark block">القياس المختار:</span>
                  <strong className="text-text-dark">{placedOrder.size}</strong>
                </>
              ) : (
                <>
                  <span className="text-secondary-dark block">المقاس للتفصيل:</span>
                  <strong className="text-text-dark">الطول {placedOrder.height} سم | الوزن {placedOrder.weight} كغم</strong>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-natural-border pt-3 text-sm space-y-1 bg-white/60 p-3 rounded-lg font-serif">
            <div className="flex justify-between">
              <span className="text-secondary-dark">اسم المستلمة:</span>
              <strong className="text-text-dark">{placedOrder.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-dark">رقم التواصل الخلوي:</span>
              <strong className="text-text-dark font-mono">{placedOrder.customerPhone}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-dark">المدينة والتسليم السكني:</span>
              <strong className="text-text-dark">{placedOrder.governorate} - {placedOrder.customerAddress}</strong>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-natural-border pt-3 text-base font-serif">
            <span className="font-bold text-text-dark">الحساب الإجمالي للطلبية:</span>
            <strong className="text-xl font-black text-[#5A5A40] font-mono">
              {placedOrder.totalPrice} دينار أردني فقط
            </strong>
          </div>
          <p className="text-[11px] text-secondary-dark text-center leading-relaxed font-serif">
            * شاملاً التخفيضات ومصاريف الشحن والشال الأسود المتناسق الفاخر. تتهني فيها يارب! ❤️
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center font-serif">
          <button 
            onClick={() => setIsSuccess(false)}
            className="bg-natural-bg hover:bg-natural-border text-secondary-dark px-6 py-3 rounded-xl text-sm font-bold transition-all border border-natural-border"
          >
            طلب قطعة أخرى / موديل جديد
          </button>
          
          <a
            href={`https://api.whatsapp.com/send?phone=+962788548943&text=${encodeURIComponent('مرحباً فريق لقطة، قمت بتسجيل طلب برقم ' + placedOrder.id + ' على موقعكم وأود متابعته وحجز اللون الممتاز.')}`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            واتساب لقطة السريع لطلب الشحن 🟢
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] rounded-3xl border border-natural-border shadow-xl overflow-hidden max-w-4xl mx-auto" id="fast-order-form">
      <div className="bg-secondary py-6 px-6 text-white text-center">
        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-90 animate-bounce" />
        <h3 className="text-xl md:text-2xl font-serif font-bold">بوابة الطلب السريع والدفع الآمن عند الاستلام</h3>
        <p className="text-white/80 text-xs md:text-sm mt-1 font-serif">
          نحيطكِ علماً بأن حجز الموديلات والقطع يتم بالترتيب الزمني لإرسال البيانات نظراً لمحدودية الخامات التركية.
        </p>
      </div>

      <form className="p-6 md:p-8 space-y-6">
        
        {errorMessages.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-right font-serif">
            <span className="text-red-700 font-bold text-sm flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              تنبيه: يرجى استكمال البيانات التالية لإتمام الطلب:
            </span>
            <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
              {errorMessages.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Product Customization details */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-text-dark border-b border-natural-border pb-2 text-sm md:text-base flex items-center gap-2">
              <span className="bg-[#FAF8F5] text-secondary border border-natural-border w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-extrabold">١</span>
              تخصيص الموديل واللون والقياس
            </h4>

            {/* Select Product Dropdown */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1.5 font-serif">اختر الموديل المطلوب تفصيله/تسليمه:</label>
              <select
                value={activeProduct.id}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full bg-[#FAF8F5]/80 border border-natural-border rounded-xl px-3.5 py-2.5 text-sm font-serif font-medium text-text-dark focus:ring-secondary focus:border-secondary transition-all"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price} دنانير أردنية)
                  </option>
                ))}
              </select>
            </div>

            {/* Select Color Swatches */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-2 font-serif">اختر تدرج اللون المفضل لديكِ:</label>
              <div className="grid grid-cols-2 gap-2 font-serif">
                {activeProduct.colors.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-right font-medium transition-all ${
                      selectedColor === col.name
                        ? 'border-secondary bg-secondary text-white shadow-md font-bold'
                        : 'border-natural-border bg-white text-text-dark hover:bg-natural-bg/50'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0" 
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="truncate">{col.name}</span>
                    {selectedColor === col.name && <Check className="w-3.5 h-3.5 text-white mr-auto shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Sizing System: Weight/Height AND/OR Std sizes */}
            {activeProduct.sizes && activeProduct.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-text-dark font-serif">
                  {activeProduct.id === 'laqta-model-abaya' ? 'اختر طول العباية الأردنية المفضل لديكِ (بالإنش):' : 'اختر القياس المناسب لكِِ:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2.5 text-xs rounded-xl border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-secondary bg-secondary text-white shadow-sm font-serif font-extrabold'
                          : 'border-natural-border bg-white text-text-dark hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {activeProduct.id === 'laqta-model-abaya' && (
                  <p className="text-[10px] text-secondary-dark leading-relaxed font-serif">
                    * قياسات العبايات الملكية تعتمد على الطول الكلي من الكتف للقدم بالإنش (مثال: طول 52، 54، 56، 58، 60 يناسب الأطوال المعتادة).
                  </p>
                )}
              </div>
            )}

            {activeProduct.hasMeasurements && (
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-natural-border space-y-3.5">
                <span className="text-[11px] font-serif font-bold text-secondary block">📐 نظام التفصيل المخصص لطولك ووزنك بدقة لتفصيل مثالي:</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-secondary-dark mb-1 font-serif">الطول التقريبي (بـ سم):</label>
                    <div className="relative">
                      <Ruler className="absolute right-3 top-3 w-4 h-4 text-secondary" />
                      <input
                        type="text"
                        placeholder="165"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-white border border-natural-border rounded-xl pr-9 pl-3 py-2 text-xs font-mono text-center text-text-dark focus:ring-secondary focus:border-secondary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary-dark mb-1 font-serif">الوزن التقريبي (بـ كغم):</label>
                    <div className="relative">
                      <Scale className="absolute right-3 top-3 w-4 h-4 text-secondary" />
                      <input
                        type="text"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-white border border-natural-border rounded-xl pr-9 pl-3 py-2 text-xs font-mono text-center text-text-dark focus:ring-secondary focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-secondary-dark/90 leading-relaxed font-serif">
                  * سيقوم طاقم التفصيل والتطريز وتصميم الباترونات في لقطة كوليكشن بتعديل القصة لتناسب وزنك وطولك، مما يمنع الحاجة للتعديل بعد الاستلام.
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1.5 font-serif font-serif">الكمية المطلوبة:</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 bg-natural-bg hover:bg-natural-border font-bold text-lg rounded-lg text-secondary-dark flex items-center justify-center select-none border border-natural-border animate-none"
                >
                  -
                </button>
                <span className="font-mono text-base font-black w-8 text-center text-text-dark">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 bg-natural-bg hover:bg-natural-border font-bold text-lg rounded-lg text-secondary-dark flex items-center justify-center select-none border border-natural-border animate-none"
                >
                  +
                </button>

                {activeProduct.offerPrice && (
                  <span className="text-[10px] bg-[#D4C5B9]/15 text-[#5A5A40] border border-natural-border px-2.5 py-1.5 rounded-lg font-bold font-serif font-serif">
                    💡 {activeProduct.offerPrice.label}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Section 2: Delivery & Contact details */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-text-dark border-b border-natural-border pb-2 text-sm md:text-base flex items-center gap-2">
              <span className="bg-[#FAF8F5] text-secondary border border-natural-border w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-extrabold animate-none">٢</span>
              معلومات الاتصال والشحن للتسليم
            </h4>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1 font-serif">الاسم الكامل للمستلمة بالثلاثي:</label>
              <input
                type="text"
                placeholder="مثال: رنا جمال العبادي"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-natural-border rounded-xl px-3.5 py-2.5 text-sm text-text-dark focus:ring-secondary focus:border-secondary transition-all font-medium font-serif"
              />
            </div>

            {/* Phone number */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1 font-serif">رقم الهاتف الخلوي والواتساب (أردني):</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 w-4.5 h-4.5 text-secondary" />
                <input
                  type="tel"
                  placeholder="079XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-natural-border rounded-xl px-3.5 pl-10 py-2.5 text-sm text-text-dark font-mono text-left focus:ring-secondary focus:border-secondary transition-all"
                />
              </div>
              <p className="text-[10px] text-secondary-dark mt-1 font-serif">
                * سنرسل لكِ رسالة واتساب تلقائية لتأكيد حجز اللون الممتاز وميعاد خروج المندوب.
              </p>
            </div>

            {/* Governorate selection */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1 font-serif">المحافظة (التوصيل متاح لكافة المحافظات):</label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full bg-white border border-natural-border rounded-xl px-3.5 py-2.5 text-sm font-serif font-medium text-text-dark focus:ring-secondary focus:border-secondary transition-all"
              >
                {jordanGovernorates.map((gov) => (
                  <option key={gov.name} value={gov.name}>
                    {gov.arabName} {activeProduct.deliveryPrice === 0 ? '(توصيل مجاني 0 د.أ)' : `(+${gov.shipping} د.أ توصيل)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Detailed Address */}
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1 font-serif">العنوان بالتفصيل (الحي، الشارع، علامة مميزة):</label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 w-4.5 h-4.5 text-secondary" />
                <textarea
                  rows={2}
                  placeholder="مثال: الجبيهة - ضاحية الرشيد - خلف فرست كلاس للحلويات - عمارة رقم ٤ شقة د"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-natural-border rounded-xl pr-9 pl-3 py-2 text-sm text-text-dark focus:ring-secondary focus:border-secondary transition-all font-medium font-serif"
                />
              </div>
            </div>

            {/* Additional Delivery Notes */}
            <div>
              <label className="block text-xs font-bold text-secondary-dark mb-1 font-serif font-serif">ملاحظات تسليم إضافية للمندوب (اختياري):</label>
              <input
                type="text"
                placeholder="مثال: يرجى الاتصال قبل القدوم بساعة / التسليم بعد العصر"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-natural-border rounded-xl px-3.5 py-2 text-xs text-text-dark focus:ring-secondary focus:border-secondary transition-all font-serif"
              />
            </div>

          </div>

        </div>

        {/* Section 3: Payment Method and Trust Safeguards */}
        <div className="bg-white border border-natural-border rounded-2xl p-5 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
          <div>
            <span className="text-xs font-bold text-text-dark block mb-2 font-serif">طريقة الدفع المناسبة لكِ:</span>
            <div className="space-y-2">
              <label className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-secondary bg-[#FAF8F5]' : 'border-natural-border bg-white'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-secondary focus:ring-secondary"
                />
                <div className="text-xs">
                  <strong className="text-text-dark block font-bold">الدفع كاش نقداً عند الاستلام</strong>
                  <span className="text-secondary-dark block text-[10px] mt-0.5">الدفع نقداً للمندوب فور استلام الطرد مجهزاً ومغلفاً بالكامل.</span>
                </div>
              </label>

              <label className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'clique' ? 'border-secondary bg-[#FAF8F5]' : 'border-natural-border bg-white'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="clique"
                  checked={paymentMethod === 'clique'}
                  onChange={() => setPaymentMethod('clique')}
                  className="mt-1 text-secondary focus:ring-secondary"
                />
                <div className="text-xs">
                  <strong className="text-text-dark block font-bold">محفظة كليك الأردنية (CliQ)</strong>
                  <span className="text-secondary-dark block text-[10px] mt-0.5">تحويل سريع ومباشر لتسهيل العملية وتجنب فكة الكاش.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-[#FAF8F5] rounded-xl border border-natural-border p-4 shrink-0 flex flex-col justify-between font-serif">
            <span className="text-xs font-bold text-text-dark block border-b border-natural-border pb-2">ملخص تكلفة المعاملة الحالية:</span>
            
            <div className="text-xs space-y-1.5 py-2">
              <div className="flex justify-between">
                <span className="text-secondary-dark font-medium">سعر القطعة المخصصة:</span>
                <span className="font-mono text-text-dark font-bold">{activeProduct.price} دينار أردني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-dark font-medium">الكمية المختارة:</span>
                <strong className="text-text-dark font-bold">{qty} قطع</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-dark font-medium">مجموع سعر الخامات:</span>
                <span className="font-medium font-mono text-text-dark font-bold">{subtotal} د.أ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-dark font-medium">مصاريف التوصيل السريع (محافظة {governorate}):</span>
                <span className="font-mono text-text-dark">
                  {shippingCost === 0 ? <strong className="text-secondary font-bold">مجاني لعيونكِ</strong> : `${shippingCost} د.أ`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-natural-border mt-2 text-sm text-text-dark">
              <span className="font-bold">الحساب الإجمالي للطلبية:</span>
              <strong className="text-base md:text-lg font-black font-mono text-secondary-dark text-[#5A5A40]">
                {total} دينار أردني
              </strong>
            </div>
          </div>
        </div>

        {/* Double high-conversion Call-To-Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 font-serif">
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm md:text-base px-6 py-4 rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer leading-relaxed animate-none"
          >
            <span>اطلبي عبر الواتساب بنقرة واحدة 🟢</span>
          </button>
          
          <button
            type="button"
            onClick={handleInstantSubmit}
            className="bg-secondary hover:bg-secondary-dark text-white font-extrabold text-sm md:text-base px-6 py-4 rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 cursor-pointer leading-relaxed animate-none"
          >
            <ShoppingBag className="w-5 h-5 shrink-0" />
            <span>تأكيد الطلب المباشر بدون واتساب</span>
          </button>
        </div>

        <div className="text-center font-serif">
          <p className="text-[10px] text-secondary-dark mt-2 leading-relaxed">
            * بالضغط على تأكيد، نلزم أنفسنا بتجهيز الطلبية وتفصيلها خصيصاً لكِ خلال 48 ساعة فقط وشحنها لخدمة التوصيل. نحن نثق بزبونات لقطة الأوفياء وندعوكِ لتجهيز كاش المحاسبة عند وصول المندوب. شكراً لتسوقكِ معنا!
          </p>
        </div>

      </form>
    </div>
  );
}
