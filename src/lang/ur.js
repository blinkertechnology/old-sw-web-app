export default {
    title: 'Sorted Wallet',

    username: 'صارف نام',
    email: 'ای میل',
    password: 'پاس ورڈ',
    phoneNumber: 'فون نمبر',
    otpCode: '۶ ہندسوں کا کوڈ',

    select: 'منتخب کریں۔',
    back: 'پیچھے',
    view: 'دیکھیں',
    cancel: 'منسوخ کریں۔',
    actions: 'اعمال',
    options: 'اختیارات',
    Error: 'مسئلہ',
    success: 'کامیابی',
    ok: 'ٹھیک ہے',
    next: 'اگلے',
    closeAd: 'اشتہار بند کریں۔',

    login: 'لاگ ان',
    register: 'رجسٹر',
    logout: 'لاگ آوٹ',
    forgotPassword: 'پاسورڈ بھول گے؟',

    genericErrorTitle: 'کچھ غلط ہو گیا.',
    genericError: 'کچھ غلط ہو گیا. دوبارہ کوشش کریں.',

    loggedOut: 'آپ لاگ آؤٹ ہو چکے ہیں، براہ کرم دوبارہ لاگ ان کریں۔',
    offline: {
        title: 'آپ آف لائن ہیں۔',
        text: 'ایسا لگتا ہے کہ آپ کے کنکشن میں کوئی مسئلہ ہے۔ براہ کرم اپنا نیٹ ورک کنکشن چیک کریں۔',
        refresh: 'ریفریش کریں۔'
    },

    wallets: {
        bitcoin: 'BTC Balance',
        matic: 'MATIC Balance'
    },

    pages: {
        signup: {
            title: 'رجسٹر کریں۔',
            emailRequired: 'ای میل کی ضرورت ہے!',
            passwordRequired: 'پاس ورڈ درکار ہے!',
            passwordLength: 'پاس ورڈ کی لمبائی 5 ہندسوں سے کم نہیں ہونی چاہیے۔.'
        },

        login: {
            title: 'اگ ان کریں',
            instructions1: 'ترتیب شدہ والیٹ آپ کے فون نمبر کی تصدیق کے لیے آپ کو ایک بار کا کوڈ بھیجے گا۔',
            instructions2: '6 ہندسوں کا کوڈ درج کریں جس پر بھیجا گیا تھا۔ {phone}',
        },

        setupPIN: {
            title: 'اپنا پن کوڈ بنائیں',
            instructions1: 'براہ کرم اسے یاد رکھیں اور اسے مستقبل کے پرس کے لین دین کے لیے محفوظ رکھیں۔',
            submit: 'جمع کرائیں',
            pinInput: 'خفیہ نمبر',
            confirmPinInput: 'پن کی تصدیق کریں۔',
            errors: {
                required: 'براہ کرم ایک عددی پن کوڈ درج کریں۔',
                match: 'درج کردہ پن مماثل نہیں ہے۔',
                length: 'پن 3 اور 7 ہندسوں کے درمیان ہونا چاہیے۔'
            }
        },

        homepage: {
            intro: {
                title: `'Sorted Wallet' میں خوش آمدید`,
                sub: 'جاری رکھنے کے لیے لاگ ان کریں یا رجسٹر کریں۔',
            },
            emailLogin: 'ای میل پاس ورڈ',
            phoneLogin: 'فون نمبر'
        },

        forgotPassword: {
            title: 'پاسورڈ بھول گے؟',
            resetPassword: 'پاس ورڈ ری سیٹ'
        },

        settings: {
            changeLanguage: 'زبان تبدیل کریں'
        },

        dashboard: {
            myWallets: 'میرا پرس',
            settings: 'ترتیبات',

            qrCode: 'QR کوڈ',
            transactionRecords: 'لین دین کے ریکارڈز',
            makeTransaction: 'لین دین کریں۔',
            share: 'بٹوے کا پتہ شیئر کریں۔',
            shareEmail: 'ای میل',
            shareMessage: 'پیغام',
        },

        makeTransaction: {
            title: 'لین دین کریں',
            upload: 'تصویر اپ لوڈ کریں (QR کوڈ)',
            scan: 'اسکین QR (والٹ ایڈریس)',
            destination: 'پرس کی منزل کا پتہ',
            amount: 'رقم',
            pin: 'خفیہ نمبر',
            submit: 'جمع کرائیں',
        },

        transactions: {
            makeTransaction: 'لین دین کریں۔',
            title: 'لین دین کے ریکارڈز',
            noTransactions: 'ابھی تک کوئی لین دین نہیں ہے۔'
        },
    },

    tac: {
        agree: 'متفق',
        scrollDown: 'نیچے سکرول کریں',

        error: 'براہ کرم شرائط و ضوابط سے اتفاق کریں!',

        confirm: {
            primary: 'میں نے پڑھ کر اتفاق کیا ہے۔',
            secondary: 'شرائط و ضوابط پر',
        }
    }
}