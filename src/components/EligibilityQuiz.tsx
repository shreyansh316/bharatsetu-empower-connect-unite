import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

interface EligibilityQuizProps {
  schemeName: string;
  eligibilityPoints: string[];
  accentColor?: string;
  onClose: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'What is your age group?',
    options: ['Below 18', '18–25', '26–40', '41–60', 'Above 60'],
  },
  {
    question: 'What is your annual family income?',
    options: ['Below ₹1 Lakh', '₹1–3 Lakh', '₹3–5 Lakh', '₹5–10 Lakh', 'Above ₹10 Lakh'],
  },
  {
    question: 'Which category do you belong to?',
    options: ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'],
  },
];

const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({
  schemeName,
  eligibilityPoints,
  accentColor = '#60a5fa',
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  // Simulated eligibility (always eligible for demo)
  const isEligible = true;

  if (showResult) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div
          className="glass-strong rounded-3xl p-8 max-w-md w-full text-center animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Result icon */}
          <div
            className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
              isEligible ? 'bg-green-500/15' : 'bg-red-500/15'
            }`}
            style={{ boxShadow: `0 0 40px ${isEligible ? '#4ade8020' : '#f8717120'}` }}
          >
            {isEligible ? (
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            ) : (
              <XCircle className="w-10 h-10 text-red-400" />
            )}
          </div>

          <h3 className="text-white text-xl font-bold mb-2">
            {isEligible ? '🎉 You are Eligible!' : 'Not Eligible'}
          </h3>
          <p className="text-white/50 text-sm mb-6">
            {isEligible
              ? `Based on your responses, you qualify for ${schemeName}. Proceed to apply now.`
              : `You may not meet the current criteria for ${schemeName}. Check other schemes.`}
          </p>

          {/* Eligibility criteria */}
          <div className="glass rounded-xl p-4 mb-6 text-left">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Eligibility Criteria</p>
            {eligibilityPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-xs">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="ghost"
              className="flex-1 text-white/50 hover:text-white border border-white/10 hover:bg-white/10 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Retake
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-3xl p-8 max-w-md w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-xs tracking-wider uppercase">Eligibility Check</p>
          <p className="text-white/40 text-xs">
            {currentStep + 1} / {QUIZ_QUESTIONS.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
            }}
          />
        </div>

        {/* Question */}
        <h3 className="text-white text-lg font-semibold mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className="w-full glass rounded-xl p-4 text-left text-white/70 text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-200 flex items-center justify-between group"
            >
              <span>{option}</span>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-white/30 text-xs hover:text-white/60 transition-colors w-full text-center"
        >
          Skip eligibility check
        </button>
      </div>
    </div>
  );
};

export default EligibilityQuiz;
