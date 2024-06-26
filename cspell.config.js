const vsCodeSettings = require('./.vscode/settings.json');

module.exports = {
  $schema:
    'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json',
  version: '0.2',
  language: 'en',
  words: vsCodeSettings['cSpell.words'],
  dictionaries: [
    'companies',
    'cpp',
    'en_us',
    'en-gb',
    'fonts',
    'fullstack',
    'html',
    'lorem-ipsum',
    'node',
    'npm',
    'typescript',
  ],
  ignorePaths: [
    'dist',
    'node_modules',
    'local',
    'nx.json',
    'package.json',
    'pnpm-lock.yaml',
    'tmp',
    '.vscode',
    '.gitignore',
    'cspell.config.js',
  ],
  allowCompoundWords: true,
  useGitignore: true,
  caseSensitive: true,
  includeRegExpList: [/^AIza[0-9A-Za-z-_]{35}$/],
};
