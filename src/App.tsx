/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Filter, 
  Bell, 
  BellRing,
  FileText, 
  Plus, 
  Minus,
  Calculator, 
  Sparkles, 
  Home, 
  ArrowLeftRight, 
  ArrowRight,
  PieChart, 
  BarChart3,
  Briefcase, 
  Settings,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Clock,
  History,
  Edit2,
  Trash2,
  Pin,
  User,
  Star,
  Shield,
  Database,
  Layout,
  Info,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  PiggyBank,
  CreditCard,
  Utensils,
  ShoppingBag,
  Banknote,
  Bus,
  Zap,
  Tag,
  Gift,
  Layers,
  Users,
  ArrowLeft,
  CornerDownRight,
  Check,
  CheckCircle2,
  Circle,
  Upload,
  Download,
  Globe,
  Cloud,
  Moon,
  Award,
  Lightbulb,
  X,
  Archive,
  RotateCcw,
  Phone,
  Inbox,
  ShieldCheck,
  StickyNote,
  AlertCircle,
  ListTodo,
  Target,
  Repeat,
  Receipt,
  TrendingUp,
  MoreHorizontal,
  MoreVertical,
  LayoutGrid,
  List,
  LayoutDashboard,
  ScrollText,
  Activity,
  FolderKanban,
  CircleUserRound
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip as ReTooltip 
} from 'recharts';
import { cn } from './utils';

// --- Translations ---
type Language = 'en' | 'bn';

const translations = {
  en: {
    // Bottom Nav
    home: 'Home',
    history: 'History',
    analysis: 'Analysis',
    manage: 'Manage',
    settings: 'Settings',
    today: 'Today',
    yesterday: 'Yesterday',
    unknownDate: 'Unknown Date',
    // Settings
    personal: 'Personal',
    tapToViewProfile: 'Tap to view profile details',
    upgradeToPremium: 'Upgrade to Premium',
    claimAdFree: 'Claim Your Ad-Free Pass',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    switchLightDarkMode: 'Switch between light and dark mode',
    customizeLookFeel: 'Customize the look and feel of the app',
    editHomePage: 'Edit Home Page',
    customizeHomeLayout: 'Customize your home page layout and sections',
    preferences: 'Preferences',
    currency: 'Currency',
    chooseCurrency: 'Choose default currency',
    language: 'Language',
    chooseLanguage: 'Choose app language',
    appIcon: 'App Icon',
    changeAppIcon: 'Change app icon',
    security: 'Security',
    appLock: 'App Lock',
    requireAuth: 'Require authentication to open app',
    privacyMode: 'Privacy Mode',
    hideAmounts: 'Hide amounts when viewing the app',
    changePin: 'Change PIN',
    updatePin: 'Update your security PIN',
    exportPdfStatements: 'Export PDF statements for your records',
    pdfManager: 'PDF Manager',
    exportPdf: 'Export PDF',
    importPdf: 'Import PDF',
    recentActivity: 'Recent Activity',
    import: 'Import',
    export: 'Export',
    dataManagement: 'Data Management',
    manageAccounts: 'Manage Accounts',
    addEditManageAccounts: 'Add, edit, or manage your accounts',
    manageCategories: 'Manage Categories',
    addUpdateCategories: 'Add, or update categories',
    generateStatement: 'Generate Statement',
    createCustomStatements: 'Create custom statements as PDF',
    importTransactions: 'Import Transactions',
    importFromCsv: 'Import transactions from a CSV file',
    webCompanion: 'Web Companion',
    viewFromBrowser: 'View your transactions from a browser',
    dataBackup: 'Data & Backup',
    exportData: 'Export Data',
    downloadData: 'Download your data as CSV',
    notifications: 'Notifications',
    offerTitle: 'Special Offer',
    offerDesc: 'Get 50% off on Premium subscription today!',
    recurringTitle: 'Recurring Payment',
    recurringDesc: 'Netflix subscription is due tomorrow.',
    taskTitle: 'Task Reminder',
    taskDesc: 'Pay electricity bill by 5:00 PM.',
    dailyReminder: 'Daily Reminder',
    getRemindedToLog: 'Get reminded to log your transactions',
    expenseReminders: 'Expense Reminders',
    manageRecurringReminders: 'Manage recurring expense reminders',
    about: 'About',
    rateUs: 'Rate Us',
    leaveReview: 'Love the app? Leave a review on Play Store',
    inviteFriend: 'Invite a Friend',
    shareWithFriends: 'Share the app with friends & family',
    website: 'Website',
    visitWebsite: 'Visit our website for more information',
    version: 'Version',
    helpSupport: 'Help & Support',
    contactUs: 'Contact us for help',
    // Language Modal
    selectLanguage: 'Select Language',
    english: 'English',
    bengali: 'Bengali (বাংলা)',
    // Home
    totalBalance: 'Total Balance',
    income: 'Income',
    expense: 'Expense',
    receivable: 'Receivable',
    payable: 'Payable',
    savings: 'Savings',
    invest: 'Invest',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    noRecentTransactions: 'No recent transactions.',
    // History
    searchTransactions: 'Search transactions...',
    all: 'All',
    dena: 'Dena',
    paona: 'Paona',
    taken: 'Taken',
    given: 'Given',
    received: 'Received',
    joma: 'Joma',
    noTransactionsFound: 'No transactions found.',
    items: 'Items',
    filteredIncome: 'Filtered Income',
    filteredExpense: 'Filtered Expense',
    transactions: 'Transactions',
    contactDetails: 'Contact Details',
    profileView: 'Profile View',
    repayment: 'Repayment',
    pending: 'Pending',
    balanceUpdated: 'Balance Updated',
    paymentStatus: 'Payment Status',
    collection: 'Collection',
    due: 'Due',
    paymentHistory: 'Payment History',
    paidCollected: 'Paid/Collected',
    personOrg: 'Person/Org',
    date: 'Date',
    time: 'Time',
    dateTime: 'Date & Time',
    location: 'Location',
    notes: 'Notes',
    receipt: 'Receipt',
    normal: 'Normal',
    recurring: 'Recurring',
    subscription: 'Subscription',
    fromAccount: 'From Account',
    toAccount: 'To Account',
    category: 'Category',
    description: 'Description',
    selectSubCategory: 'Select Sub-Category',
    person: 'Person',
    whoWith: 'Who with?',
    where: 'Where?',
    enterNewPersonName: 'Enter new person name:',
    addNew: 'Add New',
    reminder: 'Reminder',
    setAlert: 'Set Alert',
    addNotesPlaceholder: 'Add some details about this transaction...',
    uploadReceiptPhoto: 'Upload Receipt Photo',
    searchEverything: 'Search everything...',
    noResultsFoundFor: 'No results found for',
    addReminder: 'Add Reminder',
    quickAdd: 'Quick Add',
    tomorrow: 'Tomorrow',
    after1Month: 'After 1 Month',
    after1Year: 'After 1 Year',
    savedReminders: 'Saved Reminders',
    noDate: 'No Date',
    noSavedReminders: 'No saved reminders found.',
    accounts: 'Accounts',
    freePlan: 'Free Plan',
    newWorkspace: 'New workspace',
    addAnAccount: 'Add an account',
    logOutAll: 'Log out all',
    name: 'Name',
    reminderNamePlaceholder: 'Enter reminder name',
    icon: 'Icon',
    remindMe: 'Remind Me',
    atTimeOfEvent: 'At time of event',
    '1MinuteBefore': '1 minute before',
    '2MinutesBefore': '2 minutes before',
    '3MinutesBefore': '3 minutes before',
    '4MinutesBefore': '4 minutes before',
    '5MinutesBefore': '5 minutes before',
    '10MinutesBefore': '10 minutes before',
    ringtone: 'Ringtone',
    noAlarm: 'No Alarm',
    defaultRingtone: 'Default Ringtone',
    chime: 'Chime',
    radar: 'Radar',
    beacon: 'Beacon',
    circuit: 'Circuit',
    selectIcon: 'Select Icon',
    personalWallet: 'Personal Wallet',
    businessAccount: 'Business Account',
    familyExpense: 'Family Expense',
    settlementOverview: 'Settlement Overview',
    totalGroupSpend: 'Total Group Spend',
    youOweInTotal: 'You owe in total',
    expenseBreakdown: 'Expense Breakdown',
    whoOwesWhat: 'Who owes what',
    settleUp: 'Settle Up',
    ledger: 'Ledger',
    uncategorized: 'Uncategorized',
    categoryDetails: 'Category Details',
    accountDetails: 'Account Details',
    // Analysis
    overview: 'Overview',
    incomeVsExpense: 'Income vs Expense',
    // Management Sections
    basicSetup: 'Basic Setup',
    coreData: 'Core Data',
    moneyManagement: 'Money Management',
    planning: 'Planning',
    assetsLiabilities: 'Assets & Liabilities',
    wealth: 'Wealth',
    transactionStatus: 'Transaction Status',
    tracking: 'Tracking',
    personalOrganization: 'Personal Organization',
    productivity: 'Productivity',
    // Management Items
    categories: 'Categories',
    subCategories: 'Sub Categories',
    contacts: 'Contacts',
    budgets: 'Budgets',
    financialGoals: 'Financial Goals',
    investments: 'Investments',
    fixedDeposits: 'Fixed Deposits',
    payables: 'Payables',
    receivables: 'Receivables',
    receipts: 'Receipts',
    tasks: 'Tasks',
    reminders: 'Reminders',
    // Add Transaction
    addTransaction: 'Add Transaction',
    editTransaction: 'Edit Transaction',
    amount: 'Amount',
    type: 'Type',
    subCategory: 'Sub Category',
    account: 'Account',
    note: 'Note',
    moreOptions: 'More Options',
    status: 'Status',
    save: 'Save',
    update: 'Update',
    transfer: 'Transfer',
    selectAccount: 'Select Account',
    selectCategory: 'Select Category',
    selectPerson: 'Select Person',
    selectReminder: 'Select Reminder',
    quickAmount: 'Quick Amount',
    calculator: 'Calculator',
    tags: 'Tags',
    repeat: 'Repeat',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    // Categories
    foodDrinks: 'Food & Drinks',
    shopping: 'Shopping',
    transport: 'Transport',
    utilities: 'Utilities',
    others: 'Others',
    salary: 'Salary',
    business: 'Business',
    gift: 'Gift',
    loan: 'Loan',
    credit: 'Credit',
    lending: 'Lending',
    refund: 'Refund',
    stocks: 'Stocks',
    crypto: 'Crypto',
    dinner: 'Dinner',
    lunch: 'Lunch',
    electronics: 'Electronics',
    groceries: 'Groceries',
    family: 'Family',
    cash: 'Cash',
    bankAccount: 'Bank Account',
    mobileFinancialService: 'Mobile Financial Service',
    payment: 'Payment',
    rentPayment: 'Rent Payment',
    electricityBill: 'Electricity Bill',
    internetBill: 'Internet Bill',
    pdfExportTriggered: 'PDF Export Triggered',
    expenseDistribution: 'Expense Distribution',
    averageDailySpend: 'Average Daily Spend',
    lowerThanLastMonth: 'Lower than last month',
    monthlyTrend: 'Monthly Trend',
    topSpending: 'Top Spending Categories',
    savingsRate: 'Savings Rate',
    total: 'Total',
    categoryTrends: 'Category Trends',
    repaid: 'Repaid',
    collected: 'Collected',
    balance: 'Balance',
    savingsTotal: 'Savings Total',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    debt: 'Debt',
    search: 'Search...',
    noCurrenciesFound: 'No currencies found',
    summaryGridItems: 'Summary Grid Items',
    otherSections: 'Other Sections',
    latestTransactionsList: 'Latest transactions list',
    securityBanner: 'Security Banner',
    safetyTipsSetupBanner: 'Safety tips and setup banner',
    secureYourData: 'Secure Your Data',
    secureYourDataDesc: 'Enable biometric lock and cloud backup to keep your financial records safe and accessible anywhere.',
    setupSecurity: 'Setup Security',
    newWallet: 'New Wallet',
    newReminder: 'New Reminder',
    transactionReminder: 'Transaction Reminder',
    saveWallet: 'Save Wallet',
    accountType: 'Account Type',
    typeNamePlaceholder: 'Type name...',
    cancel: 'Cancel',
    more: 'More',
    whatWasThisFor: 'What was this for?',
    moneyGivenToYou: 'Money given to you',
    moneyYouGave: 'Money you gave',
    moneyYouOwe: 'Money you owe',
    moneyOwedToYou: 'Money owed to you',
    moneyYouReceived: 'Money you received',
    myProfile: 'My Profile',
    assetsAndSavings: 'Assets & Savings',
    deposit: 'Deposit',
    investment: 'Investment',
    totalInvested: 'Total Invested',
    totalSavings: 'Total Savings',
    noSubCategoriesFound: 'No sub-categories found',
    clickNewButtonToAddFirstItem: 'Click (+ New) button to add your first item.',
    parentCategory: 'Parent Category',
    selectParentCategory: 'Select Parent Category',
    selectColor: 'Select Color',
    selectIconOrImage: 'Select Icon or Image',
    jpgPngUpTo5Mb: 'JPG, PNG up to 5MB',
    transactionType: 'Transaction Type',
    noManagementItemsFound: 'No management items found',
    managementNotePlaceholder: 'Write note...',
    managementNoteContent: 'Note Content',
    autoAddedFromTransaction: 'Auto-added from transaction',
    managementNote: 'Note',
    myWallet: 'My Wallet',
    editWallet: 'Edit Wallet',
    addWallet: 'Add Wallet',
    pinToTop: 'Pin to Top',
    pinToTopDesc: 'Always show this wallet at the top',
    setAsDefault: 'Set as Default',
    setAsDefaultDesc: 'Use this wallet for new transactions',
    includeInTotal: 'Include in Total',
    includeInTotalDesc: 'Include this balance in total overview',
    dashboard: 'Dashboard',
    debtsAndLoans: 'Debts & Loans',
    managementTaskTitle: 'Task Title',
    enterTaskTitle: 'Enter task title...',
    dueDate: 'Due Date',
    priority: 'Priority',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    widget: 'Widget',
    widgetDesc: 'Enable home screen widget',
    floatingBubble: 'Floating Bubble',
    floatingBubbleDesc: 'Enable floating bubble for quick access',
    widgetSettings: 'Widget Settings',
    floatingBubbleSettings: 'Floating Bubble Settings',
    enableWidget: 'Enable Widget',
    enableFloatingBubble: 'Enable Floating Bubble',
    widgetStyle: 'Widget Style',
    bubbleStyle: 'Bubble Style',
    transparent: 'Transparent',
    solid: 'Solid',
    small: 'Small',
    large: 'Large',
    opacity: 'Opacity',
    size: 'Size',
  },
  bn: {
    // Bottom Nav
    home: 'হোম',
    history: 'হিসাব',
    analysis: 'বিশ্লেষণ',
    manage: 'ম্যানেজ',
    settings: 'সেটিংস',
    today: 'আজ',
    yesterday: 'গতকাল',
    unknownDate: 'অজানা তারিখ',
    // Settings
    personal: 'ব্যক্তিগত',
    tapToViewProfile: 'প্রোফাইল দেখতে ট্যাপ করুন',
    upgradeToPremium: 'প্রিমিয়ামে আপগ্রেড করুন',
    claimAdFree: 'অ্যাড-ফ্রি পাস দাবি করুন',
    appearance: 'চেহারা',
    darkMode: 'ডার্ক মোড',
    switchLightDarkMode: 'লাইট এবং ডার্ক মোডের মধ্যে পরিবর্তন করুন',
    customizeLookFeel: 'অ্যাপের চেহারা এবং অনুভূতি কাস্টমাইজ করুন',
    editHomePage: 'হোম পেজ এডিট',
    customizeHomeLayout: 'আপনার হোম পেজ লেআউট এবং সেকশন কাস্টমাইজ করুন',
    preferences: 'পছন্দসমূহ',
    currency: 'মুদ্রা',
    chooseCurrency: 'ডিফল্ট মুদ্রা বেছে নিন',
    language: 'ভাষা',
    chooseLanguage: 'অ্যাপের ভাষা বেছে নিন',
    appIcon: 'অ্যাপ আইকন',
    changeAppIcon: 'অ্যাপ আইকন পরিবর্তন করুন',
    security: 'নিরাপত্তা',
    appLock: 'অ্যাপ লক',
    requireAuth: 'অ্যাপ খুলতে প্রমাণীকরণ প্রয়োজন',
    privacyMode: 'প্রাইভেসি মোড',
    hideAmounts: 'অ্যাপ দেখার সময় পরিমাণ লুকান',
    changePin: 'পিন পরিবর্তন করুন',
    updatePin: 'আপনার নিরাপত্তা পিন আপডেট করুন',
    exportPdfStatements: 'রেকর্ডের জন্য পিডিএফ স্টেটমেন্ট এক্সপোর্ট করুন',
    pdfManager: 'পিডিএফ ম্যানেজার',
    exportPdf: 'এক্সপোর্ট পিডিএফ',
    importPdf: 'ইমপোর্ট পিডিএফ',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    import: 'ইমপোর্ট',
    export: 'এক্সপোর্ট',
    dataManagement: 'ডেটা ম্যানেজমেন্ট',
    manageAccounts: 'অ্যাকাউন্ট ম্যানেজ করুন',
    addEditManageAccounts: 'আপনার অ্যাকাউন্ট যোগ, সম্পাদনা বা পরিচালনা করুন',
    manageCategories: 'ক্যাটাগরি ম্যানেজ করুন',
    addUpdateCategories: 'ক্যাটাগরি যোগ বা আপডেট করুন',
    generateStatement: 'স্টেটমেন্ট তৈরি করুন',
    createCustomStatements: 'পিডিএফ হিসেবে কাস্টম স্টেটমেন্ট তৈরি করুন',
    importTransactions: 'লেনদেন ইমপোর্ট করুন',
    importFromCsv: 'CSV ফাইল থেকে লেনদেন ইমপোর্ট করুন',
    webCompanion: 'ওয়েব কম্প্যানিয়ন',
    viewFromBrowser: 'ব্রাউজার থেকে আপনার লেনদেন দেখুন',
    dataBackup: 'ডেটা এবং ব্যাকআপ',
    exportData: 'ডেটা এক্সপোর্ট করুন',
    downloadData: 'CSV হিসেবে আপনার ডেটা ডাউনলোড করুন',
    notifications: 'বিজ্ঞপ্তি',
    offerTitle: 'বিশেষ অফার',
    offerDesc: 'আজ প্রিমিয়াম সাবস্ক্রিপশনে ৫০% ছাড় পান!',
    recurringTitle: 'পুনরাবৃত্ত পেমেন্ট',
    recurringDesc: 'আগামীকাল নেটফ্লিক্স সাবস্ক্রিপশন দিতে হবে।',
    taskTitle: 'টাস্ক রিমাইন্ডার',
    taskDesc: 'বিকেল ৫টার মধ্যে বিদ্যুৎ বিল পরিশোধ করুন।',
    dailyReminder: 'দৈনিক রিমাইন্ডার',
    getRemindedToLog: 'আপনার লেনদেন লগ করার জন্য রিমাইন্ডার পান',
    expenseReminders: 'খরচের রিমাইন্ডার',
    manageRecurringReminders: 'পুনরাবৃত্ত খরচের রিমাইন্ডার পরিচালনা করুন',
    about: 'সম্পর্কে',
    rateUs: 'আমাদের রেট দিন',
    leaveReview: 'অ্যাপটি পছন্দ করেন? প্লে স্টোরে একটি রিভিউ দিন',
    inviteFriend: 'বন্ধুকে আমন্ত্রণ জানান',
    shareWithFriends: 'বন্ধুদের এবং পরিবারের সাথে অ্যাপটি শেয়ার করুন',
    website: 'ওয়েবসাইট',
    visitWebsite: 'আরও তথ্যের জন্য আমাদের ওয়েবসাইট ভিজিট করুন',
    version: 'সংস্করণ',
    helpSupport: 'সাহায্য এবং সমর্থন',
    contactUs: 'সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন',
    // Language Modal
    selectLanguage: 'ভাষা নির্বাচন করুন',
    english: 'English',
    bengali: 'Bengali (বাংলা)',
    // Home
    totalBalance: 'মোট ব্যালেন্স',
    income: 'আয়',
    expense: 'ব্যয়',
    receivable: 'পাওনা',
    payable: 'দেনা',
    savings: 'জমা',
    invest: 'বিনিয়োগ',
    recentTransactions: 'সাম্প্রতিক লেনদেন',
    viewAll: 'সব দেখুন',
    noRecentTransactions: 'কোনো সাম্প্রতিক লেনদেন নেই।',
    // History
    searchTransactions: 'লেনদেন খুঁজুন...',
    all: 'সব',
    dena: 'দেনা',
    paona: 'পাওনা',
    taken: 'নেওয়া',
    given: 'দেওয়া',
    received: 'প্রাপ্ত',
    joma: 'জমা',
    noTransactionsFound: 'কোনো লেনদেন পাওয়া যায়নি।',
    items: 'আইটেম',
    filteredIncome: 'ফিল্টার করা আয়',
    filteredExpense: 'ফিল্টার করা খরচ',
    transactions: 'লেনদেনসমূহ',
    contactDetails: 'যোগাযোগের বিবরণ',
    profileView: 'প্রোফাইল ভিউ',
    repayment: 'পরিশোধ',
    pending: 'অপেক্ষমাণ',
    balanceUpdated: 'ব্যালেন্স আপডেট করা হয়েছে',
    paymentStatus: 'পেমেন্ট স্ট্যাটাস',
    collection: 'সংগ্রহ',
    due: 'বাকি',
    paymentHistory: 'পেমেন্ট হিস্ট্রি',
    paidCollected: 'প্রদত্ত/সংগৃহীত',
    personOrg: 'ব্যক্তি/প্রতিষ্ঠান',
    date: 'তারিখ',
    time: 'সময়',
    dateTime: 'তারিখ ও সময়',
    location: 'অবস্থান',
    notes: 'নোট',
    receipt: 'রসিদ',
    normal: 'সাধারণ',
    recurring: 'পুনরাবৃত্ত',
    subscription: 'সাবস্ক্রিপশন',
    fromAccount: 'যে অ্যাকাউন্ট থেকে',
    toAccount: 'যে অ্যাকাউন্টে',
    category: 'ক্যাটাগরি',
    description: 'বিবরণ',
    selectSubCategory: 'সাব-ক্যাটাগরি নির্বাচন করুন',
    person: 'ব্যক্তি',
    whoWith: 'কার সাথে?',
    where: 'কোথায়?',
    enterNewPersonName: 'নতুন ব্যক্তির নাম লিখুন:',
    addNew: 'নতুন যোগ করুন',
    reminder: 'রিমাইন্ডার',
    setAlert: 'অ্যালার্ট সেট করুন',
    addNotesPlaceholder: 'এই লেনদেন সম্পর্কে কিছু বিবরণ যোগ করুন...',
    uploadReceiptPhoto: 'রসিদের ছবি আপলোড করুন',
    searchEverything: 'সবকিছু খুঁজুন...',
    noResultsFoundFor: 'এর জন্য কোনো ফলাফল পাওয়া যায়নি',
    addReminder: 'রিমাইন্ডার যোগ করুন',
    quickAdd: 'কুইক অ্যাড',
    tomorrow: 'আগামীকাল',
    after1Month: '১ মাস পর',
    after1Year: '১ বছর পর',
    savedReminders: 'সংরক্ষিত রিমাইন্ডার',
    noDate: 'কোনো তারিখ নেই',
    noSavedReminders: 'কোনো সংরক্ষিত রিমাইন্ডার পাওয়া যায়নি।',
    accounts: 'অ্যাকাউন্টস',
    freePlan: 'ফ্রি প্ল্যান',
    newWorkspace: 'নতুন ওয়ার্কস্পেস',
    addAnAccount: 'একটি অ্যাকাউন্ট যোগ করুন',
    logOutAll: 'সব লগ আউট করুন',
    name: 'নাম',
    reminderNamePlaceholder: 'রিমাইন্ডারের নাম লিখুন',
    icon: 'আইকন',
    remindMe: 'আমাকে মনে করিয়ে দিন',
    atTimeOfEvent: 'ইভেন্টের সময়',
    '1MinuteBefore': '১ মিনিট আগে',
    '2MinutesBefore': '২ মিনিট আগে',
    '3MinutesBefore': '৩ মিনিট আগে',
    '4MinutesBefore': '৪ মিনিট আগে',
    '5MinutesBefore': '৫ মিনিট আগে',
    '10MinutesBefore': '১০ মিনিট আগে',
    ringtone: 'রিংটোন',
    noAlarm: 'কোন অ্যালার্ম নেই',
    defaultRingtone: 'ডিফল্ট রিংটোন',
    chime: 'চাইম',
    radar: 'রাডার',
    beacon: 'বীকন',
    circuit: 'সার্কিট',
    selectIcon: 'আইকন নির্বাচন করুন',
    personalWallet: 'ব্যক্তিগত ওয়ালেট',
    businessAccount: 'ব্যবসায়িক অ্যাকাউন্ট',
    familyExpense: 'পারিবারিক খরচ',
    settlementOverview: 'নিষ্পত্তি ওভারভিউ',
    totalGroupSpend: 'মোট গ্রুপ খরচ',
    youOweInTotal: 'আপনার মোট দেনা',
    expenseBreakdown: 'খরচের বিবরণ',
    whoOwesWhat: 'কার কত দেনা',
    settleUp: 'নিষ্পত্তি করুন',
    ledger: 'লেজার',
    uncategorized: 'শ্রেণীভুক্ত নয়',
    categoryDetails: 'ক্যাটাগরি বিবরণ',
    accountDetails: 'অ্যাকাউন্ট বিবরণ',
    // Analysis
    overview: 'সংক্ষিপ্তসার',
    incomeVsExpense: 'আয় বনাম ব্যয়',
    // Management Sections
    basicSetup: 'প্রাথমিক সেটআপ',
    coreData: 'কোর ডেটা',
    moneyManagement: 'মানি ম্যানেজমেন্ট',
    planning: 'পরিকল্পনা',
    assetsLiabilities: 'সম্পদ ও দায়',
    wealth: 'সম্পদ',
    transactionStatus: 'লেনদেনের অবস্থা',
    tracking: 'ট্র্যাকিং',
    personalOrganization: 'ব্যক্তিগত সংগঠন',
    productivity: 'উৎপাদনশীলতা',
    // Management Items
    categories: 'ক্যাটাগরি',
    subCategories: 'সাব ক্যাটাগরি',
    contacts: 'পরিচিতি',
    budgets: 'বাজেট',
    financialGoals: 'আর্থিক লক্ষ্য',
    investments: 'বিনিয়োগ',
    fixedDeposits: 'ফিক্সড ডিপোজিট',
    payables: 'পাওনা',
    receivables: 'দেনা',
    receipts: 'রসিদ',
    tasks: 'টাস্ক',
    reminders: 'রিমাইন্ডার',
    // Add Transaction
    addTransaction: 'লেনদেন যোগ করুন',
    editTransaction: 'লেনদেন সম্পাদনা করুন',
    amount: 'পরিমাণ',
    type: 'ধরন',
    subCategory: 'সাব ক্যাটাগরি',
    account: 'অ্যাকাউন্ট',
    note: 'নোট',
    moreOptions: 'আরও বিকল্প',
    status: 'স্ট্যাটাস',
    save: 'সংরক্ষণ করুন',
    update: 'আপডেট করুন',
    transfer: 'স্থানান্তর',
    selectAccount: 'অ্যাকাউন্ট নির্বাচন করুন',
    selectCategory: 'ক্যাটাগরি নির্বাচন করুন',
    selectPerson: 'ব্যক্তি নির্বাচন করুন',
    selectReminder: 'রিমাইন্ডার নির্বাচন করুন',
    quickAmount: 'কুইক অ্যামাউন্ট',
    calculator: 'ক্যালকুলেটর',
    tags: 'ট্যাগ',
    repeat: 'পুনরাবৃত্তি',
    daily: 'দৈনিক',
    weekly: 'সাপ্তাহিক',
    monthly: 'মাসিক',
    yearly: 'বার্ষিক',
    // Categories
    foodDrinks: 'খাবার ও পানীয়',
    shopping: 'কেনাকাটা',
    transport: 'পরিবহন',
    utilities: 'ইউটিলিটি',
    others: 'অন্যান্য',
    salary: 'বেতন',
    business: 'ব্যবসা',
    gift: 'উপহার',
    loan: 'ঋণ',
    credit: 'ক্রেডিট',
    lending: 'ধার দেওয়া',
    refund: 'রিফান্ড',
    stocks: 'স্টক',
    crypto: 'ক্রিপ্টো',
    dinner: 'রাতের খাবার',
    lunch: 'দুপুরের খাবার',
    electronics: 'ইলেকট্রনিক্স',
    groceries: 'মুদি',
    family: 'পরিবার',
    cash: 'নগদ',
    bankAccount: 'ব্যাংক অ্যাকাউন্ট',
    mobileFinancialService: 'মোবাইল আর্থিক পরিষেবা',
    payment: 'পেমেন্ট',
    rentPayment: 'বাড়ি ভাড়া',
    electricityBill: 'বিদ্যুৎ বিল',
    internetBill: 'ইন্টারনেট বিল',
    pdfExportTriggered: 'পিডিএফ এক্সপোর্ট শুরু হয়েছে',
    expenseDistribution: 'খরচ বণ্টন',
    averageDailySpend: 'গড় দৈনিক ব্যয়',
    lowerThanLastMonth: 'গত মাসের তুলনায় কম',
    monthlyTrend: 'মাসিক ট্রেন্ড',
    topSpending: 'শীর্ষ ব্যয় বিভাগ',
    savingsRate: 'সঞ্চয় হার',
    total: 'মোট',
    categoryTrends: 'ক্যাটাগরি ট্রেন্ডস',
    repaid: 'পরিশোধিত',
    collected: 'সংগৃহীত',
    balance: 'ব্যালেন্স',
    savingsTotal: 'মোট সঞ্চয়',
    week: 'সপ্তাহ',
    month: 'মাস',
    year: 'বছর',
    debt: 'দেনা',
    search: 'খুঁজুন...',
    noCurrenciesFound: 'কোনো মুদ্রা পাওয়া যায়নি',
    summaryGridItems: 'সারাংশ গ্রিড আইটেম',
    otherSections: 'অন্যান্য সেকশন',
    latestTransactionsList: 'সাম্প্রতিক লেনদেনের তালিকা',
    securityBanner: 'নিরাপত্তা ব্যানার',
    safetyTipsSetupBanner: 'নিরাপত্তা টিপস এবং সেটআপ ব্যানার',
    secureYourData: 'আপনার তথ্য সুরক্ষিত রাখুন',
    secureYourDataDesc: 'আপনার আর্থিক রেকর্ড নিরাপদ এবং যেকোনো জায়গায় অ্যাক্সেসযোগ্য রাখতে বায়োমেট্রিক লক এবং ক্লাউড ব্যাকআপ সক্ষম করুন।',
    setupSecurity: 'নিরাপত্তা সেটআপ করুন',
    newWallet: 'নতুন ওয়ালেট',
    newReminder: 'নতুন রিমাইন্ডার',
    transactionReminder: 'লেনদেন রিমাইন্ডার',
    saveWallet: 'ওয়ালেট সংরক্ষণ করুন',
    accountType: 'অ্যাকাউন্টের ধরন',
    typeNamePlaceholder: 'ধরন লিখুন...',
    cancel: 'বাতিল',
    more: 'আরও',
    whatWasThisFor: 'এটি কিসের জন্য ছিল?',
    moneyGivenToYou: 'আপনাকে দেওয়া টাকা',
    moneyYouGave: 'আপনি যে টাকা দিয়েছেন',
    moneyYouOwe: 'আপনার কাছে যে টাকা পাওনা',
    moneyOwedToYou: 'আপনি যে টাকা পাবেন',
    moneyYouReceived: 'আপনি যে টাকা পেয়েছেন',
    myProfile: 'আমার প্রোফাইল',
    assetsAndSavings: 'সম্পদ ও সঞ্চয়',
    deposit: 'ডিপোজিট',
    investment: 'বিনিয়োগ',
    totalInvested: 'মোট বিনিয়োগ',
    totalSavings: 'মোট সঞ্চয়',
    noSubCategoriesFound: 'কোন সাব ক্যাটাগরি পাওয়া যায়নি',
    clickNewButtonToAddFirstItem: 'আপনার প্রথম আইটেম যোগ করতে (+ New) বাটনে ক্লিক করুন।',
    parentCategory: 'প্যারেন্ট ক্যাটাগরি',
    selectParentCategory: 'প্যারেন্ট ক্যাটাগরি নির্বাচন করুন',
    selectColor: 'রঙ নির্বাচন করুন',
    selectIconOrImage: 'আইকন বা ছবি নির্বাচন করুন',
    jpgPngUpTo5Mb: 'JPG, PNG ৫ মেগাবাইট পর্যন্ত',
    transactionType: 'লেনদেনের ধরন',
    noManagementItemsFound: 'কোন ম্যানেজমেন্ট আইটেম পাওয়া যায়নি',
    managementNotePlaceholder: 'নোট লিখুন...',
    managementNoteContent: 'নোটের বিবরণ',
    autoAddedFromTransaction: 'লেনদেন থেকে অটো যুক্ত হয়েছে',
    managementNote: 'নোট',
    myWallet: 'আমার ওয়ালেট',
    editWallet: 'ওয়ালেট এডিট করুন',
    addWallet: 'ওয়ালেট যোগ করুন',
    pinToTop: 'উপরে পিন করুন',
    pinToTopDesc: 'সবসময় এই ওয়ালেটটি উপরে দেখান',
    setAsDefault: 'ডিফল্ট হিসেবে সেট করুন',
    setAsDefaultDesc: 'নতুন লেনদেনের জন্য এই ওয়ালেটটি ব্যবহার করুন',
    includeInTotal: 'মোট পরিমাণে অন্তর্ভুক্ত করুন',
    includeInTotalDesc: 'মোট ওভারভিউতে এই ব্যালেন্সটি অন্তর্ভুক্ত করুন',
    dashboard: 'ড্যাশবোর্ড',
    debtsAndLoans: 'দেনা এবং পাওনা',
    managementTaskTitle: 'টাস্ক শিরোনাম',
    enterTaskTitle: 'টাস্ক শিরোনাম লিখুন...',
    dueDate: 'শেষ তারিখ',
    priority: 'অগ্রাধিকার',
    low: 'কম',
    medium: 'মাঝারি',
    high: 'বেশি',
    widget: 'উইজেট',
    widgetDesc: 'হোম স্ক্রিন উইজেট চালু করুন',
    floatingBubble: 'ফ্লোটিং বাবল',
    floatingBubbleDesc: 'দ্রুত অ্যাক্সেসের জন্য ফ্লোটিং বাবল চালু করুন',
    widgetSettings: 'উইজেট সেটিংস',
    floatingBubbleSettings: 'ফ্লোটিং বাবল সেটিংস',
    enableWidget: 'উইজেট চালু করুন',
    enableFloatingBubble: 'ফ্লোটিং বাবল চালু করুন',
    widgetStyle: 'উইজেট স্টাইল',
    bubbleStyle: 'বাবল স্টাইল',
    transparent: 'স্বচ্ছ',
    solid: 'সলিড',
    small: 'ছোট',
    large: 'বড়',
    opacity: 'অস্বচ্ছতা',
    size: 'আকার',
  }
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  country: string;
  icon: string;
  flagCode: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', icon: '🇧🇩', flagCode: 'bd' },
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', icon: '🇺🇸', flagCode: 'us' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', icon: '🇪🇺', flagCode: 'eu' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', icon: '🇬🇧', flagCode: 'gb' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', icon: '🇮🇳', flagCode: 'in' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', icon: '🇦🇺', flagCode: 'au' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', icon: '🇨🇦', flagCode: 'ca' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', icon: '🇸🇬', flagCode: 'sg' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'United Arab Emirates', icon: '🇦🇪', flagCode: 'ae' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia', icon: '🇸🇦', flagCode: 'sa' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', icon: '🇲🇾', flagCode: 'my' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', icon: '🇯🇵', flagCode: 'jp' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', icon: '🇨🇳', flagCode: 'cn' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan', icon: '🇵🇰', flagCode: 'pk' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', country: 'Sri Lanka', icon: '🇱🇰', flagCode: 'lk' },
  { code: 'NPR', symbol: 'रु', name: 'Nepalese Rupee', country: 'Nepal', icon: '🇳🇵', flagCode: 'np' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', icon: '🇧🇷', flagCode: 'br' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia', icon: '🇷🇺', flagCode: 'ru' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', icon: '🇿🇦', flagCode: 'za' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', icon: '🇹🇷', flagCode: 'tr' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', icon: '🇰🇷', flagCode: 'kr' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', icon: '🇮🇩', flagCode: 'id' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', icon: '🇹🇭', flagCode: 'th' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', icon: '🇻🇳', flagCode: 'vn' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', icon: '🇵🇭', flagCode: 'ph' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', country: 'Egypt', icon: '🇪🇬', flagCode: 'eg' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria', icon: '🇳🇬', flagCode: 'ng' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya', icon: '🇰🇪', flagCode: 'ke' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', country: 'Ghana', icon: '🇬🇭', flagCode: 'gh' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico', icon: '🇲🇽', flagCode: 'mx' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', country: 'Argentina', icon: '🇦🇷', flagCode: 'ar' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', country: 'Colombia', icon: '🇨🇴', flagCode: 'co' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', country: 'Chile', icon: '🇨🇱', flagCode: 'cl' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', country: 'Peru', icon: '🇵🇪', flagCode: 'pe' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland', icon: '🇨🇭', flagCode: 'ch' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', icon: '🇸🇪', flagCode: 'se' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', icon: '🇳🇴', flagCode: 'no' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', icon: '🇩🇰', flagCode: 'dk' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', country: 'Poland', icon: '🇵🇱', flagCode: 'pl' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic', icon: '🇨🇿', flagCode: 'cz' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary', icon: '🇭🇺', flagCode: 'hu' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', country: 'Romania', icon: '🇷🇴', flagCode: 'ro' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', country: 'Bulgaria', icon: '🇧🇬', flagCode: 'bg' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', country: 'Croatia', icon: '🇭🇷', flagCode: 'hr' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar', country: 'Serbia', icon: '🇷🇸', flagCode: 'rs' },
  { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark', country: 'Bosnia and Herzegovina', icon: '🇧🇦', flagCode: 'ba' },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek', country: 'Albania', icon: '🇦🇱', flagCode: 'al' },
  { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar', country: 'North Macedonia', icon: '🇲🇰', flagCode: 'mk' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', country: 'Iceland', icon: '🇮🇸', flagCode: 'is' },
];

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: keyof typeof translations['en']) => string;
  formatAmount: (amount: number) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  currency: CURRENCIES[0],
  setCurrency: () => {},
  t: (key) => translations['en'][key],
  formatAmount: (amount) => amount.toLocaleString(),
});

