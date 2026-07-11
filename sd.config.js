import { formats, transformGroups } from 'style-dictionary/enums';

export default {
  // Point straight to your repository source file
  source: ['theme.tokens.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css, // Auto-slugifies names safely
      buildPath: 'project/tokens/',
      files: [
        {
          destination: 'base.css',
          format: formats.cssVariables, // Outputs native :root definitions
          options: {
            outputReferences: true, // Retains pointer mappings without flattening
          },
        },
      ],
    },
  },
};
