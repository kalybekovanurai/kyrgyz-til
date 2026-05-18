import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { ContactInfoCards } from '@/src/components/contact/ContactInfoCards';
import { Container, SectionHeading } from '@/src/components/ui';
import { ContactForm } from '@/src/features/forms/components/ContactForm';
import { useLanguage } from '@/src/context/LanguageContext';
const Contact = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const formRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (location.hash === '#form') {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);
    return (<div className="flex min-h-screen w-full flex-col bg-slate-50">
      <section className="border-b border-gray-100 bg-white py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading title={t('nav.contact')} subtitle={t('contact.subtitle')} className="mb-0"/>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ContactInfoCards />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <ContactForm ref={formRef}/>
          </motion.div>
        </div>
      </Container>
    </div>);
};
export default Contact;
