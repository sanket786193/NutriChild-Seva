import type { LanguageCode, UserRole } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  roleNames: Record<UserRole, string>;
  tabs: {
    children: string;
    addRecord: string;
    nutrition: string;
    vaccines: string;
    schemes: string;
    centers: string;
    community: string;
    plateScanner: string;
  };
  labels: {
    healthy: string;
    moderateRisk: string;
    highRisk: string;
    criticalSam: string;
    speakScreen: string;
    offlineMode: string;
    onlineMode: string;
    syncNow: string;
    emergencyCall: string;
    voiceAssistant: string;
    registerChild: string;
    growthCheckup: string;
    vaccineCard: string;
    qrCard: string;
    nutritionGuide: string;
    nearestHospital: string;
    plateAnalysis: string;
    age: string;
    weight: string;
    height: string;
    muac: string;
    hemoglobin: string;
    village: string;
    anganwadi: string;
  };
  voicePrompts: {
    welcome: string;
    healthyChild: string;
    samAlert: string;
    mamAlert: string;
    vaccineDueAlert: string;
    recordingSaved: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  hi: {
    appName: 'न्यूट्रीचाइल्ड+',
    tagline: 'बाल पोषण और स्वास्थ्य सुरक्षा प्रणाली',
    roleNames: {
      PARENT: 'माता-पिता (Parent)',
      ASHA: 'आशा कार्यकर्ता (ASHA)',
      ANGANWADI: 'आंगनवाड़ी सेविका (AWW)',
      DOCTOR: 'चिकित्सक (Doctor)',
      GOVT_OFFICER: 'स्वास्थ्य अधिकारी (CDPO)',
      ADMIN: 'प्रशासक (Admin)'
    },
    tabs: {
      children: 'बच्चे (Children)',
      addRecord: 'पंजीकरण (Register)',
      nutrition: 'पोषण सलाह (Nutrition)',
      vaccines: 'टीकाकरण (Vaccines)',
      schemes: 'सरकारी योजनाएं (Schemes)',
      centers: 'नजदीकी अस्पताल (Centers)',
      community: 'सामुदायिक रिपोर्ट (Dashboard)',
      plateScanner: 'थाली स्कैनर (Food Plate)'
    },
    labels: {
      healthy: 'स्वस्थ (सामान्य)',
      moderateRisk: 'मध्यम जोखिम (MAM)',
      highRisk: 'गंभीर जोखिम (SAM)',
      criticalSam: 'अति गंभीर (तुरंत अस्पताल ले जाएं)',
      speakScreen: 'स्क्रीन सुनें',
      offlineMode: 'ऑफ़लाइन मोड (डेटा सहेजा गया)',
      onlineMode: 'ऑनलाइन (इंटरनेट कनेक्टेड)',
      syncNow: 'डेटा सिंक करें',
      emergencyCall: 'आपातकालीन कॉल (108 / 102)',
      voiceAssistant: 'आवाज से पूछें (AI)',
      registerChild: 'नया बच्चा जोड़ें',
      growthCheckup: 'वजन व ऊंचाई जांचें',
      vaccineCard: 'टीकाकरण कार्ड',
      qrCard: 'डिजिटल स्वास्थ्य कार्ड',
      nutritionGuide: 'पोषण भोजन योजना',
      nearestHospital: 'नजदीकी स्वास्थ्य केंद्र',
      plateAnalysis: 'भोजन थाली की जांच करें',
      age: 'उम्र',
      weight: 'वजन',
      height: 'ऊंचाई',
      muac: 'बांह का घेरा (MUAC)',
      hemoglobin: 'हीमोग्लोबिन (खून की जांच)',
      village: 'गांव',
      anganwadi: 'आंगनवाड़ी केंद्र'
    },
    voicePrompts: {
      welcome: 'न्यूट्रीचाइल्ड प्लस में आपका स्वागत है। बच्चे के स्वास्थ्य की जानकारी के लिए कार्ड पर टैप करें।',
      healthyChild: 'यह बच्चा पूर्णतः स्वस्थ है। नियमित पोषण और टीके समय पर लगवाएं।',
      samAlert: 'चेतावनी: बच्चे का वजन और बांह का घेरा बहुत कम है। कृपया तुरंत पोषण पुनर्वास केंद्र या डॉक्टर से संपर्क करें।',
      mamAlert: 'ध्यान दें: बच्चे में मध्यम कुपोषण है। आंगनवाड़ी से अतिरिक्त टेक होम राशन और घी-दाल की मात्रा बढ़ाएं।',
      vaccineDueAlert: 'बच्चे का टीका बाकी है। कृपया नजदीकी आंगनवाड़ी केंद्र में संपर्क करें।',
      recordingSaved: 'जांच सफलतापूर्वक दर्ज कर ली गई है।'
    }
  },
  or: {
    appName: 'ନ୍ୟୁଟ୍ରିଚାଇଲ୍ଡ+',
    tagline: 'ଶିଶୁ ପୋଷଣ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ସୁରକ୍ଷା ପ୍ରଣାଳୀ',
    roleNames: {
      PARENT: 'ପିତାମାତା (Parent)',
      ASHA: 'ଆଶା କର୍ମୀ (ASHA)',
      ANGANWADI: 'ଅଙ୍ଗନୱାଡ଼ି ଦିଦି (AWW)',
      DOCTOR: 'ଡାକ୍ତର ବାବୁ (Doctor)',
      GOVT_OFFICER: 'ସ୍ୱାସ୍ଥ୍ୟ ଅଧିକାରୀ (CDPO)',
      ADMIN: 'ପ୍ରଶାସକ (Admin)'
    },
    tabs: {
      children: 'ଶିଶୁ ତାଲିକା',
      addRecord: 'ନୂଆ ପଞ୍ଜୀକରଣ',
      nutrition: 'ପୁଷ୍ଟିକର ଖାଦ୍ୟ',
      vaccines: 'ଟୀକାକରଣ',
      schemes: 'ସରକାରୀ ଯୋଜନା',
      centers: 'ନିକଟସ୍ଥ ଡାକ୍ତରଖାନା',
      community: 'ଗ୍ରାମ ରିପୋର୍ଟ',
      plateScanner: 'ଖାଦ୍ୟ ଥାଳି ଯାଞ୍ଚ'
    },
    labels: {
      healthy: 'ସୁସ୍ଥ',
      moderateRisk: 'ମଧ୍ୟମ ବିପଦ',
      highRisk: 'ଗୁରୁତର ଅପପୁଷ୍ଟି',
      criticalSam: 'ତୁରନ୍ତ ଡାକ୍ତରଖାନା ନିଅନ୍ତୁ',
      speakScreen: 'ଶୁଣନ୍ତୁ',
      offlineMode: 'ଅଫଲାଇନ୍ ମୋଡ୍',
      onlineMode: 'ଅନଲାଇନ୍',
      syncNow: 'ସିଙ୍କ କରନ୍ତୁ',
      emergencyCall: 'ଜରୁରୀକାଳୀନ କଲ୍ (108)',
      voiceAssistant: 'କଥା କହି ପଚାରନ୍ତୁ',
      registerChild: 'ଶିଶୁ ପଞ୍ଜୀକରଣ',
      growthCheckup: 'ଓଜନ ଓ ଉଚ୍ଚତା ମାପ',
      vaccineCard: 'ଟୀକା କାର୍ଡ',
      qrCard: 'ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ',
      nutritionGuide: 'ପୋଷଣ ଯୋଜନା',
      nearestHospital: 'ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର',
      plateAnalysis: 'ଥାଳି ପରୀକ୍ଷା',
      age: 'ବୟସ',
      weight: 'ଓଜନ',
      height: 'ଉଚ୍ଚତା',
      muac: 'ବାହୁ ମାପ',
      hemoglobin: 'ରକ୍ତ ପରୀକ୍ଷା',
      village: 'ଗାଁ',
      anganwadi: 'ଅଙ୍ଗନୱାଡ଼ି'
    },
    voicePrompts: {
      welcome: 'ନ୍ୟୁଟ୍ରିଚାଇଲ୍ଡ ପ୍ଲସକୁ ସ୍ୱାଗତ । ଆପଣଙ୍କ ଶିଶୁର ସ୍ୱାସ୍ଥ୍ୟ ଦେଖିବାକୁ ଟାପ୍ କରନ୍ତୁ ।',
      healthyChild: 'ଶିଶୁଟି ସମ୍ପୂର୍ଣ୍ଣ ସୁସ୍ଥ ଅଛି । ସମୟ ଅନୁସାରେ ଟୀକା ଦିଅନ୍ତୁ ।',
      samAlert: 'ସତର୍କତା: ଶିଶୁର ଅପପୁଷ୍ଟି ଗୁରୁତର ଅଛି । ତୁରନ୍ତ ଏନ୍ ଆର୍ ସି କେନ୍ଦ୍ରକୁ ନିଅନ୍ତୁ ।',
      mamAlert: 'ଶିଶୁକୁ ଅଣ୍ଡା, ମାଣ୍ଡିଆ ଜାଉ ଏବଂ ଡାଲି ଅଧିକ ଖୁଆନ୍ତୁ ।',
      vaccineDueAlert: 'ଟୀକା ନେବା ବାକି ଅଛି ।',
      recordingSaved: 'ତଥ୍ୟ ସଫଳତାର ସହ ସାଇତା ଗଲା ।'
    }
  },
  mr: {
    appName: 'न्युट्रीचाईल्ड+',
    tagline: 'बाल पोषण व आरोग्य संवर्धन प्रणाली',
    roleNames: {
      PARENT: 'पालक (Parent)',
      ASHA: 'आशा सेविका (ASHA)',
      ANGANWADI: 'अंगणवाडी ताई (AWW)',
      DOCTOR: 'वैद्यकीय अधिकारी (Doctor)',
      GOVT_OFFICER: 'आरोग्य अधिकारी (CDPO)',
      ADMIN: 'प्रशासक (Admin)'
    },
    tabs: {
      children: 'मुले (Children)',
      addRecord: 'नोंदणी (Register)',
      nutrition: 'पोषण आहार',
      vaccines: 'लसीकरण (Vaccines)',
      schemes: 'शासकीय योजना',
      centers: 'आरोग्य केंद्र',
      community: 'डॅशबोर्ड',
      plateScanner: 'ताट तपासणी'
    },
    labels: {
      healthy: 'निरोगी (सामान्य)',
      moderateRisk: 'मध्यम कुपोषण (MAM)',
      highRisk: 'तीव्र कुपोषण (SAM)',
      criticalSam: 'तातडीने रुग्णालयात न्या',
      speakScreen: 'ऐका',
      offlineMode: 'ऑफलाईन मोड',
      onlineMode: 'ऑनलाईन',
      syncNow: 'सिंक करा',
      emergencyCall: 'आपत्कालीन कॉल (108)',
      voiceAssistant: 'आवाजाने विचारा',
      registerChild: 'नवीन बालक जोडा',
      growthCheckup: 'वजन व उंची तपासा',
      vaccineCard: 'लसीकरण कार्ड',
      qrCard: 'आरोग्य कार्ड',
      nutritionGuide: 'पोषण योजना',
      nearestHospital: 'जवळचे आरोग्य केंद्र',
      plateAnalysis: 'आहार तपासणी',
      age: 'वय',
      weight: 'वजन',
      height: 'उंची',
      muac: 'दंड घेर',
      hemoglobin: 'रक्त प्रमाण',
      village: 'गाव',
      anganwadi: 'अंगणवाडी'
    },
    voicePrompts: {
      welcome: 'न्युट्रीचाईल्ड प्लस मध्ये आपले स्वागत आहे.',
      healthyChild: 'बाळ पूर्णपणे निरोगी आहे. वेळेवर लस द्या.',
      samAlert: 'सावधान: बाळ तीव्र कुपोषित आहे. त्वरित डॉक्टरांना दाखवा.',
      mamAlert: 'बाळाला नाचणी, डाळ, अंडी व शेवग्याची पाने खायला द्या.',
      vaccineDueAlert: 'लस देण्याची वेळ झाली आहे.',
      recordingSaved: 'माहिती जतन केली आहे.'
    }
  },
  en: {
    appName: 'NutriChild+',
    tagline: 'AI Child Nutrition & Health Monitoring System',
    roleNames: {
      PARENT: 'Parent / Mother',
      ASHA: 'ASHA Health Worker',
      ANGANWADI: 'Anganwadi Worker (AWW)',
      DOCTOR: 'Medical Officer / Doctor',
      GOVT_OFFICER: 'Govt Health Officer (CDPO)',
      ADMIN: 'System Admin'
    },
    tabs: {
      children: 'Children Dossier',
      addRecord: 'Register Child',
      nutrition: 'Nutrition Plans',
      vaccines: 'Immunization (UIP)',
      schemes: 'Govt Schemes',
      centers: 'Health Centers (NRC)',
      community: 'Community Analytics',
      plateScanner: 'Food Plate AI'
    },
    labels: {
      healthy: 'Healthy (Normal)',
      moderateRisk: 'Moderate Risk (MAM)',
      highRisk: 'Severe Malnutrition (SAM)',
      criticalSam: 'Critical SAM (Urgent Referral)',
      speakScreen: 'Read Screen Aloud',
      offlineMode: 'Offline Mode (Local Storage)',
      onlineMode: 'Online (Connected)',
      syncNow: 'Sync Offline Data',
      emergencyCall: 'Emergency Ambulance (108 / 102)',
      voiceAssistant: 'Ask NutriVoice AI',
      registerChild: 'Register New Child',
      growthCheckup: 'Growth Checkup (Vitals)',
      vaccineCard: 'Vaccination Card',
      qrCard: 'QR Child Health Card',
      nutritionGuide: 'Personalized Nutrition Guide',
      nearestHospital: 'Nearest Clinics & NRC',
      plateAnalysis: 'Scan Food Plate with AI',
      age: 'Age',
      weight: 'Weight',
      height: 'Height',
      muac: 'MUAC Arm Tape',
      hemoglobin: 'Hemoglobin (Hb)',
      village: 'Village',
      anganwadi: 'Anganwadi Center'
    },
    voicePrompts: {
      welcome: 'Welcome to NutriChild Plus. Tap on any child card to hear their health and nutrition status.',
      healthyChild: 'This child is growing normally according to WHO standards. Continue nutritious food and timely vaccines.',
      samAlert: 'Emergency alert: Severe acute malnutrition detected. Please refer child immediately to the nearest Nutrition Rehabilitation Centre.',
      mamAlert: 'Moderate malnutrition detected. Increase protein-dense foods like ragi, eggs, dal, and collect Take-Home Rations.',
      vaccineDueAlert: 'Child has pending vaccinations. Please attend the next Anganwadi immunization session.',
      recordingSaved: 'Growth record has been saved successfully.'
    }
  },
  bn: {
    appName: 'নিউট্রিশাইল্ড+',
    tagline: 'শিশু পুষ্টি ও স্বাস্থ্য পর্যবেক্ষণ ব্যবস্থা',
    roleNames: {
      PARENT: 'অভিভাবক (Parent)',
      ASHA: 'আশা কর্মী (ASHA)',
      ANGANWADI: 'অঙ্গনওয়াড়ি দিদি (AWW)',
      DOCTOR: 'চিকিৎসক (Doctor)',
      GOVT_OFFICER: 'স্বাস্থ্য আধিকারিক (CDPO)',
      ADMIN: 'প্রশাসক (Admin)'
    },
    tabs: {
      children: 'শিশুদের তালিকা',
      addRecord: 'নিবন্ধন',
      nutrition: 'পুষ্টি খাদ্য',
      vaccines: 'টিকাকরণ',
      schemes: 'সরকারি প্রকল্প',
      centers: 'স্বাস্থ্যকেন্দ্র',
      community: 'ড্যাশবোর্ড',
      plateScanner: 'থালা স্ক্যান'
    },
    labels: {
      healthy: 'সুস্থ ও স্বাভাবিক',
      moderateRisk: 'মাঝারি ঝুঁকি (MAM)',
      highRisk: 'তীব্র অপুষ্টি (SAM)',
      criticalSam: 'অবিলম্বে হাসপাতালে নিন',
      speakScreen: 'শুনুন',
      offlineMode: 'অফলাইন মোড',
      onlineMode: 'অনলাইন',
      syncNow: 'সিঙ্ক করুন',
      emergencyCall: 'জরুরী কল (১০৮)',
      voiceAssistant: 'ভয়েস সহকারী',
      registerChild: 'শিশু যোগ করুন',
      growthCheckup: 'বৃদ্ধি পরীক্ষা',
      vaccineCard: 'টিকার কার্ড',
      qrCard: 'স্বাস্থ্য কার্ড',
      nutritionGuide: 'পুষ্টি নির্দেশিকা',
      nearestHospital: 'নিকটবর্তী কেন্দ্র',
      plateAnalysis: 'খাবার পরীক্ষা',
      age: 'বয়স',
      weight: 'ওজন',
      height: 'উচ্চতা',
      muac: 'বাহুর মাপ',
      hemoglobin: 'রক্তের মাত্রা',
      village: 'গ্রাম',
      anganwadi: 'অঙ্গনওয়াড়ি'
    },
    voicePrompts: {
      welcome: 'নিউট্রিশাইল্ড প্লাসে আপনাকে স্বাগতম।',
      healthyChild: 'শিশু সুস্থ আছে। যথাসময়ে টিকা দিন।',
      samAlert: 'সতর্কতা: শিশুর ওজন অত্যন্ত কম। অবিলম্বে হাসপাতালে দেখান।',
      mamAlert: 'শিশুকে ডাল, ডিম, শাকসবজি বেশি করে খাওয়ান।',
      vaccineDueAlert: 'টিকার সময় হয়েছে।',
      recordingSaved: 'তথ্য সফলভাবে সংরক্ষিত হয়েছে।'
    }
  },
  te: {
    appName: 'న్యూట్రిచైల్డ్+',
    tagline: 'శిశు పోషణ మరియు ఆరోగ్య పర్యవేక్షణ వ్యవస్థ',
    roleNames: {
      PARENT: 'తల్లిదండ్రులు (Parent)',
      ASHA: 'ఆశా కార్యకర్త (ASHA)',
      ANGANWADI: 'అంగన్‌వాడీ టీచర్ (AWW)',
      DOCTOR: 'వైద్యాధికారి (Doctor)',
      GOVT_OFFICER: 'ఆరోగ్యాధికారి (CDPO)',
      ADMIN: 'అడ్మినిస్ట్రేటర్ (Admin)'
    },
    tabs: {
      children: 'పిల్లల జాబితా',
      addRecord: 'నమోదు',
      nutrition: 'పోషకాహారం',
      vaccines: 'టీకాలు',
      schemes: 'ప్రభుత్వ పథకాలు',
      centers: 'ఆసుపత్రులు',
      community: 'నివేదికలు',
      plateScanner: 'ఆహార ప్లేట్ స్కాన్'
    },
    labels: {
      healthy: 'ఆరోగ్యంగా ఉన్నాడు',
      moderateRisk: 'మధ్యస్థ ప్రమాదం',
      highRisk: 'తీవ్ర పోషకాహార లోపం',
      criticalSam: 'వెంటనే ఆసుపత్రికి వెళ్లండి',
      speakScreen: 'వినండి',
      offlineMode: 'ఆఫ్‌లైన్ మోడ్',
      onlineMode: 'ఆన్‌లైన్',
      syncNow: 'సింక్ చేయండి',
      emergencyCall: 'అత్యవసర కాల్ (108)',
      voiceAssistant: 'వాయిస్ అసిస్టెంట్',
      registerChild: 'కొత్త బిడ్డను చేర్చండి',
      growthCheckup: 'ఎత్తు, బరువు పరీక్ష',
      vaccineCard: 'టీకా కార్డు',
      qrCard: 'హెల్త్ కార్డు',
      nutritionGuide: 'పోషకాహార సూచన',
      nearestHospital: 'సమీప కేంద్రం',
      plateAnalysis: 'ఆహార పరీక్ష',
      age: 'వయస్సు',
      weight: 'బరువు',
      height: 'ఎత్తు',
      muac: 'చేతి కొలత',
      hemoglobin: 'రక్త పరీక్ష',
      village: 'గ్రామం',
      anganwadi: 'అంగన్‌వాడీ'
    },
    voicePrompts: {
      welcome: 'న్యూట్రిచైల్డ్ ప్లస్ కు స్వాగతం.',
      healthyChild: 'బిడ్డ సంపూర్ణ ఆరోగ్యంగా ఉన్నాడు.',
      samAlert: 'హెచ్చరిక: బిడ్డకు తీవ్ర పోషకాహార లోపం ఉంది. వెంటనే వైద్యుడిని సంప్రదించండి.',
      mamAlert: 'రాగి జావ, పప్పు, గుడ్డు తినిపించండి.',
      vaccineDueAlert: 'టీకా వేయించాల్సిన సమయం ఆసన్నమైంది.',
      recordingSaved: 'వివరాలు నమోదయ్యాయి.'
    }
  },
  ta: {
    appName: 'நியூட்ரிசைல்ட்+',
    tagline: 'குழந்தைகள் ஊட்டச்சத்து மற்றும் சுகாதார கண்காணிப்பு அமைப்பு',
    roleNames: {
      PARENT: 'பெற்றோர் (Parent)',
      ASHA: 'ஆஷா பணியாளர் (ASHA)',
      ANGANWADI: 'அங்கன்வாடி ஊழியர் (AWW)',
      DOCTOR: 'மருத்துவர் (Doctor)',
      GOVT_OFFICER: 'சுகாதார அலுவலர் (CDPO)',
      ADMIN: 'நிர்வாகி (Admin)'
    },
    tabs: {
      children: 'குழந்தைகள் பட்டியல்',
      addRecord: 'பதிவு',
      nutrition: 'ஊட்டச்சத்து உணவு',
      vaccines: 'தடுப்பூசி',
      schemes: 'அரசு திட்டங்கள்',
      centers: 'மருத்துவமனை',
      community: 'அறிக்கை',
      plateScanner: 'உணவு தட்டு ஸ்கேன்'
    },
    labels: {
      healthy: 'ஆரோக்கியமானது',
      moderateRisk: 'மிதமான ஊட்டச்சத்துக் குறைபாடு',
      highRisk: 'கடுமையான குறைபாடு',
      criticalSam: 'உடனடியாக மருத்துவமனைக்கு செல்லவும்',
      speakScreen: 'கேளுங்கள்',
      offlineMode: 'ஆஃப்லைன் முறை',
      onlineMode: 'ஆன்லைன்',
      syncNow: 'ஒத்திசைக்கவும்',
      emergencyCall: 'அவசர அழைப்பு (108)',
      voiceAssistant: 'குரல் உதவி',
      registerChild: 'குழந்தையை பதிவு செய்',
      growthCheckup: 'எடை மற்றும் உயரம் சோதனை',
      vaccineCard: 'தடுப்பூசி அட்டை',
      qrCard: 'சுகாதார அட்டை',
      nutritionGuide: 'ஊட்டச்சத்து வழிகாட்டி',
      nearestHospital: 'அருகிலுள்ள மையம்',
      plateAnalysis: 'உணவு பகுப்பாய்வு',
      age: 'வயது',
      weight: 'எடை',
      height: 'உயரம்',
      muac: 'கை சுற்றளவு',
      hemoglobin: 'இரத்த அளவு',
      village: 'கிராமம்',
      anganwadi: 'அங்கன்வாடி'
    },
    voicePrompts: {
      welcome: 'நியூட்ரிசைல்ட் பிளஸுக்கு நல்வரவு.',
      healthyChild: 'குழந்தை நல்ல ஆரோக்கியத்துடன் உள்ளது.',
      samAlert: 'எச்சரிக்கை: குழந்தைக்கு தீவிர ஊட்டச்சத்து குறைபாடு உள்ளது.',
      mamAlert: 'கேழ்வரகு கூழ், பருப்பு மற்றும் முட்டை கொடுங்கள்.',
      vaccineDueAlert: 'தடுப்பூசி போட வேண்டிய நேரம் வந்துவிட்டது.',
      recordingSaved: 'பதிவு வெற்றிகரமாக சேமிக்கப்பட்டது.'
    }
  }
};
