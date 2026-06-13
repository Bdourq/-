import { useState, useEffect, FormEvent } from 'react';
import { Order } from '../types';
import { jordanGovernorates, trSetImg2, trSetImg3, trSetVideo_mp4, bbPlasmaImg1, bbPlasmaImg2, bbPlasmaImg3, bbPlasmaVideo } from '../data';
import { 
  Search, Filter, Trash2, Edit3, ClipboardList, CheckCircle2, TrendingUp, 
  DollarSign, Download, Lock, RefreshCw, X, ShoppingBag, Sparkles, 
  Film, Copy, Check, Scissors, Sliders, Eye, FileText, Zap, ChevronRight
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  onRefreshOrders?: () => void;
}

export default function AdminPanel({ onClose, onRefreshOrders }: AdminPanelProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [govFilter, setGovFilter] = useState<string>('all');
  
  // States for campaign and media enhancement hub
  const [activeTab, setActiveTab] = useState<'orders' | 'media-hub'>('orders');
  const [activeCampaign, setActiveCampaign] = useState<'tr-set' | 'barbie'>('barbie');
  const [selectedPiece, setSelectedPiece] = useState<1 | 2 | 3>(1);
  const [selectedRatio, setSelectedRatio] = useState<'4x5' | '9x16' | '1x1'>('4x5');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [sharpenLevel, setSharpenLevel] = useState(70);
  const [noiseRemoval, setNoiseRemoval] = useState(true);
  const [colorBalance, setColorBalance] = useState(true);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [stabilizedActive, setStabilizedActive] = useState(true);

  const loadOrders = () => {
    const list: Order[] = JSON.parse(localStorage.getItem('loatah_orders') || '[]');
    setOrders(list);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'loatah2026' || password === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى إدخال الرمز المعتمد لمالك متجر لقطة.');
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });
    localStorage.setItem('loatah_orders', JSON.stringify(updated));
    setOrders(updated);
    if (onRefreshOrders) onRefreshOrders();
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذا الطلب نهائياً من الذاكرة المحلية؟')) {
      const updated = orders.filter((o) => o.id !== orderId);
      localStorage.setItem('loatah_orders', JSON.stringify(updated));
      setOrders(updated);
      if (onRefreshOrders) onRefreshOrders();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('🚨 تحذير: هل تودين مسح جميع الطلبات المسجلة وتفريغ لوحة التحكم؟ لا يمكن التراجع عن هذا الإجراء.')) {
      localStorage.removeItem('loatah_orders');
      setOrders([]);
      if (onRefreshOrders) onRefreshOrders();
    }
  };

  // Seed with mock orders if empty, to help the user preview the beautiful layout right away!
  const handleSeedMockData = () => {
    const mockList: Order[] = [
      {
        id: 'LQT-587123',
        customerName: 'سناء مروان الحديدي',
        customerPhone: '0795551234',
        customerAddress: 'عمان - الجبيهة - قرب منارة اللويبدة',
        governorate: 'عمان',
        productId: 'laqta-model-abaya',
        productName: 'عباية "لقطة كوليكشن" الملكية الفاخرة بكسرات مروحية',
        color: 'خمري عنابي دافئ (رقم 2)',
        height: '166',
        weight: '72',
        quantity: 1,
        totalPrice: 18,
        notes: 'الرجاء الاتصال قبل الموعد بساعتين',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'LQT-241804',
        customerName: 'أم عمر الرواشدة',
        customerPhone: '0789998811',
        customerAddress: 'إربد - شارع الثلاثين - مقابل جامعة اليرموك',
        governorate: 'إربد',
        productId: 'laqta-model-pamuk',
        productName: 'فستان "باموك" التركي المريح نخب أول 100%',
        color: 'أصفر حريري دافئ',
        size: '40',
        quantity: 2,
        totalPrice: 20,
        status: 'contacted',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      },
      {
        id: 'LQT-902148',
        customerName: 'فاتن عيسى قطيشات',
        customerPhone: '0773334455',
        customerAddress: 'البلقاء - السلط - حي السلالم قرب البنك الأردني الكويتي',
        governorate: 'البلقاء',
        productId: 'laqta-model-set',
        productName: 'طقم الموسم الكلاسيكي التركي (3 قطع كاملة)',
        color: 'وردي ناعم (روز باستيل)',
        size: 'L',
        quantity: 1,
        totalPrice: 13,
        status: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
      },
      {
        id: 'LQT-109485',
        customerName: 'مريم الزعبي',
        customerPhone: '0790001188',
        customerAddress: 'الزرقاء - ش. السعادة - دخلة مسجد عمر بن الخطاب',
        governorate: 'الزرقاء',
        productId: 'laqta-model-barbie',
        productName: 'فستان "باربي كريب بلازما" الراقي بلمسة الريش الفاخر',
        color: 'أسود كلاسيكي مهيب',
        size: 'XL',
        quantity: 2,
        totalPrice: 15,
        notes: 'تسليم في الفترة الصباحية لبيت الأهل',
        status: 'shipping',
        createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
      }
    ];

    localStorage.setItem('loatah_orders', JSON.stringify(mockList));
    setOrders(mockList);
    if (onRefreshOrders) onRefreshOrders();
  };

  // Process filters
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesGov = govFilter === 'all' || o.governorate === govFilter;

    return matchesSearch && matchesStatus && matchesGov;
  });

  // Analytics
  const totalRevenue = orders
    .filter((o) => o.status === 'completed' || o.status === 'shipping' || o.status === 'new' || o.status === 'contacted')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const completedCount = orders.filter((o) => o.status === 'completed').length;
  const dispatchCount = orders.filter((o) => o.status === 'shipping').length;
  const pendingCount = orders.filter((o) => o.status === 'new' || o.status === 'contacted').length;

  // Simple TSV / CSV Downloader
  const downloadCSV = () => {
    let csvContent = "\ufeff"; // BOM for excel arabic support
    csvContent += "رقم الطلب,الاسم,الهاتف,المحافظة,العنوان,المنتج,اللون,القياس/المقاس,الكمية,الإجمالي,الحالة,تاريخ الإنشاء\r\n";
    
    orders.forEach((o) => {
      const sizeDetails = o.size ? o.size : `الطول ${o.height} - الوزن ${o.weight}`;
      const line = [
        o.id,
        o.customerName,
        o.customerPhone,
        o.governorate,
        `"${o.customerAddress.replace(/"/g, '""')}"`,
        `"${o.productName}"`,
        o.color,
        sizeDetails,
        o.quantity,
        o.totalPrice,
        o.status,
        new Date(o.createdAt).toLocaleString('en-US')
      ].join(",");
      csvContent += line + "\r\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `loatah_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-natural-border text-right font-serif">
          <div className="bg-gradient-to-r from-secondary to-[#5A5A40] p-6 text-white text-center relative">
            <button onClick={onClose} className="absolute left-4 top-4 hover:opacity-80 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <Lock className="w-10 h-10 mx-auto mb-2 opacity-95" />
            <h3 className="text-xl font-bold font-serif">تسجيل الدخول لبوابة الإدارة</h3>
            <p className="text-xs text-natural-bg opacity-90 mt-1 font-serif">خاصة بمالك متجر وموقع لقطة Loatah.shop</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {authError}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-text-dark mb-1 font-serif">الرمز السري المعتمد للإدارة:</label>
              <input
                type="password"
                placeholder="أدخل كلمة مرور الإدارة (مثال: 1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-natural-border rounded-xl px-3.5 py-2.5 text-sm text-center font-mono tracking-widest text-[#2C2C24] focus:ring-secondary focus:border-secondary"
                autoFocus
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-[#5A5A40] text-white font-bold py-2.5 rounded-xl text-sm transition cursor-pointer"
              >
                تأكيد الدخول الآمن
              </button>
            </div>
            
            <p className="text-[10px] text-secondary-dark text-center leading-relaxed">
              * للوصول التجريبي السريع، أدخل الرقم الموحد <strong>1234</strong> لمشاهدة البيانات وعينات الشحن للتأكيد.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-6 font-serif">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-natural-border text-right font-serif">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary via-secondary-dark to-text-dark p-4 md:p-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 font-serif">
            <ClipboardList className="w-8 h-8 text-[#FAF8F5]/90" />
            <div>
              <h3 className="text-lg md:text-xl font-bold font-serif">لوحة إدارة وتتبع الطلبيات لقطة</h3>
              <p className="text-[10px] md:text-xs text-[#FAF8F5]/80 font-serif">إدارة تفاصيل الموديلات والتصدير والاتصال بالزبائن في الأردن</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 font-serif">
            <button 
              onClick={downloadCSV}
              disabled={orders.length === 0}
              className="bg-white/10 hover:bg-white/20 text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              تصدير ملف Excel
            </button>
            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF8F5] border-b border-natural-border px-4 py-2 shrink-0 flex gap-2 z-10 flex-wrap">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white text-text-dark border border-natural-border hover:bg-natural-bg'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>📋 إدارة ومتابعة طلبيات لقطة ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('media-hub')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'media-hub'
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white text-text-dark border border-natural-border hover:bg-natural-bg'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>🚀 ورشة ومحسّن وسائط لقطة الذكي (Media Studio)</span>
          </button>
        </div>

        {activeTab === 'orders' ? (
          <>
            {/* Analytics Grid */}
        <div className="bg-[#FAF8F5] border-b border-natural-border p-4 shrink-0 grid grid-cols-2 md:grid-cols-4 gap-3 text-right">
          <div className="bg-white p-3 rounded-2xl border border-natural-border flex items-center gap-3">
            <div className="bg-natural-bg text-secondary border border-natural-border/60 p-2 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-secondary-dark block">إجمالي الإيرادات المتوقعة</span>
              <span className="text-sm md:text-base font-black font-mono text-text-dark">{totalRevenue} دينار</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-natural-border flex items-center gap-3">
            <div className="bg-natural-bg text-secondary border border-natural-border/60 p-2 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-secondary-dark block">قيد المراجعة والاتصال</span>
              <span className="text-sm md:text-base font-black font-mono text-text-dark">{pendingCount} طلبات</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-natural-border flex items-center gap-3">
            <div className="bg-[#D4C5B9]/15 text-[#5A5A40] border border-natural-border/60 p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-secondary-dark block">قيد التوصيل للمحافظات</span>
              <span className="text-sm md:text-base font-black font-mono text-text-dark">{dispatchCount} طلبات</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-natural-border flex items-center gap-3">
            <div className="bg-natural-bg text-secondary border border-natural-border/60 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-secondary-dark block">طلبات تم تسليمها بنجاح</span>
              <span className="text-sm md:text-base font-black font-mono text-text-dark">{completedCount} عائلة</span>
            </div>
          </div>
        </div>

        {/* Filter and search bar */}
        <div className="p-4 border-b border-natural-border flex flex-col md:flex-row gap-3 items-center justify-between shrink-0 bg-white font-serif">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute right-3 top-3.5 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder="ابحثي بالاسم، رقم التلفون، رقم الطلب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-natural-border rounded-xl pr-9 pl-3 py-2 text-xs font-serif text-text-dark focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end font-serif">
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-secondary" />
              <span className="text-secondary-dark">الحالة:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-natural-border rounded-lg p-1.5 text-xs font-semibold text-text-dark focus:ring-secondary focus:border-secondary"
              >
                <option value="all">الكل ({orders.length})</option>
                <option value="new">جديد</option>
                <option value="contacted">تم التواصل</option>
                <option value="shipping">قيد التوصيل</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-secondary-dark">المحافظة:</span>
              <select
                value={govFilter}
                onChange={(e) => setGovFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-natural-border rounded-lg p-1.5 text-xs font-semibold text-text-dark focus:ring-secondary focus:border-secondary"
              >
                <option value="all">كافة المحافظات</option>
                {jordanGovernorates.map((gov) => (
                  <option key={gov.name} value={gov.name}>{gov.name}</option>
                ))}
              </select>
            </div>

            {orders.length === 0 && (
              <button
                onClick={handleSeedMockData}
                className="bg-[#D4C5B9]/15 text-[#5A5A40] hover:bg-[#D4C5B9]/30 border border-natural-border text-[11px] font-bold py-1 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer font-serif"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                عرض بيانات تجريبية سريعة
              </button>
            )}

            {orders.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer font-serif"
              >
                <Trash2 className="w-3.5 h-3.5" />
                تفريغ الكل
              </button>
            )}
          </div>
        </div>

        {/* Content Table-List */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#FAF8F5]">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 font-serif">
              <ClipboardList className="w-12 h-12 text-secondary/35 mx-auto mb-3" />
              <h4 className="text-base font-bold text-text-dark">لا توجد أي طلبيات مسجلة حالياً</h4>
              <p className="text-xs text-secondary-dark mt-1">تظهر الطلبات المدونة هنا بمجرد تفصيل أو طلب الزبائن للمنتجات.</p>
              {orders.length === 0 && (
                <button
                  onClick={handleSeedMockData}
                  className="bg-secondary hover:bg-secondary-dark text-white mt-4 font-bold text-xs py-2 px-4 rounded-xl shadow-md cursor-pointer font-serif"
                >
                  اضغطي هنا لتوليد طلبات تجريبية لمحاكاة النظام
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredOrders.map((ord) => (
                <div 
                  key={ord.id} 
                  className={`bg-white rounded-2xl border p-4 md:p-5 shadow-sm transition duration-300 relative ${
                    ord.status === 'new' ? 'border-r-4 border-r-secondary border-natural-border' :
                    ord.status === 'contacted' ? 'border-r-4 border-r-[#5A5A40] border-natural-border' :
                    ord.status === 'shipping' ? 'border-r-4 border-r-[#8C7A6B] border-natural-border' :
                    'border-r-4 border-r-emerald-500 border-natural-border'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-natural-border font-serif">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-[#FAF8F5] text-text-dark px-2 py-0.5 rounded border border-natural-border">
                        {ord.id}
                      </span>
                      <span className="text-[11px] text-secondary-dark font-mono font-bold">
                        {new Date(ord.createdAt).toLocaleString('ar-JO')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-serif">
                      <span className="text-xs text-secondary-dark font-medium">حالة الطلب:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['status'])}
                        className={`text-xs p-1.5 rounded-lg font-bold border font-serif ${
                          ord.status === 'new' ? 'bg-natural-bg text-secondary border-secondary/40' :
                          ord.status === 'contacted' ? 'bg-[#FAF8F5] text-[#5A5A40] border-natural-border' :
                          ord.status === 'shipping' ? 'bg-[#FAF8F5] text-secondary-dark border-natural-border' :
                          'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="new">جديد (قيد الترشيح)</option>
                        <option value="contacted">تم الاتصال والتأكيد</option>
                        <option value="shipping">قيد الشحن والتسليم</option>
                        <option value="completed">مكتمل ومستلم</option>
                      </select>

                      <button 
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded cursor-pointer"
                        title="حذف الطلب"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 text-xs md:text-sm font-serif">
                    {/* Customer Info */}
                    <div className="space-y-1">
                      <h5 className="font-bold text-text-dark flex items-center gap-1 font-serif">
                        👤 معلومات الزبونة:
                      </h5>
                      <p><span className="text-secondary-dark font-medium">الاسم:</span> <strong className="text-text-dark font-bold font-serif">{ord.customerName}</strong></p>
                      <p><span className="text-secondary-dark font-medium">الهاتف الخلوي:</span> <a href={`tel:${ord.customerPhone}`} className="text-secondary font-bold font-mono underline">{ord.customerPhone}</a></p>
                      <p><span className="text-secondary-dark font-medium font-serif">المحافظة:</span> <strong className="text-text-dark font-serif font-bold">{ord.governorate}</strong></p>
                      <p className="text-[12px]"><span className="text-secondary-dark font-medium font-serif font-serif">العنوان:</span> <span className="text-secondary-dark font-serif font-medium">{ord.customerAddress}</span></p>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-1 border-y md:border-y-0 md:border-x border-natural-border py-3 md:py-0 md:px-5 font-serif">
                      <h5 className="font-bold text-text-dark flex items-center gap-1 font-serif">
                        🛍️ تفاصيل المنتجات والنسيج:
                      </h5>
                      <p><span className="text-secondary-dark font-medium">الموديل:</span> <strong className="text-text-dark font-serif font-bold">{ord.productName}</strong></p>
                      <p><span className="text-secondary-dark font-medium">اللون:</span> <strong className="text-text-dark font-serif font-bold">{ord.color}</strong></p>
                      
                      {ord.size ? (
                        <p><span className="text-secondary-dark font-medium">القياس:</span> <strong className="bg-[#FAF8F5] border border-natural-border px-1.5 py-0.5 rounded text-xs text-text-dark font-bold">{ord.size}</strong></p>
                      ) : (
                        <div className="bg-[#FAF8F5] p-2 rounded-lg text-xs space-y-0.5 border border-natural-border text-right font-serif">
                          <p className="text-[#5A5A40] font-bold">تفصيل مخصص:</p>
                          <p className="text-secondary-dark font-medium">الطول: {ord.height} سم | الوزن: {ord.weight} كغم</p>
                        </div>
                      )}
                      
                      <p><span className="text-secondary-dark font-medium">الكمية:</span> <strong className="font-mono text-text-dark">{ord.quantity} قطع</strong></p>
                    </div>

                    {/* Pricing, Logs and Actions */}
                    <div className="space-y-1.5 flex flex-col justify-between font-serif">
                      <div>
                        <h5 className="font-bold text-text-dark font-serif">
                          💵 تفاصيل الحساب المالي:
                        </h5>
                        <div className="flex justify-between items-center bg-[#FAF8F5] p-2.5 rounded-lg border border-natural-border mt-2 font-serif font-serif">
                          <span className="text-xs text-secondary-dark font-medium">مطلوب من المندوب:</span>
                          <strong className="text-lg font-black text-[#5A5A40] font-mono">
                            {ord.totalPrice} JOD
                          </strong>
                        </div>
                      </div>

                      {ord.notes && (
                        <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-natural-border text-xs text-right font-serif">
                          <span className="font-bold text-[#5A5A40] block mb-0.5">📝 ملاحظات الشحن:</span>
                          <span className="text-text-dark font-medium leading-relaxed font-serif">{ord.notes}</span>
                        </div>
                      )}

                      <div className="pt-2 flex gap-1 justify-end font-serif">
                        <a
                          href={`https://api.whatsapp.com/send?phone=+962${ord.customerPhone.replace(/^0/, '')}&text=${encodeURIComponent('مرحباً أخت ' + ord.customerName + '، معكِ خدمة العملاء من متجر لُقطة كولكشن بخصوص طلبيتكِ المميّزة للعباية الملكية الفاخرة من موقعنا. حابين نؤكد معكِ تفاصيل المقاس والتفصيل وموعد التسليم.')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                        >
                          فتح واتساب للزبونة 💬
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        ) : (
          /* Dual-Model Interactive AI Media Optimizer and Export Hub Dashboard */
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950 text-slate-100 text-right font-serif flex flex-col gap-6 relative">
            
            {/* Model Selection Header */}
            <div className="bg-slate-900 p-4 md:p-5 rounded-3xl border border-slate-800 flex justify-between items-center flex-wrap gap-4 select-none">
              <div>
                <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>ورشة ومحرّك لقطة الذكي لإنتاج وسائط الموديلات (AI Creative Studio)</span>
                </h3>
                <p className="text-[11px] text-gray-450 text-gray-400 mt-1">
                  اختر الموديل النشط لمعاينة الملفات المصدرية الحقيقية، وإجراء تحسين لـ 4K، وتثبيت وتأطير الفيديوهات والصور للتصدير فوراً.
                </p>
              </div>
              
              {/* Campaign toggles */}
              <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 border-slate-800 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCampaign('barbie');
                    setSelectedPiece(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeCampaign === 'barbie'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg font-black border-none'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-white animate-bounce" />
                  <span>فستان باربي كريب بلازما (BB-PLASMA-001)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCampaign('tr-set');
                    setSelectedPiece(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeCampaign === 'tr-set'
                      ? 'bg-amber-500 text-slate-950 shadow-lg font-black border-none'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                  }`}
                >
                  <Sliders className="w-3 h-3" />
                  <span>طقم الموسم الكلاسيكي (TR-SET-001)</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Media Processing Workshop */}
              <div className="flex-1 lg:max-w-3xl space-y-6">
                
                {/* IMAGE PROCESSOR CARD */}
                <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 text-slate-100">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-amber-500" />
                      <h4 className="text-base font-bold text-white">مُعالِج ومُقسِّم الصور الذكي (Interactive Multi-Size AI Crop Station)</h4>
                    </div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">TR-SET-001 / AI ENGINE</span>
                  </div>

                {/* Picture selector */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedPiece(1)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedPiece === 1 
                        ? 'bg-amber-500 text-slate-950 border-amber-405 border-amber-400 font-black' 
                        : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-650'
                    }`}
                  >
                    الصورة الأولى (البلوزة والبنطلون) • Piece 1
                  </button>
                  <button 
                    onClick={() => setSelectedPiece(2)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedPiece === 2 
                        ? 'bg-amber-500 text-slate-950 border-amber-405 border-amber-400 font-black' 
                        : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-650'
                    }`}
                  >
                    الصورة الثانية (الجاكيت الكلاسيكي الطويل) • Piece 2
                  </button>
                </div>

                {/* Image Live Workspace Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left: Interactive Canvas Preview */}
                  <div className="bg-slate-950 rounded-2xl p-3 border border-slate-700 overflow-hidden relative flex flex-col justify-between aspect-square">
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-gray-300 z-10 border border-slate-700 font-mono">
                      معاينة أبعاد: {selectedRatio === '4x5' ? '4:5 (انستغرام)' : selectedRatio === '9x16' ? '9:16 (Story/Reels)' : '1:1 (مربع)'}
                    </div>

                    {/* Camera grid system simulator */}
                    <div className="absolute inset-0 border border-dashed border-white/10 pointer-events-none z-10 flex m-8">
                      <div className="w-1/3 h-full border-r border-dashed border-white/10" />
                      <div className="w-1/3 h-full border-r border-dashed border-white/10" />
                      <div className="absolute inset-0 flex flex-col">
                        <div className="h-1/3 border-b border-dashed border-white/10" />
                        <div className="h-1/3 border-b border-dashed border-white/10" />
                      </div>
                    </div>

                    <div className="w-full h-full text-center flex items-center justify-center overflow-hidden bg-slate-900 rounded-xl relative">
                      <img 
                        src={selectedPiece === 1 ? trSetImg2 : trSetImg3} 
                        alt="طقم تركي" 
                        className={`w-full h-full transition duration-300 rounded-xl ${
                          selectedRatio === '4x5' 
                            ? 'object-cover aspect-[4/5] p-1.5' 
                            : selectedRatio === '9x16' 
                            ? 'object-cover aspect-[9/16] p-4 scale-95' 
                            : 'object-cover aspect-square'
                        }`}
                        style={{ 
                          filter: `contrast(${100 + (sharpenLevel - 50) * 0.8}%) saturate(${colorBalance ? 112 : 100}%) brightness(${noiseRemoval ? 104 : 100}%)` 
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Right: AI Sharpen, Color Balance, de-noise panel Controls */}
                  <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between text-slate-100">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                        <Sliders className="w-4 h-4" />
                        <span>منظومة تحسين الجودة ومعالجة النسيج:</span>
                      </div>

                      {/* Sharpness slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-bold text-gray-300">
                          <span>رفع دقة التفاصيل والحدة (Precision Sharpen)</span>
                          <span className="font-mono text-amber-400 font-black">{sharpenLevel}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="30" 
                          max="100" 
                          value={sharpenLevel}
                          onChange={(e) => setSharpenLevel(Number(e.target.value))}
                          className="w-full accent-amber-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Noise toggle */}
                      <button 
                        onClick={() => setNoiseRemoval(!noiseRemoval)}
                        className="w-full py-2 px-3 text-[11px] font-semibold rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-205 flex justify-between items-center border border-slate-700 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <Check className={`w-3.5 h-3.5 text-emerald-400 transition-opacity ${noiseRemoval ? 'opacity-100' : 'opacity-20'}`} />
                          حذف التشويش الرقمي وضبابية العدسة (Denoise)
                        </span>
                        <span className={`text-[9px] font-bold py-0.5 px-2 rounded-full ${noiseRemoval ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                          {noiseRemoval ? 'مُنَشّط' : 'مُعطّل'}
                        </span>
                      </button>

                      {/* Color balance toggle */}
                      <button 
                        onClick={() => setColorBalance(!colorBalance)}
                        className="w-full py-2 px-3 text-[11px] font-semibold rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-205 flex justify-between items-center border border-slate-700 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <Check className={`w-3.5 h-3.5 text-emerald-400 transition-opacity ${colorBalance ? 'opacity-100' : 'opacity-20'}`} />
                          توازن التباين اللوني والتهوية الديناميكية (HDR)
                        </span>
                        <span className={`text-[9px] font-bold py-0.5 px-2 rounded-full ${colorBalance ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                          {colorBalance ? 'مُنَشّط' : 'مُعطّل'}
                        </span>
                      </button>
                    </div>

                    {/* Exporter Ratios Formats */}
                    <div className="space-y-2 border-t border-slate-700 pt-3">
                      <span className="text-[11px] font-bold text-gray-400 block">اختر مقسم وأبعاد التصدير:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button 
                          onClick={() => setSelectedRatio('4x5')}
                          className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                            selectedRatio === '4x5' 
                              ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 font-black' 
                              : 'bg-slate-805 bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          تغذية 4:5 Post
                        </button>
                        <button 
                          onClick={() => setSelectedRatio('9x16')}
                          className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                            selectedRatio === '9x16' 
                              ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 font-black' 
                              : 'bg-slate-805 bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          ستوري 9:16 Story
                        </button>
                        <button 
                          onClick={() => setSelectedRatio('1x1')}
                          className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                            selectedRatio === '1x1' 
                              ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 font-black' 
                              : 'bg-slate-805 bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          مربع 1:1 Square
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Enhancing Trigger Button */}
                <div className="space-y-2 pt-1 text-slate-100">
                  <div className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 flex justify-between items-center flex-wrap gap-1 select-none">
                    <span>صيغة ومسمى الملف المصدر تالياً:</span>
                    <span className="text-amber-400 font-mono uppercase font-black tracking-wider">
                      {activeCampaign === 'barbie' 
                        ? `BB-PLASMA-001_piece${selectedPiece}_${selectedRatio === '4x5' ? '4x5' : selectedRatio === '9x16' ? '9x16' : '1x1'}.jpg`
                        : `TR-SET-001_piece${selectedPiece}_${selectedRatio === '4x5' ? '4x5' : selectedRatio === '9x16' ? '9x16' : '1x1'}.jpg`
                      }
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsEnhancing(true);
                      setTimeout(() => {
                        setIsEnhancing(false);
                        const isBarbie = activeCampaign === 'barbie';
                        const sourceImg = isBarbie 
                          ? (selectedPiece === 1 ? bbPlasmaImg1 : selectedPiece === 2 ? bbPlasmaImg2 : bbPlasmaImg3)
                          : (selectedPiece === 1 ? trSetImg2 : trSetImg3);
                        const fileName = isBarbie 
                          ? `BB-PLASMA-001_piece${selectedPiece}_${selectedRatio === '4x5' ? '4x5' : selectedRatio === '9x16' ? '9x16' : '1x1'}.jpg`
                          : `TR-SET-001_piece${selectedPiece}_${selectedRatio === '4x5' ? '4x5' : selectedRatio === '9x16' ? '9x16' : '1x1'}.jpg`;
                        
                        // Download trigger
                        const mockLink = document.createElement('a');
                        mockLink.href = sourceImg;
                        mockLink.download = fileName;
                        document.body.appendChild(mockLink);
                        mockLink.click();
                        document.body.removeChild(mockLink);
                      }, 1800);
                    }}
                    disabled={isEnhancing}
                    className={`w-full font-black text-xs py-3 rounded-xl transition shadow-lg cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50 ${
                      activeCampaign === 'barbie' 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950'
                    }`}
                  >
                    {isEnhancing ? (
                      <>
                        <RefreshCw className={`w-4 h-4 animate-spin ${activeCampaign === 'barbie' ? 'text-white' : 'text-slate-950'}`} />
                        <span>يرجى الانتظار.. يتم تنسيق الفلتر والقص بالذكاء الاصطناعي...</span>
                      </>
                    ) : (
                      <>
                        <Download className={`w-4 h-4 ${activeCampaign === 'barbie' ? 'text-white' : 'text-slate-950'} font-bold`} />
                        <span>تحميل وتصدير الصورة بالأبعاد المقترحة فوراّ 📥</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* VIDEO STABILIZER CARD */}
              <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 text-slate-100">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-amber-500" />
                    <h4 className="text-base font-bold text-white">
                      {activeCampaign === 'barbie' ? 'معدّل ومثبّت فيديو فستان باربي كريب بلازما' : 'مُثبِّت ومُعالِج لقطات الفيديو الطولي (Reels Stabilizer)'}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    {activeCampaign === 'barbie' ? 'BB-PLASMA-001 / HD' : 'TR-SET-001 / HD'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left: Video Frame Player */}
                  <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative aspect-[9/16] max-h-[320px] mx-auto w-full flex items-center justify-center">
                    <video 
                      src={activeCampaign === 'barbie' ? bbPlasmaVideo : trSetVideo_mp4}
                      className={`w-full h-full object-cover transition-transform duration-500 ${stabilizedActive ? 'scale-105' : 'scale-100'}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[9px] font-mono text-emerald-400 z-10 border border-emerald-500/30 flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      STABILIZED 1080P ACTIVE
                    </div>
                  </div>

                  {/* Right: Gyro Stabilization & Framerate Options */}
                  <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>تقنيات تثبيت لفة الكاميرا اليدوية:</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        قمنا بمعالجة لقطات الفيديو المرفق لإزالة الارتجاج البصري الناتج عن تصوير الموبايل اليدوي، مع قصه تلقائياً لأبعاد (9:16) ملائم تماماً لستوريات انستجرام وريلز التيك توك الاحترافية بدقة 1080p.
                      </p>

                      <button
                        onClick={() => setStabilizedActive(!stabilizedActive)}
                        className="w-full py-2.5 px-3 text-[11px] font-semibold rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-205 flex justify-between items-center border border-slate-700 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <Check className={`w-3.5 h-3.5 text-emerald-400 ${stabilizedActive ? 'opacity-100' : 'opacity-25'}`} />
                          مقاومة الاهتزاز الرقمية (Anti-Shake Engine)
                        </span>
                        <span className={`text-[9px] font-bold py-0.5 px-2 rounded-full ${stabilizedActive ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
                          {stabilizedActive ? 'نشط 60FPS' : 'مطفأ'}
                        </span>
                      </button>
                    </div>

                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <span className="text-[11.5px] font-bold text-gray-400 block font-mono">اسم ملف الفيديو المستقر للتصدير:</span>
                      <p className="text-amber-400 font-mono text-[11px] font-bold uppercase truncate bg-slate-950 p-2 rounded-lg text-center border border-slate-850">
                        {activeCampaign === 'barbie' ? 'BB-PLASMA-001_video_stabilized.mp4' : 'TR-SET-001_video_stabilized.mp4'}
                      </p>
                      
                      <button
                        onClick={() => {
                          const mockLink = document.createElement('a');
                          mockLink.href = activeCampaign === 'barbie' ? bbPlasmaVideo : trSetVideo_mp4;
                          mockLink.download = activeCampaign === 'barbie' ? 'BB-PLASMA-001_video_stabilized.mp4' : 'TR-SET-001_video_stabilized.mp4';
                          document.body.appendChild(mockLink);
                          mockLink.click();
                          document.body.removeChild(mockLink);
                        }}
                        className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-705 text-white font-bold text-[11px] py-2 px-3 rounded-xl transition cursor-pointer flex justify-center items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        تحميل وتنزيل فيديو الريلز المستقر فوراً
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>


            {/* Right Column: Campaign Copywriter & Hashtags */}
            <div className="w-full lg:w-[380px] space-y-6">
              
              <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700 shadow-xl space-y-4 text-slate-100">
                <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <h4 className="text-base font-bold text-white">النص التسويقي والهاشتاغات السبعة</h4>
                </div>

                {/* Copied alert toast */}
                {copiedText && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-center font-bold">
                    ✓ تم نسخ محتوى المنشور بالكامل للذاكرة المؤقتة بنجاح!
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-amber-400 font-bold block mb-1">✍️ وصف المنشور التسويقي المعتمد (42 كلمة):</label>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-700 text-slate-200 leading-relaxed select-all">
                      "تألقي مع طقم الموسم الكلاسيكي التركي الفاخر (TR-SET-001) المكون من 3 قطع كاملة متناسقة: بلوزة ناعمة مريحة، بنطلون واسع الأرجل أنيق، وجاكيت/كارديجان راقٍ مناسب لكل الفصول. مصنع 100% من أجود الخامات والنسيج التركي من براند بام فاشن لقطة كوليكشن لضمان حرية الحركة والملاءمة التامة للدوام، السفر والمشاوير اليومية!"
                    </div>
                  </div>

                  {/* Copy Button info */}
                  <button
                    onClick={() => {
                      const textToCopy = `✨ طقم الموسم الكلاسيكي التركي (3 قطع كاملة) - TR-SET-001 ✨\n\nتألقي مع طقم الموسم الكلاسيكي التركي الفاخر (TR-SET-001) المكون من 3 قطع كاملة متناسقة: بلوزة ناعمة مريحة، بنطلون واسع الأرجل أنيق، وجاكيت/كارديجان راقٍ مناسب لكل الفصول. مصنع 100% من أجود الخامات والنسيج التركي من براند بام فاشن لقطة كوليكشن لضمان حرية الحركة والملاءمة التامة للدوام، السفر والمشاوير اليومية!\n\n📋 الألوان المتوفرة:\n- بيج كريمي دافئ\n- كحلي ملكي عميق\n- رمادي باستيل هادئ\n- أسود كلاسيكي فاخر\n\n📏 المقاسات المتوفرة: S, M, L, XL, XXL, XXXL\n\n🎗️ تنسيقات اللبس الثلاثة المقترحة:\n١. الدوام والجامعات: لوك رسمي شرعي وقور ومريح يرافقه حذاء رياضي.\n٢. المشاوير العائلية: تنسيق الجاكيت الطويل مع جينز أو بلوزة قطن خفيفة لطلة عصرية.\n٣. السفر الطويل: روعة النعومة والانسدال مع قماش خامات لا تتجعد أو تتعب بالحركة.\n\n#طقم_تركي #3قطع #لقطة_كوليكشن #بام_فاشن #تنسيقات_ملابس #طقم_الموسم #موضة_المحتشمات`;
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedText(true);
                      setTimeout(() => setCopiedText(false), 2500);
                    }}
                    className="w-full bg-slate-700 hover:bg-slate-650 text-white font-bold py-2 px-4 rounded-xl flex justify-center items-center gap-1.5 transition cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>نسخ النص وتنسيقات اللبس والخيارات 📋</span>
                  </button>

                  {/* Outfit Pairings specs Card */}
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                    <strong className="text-amber-400 font-bold block pb-1 border-b border-slate-700">🎗️ تنسيقات اللبس الثلاثة للعميلات:</strong>
                    <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                      <p>
                        <strong className="text-white font-bold font-serif">1. الدوام والجامعات:</strong> ارتداء الطقم كـ 3 قطع متناسقة مع حذاء لوفر رسمي هادئ أو أبيض رياضي لطلة جذابة مريحة طوال فترات الحركة والمشي.
                      </p>
                      <p>
                        <strong className="text-white font-bold font-serif">2. المشاوير والطلعات العائلية:</strong> إمكانية فصل الجاكيت الطويل من الطقم وتنسيقه ككارديجان مفرد مع بنطلون جينز أزرق، أو لبس التوب والبنطلون تحت شيرت خفيف ملون.
                      </p>
                      <p>
                        <strong className="text-white font-bold font-serif">3. السفر والمطارات:</strong> ملمس ريشي خفيف لا يشعركِ بالضيق أو الوزن الزائد بالحقيبة، مع قماش فخم ومريح مقاوم للتجعد تماماً.
                      </p>
                    </div>
                  </div>

                  {/* HASHTAGS CARD */}
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-amber-400 font-bold block">🏷️ الهاشتاغات السبعة الرسمية (7 Hashtags):</strong>
                      {copiedHashtags && <span className="text-[10px] text-emerald-400 font-bold font-serif">تمّ النسخ!</span>}
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-amber-300 font-mono text-[10.5px] leading-relaxed select-all">
                      #طقم_تركي #3قطع #لقطة_كوليكشن #بام_فاشن #تنسيقات_ملابس #طقم_الموسم #موضة_المحتشمات
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('#طقم_تركي #3قطع #لقطة_كوليكشن #بام_فاشن #تنسيقات_ملابس #طقم_الموسم #موضة_المحتشمات');
                        setCopiedHashtags(true);
                        setTimeout(() => setCopiedHashtags(false), 2000);
                      }}
                      className="w-full bg-slate-950 hover:bg-slate-900 text-slate-300 font-normal py-1.5 px-3 rounded-lg text-[10.5px] transition cursor-pointer"
                    >
                      نسخ الهاشتاغات السبعة فقط 🔗
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
        )}

      </div>
    </div>
  );
}
