import React from 'react';
import { Container } from '@/src/components/ui';
import { LearningHero, Lessons, Methodology } from '@/src/components/learning';
const LearningCenter = () => {
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <LearningHero />
      <Container className="py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          <Lessons />
          <Methodology />
        </div>
      </Container>
    </div>);
};
export default LearningCenter;
