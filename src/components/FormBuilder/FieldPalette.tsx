import React from 'react';
import { 
  Type, 
  Mail, 
  Hash, 
  AlignLeft, 
  List 
} from 'lucide-react';

const fieldTypes = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'textarea', label: 'Text Area', icon: AlignLeft },
  { type: 'select', label: 'Dropdown', icon: List },
];

interface FieldPaletteProps {
  onDragStart: (type: string) => void;
}

export const FieldPalette: React.FC<FieldPaletteProps> = ({ onDragStart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">🚀 Form Components</h2>
      <div className="space-y-2">
        {fieldTypes.map(({ type, label, icon: Icon }) => (
          <div
            key={type}
            draggable
            onDragStart={() => onDragStart(type)}
            className="flex items-center p-3 border rounded-md cursor-move hover:bg-gray-50"
          >
            <Icon className="mr-2" size={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};