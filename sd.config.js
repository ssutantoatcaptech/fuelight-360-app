import { formats, transformGroups } from 'style-dictionary/enums';

export default {
  // Point straight to your repository source file
  source: ['theme.tokens.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css, // Auto-slugifies names safely
      buildPath: 'src/design-system/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: formats.cssVariables, // Outputs native :root definitions
          options: {
            outputReferences: true, // Retains pointer mappings without flattening
          },
        },
      ],
    },
  },
};
