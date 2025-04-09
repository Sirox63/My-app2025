document.addEventListener('DOMContentLoaded', function () {
    const welcomePage = document.getElementById('welcome-page');
    const mainPage = document.getElementById('main-page');
    const englishUnitsPage = document.getElementById('english-units-page');
    const detailsPage = document.getElementById('details-page');
    const questionsPage = document.getElementById('questions-page');
    const startBtn = document.getElementById('start-btn');
    const menuBtn = document.getElementById('menu-btn');
    const detailsBtn = document.getElementById('details-btn');
    const facebookBtn = document.getElementById('facebook-btn');
    const englishBtn = document.getElementById('english-btn');
    const frenchBtn = document.getElementById('french-btn');
    const homeBtn = document.getElementById('home-btn');
    const unit1Btn = document.getElementById('unit1-btn');
    const unit2Btn = document.getElementById('unit2-btn');
    const unit3Btn = document.getElementById('unit3-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackBox = document.getElementById('feedback-box');
    const nextBtn = document.getElementById('next-btn');
    const menu = document.getElementById('menu');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let interstitialAdLoaded = false;

    // تهيئة إعلانات AdMob
    function initAdMob() {
        if(typeof admob !== 'undefined') {
            admob.banner.config({
                id: 'ca-app-pub-3551784562611863/1213422004',
                isTesting: false,
                autoShow: true
            });
            admob.banner.prepare();
            
            admob.interstitial.config({
                id: 'ca-app-pub-3551784562611863/4525688504
',
                isTesting: false,
                autoShow: false
            });
            admob.interstitial.prepare();
            interstitialAdLoaded = true;
        }
    }

    // عرض إعلان Interstitial
    function showInterstitialAd() {
        if(interstitialAdLoaded && typeof admob !== 'undefined') {
            admob.interstitial.show().then(() => {
                admob.interstitial.prepare();
            });
        }
    }

    // Check if it's the first time using the app
    if (!localStorage.getItem('visited')) {
        welcomePage.classList.remove('hidden');
        mainPage.classList.add('hidden'); // إخفاء الصفحة الرئيسية
        localStorage.setItem('visited', true);
    } else {
        welcomePage.classList.add('hidden');
        mainPage.classList.remove('hidden');
    }

    // تهيئة الإعلانات عند تحميل الصفحة
    initAdMob();

    // إظهار/إخفاء زر العودة إلى الرئيسية
    function toggleHomeButton() {
        if (mainPage.classList.contains('hidden')) {
            homeBtn.classList.remove('hidden');
        } else {
            homeBtn.classList.add('hidden');
        }
    }

    // العودة إلى الصفحة الرئيسية
    homeBtn.addEventListener('click', function () {
        welcomePage.classList.add('hidden');
        englishUnitsPage.classList.add('hidden');
        detailsPage.classList.add('hidden');
        questionsPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        toggleHomeButton();
    });

    startBtn.addEventListener('click', function () {
        welcomePage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        toggleHomeButton();
    });

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('visible');
    });

    // إخفاء القائمة عند لمس أي مكان في الشاشة
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menu.classList.remove('visible');
        }
    });

    detailsBtn.addEventListener('click', function () {
        showInterstitialAd();
        mainPage.classList.add('hidden');
        detailsPage.classList.remove('hidden');
        toggleHomeButton();
    });
  // أسئلة اللغة الفرنسية
