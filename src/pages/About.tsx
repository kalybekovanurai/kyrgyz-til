import React from 'react';
import { AboutHero, Mission, Activities } from '@/src/components/about';
const About = () => {
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <AboutHero />
      <Mission />
      <Activities />
    </div>);
};
export default About;
