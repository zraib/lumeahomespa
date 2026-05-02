import React from 'react';
import { Check } from 'lucide-react';

type Step = { id: number; label: string; desc: string };

export default function StepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, idx) => (
        <React.Fragment key={`step-${step.id}`}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.id < currentStep
                  ? 'bg-primary text-white'
                  : step.id === currentStep
                  ? 'bg-accent text-white ring-4 ring-primary/20' :'bg-muted text-muted-foreground'
              }`}
            >
              {step.id < currentStep ? <Check size={16} /> : step.id}
            </div>
            <p
              className={`text-xs font-semibold mt-2 ${
                step.id === currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block">{step.desc}</p>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`h-px flex-1 mx-3 mb-6 transition-all duration-300 ${
                step.id < currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}