const frenchQuestions = [
    { question: "Alliés", options: shuffleArray(["الحلفاء", "الاستعمار", "المقاومة"]), answer: "الحلفاء" },
    { question: "A.L.N : Armée de Libération Nationale", options: shuffleArray(["جيش التحرير الوطني", "القمع", "المعسكر"]), answer: "جيش التحرير الوطني" },
    { question: "Arme", options: shuffleArray(["سلاح", "استفتاء", "القوة"]), answer: "سلاح" },
    { question: "Armée", options: shuffleArray(["جيش", "غزو", "ثورة"]), answer: "جيش" },
    { question: "Armement", options: shuffleArray(["تسلح، تسليح", "إبادة", "اعتقال"]), answer: "تسلح، تسليح" },
    { question: "Arrestation", options: shuffleArray(["توقيف، اعتقال", "الاستعمار", "الحكومة"]), answer: "توقيف، اعتقال" },
    { question: "Assassiner / Assassinat", options: shuffleArray(["اغتيال، قتل", "جيش التحرير الوطني", "مستعمرة"]), answer: "اغتيال، قتل" },
    { question: "Atroce", options: shuffleArray(["فظيع", "كمين", "متمرد"]), answer: "فظيع" },
    { question: "Attaque", options: shuffleArray(["هجوم", "الاختلاس", "وقف إطلاق النار"]), answer: "هجوم" },
    { question: "Attroupement", options: shuffleArray(["حشد", "الجيش", "جثة"]), answer: "حشد" },
    { question: "Bannière", options: shuffleArray(["الراية", "الانتفاضة", "الانقلاب"]), answer: "الراية" },
    { question: "Barbarie", options: shuffleArray(["وحشية", "احتلال", "التحرير"]), answer: "وحشية" },
    { question: "Bataille", options: shuffleArray(["معركة", "تمرد", "الانفجار"]), answer: "معركة" },
    { question: "Battre", options: shuffleArray(["انتصر على", "العنف", "الغزو"]), answer: "انتصر على" },
    { question: "Biens Faiseurs", options: shuffleArray(["عمال خير", "جلاد", "المستعمرات"]), answer: "عمال خير" },
    { question: "Blessé", options: shuffleArray(["جريح، مصاب", "الاحتلال", "التعذيب"]), answer: "جريح، مصاب" },
    { question: "Bourreau", options: shuffleArray(["جلاد", "الإعدام", "القوة"]), answer: "جلاد" },
    { question: "Bravoure", options: shuffleArray(["شجاعة", "العنف", "العدو"]), answer: "شجاعة" },
    { question: "Brutalement", options: shuffleArray(["بوحشية", "حاكم", "الثورة"]), answer: "بوحشية" },
    { question: "Butin", options: shuffleArray(["غنيمة", "التطهير", "الإبادة"]), answer: "غنيمة" },
    { question: "Cachés", options: shuffleArray(["مختبئون", "استفتاء", "ميدان القتال"]), answer: "مختبئون" },
    { question: "Cadavre", options: shuffleArray(["جثة", "غسيل الأموال", "الإصلاحات"]), answer: "جثة" },
    { question: "Camp", options: shuffleArray(["معسكر", "الاحتلال", "المستعمر"]), answer: "معسكر" },
    { question: "Capitaux", options: shuffleArray(["رؤوس الأموال", "الإعدام", "المقاومة"]), answer: "رؤوس الأموال" },
    { question: "Capitulation", options: shuffleArray(["استسلام", "القمع", "المذابح"]), answer: "استسلام" },
    { question: "Capturer", options: shuffleArray(["أسر", "الاختلاس", "الإعدام الفوري"]), answer: "أسر" },
    { question: "La Cause Algérienne", options: shuffleArray(["القضية الجزائرية", "الثورة", "المجزرة"]), answer: "القضية الجزائرية" },
    { question: "C.C.A : Comité de Coordination et D'exécution", options: shuffleArray(["لجنة التنسيق والتنفيذ", "المذبحة", "التمشيط"]), answer: "لجنة التنسيق والتنفيذ" },
    { question: "Cessez-le-feu", options: shuffleArray(["وقف إطلاق النار", "تمرد", "القوة"]), answer: "وقف إطلاق النار" },
    { question: "Chaos", options: shuffleArray(["فوضى عارمة", "مذبحة", "مستعمرات"]), answer: "فوضى عارمة" },
    { question: "Charnier", options: shuffleArray(["مقابر جماعية", "احتلال", "هجوم"]), answer: "مقابر جماعية" },
    { question: "C.N.R.A : Conseil National De La Révolution Algérienne", options: shuffleArray(["المجلس الوطني للثورة الجزائرية", "الحكومة", "الانتفاضة"]), answer: "المجلس الوطني للثورة الجزائرية" },
    { question: "Colon", options: shuffleArray(["مستوطن", "الإعدام", "المجزرة"]), answer: "مستوطن" },
      { question: "Colonialisme", options: shuffleArray(["استعمار", "غزو", "المقاومة"]), answer: "استعمار" },
    { question: "Colonialiste", options: shuffleArray(["مستعمر", "المذابح", "المعسكرات"]), answer: "مستعمر" },
    { question: "Colonies", options: shuffleArray(["مستعمرات", "العنف", "الإعدام الفوري"]), answer: "مستعمرات" },
    { question: "Embuscade", options: shuffleArray(["كمين", "تسلح", "الحكومة"]), answer: "كمين" },
    { question: "Emprisonner", options: shuffleArray(["سجن", "العدو", "الإعدامات"]), answer: "سجن" },
    { question: "E.N.A : Étoile Nord-Africaine", options: shuffleArray(["حزب نجم شمال إفريقيا", "المعسكر", "القوة"]), answer: "حزب نجم شمال إفريقيا" },
    { question: "Ennemi", options: shuffleArray(["عدو", "التمرد", "ميدان القتال"]), answer: "عدو" }
];


    // أسئلة الوحدة الأولى للغة الإنجليزية
