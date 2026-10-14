(() => {
  'use strict';
  const translations = {
    en: {
      pageTitle: 'Abdulaziz Saad | Personal Website',
      pageDescription: 'The personal website of Abdulaziz Saad. A brief introduction and contact information.',
      navigation: 'Primary navigation',
      navAbout: 'About', navContact: 'Contact',
      eyebrow: 'PERSONAL WEBSITE',
      name: 'Abdulaziz<br>Saad<span class="period">.</span>',
      heroIntro: 'A brief introduction and a simple way to stay in touch.',
      readMore: 'A little about me',
      portraitAlt: 'Portrait placeholder for Abdulaziz Saad. Replace this image with a personal photograph.',
      portraitCaption: 'ABDULAZIZ SAAD', portraitSite: 'PERSONAL SITE',
      aboutLabel: 'ABOUT', aboutHeading: 'A little about me<span class="gold-period">.</span>',
      aboutText: 'My professional background is in digital transformation and project management. My interests also extend to business development, marketing analysis, and approaches that support sustainable growth.',
      contactLabel: 'CONTACT', contactHeading: 'Get in touch<span class="gold-period">.</span>',
      contactText: 'For professional correspondence or general inquiries, you can reach me directly by email.',
      emailLabel: 'EMAIL ADDRESS', copyEmail: 'Copy', copiedEmail: 'Copied', copiedStatus: 'Email address copied.',
      sendEmail: 'Send email', footerName: 'Abdulaziz Saad', footerText: 'Personal website · Azizsaad.com'
    },
    ar: {
      pageTitle: 'عبدالعزيز سعد | الموقع الشخصي',
      pageDescription: 'الموقع الشخصي لعبدالعزيز سعد، ويضم نبذة مختصرة وبيانات التواصل.',
      navigation: 'التنقل الرئيسي',
      navAbout: 'نبذة عني', navContact: 'التواصل',
      eyebrow: 'الموقع الشخصي',
      name: 'عبدالعزيز سعد<span class="period">.</span>',
      heroIntro: 'نبذة مختصرة ووسيلة سهلة للتواصل.',
      readMore: 'تعرّف عليّ',
      portraitAlt: 'صورة رمزية مؤقتة لعبدالعزيز سعد، تُستبدل بالصورة الشخصية.',
      portraitCaption: 'عبدالعزيز سعد', portraitSite: 'الموقع الشخصي',
      aboutLabel: 'نبذة عني', aboutHeading: 'نبذة عني<span class="gold-period">.</span>',
      aboutText: 'تتمحور خلفيتي المهنية حول التحول الرقمي وإدارة المشاريع. وتمتد اهتماماتي إلى تطوير الأعمال والتحليل التسويقي، والأساليب التي تدعم النمو المستدام.',
      contactLabel: 'التواصل', contactHeading: 'للتواصل<span class="gold-period">.</span>',
      contactText: 'للمراسلات المهنية أو الاستفسارات العامة، يمكنكم التواصل معي مباشرة عبر البريد الإلكتروني.',
      emailLabel: 'البريد الإلكتروني', copyEmail: 'نسخ', copiedEmail: 'تم النسخ', copiedStatus: 'تم نسخ عنوان البريد الإلكتروني.',
      sendEmail: 'إرسال بريد', footerName: 'عبدالعزيز سعد', footerText: 'الموقع الشخصي · Azizsaad.com'
    }
  };
  const elements = [...document.querySelectorAll('[data-i18n]')];
  const langButtons = [...document.querySelectorAll('[data-language]')];
  const copyButton = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  let lang = 'en';

  function applyLanguage(next, updateUrl = true) {
    if (!translations[next]) return;
    lang = next;
    const copy = translations[next];
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').content = copy.pageDescription;
    document.querySelector('meta[property="og:title"]').content = copy.pageTitle;
    document.querySelector('meta[property="og:description"]').content = copy.pageDescription;
    document.querySelector('.main-nav').setAttribute('aria-label', copy.navigation);
    for (const element of elements) {
      const key = element.dataset.i18n;
      if (key === 'name' || key === 'aboutHeading' || key === 'contactHeading') {
        element.innerHTML = copy[key]; // Only trusted, fixed strings from this local file.
      } else {
        element.textContent = copy[key];
      }
    }
    for (const element of document.querySelectorAll('[data-alt-key]')) {
      element.alt = copy[element.dataset.altKey];
    }
    for (const element of document.querySelectorAll('[data-title-key]')) {
      element.title = copy[element.dataset.titleKey];
    }
    for (const button of langButtons) {
      const active = button.dataset.language === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    status.textContent = '';
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (next === 'ar') url.searchParams.set('lang', 'ar');
      else url.searchParams.delete('lang');
      window.history.replaceState(null, '', url.toString());
    }
  }
  for (const button of langButtons) {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  }
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('a@azizsaad.com');
      status.textContent = translations[lang].copiedStatus;
      const buttonLabel = copyButton.querySelector('[data-i18n="copyEmail"]');
      buttonLabel.textContent = translations[lang].copiedEmail;
      window.setTimeout(() => { buttonLabel.textContent = translations[lang].copyEmail; }, 1600);
    } catch (_error) {
      // Clipboard access can be blocked on non-HTTPS origins. The email link still works.
      status.textContent = lang === 'ar' ? 'حدّد عنوان البريد الإلكتروني لنسخه.' : 'Select the email address to copy it.';
    }
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
  const requestedLang = new URL(window.location.href).searchParams.get('lang');
  applyLanguage(requestedLang === 'ar' ? 'ar' : 'en', false);
})();
