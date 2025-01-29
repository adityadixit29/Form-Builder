import React from 'react';
import { X } from 'lucide-react';

interface FormFieldProps {
  field: {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
    value: string;
  };
  isPreview: boolean;
  onDelete?: (id: string) => void;
  onUpdate: (id: string, value: string) => void; // Function to update field values
}

export const FormField: React.FC<FormFieldProps> = ({ field, isPreview, onDelete, onUpdate }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onUpdate(field.id, e.target.value);
  };

  const renderField = () => {
    const commonClasses =
      'w-full px-4 py-2 border rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            className={`${commonClasses} border-gray-300`}
            placeholder={`Enter ${field.label}`}
            required={field.required}
            value={field.value}
            onChange={handleOnChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            className={`${commonClasses} border-gray-300 resize-none`}
            placeholder={`Enter ${field.label}`}
            required={field.required}
            value={field.value}
            rows={4}
            onChange={handleOnChange}
          />
        );
      case 'select':
        return (
          <select
            className={`${commonClasses} border-gray-300`}
            required={field.required}
            value={field.value}
            onChange={handleOnChange}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative p-6 border border-gray-200 rounded-xl mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <label className="block mb-2 font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {!isPreview && onDelete && (
        <button
          onClick={() => onDelete(field.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