const englishUnit1Questions = [
    { question: "Embezzlement", options: ["اختلاس الأموال", "الرشوة", "غسيل الأموال"], answer: "اختلاس الأموال" },
    { question: "Bribery", options: ["الرشوة", "التهرب الضريبي", "تزوير العملة"], answer: "الرشوة" },
    { question: "Such as", options: ["مثل", "يختلف", "نتيجة"], answer: "مثل" },
    { question: "Money laundering", options: ["غسيل الأموال", "الابتزاز", "العملية"], answer: "غسيل الأموال" },
    { question: "Tax evasion", options: ["التهرب الضريبي", "تزوير العملة", "الإبداع المحاسبي"], answer: "التهرب الضريبي" },
    { question: "Source", options: ["مصدر", "نتيجة", "وجهة"], answer: "مصدر" },
    { question: "Creative accounting", options: ["الإبداع المحاسبي", "تزوير العملة", "ابتزاز"], answer: "الإبداع المحاسبي" },
    { question: "Counterfeiting", options: ["التزوير", "ينخرط", "عملة"], answer: "التزوير" },
    { question: "Varying", options: ["يختلف", "ملك", "مفتاح"], answer: "يختلف" },
    { question: "Currency counterfeiting", options: ["تزوير العملة", "الإدراك", "المظهر"], answer: "تزوير العملة" },
    { question: "Extortion", options: ["الابتزاز", "الحكومة", "النتيجة"], answer: "الابتزاز" },
    { question: "Underground", options: ["تحت الأرض", "العملية", "حكم"], answer: "تحت الأرض" },
    { question: "Black mailing", options: ["الابتزاز الإلكتروني", "الفساد", "التهرب الضريبي"], answer: "الابتزاز الإلكتروني" },
    { question: "Child labour", options: ["تشغيل الأطفال", "المحكمة", "التصنيف"], answer: "تشغيل الأطفال" },
    { question: "To engage", options: ["ينخرط", "يولد", "يخفي"], answer: "ينخرط" },
    { question: "Key", options: ["مفتاح", "مكتب", "حكومة"], answer: "مفتاح" },
    { question: "The process", options: ["العملية", "التزوير", "تزوير العملة"], answer: "العملية" },
    { question: "Transactions", options: ["عملية (مبادلة) تجارية", "الملك", "ينخرط"], answer: "عملية (مبادلة) تجارية" },
    { question: "Appearance", options: ["المظهر", "التصنيف", "ملك"], answer: "المظهر" },
    { question: "Amount", options: ["الكمية", "المكتب", "نتيجة"], answer: "الكمية" },
    { question: "Destination", options: ["وجهة", "مفتاح", "الإدراك"], answer: "وجهة" },
    { question: "To obtain", options: ["يتحصل", "ينخرط", "مكتب"], answer: "يتحصل" },
    { question: "Serious", options: ["جدي", "غامض", "العملية"], answer: "جدي" },
    { question: "Legitimate", options: ["شرعي", "غير شرعي", "نتيجة"], answer: "شرعي" },
    { question: "Operation", options: ["عملية", "تصنيف", "نتيجة"], answer: "عملية" },
    { question: "Disguise", options: ["تنكر", "تزوير العملة", "حكومة"], answer: "تنكر" },
    { question: "Office", options: ["مكتب", "حكومة", "ينخرط"], answer: "مكتب" },
    { question: "Law", options: ["قانون", "نتيجة", "عملة"], answer: "قانون" },
    { question: "The fact", options: ["الحقيقة", "ملكية", "يولد"], answer: "الحقيقة" },
    { question: "The comptroller", options: ["مراقب", "مفتاح", "المكتب"], answer: "مراقب" },
    { question: "Financial", options: ["مالي", "نتيجة", "غسيل الأموال"], answer: "مالي" },
      { question: "The proceeds", options: ["مداخيل/ العائدات", "القانون", "وجهة"], answer: "مداخيل/ العائدات" },
    { question: "Currency", options: ["عملة", "ملك", "المكتب"], answer: "عملة" },
    { question: "Conceal", options: ["يخفي", "التنكر", "التصنيف"], answer: "يخفي" },
    { question: "Obscure", options: ["غامض", "التزوير", "القانون"], answer: "غامض" },
    { question: "To generate", options: ["يولد", "عملية", "ينخرط"], answer: "يولد" },
    { question: "Illegally", options: ["غير شرعي", "المظهر", "ملك"], answer: "غير شرعي" },
    { question: "Beneficial", options: ["مفيد", "تصنيف", "المكتب"], answer: "مفيد" },
    { question: "Value", options: ["قيمة", "نتيجة", "حكومة"], answer: "قيمة" },
    { question: "Common", options: ["مألوف / متداول", "تصنيف", "تحت الأرض"], answer: "مألوف / متداول" },
    { question: "Ownership", options: ["ملكية", "نتيجة", "مكتب"], answer: "ملكية" },
    { question: "Result", options: ["نتيجة", "مكتب", "عملة"], answer: "نتيجة" },
    { question: "Wider", options: ["أوسع", "ينخرط", "التزوير"], answer: "أوسع" },
    { question: "Related", options: ["له علاقة", "عملية", "ينخرط"], answer: "له علاقة" },
    { question: "To involve", options: ["يشمل / يربط", "يولد", "التصنيف"], answer: "يشمل / يربط" },
    { question: "Property", options: ["ملكية", "نتيجة", "القانون"], answer: "ملكية" },
    { question: "Government", options: ["حكومة", "تصنيف", "تزوير العملة"], answer: "حكومة" },
    { question: "Court", options: ["محكمة", "عملة", "ينخرط"], answer: "محكمة" },
    { question: "Private", options: ["خاص", "قيمة", "نتيجة"], answer: "خاص" }
];

    // أسئلة الوحدة الثانية للغة الإنجليزية
    const englishUnit2Questions = [ { question: "Advertising / publicity", options: ["التسويق", "الإعلان / الدعاية", "الترويج"], answer: "الإعلان / الدعاية" },
            { question: "Consumer", options: ["المستهلك", "البائع", "المنتج"], answer: "المستهلك" },
            { question: "Cost / price", options: ["تكلفة / سعر", "نفقات", "ربح"], answer: "تكلفة / سعر" },
            { question: "Processed food", options: ["طعام طازج", "أغذية مصنعة / معالجة", "وجبات منزلية"], answer: "أغذية مصنعة / معالجة" },
            { question: "Organic food", options: ["طعام طبيعي", "طعام مصنع", "طعام عضوي"], answer: "طعام عضوي" },
            { question: "Fast / Junk food", options: ["طعام صحي", "طعام سريع / غير صحي", "طعام نباتي"], answer: "طعام سريع / غير صحي" },
            { question: "Safety / security", options: ["مخاطر", "حماية", "سلامة / أمن"], answer: "سلامة / أمن" },
            { question: "Persuasion", options: ["إقناع", "اعتراض", "تحفيز"], answer: "إقناع" },
            { question: "Snacks / sandwiches", options: ["وجبات خفيفة / شطائر", "مشروبات", "مقبلات"], answer: "وجبات خفيفة / شطائر" },
            { question: "Label / mark", options: ["علامة / ملصق", "ماركة", "رمز"], answer: "علامة / ملصق" },
            { question: "Habits", options: ["معتقدات", "عادات / سلوكيات", "تقاليد"], answer: "عادات / سلوكيات" },
            { question: "Balance", options: ["انسجام", "استقرار", "توازن"], answer: "توازن" },
            { question: "Products", options: ["خدمات", "منتجات", "أدوات"], answer: "منتجات" },
            { question: "Expiry date", options: ["تاريخ الإنتاج", "تاريخ انتهاء الصلاحية", "مدة التخزين"], answer: "تاريخ انتهاء الصلاحية" },
            { question: "Contamination", options: ["نظافة", "تلوث", "إشعاع"], answer: "تلوث" },
            { question: "Slogan / motto", options: ["شعار", "علامة", "كلمة سر"], answer: "شعار" },
            { question: "Weight", options: ["ارتفاع", "وزن", "حجم"], answer: "وزن" },
            { question: "Indigestion", options: ["عسر الهضم", "التسمم", "حرقة المعدة"], answer: "عسر الهضم" },
            { question: "Billboard", options: ["لافتة", "لوحة إعلانية", "إعلان صوتي"], answer: "لوحة إعلانية" },
                                               { question: "Obesity / fatness", options: ["ضعف", "سمنة / بدانة", "طول القامة"], answer: "سمنة / بدانة" },
            { question: "Shopaholic", options: ["مدمن تسوق", "بائع محترف", "عميل دائم"], answer: "مدمن تسوق" },
            { question: "Hygiene", options: ["نظافة", "طبخ", "تنظيف"], answer: "نظافة" },
            { question: "Banned", options: ["مصرح", "محظور", "متاح"], answer: "محظور" },
            { question: "Drinks", options: ["مشروبات", "أطعمة", "وجبات"], answer: "مشروبات" },
            { question: "Shopping", options: ["تسوق", "بيع", "شراء"], answer: "تسوق" },
            { question: "Impact / influence", options: ["أثر / تأثير", "نتيجة", "سبب"], answer: "أثر / تأثير" },
            { question: "Package", options: ["عبوة / تغليف", "منتج", "محتوى"], answer: "عبوة / تغليف" },
            { question: "Ingredients", options: ["مكونات", "نكهات", "محتوى"], answer: "مكونات" },
            { question: "Treatment", options: ["علاج / معالجة", "دواء", "تحليل"], answer: "علاج / معالجة" },
            { question: "Poisoning", options: ["تسمم", "عدوى", "مرض"], answer: "تسمم" },
            { question: "Harmful / dangerous", options: ["مفيد", "مضر / خطير", "غير ضار"], answer: "مضر / خطير" },
            { question: "Healthy / Unhealthy", options: ["صحي / غير صحي", "مفيد / غير مفيد", "مناسب / غير مناسب"], answer: "صحي / غير صحي" },
            { question: "Endorsement / approval", options: ["موافقة / مصادقة", "رفض / اعتراض", "تحليل / تقييم"], answer: "موافقة / مصادقة" },
            { question: "Sales", options: ["مبيعات", "شراء", "ترويج"], answer: "مبيعات" },
            { question: "Nutrition", options: ["تغذية", "طعام", "وجبة"], answer: "تغذية" },
            { question: "System", options: ["نظام", "منهج", "خطة"], answer: "نظام" },
            { question: "Awareness", options: ["وعي", "إدراك", "ملاحظة"], answer: "وعي" },
            { question: "Hospitalized", options: ["منوم في المستشفى", "مريض", "مصاب"], answer: "منوم في المستشفى" },
            { question: "Company / corporation", options: ["شركة / مؤسسة", "مجموعة", "إدارة"], answer: "شركة / مؤسسة" },
            { question: "Industry", options: ["صناعة", "إنتاج", "عمل"], answer: "صناعة" },
            { question: "Pesticide", options: ["مبيد حشري", "سماد", "تربة"], answer: "مبيد حشري" },
      
     ];

    // أسئلة الوحدة الثالثة للغة الإنجليزية
