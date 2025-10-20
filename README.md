# markdown-magic-transform-badges

<!-- doc-gen BADGES style=for-the-badge collapse=true collapseLabel="More badges" collapseVisible=7 ciWorkflow="ci.yml" ciBranch="main" -->

[![npm version](https://img.shields.io/npm/v/markdown-magic-transform-badges.svg?style=for-the-badge)](https://www.npmjs.com/package/markdown-magic-transform-badges) [![actions status](https://img.shields.io/github/actions/workflow/status/ioncakephper/markdown-magic-transform-badges/ci.yml?branch=main&style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/actions) ![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge) [![maintained](https://img.shields.io/github/commit-activity/y/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/graphs/commit-activity) [![npm downloads](https://img.shields.io/npm/dw/markdown-magic-transform-badges.svg?style=for-the-badge)](https://www.npmjs.com/package/markdown-magic-transform-badges) ![version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge) [![codecov](https://img.shields.io/codecov/c/github/ioncakephper/markdown-magic-transform-badges?branch=main&style=for-the-badge)](https://codecov.io/gh/ioncakephper/markdown-magic-transform-badges)

<details>
<summary>More badges</summary>

[![release](https://img.shields.io/github/v/release/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/releases) [![stars](https://img.shields.io/github/stars/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/stargazers) [![forks](https://img.shields.io/github/forks/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/network/members) [![watchers](https://img.shields.io/github/watchers/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/watchers) [![last commit](https://img.shields.io/github/last-commit/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/commits) [![contributors](https://img.shields.io/github/contributors/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/graphs/contributors) [![issues](https://img.shields.io/github/issues/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/issues) [![pull requests](https://img.shields.io/github/issues-pr/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/pulls) [![repo size](https://img.shields.io/github/repo-size/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges) [![top language](https://img.shields.io/github/languages/top/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges) [![languages](https://img.shields.io/github/languages/count/ioncakephper/markdown-magic-transform-badges?style=for-the-badge)](https://github.com/ioncakephper/markdown-magic-transform-badges/search?l=)

</details>
<!-- end-doc-gen -->

This package provides a markdown-magic transform that generates badge markup for repositories and other targets so you can embed dynamic, up-to-date badges inside Markdown documentation.

## Installation

```bash
npm install --save-dev markdown-magic-transform-badges
```

## Basic usage in Markdown Files

- Add a markdown-magic transform block where you want badges rendered.
- Use an HTML comment block with the transform name and any options.

Example comment that asks the transform to render badges:

```markdown
<!-- MARKDOWN-MAGIC:START BADGES -->
<!-- MARKDOWN-MAGIC:END BADGES -->
```

## Generate Badges

Create `markdown-magic.config.js` as a configuration file for markdown-magic library.

```js
module.exports = {
  transforms: {
    BADGES: require("markdown-magic-transform-badges"),
  },
  transformDefaults: {
    // example defaults you provide for your project
    BADGES: {
      style: "flat",
    },
  },
};
```

At the prompt, run:

```bash
npx markdown-magic README.md --config ./markdown-magic.config.js
```

## Configuration (global defaults and per-file)

- Set global defaults for the transform in your markdown-magic config under transformDefaults.badges so projects get consistent badge styling and data by default.

Example markdown-magic.config.js:

```js
module.exports = {
  transformDefaults: {
    BADGES: {
      // example defaults you provide for your project
      style: "flat-square",
    },
  },
};
```

- Override defaults per file by supplying options inside the transform comment block. Per-file options take precedence over transformDefaults

## Common options and behavior

- style — badge style string passed to the badge generator.
- collapse - boolean value to generate a collapsable set of badges
- collapseLabel - string to use to prompt expanded set of badges

## Example with inline options

```markdown
<!-- MARKDOWN-MAGIC:START BADGES "style"="flat" -->
<!-- MARKDOWN-MAGIC:END badges -->
```

This will replace the block with the generated badge markup according to the enabled items and style.

## Notes for maintainers and contributors

- Document the full set of available options and defaults in README so users can copy examples into their md.config.js or inline blocks.
- Provide example outputs in the README so visitors see the rendered badge HTML and markdown.
- Keep the transform idempotent and safe for CI runs where docs are regenerated automatically

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

- `style`: shields.io style (e.g. 'flat', 'flat-square', 'for-the-badge', 'plastic', 'social', 'github')
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

```markdown
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

<!-- doc-gen SCRIPTS format=list -->

- `docs` — Generate documentation by processing README.md with markdown-magic. (line [12](./package.json#L12))

  ```bash
  npx markdown-magic README.md --config ./markdown-magic.config.js
  ```

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

- `lint` — Lint all project files to ensure code quality and consistency. (line [10](./package.json#L10))

  ```bash
  eslint . --ext .js,.json,.yaml,.yml,.md
  ```

- `lint:fix` — Lint all project files and automatically fix issues where possible. (line [11](./package.json#L11))

  ```bash
  eslint . --ext .js,.json,.yaml,.yml,.md --fix
  ```

- `prep` — Prepare the project for publishing by generating docs and formatting code. (line [13](./package.json#L13))

  ```bash
  npm run docs && npm run fix
  ```

- `test` — Run the test suite using Jest. (line [6](./package.json#L6))

  ```bash
  jest --passWithNoTests
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
