import { Language } from '../types';

export interface Translations {
  // Common Header & Branding
  govtName: string;
  deptName: string;
  appName: string;
  appSubtitle: string;
  helpline: string;
  roleFarmer: string;
  roleFpo: string;
  roleBuyer: string;
  roleOfficer: string;
  signIn: string;
  signOut: string;
  signedOutTitle: string;
  signedOutDesc: string;
  demoMode: string;
  demoSwitchRole: string;

  // Navigation
  navPrices: string;
  navForecast: string;
  navAdvisor: string;
  navLots: string;
  navCreateLot: string;
  navOffers: string;
  navTransactions: string;
  navLogistics: string;
  navOfficerKyc: string;
  navOfficerDisputes: string;
  navOfficerAnalytics: string;
  navAboutData: string;

  // Price Explorer
  priceBoardTitle: string;
  priceBoardDesc: string;
  selectDistrict: string;
  selectCrop: string;
  allDistricts: string;
  allCrops: string;
  mandi: string;
  commodity: string;
  arrivals: string;
  minPrice: string;
  modalPrice: string;
  maxPrice: string;
  mspBenchmark: string;
  change24h: string;
  lastUpdated: string;
  sourceAgmarknet: string;
  exportCsv: string;
  compareMandis: string;
  viewMap: string;
  viewChart: string;
  history30d: string;
  history90d: string;
  history365d: string;
  weatherAdvisory: string;

  // Forecast & Advisor
  forecastTitle: string;
  forecastDesc: string;
  p10Label: string;
  p50Label: string;
  p90Label: string;
  backtestAccuracy: string;
  advisorTitle: string;
  advisorDesc: string;
  inputQuantity: string;
  inputStorageType: string;
  storageNone: string;
  storageHome: string;
  storageCold: string;
  inputCashNeeded: string;
  inputDaysNeeded: string;
  calculateAdvice: string;
  verdictSellNow: string;
  verdictSellLater: string;
  verdictStorePart: string;
  expectedNetGain: string;
  costBreakdown: string;
  storageCost: string;
  shrinkageCost: string;
  financeCost: string;
  listenVerdict: string;
  voiceQuerySim: string;

  // Lot Creation & QR
  createLotTitle: string;
  voiceLotTitle: string;
  voiceLotDesc: string;
  formLotTitle: string;
  cropVariety: string;
  gradeScheme: string;
  gradeA: string;
  gradeB: string;
  gradeC: string;
  harvestDate: string;
  moistureContent: string;
  askingPrice: string;
  capturePhoto: string;
  publishLot: string;
  lotCertificateTitle: string;
  qrScanVerify: string;
  digitalSignature: string;
  tamperEvidentSeal: string;
  publicVerifyNotice: string;

  // Buyer Matching & Offers
  matchedBuyersTitle: string;
  buyerTrustScore: string;
  newBuyerBadge: string;
  onTimePayment: string;
  qualityAcceptance: string;
  disputeFree: string;
  sendOffer: string;
  receivedOffers: string;
  acceptOffer: string;
  counterOffer: string;
  declineOffer: string;

  // Transaction & Escrow
  transactionWorkflow: string;
  escrowStatus: string;
  escrowLocked: string;
  pickupScheduled: string;
  inTransit: string;
  delivered: string;
  qualityConfirmed: string;
  paymentReleased: string;
  downloadInvoice: string;
  raiseDispute: string;
  disputeReason: string;
  disputeEvidence: string;
  submitDispute: string;
  settleDispute: string;

  // Officer Console
  kycQueueTitle: string;
  pendingApprovals: string;
  approve: string;
  reject: string;
  districtAnalytics: string;
  pipelineHealth: string;
  liveHeartbeat: string;
}