export const useLanguage = () => useContext(LanguageContext);

// --- Mock Data ---
const SUMMARY_DATA = [
  { label: 'Income', value: 0, icon: ArrowDownLeft, color: 'bg-emerald-500' },
  { label: 'Expense', value: 0, icon: ArrowUpRight, color: 'bg-rose-500' },
  { label: 'Receivable', value: 0, icon: CreditCard, color: 'bg-amber-500' },
  { label: 'Payable', value: 0, icon: History, color: 'bg-indigo-500' },
  { label: 'Savings', value: 0, icon: PiggyBank, color: 'bg-cyan-500' },
];

const TRANSACTIONS = [
  {
    id: 'tx-1',
    category: 'Food',
    subCategory: 'Dinner',
    type: 'expense',
    amount: 450,
    date: new Date().toLocaleDateString('en-CA'),
    time: '08:30 PM',
    notes: 'Dinner with friends at Italian place',
    location: 'Little Italy, NY',
    reminder: true,
    icon: 'Utensils',
    account: 'Cash',
    accountIcon: 'Wallet',
    accountColor: '#10b981',
    status: 'Normal'
  },
  {
    id: 'tx-2',
    category: 'Salary',
    subCategory: 'Monthly Pay',
    type: 'income',
    amount: 25000,
    date: new Date().toLocaleDateString('en-CA'),
    time: '10:00 AM',
    notes: 'Monthly salary credit',
    location: 'Remote',
    reminder: false,
    icon: 'Banknote',
    account: 'Bank Account',
    accountIcon: 'Database',
    accountColor: '#3b82f6',
    status: 'Normal'
  },
  {
    id: 'tx-3',
    category: 'Shopping',
    subCategory: 'Electronics',
    type: 'expense',
    amount: 1200,
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-CA'),
    time: '03:15 PM',
    notes: 'New monitor for setup',
    location: 'Best Buy',
    reminder: false,
    icon: 'ShoppingBag',
    account: 'Nagad',
    accountIcon: 'Smartphone',
    accountColor: '#ef4444',
    status: 'Normal'
  },
  {
    id: 'tx-4',
    txName: 'Borrowed from Rahim',
    category: 'Debt',
    type: 'dena',
    amount: 5000,
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-CA'),
    time: '11:00 AM',
    notes: 'For emergency medical expense',
    person: 'Rahim',
    account: 'Cash',
    accountIcon: 'Wallet',
    accountColor: '#10b981',
    addToIncome: true,
    status: 'Pending'
  },
  {
    id: 'tx-5',
    txName: 'Lent to Karim',
    category: 'Loan',
    type: 'paona',
    amount: 2000,
    date: new Date(Date.now() - 259200000).toLocaleDateString('en-CA'),
    time: '02:00 PM',
    notes: 'Personal loan',
    person: 'Karim',
    account: 'Bank Account',
    accountIcon: 'Database',
    accountColor: '#3b82f6',
    addToExpense: true,
    status: 'Normal'
  },
  {
    id: 'tx-6',
    txName: 'Savings for Hajj',
    category: 'Savings',
    type: 'joma',
    amount: 10000,
    date: new Date(Date.now() - 345600000).toLocaleDateString('en-CA'),
    time: '09:00 AM',
    notes: 'Monthly savings',
    account: 'Bank Account',
    accountIcon: 'Database',
    accountColor: '#3b82f6',
    status: 'Recurring'
  },
  {
    id: 'tx-7',
    txName: 'Stock Investment',
    category: 'Investment',
    type: 'invest',
    amount: 15000,
    date: new Date(Date.now() - 432000000).toLocaleDateString('en-CA'),
    time: '10:30 AM',
    notes: 'Bought AAPL stocks',
    account: 'Bank Account',
    accountIcon: 'Database',
    accountColor: '#3b82f6',
    status: 'Normal'
  },
  {
    id: 'tx-8',
    txName: 'Transfer to Nagad',
    category: 'Transfer',
    type: 'transfer',
    amount: 3000,
    date: new Date(Date.now() - 518400000).toLocaleDateString('en-CA'),
    time: '04:00 PM',
    notes: 'For mobile recharge and bills',
    account: 'Bank Account',
    accountIcon: 'Database',
    accountColor: '#3b82f6',
    toAccount: 'Nagad',
    toAccountIcon: 'Smartphone',
    toAccountColor: '#ef4444',
    status: 'Normal'
  }
];

const ANALYSIS_PIE_DATA = [
  { name: 'foodDrinks', value: 0 },
  { name: 'rentPayment', value: 0 },
  { name: 'shopping', value: 0 },
  { name: 'transport', value: 0 },
  { name: 'utilities', value: 0 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const WORKSPACES = [
  { id: 'ws-1', title: 'Tour', members: 4 },
  { id: 'ws-2', title: 'Special Events', members: 8 },
];

const SHARED_EXPENSES = [
  {
    id: 's1',
    paidBy: 'Abid',
    avatar: 'https://picsum.photos/seed/abid/100/100',
    amount: 0,
    description: 'Dinner (Shared)',
    date: '14 Mar 2026',
    owes: [
      { name: 'You', amount: 0 },
      { name: 'Sarah', amount: 0 },
      { name: 'John', amount: 0 },
    ]
  },
  {
    id: 's2',
    paidBy: 'You',
    avatar: 'https://picsum.photos/seed/me/100/100',
    amount: 0,
    description: 'Hotel Booking',
    date: '13 Mar 2026',
    owes: [
      { name: 'Abid', amount: 0 },
      { name: 'Sarah', amount: 0 },
      { name: 'John', amount: 0 },
    ]
  }
];

// --- Components ---

const BottomBar = React.memo(({ activeTab, setActiveTab, onAddClick }: { activeTab: string, setActiveTab: (t: string) => void, onAddClick: () => void }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    
    // React faster to scroll direction changes
    if (diff > 5 && latest > 100) {
      setIsVisible(false);
    } else if (diff < -5 || latest < 50) {
      setIsVisible(true);
    }
  });

  return (
  <>
    {/* Main Bottom Navigation Bar (Floating Pill Style with Plus Button) */}
    <div className="fixed bottom-6 left-0 right-0 z-[410] flex justify-center pointer-events-none px-4">
      <motion.div 
        animate={{ 
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95
        }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 30
        }}
        className="w-full max-w-md pointer-events-auto flex items-center justify-center gap-2"
      >
        <div className="flex-1 bg-white/90 backdrop-blur-2xl border border-white/50 p-1.5 flex items-center gap-1 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          {[
            { id: 'home', icon: LayoutDashboard, label: t('home') },
            { id: 'transactions', icon: ScrollText, label: t('history') },
            { id: 'analysis', icon: Activity, label: t('analysis') },
            { id: 'management', icon: FolderKanban, label: t('manage') },
            { id: 'settings', icon: CircleUserRound, label: t('settings') }
          ].map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={cn(
                  "relative flex items-center justify-center h-11 rounded-full transition-all duration-300 ease-out overflow-hidden",
                  isActive ? "flex-grow bg-indigo-50 text-indigo-600 px-2" : "w-10 shrink-0 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="relative z-10 flex items-center justify-center">
                  <Icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={cn(
                      "shrink-0 transition-transform duration-300",
                      isActive && "scale-110 drop-shadow-sm"
                    )} 
                  />
                  <div 
                    className={cn(
                      "transition-all duration-300 ease-out flex items-center overflow-hidden",
                      isActive ? "max-w-[80px] opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0"
                    )}
                  >
                    <span className="text-[10px] font-bold tracking-wide whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Primary Action Button (Blue Plus) */}
        <button 
          onClick={onAddClick}
          className="shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 border border-white/20 active:scale-90"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </motion.div>
    </div>
  </>
  );
});

