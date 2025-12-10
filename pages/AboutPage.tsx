import React from 'react';
import { ABOUT_TEXT } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="bg-surface p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-primary text-center">{ABOUT_TEXT.title}</h1>
        <p className="text-center text-gray-600 mt-2 mb-10 text-lg">{ABOUT_TEXT.subtitle}</p>

        <div className="space-y-8">
          {ABOUT_TEXT.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-near-black mb-3 border-b-2 border-accent pb-2">{section.heading}</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="whitespace-pre-line">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;