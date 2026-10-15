
'use strict';

const translations = {
  en: {
    brandHome: 'Azizsaad.com — home',
    navigation: 'Primary navigation',

    navAbout: 'About',
    navContact: 'Contact',

    eyebrow: 'PERSONAL WEBSITE',

    firstName: 'Abdulaziz',
    lastName: 'Saad',

    heroIntro: 'Business & Technology',
    readMore: 'About me',

    portraitAlt: 'Portrait image',
    portraitCaption: 'ABDULAZIZ SAAD',
    portraitSite: 'PERSONAL SITE',

    aboutLabel: 'ABOUT',
    aboutHeading: 'About me',

    aboutText:
      'My background is in digital transformation and project management, with broader interests in business development, strategic partnerships, and investment opportunities.',

    contactLabel: 'CONTACT',
    contactHeading: 'Get in touch',

    contactText:
      'For professional inquiries and opportunities:',

    emailLabel: 'EMAIL ADDRESS',

    copyEmail: 'Copy',
    copyEmailTitle: 'Copy email address',
    copied: 'Copied!',

    copySuccess:
      'Email address copied to clipboard.',

    copyError:
      'Unable to copy automatically. You can select the email address above.',

    sendEmail: 'Send email',

    linkedin: 'LinkedIn',

    linkedinAria:
      'Abdulaziz Saad on LinkedIn (opens in a new tab)',

    footerName: 'Abdulaziz Saad',
    footerTagline: 'Business & Technology',

    pageTitle:
      'Abdulaziz Saad | Business & Technology',

    description:
      'Abdulaziz Saad — Business & Technology. Digital transformation, project management, business development, strategic partnerships, and investment opportunities.',

    ogDescription:
      'Digital transformation and project management, with interests in business development, strategic partnerships, and investment opportunities.'
  },

  ar: {
    brandHome: 'عبدالعزيز سعد — الصفحة الرئيسية',
    navigation: 'التنقل الرئيسي',

    navAbout: 'نبذة عني',
    navContact: 'التواصل',

    eyebrow: 'الموقع الشخصي',

    firstName: 'عبدالعزيز',
    lastName: 'سعد',

    heroIntro: 'الأعمال والتقنية',
    readMore: 'المزيد عني',

    portraitAlt: 'صورة شخصية',
    portraitCaption: 'عبدالعزيز سعد',
    portraitSite: 'موقع شخصي',

    aboutLabel: 'نبذة عني',
    aboutHeading: 'نبذة عني',

    aboutText:
      'تمتد خبرتي المهنية في مجالي التحول الرقمي وإدارة المشاريع، مع اهتمامات أوسع في تطوير الأعمال، والشراكات الاستراتيجية، والفرص الاستثمارية.',

    contactLabel: 'التواصل',
    contactHeading: 'تواصل معي',

    contactText:
      'للتواصل المهني وفرص التعاون:',

    emailLabel: 'البريد الإلكتروني',

    copyEmail: 'نسخ',
    copyEmailTitle: 'نسخ البريد الإلكتروني',
    copied: 'تم النسخ!',

    copySuccess:
      'تم نسخ البريد الإلكتروني.',

    copyError:
      'تعذر النسخ تلقائيًا. يمكنك تحديد عنوان البريد الإلكتروني أعلاه ونسخه.',

    sendEmail: 'إرسال بريد',

    linkedin: 'لينكدإن',

    linkedinAria:
      'صفحة عبدالعزيز سعد على لينكدإن (تفتح في تبويب جديد)',

    footerName: 'عبدالعزيز سعد',
    footerTagline: 'الأعمال والتقنية',

    pageTitle:
      'عبدالعزيز سعد | الأعمال والتقنية',

    description:
      'الموقع الشخصي لعبدالعزيز سعد. التحول الرقمي وإدارة المشاريع وتطوير الأعمال والشراكات الاستراتيجية والفرص الاستثمارية.',

    ogDescription:
      'خبرة مهنية في التحول الرقمي وإدارة المشاريع، واهتمام بتطوير الأعمال والشراكات الاستراتيجية والفرص الاستثمارية.'
  }
};