const unit3Questions = [
{ question: "Astronomy", answer: "علم الفلك", options: ["علم الفلك", "جاذبية", "مجموعة نجمية"] },
{ question: "Solar system", answer: "نظام شمسي", options: ["نظام شمسي", "مجرة", "مذنب"] },
{ question: "Space / Outer space", answer: "فضاء / الفضاء الخارجي", options: ["فضاء / الفضاء الخارجي", "كويكب", "الشمس"] },
{ question: "Galaxy", answer: "مجرة", options: ["مجرة", "مدار", "نيزك"] },
{ question: "Heavenly body", answer: "جسم سماوي", options: ["جسم سماوي", "قمر اصطناعي", "تلسكوب"] },
{ question: "Planets", answer: "كواكب", options: ["كواكب", "الكون", "طاقة"] },
{ question: "Satellite / Moon", answer: "قمر اصطناعي / قمر", options: ["قمر اصطناعي / قمر", "الشمس", "محطة فضائية"] },
{ question: "Atmosphere", answer: "الغلاف الجوي", options: ["الغلاف الجوي", "مذنب", "محطة فضائية"] },
{ question: "Orbit / Circle / Path", answer: "مدار / مسار", options: ["مدار / مسار", "الضوء", "كسوف / خسوف"] },
{ question: "Stars", answer: "نجوم", options: ["نجوم", "نيزك", "صاروخ"] },
{ question: "Asteroid", answer: "كويكب", options: ["كويكب", "الضوء", "الطاقة"] },
{ question: "Meteor", answer: "نيزك", options: ["نيزك", "الكون", "قمر اصطناعي"] },
{ question: "Universe / Cosmos", answer: "كون", options: ["كون", "مجموعة نجمية", "كسوف / خسوف"] },
{ question: "Astronaut", answer: "رائد فضاء", options: ["رائد فضاء", "مدار", "شمس"] },
{ question: "Astronomer", answer: "عالم فلك", options: ["عالم فلك", "محطة فضائية", "المجرة"] },
  { question: "Observatory", answer: "مرصد فلكي", options: ["مرصد فلكي", "مجموعة نجمية", "الكون"] },
{ question: "Telescope", answer: "تلسكوب", options: ["تلسكوب", "الضوء", "الشمس"] },
{ question: "Nebula", answer: "سحابة غازية سماوية", options: ["سحابة غازية سماوية", "المدار", "المجرة"] },
{ question: "Comet", answer: "مذنب", options: ["مذنب", "الشمس", "الطاقة"] },
{ question: "Gravity", answer: "جاذبية", options: ["جاذبية", "مجموعة نجمية", "الضوء"] },
{ question: "Twinkle / sparkle", answer: "وميض", options: ["وميض", "نيزك", "محطة فضائية"] },
{ question: "Sky", answer: "سماء", options: ["سماء", "الكواكب", "صاروخ"] },
{ question: "Spacecraft", answer: "مركبة فضائية", options: ["مركبة فضائية", "الشمس", "مدار"] },
{ question: "Rocket", answer: "صاروخ", options: ["صاروخ", "الغلاف الجوي", "محطة فضائية"] },
{ question: "Collision", answer: "اصطدام", options: ["اصطدام", "المجرة", "المريخ"] },
{ question: "Sun", answer: "شمس", options: ["شمس", "مجموعة نجمية", "محطة فضائية"] },
{ question: "Milky way", answer: "مجرة درب التبانة", options: ["مجرة درب التبانة", "الشمس", "طاقة"] },
{ question: "Light year", answer: "سنة ضوئية", options: ["سنة ضوئية", "مجرة", "نيزك"] },
{ question: "Diameter", answer: "قطر الدائرة", options: ["قطر الدائرة", "محطة فضائية", "الكواكب"] },
{ question: "Exploration", answer: "استكشاف", options: ["استكشاف", "الكون", "المجرة"] },
{ question: "NASA", answer: "مركز الأبحاث الفضائية", options: ["مركز الأبحاث الفضائية", "مجرة", "الشمس"] },
{ question: "Planet surface", answer: "سطح الكوكب", options: ["سطح الكوكب", "كسوف", "الكواكب"] },
{ question: "Direction", answer: "اتجاه", options: ["اتجاه", "الكون", "الطاقة"] },
{ question: "Eclipse", answer: "كسوف / خسوف", options: ["كسوف / خسوف", "الكواكب", "الشمس"] },
{ question: "Constellation", answer: "مجموعة نجمية", options: ["مجموعة نجمية", "الشمس", "المجرة"] },
{ question: "Mercury", answer: "كوكب عطارد", options: ["كوكب عطارد", "الكون", "الطاقة"] },
{ question: "Venus", answer: "كوكب الزهرة", options: ["كوكب الزهرة", "الكواكب", "المجرة"] },
{ question: "Earth", answer: "كوكب الأرض", options: ["كوكب الأرض", "الشمس", "الطاقة"] },
{ question: "Mars", answer: "كوكب المريخ", options: ["كوكب المريخ", "مجموعة نجمية", "محطة فضائية"] },
{ question: "Jupiter", answer: "كوكب المشتري", options: ["كوكب المشتري", "المجرة", "الشمس"] },
{ question: "Saturn", answer: "كوكب زحل", options: ["كوكب زحل", "المدار", "الكواكب"] },
{ question: "Uranus", answer: "كوكب أورانوس", options: ["كوكب أورانوس", "الشمس", "المجرة"] },
{ question: "Neptune", answer: "كوكب نبتون", options: ["كوكب نبتون", "الكواكب", "المجرة"] },
{ question: "Pluto", answer: "كوكب بلوتو", options: ["كوكب بلوتو", "الشمس", "الكواكب"] }
];

});