const ProfileBottomSheet = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[500] bg-black/50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 z-0" onClick={onClose} />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-md rounded-t-lg sm:rounded-[2rem] p-4 flex flex-col text-slate-900 relative z-10 shadow-2xl"
      >
        {/* Drag Handle */}
        <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
        
        {/* Title */}
        <h3 className="text-center font-medium text-base mb-4">{t('accounts')}</h3>
        
        {/* Email & More */}
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-slate-500 text-sm font-medium">zomirlimon@gmail.com</span>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
        
        {/* Workspaces */}
        <div className="space-y-1 mb-4">
          <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=zamir" alt="Zamir" className="w-10 h-10 rounded-lg object-cover" />
              <div className="text-left">
                <p className="font-medium text-sm text-slate-900">Zamir</p>
                <p className="text-slate-500 text-xs">{t('freePlan')}</p>
              </div>
            </div>
            <Check size={18} className="text-slate-900" />
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg font-medium text-slate-700">
              Z
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-slate-900">Zamir's Space</p>
              <p className="text-slate-500 text-xs">{t('freePlan')}</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
              <Plus size={20} />
            </div>
            <span className="font-medium text-sm text-slate-700">{t('newWorkspace')}</span>
          </button>
        </div>
        
        <div className="h-px bg-slate-100 w-full mb-4" />
        
        {/* Actions */}
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500">
                <Plus size={16} />
              </div>
              <span className="font-medium text-sm text-slate-700">{t('addAnAccount')}</span>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 hover:bg-rose-50 rounded-lg transition-colors text-rose-600">
            <div className="w-8 h-8 rounded-full border border-rose-200 flex items-center justify-center bg-white">
              <X size={16} />
            </div>
            <span className="font-medium text-sm">{t('logOutAll')}</span>
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const UnifiedTopBar = React.memo(({ 
  title, 
  showPdf = true, 
  isHome = false, 
  showActions = false,
  balance = 0,
  searchQuery,
  setSearchQuery,
  onSearchFocus,
  onFilter,
  onNotifications,
  onPdfExport
}: { 
  title?: string, 
  showPdf?: boolean, 
  isHome?: boolean, 
  showActions?: boolean,
  balance?: number,
  searchQuery?: string,
  setSearchQuery?: (q: string) => void,
  onSearchFocus?: () => void,
  onFilter?: () => void,
  onNotifications?: () => void,
  onPdfExport?: () => void
}) => {
  const { t, language, currency, formatAmount } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const today = new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <>
      <div className={cn("bg-white px-6 pt-6 pb-3")}>
        <div className={cn("flex items-center justify-between", showActions ? "mb-3" : "")}>
          <div className="flex items-center gap-3">
            {isHome && (
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
              >
                <img src="https://i.pravatar.cc/150?u=zamir" alt="Profile" className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <div className="flex items-center gap-1">
            <span className="text-slate-900 font-medium text-base leading-none tracking-tighter text-clip-fix">Zamir</span>
                    <ChevronDown size={14} className="text-slate-500" />
                  </div>
                  <p className="text-slate-400 text-xs font-medium mt-1">{today}</p>
                </div>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isHome && (
              <div className="text-right">
                <p className="text-slate-500 text-sm font-medium">{t('balance')}</p>
                <h3 className="text-lg font-medium text-slate-900 leading-tight tracking-tighter mt-1">{formatAmount(balance)}</h3>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        {showActions && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder={t('searchTransactions') || 'Search...'}
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                onFocus={onSearchFocus}
                className="w-full bg-slate-100 text-slate-900 pl-10 pr-4 py-3 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
              />
            </div>
            <button onClick={onFilter} className="p-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors shrink-0">
              <Filter size={18} />
            </button>
            <button onClick={onNotifications} className="p-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors shrink-0 relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            {showPdf && (
              <button onClick={onPdfExport} className="p-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors shrink-0">
                <FileText size={18} />
              </button>
            )}
          </div>
        )}

        {/* Ads Bar */}
        {isHome && (
          <div className="mt-3">
            <div className="bg-white rounded-lg border border-slate-200 p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Sparkles size={22} strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -left-1 bg-amber-400 text-[7px] font-bold text-amber-900 px-1 rounded-sm shadow-sm ring-1 ring-white">
                    AD
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[15px] leading-none text-slate-900">{t('upgradeToPremium') || 'Upgrade to Premium'}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{t('claimAdFree') || 'Claim Your Ad-Free Pass'}</p>
                </div>
              </div>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold shadow-sm active:scale-95 transition-transform">
                {t('upgrade') || 'UPGRADE'}
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isProfileOpen && (
          <ProfileBottomSheet isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
});

const SummaryGrid = React.memo(({ totals, sections }: { totals: any, sections: Record<string, boolean> }) => {
  const { t, formatAmount } = useLanguage();
  const { income, expense, paona, dena, joma, invest, denaRepaid, paonaRepaid } = totals;

  const allItems = [
    { id: 'summary_expense', label: t('expense'), value: expense, icon: ArrowUpRight, color: 'text-rose-600', bg: 'bg-rose-500/10 backdrop-blur-xl border border-white shadow-sm' },
    { id: 'summary_income', label: t('income'), value: income, icon: ArrowDownLeft, color: 'text-emerald-600', bg: 'bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm' },
    { id: 'summary_taken', label: t('taken'), value: dena, icon: ArrowLeftRight, color: 'text-rose-600', bg: 'bg-rose-500/10 backdrop-blur-xl border border-white shadow-sm' },
    { id: 'summary_given', label: t('given'), value: paona, icon: ArrowLeftRight, color: 'text-emerald-600', bg: 'bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm' },
    { id: 'summary_savings', label: t('savings'), value: joma, icon: PiggyBank, color: 'text-blue-600', bg: 'bg-blue-500/10 backdrop-blur-xl border border-white shadow-sm' },
    { id: 'summary_invest', label: t('invest'), value: invest, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm' },
  ];

  const mainItems = allItems.filter(item => sections[item.id]);

  return (
    <div className="px-6 space-y-2">
      {/* Compact Grid */}
      {mainItems.length > 0 && (
        <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {mainItems.map((item) => {
            const idx = mainItems.indexOf(item);
            const isLastOdd = mainItems.length % 2 !== 0 && idx === mainItems.length - 1;
            return (
              <div key={item.id} className={cn("bg-slate-100 p-3 flex items-center gap-3", isLastOdd ? "col-span-2" : "")}>
                <div className={cn("w-9 h-9 rounded-md flex items-center justify-center shrink-0", item.bg, item.color)}>
                  <item.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-500 text-xs font-medium leading-tight mb-1 text-clip-fix">{item.label}</p>
                  <p className="text-base font-medium leading-tight tracking-tighter text-slate-900 text-clip-fix">{formatAmount(item.value)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compact Savings (Savings) */}
      {sections.summary_savings_total && (
        <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm text-indigo-600 flex items-center justify-center">
              <PiggyBank size={20} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium leading-tight mb-1 text-clip-fix">{t('savingsTotal')}</p>
              <p className="text-xl font-medium text-slate-900 leading-tight tracking-tighter text-clip-fix">{formatAmount(joma)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const getCategoryColor = (category: string, type: string) => {
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('food') || cat.includes('dining') || cat.includes('restaurant') || cat.includes('meal')) return 'orange';
  if (cat.includes('transport') || cat.includes('travel') || cat.includes('bus') || cat.includes('car') || cat.includes('fuel')) return 'blue';
  if (cat.includes('shop') || cat.includes('grocery') || cat.includes('clothing') || cat.includes('market')) return 'purple';
  if (cat.includes('bill') || cat.includes('utilit') || cat.includes('electric') || cat.includes('internet') || cat.includes('phone')) return 'amber';
  if (cat.includes('health') || cat.includes('medical') || cat.includes('doctor') || cat.includes('pharmacy')) return 'rose';
  if (cat.includes('entertain') || cat.includes('movie') || cat.includes('game') || cat.includes('fun')) return 'pink';
  if (cat.includes('educat') || cat.includes('school') || cat.includes('book') || cat.includes('tuition')) return 'indigo';
  if (cat.includes('salary') || cat.includes('wage') || cat.includes('income') || cat.includes('profit')) return 'emerald';
  if (cat.includes('invest') || cat.includes('saving') || cat.includes('bank')) return 'teal';
  if (cat.includes('transfer') || cat.includes('send')) return 'cyan';
  if (cat.includes('debt') || cat.includes('loan') || cat.includes('borrow')) return 'red';
  
  // Fallbacks based on type
  if (type === 'income' || type === 'paona' || type === 'joma') return 'emerald';
  if (type === 'expense' || type === 'dena') return 'rose';
  return 'slate';
};

const getColorClasses = (colorName: string) => {
  const map: Record<string, any> = {
    orange: { iconBg: 'bg-orange-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-orange-500' },
    blue: { iconBg: 'bg-blue-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-blue-500' },
    purple: { iconBg: 'bg-purple-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-purple-500' },
    amber: { iconBg: 'bg-amber-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-amber-500' },
    rose: { iconBg: 'bg-rose-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-rose-500' },
    pink: { iconBg: 'bg-pink-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-pink-500' },
    indigo: { iconBg: 'bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-indigo-500' },
    emerald: { iconBg: 'bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-emerald-500' },
    teal: { iconBg: 'bg-teal-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-teal-500' },
    cyan: { iconBg: 'bg-cyan-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-cyan-500' },
    red: { iconBg: 'bg-red-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-red-500' },
    slate: { iconBg: 'bg-slate-500/10 backdrop-blur-xl border border-white shadow-sm', iconColor: 'text-slate-500' },
  };
  return map[colorName] || map.slate;
};

const TransactionItem = React.memo(({ 
  tx, 
  onClick, 
  onEdit,
  onDelete,
  isActive,
  onToggleOptions,
  isFullyRepaid, 
  repaidAmount = 0,
  showDate = false
}: { 
  tx: any, 
  onClick: () => void, 
  onEdit?: (tx: any) => void,
  onDelete?: (id: string) => void,
  isActive?: boolean,
  onToggleOptions?: (e: React.MouseEvent) => void,
  isFullyRepaid?: boolean, 
  repaidAmount?: number,
  showDate?: boolean
}) => {
  const { t, formatAmount } = useLanguage();
  const Icon = typeof tx.icon === 'string' ? (ICON_LIST.find(i => i.name === tx.icon)?.icon || History) : (tx.icon || History);
  
  const colorName = getCategoryColor(tx.category, tx.type);
  const { iconBg, iconColor } = getColorClasses(colorName);

  return (
    <motion.div 
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left flex items-center gap-3 p-3 transition-all bg-white hover:bg-slate-50 active:bg-slate-100 cursor-pointer",
        isActive ? "relative z-50" : "relative"
      )}
      role="button"
      tabIndex={0}
    >
      {/* Left Icon - Box Style from Image */}
      <div 
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center shrink-0 overflow-hidden", 
          iconBg
        )}
      >
        {tx.image ? (
          <img src={tx.image} alt={tx.category} className="w-full h-full object-cover" />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", iconColor)}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
        )}
      </div>
      
      {/* Middle Content - Clean Stacked Text */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[15px] leading-none tracking-tighter truncate text-slate-900 text-clip-fix">
          {tx.txName || tx.category}
        </h4>
      </div>

      {/* Right Side - Amount and More */}
      <div className="flex items-center gap-3 shrink-0 relative">
        <span className={cn(
          "font-medium text-[15px] text-clip-fix",
          tx.type === 'income' ? "text-emerald-600" :
          tx.type === 'expense' ? "text-rose-600" :
          "text-slate-900"
        )}>
          {formatAmount(tx.amount)}
        </span>
        
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleOptions?.(e); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "p-1.5 rounded-md transition-all",
              isActive ? "text-slate-600 bg-slate-100" : "text-slate-300 hover:text-slate-600 hover:bg-slate-100"
            )}
          >
            <MoreVertical size={16} />
          </button>

          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-[160] overflow-hidden py-1"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit?.(tx); onToggleOptions?.(e as any); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Edit2 size={16} />
                  {t('edit') || 'Edit'}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete?.(tx.id); onToggleOptions?.(e as any); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={16} />
                  {t('delete') || 'Delete'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});
const TransactionList = React.memo(({ 
  transactions, 
  onTransactionClick, 
  onDelete,
  onEdit,
  hideHeader, 
  hideBanner, 
  showGrouping = true,
  containerTitle
}: { 
  transactions: any[], 
  onTransactionClick: (tx: any) => void, 
  onDelete?: (id: string) => void,
  onEdit?: (tx: any) => void,
  hideHeader?: boolean, 
  hideBanner?: boolean,
  showGrouping?: boolean,
  containerTitle?: string
}) => {
  const { t, language } = useLanguage();
  const [activeOptionsIndex, setActiveOptionsIndex] = useState<string | null>(null);
  
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveOptionsIndex(null);
    };
    if (activeOptionsIndex !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeOptionsIndex]);

  const getRepaidAmount = (txId: string) => {
    return transactions
      .filter(t => t.type === 'repayment' && t.linkedTxId === txId)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    if (!showGrouping) return { 'Recent': transactions };
    
    const groups: Record<string, any[]> = {};
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    transactions.forEach(tx => {
      let displayDate = tx.date || '';
      if (tx.date === todayStr) displayDate = t('today');
      else if (tx.date === yesterdayStr) displayDate = t('yesterday');
      else if (tx.date) {
        try {
          const [y, m, d] = tx.date.split('-').map(Number);
          const dateObj = new Date(y, m - 1, d);
          if (!isNaN(dateObj.getTime())) {
            displayDate = dateObj.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            });
          }
        } catch (e) {
          displayDate = tx.date;
        }
      } else {
        displayDate = t('unknownDate') || 'Unknown Date';
      }

      if (!groups[displayDate]) groups[displayDate] = [];
      groups[displayDate].push(tx);
    });

    return groups;
  }, [transactions, showGrouping, t, language]);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <History size={40} className="opacity-20" />
        </div>
        <p className="font-medium text-sm">{t('noTransactionsFound')}</p>
      </div>
    );
  }

  return (
    <div className={cn("pb-32", "mt-3")}>
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4 px-6">
          <h3 className="text-slate-900 font-medium text-xl">{t('history')}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">
              {transactions.length} {t('items')}
            </span>
          </div>
        </div>
      )}
      
      <div className="px-6">
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col">
          {containerTitle && (
            <div className="px-4 py-3 border-b border-slate-50 bg-white">
              <h3 className="text-slate-800 font-medium text-base">{containerTitle}</h3>
            </div>
          )}
          {Object.entries(groupedTransactions).map(([date, txs]: [string, any], index) => (
            <React.Fragment key={date}>
              {/* Date headers removed as per user request */}
              <div className="flex flex-col">
                {(txs as any[]).map((tx, txIndex) => {
                  const repaidAmount = (tx.type === 'dena' || tx.type === 'paona') 
                    ? getRepaidAmount(tx.id) 
                    : 0;
                  const isFullyRepaid = (tx.type === 'dena' || tx.type === 'paona') 
                    ? repaidAmount >= tx.amount 
                    : undefined;
                    
                  return (
                    <div key={tx.id} className={cn(txIndex !== txs.length - 1 ? "border-b border-slate-200" : "")}>
                      <TransactionItem 
                        tx={tx} 
                        onClick={() => onTransactionClick(tx)} 
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isActive={activeOptionsIndex === tx.id}
                        onToggleOptions={(e) => {
                          e.stopPropagation();
                          setActiveOptionsIndex(activeOptionsIndex === tx.id ? null : tx.id);
                        }}
                        isFullyRepaid={isFullyRepaid}
                        repaidAmount={repaidAmount}
                        showDate={!showGrouping}
                      />
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
        
      {!hideBanner && (
        <div className="pt-8 px-6">
          <div className="bg-zinc-900 rounded-lg p-8 text-zinc-50 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-medium text-xl leading-none text-clip-fix">{t('secureYourData')}</h4>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">{t('secureYourDataDesc')}</p>
              <button className="mt-6 bg-white text-slate-900 px-6 py-3 rounded-lg text-xs font-medium hover:bg-emerald-50 transition-all active:scale-95">
                {t('setupSecurity')}
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      )}
    </div>
  );
});

// --- Tab Views ---

const PdfManagerView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  
  // Mock history for demonstration
  const history = [
    { id: '1', type: 'export', date: '2026-03-24', time: '14:30', name: 'March_Transactions.pdf', size: '1.2 MB' },
    { id: '2', type: 'import', date: '2026-03-20', time: '09:15', name: 'Bank_Statement_Feb.pdf', size: '3.4 MB' },
    { id: '3', type: 'export', date: '2026-03-15', time: '18:45', name: 'Q1_Report.pdf', size: '2.1 MB' },
  ];

  return (
    <motion.div 
      key="pdf-manager-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
      className="absolute inset-0 bg-slate-50 pb-24 overflow-y-auto will-change-transform"
    >
      <div className="px-6 pt-3 pb-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium text-slate-900">{t('pdfManager')}</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-95 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Upload size={24} />
            </div>
            <span className="font-medium text-slate-900">{t('exportPdf')}</span>
          </button>
          
          <button className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all active:scale-95 group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Download size={24} />
            </div>
            <span className="font-medium text-slate-900">{t('importPdf')}</span>
          </button>
        </div>

        <h3 className="text-xs font-medium text-slate-400 uppercase mb-4 px-2">{t('recentActivity')}</h3>
        
        <div className="bg-white rounded-lg overflow-hidden border border-slate-200 flex flex-col">
          <div className="flex items-center gap-4 px-4 py-2 bg-slate-100">
            <h4 className="text-xs font-medium text-slate-500 uppercase whitespace-nowrap">March 2026</h4>
          </div>
          <div className="flex flex-col">
            {history.map((item, index) => (
              <div key={item.id} className={cn("flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors", index !== history.length - 1 ? "border-b border-slate-200" : "")}>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", item.type === 'export' ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500")}>
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium uppercase leading-none text-slate-500 text-clip-fix">
                      {item.type === 'export' ? t('export') : t('import')}
                    </p>
                    <span className="text-[9px] font-medium text-slate-400">
                      {item.date} • {item.time}
                    </span>
                  </div>
                  <h4 className="font-medium text-[14px] leading-none tracking-tighter truncate text-slate-900 text-clip-fix">
                    {item.name}
                  </h4>
                </div>
                <div className="shrink-0">
                  <span className="font-medium text-[12px] text-slate-500">
                    {item.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      key="notifications-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
      className="absolute inset-0 bg-slate-50 pb-24 overflow-y-auto will-change-transform"
    >
      <div className="px-6 pt-3 pb-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium text-slate-900">{t('notifications')}</h2>
      </div>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.05 }
          }
        }}
        className="p-4 space-y-3"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="bg-white p-4 rounded-lg border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm text-indigo-600 flex items-center justify-center shrink-0"><Gift size={20} /></div>
          <div>
            <p className="text-sm font-medium text-slate-900">{t('offerTitle')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('offerDesc')}</p>
          </div>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="bg-white p-4 rounded-lg border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 backdrop-blur-xl border border-white shadow-sm text-amber-600 flex items-center justify-center shrink-0"><Repeat size={20} /></div>
          <div>
            <p className="text-sm font-medium text-slate-900">{t('recurringTitle')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('recurringDesc')}</p>
          </div>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="bg-white p-4 rounded-lg border border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm text-emerald-600 flex items-center justify-center shrink-0"><Clock size={20} /></div>
          <div>
            <p className="text-sm font-medium text-slate-900">{t('taskTitle')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('taskDesc')}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HomeView = React.memo(({ 
  transactions, 
  onTransactionClick, 
  totals, 
  searchQuery, 
  setSearchQuery, 
  onFilter, 
  onNotifications, 
  onPdfExport,
  onViewAll,
  onSearchFocus,
  sections,
  onQuickAction,
  onEditTransaction,
  onDeleteTransaction
}: { 
  transactions: any[], 
  onTransactionClick: (tx: any) => void, 
  totals: any,
  searchQuery: string,
  setSearchQuery: (q: string) => void,
  onFilter: () => void,
  onNotifications: () => void,
  onPdfExport: () => void,
  onViewAll: () => void,
  onSearchFocus: () => void,
  sections: Record<string, boolean>,
  onQuickAction: (action: string) => void,
  onEditTransaction?: (tx: any) => void,
  onDeleteTransaction?: (id: string) => void
}) => {
  const { t, language } = useLanguage();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-32">
    <div>
      <SummaryGrid totals={totals} sections={sections} />

      {/* Quick Actions Section */}
      {sections.quickActions !== false && (
        <div className="mt-3 px-6">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-3 min-w-0 snap-x snap-mandatory">
              <button onClick={() => onQuickAction('expense')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-rose-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-rose-500 group-hover:bg-rose-500/20 transition-all shadow-sm">
                <Minus size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('expense') || 'খরচ'}</span>
            </button>
            
            <button onClick={() => onQuickAction('income')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/20 transition-all shadow-sm">
                <Plus size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('income') || 'আয়'}</span>
            </button>
            
            <button onClick={() => onQuickAction('tasks')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-all shadow-sm">
                <CheckCircle2 size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('tasks') || 'টাস্ক'}</span>
            </button>
            
            <button onClick={() => onQuickAction('debt')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-all shadow-sm">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('debt') || 'দেনা-পাওনা'}</span>
            </button>

            <button onClick={() => onQuickAction('reminder')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-purple-500 group-hover:bg-purple-500/20 transition-all shadow-sm">
                <Bell size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('reminder') || 'রিমাইন্ডার'}</span>
            </button>

            <button onClick={() => onQuickAction('note')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-indigo-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500/20 transition-all shadow-sm">
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('note') || 'নোট'}</span>
            </button>

            <button onClick={() => onQuickAction('recurring')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px] snap-start">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 backdrop-blur-xl border border-white flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500/20 transition-all shadow-sm">
                <Repeat size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('recurring') || 'রিকোয়িং'}</span>
            </button>

            <button onClick={() => onQuickAction('subscription')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px]">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 backdrop-blur-md border border-pink-500/20 flex items-center justify-center text-pink-500 group-hover:bg-pink-500/20 transition-all shadow-sm">
                <CreditCard size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{t('subscription') || 'সাবস্ক্রিপশন'}</span>
            </button>

            <button onClick={() => onQuickAction('add_shortcut')} className="flex flex-col items-center gap-2 group shrink-0 w-[70px]">
              <div className="w-14 h-14 rounded-full bg-slate-500/5 backdrop-blur-md border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-300 group-hover:bg-slate-500/10 transition-all shadow-sm">
                <Plus size={24} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-medium text-slate-400 truncate w-full text-center">{t('add') || 'যোগ করুন'}</span>
            </button>
          </div>
        </div>
      </div>
      )}
      
      {sections.activity && (
        <TransactionList 
          transactions={transactions.slice(0, 10)} 
          onTransactionClick={onTransactionClick} 
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
          hideHeader={true} 
          hideBanner={!sections.banner} 
          showGrouping={false} 
          containerTitle={language === 'bn' ? 'সাম্প্রতিক' : 'Recent'}
        />
      )}

      {!sections.activity && sections.banner && (
        <div className="px-6 mt-4">
           <div className="bg-zinc-900 rounded-lg p-8 text-zinc-50 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-medium text-xl leading-none text-clip-fix">{t('secureYourData')}</h4>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">{t('secureYourDataDesc')}</p>
              <button className="mt-6 bg-white text-slate-900 px-6 py-3 rounded-lg text-xs font-medium hover:bg-emerald-50 transition-all active:scale-95">
                {t('setupSecurity')}
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      )}
    </div>
  </motion.div>
  );
});

const TransactionsView = React.memo(({ 
  transactions, 
  onTransactionClick, 
  totals,
  searchQuery,
  setSearchQuery,
  onSearchFocus,
  onEditTransaction,
  onDeleteTransaction
}: { 
  transactions: any[], 
  onTransactionClick: (tx: any) => void, 
  totals: any,
  searchQuery: string,
  setSearchQuery: (q: string) => void,
  onSearchFocus: () => void,
  onEditTransaction?: (tx: any) => void,
  onDeleteTransaction?: (id: string) => void
}) => {
  const { t, formatAmount } = useLanguage();
  const [filterType, setFilterType] = useState<string>('all');
  const [activeRange, setActiveRange] = useState('month');
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Type Filter
      let typeMatch = true;
      if (filterType === 'income') typeMatch = tx.type === 'income';
      else if (filterType === 'expense') typeMatch = tx.type === 'expense';
      else if (filterType === 'transfer') typeMatch = tx.type === 'transfer';
      else if (filterType === 'debt') typeMatch = tx.type === 'dena' || tx.type === 'paona' || tx.type === 'repayment';
      else if (filterType === 'taken') typeMatch = tx.type === 'dena' || (tx.type === 'repayment' && tx.repaymentType === 'dena');
      else if (filterType === 'given') typeMatch = tx.type === 'paona' || (tx.type === 'repayment' && tx.repaymentType === 'paona');
      else if (filterType === 'savings') typeMatch = tx.type === 'joma';
      else if (filterType === 'invest') typeMatch = tx.type === 'invest';
      
      if (!typeMatch) return false;

      // Search Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          tx.category?.toLowerCase().includes(q) ||
          tx.subCategory?.toLowerCase().includes(q) ||
          tx.notes?.toLowerCase().includes(q) ||
          tx.amount.toString().includes(q) ||
          tx.account?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [transactions, filterType, searchQuery]);

  const stats = useMemo(() => {
    const inc = filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { inc, exp, count: filteredTransactions.length };
  }, [filteredTransactions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-32 bg-slate-50 min-h-screen">
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-900 font-medium text-2xl">{t('history')}</h2>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            {['week', 'month', 'year'].map(r => (
              <button 
                key={r}
                onClick={() => setActiveRange(r)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all",
                  activeRange === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                )}
              >
                {t(r)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-500 rounded-lg p-4 text-white shadow-lg shadow-emerald-500/20">
            <p className="text-xs font-medium uppercase opacity-80 mb-1">{t('filteredIncome')}</p>
            <h4 className="text-xl font-medium">{formatAmount(stats.inc)}</h4>
          </div>
          <div className="bg-rose-500 rounded-lg p-4 text-white shadow-lg shadow-rose-500/20">
            <p className="text-xs font-medium uppercase opacity-80 mb-1">{t('filteredExpense')}</p>
            <h4 className="text-xl font-medium">{formatAmount(stats.exp)}</h4>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {['all', 'income', 'expense', 'transfer', 'debt', 'taken', 'given', 'savings', 'invest'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                filterType === type 
                  ? "bg-zinc-900 text-zinc-50 shadow-lg shadow-zinc-900/20" 
                  : "bg-slate-500/10 backdrop-blur-md text-slate-600 border border-slate-200/50 hover:bg-slate-500/20 shadow-sm"
              )}
            >
              {t(type)}
            </button>
          ))}
        </div>
      </div>

      <TransactionList 
        transactions={filteredTransactions} 
        onTransactionClick={onTransactionClick} 
        onEdit={onEditTransaction}
        onDelete={onDeleteTransaction}
        hideHeader={true}
        hideBanner={true}
      />
    </motion.div>
  );
});

const AnalysisViewContent = React.memo(({ searchQuery, setSearchQuery, onSearchFocus, totals, transactions }: { searchQuery: string, setSearchQuery: (q: string) => void, onSearchFocus: () => void, totals: any, transactions: any[] }) => {
  const { t, currency, language, formatAmount } = useLanguage();
  
  const translatedPieData = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(tx => {
      const cat = tx.category || 'Others';
      const amount = Number(tx.amount) || 0;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    });

    const data = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
      
    if (data.length === 0) {
      return [{ name: t('noData'), value: 1 }];
    }
    
    return data.map(item => ({
      ...item,
      name: typeof item.name === 'string' ? (t(item.name.toLowerCase().replace(/\s+/g, '')) || item.name) : String(item.name)
    }));
  }, [transactions, t]);

  const averageDailySpend = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    if (expenses.length === 0) return 0;
    
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    const dates = expenses.map(tx => new Date(tx.date).getTime()).filter(d => !isNaN(d));
    
    if (dates.length === 0) return totalExpense;
    
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));
    
    return totalExpense / daysDiff;
  }, [transactions]);

  const monthlyTrendData = useMemo(() => {
    const months: Record<string, { month: string, income: number, expense: number }> = {};
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setDate(1); // Fix date overflow (e.g., 31st of month)
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    last6Months.forEach(m => {
      months[m] = { month: m, income: 0, expense: 0 };
    });

    transactions.forEach(tx => {
      const d = new Date(tx.date);
      const m = d.toLocaleString('default', { month: 'short' });
      const amount = Number(tx.amount) || 0;
      if (months[m]) {
        if (tx.type === 'income') months[m].income += amount;
        if (tx.type === 'expense') months[m].expense += amount;
      }
    });

    return Object.values(months);
  }, [transactions]);

  const topCategories = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    const total = expenses.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(tx => {
      const cat = tx.category || 'Others';
      const amount = Number(tx.amount) || 0;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ 
        name: typeof name === 'string' ? (t(name.toLowerCase().replace(/\s+/g, '')) || name) : String(name), 
        value,
        percentage: total > 0 ? (value / total) * 100 : 0
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions, t]);

  const savingsRate = useMemo(() => {
    const income = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    const expense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    if (income === 0) return 0;
    return Math.max(0, ((income - expense) / income) * 100);
  }, [transactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className="pb-32 bg-slate-50 min-h-screen"
  >
    <div className="px-6 pt-6">
      <h2 className="text-slate-900 font-medium text-2xl mb-6">{t('analysis')}</h2>
      
      {/* App-consistent Summary Card with 3D feel */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white mb-6 overflow-hidden relative shadow-lg shadow-indigo-200 group"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{t('averageDailySpend')}</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tighter">{formatAmount(averageDailySpend)}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-[10px] text-white/70 mb-1.5 uppercase font-bold tracking-wider">
              <span>{t('savingsRate')}</span>
              <span>{savingsRate.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${savingsRate}%` }}
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements matching app style */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
      </motion.div>

      {/* Monthly Trend Chart */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-900 text-sm font-bold tracking-tight">{t('monthlyTrend')}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{t('income')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{t('expense')}</span>
            </div>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} 
                dy={8}
              />
              <YAxis hide />
              <ReTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: '600' }}
              />
              <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Expense Distribution */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-slate-900 text-sm font-bold tracking-tight mb-4">{t('expenseDistribution')}</h3>
          <div className="h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={translatedPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {translatedPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('total')}</span>
              <span className="text-lg font-bold text-slate-900">{formatAmount(totals.expense)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {translatedPieData.slice(0, 4).map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[9px] text-slate-600 font-bold truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Categories */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-slate-900 text-sm font-bold tracking-tight mb-6">{t('topSpending')}</h3>
          <div className="space-y-4">
            {topCategories.map((cat, i) => (
              <div key={`${cat.name}-${i}`} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-bold text-slate-700">{cat.name}</span>
                  <span className="text-[11px] font-bold text-slate-900">{formatAmount(cat.value)}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Trends Bar Chart */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
      >
        <h3 className="text-slate-900 text-sm font-bold tracking-tight mb-6">{t('categoryTrends')}</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={translatedPieData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} 
                dy={8}
              />
              <YAxis hide />
              <ReTooltip 
                cursor={{ fill: '#f8fafc', radius: 8 }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={24}>
                {translatedPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  </motion.div>
  );
});

const AnalysisView = React.memo((props: { searchQuery: string, setSearchQuery: (q: string) => void, onSearchFocus: () => void, totals: any, transactions: any[] }) => {
  const [isReady, setIsReady] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Defer rendering to allow smooth tab transition
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="flex-1 overflow-y-auto pb-24 bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return <AnalysisViewContent {...props} />;
});

const ManagementView = React.memo(({ onOpenDetail, onAddNew, searchQuery, setSearchQuery, onSearchFocus, totals, managementData, transactions }: { 
  onOpenDetail: (label: string) => void, 
  onAddNew: (label: string) => void,
  searchQuery: string,
  setSearchQuery: (q: string) => void,
  onSearchFocus: () => void,
  totals: any,
  managementData: any,
  transactions: any[]
}) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeOptionsIndex, setActiveOptionsIndex] = useState<string | null>(null);
  
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveOptionsIndex(null);
    };
    if (activeOptionsIndex !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeOptionsIndex]);

  const categoryCount = Object.values(managementData.categories).reduce((sum: number, list: any) => sum + list.length, 0);
  
  const recurringCount = transactions.filter(tx => tx.status === 'Recurring').length + managementData.recurring.length;
  const pendingCount = transactions.filter(tx => tx.status === 'Pending').length + managementData.pending.length;
  const receiptsCount = transactions.filter(tx => tx.receipt).length + managementData.receipts.length;
  
  const sections = [
    {
      title: t('basicSetup'),
      subtitle: t('coreData'),
      items: [
        { label: t('accounts'), id: 'Accounts', icon: Wallet, count: managementData.accounts.length, color: 'text-indigo-600', bg: 'bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('accounts') },
        { label: t('categories'), id: 'Categories', icon: Tag, count: categoryCount, color: 'text-orange-600', bg: 'bg-orange-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('categories') },
        { label: t('subCategories'), id: 'Sub Categories', icon: Layers, count: managementData.subCategories.length, color: 'text-teal-600', bg: 'bg-teal-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('subCategories') },
        { label: t('contacts'), id: 'Contacts', icon: Users, count: managementData.persons.length, color: 'text-pink-600', bg: 'bg-pink-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('contacts') },
      ]
    },
    {
      title: t('moneyManagement'),
      subtitle: t('planning'),
      items: [
        { label: t('budgets'), id: 'Budgets', icon: Target, count: managementData.budgets.length, color: 'text-rose-600', bg: 'bg-rose-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('budgets') },
        { label: t('financialGoals'), id: 'Financial Goals', icon: Star, count: 3, color: 'text-purple-600', bg: 'bg-purple-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('financialGoals') },
      ]
    },
    {
      title: t('assetsLiabilities'),
      subtitle: t('wealth'),
      items: [
        { label: t('investments'), id: 'Investments', icon: Layout, count: managementData.investments.length, color: 'text-amber-600', bg: 'bg-amber-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('investments') },
        { label: t('fixedDeposits'), id: 'Fixed Deposits', icon: PiggyBank, count: managementData.fixedDeposits.length, color: 'text-cyan-600', bg: 'bg-cyan-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('fixedDeposits') },
        { label: t('payables'), id: 'Payables', icon: ArrowUpRight, count: managementData.payables.length, color: 'text-rose-600', bg: 'bg-rose-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('payables') },
        { label: t('receivables'), id: 'Receivables', icon: ArrowDownLeft, count: managementData.receivables.length, color: 'text-emerald-600', bg: 'bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('receivables') },
      ]
    },
    {
      title: t('transactionStatus'),
      subtitle: t('tracking'),
      items: [
        { label: t('recurring'), id: 'Recurring', icon: Repeat, count: recurringCount, color: 'text-blue-600', bg: 'bg-blue-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('recurring') },
        { label: t('pending'), id: 'Pending', icon: Clock, count: pendingCount, color: 'text-yellow-600', bg: 'bg-yellow-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('pending') },
        { label: t('receipts'), id: 'Receipts', icon: Receipt, count: receiptsCount, color: 'text-orange-600', bg: 'bg-orange-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('receipts') },
      ]
    },
    {
      title: t('personalOrganization'),
      subtitle: t('productivity'),
      items: [
        { label: t('tasks'), id: 'Tasks', icon: CheckCircle2, count: managementData.tasks.length, color: 'text-slate-600', bg: 'bg-slate-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('tasks') },
        { label: t('reminders'), id: 'Reminders', icon: Bell, count: managementData.reminders.length, color: 'text-blue-600', bg: 'bg-blue-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('reminders') },
        { label: t('notes'), id: 'Notes', icon: StickyNote, count: managementData.notes.length, color: 'text-emerald-600', bg: 'bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('notes') },
        { label: t('subscription'), id: 'Subscriptions', icon: CreditCard, count: managementData.subscriptions?.length || 0, color: 'text-pink-600', bg: 'bg-pink-500/10 backdrop-blur-xl border border-white shadow-sm', sub: t('subscription') },
      ]
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-32 bg-slate-50 min-h-screen">
      <div className="px-6 pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-slate-900 font-medium text-2xl">{t('manage')}</h2>
          <div className="bg-white rounded-lg p-1 shadow-sm border border-slate-100 flex items-center gap-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600")}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600")}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {filteredSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex flex-col">
              <h3 className="text-slate-900 font-medium text-lg">{section.title}</h3>
              <p className="text-slate-400 text-[11px] font-medium uppercase">{section.subtitle}</p>
            </div>
            
            <div className={cn(viewMode === 'grid' ? "grid grid-cols-2 gap-3" : "flex flex-col")}>
              {section.items.map((item) => (
                <motion.div 
                  key={item.id} 
                  onClick={() => onOpenDetail(item.id)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "transition-all group cursor-pointer",
                    viewMode === 'grid' 
                      ? "bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between hover:bg-slate-50" 
                      : "w-full text-left flex items-center gap-3.5 p-3.5 rounded-lg border border-slate-200 bg-white mb-2 last:mb-0 hover:bg-slate-50"
                  )}
                  role="button"
                  tabIndex={0}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="w-full flex justify-between items-start mb-3">
                        <div className={cn("w-11 h-11 rounded-md flex items-center justify-center shrink-0 overflow-hidden", item.bg, item.color)}>
                          <item.icon size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center gap-1 relative">
                          <span className="text-[15px] font-medium text-slate-900 mr-1">
                            {item.count}
                          </span>
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddNew(item.label);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Plus size={18} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left w-full">
                        <h3 className="text-[15px] font-medium text-slate-900 truncate leading-none tracking-tighter text-clip-fix">
                          {item.sub}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cn("w-11 h-11 rounded-md flex items-center justify-center shrink-0 overflow-hidden", item.bg, item.color)}>
                        <item.icon size={20} strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
                        <h4 className="font-medium text-[15px] leading-none tracking-tighter truncate text-slate-900 text-clip-fix">
                          {item.sub}
                        </h4>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 relative">
                        <span className="font-medium text-[15px] text-slate-900">
                          {item.count}
                        </span>
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddNew(item.label);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Plus size={18} strokeWidth={2.5} />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {filteredSections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} />
            </div>
            <p className="text-sm font-medium">{t('noManagementItemsFound')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const ICON_LIST = [
  { name: 'Utensils', icon: Utensils },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'Bus', icon: Bus },
  { name: 'Zap', icon: Zap },
  { name: 'Banknote', icon: Banknote },
  { name: 'Wallet', icon: Wallet },
  { name: 'CreditCard', icon: CreditCard },
  { name: 'PiggyBank', icon: PiggyBank },
  { name: 'Star', icon: Star },
  { name: 'Users', icon: Users },
  { name: 'Tag', icon: Tag },
  { name: 'Layers', icon: Layers },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Home', icon: Home },
  { name: 'Settings', icon: Settings },
  { name: 'Info', icon: Info },
  { name: 'Shield', icon: Shield },
  { name: 'Database', icon: Database },
  { name: 'Layout', icon: Layout },
  { name: 'ArrowUpRight', icon: ArrowUpRight },
  { name: 'ArrowDownLeft', icon: ArrowDownLeft },
  { name: 'ArrowLeftRight', icon: ArrowLeftRight },
];

const PREDEFINED_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#64748b'];

const AddAccountView = ({ onClose, onSave, accountTypes, onAddAccountType, initialData }: { onClose: () => void, onSave: (data: any) => void, accountTypes: string[], onAddAccountType: (type: string) => void, initialData?: any }) => {
  const { t, currency: appCurrency } = useLanguage();
  const [name, setName] = useState(initialData?.name || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'Bangladeshi Taka');
  const [accountType, setAccountType] = useState(initialData?.accountType || accountTypes[0] || 'Cash');
  const [balance, setBalance] = useState(initialData?.balance?.toString() || '0.00');
  const [includeInTotal, setIncludeInTotal] = useState(initialData?.includeInTotal ?? true);
  const [isPinned, setIsPinned] = useState(initialData?.isPinned || false);
  const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);
  const [color, setColor] = useState(initialData?.color || '#3b82f6');
  const [icon, setIcon] = useState(initialData?.icon || '');
  const [image, setImage] = useState<string | null>(initialData?.image || null);
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SelectedIcon = ICON_LIST.find(i => i.name === icon)?.icon;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200]"
      />
      <motion.div 
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[201] shadow-xl max-h-[90vh] flex flex-col"
      >
        <div className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
          
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {initialData ? t('editWallet') : t('addWallet')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{t('walletConfiguration') || 'Wallet Configuration'}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">{t('walletName') || 'Wallet Name'}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('myWallet')}
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">{t('accountType')}</label>
              <div className="flex flex-wrap gap-2">
                {accountTypes.map(t => (
                  <button 
                    key={t}
                    onClick={() => setAccountType(t)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize",
                      accountType === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {t}
                  </button>
                ))}
                <button 
                  onClick={() => setShowNewTypeInput(true)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all flex items-center gap-1"
                >
                  <Plus size={14} /> {t('addNew')}
                </button>
              </div>
              {showNewTypeInput && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex gap-2"
                >
                  <input 
                    type="text" 
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    placeholder={t('typeNamePlaceholder')}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-emerald-500 transition-all"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      if (newTypeName) {
                        onAddAccountType(newTypeName);
                        setAccountType(newTypeName);
                        setNewTypeName('');
                        setShowNewTypeInput(false);
                      }
                    }}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-medium"
                  >
                    {t('add')}
                  </button>
                  <button 
                    onClick={() => setShowNewTypeInput(false)}
                    className="bg-slate-100 text-slate-400 px-4 py-2 rounded-xl text-xs font-medium"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">{t('currency')}</label>
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-emerald-500 transition-all">
                  <Archive size={16} className="text-slate-400" />
                  <input 
                    type="text" 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-medium outline-none text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">{t('initialBalance') || 'Initial Balance'}</label>
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-emerald-500 transition-all">
                  <span className="text-emerald-600 font-medium text-sm">{appCurrency.symbol}</span>
                  <input 
                    type="number" 
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent outline-none text-slate-900 font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">{t('selectWalletTheme') || 'Select Theme'}</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {PREDEFINED_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "w-8 h-8 rounded-full shrink-0 transition-all border-2",
                      color === c ? "border-slate-900 scale-110 shadow-sm" : "border-transparent hover:scale-110 opacity-70 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">{t('walletIcon') || 'Icon'}</label>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => setShowIconDropdown(!showIconDropdown)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all overflow-hidden border border-slate-200 bg-slate-50"
                  style={icon || image ? { 
                    backgroundColor: color ? `${color}15` : '#f8fafc', 
                    color: color || '#475569',
                  } : {}}
                >
                  {image ? (
                    <img src={image} alt="Selected" className="w-full h-full object-cover" />
                  ) : SelectedIcon ? (
                    <SelectedIcon size={20} />
                  ) : (
                    <Plus size={20} className="text-slate-400" />
                  )}
                </button>
                <span className="text-sm text-slate-500">{t('clickToChangeIcon') || 'Click to change icon'}</span>
              </div>

              <AnimatePresence>
                {showIconDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-6 gap-2 pt-2 max-h-40 overflow-y-auto custom-scrollbar">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center transition-all border border-dashed",
                          image ? "border-emerald-500 bg-emerald-50" : "border-slate-300 text-slate-400 hover:bg-slate-50"
                        )}
                      >
                        {image ? (
                          <img src={image} alt="Selected" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Plus size={16} />
                        )}
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImage(reader.result as string);
                              setIcon('');
                              setShowIconDropdown(false);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {ICON_LIST.map(i => (
                        <button 
                          key={i.name}
                          onClick={() => {
                            setIcon(i.name);
                            setImage(null);
                            setShowIconDropdown(false);
                          }}
                          className={cn(
                            "aspect-square rounded-lg flex items-center justify-center transition-all",
                            icon === i.name ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                          )}
                        >
                          <i.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Pin size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{t('pinToTop')}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPinned(!isPinned)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative",
                    isPinned ? "bg-emerald-500" : "bg-slate-200"
                  )}
                >
                  <motion.div 
                    animate={{ x: isPinned ? 22 : 2 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{t('setAsDefault')}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDefault(!isDefault)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative",
                    isDefault ? "bg-emerald-500" : "bg-slate-200"
                  )}
                >
                  <motion.div 
                    animate={{ x: isDefault ? 22 : 2 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Archive size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{t('includeInTotal')}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => setIncludeInTotal(!includeInTotal)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative",
                    includeInTotal ? "bg-emerald-500" : "bg-slate-200"
                  )}
                >
                  <motion.div 
                    animate={{ x: includeInTotal ? 22 : 2 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <button 
            onClick={() => {
              if (!name) return;
              onSave({
                name,
                icon,
                image,
                color,
                currency,
                accountType,
                balance: Number(balance) || 0,
                includeInTotal,
                isPinned,
                isDefault
              });
            }}
            className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            {t('saveWallet') || 'Save Wallet'}
          </button>
        </div>
      </motion.div>
    </>
  );
};

const SubCategoryTransactionsView = React.memo(({ 
  subCategory, 
  transactions, 
  onClose, 
  onTransactionClick,
  onEdit,
  onDelete
}: { 
  subCategory: string, 
  transactions: any[], 
  onClose: () => void,
  onTransactionClick: (tx: any) => void,
  onEdit?: (tx: any) => void,
  onDelete?: (id: string) => void
}) => {
  const { t } = useLanguage();
  const filtered = transactions.filter(tx => tx.subCategory === subCategory);
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[270] flex flex-col"
    >
      <div className="px-6 py-8 flex items-center justify-between border-b border-slate-50">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-medium text-slate-900">{subCategory}</h2>
          <p className="text-xs font-medium text-slate-400 uppercase">{filtered.length} {t('transactions')}</p>
        </div>
        <div className="w-10" />
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {filtered.length > 0 ? (
          <TransactionList transactions={filtered} onTransactionClick={onTransactionClick} onEdit={onEdit} onDelete={onDelete} hideHeader hideBanner />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Layers size={48} className="mb-4 opacity-20" />
            <p className="font-medium">{t('noTransactionsFound')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const ContactDetailView = React.memo(({ 
  contact, 
  transactions, 
  onClose, 
  onTransactionClick, 
  onEdit, 
  onRemove, 
  onToggleArchive,
  onEditTransaction,
  onDeleteTransaction
}: { 
  contact: any, 
  transactions: any[], 
  onClose: () => void,
  onTransactionClick: (tx: any) => void,
  onEdit: () => void,
  onRemove: () => void,
  onToggleArchive: () => void,
  onEditTransaction?: (tx: any) => void,
  onDeleteTransaction?: (id: string) => void
}) => {
  const { currency, formatAmount, language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'dena' | 'paona'>('all');
  const filteredTransactions = transactions.filter(tx => tx.person === contact.name);
  
  const paonaTotal = filteredTransactions
    .filter(tx => tx.type === 'paona')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const denaTotal = filteredTransactions
    .filter(tx => tx.type === 'dena')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const displayTransactions = filteredTransactions.filter(tx => {
    if (activeFilter === 'all') return true;
    return tx.type === activeFilter;
  });
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[280] flex flex-col"
    >
      <div className="px-6 py-8 flex items-center justify-between border-b border-slate-50">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-medium text-slate-900">{t('contactDetails')}</h2>
          <p className="text-xs font-medium text-slate-400 uppercase">{t('profileView')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onEdit}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={onToggleArchive}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              contact.isArchived ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
            )}
            title={contact.isArchived ? "Unarchive" : "Archive"}
          >
            {contact.isArchived ? <RotateCcw size={18} /> : <Archive size={18} />}
          </button>
          <button 
            onClick={onRemove}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
            {contact.image ? (
              <img src={contact.image} alt={contact.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div>
            <h3 className="text-xl font-medium text-slate-900">{contact.name}</h3>
            <p className="text-slate-500 font-medium text-xs mt-0.5 flex items-center gap-1.5">
              <Phone size={12} /> {contact.phone || 'No phone number'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-lg">
          <button 
            onClick={() => setActiveFilter('dena')}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5",
              activeFilter === 'dena' ? "bg-white text-rose-600 shadow-sm scale-[1.02]" : "text-slate-500"
            )}
          >
            <span className="text-xs font-medium uppercase">{t('debt')}</span>
            <span className="text-xs font-medium">{formatAmount(denaTotal)}</span>
          </button>
          <button 
            onClick={() => setActiveFilter('paona')}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5",
              activeFilter === 'paona' ? "bg-white text-emerald-600 shadow-sm scale-[1.02]" : "text-slate-500"
            )}
          >
            <span className="text-xs font-medium uppercase">{t('payable')}</span>
            <span className="text-xs font-medium">{formatAmount(paonaTotal)}</span>
          </button>
          <button 
            onClick={() => setActiveFilter('all')}
            className={cn(
              "flex-1 py-3 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5",
              activeFilter === 'all' ? "bg-white text-slate-900 shadow-sm scale-[1.02]" : "text-slate-500"
            )}
          >
            <span className="text-xs font-medium uppercase">{t('all')}</span>
            <span className="text-xs font-medium">{filteredTransactions.length}</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {displayTransactions.length > 0 ? (
          <TransactionList transactions={displayTransactions} onTransactionClick={onTransactionClick} onEdit={onEditTransaction} onDelete={onDeleteTransaction} hideHeader hideBanner />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="font-medium">{t('noTransactionsFound')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const CategoryDetailView = React.memo(({ 
  category, 
  data, 
  transactions, 
  onClose, 
  onTransactionClick, 
  onOpenSubCategory,
  onEditTransaction,
  onDeleteTransaction
}: { 
  category: string, 
  data: any, 
  transactions: any[], 
  onClose: () => void,
  onTransactionClick: (tx: any) => void,
  onOpenSubCategory: (sub: string) => void,
  onEditTransaction?: (tx: any) => void,
  onDeleteTransaction?: (id: string) => void
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'transactions' | 'subcategories'>('transactions');
  
  const filteredTransactions = transactions.filter(tx => tx.category === category);
  const filteredSubCategories = data.subCategories.filter((sub: any) => sub.parentCategory === category);
  
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[260] flex flex-col"
    >
      <div className="px-6 py-8 flex items-center justify-between border-b border-slate-50">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-medium text-slate-900">{category}</h2>
          <p className="text-xs font-medium text-slate-400 uppercase">{t('categoryDetails')}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-4 border-b border-slate-50">
        <button 
          onClick={() => setActiveTab('transactions')}
          className={cn(
            "flex-1 py-3 rounded-lg text-xs font-medium uppercase tracking-widest transition-all",
            activeTab === 'transactions' ? "bg-zinc-900 text-zinc-50 shadow-lg" : "bg-slate-100 text-slate-500"
          )}
        >
          Transactions
        </button>
        <button 
          onClick={() => setActiveTab('subcategories')}
          className={cn(
            "flex-1 py-3 rounded-lg text-xs font-medium uppercase tracking-widest transition-all",
            activeTab === 'subcategories' ? "bg-zinc-900 text-zinc-50 shadow-lg" : "bg-slate-100 text-slate-500"
          )}
        >
          Sub Categories
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {activeTab === 'transactions' ? (
          filteredTransactions.length > 0 ? (
            <TransactionList transactions={filteredTransactions} onTransactionClick={onTransactionClick} onEdit={onEditTransaction} onDelete={onDeleteTransaction} hideHeader hideBanner />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p className="font-medium">{t('noTransactionsFound')}</p>
            </div>
          )
        ) : (
          <div className="px-6 pt-6 space-y-4">
            {filteredSubCategories.length > 0 ? (
              <div className="bg-slate-100 rounded-lg overflow-hidden">
                {filteredSubCategories.map((sub: any) => (
                  <button 
                    key={sub.id || sub.name}
                    onClick={() => onOpenSubCategory(sub.name)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-200 transition-colors border-b border-slate-200 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-600 shadow-sm">
                        <Tag size={18} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-slate-900 text-sm">{sub.name}</h4>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">{t('subCategory')}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Layers size={48} className="mb-4 opacity-20" />
                <p className="font-medium">{t('noSubCategoriesFound')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

const ManagementDetailView = React.memo(({ 
  label, 
  data, 
  transactions = [], 
  filter, 
  onClose, 
  onAdd, 
  onUpdate, 
  onRemove, 
  onToggleArchive, 
  onOpenAddReminder, 
  accountTypes, 
  onAddAccountType, 
  onTogglePin, 
  onSetDefault, 
  onOpenSubCategories, 
  onOpenTransactions, 
  onOpenContactDetail, 
  initialEditingIndex, 
  initialIsAdding 
}: { 
  label: string, 
  data: any, 
  transactions?: any[], 
  filter?: string, 
  onClose: () => void, 
  onAdd: (cat: string, item: any, type?: string) => void, 
  onUpdate: (cat: string, index: number, item: any, type?: string) => void, 
  onRemove: (cat: string, index: number, type?: string) => void, 
  onToggleArchive: (cat: string, index: number, type?: string) => void, 
  onOpenAddReminder: () => void, 
  accountTypes?: string[], 
  onAddAccountType?: (type: string) => void, 
  onTogglePin?: (idx: number) => void, 
  onSetDefault?: (idx: number) => void, 
  onOpenSubCategories?: (category: string) => void, 
  onOpenTransactions?: (subCategory: string) => void, 
  onOpenContactDetail?: (contact: any) => void, 
  initialEditingIndex?: number | null,
  initialIsAdding?: boolean
}) => {
  const { t, currency, language, formatAmount } = useLanguage();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const [activeType, setActiveType] = useState<'all' | 'expense' | 'income' | 'dena' | 'paona' | 'joma' | 'invest'>('all');
  const [accountFilter, setAccountFilter] = useState('All');
  const [subCategoryFilter, setSubCategoryFilter] = useState(filter || 'All');
  const [newItemName, setNewItemName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Tag');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#10b981');
  const [parentCategory, setParentCategory] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderAmount, setReminderAmount] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [isAdding, setIsAdding] = useState(initialIsAdding || (initialEditingIndex !== undefined && initialEditingIndex !== null));
  const [isSaving, setIsSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(initialEditingIndex !== undefined ? initialEditingIndex : null);

  useEffect(() => {
    if (editingIndex !== null) {
      let items: any[] = [];
      if (label === 'Categories') {
        if (activeType === 'all') {
          items = Object.values(data.categories).flat() as any[];
        } else {
          items = data.categories[activeType] || [];
        }
      } else if (label === 'Sub Categories') {
        items = data.subCategories || [];
      } else if (label === 'Contacts') {
        items = data.persons || [];
      } else {
        const key = label.charAt(0).toLowerCase() + label.slice(1);
        items = data[key] || [];
      }
      
      const item = items[editingIndex];
      if (item) {
        setNewItemName(item.name || '');
        setSelectedIcon(item.icon || 'Tag');
        setSelectedImage(item.image || null);
        setSelectedColor(item.color || '#10b981');
        if (label === 'Sub Categories') setParentCategory(item.parentCategory || '');
        if (label === 'Contacts') setContactPhone(item.phone || '');
        if (label === 'Tasks') {
          setTaskPriority(item.priority || 'medium');
          setTaskDueDate(item.dueDate || '');
        }
      }
    }
  }, [editingIndex, label, data, activeType]);
  const [showArchived, setShowArchived] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOptionsIndex, setActiveOptionsIndex] = useState<number | null>(null);
  const [viewingAccount, setViewingAccount] = useState<any | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCategory = label === 'Categories';
  const isAccounts = label === 'Accounts';

  const handlePointerDown = (idx: number) => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setActiveOptionsIndex(idx);
    }, 500);
  };

  const handlePointerUp = (item: any, idx: number) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (!isLongPress.current) {
      if (activeOptionsIndex !== null) {
        setActiveOptionsIndex(null);
      } else {
        setViewingAccount(item);
      }
    }
  };

  const handlePointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };
  
  const accountBalances = useMemo(() => {
    if (label !== 'Accounts') return {};
    const balances: Record<string, number> = {};
    data.accounts.forEach((acc: any) => {
      balances[acc.name] = acc.balance || 0;
    });
    
    transactions.forEach(tx => {
      if (tx.account) {
        if (tx.type === 'income' || tx.type === 'dena' || (tx.type === 'repayment' && tx.repaymentType === 'paona')) {
          balances[tx.account] = (balances[tx.account] || 0) + tx.amount;
        } else if (tx.type === 'expense' || tx.type === 'paona' || (tx.type === 'repayment' && tx.repaymentType === 'dena')) {
          balances[tx.account] = (balances[tx.account] || 0) - tx.amount;
        } else if (tx.type === 'transfer') {
          balances[tx.account] = (balances[tx.account] || 0) - tx.amount;
          if (tx.toAccount) {
            balances[tx.toAccount] = (balances[tx.toAccount] || 0) + tx.amount;
          }
        }
      }
    });
    return balances;
  }, [transactions, data.accounts, label]);

  const contactTotals = useMemo(() => {
    if (label !== 'Contacts') return { totalPaona: 0, totalDena: 0, contactBalances: {} };
    
    let totalPaona = 0;
    let totalDena = 0;
    const contactBalances: Record<string, { paona: number, dena: number }> = {};
    
    transactions.forEach(tx => {
      if (!tx.person) return;
      
      if (!contactBalances[tx.person]) {
        contactBalances[tx.person] = { paona: 0, dena: 0 };
      }
      
      if (tx.type === 'paona') {
        contactBalances[tx.person].paona += tx.amount;
        totalPaona += tx.amount;
      } else if (tx.type === 'dena') {
        contactBalances[tx.person].dena += tx.amount;
        totalDena += tx.amount;
      } else if (tx.type === 'repayment') {
        if (tx.repaymentType === 'paona') {
          contactBalances[tx.person].paona -= tx.amount;
          totalPaona -= tx.amount;
        } else if (tx.repaymentType === 'dena') {
          contactBalances[tx.person].dena -= tx.amount;
          totalDena -= tx.amount;
        }
      }
    });
    
    return { totalPaona, totalDena, contactBalances };
  }, [transactions, label]);

  const resetForm = () => {
    setNewItemName('');
    setSelectedIcon('Tag');
    setSelectedImage(null);
    setSelectedColor('#10b981');
    setParentCategory('');
    setReminderDate('');
    setReminderTime('');
    setReminderAmount('');
    setContactPhone('');
    setTaskPriority('medium');
    setTaskDueDate('');
    setEditingIndex(null);
    setIsAdding(false);
    setIsSaving(false);
  };

  const currentItems = (isCategory 
    ? (activeType === 'all' ? Object.entries(data.categories).flatMap(([type, list]: [string, any]) => list.map((item: any) => ({ ...item, type }))) : (data.categories as any)[activeType])
    : label === 'Sub Categories' ? data.subCategories
    : label === 'Contacts' ? data.persons
    : label === 'Accounts' ? data.accounts.map((acc: any) => ({ ...acc, currentBalance: accountBalances[acc.name] || 0 }))
    : label === 'Reminders' ? data.reminders
    : label === 'Budgets' ? data.budgets
    : label === 'Financial Goals' ? data.financialGoals || []
    : label === 'Investments' ? data.investments
    : label === 'Fixed Deposits' ? data.fixedDeposits
    : label === 'Payables' ? data.payables
    : label === 'Receivables' ? data.receivables
    : label === 'Notes' ? data.notes
    : label === 'Receipts' ? [...data.receipts, ...transactions.filter((tx: any) => tx.receipt)]
    : label === 'Pending Tasks' || label === 'Pending' ? [...data.pending, ...transactions.filter((tx: any) => tx.status === 'Pending')]
    : label === 'Tasks' ? data.tasks
    : label === 'Recurring' ? [...data.recurring, ...transactions.filter((tx: any) => tx.status === 'Recurring')]
    : label === 'Subscriptions' ? data.subscriptions
    : []) || [];

  const filteredItems = currentItems
    .map((item: any, index: number) => ({ ...item, originalIndex: index }))
    .filter((item: any) => !!item.isArchived === showArchived)
    .filter((item: any) => {
      if (isAccounts && accountFilter !== 'All') {
        return item.accountType === accountFilter;
      }
      if (label === 'Sub Categories' && subCategoryFilter !== 'All') {
        return item.parentCategory === subCategoryFilter;
      }
      
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.txName && item.txName.toLowerCase().includes(q)) ||
          (item.note && item.note.toLowerCase().includes(q)) ||
          (item.content && item.content.toLowerCase().includes(q)) ||
          (item.phone && item.phone.includes(q))
        );
      }
      return true;
    })
    .sort((a: any, b: any) => {
      if (isAccounts) {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
      }
      return 0;
    });

  const groupedSubCategories = useMemo(() => {
    if (label !== 'Sub Categories' || subCategoryFilter !== 'All') return null;
    const groups: { [key: string]: any[] } = {};
    filteredItems.forEach((item: any) => {
      const parent = item.parentCategory || 'Uncategorized';
      if (!groups[parent]) groups[parent] = [];
      groups[parent].push(item);
    });
    return groups;
  }, [label, subCategoryFilter, filteredItems]);

  const handleSave = () => {
    if (isSaving) return;
    if (!newItemName) return;
    setIsSaving(true);
    
    const itemData = { 
      name: newItemName, 
      icon: selectedIcon, 
      image: selectedImage, 
      color: selectedColor,
      ...(label === 'Sub Categories' ? { parentCategory } : {}),
      ...(label === 'Reminders' ? { date: reminderDate, time: reminderTime, amount: reminderAmount } : {}),
      ...(label === 'Contacts' ? { phone: contactPhone } : {}),
      ...(label === 'Tasks' ? { priority: taskPriority, dueDate: taskDueDate, status: editingIndex !== null ? currentItems[editingIndex].status : 'pending' } : {}),
      isArchived: editingIndex !== null ? currentItems[editingIndex].isArchived : false
    };

    if (editingIndex !== null) {
      const itemToUpdate = currentItems[editingIndex];
      const typeToUse = isCategory ? (activeType === 'all' ? itemToUpdate.type : activeType) : undefined;
      onUpdate(label, editingIndex, itemData, typeToUse);
    } else {
      onAdd(label, itemData, isCategory ? (activeType === 'all' ? 'expense' : activeType) : undefined);
    }
    
    resetForm();
  };

  const startEdit = (item: any, index: number) => {
    setNewItemName(item.name);
    setSelectedIcon(item.icon || 'Tag');
    setSelectedImage(item.image || null);
    setSelectedColor(item.color || '#10b981');
    setParentCategory(item.parentCategory || '');
    if (label === 'Reminders') {
      setReminderDate(item.date || '');
      setReminderTime(item.time || '');
      setReminderAmount(item.amount || '');
    }
    if (label === 'Contacts') {
      setContactPhone(item.phone || '');
    }
    if (label === 'Tasks') {
      setTaskPriority(item.priority || 'medium');
      setTaskDueDate(item.dueDate || '');
      setParentCategory(item.category || '');
    }
    setEditingIndex(index);
    setIsAdding(true);
  };

  const renderItem = (item: any, idx: number, isLast: boolean) => {
    const IconComp = ICON_LIST.find(i => i.name === item.icon)?.icon || Tag;
    const originalIdx = item.originalIndex;

    return (
      <div 
        key={item.id || idx} 
        className={cn(
          "group flex items-center justify-between gap-3 p-3 transition-all bg-white hover:bg-slate-50",
          !isLast && "border-b border-slate-200"
        )}
      >
        <button 
          onClick={() => {
            if (isCategory && onOpenSubCategories) {
              onOpenSubCategories(item.name);
            } else if (label === 'Sub Categories' && onOpenTransactions) {
              onOpenTransactions(item.name);
            } else if (label === 'Contacts' && onOpenContactDetail) {
              onOpenContactDetail(item);
            }
          }}
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
        >
          <div 
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 overflow-hidden backdrop-blur-md border shadow-sm"
            style={{ 
              backgroundColor: item.color ? `${item.color}15` : '#f8fafc', 
              borderColor: item.color ? `${item.color}30` : '#e2e8f0',
              color: item.color || '#475569' 
            }}
          >
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <IconComp size={20} strokeWidth={2.5} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium uppercase leading-none text-slate-500 text-clip-fix">
                {label === 'Contacts' ? (
                  item.phone || 'No phone number'
                ) : label === 'Sub Categories' && item.parentCategory ? (
                  item.parentCategory
                ) : label === 'Reminders' ? (
                  <span className="flex items-center gap-1">
                    <Archive size={10} />
                    {item.date ? new Date(item.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No Date'}
                    {item.time ? ` @ ${item.time}` : ''}
                  </span>
                ) : label === 'Tasks' ? (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[9px]",
                    item.priority === 'high' ? "bg-rose-100 text-rose-600" :
                    item.priority === 'medium' ? "bg-amber-100 text-amber-600" :
                    "bg-emerald-100 text-emerald-600"
                  )}>
                    {t(item.priority || 'medium')}
                  </span>
                ) : label === 'Notes' ? (
                  item.isAuto ? t('autoAddedFromTransaction') : t('manualNote')
                ) : (
                  'Active Item'
                )}
              </p>
              {label === 'Tasks' && item.dueDate && (
                <span className="text-[9px] font-medium text-slate-400">
                  {new Date(item.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <h4 className="font-medium text-[15px] leading-none tracking-tighter truncate text-slate-900 text-clip-fix">
              {item.name || item.txName}
            </h4>
          </div>
        </button>

        <div className="flex items-center gap-3 shrink-0 relative">
          {label === 'Contacts' ? (
            <div className="flex flex-col items-end gap-1 mr-1">
              {contactTotals.contactBalances[item.name]?.paona > 0 && (
                <div className="font-medium text-[15px] text-emerald-600">
                  {formatAmount(contactTotals.contactBalances[item.name].paona)}
                </div>
              )}
              {contactTotals.contactBalances[item.name]?.dena > 0 && (
                <div className="font-medium text-[15px] text-rose-600">
                  {formatAmount(contactTotals.contactBalances[item.name].dena)}
                </div>
              )}
              {(!contactTotals.contactBalances[item.name] || (contactTotals.contactBalances[item.name].paona === 0 && contactTotals.contactBalances[item.name].dena === 0)) && (
                <span className="font-medium text-[15px] text-slate-400">0.00</span>
              )}
            </div>
          ) : label === 'Reminders' && item.amount ? (
            <div className="font-medium text-[15px] text-emerald-600 mr-1">
              {formatAmount(Number(item.amount))}
            </div>
          ) : item.txName ? (
            <div className="font-medium text-[15px] text-slate-900 mr-1">
              {formatAmount(item.amount)}
            </div>
          ) : null}

          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveOptionsIndex(activeOptionsIndex === idx ? null : idx); }}
              onPointerDown={(e) => e.stopPropagation()}
              className={cn(
                "p-1.5 rounded-md transition-all",
                activeOptionsIndex === idx ? "text-slate-600 bg-slate-100" : "text-slate-300 hover:text-slate-600 hover:bg-slate-100"
              )}
            >
              <MoreVertical size={16} />
            </button>

            <AnimatePresence>
              {activeOptionsIndex === idx && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-[160] overflow-hidden py-1"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {label === 'Tasks' && (
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        const updatedItem = { ...item, status: item.status === 'completed' ? 'pending' : 'completed' };
                        onUpdate(label, originalIdx, updatedItem);
                        setActiveOptionsIndex(null);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                        item.status === 'completed' ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <Check size={16} />
                      {item.status === 'completed' ? t('markPending') || 'Mark Pending' : t('markCompleted') || 'Mark Completed'}
                    </button>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); startEdit(item, originalIdx); setActiveOptionsIndex(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                  >
                    <Edit2 size={16} />
                    {t('edit') || 'Edit'}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleArchive(label, originalIdx, isCategory ? (activeType === 'all' ? item.type : activeType) : undefined); setActiveOptionsIndex(null); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                      item.isArchived ? "text-amber-600 hover:bg-amber-50" : "text-slate-700 hover:text-amber-600 hover:bg-amber-50"
                    )}
                  >
                    {item.isArchived ? <RotateCcw size={16} /> : <Archive size={16} />}
                    {item.isArchived ? t('unarchive') || 'Unarchive' : t('archive') || 'Archive'}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(label, originalIdx, isCategory ? (activeType === 'all' ? item.type : activeType) : undefined); setActiveOptionsIndex(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
                  >
                    <Trash2 size={16} />
                    {t('delete') || 'Delete'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  const allCategories = useMemo(() => {
    if (!data.categories) return [];
    return Object.values(data.categories).flat();
  }, [data.categories]);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[150] bg-white overflow-y-auto"
    >
      <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="rotate-180" size={24} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t(label.charAt(0).toLowerCase() + label.slice(1).replace(' ', '')) || label}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{filteredItems.length} {t('items')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className={cn(
              "p-3 rounded-xl transition-all border-2",
              showArchived ? "bg-amber-50 border-amber-200 text-amber-600 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400"
            )}
            title={showArchived ? "Show Active" : "Show Archived"}
          >
            <Archive size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-white border-b border-slate-100 sticky top-[89px] z-10">
        <div className={cn("relative group", (label === 'Categories' || label === 'Sub Categories') && "mb-4")}>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder={t('search') || 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all border border-transparent focus:border-emerald-100"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {label === 'Categories' && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'expense', 'income', 'dena', 'paona', 'joma', 'invest'].map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                  activeType === type 
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {t(type) || type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {label === 'Sub Categories' && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSubCategoryFilter('All')}
              className={cn(
                "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                subCategoryFilter === 'All'
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {t('all') || 'All'}
            </button>
            {Object.values(data.categories).flat().map((cat: any) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setSubCategoryFilter(cat.name)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                  subCategoryFilter === cat.name
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {label === 'Contacts' && (
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs text-emerald-600 font-medium uppercase flex items-center justify-center gap-1">
                <ArrowDownLeft size={12} /> Will Get
              </p>
              <p className="text-lg font-medium text-emerald-600">{formatAmount(contactTotals.totalPaona)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-rose-600 font-medium uppercase flex items-center justify-center gap-1">
                <ArrowUpRight size={12} /> Will Give
              </p>
              <p className="text-lg font-medium text-rose-600">{formatAmount(contactTotals.totalDena)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-600 font-medium uppercase flex items-center justify-center gap-1">
                <User size={12} /> Total
              </p>
              <p className="text-lg font-medium text-blue-600">{currentItems.length.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} People</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 pb-32">
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border-4 border-white shadow-inner">
              <Inbox size={48} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('noItemsFound') || 'No items found'}</h3>
            <p className="text-sm text-slate-400 max-w-[200px] font-medium leading-relaxed">
              {searchQuery ? t('tryDifferentSearch') || 'Try a different search term' : t('startByAddingNew') || 'Start by adding something new'}
            </p>
          </motion.div>
        ) : label === 'Accounts' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item: any, idx: number) => {
              const IconComp = ICON_LIST.find(i => i.name === item.icon)?.icon || Tag;
              const originalIdx = item.originalIndex;
              
              return (
                <div 
                  key={item.id || idx} 
                  className="group relative rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color || '#10b981'} 0%, ${item.color ? item.color + 'cc' : '#059669'} 100%)`,
                    color: '#ffffff'
                  }}
                >
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl" />
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-black opacity-10 blur-xl" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30 shadow-sm">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                          ) : (
                            <IconComp size={20} strokeWidth={2.5} className="text-white drop-shadow-sm" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg leading-tight text-white drop-shadow-sm truncate max-w-[150px]">
                            {item.name}
                          </h4>
                          <p className="text-[11px] font-medium uppercase tracking-widest text-white/80 truncate">
                            {item.accountType}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {item.isDefault && (
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md text-[9px] font-bold uppercase tracking-widest shadow-sm">
                            Default
                          </span>
                        )}
                        {item.isPinned && (
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md text-[9px] font-bold uppercase tracking-widest shadow-sm">
                            Pinned
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-white/80 mb-0.5 uppercase tracking-widest">Current Balance</p>
                        <div className="font-black text-2xl tracking-tight text-white drop-shadow-md">
                          {formatAmount(item.currentBalance)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 relative">
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOptionsIndex(activeOptionsIndex === idx ? null : idx);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className={cn(
                              "p-2 rounded-lg transition-all",
                              activeOptionsIndex === idx ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            <MoreVertical size={16} />
                          </button>

                          <AnimatePresence>
                            {activeOptionsIndex === idx && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-[160] overflow-hidden py-1"
                                onClick={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                              >
                                {!item.isArchived && (
                                  <>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); onTogglePin?.(originalIdx); setActiveOptionsIndex(null); }}
                                      className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                                        item.isPinned ? "text-amber-600 hover:bg-amber-50" : "text-slate-700 hover:text-amber-600 hover:bg-amber-50"
                                      )}
                                    >
                                      <Pin size={16} className={item.isPinned ? "fill-current" : ""} />
                                      {item.isPinned ? t('unpin') || 'Unpin' : t('pin') || 'Pin'}
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); onSetDefault?.(originalIdx); setActiveOptionsIndex(null); }}
                                      className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                                        item.isDefault ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                                      )}
                                    >
                                      <Check size={16} />
                                      {item.isDefault ? t('default') || 'Default' : t('setDefault') || 'Set Default'}
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={(e) => { e.stopPropagation(); startEdit(item, originalIdx); setActiveOptionsIndex(null); }}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                                >
                                  <Edit2 size={16} />
                                  {t('edit') || 'Edit'}
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onToggleArchive(label, originalIdx, isCategory ? activeType : undefined); setActiveOptionsIndex(null); }}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left",
                                    item.isArchived ? "text-amber-600 hover:bg-amber-50" : "text-slate-700 hover:text-amber-600 hover:bg-amber-50"
                                  )}
                                >
                                  {item.isArchived ? <RotateCcw size={16} /> : <Archive size={16} />}
                                  {item.isArchived ? t('unarchive') || 'Unarchive' : t('archive') || 'Archive'}
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onRemove(label, originalIdx, isCategory ? activeType : undefined); setActiveOptionsIndex(null); }}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
                                >
                                  <Trash2 size={16} />
                                  {t('delete') || 'Delete'}
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {groupedSubCategories ? (
              Object.entries(groupedSubCategories).map(([parent, items]: [string, any], groupIdx) => (
                <div key={parent} className="bg-white rounded-lg border border-slate-100 shadow-sm">
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                        <Tag size={16} />
                      </div>
                      <h5 className="text-xs font-medium text-slate-900 uppercase tracking-widest">{parent}</h5>
                    </div>
                    <span className="px-2 py-1 bg-white text-slate-400 text-xs font-medium rounded-lg border border-slate-100">
                      {items.length} ITEMS
                    </span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {items.map((item: any, idx: number) => renderItem(item, idx, idx === items.length - 1))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg border border-slate-200">
                {filteredItems.length > 0 ? (
                  <div className="flex flex-col">
                    {filteredItems.map((item: any, idx: number) => renderItem(item, idx, idx === filteredItems.length - 1))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border-4 border-white shadow-inner">
                      <Inbox size={48} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{t('noItemsYet')}</h3>
                    <p className="text-sm text-slate-400 max-w-[200px] font-medium leading-relaxed mx-auto">
                      {t('clickNewButtonToAddFirstItem')}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium">
              {showArchived ? "No archived items found." : "No active items found."}
            </p>
            {!showArchived && (
              <p className="text-slate-300 text-xs mt-1">{t('clickNewButtonToAddFirstItem')}</p>
            )}
          </div>
        )}
      </div>

      {!isAdding && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-10 right-8 z-[140]"
        >
          <button 
            onClick={() => {
              if (label === 'Reminders') {
                onOpenAddReminder();
              } else {
                setIsAdding(true);
              }
            }}
            className="w-16 h-16 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_-8px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Plus size={32} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {isAdding && label === 'Accounts' ? (
          <AddAccountView 
            onClose={() => setIsAdding(false)}
            onSave={(itemData) => {
              if (itemData.isPinned) {
                const pinnedCount = data.accounts.filter((acc: any, i: number) => acc.isPinned && i !== editingIndex).length;
                if (pinnedCount >= 3) {
                  alert("You can only pin up to 3 wallets.");
                  return;
                }
              }
              if (editingIndex !== null) {
                onUpdate('Accounts', editingIndex, itemData);
              } else {
                onAdd('Accounts', itemData);
              }
              resetForm();
            }}
            accountTypes={accountTypes || []}
            onAddAccountType={onAddAccountType || (() => {})}
            initialData={editingIndex !== null ? currentItems[editingIndex] : undefined}
          />
        ) : isAdding && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[160]"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[161] shadow-xl max-h-[90vh] flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {editingIndex !== null ? t('edit') || 'Edit' : t('addNew') || 'Add New'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {isCategory && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">{t('transactionType')}</label>
                      <div className="flex flex-wrap gap-2">
                        {['expense', 'income', 'dena', 'paona', 'joma', 'invest'].map(t => (
                          <button 
                            key={t}
                            onClick={() => setActiveType(t as any)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize",
                              activeType === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {label === 'Sub Categories' && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">{t('parentCategory')}</label>
                      <div className="relative">
                        <select 
                          value={parentCategory}
                          onChange={(e) => setParentCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none appearance-none"
                        >
                          <option value="">{t('selectParentCategory')}</option>
                          {allCategories.map((cat: any) => (
                            <option key={cat.id || cat.name} value={cat.name}>{cat.name} ({cat.type})</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronRight className="rotate-90" size={16} />
                        </div>
                      </div>
                    </div>
                  )}

                  {label === 'Reminders' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500">
                          {t('date')}
                        </label>
                        <input 
                          type="date" 
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500">
                          {t('time')}
                        </label>
                        <input 
                          type="time" 
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500">
                          {t('amount')}
                        </label>
                        <input 
                          type="number" 
                          value={reminderAmount}
                          onChange={(e) => setReminderAmount(e.target.value)}
                          placeholder={t('enterAmount')}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {label === 'Tasks' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500">
                          {t('priority')}
                        </label>
                        <div className="flex gap-2">
                          {['low', 'medium', 'high'].map(p => (
                            <button
                              key={p}
                              onClick={() => setTaskPriority(p as any)}
                              className={cn(
                                "flex-1 py-2 px-4 rounded-xl text-xs font-medium transition-all capitalize",
                                taskPriority === p ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              )}
                            >
                              {t(p)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500">
                          {t('dueDate')}
                        </label>
                        <input 
                          type="date" 
                          value={taskDueDate}
                          onChange={(e) => setTaskDueDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">
                      {label === 'Notes' ? t('managementNoteContent') : t('name')}
                    </label>
                    {label === 'Notes' ? (
                      <textarea 
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={t('managementNotePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none min-h-[120px] resize-none"
                      />
                    ) : (
                      <input 
                        type="text" 
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={t('enterName')}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                      />
                    )}
                  </div>

                  {label === 'Contacts' && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">
                        {t('phone')}
                      </label>
                      <input 
                        type="tel" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder={t('enterPhone')}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 transition-all outline-none"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-500">{t('iconAndColor')}</label>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-all"
                        >
                          <Plus size={16} />
                        </button>
                        <div 
                          className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                          style={{ backgroundColor: selectedColor }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6'].map(c => (
                        <button 
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={cn(
                            "aspect-square rounded-xl transition-all border-2",
                            selectedColor === c ? "border-slate-900 scale-110" : "border-transparent hover:scale-110"
                          )}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSelectedImage(reader.result as string);
                              setSelectedIcon('');
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {ICON_LIST.map(i => (
                        <button 
                          key={i.name}
                          onClick={() => {
                            setSelectedIcon(i.name);
                            setSelectedImage(null);
                          }}
                          className={cn(
                            "aspect-square rounded-xl flex items-center justify-center transition-all border",
                            selectedIcon === i.name ? "border-transparent text-white shadow-md scale-110" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                          )}
                          style={selectedIcon === i.name ? { backgroundColor: selectedColor } : {}}
                        >
                          <i.icon size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm border-t border-slate-100 z-[162]">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={cn(
                    "w-full h-12 bg-emerald-500 text-white rounded-xl font-bold shadow-sm hover:bg-emerald-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2",
                    isSaving && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Check size={20} />
                  {isSaving ? t('saving') || 'Saving...' : (editingIndex !== null ? t('updateItem') || 'Update Item' : t('saveItem') || 'Save Item')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingAccount && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 bg-slate-50 z-[170] flex flex-col"
          >
            <div className="px-6 pt-3 pb-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setViewingAccount(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-medium text-slate-900 truncate">{t('accountDetails')}</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => { startEdit(viewingAccount, viewingAccount.originalIndex); setViewingAccount(null); }}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => { onToggleArchive(label, viewingAccount.originalIndex, isCategory ? activeType : undefined); setViewingAccount(null); }}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                  title={viewingAccount.isArchived ? "Unarchive" : "Archive"}
                >
                  {viewingAccount.isArchived ? <RotateCcw size={18} /> : <Archive size={18} />}
                </button>
                <button 
                  onClick={() => { onRemove(label, viewingAccount.originalIndex, isCategory ? activeType : undefined); setViewingAccount(null); }}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 pb-32 custom-scrollbar bg-slate-50/50">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full rounded-[3rem] p-10 overflow-hidden shadow-2xl mb-10 group"
                style={{ backgroundColor: viewingAccount.color || '#10b981' }}
              >
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-black/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                
                <div className="relative z-10 flex justify-between items-start mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-xl border border-white/30 group-hover:rotate-3 transition-transform">
                      {viewingAccount.image ? (
                        <img src={viewingAccount.image} alt={viewingAccount.name} className="w-full h-full object-cover rounded-3xl" />
                      ) : (
                        React.createElement(ICON_LIST.find(i => i.name === viewingAccount.icon)?.icon || Tag, { size: 40, strokeWidth: 2.5 })
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-3xl tracking-tight leading-none mb-3">{viewingAccount.name}</h4>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                          {viewingAccount.accountType}
                        </span>
                        {viewingAccount.isDefault && (
                          <span className="px-3 py-1 bg-emerald-400/40 backdrop-blur-sm rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-emerald-400/20">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Current Balance</div>
                    <div className="flex items-baseline gap-2 text-white">
                      <span className="text-5xl font-black tracking-tighter">{formatAmount(viewingAccount.currentBalance)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('transactions')}</h3>
                <div className="h-px bg-slate-200 flex-1 mx-6" />
              </div>

              <div className="space-y-4">
                {(() => {
                  const accountTxs = transactions
                    .filter(tx => tx.account === viewingAccount.name || tx.toAccount === viewingAccount.name)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                  
                  return accountTxs.length > 0 ? accountTxs.map((tx, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                      key={tx.id} 
                      className="group bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-emerald-100 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-5 min-w-0">
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                          tx.type === 'income' || tx.type === 'paona' || tx.toAccount === viewingAccount.name ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                        )}>
                          {tx.type === 'income' || tx.type === 'paona' || tx.toAccount === viewingAccount.name ? <ArrowDownLeft size={24} strokeWidth={3} /> : <ArrowUpRight size={24} strokeWidth={3} />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 text-lg tracking-tight truncate leading-tight">{tx.txName || tx.person || tx.category || 'Transfer'}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">
                            {new Date(tx.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={cn(
                          "text-xl font-black tracking-tighter",
                          tx.type === 'income' || tx.type === 'paona' || tx.toAccount === viewingAccount.name ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {formatAmount(tx.amount)}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{tx.type}</p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-6">
                        <Archive size={40} />
                      </div>
                      <p className="text-slate-400 font-black text-sm uppercase tracking-widest">{t('noTransactionsFound')}</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const ProfileView = React.memo(({ transactions, onClose }: { transactions: any[], onClose: () => void }) => {
  const { t, currency, language, formatAmount } = useLanguage();
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  const getSum = (keywords: string[]) => {
    return transactions
      .filter(t => keywords.some(k => t.category?.toLowerCase().includes(k.toLowerCase()) || t.subCategory?.toLowerCase().includes(k.toLowerCase())))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const given = getSum(['given', 'lent', 'Given']);
  const received = getSum(['received', 'borrowed', 'Received']);
  const deposit = getSum(['deposit', 'savings', 'Savings']);
  const debt = getSum(['debt', 'Debt']);
  const loan = getSum(['loan', 'Loan']);
  const investment = getSum(['investment', 'invest', 'Investment']);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-[#121418] text-white overflow-y-auto pb-32"
    >
      <div className="px-6 pt-3 pb-6 bg-[#121418] flex items-center gap-4">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-medium">{t('myProfile')}</h1>
      </div>

      <div className="px-6 space-y-8">
        {/* Cards & Wallets */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t('overview')}</h2>
            <button className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">{t('viewAll')}</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-6 px-6">
            <div className="min-w-[160px] bg-emerald-500 rounded-lg p-5 snap-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
              <Wallet className="text-white/80 mb-8 relative z-10" size={24} />
              <p className="text-white/90 text-sm font-medium mb-1 relative z-10">{t('balance')}</p>
              <h3 className="text-2xl font-medium relative z-10">{formatAmount(balance)}</h3>
            </div>
            <div className="min-w-[160px] bg-blue-500 rounded-lg p-5 snap-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
              <ArrowDownLeft className="text-white/80 mb-8 relative z-10" size={24} />
              <p className="text-white/90 text-sm font-medium mb-1 relative z-10">{t('income')}</p>
              <h3 className="text-2xl font-medium relative z-10">{formatAmount(income)}</h3>
            </div>
            <div className="min-w-[160px] bg-rose-500 rounded-lg p-5 snap-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
              <ArrowUpRight className="text-white/80 mb-8 relative z-10" size={24} />
              <p className="text-white/90 text-sm font-medium mb-1 relative z-10">{t('expense')}</p>
              <h3 className="text-2xl font-medium relative z-10">{formatAmount(expense)}</h3>
            </div>
          </div>
        </section>

        {/* Investments & Savings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t('assetsAndSavings')}</h2>
            <button className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">{t('viewAll')}</button>
          </div>
          <div className="bg-[#1C1F26] rounded-lg p-2">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <PiggyBank size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('deposit')}</h4>
                  <p className="text-slate-400 text-xs">{t('totalSavings')}</p>
                </div>
              </div>
              <span className="font-medium text-indigo-400 text-sm">{formatAmount(deposit)}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('investment')}</h4>
                  <p className="text-slate-400 text-xs">{t('totalInvested')}</p>
                </div>
              </div>
              <span className="font-medium text-purple-400 text-sm">{formatAmount(investment)}</span>
            </div>
          </div>
        </section>

        {/* Debts & Loans */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t('debtsAndLoans')}</h2>
            <button className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">{t('viewAll')}</button>
          </div>
          <div className="bg-[#1C1F26] rounded-lg p-2">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <ArrowUpRight size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('given')}</h4>
                  <p className="text-slate-400 text-xs">{t('moneyYouGave')}</p>
                </div>
              </div>
              <span className="font-medium text-amber-400 text-sm">{formatAmount(given)}</span>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ArrowDownLeft size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('received')}</h4>
                  <p className="text-slate-400 text-xs">{t('moneyYouReceived')}</p>
                </div>
              </div>
              <span className="font-medium text-emerald-400 text-sm">{formatAmount(received)}</span>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('debt')}</h4>
                  <p className="text-slate-400 text-xs">{t('moneyYouOwe')}</p>
                </div>
              </div>
              <span className="font-medium text-rose-400 text-sm">{formatAmount(debt)}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Banknote size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t('loan')}</h4>
                  <p className="text-slate-400 text-xs">{t('moneyOwedToYou')}</p>
                </div>
              </div>
              <span className="font-medium text-blue-400 text-sm">{formatAmount(loan)}</span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
});

const CurrencySelectionView: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { currency, setCurrency, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = CURRENCIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-slate-50 z-50 flex flex-col"
    >
      <div className="bg-white px-4 py-4 border-b border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-medium text-slate-900">{t('currency')}</h2>
        </div>
      </div>

      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('search') || 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredCurrencies.map((c) => (
          <button 
            key={c.code}
            onClick={() => {
              setCurrency(c);
              onClose();
            }}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl transition-colors border",
              currency.code === c.code 
                ? "bg-emerald-50 border-emerald-200" 
                : "bg-white border-slate-100 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm border border-slate-200/50 text-2xl">
                {c.icon}
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-[15px]">{c.name}</h4>
                <p className="text-slate-500 text-[12px] font-medium">{c.country} • {c.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono font-medium bg-slate-100 px-2 py-1 rounded-md text-sm">{c.symbol}</span>
              {currency.code === c.code && (
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <Check size={14} />
                </div>
              )}
            </div>
          </button>
        ))}
        {filteredCurrencies.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>{t('noCurrenciesFound')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EditHomePageView: React.FC<{ 
  onBack: () => void,
  sections: Record<string, boolean>,
  onToggle: (id: string) => void
}> = ({ onBack, sections, onToggle }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white pb-32"
    >
      <div className="px-6 pt-3 pb-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium text-slate-900">{t('editHomePage')}</h2>
      </div>
      
      <div className="p-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-blue-700 text-xs font-medium leading-relaxed">
            {t('customizeHomeLayout')}
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest px-2 mb-2">{t('summaryGridItems')}</h3>
            {[
              { id: 'summary_expense', label: t('expense'), icon: ArrowUpRight, color: 'text-rose-600', bg: 'bg-rose-100' },
              { id: 'summary_income', label: t('income'), icon: ArrowDownLeft, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { id: 'summary_taken', label: t('taken'), icon: ArrowLeftRight, color: 'text-rose-600', bg: 'bg-rose-100' },
              { id: 'summary_given', label: t('given'), icon: ArrowLeftRight, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { id: 'summary_savings', label: t('savings'), icon: PiggyBank, color: 'text-blue-600', bg: 'bg-blue-100' },
              { id: 'summary_invest', label: t('invest'), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-100' },
              { id: 'summary_savings_total', label: t('savingsTotal'), icon: PiggyBank, color: 'text-indigo-600', bg: 'bg-indigo-100' },
            ].map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className={cn("w-8 h-8 rounded flex items-center justify-center", item.bg, item.color)}>
                     <item.icon size={16} />
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-900">{item.label}</span>
                   </div>
                 </div>
                 <button 
                   onClick={() => onToggle(item.id)}
                   className={cn("w-12 h-6 rounded-full transition-colors relative", sections[item.id] ? "bg-emerald-500" : "bg-slate-300")}
                 >
                   <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", sections[item.id] ? "translate-x-7" : "translate-x-1")} />
                 </button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest px-2 mb-2">{t('otherSections')}</h3>
            
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                   <Zap size={16} />
                 </div>
                 <div>
                   <span className="text-sm font-medium text-slate-900">{t('quickActions') || 'Quick Actions'}</span>
                   <p className="text-xs text-slate-500">{t('quickActionsDescription') || 'Show quick action buttons'}</p>
                 </div>
               </div>
               <button 
                 onClick={() => onToggle('quickActions')}
                 className={cn("w-12 h-6 rounded-full transition-colors relative", sections.quickActions ? "bg-emerald-500" : "bg-slate-300")}
               >
                 <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", sections.quickActions ? "translate-x-7" : "translate-x-1")} />
               </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                   <History size={16} />
                 </div>
                 <div>
                   <span className="text-sm font-medium text-slate-900">{t('recentActivity')}</span>
                   <p className="text-xs text-slate-500">{t('latestTransactionsList')}</p>
                 </div>
               </div>
               <button 
                 onClick={() => onToggle('activity')}
                 className={cn("w-12 h-6 rounded-full transition-colors relative", sections.activity ? "bg-emerald-500" : "bg-slate-300")}
               >
                 <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", sections.activity ? "translate-x-7" : "translate-x-1")} />
               </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center text-emerald-600">
                   <ShieldCheck size={16} />
                 </div>
                 <div>
                   <span className="text-sm font-medium text-slate-900">{t('securityBanner')}</span>
                   <p className="text-xs text-slate-500">{t('safetyTipsSetupBanner')}</p>
                 </div>
               </div>
               <button 
                 onClick={() => onToggle('banner')}
                 className={cn("w-12 h-6 rounded-full transition-colors relative", sections.banner ? "bg-emerald-500" : "bg-slate-300")}
               >
                 <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", sections.banner ? "translate-x-7" : "translate-x-1")} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QuickActionsView: React.FC<{
  onBack: () => void;
  onQuickAction: (action: string) => void;
}> = ({ onBack, onQuickAction }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-white pb-32"
    >
      <div className="px-6 pt-3 pb-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium text-slate-900">{t('quickActions') || 'Quick Actions'}</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <button onClick={() => onQuickAction('expense')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-rose-50 hover:border-rose-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-rose-500/10 backdrop-blur-md border border-rose-500/20 flex items-center justify-center text-rose-500 group-hover:bg-rose-500/20 transition-all shadow-sm">
              <Minus size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('expense') || 'খরচ'}</span>
          </button>
          
          <button onClick={() => onQuickAction('income')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/20 transition-all shadow-sm">
              <Plus size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('income') || 'আয়'}</span>
          </button>
          
          <button onClick={() => onQuickAction('tasks')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-all shadow-sm">
              <CheckCircle2 size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('tasks') || 'টাস্ক'}</span>
          </button>
          
          <button onClick={() => onQuickAction('debt')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-amber-50 hover:border-amber-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-all shadow-sm">
              <Users size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('debt') || 'দেনা-পাওনা'}</span>
          </button>

          <button onClick={() => onQuickAction('reminder')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-purple-50 hover:border-purple-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:bg-purple-500/20 transition-all shadow-sm">
              <Bell size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('reminder') || 'রিমাইন্ডার'}</span>
          </button>

          <button onClick={() => onQuickAction('note')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500/20 transition-all shadow-sm">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('note') || 'নোট'}</span>
          </button>

          <button onClick={() => onQuickAction('recurring')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-cyan-50 hover:border-cyan-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500/20 transition-all shadow-sm">
              <Repeat size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('recurring') || 'রিকোয়িং'}</span>
          </button>

          <button onClick={() => onQuickAction('subscription')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-pink-50 hover:border-pink-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-pink-500/10 backdrop-blur-md border border-pink-500/20 flex items-center justify-center text-pink-500 group-hover:bg-pink-500/20 transition-all shadow-sm">
              <CreditCard size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">{t('subscription') || 'সাবস্ক্রিপশন'}</span>
          </button>

          <button onClick={() => onQuickAction('add_shortcut')} className="flex flex-col items-center gap-3 group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-500/5 backdrop-blur-md border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-slate-400 group-hover:bg-slate-500/10 transition-all shadow-sm">
              <Plus size={24} strokeWidth={2} />
            </div>
            <span className="text-xs font-medium text-slate-500 text-center">{t('add') || 'যোগ করুন'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const WidgetSettingsView: React.FC<{ 
  onBack: () => void,
  enabled: boolean,
  onToggle: (val: boolean) => void
}> = ({ onBack, enabled, onToggle }) => {
  const { t } = useLanguage();
  const [style, setStyle] = useState('solid');
  const [opacity, setOpacity] = useState(100);

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-white z-50 overflow-y-auto pb-20">
      <div className="p-6 flex items-center gap-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="text-slate-900 font-medium text-lg">{t('widgetSettings')}</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-slate-900 font-medium">{t('enableWidget')}</h3>
            <p className="text-slate-500 text-sm">{t('widgetDesc')}</p>
          </div>
          <button 
            onClick={() => onToggle(!enabled)}
            className={cn("w-12 h-6 rounded-full transition-colors relative", enabled ? "bg-emerald-500" : "bg-slate-300")}
          >
            <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", enabled ? "translate-x-7" : "translate-x-1")} />
          </button>
        </div>

        {enabled && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('widgetStyle')}</label>
              <div className="grid grid-cols-2 gap-3">
                {['solid', 'transparent'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      "p-4 rounded-xl border text-sm font-medium transition-all",
                      style === s ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('opacity')}</label>
                <span className="text-xs font-medium text-emerald-600">{opacity}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={opacity} 
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-50" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Total Balance</p>
                  <p className="text-white text-xl font-bold font-mono">$12,450.00</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <Plus size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FloatingBubbleSettingsView: React.FC<{ 
  onBack: () => void,
  enabled: boolean,
  onToggle: (val: boolean) => void
}> = ({ onBack, enabled, onToggle }) => {
  const { t } = useLanguage();
  const [size, setSize] = useState('medium');
  const [opacity, setOpacity] = useState(80);

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-white z-50 overflow-y-auto pb-20">
      <div className="p-6 flex items-center gap-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="text-slate-900 font-medium text-lg">{t('floatingBubbleSettings')}</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-slate-900 font-medium">{t('enableFloatingBubble')}</h3>
            <p className="text-slate-500 text-sm">{t('floatingBubbleDesc')}</p>
          </div>
          <button 
            onClick={() => onToggle(!enabled)}
            className={cn("w-12 h-6 rounded-full transition-colors relative", enabled ? "bg-emerald-500" : "bg-slate-300")}
          >
            <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", enabled ? "translate-x-7" : "translate-x-1")} />
          </button>
        </div>

        {enabled && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('size')}</label>
              <div className="grid grid-cols-3 gap-3">
                {['small', 'medium', 'large'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "p-3 rounded-xl border text-sm font-medium transition-all",
                      size === s ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('opacity')}</label>
                <span className="text-xs font-medium text-emerald-600">{opacity}%</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={opacity} 
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="flex justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 relative">
              <div 
                className={cn(
                  "bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-all",
                  size === 'small' ? "w-10 h-10" : size === 'medium' ? "w-14 h-14" : "w-18 h-18"
                )}
                style={{ opacity: opacity / 100 }}
              >
                <Plus size={size === 'small' ? 20 : size === 'medium' ? 28 : 36} />
              </div>
              <p className="absolute bottom-4 text-[10px] text-slate-400 uppercase tracking-widest">Preview</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const SettingsView = React.memo(({ 
  onOpenWorkspace, 
  onOpenDetail, 
  onAddNew, 
  searchQuery, 
  setSearchQuery, 
  onSearchFocus, 
  totals, 
  onOpenProfile, 
  darkMode, 
  setDarkMode,
  onOpenEditHome,
  onOpenQuickActions,
  widgetEnabled,
  setWidgetEnabled,
  floatingBubbleEnabled,
  setFloatingBubbleEnabled,
  onOpenWidgetSettings,
  onOpenFloatingBubbleSettings
}: { 
  onOpenWorkspace: (id: string) => void, 
  onOpenDetail: (label: string) => void,
  onAddNew: (label: string) => void,
  searchQuery: string,
  setSearchQuery: (q: string) => void,
  onSearchFocus: () => void,
  totals: any,
  onOpenProfile: () => void,
  darkMode: boolean,
  setDarkMode: (value: boolean) => void,
  onOpenEditHome: () => void,
  onOpenQuickActions: () => void,
  widgetEnabled: boolean,
  setWidgetEnabled: (value: boolean) => void,
  floatingBubbleEnabled: boolean,
  setFloatingBubbleEnabled: (value: boolean) => void,
  onOpenWidgetSettings: () => void,
  onOpenFloatingBubbleSettings: () => void
}) => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [biometricLock, setBiometricLock] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const { language, setLanguage, currency, t } = useLanguage();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-32 bg-white min-h-screen">
      <div className="px-6 pt-6">
        <h2 className="text-slate-900 font-medium text-2xl mb-6">{t('settings')}</h2>
      
      {/* Premium */}
      <button className="w-full bg-slate-100 rounded-lg p-4 mb-4 flex items-center justify-between border border-emerald-500/20">
        <div className="flex items-center gap-3 text-emerald-600">
          <Award size={20} />
          <span className="font-medium text-sm">{t('upgradeToPremium')}</span>
        </div>
        <ChevronRight size={20} className="text-emerald-500" />
      </button>
      <button className="w-full bg-amber-500/10 rounded-lg p-4 mb-8 flex items-center justify-between border border-amber-500/20">
        <div className="flex items-center gap-3 text-amber-600">
          <Star size={20} />
          <span className="font-medium text-sm">{t('claimAdFree')}</span>
        </div>
        <span className="font-medium text-sm text-amber-600">0 pts</span>
      </button>

      {/* Appearance */}
      <div className="mb-8">
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('appearance')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <button 
            onClick={onOpenEditHome}
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-emerald-500/10 backdrop-blur-xl border border-white shadow-sm flex items-center justify-center text-emerald-500">
                <Layout size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('editHomePage')}</h4>
                <p className="text-slate-500 text-xs">{t('customizeHomeLayout')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          <button 
            onClick={onOpenQuickActions}
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-purple-500/10 backdrop-blur-xl border border-white shadow-sm flex items-center justify-center text-purple-500">
                <Zap size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('quickActions') || 'Quick Actions'}</h4>
                <p className="text-slate-500 text-xs">{t('quickActionsDescription') || 'View all quick actions'}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          <div className="flex items-center justify-between p-4 hover:bg-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-indigo-500/10 backdrop-blur-xl border border-white shadow-sm flex items-center justify-center text-indigo-500">
                <Moon size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('darkMode')}</h4>
                <p className="text-slate-500 text-xs">{t('switchLightDarkMode')}</p>
              </div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={cn("w-12 h-6 rounded-full transition-colors relative", darkMode ? "bg-indigo-500" : "bg-slate-300")}
            >
              <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-transform", darkMode ? "translate-x-7" : "translate-x-1")} />
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-8">
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('preferences')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <button 
            onClick={() => setShowCurrencyModal(true)}
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 shadow-sm flex items-center justify-center text-emerald-500">
                <Wallet size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('currency')}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-200">
                    <img 
                      src={`https://flagcdn.com/w20/${currency.flagCode}.png`} 
                      alt={currency.country}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-slate-500 text-xs">{t('chooseCurrency')} • {currency.code}</p>
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
          
          <button 
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-blue-500/10 backdrop-blur-md border border-blue-500/20 shadow-sm flex items-center justify-center text-blue-500">
                <Globe size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('language')}</h4>
                <p className="text-slate-500 text-xs">{t('chooseLanguage')} • {language === 'en' ? 'English' : 'বাংলা'}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-purple-500/10 backdrop-blur-md border border-purple-500/20 shadow-sm flex items-center justify-center text-purple-500">
                <Layout size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('appIcon')}</h4>
                <p className="text-slate-500 text-xs">{t('changeAppIcon')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Widget Option */}
          <button 
            onClick={onOpenWidgetSettings}
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-amber-500/10 backdrop-blur-md border border-amber-500/20 shadow-sm flex items-center justify-center text-amber-500">
                <LayoutGrid size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('widget')}</h4>
                <p className="text-slate-500 text-xs">{t('widgetDesc')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Floating Bubble Option */}
          <button 
            onClick={onOpenFloatingBubbleSettings}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-rose-500/10 backdrop-blur-md border border-rose-500/20 shadow-sm flex items-center justify-center text-rose-500">
                <Activity size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('floatingBubble')}</h4>
                <p className="text-slate-500 text-xs">{t('floatingBubbleDesc')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="mb-8">
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('security')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[0.85rem] bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 shadow-sm flex items-center justify-center text-emerald-500">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-slate-900 font-medium text-sm">{t('appLock')}</h4>
                <p className="text-slate-500 text-xs">{t('requireAuth')}</p>
              </div>
            </div>
            <button 
              onClick={() => setBiometricLock(!biometricLock)}
              className={cn("w-14 h-8 rounded-full transition-colors relative", biometricLock ? "bg-emerald-500" : "bg-slate-300")}
            >
              <div className={cn("w-6 h-6 bg-white rounded-full absolute top-1 transition-transform", biometricLock ? "translate-x-7" : "translate-x-1")} />
            </button>
          </div>
          
          {/* Privacy Mode */}
          <div className="flex items-center justify-between p-4 hover:bg-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-slate-900 font-medium text-sm">{t('privacyMode')}</h4>
                <p className="text-slate-500 text-xs">{t('hideAmounts')}</p>
              </div>
            </div>
            <button 
              onClick={() => setPrivacyMode(!privacyMode)}
              className={cn("w-14 h-8 rounded-full transition-colors relative", privacyMode ? "bg-emerald-500" : "bg-slate-300")}
            >
              <div className={cn("w-6 h-6 bg-white rounded-full absolute top-1 transition-transform", privacyMode ? "translate-x-7" : "translate-x-1")} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Export PDF Removed */}

      {/* Data Backup */}
      <div className="mb-8">
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('dataBackup')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <button 
            onClick={() => {}} // TODO: Implement export
            className="w-full flex items-center justify-between p-4 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Cloud size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('exportData')}</h4>
                <p className="text-slate-500 text-xs">{t('downloadData')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-8">
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('notifications')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 hover:bg-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-500">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="text-slate-900 font-medium text-sm">{t('dailyReminder')}</h4>
                <p className="text-slate-500 text-xs">{t('getRemindedToLog')}</p>
              </div>
            </div>
            <button 
              onClick={() => setDailyReminder(!dailyReminder)}
              className={cn("w-14 h-8 rounded-full transition-colors relative", dailyReminder ? "bg-emerald-500" : "bg-slate-300")}
            >
              <div className={cn("w-6 h-6 bg-white rounded-full absolute top-1 transition-transform", dailyReminder ? "translate-x-7" : "translate-x-1")} />
            </button>
          </div>
          <button 
            onClick={() => onOpenDetail('Reminders')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                <Bell size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-slate-900 font-medium text-sm">{t('expenseReminders')}</h4>
                <p className="text-slate-500 text-xs">{t('manageRecurringReminders')}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* About */}
      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase mb-4 px-2">{t('about')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          {[
            { label: t('rateUs'), icon: Star, sub: t('leaveReview') },
            { label: t('inviteFriend'), icon: Users, sub: t('shareWithFriends') },
            { label: t('website'), icon: Globe, sub: t('visitWebsite') },
            { label: t('version'), icon: Info, sub: '2.8.1' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-4 hover:bg-slate-200 transition-colors border-b border-slate-200 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-slate-900 font-medium text-sm">{item.label}</h4>
                  <p className="text-slate-500 text-xs">{item.sub}</p>
                </div>
              </div>
              {item.label !== t('version') && <ChevronRight size={16} className="text-slate-400" />}
            </button>
          ))}
        </div>
      </div>
      </div>
      
      <AnimatePresence>
        {showLanguageModal && (
          <div className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" 
              onClick={() => setShowLanguageModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[410] pb-8 pt-3 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-medium text-slate-900 mb-4">{t('language') || 'Language'}</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => { setLanguage('en'); setShowLanguageModal(false); }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                    language === 'en' ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <span>{t('english')}</span>
                  {language === 'en' && <Check size={18} />}
                </button>
                
                <button 
                  onClick={() => { setLanguage('bn'); setShowLanguageModal(false); }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                    language === 'bn' ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <span>{t('bengali')}</span>
                  {language === 'bn' && <Check size={18} />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCurrencyModal && (
          <CurrencySelectionView onClose={() => setShowCurrencyModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const WorkspaceDetail = React.memo(({ id, onBack }: { id: string, onBack: () => void }) => {
  const { t } = useLanguage();
  const ws = WORKSPACES.find(w => w.id === id);
  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-white z-[60] overflow-y-auto pb-32"
    >
      <div className="px-6 pt-3 flex items-center gap-4">
        <button onClick={onBack} className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100">
          <ArrowLeftRight className="rotate-180" size={20} />
        </button>
        <h2 className="text-2xl font-medium text-slate-900">{ws?.title} {t('ledger')}</h2>
      </div>

      <div className="px-6 mt-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm mb-4">
          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-2">{t('settlementOverview')}</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900 font-medium text-2xl">$420.00</p>
              <p className="text-slate-400 text-xs">{t('totalGroupSpend')}</p>
            </div>
            <div className="text-right">
              <p className="text-rose-500 font-medium text-2xl">$43.75</p>
              <p className="text-slate-400 text-xs">{t('youOweInTotal')}</p>
            </div>
          </div>
        </div>

        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-2 px-2">{t('expenseBreakdown')}</h3>
        <div className="bg-slate-100 rounded-lg overflow-hidden">
          {SHARED_EXPENSES.map((exp, idx) => (
            <div key={exp.id} className="w-full p-3 border-b border-slate-200 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={exp.avatar} alt={exp.paidBy} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-slate-900 font-medium text-sm">
                      <span className="text-emerald-600">{exp.paidBy}</span> paid <span className="text-slate-900">${exp.amount.toFixed(2)}</span>
                    </h4>
                    <p className="text-slate-500 text-xs">{exp.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium">{exp.date}</span>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-lg p-2 space-y-1 ml-14">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{t('whoOwesWhat')}</p>
                {exp.owes.map((o) => (
                  <div key={o.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-500">
                        {o.name?.[0] || '?'}
                      </div>
                      <span className="text-xs font-medium text-slate-700">{o.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-900">${o.amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-end">
                  <button className="text-emerald-600 font-medium text-xs uppercase tracking-wider">{t('settleUp')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const TransactionDetailView = React.memo(({ tx, onBack, onDelete, onEdit, transactions }: { tx: any, onBack: () => void, onDelete: (id: string) => void, onEdit: () => void, transactions: any[] }) => {
  const { t, language, currency, formatAmount } = useLanguage();
  const Icon = typeof tx.icon === 'string' ? (ICON_LIST.find(i => i.name === tx.icon)?.icon || History) : (tx.icon || History);
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    
    if (dateStr === todayStr) return t('today');
    if (dateStr === yesterdayStr) return t('yesterday');
    
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      if (isNaN(dateObj.getTime())) return dateStr;
      return dateObj.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };
  
  const repayments = transactions.filter(t => t.type === 'repayment' && t.linkedTxId === tx.id);
  const totalRepaid = repayments.reduce((sum, t) => sum + t.amount, 0);
  const isFullyRepaid = (tx.type === 'dena' || tx.type === 'paona') && totalRepaid >= tx.amount;
  const linkedTx = tx.type === 'repayment' ? transactions.find(t => t.id === tx.linkedTxId) : null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }} 
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
      className="absolute inset-0 bg-white pb-32 overflow-y-auto will-change-transform"
    >
      <div className="px-6 pt-3 pb-3 flex items-center justify-between bg-white">
        <button 
          onClick={onBack} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-100 transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(tx.id)} 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm hover:bg-rose-50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="px-6 flex flex-col items-center mt-2">
        <div 
          className="w-20 h-20 rounded-lg flex items-center justify-center shadow-lg mb-4 overflow-hidden relative"
          style={tx.color && !tx.image ? { backgroundColor: `${tx.color}20`, color: tx.color } : { backgroundColor: '#f8fafc', color: '#94a3b8' }}
        >
          {tx.image ? (
            <img src={tx.image} alt={tx.category} className="w-full h-full object-cover" />
          ) : (
            <Icon size={32} />
          )}
          {isFullyRepaid && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-50">
              <CheckCircle2 size={16} className="text-white" />
            </div>
          )}
        </div>
        <h2 className={cn("text-3xl font-medium mb-1 text-clip-fix", tx.type === 'income' ? "text-emerald-600" : tx.type === 'expense' ? "text-rose-600" : "text-slate-900")}>
          {formatAmount(tx.amount)}
        </h2>
        <p className="text-slate-900 font-medium text-lg">{tx.txName || tx.category}</p>
        <p className="text-slate-500 font-medium text-sm">
          {tx.txName ? tx.category : ''} 
          {tx.subCategory ? `${tx.txName ? ' • ' : ''}${tx.subCategory}` : ''}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider", tx.type === 'income' || tx.type === 'paona' || tx.type === 'joma' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
            {tx.type === 'expense' ? t('expense') : 
             tx.type === 'income' ? t('income') : 
             tx.type === 'dena' ? t('taken') : 
             tx.type === 'paona' ? t('given') : 
             tx.type === 'repayment' ? t('repayment') : 
             tx.type === 'joma' ? t('savings') : t('invest')}
          </div>
          {tx.status && tx.status !== 'Normal' && (
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-1.5",
              tx.status === 'Recurring' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
            )}>
              {tx.status === 'Recurring' ? <Repeat size={12} /> : <Clock size={12} />}
              {tx.status === 'Recurring' ? t('recurring') : t('pending')}
            </div>
          )}
          {(tx.addToIncome || tx.addToExpense) && (
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium uppercase tracking-wider">
              {t('balanceUpdated')}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 mt-10 space-y-4">
        {(tx.type === 'dena' || tx.type === 'paona') && (
          <div className="bg-white rounded-lg p-6 border border-slate-100 space-y-4">
            <h4 className="text-slate-900 font-medium text-sm">{t('paymentStatus')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-emerald-600">
                  {tx.type === 'dena' ? t('repayment') : t('collection')}: {formatAmount(totalRepaid)}
                </span>
                <span className="text-slate-400">{t('due')}: {formatAmount(Math.max(0, tx.amount - totalRepaid))}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", isFullyRepaid ? "bg-emerald-500" : "bg-blue-500")}
                  style={{ width: `${Math.min(100, (totalRepaid / tx.amount) * 100)}%` }}
                />
              </div>
            </div>
            
            {repayments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h5 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">{t('paymentHistory')}</h5>
                <div className="space-y-3">
                  {repayments.map(rep => (
                    <div key={rep.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{formatDate(rep.date)}</p>
                        <p className="text-xs text-slate-500">{rep.account}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-emerald-600">{formatAmount(rep.amount)}</span>
                        {(rep.addToIncome || rep.addToExpense) && (
                          <p className="text-xs text-blue-500 font-medium uppercase">{t('balanceUpdated')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tx.type === 'repayment' && linkedTx && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-slate-400 font-medium text-sm mb-4">{t('paidCollected')}</h4>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                <History size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{linkedTx.category}</p>
                <p className="text-xs text-slate-500">{formatDate(linkedTx.date)} • {formatAmount(linkedTx.amount)}</p>
              </div>
              <div className={cn("px-2 py-1 rounded-md text-xs font-medium uppercase", linkedTx.type === 'dena' ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700")}>
                {linkedTx.type === 'dena' ? t('taken') : t('given')}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium text-sm">{t('account')}</span>
            <div className="flex items-center gap-2">
              <div 
                className={cn(
                  "w-6 h-6 rounded-md flex items-center justify-center shrink-0 overflow-hidden",
                  tx.accountImage ? "" : "bg-slate-50 text-slate-500"
                )}
                style={!tx.accountImage ? { backgroundColor: `${tx.accountColor || '#64748b'}20`, color: tx.accountColor || '#64748b' } : {}}
              >
                {tx.accountImage ? (
                  <img src={tx.accountImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  (() => {
                    const iconName = tx.accountIcon || 'Wallet';
                    const IconComp = ICON_LIST.find(i => i.name === iconName)?.icon || Wallet;
                    return <IconComp size={12} />;
                  })()
                )}
              </div>
              <span className="text-slate-900 font-medium">{tx.account || tx.source || 'Cash'}</span>
            </div>
          </div>
          {tx.person && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">{t('personOrg')}</span>
              <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 overflow-hidden",
                    tx.personImage ? "" : "bg-purple-50 text-purple-500"
                  )}
                  style={!tx.personImage ? { backgroundColor: `${tx.personColor || '#a855f7'}20`, color: tx.personColor || '#a855f7' } : {}}
                >
                  {tx.personImage ? (
                    <img src={tx.personImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (() => {
                      const iconName = tx.personIcon || 'User';
                      const IconComp = ICON_LIST.find(i => i.name === iconName)?.icon || User;
                      return <IconComp size={12} />;
                    })()
                  )}
                </div>
                <span className="text-slate-900 font-medium">{tx.person}</span>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium text-sm">{t('date')}</span>
            <span className="text-slate-900 font-medium">{formatDate(tx.date)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium text-sm">{t('time')}</span>
            <span className="text-slate-900 font-medium">{formatDisplayTime(tx.time)}</span>
          </div>
          {tx.location && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium text-sm">{t('location')}</span>
              <span className="text-slate-900 font-medium text-right max-w-[60%]">{tx.location}</span>
            </div>
          )}
        </div>

        {tx.notes && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-slate-400 font-medium text-sm mb-2">{t('notes')}</h4>
            <p className="text-slate-900 font-medium leading-relaxed">{tx.notes}</p>
          </div>
        )}

        {tx.receipt && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-slate-400 font-medium text-sm mb-4">{t('receipt')}</h4>
            <div className="rounded-lg overflow-hidden border border-slate-100">
              <img src={tx.receipt} alt="Receipt" className="w-full h-auto" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const SelectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: any[];
  onSelect: (item: any) => void;
  onAdd: (item: string) => void;
  modalType?: string;
  managementData?: any;
  initialActiveType?: string;
}> = ({ isOpen, onClose, title, items, onSelect, onAdd, modalType, managementData, initialActiveType = 'all' }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'expense' | 'income' | 'dena' | 'paona' | 'joma' | 'invest'>(initialActiveType as any);
  const [subCategoryFilter, setSubCategoryFilter] = useState('All');

  // Update activeType if initialActiveType changes
  useEffect(() => {
    setActiveType(initialActiveType as any);
  }, [initialActiveType]);

  if (!isOpen) return null;

  let displayItems = items;
  if (modalType === 'category' && managementData) {
    displayItems = activeType === 'all' 
      ? Object.entries(managementData.categories).flatMap(([type, list]: [string, any]) => list.map((item: any) => ({ ...item, type })))
      : managementData.categories[activeType] || [];
  } else if (modalType === 'subCategory' && managementData) {
    displayItems = subCategoryFilter === 'All'
      ? managementData.subCategories
      : managementData.subCategories.filter((sub: any) => sub.parentCategory === subCategoryFilter);
  }

  const filteredItems = displayItems.filter((item: any) => 
    (typeof item === 'string' ? item : item.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="relative bg-white w-full rounded-t-lg p-6 max-h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-slate-400">{t('close')}</button>
        </div>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('search') || 'Search...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {modalType === 'category' && managementData && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
            {['all', 'expense', 'income', 'dena', 'paona', 'joma', 'invest'].map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                  activeType === type 
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {t(type) || type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {modalType === 'subCategory' && managementData && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
            <button
              onClick={() => setSubCategoryFilter('All')}
              className={cn(
                "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                subCategoryFilter === 'All'
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {t('all') || 'All'}
            </button>
            {Object.values(managementData.categories).flat().map((cat: any) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setSubCategoryFilter(cat.name)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors",
                  subCategoryFilter === cat.name
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto mb-4">
          {filteredItems.map((item: any, index: number) => (
            <button 
              key={index}
              onClick={() => { onSelect(item); onClose(); }}
              className="w-full text-left py-3 border-b border-slate-100"
            >
              {typeof item === 'string' ? item : item.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={t('addNewPlaceholder')}
            className="flex-1 bg-slate-100 rounded-lg py-2 px-4 outline-none"
          />
          <button 
            onClick={() => { onAdd(newItem); setNewItem(''); }}
            className="bg-emerald-500 text-white p-2 rounded-lg"
          >
            <Plus size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AddTransactionView = React.memo(({ 
  onBack, 
  managementData, 
  onAddTransaction,
  onUpdateTransaction,
  onAddManagementItem,
  onOpenAddReminder,
  initialData,
  transactions
}: { 
  onBack: () => void, 
  managementData: any, 
  onAddTransaction: (tx: any) => void,
  onUpdateTransaction?: (tx: any) => void,
  onAddManagementItem: (category: string, item: any, type?: string) => void,
  onOpenAddReminder: (initialName: string, callback: (reminder: any) => void) => void,
  initialData?: any,
  transactions: any[]
}) => {
  const { t, language, currency } = useLanguage();
  const [type, setType] = useState<'expense' | 'income' | 'dena' | 'paona' | 'repayment' | 'joma' | 'invest' | 'transfer'>(initialData?.type || 'expense');
  const [txName, setTxName] = useState(initialData?.txName || '');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [subCategory, setSubCategory] = useState(initialData?.subCategory || '');
  const defaultAccount = managementData.accounts.find((acc: any) => acc.isDefault)?.name || 'Cash';
  const [account, setAccount] = useState(initialData?.account || defaultAccount);
  const [toAccount, setToAccount] = useState(initialData?.toAccount || '');
  const [person, setPerson] = useState(initialData?.person || '');
  const getLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`
    };
  };

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  const isToday = (dateStr: string) => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return dateStr === todayStr;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    
    if (dateStr === todayStr) return t('today');
    if (dateStr === yesterdayStr) return t('yesterday');
    
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      if (isNaN(dateObj.getTime())) return dateStr;
      return dateObj.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  const localDT = getLocalDateTime();
  const [date, setDate] = useState(initialData?.date || localDT.date);
  const [time, setTime] = useState(initialData?.time || localDT.time);

  useEffect(() => {
    if (!initialData) {
      const current = getLocalDateTime();
      setDate(current.date);
      setTime(current.time);
    }
  }, [initialData]);
  const [note, setNote] = useState(initialData?.notes || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [receipt, setReceipt] = useState<string | null>(initialData?.receipt || null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMoreTypes, setShowMoreTypes] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [status, setStatus] = useState<'Normal' | 'Recurring' | 'Pending'>(initialData?.status || 'Normal');
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  const displayAccounts = [...managementData.accounts].sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  // New states for Dena/Paona/Repayment
  const [addToIncome, setAddToIncome] = useState(initialData?.addToIncome ?? true);
  const [addToExpense, setAddToExpense] = useState(initialData?.addToExpense ?? true);
  const [linkedTxId, setLinkedTxId] = useState(initialData?.linkedTxId || '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (type === 'repayment' && linkedTxId) {
      const linked = transactions.find(t => t.id === linkedTxId);
      if (linked) {
        if (linked.type === 'dena' && linked.addToIncome) {
          setAddToExpense(true);
        } else if (linked.type === 'paona' && linked.addToExpense) {
          setAddToIncome(true);
        }
      }
    }
  }, [linkedTxId, type, transactions]);

  const currentCategories = (managementData.categories as any)[type] || [];
  const selectedCategoryData = currentCategories.find((c: any) => c.name === category);
  const selectedSubCategoryData = managementData.subCategories.find((s: any) => s.name === subCategory && s.parentCategory === category);
  const selectedAccountData = managementData.accounts.find((a: any) => a.name === account);
  const selectedPersonData = managementData.persons.find((p: any) => p.name === person);

  const filteredSubCategories = useMemo(() => {
    if (!category) return managementData.subCategories;
    return managementData.subCategories.filter((sub: any) => sub.parentCategory === category);
  }, [category, managementData.subCategories]);

  const getRepaidAmount = (txId: string) => {
    return transactions
      .filter(t => t.type === 'repayment' && t.linkedTxId === txId)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const pendingDebts = transactions.filter(t => 
    (t.type === 'dena' || t.type === 'paona') && 
    getRepaidAmount(t.id) < t.amount
  );

  const selectedDebt = type === 'repayment' ? transactions.find(t => t.id === linkedTxId) : null;

  const getModalItems = () => {
    switch (modalType) {
      case 'category': return currentCategories;
      case 'subCategory': return managementData.subCategories;
      case 'account': 
      case 'toAccount': return managementData.accounts;
      case 'person': return managementData.persons;
      default: return [];
    }
  };

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);

  const isSaveEnabled = () => {
    if (!amount || parseFloat(amount) <= 0) return false;
    if (!account) return false;
    if (type !== 'repayment' && type !== 'transfer' && !category) return false;
    if (type === 'repayment' && !linkedTxId) return false;
    if (type === 'transfer' && !toAccount) return false;
    return true;
  };

  const handleSave = () => {
    if (!isSaveEnabled()) return;
    
    const newTx = {
      id: initialData?.id || Date.now().toString(),
      type,
      txName,
      amount: parseFloat(amount),
      category: type === 'repayment' ? (selectedDebt?.type === 'dena' ? 'Paid' : 'Collection') : type === 'transfer' ? 'Transfer' : category,
      subCategory,
      account,
      accountIcon: selectedAccountData?.icon,
      accountColor: selectedAccountData?.color,
      accountImage: selectedAccountData?.image,
      toAccount: type === 'transfer' ? toAccount : undefined,
      toAccountIcon: type === 'transfer' ? managementData.accounts.find((a: any) => a.name === toAccount)?.icon : undefined,
      toAccountColor: type === 'transfer' ? managementData.accounts.find((a: any) => a.name === toAccount)?.color : undefined,
      toAccountImage: type === 'transfer' ? managementData.accounts.find((a: any) => a.name === toAccount)?.image : undefined,
      person: type === 'repayment' ? selectedDebt?.person : person,
      date,
      time,
      notes: note,
      location,
      receipt,
      icon: type === 'repayment' ? 'CheckCircle2' : type === 'transfer' ? 'ArrowLeftRight' : (subCategory ? (selectedSubCategoryData?.icon || selectedCategoryData?.icon || 'Tag') : (selectedCategoryData?.icon || initialData?.icon || 'Tag')),
      color: type === 'repayment' ? (selectedDebt?.type === 'dena' ? '#f43f5e' : '#10b981') : type === 'transfer' ? '#3b82f6' : (subCategory ? (selectedSubCategoryData?.color || selectedCategoryData?.color || '#94a3b8') : (selectedCategoryData?.color || initialData?.color || '#94a3b8')),
      image: subCategory ? (selectedSubCategoryData?.image || selectedCategoryData?.image || initialData?.image) : (selectedCategoryData?.image || initialData?.image),
      personIcon: selectedPersonData?.icon,
      personImage: selectedPersonData?.image,
      personColor: selectedPersonData?.color,
      addToIncome: (type === 'dena' || (type === 'repayment' && selectedDebt?.type === 'paona')) ? addToIncome : undefined,
      addToExpense: (type === 'paona' || (type === 'repayment' && selectedDebt?.type === 'dena')) ? addToExpense : undefined,
      linkedTxId: type === 'repayment' ? linkedTxId : undefined,
      repaymentType: type === 'repayment' ? selectedDebt?.type : undefined,
      status
    };

    if (initialData && onUpdateTransaction) {
      onUpdateTransaction(newTx);
    } else {
      onAddTransaction(newTx);
      // Auto-add note to management if it exists
      if (note && note.trim()) {
        onAddManagementItem('Notes', { 
          name: note.trim(), 
          date, 
          time, 
          txId: newTx.id,
          icon: 'StickyNote',
          color: '#10b981'
        });
      }
    }

    if (selectedReminder) {
      const exists = managementData.reminders.some((r: any) => r.name === selectedReminder.name && r.date === selectedReminder.date && r.time === selectedReminder.time);
      if (!exists) {
        onAddManagementItem('Reminders', selectedReminder);
      }
    }

    onBack();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
        className="absolute inset-0 bg-white flex flex-col will-change-transform z-50"
        onClick={() => {
          setShowMoreTypes(false);
          setShowStatusDropdown(false);
          setShowPersonDropdown(false);
          setCategory('');
        }}
      >
        {/* 2. Header */}
        <div className="h-[56px] shrink-0 flex items-center bg-white z-10" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={onBack}
            className="ml-4 w-6 h-6 flex items-center justify-center text-slate-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="ml-4 text-[20px] font-medium text-slate-900">{initialData ? t('editTransaction') : t('addTransaction')}</h2>
        </div>

        <div className="flex-1 overflow-y-auto pb-8">
          {/* 3. Transaction Type Toggle */}
          <div className="mx-6 mb-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2 mb-2">
            {[
              { id: 'expense', color: 'bg-rose-500' },
              { id: 'income', color: 'bg-emerald-500' }
            ].map((tType) => (
              <button 
                key={tType.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setType(tType.id as any);
                  setCategory('');
                  setLinkedTxId('');
                  setShowMoreTypes(false);
                  setShowStatusDropdown(false);
                  setShowPersonDropdown(false);
                }}
                className={cn(
                  "h-[40px] flex-1 rounded-full text-[14px] font-medium transition-all border", 
                  type === tType.id 
                    ? cn(tType.color, "text-white border-transparent shadow-md") 
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                )}
              >
                {t(tType.id)}
              </button>
            ))}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreTypes(!showMoreTypes);
                setShowStatusDropdown(false);
                setShowPersonDropdown(false);
                setCategory('');
              }}
              className={cn(
                "h-[40px] px-6 rounded-full text-[14px] font-medium transition-all border flex items-center gap-2",
                showMoreTypes || (type !== 'expense' && type !== 'income')
                  ? "bg-blue-600 text-white border-transparent shadow-md"
                  : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
              )}
            >
              {type !== 'expense' && type !== 'income' ? t(type) : (t('more') || 'More')}
              <ChevronDown size={16} className={cn("transition-transform", showMoreTypes && "rotate-180")} />
            </button>
          </div>

          <AnimatePresence>
            {showMoreTypes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2 relative z-[45]"
              >
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 grid grid-cols-3 gap-2">
                  {[
                    { id: 'dena', color: 'bg-blue-500' },
                    { id: 'paona', color: 'bg-blue-500' },
                    { id: 'repayment', color: 'bg-blue-500' },
                    { id: 'joma', color: 'bg-blue-500' },
                    { id: 'invest', color: 'bg-blue-500' },
                    { id: 'transfer', color: 'bg-blue-500' }
                  ].map((tType) => (
                    <button 
                      key={tType.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setType(tType.id as any);
                        setCategory('');
                        setLinkedTxId('');
                        setShowMoreTypes(false);
                      }}
                      className={cn(
                        "h-[36px] rounded-lg text-[12px] font-medium transition-all border", 
                        type === tType.id 
                          ? cn(tType.color, "text-white border-transparent shadow-sm") 
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {t(tType.id)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Amount & Description Section (Combined Card) */}
        <div className="mx-6 mb-4 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Amount Part */}
          <div className="py-4 px-4 flex flex-col items-center relative border-b border-slate-100/50">
            <div className="flex items-center justify-center gap-2 w-full">
              <span className={cn(
                "text-[24px] font-medium", 
                type === 'expense' ? 'text-rose-500' : type === 'income' ? 'text-emerald-500' : 'text-blue-500'
              )}>{currency.symbol}</span>
              <input 
                type="number" 
                value={amount}
                onFocus={(e) => {
                  e.stopPropagation();
                  setShowMoreTypes(false);
                  setShowStatusDropdown(false);
                  setShowPersonDropdown(false);
                  setCategory('');
                }}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(
                  "text-[32px] font-medium bg-transparent outline-none w-full text-center placeholder:text-slate-300 transition-colors",
                  amount ? "text-slate-900" : "text-slate-300"
                )}
                placeholder="0.00"
              />
              <div className="flex flex-col gap-2 shrink-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCalculator(true);
                    setShowMoreTypes(false);
                    setShowStatusDropdown(false);
                    setShowPersonDropdown(false);
                    setCategory('');
                  }}
                  className="p-2 bg-white rounded-lg shadow-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Calculator size={20} />
                </button>
                
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowStatusDropdown(!showStatusDropdown);
                      setShowMoreTypes(false);
                      setShowPersonDropdown(false);
                      setCategory('');
                    }}
                    className={cn(
                      "p-2 rounded-lg shadow-sm transition-all flex items-center justify-center",
                      status === 'Normal' ? "bg-emerald-50 text-emerald-500" : 
                      status === 'Recurring' ? "bg-blue-50 text-blue-500" : 
                      "bg-amber-50 text-amber-500"
                    )}
                  >
                    {status === 'Normal' ? <CheckCircle2 size={20} /> : 
                     status === 'Recurring' ? <Repeat size={20} /> : 
                     <Clock size={20} />}
                  </button>

                  <AnimatePresence>
                    {showStatusDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-1 flex flex-col gap-1 z-[60] w-32"
                      >
                        {[
                          { id: 'Normal', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                          { id: 'Recurring', icon: Repeat, color: 'text-blue-500', bg: 'bg-blue-50' },
                          { id: 'Pending', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatus(item.id as any);
                              setShowStatusDropdown(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                              status === item.id ? item.bg : "hover:bg-slate-50"
                            )}
                          >
                            <item.icon size={16} className={item.color} />
                            <span className={cn("text-xs font-medium", status === item.id ? item.color : "text-slate-600")}>
                              {t(item.id.toLowerCase())}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Description Part */}
          <div className="p-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[11px] font-medium uppercase text-slate-400 tracking-wider">{t('description')}</span>
            </div>
            <input 
              type="text"
              value={txName}
              onFocus={(e) => {
                e.stopPropagation();
                setShowMoreTypes(false);
                setShowStatusDropdown(false);
                setShowPersonDropdown(false);
                setCategory('');
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTxName(e.target.value)}
              placeholder={t('whatWasThisFor')}
              className="text-[15px] font-medium text-slate-900 bg-transparent outline-none w-full text-center placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* 5. Accounts/Wallets Section */}
        <div className="mb-4 mx-6 flex items-center gap-4 min-w-0" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-[11px] font-medium uppercase text-slate-400 tracking-wider whitespace-nowrap shrink-0">{t('fromAccount')}</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar flex-1 min-w-0 pb-1">
            {displayAccounts.map((acc: any) => {
              const IconComp = ICON_LIST.find(i => i.name === acc.icon)?.icon || Wallet;
              return (
                <button 
                  key={acc.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccount(acc.name);
                    setShowMoreTypes(false);
                    setShowStatusDropdown(false);
                    setShowPersonDropdown(false);
                    setCategory('');
                  }}
                  className={cn(
                    "min-w-[100px] h-[40px] rounded-lg flex items-center justify-center gap-2 transition-all shrink-0 px-4 backdrop-blur-md border shadow-sm",
                    account === acc.name 
                      ? "text-white scale-[1.02] border-white/30" 
                      : "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200/50"
                  )}
                  style={account === acc.name ? { backgroundColor: acc.color || '#2563eb' } : {}}
                >
                  <IconComp size={16} />
                  <span className="text-[14px] font-medium whitespace-nowrap">{acc.name}</span>
                </button>
              );
            })}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setModalType('account');
                setModalOpen(true);
                setShowMoreTypes(false);
                setShowStatusDropdown(false);
                setShowPersonDropdown(false);
                setCategory('');
              }}
              className="min-w-[100px] h-[40px] rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 px-4 bg-slate-50 text-slate-600 border border-dashed border-slate-300"
            >
              <Plus size={16} />
              <span className="text-[14px] font-medium">{t('more')}</span>
            </button>
          </div>
        </div>

        {type === 'transfer' && (
          <div className="mb-4 mx-6 flex items-center gap-4 min-w-0" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[11px] font-medium uppercase text-slate-400 tracking-wider whitespace-nowrap shrink-0">{t('toAccount')}</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar flex-1 min-w-0 pb-2">
              {displayAccounts.map((acc: any) => {
                const IconComp = ICON_LIST.find(i => i.name === acc.icon)?.icon || Wallet;
                return (
                  <button 
                    key={acc.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setToAccount(acc.name);
                      setShowMoreTypes(false);
                      setShowStatusDropdown(false);
                      setShowPersonDropdown(false);
                      setCategory('');
                    }}
                    className={cn(
                      "min-w-[100px] h-[40px] rounded-lg flex items-center justify-center gap-2 transition-all shrink-0 px-4 backdrop-blur-md border shadow-sm",
                      toAccount === acc.name 
                        ? "text-white scale-[1.02] border-white/30" 
                        : "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200/50"
                    )}
                    style={toAccount === acc.name ? { backgroundColor: acc.color || '#2563eb' } : {}}
                  >
                    <IconComp size={16} />
                    <span className="text-[14px] font-medium whitespace-nowrap">{acc.name}</span>
                  </button>
                );
              })}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('toAccount');
                  setModalOpen(true);
                  setShowMoreTypes(false);
                  setShowStatusDropdown(false);
                  setShowPersonDropdown(false);
                  setCategory('');
                }}
                className="min-w-[100px] h-[40px] rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 px-4 bg-slate-50 text-slate-600 border border-dashed border-slate-300"
              >
                <Plus size={16} />
                <span className="text-[14px] font-medium">{t('more')}</span>
              </button>
            </div>
          </div>
        )}

        {/* 6. Category Drill-down Logic (Grid View) */}
        <div className="mb-4">
          <div className="mx-6 flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-medium uppercase text-slate-400 tracking-wider">
              {t('category')}
            </h3>
          </div>

          {subCategory && category ? (
            <div className="mx-6">
              <button 
                onClick={() => setSubCategory('')}
                className="w-full rounded-lg p-4 flex items-center justify-between transition-colors border"
                style={{ 
                  backgroundColor: selectedCategoryData?.color ? `${selectedCategoryData.color}15` : '#f8fafc',
                  borderColor: selectedCategoryData?.color ? `${selectedCategoryData.color}30` : '#e2e8f0'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ 
                      backgroundColor: selectedSubCategoryData?.color ? `${selectedSubCategoryData.color}20` : (selectedCategoryData?.color ? `${selectedCategoryData.color}20` : '#e2e8f0'),
                      color: selectedSubCategoryData?.color || selectedCategoryData?.color || '#64748b'
                    }}
                  >
                    {selectedSubCategoryData?.image ? (
                      <img src={selectedSubCategoryData.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (() => {
                        const iconName = selectedSubCategoryData?.icon || selectedCategoryData?.icon || 'Tag';
                        const IconComp = ICON_LIST.find(i => i.name === iconName)?.icon || Tag;
                        return <IconComp size={20} />;
                      })()
                    )}
                  </div>
                  <div className="text-left">
                    <div 
                      className="text-xs font-medium uppercase tracking-widest mb-0.5"
                      style={{ color: selectedCategoryData?.color || '#64748b' }}
                    >
                      {category}
                    </div>
                    <div 
                      className="text-[15px] font-medium"
                      style={{ color: selectedCategoryData?.color || '#0f172a' }}
                    >
                      {subCategory}
                    </div>
                  </div>
                </div>
                <ChevronDown size={20} style={{ color: selectedCategoryData?.color || '#64748b' }} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col-reverse" onClick={(e) => e.stopPropagation()}>
              <div className="mx-6 flex gap-3 overflow-x-auto no-scrollbar pb-3 min-w-0">
                {currentCategories.map((cat: any) => {
                  const IconComp = ICON_LIST.find(i => i.name === cat.icon)?.icon || Tag;
                  const isSelected = category === cat.name;
                  return (
                    <button 
                      key={cat.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category === cat.name) {
                          setCategory('');
                        } else {
                          setCategory(cat.name);
                          setShowMoreTypes(false);
                          setShowStatusDropdown(false);
                          setShowPersonDropdown(false);
                        }
                      }}
                      className={cn(
                        "min-w-[100px] h-[40px] rounded-lg flex items-center justify-center gap-2 transition-all shrink-0 px-4 backdrop-blur-md border shadow-sm",
                        isSelected 
                          ? "bg-zinc-900 text-zinc-50 scale-105 border-zinc-700" 
                          : "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-200/50"
                      )}
                    >
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-5 h-5 object-cover rounded-full" />
                      ) : (
                        <IconComp size={16} strokeWidth={isSelected ? 2.5 : 2} />
                      )}
                      <span className="text-[13px] font-medium whitespace-nowrap">{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {category && !subCategory && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-6 mb-4 relative z-[45]"
                  >
                    <div 
                      className="rounded-lg p-4 border"
                      style={{ 
                        backgroundColor: selectedCategoryData?.color ? `${selectedCategoryData.color}08` : '#f8fafc',
                        borderColor: selectedCategoryData?.color ? `${selectedCategoryData.color}20` : '#e2e8f0'
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-medium uppercase tracking-widest text-slate-400">
                          {t('selectSubCategory')}
                        </h4>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {filteredSubCategories.map((sub: any) => {
                          const IconComp = ICON_LIST.find(i => i.name === sub.icon)?.icon || Layers;
                          const isSelected = subCategory === sub.name;
                          return (
                            <button
                              key={sub.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSubCategory(sub.name);
                              }}
                              className="flex flex-col items-center gap-2 group"
                            >
                              <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden",
                                isSelected 
                                  ? "bg-zinc-900 text-zinc-50 shadow-md scale-105" 
                                  : "bg-white border border-slate-100 group-hover:bg-slate-50"
                              )}
                              style={!isSelected ? { color: sub.color || '#64748b' } : {}}
                              >
                                {sub.image ? (
                                  <img src={sub.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <IconComp size={20} strokeWidth={isSelected ? 2.5 : 2} />
                                )}
                              </div>
                              <span className={cn(
                                "text-xs font-medium text-center truncate w-full py-0.5",
                                isSelected ? "text-slate-900" : "text-slate-400"
                              )}>
                                {sub.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* 7. Date & Time (Grid) */}
        <div className="mx-6 mb-4 grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
          <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Calendar size={20} />
            </div>
            <div className="flex-1 relative">
              <div className="text-xs font-medium uppercase text-slate-400">{t('date')}</div>
              <input 
                type="date" 
                value={date}
                onFocus={(e) => {
                  e.stopPropagation();
                  setShowMoreTypes(false);
                  setShowStatusDropdown(false);
                  setShowPersonDropdown(false);
                  setCategory('');
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setDate(e.target.value)}
                className="text-[14px] font-medium text-slate-900 bg-transparent outline-none w-full appearance-none absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="text-[14px] font-medium text-slate-900">{formatDate(date)}</div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Clock size={20} />
            </div>
            <div className="flex-1 relative">
              <div className="text-xs font-medium uppercase text-slate-400">{t('time')}</div>
              <input 
                type="time" 
                value={time}
                onFocus={(e) => {
                  e.stopPropagation();
                  setShowMoreTypes(false);
                  setShowStatusDropdown(false);
                  setShowPersonDropdown(false);
                  setCategory('');
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setTime(e.target.value)}
                className="text-[14px] font-medium text-slate-900 bg-transparent outline-none w-full appearance-none absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="text-[14px] font-medium text-slate-900">{formatDisplayTime(time)}</div>
            </div>
          </div>
        </div>

        <div className="mx-6 mb-4 space-y-4">
          <div className="flex flex-col-reverse gap-4">
            {/* Person & Location */}
            <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPersonDropdown(!showPersonDropdown);
                setShowMoreTypes(false);
                setShowStatusDropdown(false);
                setCategory('');
              }}
              className={cn(
                "rounded-lg p-3 flex items-center gap-3 text-left transition-colors border",
                showPersonDropdown ? "bg-purple-50 border-purple-100" : "bg-slate-50 border-slate-100"
              )}
            >
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden",
                  selectedPersonData ? "" : "bg-purple-50 text-purple-500"
                )}
                style={selectedPersonData && !selectedPersonData.image ? { backgroundColor: `${selectedPersonData.color || '#a855f7'}20`, color: selectedPersonData.color || '#a855f7' } : {}}
              >
                {selectedPersonData?.image ? (
                  <img src={selectedPersonData.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  (() => {
                    const iconName = selectedPersonData?.icon || 'User';
                    const IconComp = ICON_LIST.find(i => i.name === iconName)?.icon || User;
                    return <IconComp size={20} />;
                  })()
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium uppercase text-slate-400">{t('person')}</div>
                <div className={cn("text-[14px] font-medium truncate py-0.5", person ? "text-slate-900" : "text-slate-400")}>
                  {person || t('whoWith')}
                </div>
              </div>
            </button>
            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 border border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium uppercase text-slate-400">{t('location')}</div>
                <input 
                  type="text"
                  value={location}
                  onFocus={(e) => {
                    e.stopPropagation();
                    setShowMoreTypes(false);
                    setShowStatusDropdown(false);
                    setShowPersonDropdown(false);
                    setCategory('');
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('where')}
                  className="text-[14px] font-medium text-slate-900 bg-transparent outline-none w-full placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Person Dropdown */}
          <AnimatePresence>
            {showPersonDropdown && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden relative z-[45]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
                  <div className="grid grid-cols-4 gap-3">
                    {managementData.persons.map((p: any) => {
                      const isSelected = person === p.name;
                      return (
                        <button 
                          key={p.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (person === p.name) {
                              setPerson('');
                            } else {
                              setPerson(p.name);
                            }
                            setShowPersonDropdown(false);
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div 
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden",
                              isSelected 
                                ? "bg-purple-600 text-white shadow-md scale-105" 
                                : "bg-slate-50 border border-purple-100 group-hover:bg-purple-100"
                            )}
                            style={!isSelected ? { color: p.color || '#a855f7' } : {}}
                          >
                            {p.image ? (
                              <img src={p.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              (() => {
                                const IconComp = ICON_LIST.find(i => i.name === p.icon)?.icon || User;
                                return <IconComp size={20} strokeWidth={isSelected ? 2.5 : 2} />;
                              })()
                            )}
                          </div>
                          <span className={cn(
                            "text-xs font-medium text-center truncate w-full text-clip-fix",
                            isSelected ? "text-purple-900" : "text-slate-400"
                          )}>
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newPerson = prompt(t('enterNewPersonName'));
                        if (newPerson && newPerson.trim()) {
                          onAddManagementItem('Contacts', { name: newPerson.trim(), icon: 'Users', color: '#3b82f6' });
                          setPerson(newPerson.trim());
                          setShowPersonDropdown(false);
                        }
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 text-slate-400 group-hover:bg-slate-100 transition-all">
                        <Plus size={20} />
                      </div>
                      <span className="text-xs font-medium text-slate-400">{t('addNew')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reminder */}
        <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 border border-slate-100" onClick={(e) => e.stopPropagation()}>
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
            <Bell size={20} />
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowReminderModal(true);
              setShowMoreTypes(false);
              setShowStatusDropdown(false);
              setShowPersonDropdown(false);
              setCategory('');
            }}
            className="flex-1 text-left"
          >
            <div className="text-xs font-medium uppercase text-slate-400">{t('reminder')}</div>
            <div className={cn("text-[14px] font-medium", selectedReminder ? "text-slate-900" : "text-slate-400")}>
              {selectedReminder ? selectedReminder.name : t('setAlert')}
            </div>
          </button>
        </div>

        {/* Notes */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <FileText size={14} />
            </div>
            <span className="text-xs font-medium uppercase text-slate-400">{t('notes')}</span>
          </div>
          <textarea 
            value={note}
            onFocus={(e) => {
              e.stopPropagation();
              setShowMoreTypes(false);
              setShowStatusDropdown(false);
              setShowPersonDropdown(false);
              setCategory('');
            }}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('addNotesPlaceholder')}
            className="w-full bg-transparent outline-none text-[14px] text-slate-900 placeholder:text-slate-400 resize-none min-h-[80px]"
          />
        </div>

          {/* Receipt Upload */}
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 gap-2 relative overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onFocus={(e) => {
                e.stopPropagation();
                setShowMoreTypes(false);
                setShowStatusDropdown(false);
                setShowPersonDropdown(false);
                setCategory('');
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            {receipt ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <img src={receipt} alt="Receipt" className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setReceipt(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-1">
                  <Upload size={20} />
                </div>
                <div className="text-[14px] font-medium text-slate-700">{t('uploadReceiptPhoto')}</div>
                <div className="text-[11px] text-slate-400">{t('jpgPngUpTo5Mb')}</div>
              </>
            )}
          </div>
        </div>
        </div>

        <ReminderSelectionModal 
          isOpen={showReminderModal}
          onClose={() => setShowReminderModal(false)}
          onSelect={(reminder) => {
            setSelectedReminder(reminder);
            setShowReminderModal(false);
          }}
          onAddNew={() => {
            onOpenAddReminder(txName || category || t('transactionReminder'), (reminder) => {
              setSelectedReminder(reminder);
            });
            setShowReminderModal(false);
          }}
          savedReminders={managementData.reminders}
        />

        {/* 9. Floating Save Button */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0 z-50">
          <button 
            onClick={handleSave}
            disabled={!isSaveEnabled()}
            className={cn(
              "w-full h-[48px] rounded-full text-white text-[16px] font-medium shadow-lg transition-transform active:scale-95",
              !isSaveEnabled() ? "bg-slate-300 shadow-none cursor-not-allowed" : 
              type === 'expense' ? "bg-rose-500 shadow-rose-200" : type === 'income' ? "bg-emerald-500 shadow-emerald-200" : "bg-blue-500 shadow-blue-200"
            )}
          >
            {initialData ? t('update') : t('save')} {t(type)}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showCalculator && (
          <CalculatorModal 
            isOpen={showCalculator} 
            onClose={() => setShowCalculator(false)} 
            onApply={(val) => setAmount(val.toString())}
            initialValue={amount}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && modalType && (
          <SelectionModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setModalType(null);
            }}
            title={t('selectItem').replace('{item}', t(modalType))}
            items={getModalItems()}
            modalType={modalType}
            managementData={managementData}
            initialActiveType={['expense', 'income', 'dena', 'paona', 'joma', 'invest'].includes(type) ? type : 'all'}
            onSelect={(item) => {
              if (modalType === 'category') setCategory(item.name);
              else if (modalType === 'subCategory') setSubCategory(item.name);
              else if (modalType === 'account') setAccount(item.name);
              else if (modalType === 'toAccount') setToAccount(item.name);
              else if (modalType === 'person') setPerson(item.name);
              setModalOpen(false);
              setModalType(null);
            }}
            onAdd={(newItemName) => {
              if (modalType === 'person') {
                onAddManagementItem('Contacts', { name: newItemName });
                setPerson(newItemName);
              } else if (modalType === 'subCategory') {
                onAddManagementItem('Sub Categories', { name: newItemName, parentCategory: category });
                setSubCategory(newItemName);
              } else if (modalType === 'account') {
                onAddManagementItem('Accounts', { name: newItemName, icon: 'Wallet', color: '#3b82f6', currency: 'Bangladeshi Taka', accountType: 'Cash', balance: 0, includeInTotal: true, isPinned: false, isDefault: false });
                setAccount(newItemName);
              } else if (modalType === 'toAccount') {
                onAddManagementItem('Accounts', { name: newItemName, icon: 'Wallet', color: '#3b82f6', currency: 'Bangladeshi Taka', accountType: 'Cash', balance: 0, includeInTotal: true, isPinned: false, isDefault: false });
                setToAccount(newItemName);
              }
              setModalOpen(false);
              setModalType(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

const CalculatorModal = ({ isOpen, onClose, onApply, initialValue }: { isOpen: boolean, onClose: () => void, onApply: (val: number) => void, initialValue: string }) => {
  const { t } = useLanguage();
  const [display, setDisplay] = useState(initialValue || '0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const fullEq = equation + display;
      // Simple eval for basic math
      const result = eval(fullEq.replace('×', '*').replace('÷', '/'));
      setDisplay(result.toString());
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-slate-900">{t('calculator')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-6 text-right">
          <div className="text-slate-400 text-sm font-medium h-6 mb-1">{equation}</div>
          <div className="text-4xl font-medium text-slate-900 truncate py-2">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') handleEqual();
                else if (['+', '-', '×', '÷'].includes(btn)) handleOperator(btn);
                else handleNumber(btn);
              }}
              className={cn(
                "h-16 rounded-2xl text-xl font-medium transition-all active:scale-95",
                btn === '=' ? "bg-blue-500 text-white" :
                ['+', '-', '×', '÷'].includes(btn) ? "bg-blue-50 text-blue-600" :
                "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}
            >
              {btn}
            </button>
          ))}
          <button 
            onClick={handleClear}
            className="col-span-2 h-16 rounded-2xl bg-rose-50 text-rose-600 text-xl font-medium active:scale-95"
          >
            AC
          </button>
          <button 
            onClick={() => onApply(parseFloat(display))}
            className="col-span-2 h-16 rounded-2xl bg-emerald-500 text-white text-xl font-medium active:scale-95 shadow-lg shadow-emerald-100"
          >
            {t('apply') || 'Apply'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ReminderSelectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (reminder: any) => void;
  onAddNew: () => void;
  savedReminders: any[];
}> = ({ isOpen, onClose, onSelect, onAddNew, savedReminders }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const handleQuickAdd = (type: string) => {
    const now = new Date();
    let date = new Date();
    if (type === 'tomorrow') {
      date.setDate(now.getDate() + 1);
    } else if (type === '1month') {
      date.setMonth(now.getMonth() + 1);
    } else if (type === '1year') {
      date.setFullYear(now.getFullYear() + 1);
    }
    
    onSelect({
      name: type === 'tomorrow' ? t('tomorrow') : type === '1month' ? t('after1Month') : t('after1Year'),
      date: date.toLocaleDateString('en-CA'),
      time: '09:00',
      remindBefore: '10m',
      ringtone: 'default',
      icon: 'Calendar',
      color: '#3b82f6'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }}
        className="relative w-full max-w-md bg-white rounded-t-lg sm:rounded-lg p-6 shadow-2xl max-h-[80vh] flex flex-col"
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
        
        <button 
          onClick={() => { onClose(); onAddNew(); }}
          className="w-full py-4 bg-emerald-50 text-emerald-600 font-medium rounded-lg flex items-center justify-center gap-2 mb-6 hover:bg-emerald-100 transition-colors"
        >
          <Plus size={20} /> {t('addReminder')}
        </button>

        <div className="overflow-y-auto flex-1 space-y-6">
          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase mb-3">{t('quickAdd')}</h4>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleQuickAdd('tomorrow')} className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors text-center">{t('tomorrow')}</button>
              <button onClick={() => handleQuickAdd('1month')} className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors text-center">{t('after1Month')}</button>
              <button onClick={() => handleQuickAdd('1year')} className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors text-center">{t('after1Year')}</button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-slate-400 uppercase mb-3">{t('savedReminders')}</h4>
            <div className="space-y-2">
              {savedReminders.map((r) => {
                const IconComp = ICON_LIST.find(i => i.name === r.icon)?.icon || Bell;
                return (
                  <button 
                    key={r.id || r.name}
                    onClick={() => { onSelect(r); onClose(); }}
                    className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${r.color || '#94a3b8'}20`, color: r.color || '#94a3b8' }}>
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 text-sm">{r.name}</h5>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {r.date ? new Date(r.date).toLocaleDateString('en-GB') : t('noDate')} {r.time ? `• ${r.time}` : ''}
                      </p>
                    </div>
                  </button>
                );
              })}
              {savedReminders.length === 0 && (
                <p className="text-center text-slate-400 text-xs font-medium py-4">{t('noSavedReminders')}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AddReminderModal = React.memo(({ 
  isOpen, 
  onClose, 
  onSave, 
  initialName = '' 
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: any) => void;
  initialName?: string;
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [remindBefore, setRemindBefore] = useState('1m');
  const [ringtone, setRingtone] = useState('none');
  const [selectedIcon, setSelectedIcon] = useState('Bell');
  const [selectedColor, setSelectedColor] = useState('#10b981');
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setDate('');
      setTime('');
      setRemindBefore('1m');
      setRingtone('none');
      setSelectedIcon('Bell');
      setSelectedColor('#10b981');
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[410] bg-slate-50 flex flex-col"
    >
      <div className="px-6 pt-3 pb-6 flex items-center justify-between bg-white border-b border-slate-100 shadow-sm z-10">
        <button onClick={onClose} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all active:scale-90">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('addReminder')}</h2>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto p-8 pb-32 space-y-8 custom-scrollbar">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000 opacity-20" style={{ backgroundColor: selectedColor }} />
          <div className="flex items-center gap-6 relative z-10">
            <button 
              onClick={() => setShowIconPicker(true)}
              className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105 active:scale-95 border-4 border-white"
              style={{ backgroundColor: selectedColor, color: '#fff', boxShadow: `0 20px 40px -10px ${selectedColor}60` }}
            >
              {(() => {
                const IconComp = ICON_LIST.find(i => i.name === selectedIcon)?.icon || Bell;
                return <IconComp size={36} strokeWidth={2.5} />;
              })()}
            </button>
            <div className="flex-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">{t('name')}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('reminderNamePlaceholder')}
                className="w-full bg-transparent border-b-4 border-slate-100 focus:border-emerald-500 py-2 text-2xl font-black text-slate-900 transition-all outline-none placeholder:text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <Calendar size={20} />
              </div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('date')}</label>
            </div>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 transition-all outline-none shadow-inner"
            />
            {date && (
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-4 text-center">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
            )}
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <Clock size={20} />
              </div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('time')}</label>
            </div>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 transition-all outline-none shadow-inner"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <Bell size={20} />
              </div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('remindMe')}</label>
            </div>
            <div className="relative">
              <select 
                value={remindBefore}
                onChange={(e) => setRemindBefore(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 transition-all outline-none shadow-inner appearance-none cursor-pointer"
              >
                <option value="0m">{t('atTimeOfEvent')}</option>
                <option value="1m">{t('1MinuteBefore')}</option>
                <option value="2m">{t('2MinutesBefore')}</option>
                <option value="3m">{t('3MinutesBefore')}</option>
                <option value="4m">{t('4MinutesBefore')}</option>
                <option value="5m">{t('5MinutesBefore')}</option>
                <option value="10m">{t('10MinutesBefore')}</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight className="rotate-90" size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <BellRing size={20} />
              </div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('ringtone')}</label>
            </div>
            <div className="relative">
              <select 
                value={ringtone}
                onChange={(e) => setRingtone(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 transition-all outline-none shadow-inner appearance-none cursor-pointer"
              >
                <option value="none">{t('noAlarm')}</option>
                <option value="default">{t('defaultRingtone')}</option>
                <option value="chime">{t('chime')}</option>
                <option value="radar">{t('radar')}</option>

              <option value="beacon">{t('beacon')}</option>
              <option value="circuit">{t('circuit')}</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight className="rotate-90" size={20} />
            </div>
          </div>
        </div>
      </div>
      </div>

      <SelectionModal 
        isOpen={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        title={t('selectIcon')}
        items={ICON_LIST.map(i => ({ name: i.name, icon: i.name }))}
        onSelect={(item) => {
          setSelectedIcon(item.name);
          setShowIconPicker(false);
        }}
        onAdd={() => {}}
      />

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-[300]">
        <button 
          onClick={() => {
            if (!name || !date || !time) return;
            onSave({ name, date, time, remindBefore, ringtone, icon: selectedIcon, color: selectedColor });
            onClose();
          }}
          className="w-full h-16 rounded-[2rem] bg-emerald-500 text-white font-black text-lg shadow-[0_20px_40px_-8px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 tracking-wide"
        >
          <Check size={24} strokeWidth={3} />
          {t('save')}
        </button>
      </div>
    </motion.div>
  );
});

const GlobalSearchView = React.memo(({ 
  query, 
  setSearchQuery, 
  transactions, 
  managementData, 
  onTransactionClick, 
  onManagementClick, 
  onWorkspaceClick, 
  onClose, 
  isOpen,
  onEditTransaction,
  onDeleteTransaction
}: {
  query: string;
  setSearchQuery: (q: string) => void;
  transactions: any[];
  managementData: any;
  onTransactionClick: (tx: any) => void;
  onManagementClick: (label: string) => void;
  onWorkspaceClick: (id: string) => void;
  onClose: () => void;
  isOpen: boolean;
  onEditTransaction?: (tx: any) => void;
  onDeleteTransaction?: (id: string) => void;
}) => {
  const { t } = useLanguage();
  const [activeOptionsIndex, setActiveOptionsIndex] = useState<string | null>(null);
  if (!isOpen) return null;

  const q = query.toLowerCase();

  const getMatchScore = (str: string | undefined | null, searchStr: string) => {
    if (!str) return 0;
    const s = str.toLowerCase();
    if (s === searchStr) return 100;
    if (s.startsWith(searchStr)) return 50;
    if (s.includes(searchStr)) return 10;
    return 0;
  };

  // 1. Transactions (Priority)
  const filteredTransactions = transactions.filter(tx => 
    tx.txName?.toLowerCase().includes(q) ||
    tx.category?.toLowerCase().includes(q) ||
    tx.subCategory?.toLowerCase().includes(q) ||
    tx.notes?.toLowerCase().includes(q) ||
    tx.account?.toLowerCase().includes(q) ||
    tx.person?.toLowerCase().includes(q) ||
    tx.date?.toLowerCase().includes(q) ||
    tx.time?.toLowerCase().includes(q) ||
    tx.amount?.toString().includes(q) ||
    tx.location?.toLowerCase().includes(q) ||
    tx.source?.toLowerCase().includes(q) ||
    (q === 'slip' || q === 'receipt' ? !!tx.receipt : false)
  ).sort((a, b) => {
    const scoreA = Math.max(
      getMatchScore(a.txName, q),
      getMatchScore(a.category, q),
      getMatchScore(a.subCategory, q),
      getMatchScore(a.notes, q),
      getMatchScore(a.person, q),
      getMatchScore(a.account, q)
    );
    const scoreB = Math.max(
      getMatchScore(b.txName, q),
      getMatchScore(b.category, q),
      getMatchScore(b.subCategory, q),
      getMatchScore(b.notes, q),
      getMatchScore(b.person, q),
      getMatchScore(b.account, q)
    );
    return scoreB - scoreA;
  });

  // 2. Reminders
  const filteredReminders = managementData.reminders.filter((r: any) => 
    r.name?.toLowerCase().includes(q) ||
    r.date?.toLowerCase().includes(q) ||
    r.amount?.toString().includes(q)
  ).sort((a: any, b: any) => getMatchScore(b.name, q) - getMatchScore(a.name, q));

  // 3. Management Items
  const managementResults: { label: string, category: string, score: number }[] = [];
  
  // Categories
  Object.entries(managementData.categories).forEach(([type, items]: [string, any]) => {
    items.forEach((item: any) => {
      if (item.name.toLowerCase().includes(q)) {
        managementResults.push({ label: item.name, category: 'Categories', score: getMatchScore(item.name, q) });
      }
    });
  });

  // Sub Categories
  managementData.subCategories.forEach((item: any) => {
    if (item.name.toLowerCase().includes(q)) {
      managementResults.push({ label: item.name, category: 'Sub Categories', score: getMatchScore(item.name, q) });
    }
  });

  // Persons
  managementData.persons.forEach((item: any) => {
    if (item.name.toLowerCase().includes(q)) {
      managementResults.push({ label: item.name, category: 'Contacts', score: getMatchScore(item.name, q) });
    }
  });

  // Accounts
  managementData.accounts.forEach((item: any) => {
    if (item.name.toLowerCase().includes(q)) {
      managementResults.push({ label: item.name, category: 'Accounts', score: getMatchScore(item.name, q) });
    }
  });

  managementResults.sort((a, b) => b.score - a.score);

  // 4. Settings/Workspaces
  const workspaces = [
    { id: 'gws-personal', name: t('personalWallet') },
    { id: 'gws-business', name: t('businessAccount') },
    { id: 'gws-family', name: t('familyExpense') }
  ];
  const filteredWorkspaces = workspaces.filter(w => w.name.toLowerCase().includes(q))
    .sort((a, b) => getMatchScore(b.name, q) - getMatchScore(a.name, q));

  const hasResults = filteredTransactions.length > 0 || filteredReminders.length > 0 || managementResults.length > 0 || filteredWorkspaces.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed inset-0 z-[100] bg-white pt-16 overflow-y-auto pb-32"
    >
      <div className="fixed top-0 left-0 right-0 z-[110] bg-white border-b border-slate-200/50 px-6 pt-2 pb-2 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              autoFocus
              placeholder={t('searchEverything')} 
              className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2.5 pl-9 pr-8 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {!hasResults && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">{t('noResultsFoundFor')} "{query}"</p>
          </div>
        )}

        {/* Transactions Section */}
        {filteredTransactions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
              <ArrowLeftRight size={12} /> {t('transactions')} ({filteredTransactions.length})
            </h3>
            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
              {filteredTransactions.map(tx => (
                <TransactionItem 
                  key={tx.id} 
                  tx={tx} 
                  onClick={() => onTransactionClick(tx)} 
                  onEdit={onEditTransaction}
                  onDelete={onDeleteTransaction}
                  isActive={activeOptionsIndex === tx.id}
                  onToggleOptions={(e) => {
                    e.stopPropagation();
                    setActiveOptionsIndex(activeOptionsIndex === tx.id ? null : tx.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reminders Section */}
        {filteredReminders.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
              <Bell size={12} /> {t('reminders')} ({filteredReminders.length})
            </h3>
            <div className="grid gap-3">
              {filteredReminders.map((r: any, i: number) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{r.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{r.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-900">${r.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Management Section */}
        {managementResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
              <Briefcase size={12} /> {t('management')} ({managementResults.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {managementResults.map((res, i) => (
                <button 
                  key={i} 
                  onClick={() => onManagementClick(res.category)}
                  className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-left hover:bg-slate-100 transition-colors"
                >
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">{t(res.category.toLowerCase().replace(' ', ''))}</p>
                  <p className="text-sm font-medium text-slate-900">{res.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Workspaces Section */}
        {filteredWorkspaces.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase flex items-center gap-2">
              <Layout size={12} /> {t('workspaces')} ({filteredWorkspaces.length})
            </h3>
            <div className="grid gap-3">
              {filteredWorkspaces.map(w => (
                <button 
                  key={w.id} 
                  onClick={() => onWorkspaceClick(w.id)}
                  className="w-full bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm">
                      <Layout size={20} />
                    </div>
                    <p className="text-sm font-medium text-slate-900">{w.name}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

// --- Main App ---

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('appLanguage');
    return (saved === 'en' || saved === 'bn') ? saved : 'en';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('appCurrency');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CURRENCIES[0];
      }
    }
    return CURRENCIES[0];
  });

  useEffect(() => {
    localStorage.setItem('appCurrency', JSON.stringify(currency));
  }, [currency]);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('appDarkMode');
    return saved ? JSON.parse(saved) : true; // Default to true as requested
  });

  const [widgetEnabled, setWidgetEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('appWidgetEnabled');
    return saved ? JSON.parse(saved) : false;
  });

  const [floatingBubbleEnabled, setFloatingBubbleEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('appFloatingBubbleEnabled');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('appDarkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('appWidgetEnabled', JSON.stringify(widgetEnabled));
  }, [widgetEnabled]);

  useEffect(() => {
    localStorage.setItem('appFloatingBubbleEnabled', JSON.stringify(floatingBubbleEnabled));
  }, [floatingBubbleEnabled]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [initialAddData, setInitialAddData] = useState<any | null>(null);
  const [managementDetail, setManagementDetail] = useState<{ label: string, type?: string, editingIndex?: number | null, isAdding?: boolean } | null>(null);
  const [showProfileView, setShowProfileView] = useState(false);
  const [homeSections, setHomeSections] = useState<Record<string, boolean>>({
    summary_expense: true,
    summary_income: true,
    summary_taken: false,
    summary_given: false,
    summary_savings: false,
    summary_invest: false,
    summary_savings_total: false,
    quickActions: true,
    activity: true,
    banner: true
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<string | null>(null);
  const [selectedContactDetail, setSelectedContactDetail] = useState<any | null>(null);

  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [addReminderInitialName, setAddReminderInitialName] = useState('');
  const [addReminderCallback, setAddReminderCallback] = useState<{ fn: (reminder: any) => void } | null>(null);

  const handleOpenAddReminder = (initialName: string, callback: (reminder: any) => void) => {
    setAddReminderInitialName(initialName);
    setAddReminderCallback({ fn: callback });
    setShowAddReminderModal(true);
  };

  const handlePdfExport = () => {
    setActiveTab('pdfManager');
  };

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  // Management State
  const [managementData, setManagementData] = useState({
    categories: {
      expense: [
        { id: 'cat-food', name: t('foodDrinks'), icon: 'Utensils', color: '#f97316' },
        { id: 'cat-shopping', name: t('shopping'), icon: 'ShoppingBag', color: '#ec4899' },
        { id: 'cat-transport', name: t('transport'), icon: 'Bus', color: '#3b82f6' },
        { id: 'cat-utilities', name: t('utilities'), icon: 'Zap', color: '#eab308' },
        { id: 'cat-others-exp', name: t('others'), icon: 'Tag', color: '#64748b' },
      ],
      income: [
        { id: 'cat-salary', name: t('salary'), icon: 'Banknote', color: '#10b981' },
        { id: 'cat-business', name: t('business'), icon: 'Briefcase', color: '#3b82f6' },
        { id: 'cat-gift', name: t('gift'), icon: 'Star', color: '#f59e0b' },
        { id: 'cat-others-inc', name: t('others'), icon: 'Tag', color: '#64748b' },
      ],
      dena: [
        { id: 'cat-loan', name: t('loan'), icon: 'History', color: '#ef4444' },
        { id: 'cat-credit', name: t('credit'), icon: 'CreditCard', color: '#f97316' },
      ],
      paona: [
        { id: 'cat-lending', name: t('lending'), icon: 'ArrowUpRight', color: '#10b981' },
        { id: 'cat-refund', name: t('refund'), icon: 'ArrowDownLeft', color: '#3b82f6' },
      ],
      joma: [
        { id: 'cat-savings', name: t('savings'), icon: 'PiggyBank', color: '#8b5cf6' },
        { id: 'cat-deposit', name: t('deposit'), icon: 'Database', color: '#6366f1' },
      ],
      invest: [
        { id: 'cat-stocks', name: t('stocks'), icon: 'Layout', color: '#14b8a6' },
        { id: 'cat-crypto', name: t('crypto'), icon: 'Zap', color: '#f59e0b' },
      ]
    },
    subCategories: [
      { id: 'sub-dinner', name: t('dinner'), icon: 'Layers', color: '#64748b' },
      { id: 'sub-lunch', name: t('lunch'), icon: 'Layers', color: '#64748b' },
      { id: 'sub-electronics', name: t('electronics'), icon: 'Layers', color: '#64748b' },
      { id: 'sub-groceries', name: t('groceries'), icon: 'Layers', color: '#64748b' }
    ],
    persons: [
      { id: 'per-abid', name: 'Abid', icon: 'Users', color: '#3b82f6' },
      { id: 'per-sarah', name: 'Sarah', icon: 'Users', color: '#ec4899' },
      { id: 'per-john', name: 'John', icon: 'Users', color: '#10b981' },
      { id: 'per-family', name: t('family'), icon: 'Users', color: '#f59e0b' }
    ],
    accounts: [
      { id: 'acc-cash', name: t('cash'), icon: 'Wallet', color: '#10b981', accountType: t('cash'), isDefault: true, isPinned: true, balance: 0, includeInTotal: true },
      { id: 'acc-bank', name: t('bankAccount'), icon: 'Database', color: '#3b82f6', accountType: t('bankAccount'), isPinned: true, balance: 0, includeInTotal: true },
      { id: 'acc-nagad', name: 'Nagad', icon: 'Smartphone', color: '#ef4444', accountType: t('mobileFinancialService'), isPinned: true, balance: 0, includeInTotal: true },
      { id: 'acc-bkash', name: 'Bkash', icon: 'Smartphone', color: '#ec4899', accountType: t('mobileFinancialService'), balance: 0, includeInTotal: true },
    ],
    accountTypes: [t('cash'), t('payment'), t('mobileFinancialService'), t('bankAccount')],
    reminders: [
      { id: 'rem-rent', name: t('rentPayment'), date: '2026-04-01', amount: '0', icon: 'Home' },
      { id: 'rem-elec', name: t('electricityBill'), date: '2026-03-20', amount: '0', icon: 'Zap' },
      { id: 'rem-int', name: t('internetBill'), date: '2026-03-25', amount: '0', icon: 'Globe' },
    ],
    tasks: [],
    budgets: [],
    recurring: [],
    subscriptions: [],
    investments: [],
    fixedDeposits: [],
    payables: [],
    receivables: [],
    notes: [],
    receipts: [],
    pending: [],
  });

  const [transactions, setTransactions] = useState(TRANSACTIONS);

  const calculateTotals = () => {
    let income = 0;
    let expense = 0;
    let dena = 0;
    let paona = 0;
    let denaRepaid = 0;
    let paonaRepaid = 0;
    let joma = 0;
    let invest = 0;

    const accountBalances: Record<string, number> = {};
    managementData.accounts.forEach(acc => {
      accountBalances[acc.name] = acc.balance || 0;
    });

    transactions.forEach(tx => {
      // Global totals
      if (tx.type === 'income') income += tx.amount;
      if (tx.type === 'expense') expense += tx.amount;
      if (tx.type === 'joma') {
        joma += tx.amount;
        expense += tx.amount; // Savings is money gone from current spending
      }
      if (tx.type === 'invest') {
        invest += tx.amount;
        expense += tx.amount; // Investment is money gone from current spending
      }
      
      if (tx.type === 'dena') {
        dena += tx.amount;
        if (tx.addToIncome) income += tx.amount;
      }
      if (tx.type === 'paona') {
        paona += tx.amount;
        if (tx.addToExpense) expense += tx.amount;
      }
      if (tx.type === 'repayment') {
        if (tx.repaymentType === 'dena') {
          denaRepaid += tx.amount;
          if (tx.addToExpense) expense += tx.amount;
        }
        if (tx.repaymentType === 'paona') {
          paonaRepaid += tx.amount;
          if (tx.addToIncome) income += tx.amount;
        }
      }

      // Account specific balances
      if (tx.account) {
        if (tx.type === 'income' || tx.type === 'dena' || (tx.type === 'repayment' && tx.repaymentType === 'paona')) {
          accountBalances[tx.account] = (accountBalances[tx.account] || 0) + tx.amount;
        } else if (tx.type === 'expense' || tx.type === 'paona' || (tx.type === 'repayment' && tx.repaymentType === 'dena') || tx.type === 'joma' || tx.type === 'invest') {
          accountBalances[tx.account] = (accountBalances[tx.account] || 0) - tx.amount;
        } else if (tx.type === 'transfer') {
          accountBalances[tx.account] = (accountBalances[tx.account] || 0) - tx.amount;
          if (tx.toAccount) {
            accountBalances[tx.toAccount] = (accountBalances[tx.toAccount] || 0) + tx.amount;
          }
        }
      }
    });

    // Calculate total balance only from accounts that should be included
    let totalBalance = 0;
    managementData.accounts.forEach(acc => {
      if (acc.includeInTotal) {
        totalBalance += accountBalances[acc.name] || 0;
      }
    });

    return {
      balance: totalBalance,
      income,
      expense,
      dena,
      paona,
      denaRepaid,
      paonaRepaid,
      joma,
      invest,
      accountBalances
    };
  };

  const totals = useMemo(() => calculateTotals(), [transactions, managementData]);

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })} ${currency.symbol}`;
  };

  const contextValue = useMemo(() => ({ 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    t: (key: string) => (translations[language] as any)[key] || key, 
    formatAmount 
  }), [language, currency, formatAmount]);

  const getCategoryKey = (category: string) => {
    switch (category) {
      case 'Sub Categories': return 'subCategories';
      case 'Contacts': return 'persons';
      case 'Reminders': return 'reminders';
      case 'Budgets': return 'budgets';
      case 'Financial Goals': return 'financialGoals';
      case 'Investments': return 'investments';
      case 'Fixed Deposits': return 'fixedDeposits';
      case 'Payables': return 'payables';
      case 'Receivables': return 'receivables';
      case 'Notes': return 'notes';
      case 'Receipts': return 'receipts';
      case 'Pending Tasks': return 'pending';
      case 'Pending': return 'pending';
      case 'Tasks': return 'tasks';
      case 'Recurring': return 'recurring';
      case 'Subscriptions': return 'subscriptions';
      default: return null;
    }
  };

  const addManagementItem = (category: string, item: any, type?: string) => {
    setManagementData(prev => {
      const newData = { ...prev };
      if (category === 'Categories' && type) {
        newData.categories = {
          ...prev.categories,
          [type]: [...(prev.categories as any)[type], item]
        };
      } else if (category === 'Accounts') {
        let updatedAccounts = [...newData.accounts];
        if (item.isDefault) {
          updatedAccounts = updatedAccounts.map((acc: any) => ({ ...acc, isDefault: false }));
        }
        newData.accounts = [...updatedAccounts, item];
      } else {
        const key = getCategoryKey(category);
        if (key) {
          (newData as any)[key] = [...((newData as any)[key] || []), item];
        }
      }
      return newData;
    });
  };

  const removeManagementItem = (category: string, index: number, type?: string) => {
    setManagementData(prev => {
      const newData = { ...prev };
      if (category === 'Categories' && type) {
        newData.categories = {
          ...prev.categories,
          [type]: (prev.categories as any)[type].filter((_: any, i: number) => i !== index)
        };
      } else if (category === 'Accounts') {
        newData.accounts = newData.accounts.filter((_: any, i: number) => i !== index);
      } else {
        const key = getCategoryKey(category);
        if (key) {
          (newData as any)[key] = ((newData as any)[key] || []).filter((_: any, i: number) => i !== index);
        }
      }
      return newData;
    });
  };

  const updateManagementItem = (category: string, index: number, newItem: any, type?: string) => {
    setManagementData(prev => {
      const newData = { ...prev };
      if (category === 'Categories' && type) {
        const list = [...(prev.categories as any)[type]];
        list[index] = newItem;
        newData.categories = {
          ...prev.categories,
          [type]: list
        };
      } else if (category === 'Accounts') {
        const list = [...newData.accounts];
        if (newItem.isDefault) {
          list.forEach((acc: any, i: number) => {
            if (i !== index) acc.isDefault = false;
          });
        }
        list[index] = newItem;
        newData.accounts = list;
      } else {
        const key = getCategoryKey(category);
        if (key) {
          const list = [...((newData as any)[key] || [])];
          list[index] = newItem;
          (newData as any)[key] = list;
        }
      }
      return newData;
    });
  };

  const toggleArchiveManagementItem = (category: string, index: number, type?: string) => {
    setManagementData(prev => {
      const newData = { ...prev };
      const toggle = (item: any) => ({ ...item, isArchived: !item.isArchived });
      
      if (category === 'Categories' && type) {
        const list = [...(prev.categories as any)[type]];
        list[index] = toggle(list[index]);
        newData.categories = {
          ...prev.categories,
          [type]: list
        };
      } else if (category === 'Sub Categories') {
        const list = [...newData.subCategories];
        list[index] = toggle(list[index]);
        newData.subCategories = list;
      } else if (category === 'Contacts') {
        const list = [...newData.persons];
        list[index] = toggle(list[index]);
        newData.persons = list;
      } else if (category === 'Accounts') {
        const list = [...newData.accounts];
        list[index] = toggle(list[index]);
        newData.accounts = list;
      } else if (category === 'Reminders') {
        const list = [...newData.reminders];
        list[index] = toggle(list[index]);
        newData.reminders = list;
      }
      return newData;
    });
  };

  const handleEditTransaction = useCallback((tx: any) => {
    setSelectedTransaction(tx);
    setActiveTab('edit');
  }, []);

  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleFilterClick = useCallback(() => {
    setShowFilterModal(true);
  }, []);

  const handleNotificationsClick = useCallback(() => {
    setActiveTab('notifications');
  }, []);

  const handleViewAllClick = useCallback(() => {
    setActiveTab('transactions');
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    if (action === 'expense') {
      setInitialAddData({ type: 'expense' });
      setActiveTab('add');
    } else if (action === 'income') {
      setInitialAddData({ type: 'income' });
      setActiveTab('add');
    } else if (action === 'debt') {
      setInitialAddData({ type: 'dena' });
      setActiveTab('add');
    } else if (action === 'tasks') {
      setManagementDetail({ label: 'Tasks', isAdding: true });
    } else if (action === 'reminder') {
      setManagementDetail({ label: 'Reminders', isAdding: true });
    } else if (action === 'note') {
      setManagementDetail({ label: 'Notes', isAdding: true });
    } else if (action === 'recurring') {
      setManagementDetail({ label: 'Recurring', isAdding: true });
    } else if (action === 'subscription') {
      setManagementDetail({ label: 'Subscriptions', isAdding: true });
    } else if (action === 'add_shortcut') {
      setInitialAddData(null);
      setActiveTab('add');
    }
  }, []);

  const handleOpenDetail = useCallback((label: string) => {
    setManagementDetail({ label });
  }, []);

  const handleAddNew = useCallback((label: string) => {
    setManagementDetail({ label, isAdding: true });
  }, []);

  return (
    <LanguageContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
        
        <AnimatePresence>
          {selectedTransaction && activeTab !== 'edit' ? (
            <TransactionDetailView 
              key="detail"
              tx={selectedTransaction} 
              onBack={() => setSelectedTransaction(null)}
              onDelete={(id) => {
                setTransactions(prev => prev.filter(t => t.id !== id));
                setSelectedTransaction(null);
              }}
              onEdit={() => setActiveTab('edit')}
              transactions={transactions}
            />
          ) : activeTab === 'add' || activeTab === 'edit' ? (
            <AddTransactionView 
              key="add"
              initialData={activeTab === 'edit' ? selectedTransaction : initialAddData}
              transactions={transactions}
              onBack={() => {
                setActiveTab('home');
                if (activeTab === 'edit') setSelectedTransaction(null);
                setInitialAddData(null);
              }}
              managementData={managementData}
              onAddTransaction={(tx) => setTransactions(prev => [tx, ...prev])}
              onUpdateTransaction={(tx) => {
                setTransactions(prev => prev.map(t => t.id === tx.id ? tx : t));
                setSelectedTransaction(tx);
                setActiveTab('home');
              }}
              onAddManagementItem={addManagementItem}
              onOpenAddReminder={handleOpenAddReminder}
            />
          ) : activeTab === 'notifications' ? (
            <NotificationsView 
              key="notifications"
              onBack={() => setActiveTab('home')}
            />
          ) : activeTab === 'pdfManager' ? (
            <PdfManagerView 
              key="pdfManager"
              onBack={() => setActiveTab('home')}
            />
          ) : (
            <motion.div 
              key="main-content"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
              className="absolute inset-0 flex flex-col bg-white pb-24 overflow-y-auto will-change-transform"
            >
              {activeTab === 'home' && (
                <UnifiedTopBar 
                  isHome={true} 
                  showActions={true}
                  title={undefined}
                  balance={totals.balance} 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSearchFocus={() => setIsSearchOpen(true)}
                  onFilter={() => setShowFilterModal(true)}
                  onNotifications={() => setActiveTab('notifications')}
                  onPdfExport={handlePdfExport}
                />
              )}
              <div className="flex-1">
                {activeTab === 'home' ? (
                  <HomeView 
                    key="home" 
                    transactions={transactions} 
                    onTransactionClick={setSelectedTransaction} 
                    onEditTransaction={handleEditTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                    totals={totals}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onFilter={handleFilterClick}
                    onNotifications={handleNotificationsClick}
                    onPdfExport={handlePdfExport}
                    onViewAll={handleViewAllClick}
                    onSearchFocus={handleSearchFocus}
                    sections={homeSections}
                    onQuickAction={handleQuickAction}
                  />
                ) : activeTab === 'transactions' ? (
                  <TransactionsView 
                    key="transactions" 
                    transactions={transactions} 
                    onTransactionClick={setSelectedTransaction} 
                    onEditTransaction={handleEditTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                    totals={totals}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchFocus={handleSearchFocus}
                  />
                ) : activeTab === 'analysis' ? (
                  <AnalysisView 
                    key="analysis" 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchFocus={handleSearchFocus}
                    totals={totals}
                    transactions={transactions}
                  />
                ) : activeTab === 'management' ? (
                  <ManagementView 
                    key="management" 
                    onOpenDetail={handleOpenDetail} 
                    onAddNew={handleAddNew}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchFocus={handleSearchFocus}
                    totals={totals}
                    managementData={managementData}
                    transactions={transactions}
                  />
                ) : activeTab === 'settings' ? (
                  <SettingsView 
                    key="settings" 
                    onOpenWorkspace={setSelectedWorkspace} 
                    onOpenDetail={(label) => setManagementDetail({ label })}
                    onAddNew={(label) => setManagementDetail({ label, isAdding: true })}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchFocus={() => setIsSearchOpen(true)}
                    totals={totals}
                    onOpenProfile={() => setShowProfileView(true)}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    onOpenEditHome={() => setActiveTab('editHome')}
                    onOpenQuickActions={() => setActiveTab('quickActions')}
                    widgetEnabled={widgetEnabled}
                    setWidgetEnabled={setWidgetEnabled}
                    floatingBubbleEnabled={floatingBubbleEnabled}
                    setFloatingBubbleEnabled={setFloatingBubbleEnabled}
                    onOpenWidgetSettings={() => setActiveTab('widgetSettings')}
                    onOpenFloatingBubbleSettings={() => setActiveTab('floatingBubbleSettings')}
                  />
                ) : activeTab === 'editHome' ? (
                  <EditHomePageView 
                    key="editHome"
                    onBack={() => setActiveTab('settings')} 
                    sections={homeSections}
                    onToggle={(id) => setHomeSections(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }))}
                  />
                ) : activeTab === 'widgetSettings' ? (
                  <WidgetSettingsView 
                    key="widgetSettings"
                    onBack={() => setActiveTab('settings')}
                    enabled={widgetEnabled}
                    onToggle={setWidgetEnabled}
                  />
                ) : activeTab === 'floatingBubbleSettings' ? (
                  <FloatingBubbleSettingsView 
                    key="floatingBubbleSettings"
                    onBack={() => setActiveTab('settings')}
                    enabled={floatingBubbleEnabled}
                    onToggle={setFloatingBubbleEnabled}
                  />
                ) : activeTab === 'quickActions' ? (
                  <QuickActionsView 
                    key="quickActions"
                    onBack={() => setActiveTab('settings')}
                    onQuickAction={(action) => {
                      if (action === 'expense') {
                        setInitialAddData({ type: 'expense' });
                        setActiveTab('add');
                      } else if (action === 'income') {
                        setInitialAddData({ type: 'income' });
                        setActiveTab('add');
                      } else if (action === 'debt') {
                        setInitialAddData({ type: 'dena' });
                        setActiveTab('add');
                      } else if (action === 'tasks' || action === 'reminder') {
                        setShowAddReminderModal(true);
                      } else if (action === 'note') {
                        setInitialAddData({ type: 'expense', txName: 'Note: ' });
                        setActiveTab('add');
                      } else if (action === 'recurring' || action === 'subscription') {
                        setInitialAddData({ type: 'expense', status: 'Recurring' });
                        setActiveTab('add');
                      } else if (action === 'add_shortcut') {
                        setInitialAddData(null);
                        setActiveTab('add');
                      }
                    }}
                  />
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showProfileView && (
            <ProfileView 
              transactions={transactions} 
              onClose={() => setShowProfileView(false)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearchOpen && (
            <GlobalSearchView 
              isOpen={isSearchOpen}
              query={searchQuery}
              setSearchQuery={setSearchQuery}
              transactions={transactions}
              managementData={managementData}
              onTransactionClick={setSelectedTransaction}
              onEditTransaction={(tx) => {
                setSelectedTransaction(tx);
                setActiveTab('edit');
                setIsSearchOpen(false);
              }}
              onDeleteTransaction={(id) => {
                setTransactions(prev => prev.filter(t => t.id !== id));
              }}
              onManagementClick={(label) => {
                setManagementDetail({ label });
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              onWorkspaceClick={(id) => {
                setSelectedWorkspace(id);
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              onClose={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedWorkspace && (
            <WorkspaceDetail 
              id={selectedWorkspace} 
              onBack={() => setSelectedWorkspace(null)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {managementDetail && (
            <ManagementDetailView 
              key={managementDetail.label + (managementDetail.editingIndex !== undefined ? managementDetail.editingIndex : '')}
              label={managementDetail.label}
              filter={managementDetail.type}
              initialEditingIndex={managementDetail.editingIndex}
              initialIsAdding={managementDetail.isAdding}
              data={managementData}
              transactions={transactions}
              onClose={() => setManagementDetail(null)}
              onAdd={addManagementItem}
              onRemove={removeManagementItem}
              onUpdate={updateManagementItem}
              onToggleArchive={toggleArchiveManagementItem}
              onOpenAddReminder={() => handleOpenAddReminder('', (reminder) => {
                addManagementItem('Reminders', reminder);
              })}
              accountTypes={managementData.accountTypes}
              onAddAccountType={(type) => setManagementData(prev => ({
                ...prev,
                accountTypes: [...prev.accountTypes, type]
              }))}
              onTogglePin={(idx) => {
                setManagementData(prev => {
                  const newAccounts = [...prev.accounts];
                  const isCurrentlyPinned = newAccounts[idx].isPinned;
                  if (!isCurrentlyPinned) {
                    const pinnedCount = newAccounts.filter(acc => acc.isPinned).length;
                    if (pinnedCount >= 3) {
                      alert(t('maxPinnedWallets'));
                      return prev;
                    }
                  }
                  newAccounts[idx] = { ...newAccounts[idx], isPinned: !isCurrentlyPinned };
                  return { ...prev, accounts: newAccounts };
                });
              }}
              onSetDefault={(idx) => {
                setManagementData(prev => {
                  const newAccounts = prev.accounts.map((acc: any, i: number) => ({
                    ...acc,
                    isDefault: i === idx
                  }));
                  return { ...prev, accounts: newAccounts };
                });
              }}
              onOpenSubCategories={(category) => setSelectedCategoryDetail(category)}
              onOpenTransactions={(subCategory) => {
                setSelectedSubCategory(subCategory);
              }}
              onOpenContactDetail={(contact) => {
                setSelectedContactDetail(contact);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedContactDetail && (
            <ContactDetailView 
              contact={selectedContactDetail}
              transactions={transactions}
              onClose={() => setSelectedContactDetail(null)}
              onTransactionClick={(tx) => {
                setSelectedTransaction(tx);
                setSelectedContactDetail(null);
                setManagementDetail(null);
              }}
              onEditTransaction={(tx) => {
                setSelectedTransaction(tx);
                setActiveTab('edit');
                setSelectedContactDetail(null);
                setManagementDetail(null);
              }}
              onDeleteTransaction={(id) => {
                setTransactions(prev => prev.filter(t => t.id !== id));
              }}
              onEdit={() => {
                setManagementDetail(prev => prev ? { ...prev, editingIndex: selectedContactDetail.originalIndex } : null);
                setSelectedContactDetail(null);
              }}
              onRemove={() => {
                removeManagementItem('Contacts', selectedContactDetail.originalIndex);
                setSelectedContactDetail(null);
              }}
              onToggleArchive={() => {
                toggleArchiveManagementItem('Contacts', selectedContactDetail.originalIndex);
                setSelectedContactDetail(null);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedCategoryDetail && (
            <CategoryDetailView 
              category={selectedCategoryDetail}
              data={managementData}
              transactions={transactions}
              onClose={() => setSelectedCategoryDetail(null)}
              onTransactionClick={(tx) => {
                setSelectedTransaction(tx);
                setSelectedCategoryDetail(null);
                setManagementDetail(null);
              }}
              onEditTransaction={(tx) => {
                setSelectedTransaction(tx);
                setActiveTab('edit');
                setSelectedCategoryDetail(null);
                setManagementDetail(null);
              }}
              onDeleteTransaction={(id) => {
                setTransactions(prev => prev.filter(t => t.id !== id));
              }}
              onOpenSubCategory={(sub) => {
                setSelectedSubCategory(sub);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedSubCategory && (
            <SubCategoryTransactionsView 
              subCategory={selectedSubCategory}
              transactions={transactions}
              onClose={() => setSelectedSubCategory(null)}
              onTransactionClick={(tx) => {
                setSelectedTransaction(tx);
                setSelectedSubCategory(null);
                setSelectedCategoryDetail(null);
                setManagementDetail(null);
              }}
              onEdit={(tx) => {
                setSelectedTransaction(tx);
                setActiveTab('edit');
                setSelectedSubCategory(null);
                setSelectedCategoryDetail(null);
                setManagementDetail(null);
              }}
              onDelete={(id) => {
                setTransactions(prev => prev.filter(t => t.id !== id));
              }}
            />
          )}
        </AnimatePresence>

        {!selectedTransaction && activeTab !== 'add' && activeTab !== 'edit' && !managementDetail && !selectedContactDetail && !selectedCategoryDetail && !selectedSubCategory && !selectedWorkspace && (
          <BottomBar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSearchQuery('');
            }} 
            onAddClick={() => {
              setActiveTab('add');
            }}
          />
        )}
        
        {/* Safe area spacer for mobile browsers */}
        <div className="h-24" />
      </div>
      <AnimatePresence>
        {showAddReminderModal && (
          <AddReminderModal 
            isOpen={showAddReminderModal}
            onClose={() => setShowAddReminderModal(false)}
            initialName={addReminderInitialName}
            onSave={(reminder) => {
              if (addReminderCallback) {
                addReminderCallback.fn(reminder);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </LanguageContext.Provider>
  );
}
