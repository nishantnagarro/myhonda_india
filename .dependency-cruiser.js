/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-must-be-pure-typescript',
      comment: 'Domain layer must be pure TypeScript: no React, no React Native, no Axios, no data or presentation layer',
      severity: 'error',
      from: { path: '^src/features/[^/]+/domain' },
      to: {
        path: '(node_modules/react|node_modules/react-native|node_modules/axios|/data/|/presentation/)'
      }
    },
    {
      name: 'presentation-cannot-import-data-layer',
      comment: 'Presentation must depend on Domain usecases and interfaces, never on concrete Data repositories',
      severity: 'error',
      from: { path: '^src/features/[^/]+/presentation' },
      to: { path: '^src/features/[^/]+/data' }
    },
    {
      name: 'no-cross-feature-dependencies',
      comment: 'Features must be isolated modules and never import other features directly',
      severity: 'error',
      from: { path: '^src/features/([^/]+)' },
      to: {
        path: '^src/features/([^/]+)',
        pathNot: '^src/features/$1'
      }
    },
    {
      name: 'core-cannot-import-features',
      comment: 'Core framework (excluding the Services composition root) cannot import feature business logic',
      severity: 'error',
      from: {
        path: '^src/core',
        pathNot: '^src/core/services'
      },
      to: { path: '^src/features' }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json'
    }
  }
};