// -----------------------------------
// LANGUAGE SWITCHING
// -----------------------------------

let currentLanguage = 'en';
let copyFeedbackTimeout;

function updateLanguage(language) {
  currentLanguage = language === 'ar' ? 'ar' : 'en';

  const t = translations[currentLanguage];

  // Language and text direction
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === 'ar' ? 'rtl' : 'ltr';

  // Translate all visible elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = t[element.dataset.i18n];

    if (value !== undefined) {
      element.textContent = value;
    }
  });

  // Translate accessibility labels
  document.querySelectorAll('[data-aria-key]').forEach(element => {
    const value = t[element.dataset.ariaKey];

    if (value !== undefined) {
      element.setAttribute('aria-label', value);
    }
  });

  // Translate image descriptions
  document.querySelectorAll('[data-alt-key]').forEach(element => {
    const value = t[element.dataset.altKey];

    if (value !== undefined) {
      element.alt = value;
    }
  });

  // Translate button tooltips
  document.querySelectorAll('[data-title-key]').forEach(element => {
    const value = t[element.dataset.titleKey];

    if (value !== undefined) {
      element.title = value;
    }
  });

  // Update active language buttons
  document.querySelectorAll('[data-language]').forEach(button => {
    const active =
      button.dataset.language === currentLanguage;

    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  // Update page title and descriptions
  document.title = t.pageTitle;

  const description = document.querySelector(
    'meta[name="description"]'
  );

  const ogTitle = document.querySelector(
    'meta[property="og:title"]'
  );

  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );

  if (description) {
    description.content = t.description;
  }

  if (ogTitle) {
    ogTitle.content = t.pageTitle;
  }

  if (ogDescription) {
    ogDescription.content = t.ogDescription;
  }

  // Clear old copy notifications
  const status = document.getElementById('copy-status');

  if (status) {
    status.textContent = '';
  }

  if (copyFeedbackTimeout) {
    clearTimeout(copyFeedbackTimeout);
  }

  // Remember selected language
  try {
    localStorage.setItem(
      'preferredLanguage',
      currentLanguage
    );
  } catch (_) {
    // Storage may be unavailable.
  }
}


// -----------------------------------
// COPY EMAIL
// -----------------------------------

async function copyEmail() {
  const email = 'a@azizsaad.com';

  const status = document.getElementById('copy-status');

  const label = document.querySelector(
    '#copy-email [data-i18n="copyEmail"]'
  );

  const t = translations[currentLanguage];

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);

    } else {
      // Fallback for browsers without Clipboard API
      const temporary = document.createElement('textarea');

      temporary.value = email;
      temporary.setAttribute('readonly', '');

      temporary.style.position = 'fixed';
      temporary.style.opacity = '0';

      document.body.appendChild(temporary);
      temporary.select();

      const copied = document.execCommand('copy');

      temporary.remove();

      if (!copied) {
        throw new Error('Copy command failed');
      }
    }

    if (status) {
      status.textContent = t.copySuccess;
    }

    if (label) {
      label.textContent = t.copied;
    }

  } catch (_) {
    if (status) {
      status.textContent = t.copyError;
    }
  }

  if (copyFeedbackTimeout) {
    clearTimeout(copyFeedbackTimeout);
  }

  copyFeedbackTimeout = setTimeout(() => {
    if (label) {
      label.textContent =
        translations[currentLanguage].copyEmail;
    }
  }, 2000);
}


// -----------------------------------
// EVENT LISTENERS
// -----------------------------------

// English / Arabic buttons
document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    updateLanguage(button.dataset.language);
  });
});

// Copy email button
document
  .getElementById('copy-email')
  ?.addEventListener('click', copyEmail);

// Dynamic footer year
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}


// -----------------------------------
// INITIAL LANGUAGE
// -----------------------------------

let initialLanguage = 'en';

try {
  initialLanguage =
    localStorage.getItem('preferredLanguage') || 'en';
} catch (_) {
  // Default to English.
}

updateLanguage(initialLanguage);
