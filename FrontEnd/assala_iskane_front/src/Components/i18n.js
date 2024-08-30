// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          heroTitle: 'Assala Iskane',
          heroSubtitle: 'Leading Construction and Building in Morocco',
          aboutUsTitle: 'About Us',
          aboutUsContent: 'Assala Iskane was founded to meet the needs of the Moroccan market in the field of construction and building...',
          projectsTitle: 'Our Projects',
          project: 'Project',
          contactUsTitle: 'Contact Us',
          contactUsContent: 'For more information or inquiries, please don\'t hesitate to contact us by phone or email.',
        }
      },
      ar: {
        translation: {
          heroTitle: 'أصالة إسكان',
          heroSubtitle: 'رائدة في مجال البناء والتشييد بالمغرب',
          aboutUsTitle: 'عن شركتنا',
          aboutUsContent: 'تأسست شركة أصالة إسكان لتلبية احتياجات السوق المغربي في مجال البناء والتشييد...',
          projectsTitle: 'معرض مشاريعنا',
          project: 'مشروع',
          contactUsTitle: 'تواصل معنا',
          contactUsContent: 'لمزيد من المعلومات أو الاستفسارات، لا تتردد في الاتصال بنا عبر الهاتف أو البريد الإلكتروني.',
        }
      },
      fr: {
        translation: {
          heroTitle: 'Assala Iskane',
          heroSubtitle: 'Leader de la Construction au Maroc',
          aboutUsTitle: 'À Propos de Nous',
          aboutUsContent: 'Assala Iskane a été fondée pour répondre aux besoins du marché marocain dans le domaine de la construction...',
          projectsTitle: 'Nos Projets',
          project: 'Projet',
          contactUsTitle: 'Contactez-nous',
          contactUsContent: 'Pour plus d\'informations ou des questions, n\'hésitez pas à nous contacter par téléphone ou par email.',
        }
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
