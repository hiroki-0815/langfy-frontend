import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // HomePage
      headline_part1: "Looking for a",
      headline_part2: "language partner",
      headline_question1: "??",
      headline_question2: "Want to improve",
      headline_question3: "your speaking skills",
      headline_question4: "??",
      
      benefits: {
        find_partner: "You can easily find your language partner",
        chat_with_them: "Have a chat with them",
        casual_conversation: "You can have casual conversation with them because they are not tutors"
      },

      thoughts_section: {
        title: "Have you ever thought about these?",
        thought1: "I'm taking Japanese classes from tutors but the classes are boring and I want more casual conversation.",
        thought2: "I'm looking for a language partner on a language exchange app, but it's a pain to message random people."
      },

      langfy_benefits: {
        title: "If you have thought about these, Langfy is for you!",
        reasoning_title: "Because",
        no_messaging: "You don't have to send a message to people for a call.",
        free_usage: "Everything you can do on this platform is free."
      },

      // NoChatSelected Component
      findLanguagePartner: "Find a Language Partner",
      selectConversation: "Select a conversation from the sidebar to start chatting",

      // User Profile Form
      detailsTitle: "Details",
      detailsDescription: "Enter the details about yourself",
      nameLabel: "Name",
      genderLabel: "Gender",
      genderPlaceholder: "Select your gender (optional)",
      ageLabel: "Age",
      agePlaceholder: "Enter your age",
      emailLabel: "Email",
      cityLabel: "City",
      cityPlaceholder: "Enter your city",
      countryLabel: "Country",
      countryPlaceholder: "Enter your country",
      originCountryLabel: "Origin Country",
      originCountryPlaceholder: "Select your origin country",
      nativeLanguageLabel: "Native Language",
      nativeLanguagePlaceholder: "Select your native language",
      learningLanguageLabel: "Learning Language",
      learningLanguagePlaceholder: "Select your learning language",
      fluencyLabel: "Fluency",
      fluencyPlaceholder: "Select your fluency level",
      motivationLabel: "Motivation",
      motivationPlaceholder: "Select your motivation",
      selfIntroductionLabel: "Self Introduction",
      selfIntroductionPlaceholder: "Introduce yourself...",
      submitButton: "Submit",

      // ImageSection
      Image:"Image",
      ImageFescription: "Add an image that will be displayed on the search results. Adding a new image will overwrite the existing one.",

      // Enums Translations
      genders: {
        male: "Male",
        female: "Female",
      },
      originCountries: {
        Japan: "Japan",
        "The United States": "United States",
        Canada: "Canada",
        "United Kingdom": "United Kingdom",
        India: "India",
        Germany: "Germany",
        France: "France",
        Australia: "Australia",
        China: "China",
        Brazil: "Brazil",
        Spain:"Spain"
      },
      languages: {
        English: "English",
        Japanese: "Japanese",
        Chinese: "Chinese",
        Spanish: "Spanish",
        French: "French",
      },
      fluencyLevels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
      motivations: {
        "wanna chat": "Wanna Chat",
        "wanna call": "Wanna Call",
      },

      // Search Langugae Partner Page
      resetFilters: "Reset Filters",
      noUsersFound: "No users found.",

      // LanguageFilterSidebar
      filterByLanguage: "Filter By Your Target Language!",

      ageMinLabel: "Minimum Age",
      ageMaxLabel: "Maximum Age",
      ageMinPlaceholder: "Min Age",
      ageMaxPlaceholder: "Max Age",

      chat: "Chat",
      speaks: "Speaks",
      learning: "Learning",
      motivation: "Motivation",
      from: "From",
      lives: "Lives",
      showMore: "Show More",
      showLess: "Show Less",
      noSelfIntroduction: "No self-introduction provided.",
      
      // ProMainVideoPage && MainVideoPage
      videoCallMessage: "To start the video call, please turn on your camera and microphone.",

      // LanguageTimer
      timeToSpeak: "Time to speak:",
      setButton: "Set",
      setInfo: "Set {{currentSet}} of {{selectedSets}}",
      resume: "Resume",
      pause: "Pause",
      start: "Start",
      pickLanguages: "Pick Languages & Time",
      firstLanguage: "First language:",
      switchLanguage: "Language to switch:",
      duration: "Duration (minutes):",
      sets: "Sets:",
      close: "Close"
    },
  },
  ja: {
    translation: {
      // Homepage
      headline_part1: "言語パートナーを",
      headline_part2: "探していませんか？",
      headline_question1: "",
      headline_question2: "もっと気軽に",
      headline_question3: "会話できる相手がいたら",
      headline_question4: "嬉しくないですか？",

      benefits: {
        find_partner: "あなたに合った言語パートナーが簡単に見つかります。",
        chat_with_them: "気軽に会話を楽しみながら、自然に学べます。",
        casual_conversation: "相手は先生ではないので、リラックスして話せます。"
      },

      thoughts_section: {
        title: "こんなことを考えたことはありませんか？",
        thought1: "先生のレッスンを受けているけれど、もっと気軽な会話がしたい。",
        thought2: "言語交換アプリでパートナーを探しているけど、メッセージのやり取りが面倒…。すぐに話せる相手がいたらいいのに！"
      },

      langfy_benefits: {
        title: "そんなあなたにぴったりなのが Langfy です！",
        reasoning_title: "その理由は…",
        no_messaging: "メッセージのやり取りなしで、すぐに通話できます。",
        free_usage: "このプラットフォームの機能はすべて無料で使えます。"
      },

      // NoChatSelected Component
      findLanguagePartner: "言語パートナーを見つける",
      selectConversation: "サイドバーから会話を選択してチャットを開始",

      // User Profile Form
      detailsTitle: "詳細",
      detailsDescription: "詳細を入力",
      nameLabel: "名前",
      genderLabel: "性別",
      genderPlaceholder: "性別を選択（任意）",
      ageLabel: "年齢",
      agePlaceholder: "年齢を入力",
      emailLabel: "メールアドレス",
      cityLabel: "市区町村",
      cityPlaceholder: "住んでいる地域を入力",
      countryLabel: "住んでいる国",
      countryPlaceholder: "住んでいる国を入力",
      originCountryLabel: "出身国",
      originCountryPlaceholder: "出身国を選択",
      nativeLanguageLabel: "母国語",
      nativeLanguagePlaceholder: "母国語を選択",
      learningLanguageLabel: "学習言語",
      learningLanguagePlaceholder: "学習する言語を選択",
      fluencyLabel: "レベル",
      fluencyPlaceholder: "レベルを選択",
      motivationLabel: "学習目的",
      motivationPlaceholder: "目的を選択",
      selfIntroductionLabel: "自己紹介",
      selfIntroductionPlaceholder: "自己紹介を入力...",
      submitButton: "送信",

      Image:"画像",
      ImageFescription: "検索結果に表示される画像を追加します。新しい画像を追加すると、既存のものが上書きされます。",


      // Enums Translations
      genders: {
        male: "男性",
        female: "女性",
      },
      originCountries: {
        Japan: "日本",
        "The United States": "アメリカ合衆国",
        Canada: "カナダ",
        "United Kingdom": "イギリス",
        India: "インド",
        Germany: "ドイツ",
        France: "フランス",
        Australia: "オーストラリア",
        China: "中国",
        Brazil: "ブラジル",
        Spain:"スペイン"
      },
      languages: {
        English: "英語",
        Japanese: "日本語",
        Chinese: "中国語",
        Spanish: "スペイン語",
        French: "フランス語",
      },
      fluencyLevels: {
        beginner: "初心者",
        intermediate: "中級者",
        advanced: "上級者",
      },
      motivations: {
        "wanna chat": "チャットしたい",
        "wanna call": "通話したい",
      },

      // Search Langugae Partner Page
      resetFilters: "リセット",
      noUsersFound: "該当ユーザーなし。",

      // LanguageFilterSidebar
      filterByLanguage: "学習言語でフィルター",

      ageMinLabel: "最小年齢",
      ageMaxLabel: "最大年齢",
      ageMinPlaceholder: "最小年齢を入力",
      ageMaxPlaceholder: "最大年齢を入力",

      // search page
      chat: "チャット",
      speaks: "話せる言語",
      learning: "学習言語",
      motivation: "学習目的",
      from: "出身",
      lives: "居住地",
      showMore: "もっと見る",
      showLess: "閉じる",
      noSelfIntroduction: "自己紹介がありません。",
      
      // ProMainVideoPage && MainVideoPage
      videoCallMessage: "ビデオ通話を開始するには、カメラとマイクをオンにしてください。",
            
      // LanguageTimer
      timeToSpeak: "話す言語:",
      setButton: "設定",
      setInfo: "セット {{currentSet}} / {{selectedSets}}",
      resume: "再開",
      pause: "一時停止",
      start: "開始",
      pickLanguages: "言語と時間を選択",
      firstLanguage: "第一言語:",
      switchLanguage: "切り替える言語:",
      duration: "時間（分）:",
      sets: "セット数:",
      close: "閉じる"
    },
    
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;