module.exports = {
  locales: ['en', 'es'],
  sourceLocale: 'en',
  catalogs: [
    {
      exclude: ['**/node_modules/**', '**/dist/**'],
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src/app', 'src/components', 'src/lib'],
    },
  ],
  format: 'po',
}
