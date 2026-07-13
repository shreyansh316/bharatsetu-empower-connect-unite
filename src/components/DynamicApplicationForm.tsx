import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Phase 7: Standardized JSON schema for form definitions
export type FieldType = 'text' | 'number' | 'email' | 'aadhaar' | 'pan';

export interface FormFieldSchema {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

export interface DynamicFormProps {
  schemeId: string;
  fields: FormFieldSchema[];
  onSubmitSuccess: (data: any) => void;
}

// Helper to generate a Zod schema dynamically from our JSON definition
const generateZodSchema = (fields: FormFieldSchema[]) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  fields.forEach(field => {
    let validator: z.ZodString = z.string();
    
    if (field.required) {
      validator = validator.min(1, { message: `${field.label} is required` });
    }

    if (field.type === 'email') {
      validator = validator.email({ message: 'Invalid email address' });
    } else if (field.type === 'aadhaar') {
      // Basic 12 digit Aadhaar validation
      validator = validator.regex(/^\d{12}$/, { message: 'Aadhaar must be exactly 12 digits' });
    } else if (field.type === 'pan') {
      // Basic PAN validation (5 letters, 4 numbers, 1 letter)
      validator = validator.regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'Invalid PAN Card format' });
    }

    schemaShape[field.id] = field.required ? validator : validator.optional();
  });

  return z.object(schemaShape);
};

export const DynamicApplicationForm: React.FC<DynamicFormProps> = ({ schemeId, fields, onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate the strict Zod schema on the fly
  const dynamicSchema = generateZodSchema(fields);
  type FormData = z.infer<typeof dynamicSchema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('[Native Form Engine] Encrypting and submitting payload:', data);
    
    // Simulate network delay and encryption payload generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSuccess(true);
    onSubmitSuccess(data);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-bs-green/10 border border-bs-green/30 rounded-2xl glass animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-bs-green mb-4" />
        <h3 className="text-xl font-bold text-white mb-2 font-vernacular">Application Submitted!</h3>
        <p className="text-white/70 text-center text-sm">
          Your native application payload has been securely encrypted and transmitted. 
          Tracking ID: <span className="font-mono text-bs-saffron font-bold">BHRT-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-white/80">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={field.id}
              control={control}
              render={({ field: controllerField }) => (
                <div className="relative">
                  <Input
                    {...controllerField}
                    id={field.id}
                    type={field.type === 'number' ? 'number' : 'text'}
                    placeholder={field.placeholder}
                    className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-bs-saffron"
                    // Real-time input formatting can be added here
                    onChange={(e) => {
                      let val = e.target.value;
                      if (field.type === 'pan') val = val.toUpperCase();
                      controllerField.onChange(val);
                    }}
                  />
                  {errors[field.id] && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-max bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {errors[field.id]?.message as string}
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
            {errors[field.id] && (
              <p className="text-red-400 text-xs mt-1 block sm:hidden">
                {errors[field.id]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-bs-navy to-bs-green hover:opacity-90 text-white rounded-xl py-6"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
              Processing Application...
            </div>
          ) : (
            'Securely Submit Application'
          )}
        </Button>
      </div>
    </form>
  );
};
