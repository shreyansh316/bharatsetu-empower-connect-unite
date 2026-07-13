import React from 'react';

interface StepItem {
  title: string;
  desc: string;
}

interface HowItWorksStepperProps {
  steps: StepItem[];
  accentColor?: string;
}

const HowItWorksStepper: React.FC<HowItWorksStepperProps> = ({ steps, accentColor = '#60a5fa' }) => {
  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-white/90 mb-8 flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          ✦
        </span>
        How It Works
      </h2>

      <div className="relative ml-4">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, ${accentColor}40, transparent)` }}
        />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex gap-5 group animate-float-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Step number circle */}
              <div
                className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${accentColor}15`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                  boxShadow: `0 0 20px ${accentColor}10`,
                }}
              >
                {i + 1}
              </div>

              {/* Content card */}
              <div className="glass rounded-2xl p-5 flex-1 group-hover:bg-white/[0.06] transition-all duration-300 cursor-default">
                <h3 className="text-white/90 font-semibold text-sm mb-1 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-colors">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksStepper;