export const translations: Record<Language, Translations> = {
  mr: {
    govtName: 'महाराष्ट्र शासन · Maharashtra State Innovation Society',
    deptName: 'कौशल्य, रोजगार, उद्योजकता व नाविन्यता विभाग',
    appName: 'मंडी सेतू',
    appSubtitle: 'शेतकरी बाजारपेठ व थेट भाव माहिती प्रणाली',
    helpline: 'शेतकरी साहाय्यता कक्ष: 1800-120-8040 (टोल-फ्री)',
    roleFarmer: 'शेतकरी',
    roleFpo: 'FPO व्यवस्थापक',
    roleBuyer: 'नोंदणीकृत खरेदीदार',
    roleOfficer: 'शासकीय अधिकारी',
    signIn: 'प्रवेश करा (लॉगिन)',
    signOut: 'बाहेर पडा (लॉगआउट)',
    signedOutTitle: 'आपण यशस्वीरीत्या बाहेर पडला आहात',
    signedOutDesc: 'आपले सत्र सुरक्षितपणे संपुष्टात आले आहे. गोपनीयतेसाठी ब्राऊझर बंद करा.',
    demoMode: 'डेमो मोड सक्रिय',
    demoSwitchRole: 'भूमिका बदला:',

    navPrices: 'बाजारभाव फलक',
    navForecast: 'भाव अंदाज (७-२१ दिवस)',
    navAdvisor: 'विक्री सल्लागार (सेल / स्टोअर)',
    navLots: 'माझा शेतमाल (लॉट्स)',
    navCreateLot: 'नवीन लॉट नोंदवा',
    navOffers: 'खरेदीदार ऑफर्स',
    navTransactions: 'व्यवहार व हमी रक्कम (एस्क्रो)',
    navLogistics: 'गोदामे व वाहतूक',
    navOfficerKyc: 'KYC पडताळणी',
    navOfficerDisputes: 'तक्रार निवारण कक्ष',
    navOfficerAnalytics: 'जिल्हा निहाय विश्लेषण',
    navAboutData: 'माहिती स्त्रोत व पारदर्शकता',

    priceBoardTitle: 'थेट कृषी उत्पन्न बाजार समिती भाव',
    priceBoardDesc: 'महाराष्ट्रभरातील प्रमुख बाजार समित्यांचे आजचे अधिकृत सौदे व आवक (AGMARKNET संचलित)',
    selectDistrict: 'जिल्हा निवडा',
    selectCrop: 'शेतमाल निवडा',
    allDistricts: 'सर्व जिल्हे',
    allCrops: 'सर्व शेतमाल',
    mandi: 'बाजार समिती',
    commodity: 'शेतमाल',
    arrivals: 'आजची आवक',
    minPrice: 'किमान भाव',
    modalPrice: 'सरासरी भाव',
    maxPrice: 'कमाल भाव',
    mspBenchmark: 'हमीभाव (MSP)',
    change24h: '२४ तासांतील बदल',
    lastUpdated: 'शेवटचे अद्यतन',
    sourceAgmarknet: 'स्त्रोत: AGMARKNET व e-NAM अधिकृत डेटा',
    exportCsv: 'डेटा डाउनलोड करा',
    compareMandis: 'बाजार समित्यांची तुलना',
    viewMap: 'नकाशा दृश्य',
    viewChart: 'भाव चढ-उतार तक्ता',
    history30d: '३० दिवस',
    history90d: '९० दिवस',
    history365d: '१ वर्ष',
    weatherAdvisory: 'हवामान अंदाज व कृषी सल्ला',

    forecastTitle: '७ ते २१ दिवसांचा संभाव्य भाव कल',
    forecastDesc: 'ऐतिहासिक आवक, सण आणि हवामान घटकांवर आधारित LightGBM क्वांटाइल मॉडेल',
    p10Label: 'किमान अंदाज (P10 सुरक्षित)',
    p50Label: 'अपेक्षित सरासरी (P50)',
    p90Label: 'कमाल तेजी (P90)',
    backtestAccuracy: 'मागील ९० दिवसांची मॉडेल अचूकता (MAPE: ६.२%, कव्हरेज: ८४%)',
    advisorTitle: 'विक्री सल्लागार — आता विकावे की साठवून ठेवावे?',
    advisorDesc: 'साठवणूक खर्च, मालाची घट व तातडीची पैशांची गरज लक्षात घेऊन शास्त्रीय निर्णय',
    inputQuantity: 'एकूण माल (क्विंटल):',
    inputStorageType: 'साठवणुकीची सोय:',
    storageNone: 'साठवणूक नाही (तातडीने विक्री)',
    storageHome: 'घरगुती चाळ / कांदा चाळ (कमी खर्च, मध्यम घट)',
    storageCold: 'शीतगृह / आधुनिक वेअरहाऊस (हमी सुरक्षित, भाडे लागू)',
    inputCashNeeded: 'तातडीने किती पैशांची गरज आहे? (₹):',
    inputDaysNeeded: 'किती दिवसांत हवेत?:',
    calculateAdvice: 'सल्ला मिळवा',
    verdictSellNow: 'आता विक्री करा',
    verdictSellLater: 'काही दिवस साठवून ठेवा व नंतर विका',
    verdictStorePart: 'विभागून विक्री करा (गरजेपुरती आता + उर्वरित साठवा)',
    expectedNetGain: 'अपेक्षित निव्वळ नफा:',
    costBreakdown: 'खर्चाचा तपशील:',
    storageCost: 'गोदाम भाडे खर्च',
    shrinkageCost: 'वजन घट नुकसान',
    financeCost: 'पैशांच्या विलंबाचा खर्च',
    listenVerdict: 'सल्ला आवाजात ऐका (मराठीत)',
    voiceQuerySim: 'उदा. "मला ३ दिवसांत ४०,००० रुपयांची गरज आहे"',

    createLotTitle: 'प्रमाणित शेतमाल लॉट नोंदणी',
    voiceLotTitle: 'व्हॉईस रेकॉर्डिंगने नोंदवा (मराठी बोला)',
    voiceLotDesc: 'माईक दाबा आणि बोला: "५० क्विंटल कांदा, ग्रेड ए, काल काढणी केली"',
    formLotTitle: 'फॉर्म द्वारे तपशीलवार नोंदणी',
    cropVariety: 'वाण / जात:',
    gradeScheme: 'गुणवत्ता वर्ग (Grading):',
    gradeA: 'ग्रेड A (उत्कृष्ट, एकसमान आकार, निर्यातक्षम)',
    gradeB: 'ग्रेड B (मध्यम, घरगुती वापरासाठी)',
    gradeC: 'ग्रेड C (लहान आकार / प्रक्रिया योग्य)',
    harvestDate: 'काढणीची तारीख:',
    moistureContent: 'आर्द्रता (ओलावा %):',
    askingPrice: 'अपेक्षित भाव (₹/क्विंटल):',
    capturePhoto: 'जिओ-टॅग फोटो जोडा (पुरावा):',
    publishLot: 'लॉट प्रसिद्ध करा व QR प्रमाणपत्र मिळवा',
    lotCertificateTitle: 'डिजिटल सत्यता प्रमाणपत्र (Lot Certificate)',
    qrScanVerify: 'खरेदीदारासाठी स्कॅन योग्य QR कोड',
    digitalSignature: 'महाराष्ट्र शासन Ed25519 डिजिटल स्वाक्षरी',
    tamperEvidentSeal: 'अखंड सत्यता शिक्का (Tamper-Evident)',
    publicVerifyNotice: 'हे प्रमाणपत्र /verify पोर्टलवर सर्वसामान्यांसाठी पडताळणीयोग्य आहे.',

    matchedBuyersTitle: 'लॉटशी जुळणारे पडताळलेले खरेदीदार',
    buyerTrustScore: 'विश्वासार्हता निर्देशांक (Trust Score)',
    newBuyerBadge: 'नवीन खरेदीदार (New Buyer)',
    onTimePayment: 'वेळेवर पैसे भरणा प्रमाण',
    qualityAcceptance: 'माल स्वीकार प्रमाण',
    disputeFree: 'तक्रार विरहीत व्यवहार',
    sendOffer: 'खरेदी ऑफर पाठवा',
    receivedOffers: 'प्राप्त झालेल्या ऑफर्स',
    acceptOffer: 'ऑफर स्वीकारा',
    counterOffer: 'प्रति-ऑफर द्या',
    declineOffer: 'नाकारा',

    transactionWorkflow: '८-टप्प्यांची सुरक्षित व्यवहार साखळी',
    escrowStatus: 'सुरक्षित एस्क्रो ठेव (Escrow)',
    escrowLocked: 'खरेदीदाराचे पैसे शासकीय एस्क्रोमध्ये जमा',
    pickupScheduled: 'वाहतूक व शेतातून माल उचल नियोजित',
    inTransit: 'माल मार्गावर आहे',
    delivered: 'मालाची पोहोच पावती झाली',
    qualityConfirmed: 'गुणवत्ता पडताळणी पूर्ण',
    paymentReleased: 'शेतकऱ्याच्या खात्यात पैसे जमा!',
    downloadInvoice: 'अधिकृत कर पावती (Tax Invoice) डाउनलोड करा',
    raiseDispute: 'तक्रार नोंदवा (Dispute)',
    disputeReason: 'तक्रारीचे कारण:',
    disputeEvidence: 'फोटो व पुरावे:',
    submitDispute: 'तक्रार दाखल करा',
    settleDispute: 'अधिकारी निकाल द्या',

    kycQueueTitle: 'खरेदीदार व FPO केवायसी पडताळणी कक्ष',
    pendingApprovals: 'प्रलंबित अर्ज',
    approve: 'मंजूर करा',
    reject: 'नाकारा',
    districtAnalytics: 'जिल्हास्तरीय शेती व्यापार विश्लेषण',
    pipelineHealth: 'डेटा पाइपलाइन आरोग्य स्थिती (APIs)',
    liveHeartbeat: 'सक्रिय व अविरत सुरू'
  },

  hi: {
    govtName: 'महाराष्ट्र शासन · Maharashtra State Innovation Society',
    deptName: 'कौशल्य, रोजगार, उद्यमिता एवं नवाचार विभाग',
    appName: 'मंडी सेतू',
    appSubtitle: 'किसान बाजार आसूचना एवं प्रत्यक्ष सौदा मंच',
    helpline: 'किसान सहायता हेल्पलाइन: 1800-120-8040 (टोल-फ्री)',
    roleFarmer: 'किसान',
    roleFpo: 'FPO प्रबंधक',
    roleBuyer: 'सत्यापित खरीदार',
    roleOfficer: 'शासकीय अधिकारी',
    signIn: 'प्रवेश करें (लॉगिन)',
    signOut: 'लॉगआउट करें',
    signedOutTitle: 'आप सफलतापूर्वक लॉगआउट हो चुके हैं',
    signedOutDesc: 'आपका सत्र सुरक्षित रूप से समाप्त हो गया है। गोपनीयता हेतु ब्राउज़र बंद करें।',
    demoMode: 'डेमो मोड सक्रिय',
    demoSwitchRole: 'भूमिका बदलें:',

    navPrices: 'मंडी भाव बोर्ड',
    navForecast: 'भाव पूर्वानुमान (7-21 दिन)',
    navAdvisor: 'बिक्री सलाहकार (सेल / स्टोर)',
    navLots: 'मेरी उपज (लॉट्स)',
    navCreateLot: 'नया लॉट बनाएं',
    navOffers: 'प्राप्त ऑफर्स',
    navTransactions: 'लेनदेन व एस्क्रो खाता',
    navLogistics: 'शीतगृह एवं परिवहन',
    navOfficerKyc: 'KYC सत्यापन',
    navOfficerDisputes: 'विवाद समाधान केंद्र',
    navOfficerAnalytics: 'जिलावार विश्लेषण',
    navAboutData: 'डेटा स्रोत व पारदर्शिता',

    priceBoardTitle: 'लाइव कृषि उपज मंडी भाव',
    priceBoardDesc: 'महाराष्ट्र के प्रमुख एपीएमसी बाजारों के दैनिक आधिकारिक भाव व आवक',
    selectDistrict: 'जिला चुनें',
    selectCrop: 'फसल चुनें',
    allDistricts: 'सभी जिले',
    allCrops: 'सभी फसलें',
    mandi: 'मंडी (APMC)',
    commodity: 'फसल',
    arrivals: 'आज की आवक',
    minPrice: 'न्यूनतम भाव',
    modalPrice: 'मॉडल भाव',
    maxPrice: 'अधिकतम भाव',
    mspBenchmark: 'एमएसपी (MSP)',
    change24h: '24 घंटे में बदलाव',
    lastUpdated: 'अंतिम अपडेट',
    sourceAgmarknet: 'स्रोत: AGMARKNET एवं e-NAM आधिकारिक पोर्टल',
    exportCsv: 'डेटा डाउनलोड करें',
    compareMandis: 'मंडियों की तुलना करें',
    viewMap: 'मानचित्र देखें',
    viewChart: 'भाव रुझान चार्ट',
    history30d: '30 दिन',
    history90d: '90 दिन',
    history365d: '1 वर्ष',
    weatherAdvisory: 'मौसम पूर्वानुमान व कृषि परामर्श',

    forecastTitle: '7 से 21 दिनों का मूल्य पूर्वानुमान',
    forecastDesc: 'क्वांटाइल रिग्रेशन (LightGBM) आधारित P10/P50/P90 पूर्वानुमान बैंड्स',
    p10Label: 'न्यूनतम सुरक्षित (P10)',
    p50Label: 'अपेक्षित औसत (P50)',
    p90Label: 'उच्चतम रुझान (P90)',
    backtestAccuracy: 'पिछले 90 दिनों की बैकटेस्ट सटीकता (MAPE: 6.2%, कवरेज: 84%)',
    advisorTitle: 'बिक्री सलाहकार — अभी बेचें या भंडारित करें?',
    advisorDesc: 'भंडारण लागत, नमी ह्रास और नकदी की तात्कालिक आवश्यकता पर आधारित अनुकूलन',
    inputQuantity: 'कुल मात्रा (क्विंटल):',
    inputStorageType: 'भंडारण सुविधा:',
    storageNone: 'कोई भंडारण नहीं (तत्काल बिक्री)',
    storageHome: 'पारंपरिक प्याज चाली / घरेलू भंडारण',
    storageCold: 'आधुनिक शीतगृह / वेयरहाउस',
    inputCashNeeded: 'तत्काल कितने रुपयों की आवश्यकता है? (₹):',
    inputDaysNeeded: 'कितने दिनों के भीतर?:',
    calculateAdvice: 'सलाह प्राप्त करें',
    verdictSellNow: 'अभी बेचें',
    verdictSellLater: 'कुछ दिन रोकें और बाद में बेचें',
    verdictStorePart: 'आंशिक बिक्री करें (जरूरत भर अभी, बाकी भंडारित)',
    expectedNetGain: 'अपेक्षित शुद्ध लाभ:',
    costBreakdown: 'लागत विश्लेषण:',
    storageCost: 'भंडारण किराया',
    shrinkageCost: 'वजन ह्रास क्षति',
    financeCost: 'पूंजी प्रतीक्षा लागत',
    listenVerdict: 'सलाह हिंदी में सुनें',
    voiceQuerySim: 'उदा. "मुझे 3 दिन में 40,000 रुपये चाहिए"',

    createLotTitle: 'प्रमाणित कृषि लॉट निर्माण',
    voiceLotTitle: 'आवाज द्वारा दर्ज करें (हिंदी बोलें)',
    voiceLotDesc: 'माइक दबाकर बोलें: "50 क्विंटल प्याज, ग्रेड ए, कल की कटाई"',
    formLotTitle: 'फॉर्म द्वारा संपूर्ण विवरण भरें',
    cropVariety: 'किस्म / वैरायटी:',
    gradeScheme: 'गुणवत्ता ग्रेडिंग:',
    gradeA: 'ग्रेड A (उत्कृष्ट, एकसमान, निर्यात योग्य)',
    gradeB: 'ग्रेड B (मध्यम गुणवत्ता, घरेलू खपत)',
    gradeC: 'ग्रेड C (छोटा आकार / खाद्य प्रसंस्करण)',
    harvestDate: 'कटाई की तिथि:',
    moistureContent: 'नमी प्रतिशत (%):',
    askingPrice: 'अपेक्षित मूल्य (₹/क्विंटल):',
    capturePhoto: 'जियो-टैग युक्त फोटो संलग्न करें:',
    publishLot: 'लॉट प्रकाशित करें व क्यूआर प्रमाण पत्र प्राप्त करें',
    lotCertificateTitle: 'डिजिटल सत्यापन प्रमाणपत्र',
    qrScanVerify: 'खरीदारों हेतु स्कैन करने योग्य क्यूआर कोड',
    digitalSignature: 'महाराष्ट्र शासन Ed25519 डिजिटल हस्ताक्षर',
    tamperEvidentSeal: 'छेड़छाड़-रोधी मुहर (Tamper-Evident)',
    publicVerifyNotice: 'यह प्रमाणपत्र /verify पोर्टल पर सार्वजनिक रूप से सत्यापित किया जा सकता है।',

    matchedBuyersTitle: 'लॉट से मेल खाने वाले सत्यापित खरीदार',
    buyerTrustScore: 'क्रेता विश्वास स्कोर (Trust Score)',
    newBuyerBadge: 'नया खरीदार (New Buyer)',
    onTimePayment: 'समय पर भुगतान दर',
    qualityAcceptance: 'गुणवत्ता स्वीकृति दर',
    disputeFree: 'विवाद रहित लेनदेन',
    sendOffer: 'ऑफर भेजें',
    receivedOffers: 'प्राप्त ऑफर्स',
    acceptOffer: 'ऑफर स्वीकारें',
    counterOffer: 'प्रति-ऑफर प्रस्तुत करें',
    declineOffer: 'अस्वीकार करें',

    transactionWorkflow: '8-चरणीय सुरक्षित लेनदेन प्रक्रिया',
    escrowStatus: 'सुरक्षित एस्क्रो खाता',
    escrowLocked: 'क्रेता की राशि सरकारी एस्क्रो में सुरक्षित जमा',
    pickupScheduled: 'खेत से माल उठाने की तारीख निर्धारित',
    inTransit: 'माल परिवहन में है',
    delivered: 'गंतव्य पर माल सुपुर्द हुआ',
    qualityConfirmed: 'गुणवत्ता जांच सफल',
    paymentReleased: 'किसान के बैंक खाते में राशि जारी!',
    downloadInvoice: 'आधिकारिक टैक्स इनवॉइस डाउनलोड करें',
    raiseDispute: 'शिकायत दर्ज करें (Dispute)',
    disputeReason: 'शिकायत का कारण:',
    disputeEvidence: 'फोटो व साक्ष्य:',
    submitDispute: 'शिकायत प्रस्तुत करें',
    settleDispute: 'अधिकारी निर्णय दें',

    kycQueueTitle: 'क्रेता एवं FPO केवाईसी सत्यापन पटल',
    pendingApprovals: 'लंबित आवेदन',
    approve: 'स्वीकृत करें',
    reject: 'अस्वीकृत करें',
    districtAnalytics: 'जिलावार कृषि व्यापार विश्लेषण',
    pipelineHealth: 'डेटा पाइपलाइन स्वास्थ्य स्थिति',
    liveHeartbeat: 'सक्रिय एवं सामान्य'
  },

  en: {
    govtName: 'Government of Maharashtra · Maharashtra State Innovation Society',
    deptName: 'Department of Skills, Employment, Entrepreneurship & Innovation',
    appName: 'MandiSetu',
    appSubtitle: 'Market Intelligence & Direct Transaction Platform for Farmers',
    helpline: 'Farmer Support Helpline: 1800-120-8040 (Toll-Free)',
    roleFarmer: 'Farmer',
    roleFpo: 'FPO Manager',
    roleBuyer: 'Verified Buyer',
    roleOfficer: 'Department Officer',
    signIn: 'Sign In (Login)',
    signOut: 'Sign Out (Logout)',
    signedOutTitle: 'You have been signed out',
    signedOutDesc: 'Your session has ended securely. Please close your browser to safeguard your privacy.',
    demoMode: 'Demo Environment Active',
    demoSwitchRole: 'Switch Demo Persona:',

    navPrices: 'Price Board',
    navForecast: 'Price Outlook (7-21d)',
    navAdvisor: 'Sell-vs-Store Advisor',
    navLots: 'My Produce Lots',
    navCreateLot: 'Create Graded Lot',
    navOffers: 'Buyer Offers',
    navTransactions: 'Escrow Transactions',
    navLogistics: 'Storage & Transport',
    navOfficerKyc: 'KYC Review Desk',
    navOfficerDisputes: 'Dispute Mediation',
    navOfficerAnalytics: 'District Analytics',
    navAboutData: 'Data Sources & Quality',

    priceBoardTitle: 'Live APMC Mandi Price Board',
    priceBoardDesc: 'Official modal rates and arrival volumes across Maharashtra regulated markets (AGMARKNET powered)',
    selectDistrict: 'Select District',
    selectCrop: 'Select Commodity',
    allDistricts: 'All Districts',
    allCrops: 'All Commodities',
    mandi: 'Mandi (APMC)',
    commodity: 'Commodity',
    arrivals: 'Daily Arrivals',
    minPrice: 'Min Price',
    modalPrice: 'Modal Price',
    maxPrice: 'Max Price',
    mspBenchmark: 'Govt MSP',
    change24h: '24h Trend',
    lastUpdated: 'Last Updated',
    sourceAgmarknet: 'Source: AGMARKNET & e-NAM official records',
    exportCsv: 'Export CSV',
    compareMandis: 'Compare Mandis',
    viewMap: 'Geographic Map',
    viewChart: 'Price Trend Chart',
    history30d: '30 Days',
    history90d: '90 Days',
    history365d: '1 Year',
    weatherAdvisory: 'Taluka Weather & Agro-Advisory',

    forecastTitle: '7–21 Day Price Outlook with Quantile Bands',
    forecastDesc: 'LightGBM model calibrated on lagged arrivals, seasonal trends, festival shifts and weather',
    p10Label: 'Conservative Bound (P10 Safe)',
    p50Label: 'Expected Median (P50)',
    p90Label: 'Optimistic Bound (P90)',
    backtestAccuracy: '90-Day Walk-Forward Backtest (MAPE: 6.2%, Interval Coverage: 84%)',
    advisorTitle: 'Sell-Window Advisor: Sell Now or Store?',
    advisorDesc: 'Expected-value optimization considering warehouse rent, moisture shrink, and urgent cash needs',
    inputQuantity: 'Total Lot Quantity (Quintals):',
    inputStorageType: 'Storage Infrastructure:',
    storageNone: 'No Storage (Immediate Sale)',
    storageHome: 'Traditional Ventilated Chawl (Low Cost, Medium Shrink)',
    storageCold: 'Modern Cold Storage / Warehouse (Safe, Rent Applicable)',
    inputCashNeeded: 'Urgent cash requirement? (₹):',
    inputDaysNeeded: 'Needed within (days):',
    calculateAdvice: 'Compute Optimal Strategy',
    verdictSellNow: 'Sell Now at Current Price',
    verdictSellLater: 'Store and Sell at Expected Peak',
    verdictStorePart: 'Split Sale (Cover Urgent Cash Now, Store Balance)',
    expectedNetGain: 'Expected Net Gain:',
    costBreakdown: 'Cost Breakdown:',
    storageCost: 'Warehouse Storage Rent',
    shrinkageCost: 'Moisture Shrink Loss',
    financeCost: 'Cost of Waiting (Finance Rate)',
    listenVerdict: 'Read Aloud in Marathi/Hindi',
    voiceQuerySim: 'e.g. "I need ₹40,000 in 3 days"',

    createLotTitle: 'Standardized Agricultural Lot Creation',
    voiceLotTitle: 'Voice Input (Marathi / Hindi / English)',
    voiceLotDesc: 'Tap microphone and speak: "50 quintal onion, Grade A, harvested yesterday"',
    formLotTitle: 'Structured Agmark Specifications',
    cropVariety: 'Variety / Cultivar:',
    gradeScheme: 'Grade Scheme:',
    gradeA: 'Grade A (Uniform size, sound bulbs, export grade)',
    gradeB: 'Grade B (Medium size, domestic wholesale)',
    gradeC: 'Grade C (Small size / food processing grade)',
    harvestDate: 'Harvest Date:',
    moistureContent: 'Moisture Content (%):',
    askingPrice: 'Asking Price (₹/Quintal):',
    capturePhoto: 'Attach Geotagged Field Inspection Photo:',
    publishLot: 'Publish Lot & Generate QR Certificate',
    lotCertificateTitle: 'Verifiable Digital Lot Certificate',
    qrScanVerify: 'Buyer Scannable QR Code',
    digitalSignature: 'Govt of Maharashtra Ed25519 Signature',
    tamperEvidentSeal: 'Tamper-Evident Cryptographic Seal',
    publicVerifyNotice: 'This certificate is publicly verifiable on the /verify portal by scanning the QR code.',

    matchedBuyersTitle: 'Matched KYC-Verified Institutional Buyers',
    buyerTrustScore: 'Bayesian Trust Score',
    newBuyerBadge: 'New Buyer (<5 Trades)',
    onTimePayment: 'On-time Payment Rate',
    qualityAcceptance: 'Quality Acceptance Rate',
    disputeFree: 'Dispute-Free Rate',
    sendOffer: 'Submit Binding Offer',
    receivedOffers: 'Received Procurement Offers',
    acceptOffer: 'Accept Offer',
    counterOffer: 'Submit Counter Price',
    declineOffer: 'Decline Offer',

    transactionWorkflow: '8-Stage Escrow Transaction Workflow',
    escrowStatus: 'Secure Escrow State',
    escrowLocked: 'Buyer Funds Locked in Government-Monitored Escrow',
    pickupScheduled: 'Farm-Gate Logistics Pickup Scheduled',
    inTransit: 'Produce In Transit',
    delivered: 'Delivered at Buyer Facility',
    qualityConfirmed: 'Quality Inspection Approved',
    paymentReleased: 'Payment Released to Farmer Bank Account!',
    downloadInvoice: 'Download Formal Sale Bill / Tax Invoice',
    raiseDispute: 'Raise Formal Dispute',
    disputeReason: 'Dispute Category:',
    disputeEvidence: 'Photo Evidence & Inspection Note:',
    submitDispute: 'Submit Dispute to Mediation',
    settleDispute: 'Officer / FPO Resolution',

    kycQueueTitle: 'Buyer & FPO Verification Desk',
    pendingApprovals: 'Pending Registrations',
    approve: 'Approve KYC',
    reject: 'Reject with Reason',
    districtAnalytics: 'District Agricultural Trade Metrics',
    pipelineHealth: 'Data Ingestion Health Monitor',
    liveHeartbeat: 'Healthy & Operational'
  }
};
