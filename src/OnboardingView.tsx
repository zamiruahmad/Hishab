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
  Camera
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
  const totalSteps = 6;

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
    <div className="fixed inset-0 bg-white z-[999] flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-slate-100 w-full">
        <motion.div 
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      {step > 1 && (
        <div className="px-6 py-4 flex items-center">
          <button onClick={handleBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8">
                <Wallet size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome / স্বাগতম</h2>
              <p className="text-slate-500 mb-8">Choose your preferred language / আপনার পছন্দের ভাষা নির্বাচন করুন</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setLanguage('bn')}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all",
                    language === 'bn' 
                      ? "border-emerald-500 bg-emerald-50" 
                      : "border-slate-100 bg-white hover:border-emerald-200"
                  )}
                >
                  <span className="text-xl font-medium text-slate-900">বাংলা</span>
                  {language === 'bn' && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all",
                    language === 'en' 
                      ? "border-emerald-500 bg-emerald-50" 
                      : "border-slate-100 bg-white hover:border-emerald-200"
                  )}
                >
                  <span className="text-xl font-medium text-slate-900">English</span>
                  {language === 'en' && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('আপনার পেশা কী?', 'What is your occupation?')}</h2>
              <p className="text-slate-500 mb-8">{t('এটি আমাদের অ্যাপটিকে আপনার জন্য কাস্টমাইজ করতে সাহায্য করবে', 'This helps us customize the app for you')}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {occupations.map((occ) => {
                  const Icon = occ.icon;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => setOccupation(occ.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-3",
                        occupation === occ.id 
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                          : "border-slate-100 bg-white text-slate-600 hover:border-emerald-200"
                      )}
                    >
                      <Icon size={28} />
                      <span className="font-medium">{occ.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center items-center text-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('আপনার প্রোফাইল', 'Your Profile')}</h2>
              <p className="text-slate-500 mb-8">{t('আপনার নাম ও ছবি যোগ করুন', 'Add your name and photo')}</p>
              
              <div className="relative mb-8 group">
                <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm pointer-events-none">
                  <Plus size={16} />
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('আপনার নাম লিখুন', 'Enter your name')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-lg font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-center"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && name.trim() && handleNext()}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('মুদ্রা নির্বাচন করুন', 'Select Currency')}</h2>
              <p className="text-slate-500 mb-8">{t('আপনি কোন মুদ্রায় হিসাব রাখতে চান?', 'Which currency do you want to use?')}</p>
              
              <div className="space-y-3">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                      currency.code === c.code 
                        ? "border-emerald-500 bg-emerald-50 shadow-sm" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <img 
                          src={`https://flagcdn.com/w40/${c.flagCode}.png`} 
                          alt={c.country}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900">{c.name}</p>
                        <p className="text-sm text-slate-500">{c.code} ({c.symbol})</p>
                      </div>
                    </div>
                    {currency.code === c.code && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col pt-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('অ্যাকাউন্ট যোগ করুন', 'Add Accounts')}</h2>
              <p className="text-slate-500 mb-8">{t('আপনার অ্যাকাউন্টগুলোর নাম ও ব্যালেন্স সেট করুন', 'Set up your accounts and initial balances')}</p>
              
              <div className="space-y-4">
                {accounts.map((acc) => {
                  const Icon = acc.icon === 'Wallet' ? Wallet : acc.icon === 'Building2' ? Building2 : Smartphone;
                  return (
                    <div key={acc.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${acc.color}15`, color: acc.color }}>
                          <Icon size={20} />
                        </div>
                        <input 
                          type="text"
                          value={acc.name}
                          onChange={(e) => handleAccountChange(acc.id, 'name', e.target.value)}
                          className="font-medium text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 outline-none px-1 py-0.5 transition-colors w-full"
                          placeholder={t('অ্যাকাউন্টের নাম', 'Account Name')}
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{currency.symbol}</span>
                        <input 
                          type="number"
                          value={acc.balance || ''}
                          onChange={(e) => handleAccountChange(acc.id, 'balance', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
                
                <button 
                  onClick={handleAddAccount}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-emerald-500 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  {t('নতুন অ্যাকাউন্ট যোগ করুন', 'Add New Account')}
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div 
              key="step6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Check size={40} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('সবকিছু প্রস্তুত!', 'Everything is ready!')}</h2>
              <p className="text-slate-500 mb-12">{t('আপনার ডেটা সুরক্ষিত রাখতে লগইন করুন', 'Login to keep your data secure')}</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                  className="w-full bg-blue-600 text-white rounded-xl py-4 font-medium text-lg hover:bg-blue-700 transition-colors"
                >
                  {t('পহেলা ID দিয়ে লগইন করুন', 'Login with Pohela ID')}
                </button>
                <button 
                  onClick={() => {
                    window.location.href = '/register';
                  }}
                  className="w-full bg-slate-100 text-slate-900 rounded-xl py-4 font-medium text-lg hover:bg-slate-200 transition-colors"
                >
                  {t('নতুন পহেলা ID তৈরি করুন', 'Create new Pohela ID')}
                </button>
                <button 
                  onClick={handleNext}
                  className="w-full bg-emerald-50 text-emerald-700 rounded-xl py-4 font-medium text-lg hover:bg-emerald-100 transition-colors"
                >
                  {t('গেস্ট হিসেবে চালিয়ে যান', 'Continue as Guest')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      {step < 6 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
          <button 
            onClick={handleNext}
            disabled={(step === 2 && !occupation) || (step === 3 && !name.trim())}
            className="w-full bg-emerald-500 text-white rounded-xl py-4 font-medium text-lg shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {t('পরবর্তী ধাপ', 'Next Step')} <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
