/**
 * Searchable Screen Directory
 *
 * Allows users to search for any app screen, feature, or action in the search bar
 * and navigate directly to it upon selection.
 */

export interface SearchableScreen {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  keywords: string[];
  route: string;
  category: "screen" | "action";
  icon: "wrench" | "user" | "compass" | "search" | "file-text" | "shield";
}

export const SEARCHABLE_SCREENS: SearchableScreen[] = [
  {
    id: "service-booking",
    title: "Book Service",
    titleHi: "सर्विस बुक करें",
    description: "Schedule a maintenance appointment at nearest dealer",
    descriptionHi: "नजदीकी डीलर पर मेंटेनेंस अपॉइंटमेंट शेड्यूल करें",
    keywords: [
      "service",
      "book",
      "booking",
      "maintenance",
      "repair",
      "oil change",
      "appointment",
      "सर्विस",
      "मरम्मत",
    ],
    route: "/(tabs)/service",
    category: "action",
    icon: "wrench",
  },
  {
    id: "user-profile",
    title: "My Profile & Language",
    titleHi: "मेरी प्रोफाइल और भाषा",
    description: "Manage account, switch language (English / हिन्दी), settings",
    descriptionHi: "खाता प्रबंधित करें, भाषा बदलें (English / हिन्दी)",
    keywords: [
      "profile",
      "account",
      "language",
      "hindi",
      "english",
      "settings",
      "user",
      "भाषा",
      "प्रोफाइल",
      "खाता",
    ],
    route: "/(tabs)/profile",
    category: "screen",
    icon: "user",
  },
  {
    id: "explore-home",
    title: "Explore Models & Lineup",
    titleHi: "मॉडल और लाइनअप देखें",
    description:
      "Browse all Honda motorcycles, scooters, and flagship big bikes",
    descriptionHi: "होंडा के सभी मोटरसाइकिल और स्कूटर देखें",
    keywords: [
      "explore",
      "home",
      "models",
      "lineup",
      "motorcycles",
      "scooters",
      "bikes",
      "new bike",
      "एक्सप्लोर",
      "गाड़ियां",
      "मॉडल",
    ],
    route: "/(tabs)",
    category: "screen",
    icon: "compass",
  },
  {
    id: "owner-manual",
    title: "Digital Owner Manual",
    titleHi: "डिजिटल ओनर मैन्युअल",
    description:
      "Vehicle specifications, maintenance schedules, and user guides",
    descriptionHi: "वाहन स्पेसिफिकेशन, मेंटेनेंस शेड्यूल और यूजर गाइड",
    keywords: [
      "manual",
      "guide",
      "handbook",
      "maintenance guide",
      "specs",
      "मैन्युअल",
      "किताब",
    ],
    route: "/(tabs)/service",
    category: "screen",
    icon: "file-text",
  },
  {
    id: "roadside-assistance",
    title: "Roadside Assistance & Support",
    titleHi: "रोडसाइड असिस्टेंस और सहायता",
    description: "24x7 emergency roadside breakdown and towing support",
    descriptionHi: "24x7 इमरजेंसी ब्रेकडाउन और सहायता",
    keywords: [
      "support",
      "emergency",
      "breakdown",
      "rsa",
      "towing",
      "help",
      "roadside",
      "मदद",
      "सहायता",
    ],
    route: "/(tabs)/service",
    category: "action",
    icon: "shield",
  },
];

/**
 * Searches the screen registry by matching query across title, description, and keywords
 */
export function searchAppScreens(query: string): SearchableScreen[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  return SEARCHABLE_SCREENS.filter((screen) => {
    return (
      screen.title.toLowerCase().includes(trimmed) ||
      screen.titleHi.toLowerCase().includes(trimmed) ||
      screen.description.toLowerCase().includes(trimmed) ||
      screen.descriptionHi.toLowerCase().includes(trimmed) ||
      screen.keywords.some((kw) => kw.toLowerCase().includes(trimmed))
    );
  });
}
