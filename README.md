# markdown-magic-transform-badges

<!-- doc-gen BADGES -->

[![npm version](https://img.shields.io/npm/v/markdown-magic-transform-badges.svg)](https://www.npmjs.com/package/markdown-magic-transform-badges) [![npm downloads](https://img.shields.io/npm/dw/markdown-magic-transform-badges.svg)](https://www.npmjs.com/package/markdown-magic-transform-badges) ![version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![actions status](https://img.shields.io/github/actions/workflow/status/ioncakephper/markdown-magic-transform-badges/ci.yml?branch=main)](https://github.com/ioncakephper/markdown-magic-transform-badges/actions) [![codecov](https://img.shields.io/codecov/c/github/ioncakephper/markdown-magic-transform-badges?branch=main)](https://codecov.io/gh/ioncakephper/markdown-magic-transform-badges) [![release](https://img.shields.io/github/v/release/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/releases) [![maintained](https://img.shields.io/github/commit-activity/y/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/graphs/commit-activity) [![stars](https://img.shields.io/github/stars/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/stargazers) [![forks](https://img.shields.io/github/forks/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/network/members) [![watchers](https://img.shields.io/github/watchers/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/watchers) [![last commit](https://img.shields.io/github/last-commit/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/commits) [![contributors](https://img.shields.io/github/contributors/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/graphs/contributors) [![issues](https://img.shields.io/github/issues/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/issues) [![pull requests](https://img.shields.io/github/issues-pr/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/pulls) [![repo size](https://img.shields.io/github/repo-size/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges) [![top language](https://img.shields.io/github/languages/top/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges) [![languages](https://img.shields.io/github/languages/count/ioncakephper/markdown-magic-transform-badges)](https://github.com/ioncakephper/markdown-magic-transform-badges/search?l=)

<!-- end-doc-gen -->

## Badges generated (when applicable)

- `npmVersion`: npm package version
- `npmDownloads`: npm downloads (weekly)
- `version`: package.json version (custom badge)
- `license`: package license
- `actions`: GitHub Actions workflow status (uses `ciWorkflow` and `ciBranch` options or package.json fields, defaults to `ci.yml` and `main`)
- `codecov`: codecov coverage badge (branch: main)
- `release`: latest GitHub release
- `maintained`: commit-activity (yearly)
- `stars`: GitHub stars
- `forks`: GitHub forks
- `watchers`: GitHub watchers
- `lastCommit`: last commit date
- `contributors`: contributors count
- `issues`: open issues
- `pulls`: open PRs
- `repoSize`: repository size
- `topLanguage`: top language in repo
- `languages`: count of languages

## Options (via doc-gen block or markdown-magic settings)

- `style`: shields.io style (e.g. 'flat', 'flat-square', 'for-the-badge', 'plastic')
  Applies to shields.io badges. Internally a `style` query is appended
  as `?style=...` or `&style=...` if the badge URL already contains query params.
- `collapse`: boolean (default false). If true, less-important badges are
  hidden inside a GitHub <details> block.
- `collapseLabel`: string (default 'More badges') — label used for the
  <summary> when collapsing.
- `collapseVisible`: number (default 3) — how many badges are shown
  before collapsing the rest.
- `ciWorkflow`: string (optional) — GitHub Actions workflow file name. Uses value from options or package.json, defaults to 'ci.yml'.
- `ciBranch`: string (optional) — GitHub Actions branch name. Uses value from options or package.json, defaults to 'main'.

Example usage in README.md:

```html
<!-- your-doc-gen-block BADGES style=for-the-badge collapse=true collapseLabel="More metrics" collapseVisible=4 ciWorkflow="build.yml" ciBranch="develop" -->
<!-- end-your-doc-gen-block -->
```

Notes:

- Repository parsing supports both string and { url } forms in package.json
  (e.g. "git+https://github.com/owner/repo.git" or { "type": "git", "url": "..." }).
- The `actions` badge uses the workflow file and branch specified by the `ciWorkflow` and `ciBranch` options or package.json fields, falling back to `ci.yml` and `main` if not provided.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for details on how to raise issues, propose changes, and submit pull requests. In short:

- Open issues for bugs or feature requests with clear reproduction steps.
- For code contributions, fork the repo, create a branch, add tests, and open a PR against `main`.

## License

This project is licensed under the terms of the MIT License. See the [`LICENSE`](LICENSE) file for details.

## Helper Scripts

<!-- doc-gen SCRIPTS format=list groupBy=category -->

### documentation

- `docs` — Generate documentation by processing README.md with markdown-magic. (line [12](./package.json#L12))

  ```bash
  npx markdown-magic README.md --config ./markdown-magic.config.js
  ```

### precommit

- `fix` — Automatically fix linting issues and format codebase. (line [7](./package.json#L7))

  ```bash
  npm run lint:fix && npm run format && npm run format:package
  ```

- `format` — Format all project files using Prettier. (line [8](./package.json#L8))

  ```bash
  prettier --write .
  ```

- `format:package` — Format the package.json file using Prettier. (line [9](./package.json#L9))

  ```bash
  prettier --write package.json
  ```

- `lint:fix` — Lint all project files and automatically fix issues where possible. (line [11](./package.json#L11))

  ```bash
  eslint . --ext .js,.json,.yaml,.yml,.md --fix
  ```

- `prep` — Prepare the project for publishing by generating docs and formatting code. (line [13](./package.json#L13))

  ```bash
  npm run docs && npm run fix
  ```

### verification

- `lint` — Lint all project files to ensure code quality and consistency. (line [10](./package.json#L10))

  ```bash
  eslint . --ext .js,.json,.yaml,.yml,.md
  ```

- `test` — Run the test suite using Jest. (line [6](./package.json#L6))

  ```bash
  jest passWithNoTests
  ```

  <!-- end-doc-gen -->

## Repository Structure

<!-- doc-gen fileTree -->

```
└── markdown-magic-transform-badges/
    ├── .pretierrc.json
    ├── CHANGELOG.md
    ├── CONTRIBUTING.md
    ├── eslint.config.mjs
    ├── index.js
    ├── LICENSE
    ├── markdown-magic.config.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── RULES_OF_CONDUCT.md
```

<!-- end-doc-gen -->
