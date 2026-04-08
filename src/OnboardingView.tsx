import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Wallet, 
  Building2, 
  Smartphone,
  Plus,
  Briefcase,
  GraduationCap,
  User,
  Laptop,
  Camera,
  Sparkles,
  Globe
} from 'lucide-react';
import { cn } from './utils';
import { Currency } from './types';
import { CURRENCIES } from './constants';

interface OnboardingViewProps {
  onComplete: (data: {
    language: string;
    occupation: string;
    name: string;
    profileImage: string;
    currency: Currency;
    accounts: any[];
  }) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5; // Reduced from 6 since auth is handled first

  // State for data
  const [language, setLanguage] = useState('bn');
  const [occupation, setOccupation] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [accounts, setAccounts] = useState([
    { id: 'acc-cash', name: 'ক্যাশ', icon: 'Wallet', color: '#10b981', accountType: 'Cash', balance: 0, isDefault: true, isPinned: true, includeInTotal: true },
    { id: 'acc-bank', name: 'ব্যাংক', icon: 'Building2', color: '#3b82f6', accountType: 'Bank', balance: 0, isPinned: true, includeInTotal: true },
    { id: 'acc-bkash', name: 'বিকাশ', icon: 'Smartphone', color: '#ec4899', accountType: 'Mobile Banking', balance: 0, isPinned: true, includeInTotal: true },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({ language, occupation, name, profileImage, currency, accounts });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAccountChange = (id: string, field: string, value: string | number) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, [field]: value } : acc
    ));
  };

  const handleAddAccount = () => {
    const newId = `acc-${Date.now()}`;
    setAccounts([...accounts, {
      id: newId,
      name: 'নতুন অ্যাকাউন্ট',
      icon: 'Wallet',
      color: '#8b5cf6',
      accountType: 'Other',
      balance: 0,
      isPinned: true,
      includeInTotal: true
    }]);
  };

  const t = (bn: string, en: string) => language === 'bn' ? bn : en;

  const occupations = [
    { id: 'student', name: t('ছাত্র/ছাত্রী', 'Student'), icon: GraduationCap },
    { id: 'employee', name: t('চাকরিজীবী', 'Employee'), icon: Briefcase },
    { id: 'business', name: t('ব্যবসায়ী', 'Business'), icon: Building2 },
    { id: 'freelancer', name: t('ফ্রিল্যান্সার', 'Freelancer'), icon: Laptop },
    { id: 'other', name: t('অন্যান্য', 'Other'), icon: User },
  ];

  return (
    <div className="fixed inset-0 bg-slate-50 z-[999] flex flex-col overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-200/50 w-full relative z-20">
        <motion.div 
          className="h-full bg-emerald-500 rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      {step > 1 && (
        <div className="px-6 py-4 flex items-center relative z-20">
          <button 
            onClick={handleBack} 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/30 rotate-3 mx-auto">
                <Globe size={48} className="text-white -rotate-3" />
              </div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Welcome / স্বাগতম</h2>
                <p className="text-slate-500 text-lg">Choose your preferred language<br/>আপনার পছন্দের ভাষা নির্বাচন করুন</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setLanguage('bn')}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-300",
                    language === 'bn' 
                      ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/10" 
                      : "border-white bg-white shadow-sm hover:border-emerald-200"
                  )}
                >
                  <span className="text-xl font-bold text-slate-900">বাংলা</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    language === 'bn' ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-300"
                  )}>
                    <Check size={16} strokeWidth={3} />
                  </div>
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-300",
                    language === 'en' 
                      ? "border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/10" 
                      : "border-white bg-white shadow-sm hover:border-emerald-200"
                  )}
                >
                  <span className="text-xl font-bold text-slate-900">English</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    language === 'en' ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-300"
                  )}>
                    <Check size={16} strokeWidth={3} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col pt-12 max-w-md mx-auto w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
                  <Briefcase size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{t('আপনার পেশা কী?', 'What is your occupation?')}</h2>
                <p className="text-slate-500 text-lg">{t('এটি আমাদের অ্যাপটিকে আপনার জন্য কাস্টমাইজ করতে সাহায্য করবে', 'This helps us customize the app for you')}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {occupations.map((occ) => {
                  const Icon = occ.icon;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => setOccupation(occ.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 rounded-[1.5rem] border-2 transition-all duration-300 gap-4",
                        occupation === occ.id 
                          ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-md shadow-blue-500/10" 
                          : "border-white bg-white text-slate-600 shadow-sm hover:border-blue-200"
                      )}
                    >
                      <Icon size={32} strokeWidth={1.5} />
                      <span className="font-bold">{occ.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto w-full"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6">
                <Sparkles size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{t('আপনার প্রোফাইল', 'Your Profile')}</h2>
              <p className="text-slate-500 text-lg mb-10">{t('আপনার নাম ও ছবি যোগ করুন', 'Add your name and photo')}</p>
              
              <div className="relative mb-10 group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={56} className="text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera size={28} className="text-white" />
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 rounded-full border-4 border-slate-50 flex items-center justify-center text-white shadow-lg pointer-events-none">
                  <Plus size={20} strokeWidth={3} />
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <div className="w-full relative">
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('আপনার নাম লিখুন', 'Enter your name')}
                  className="w-full bg-white border-2 border-transparent rounded-[1.5rem] px-6 py-5 text-xl font-bold text-slate-900 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-center shadow-sm placeholder:text-slate-400 placeholder:font-medium"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && handleNext()}
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col pt-12 max-w-md mx-auto w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mb-6">
                  <Wallet size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{t('মুদ্রা নির্বাচন করুন', 'Select Currency')}</h2>
                <p className="text-slate-500 text-lg">{t('আপনি কোন মুদ্রায় হিসাব রাখতে চান?', 'Which currency do you want to use?')}</p>
              </div>
              
              <div className="space-y-4">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all duration-300",
                      currency.code === c.code 
                        ? "border-amber-500 bg-amber-50/50 shadow-md shadow-amber-500/10" 
                        : "border-white bg-white hover:border-amber-200 shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-sm">
                        <img 
                          src={`https://flagcdn.com/w40/${c.flagCode}.png`} 
                          alt={c.country}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900 text-lg">{c.name}</p>
                        <p className="font-medium text-slate-500">{c.code} ({c.symbol})</p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      currency.code === c.code ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-300"
                    )}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col pt-12 max-w-md mx-auto w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6">
                  <Building2 size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{t('অ্যাকাউন্ট যোগ করুন', 'Add Accounts')}</h2>
                <p className="text-slate-500 text-lg">{t('আপনার অ্যাকাউন্টগুলোর নাম ও ব্যালেন্স সেট করুন', 'Set up your accounts and initial balances')}</p>
              </div>
              
              <div className="space-y-4">
                {accounts.map((acc) => {
                  const Icon = acc.icon === 'Wallet' ? Wallet : acc.icon === 'Building2' ? Building2 : Smartphone;
                  return (
                    <div key={acc.id} className="bg-white border-2 border-white rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${acc.color}15`, color: acc.color }}>
                          <Icon size={24} />
                        </div>
                        <input 
                          type="text"
                          value={acc.name}
                          onChange={(e) => handleAccountChange(acc.id, 'name', e.target.value)}
                          className="font-bold text-lg text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-emerald-500 outline-none px-1 py-1 transition-colors w-full"
                          placeholder={t('অ্যাকাউন্টের নাম', 'Account Name')}
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">{currency.symbol}</span>
                        <input 
                          type="number"
                          value={acc.balance || ''}
                          onChange={(e) => handleAccountChange(acc.id, 'balance', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-xl pl-12 pr-5 py-4 font-bold text-lg text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  );
                })}
                
                <button 
                  onClick={handleAddAccount}
                  className="w-full py-5 border-2 border-dashed border-slate-300 rounded-[1.5rem] text-slate-500 font-bold hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={24} />
                  {t('নতুন অ্যাকাউন্ট যোগ করুন', 'Add New Account')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-white z-50">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleNext}
            disabled={(step === 2 && !occupation) || (step === 3 && !name.trim())}
            className="w-full bg-slate-900 text-white rounded-[1.5rem] py-5 font-bold text-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {step === totalSteps ? t('শুরু করুন', 'Get Started') : t('পরবর্তী ধাপ', 'Next Step')} 
            {step !== totalSteps && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
