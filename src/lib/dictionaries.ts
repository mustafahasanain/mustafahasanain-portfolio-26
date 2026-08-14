import type { Locale } from "@/lib/i18n";

export type PageKey = "home" | "projects" | "about" | "contact";

export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  shared: {
    foundationLabel: string;
    languageSwitchLabel: string;
    languageSwitchText: string;
    suggestionLabel: string;
    suggestionText: string;
    suggestionAccept: string;
    suggestionDismiss: string;
    theme: {
      dark: string;
      light: string;
      currentTheme: string;
      useTheme: string;
    };
  };
  pages: Record<
    PageKey,
    {
      title: string;
      description: string;
    }
  >;
  home: {
    demoTitle: string;
    demoDescription: string;
    technologyPrefix: string;
    technologySuffix: string;
    primary: string;
    accent: string;
    success: string;
    error: string;
  };
  notFound: {
    title: string;
    description: string;
    homeLink: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    metadata: {
      title: "Mustafa Hasanain — Web Developer",
      description:
        "Personal portfolio of Mustafa Hasanain, an independent web developer building websites, web applications, and custom business systems.",
    },
    shared: {
      foundationLabel: "Internationalization foundation",
      languageSwitchLabel: "Switch to Arabic",
      languageSwitchText: "العربية",
      suggestionLabel: "Arabic language suggestion",
      suggestionText: "Would you prefer to view this page in Arabic?",
      suggestionAccept: "View in Arabic",
      suggestionDismiss: "Not now",
      theme: {
        dark: "dark",
        light: "light",
        currentTheme: "Current theme: {current}. Switch to {next} theme",
        useTheme: "Use {theme} theme",
      },
    },
    pages: {
      home: {
        title: "Mustafa Hasanain",
        description: "English is the canonical, unprefixed experience.",
      },
      projects: {
        title: "Projects",
        description: "The localized projects experience will live here.",
      },
      about: {
        title: "About",
        description: "The localized about experience will live here.",
      },
      contact: {
        title: "Contact",
        description: "The localized contact experience will live here.",
      },
    },
    home: {
      demoTitle: "English and Arabic, by choice",
      demoDescription:
        "The requested URL always remains in control. An explicit language selection is remembered for later visits.",
      technologyPrefix: "Mixed-language names such as",
      technologySuffix: "remain readable in localized content.",
      primary: "Primary",
      accent: "Accent",
      success: "Success",
      error: "Error",
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested does not exist.",
      homeLink: "Return home",
    },
  },
  ar: {
    metadata: {
      title: "مصطفى حسنين — مطور ويب",
      description:
        "الموقع الشخصي لمصطفى حسنين، مطور ويب مستقل يبني المواقع وتطبيقات الويب وأنظمة الأعمال المخصصة.",
    },
    shared: {
      foundationLabel: "أساس تعدد اللغات",
      languageSwitchLabel: "التبديل إلى الإنجليزية",
      languageSwitchText: "English",
      suggestionLabel: "اقتراح اللغة العربية",
      suggestionText: "هل تفضل عرض هذه الصفحة باللغة العربية؟",
      suggestionAccept: "العرض بالعربية",
      suggestionDismiss: "ليس الآن",
      theme: {
        dark: "داكن",
        light: "فاتح",
        currentTheme: "المظهر الحالي: {current}. التبديل إلى المظهر {next}",
        useTheme: "استخدام المظهر {theme}",
      },
    },
    pages: {
      home: {
        title: "مصطفى حسنين",
        description: "تتوفر التجربة العربية تحت المسار ‎/ar‎ باتجاه صحيح من اليمين إلى اليسار.",
      },
      projects: {
        title: "المشاريع",
        description: "ستُعرض تجربة المشاريع المحلية هنا.",
      },
      about: {
        title: "من أنا",
        description: "ستُعرض تجربة نبذة عني المحلية هنا.",
      },
      contact: {
        title: "تواصل معي",
        description: "ستُعرض تجربة التواصل المحلية هنا.",
      },
    },
    home: {
      demoTitle: "العربية والإنجليزية، حسب اختيارك",
      demoDescription:
        "يبقى المسار الذي طلبته هو المعتمد دائماً، ويُحفظ اختيارك الصريح للغة للزيارات اللاحقة.",
      technologyPrefix: "تبقى أسماء التقنيات مثل",
      technologySuffix: "مقروءة بوضوح داخل المحتوى العربي.",
      primary: "أساسي",
      accent: "مميز",
      success: "نجاح",
      error: "خطأ",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      description: "الصفحة التي طلبتها غير موجودة.",
      homeLink: "العودة إلى الرئيسية",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
