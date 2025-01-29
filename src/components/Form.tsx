import React, { useState } from 'react';
import { FieldPalette } from './FormBuilder/FieldPalette';
import { FormField } from './FormBuilder/FormField';
import { ThemeCustomizer } from './FormBuilder/ThemeCustomizer';
import { Settings, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  value: string
}

interface Theme {
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
}

function Form() {
  const [fields, setFields] = useState<Field[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#3b82f6',
    fontFamily: 'sans-serif',
    fontSize: 'medium',
  });
  const handleUpdateField = (id: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };
  console.log(fields)
  const handleDragStart = (type: string) => {
    const newField: Field = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase()}${type.slice(1)} Field`,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
      value: '',
    };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const getFontSize = () => {
    switch (theme.fontSize) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  };
  const handleAddField = () => {
    toast.success("The data saved successfully!")
    setFields([])
  }
  return (
    <div
      style={{
        '--primary-color': theme.primaryColor,
        fontFamily: theme.fontFamily,
        fontSize: getFontSize(),
      } as React.CSSProperties}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🚀 Form Builder</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50"
            >
              {isPreview ? (
                <>
                  <Settings size={20} />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Preview Mode
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {!isPreview && (
            <div className="col-span-3 space-y-8">
              <FieldPalette onDragStart={handleDragStart} />
              <ThemeCustomizer theme={theme} onThemeChange={setTheme} />
            </div>
          )}
          
          <div className={`${isPreview ? 'col-span-12' : 'col-span-9'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={(e) => e.preventDefault()}>
                {fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    isPreview={isPreview}
                    onUpdate = {handleUpdateField}
                    onDelete={handleDeleteField}
                  />
                ))}
                {fields.length > 0 && (
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white rounded-md"
                    style={{ backgroundColor: theme.primaryColor }}
                    onClick={() => handleAddField()}
                  >
                    Submit
                  </button>
                )}
                {fields.length === 0 && !isPreview && (
                  <div className="text-center py-8 text-gray-500">
                    Drag and drop components from the left panel to build your form
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;