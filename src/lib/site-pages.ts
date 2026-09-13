import contact from '../content/pages/contact.json';
import faq from '../content/pages/faq.json';

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqPage = {
  title: string;
  description: string;
  items: FaqItem[];
};

export type ContactPage = {
  title: string;
  description: string;
  email: string;
  note?: string;
};

export const faqPage = faq as FaqPage;
export const contactPage = contact as ContactPage;
