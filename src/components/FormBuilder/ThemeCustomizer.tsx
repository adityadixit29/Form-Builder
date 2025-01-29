import React from 'react';

interface Theme {
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
}

interface ThemeCustomizerProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">🎨 Theme Customization</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Primary Color</label>
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) =>
              onThemeChange({ ...theme, primaryColor: e.target.value })
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Font Family</label>
          <select
            value={theme.fontFamily}
            onChange={(e) =>
              onThemeChange({ ...theme, fontFamily: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Font Size</label>
          <select
            value={theme.fontSize}
            onChange={(e) =>
              onThemeChange({ ...theme, fontSize: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};