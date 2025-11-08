const path = require("path");
const fs = require("fs");

function parseRepo(repo) {
  if (!repo) return null;
  if (typeof repo === "object" && repo.url) repo = repo.url;
  if (typeof repo !== "string") return null;

  // strip git+ prefix and .git suffix
  repo = repo.replace(/^git\+/, "").replace(/\.git$/, "");

  const m = repo.match(/github\.com[:\/](.+?)\/?$/i);
  if (!m) return null;
  return m[1]; // owner/repo
}

module.exports = ({ transform, options, settings = {} }) => {
  const defaultOptions = {
    style: null,
    ciWorkflow: "ci.yml",
    ciBranch: "main",
    excludeBadges: [],
    // collapse: true,
    // collapseLabel: "More badges",
    // collapseVisible: 3,
  };
  const globalOptions =
    (settings.transformDefaults && settings.transformDefaults[transform]) || {};
  const opts = { ...defaultOptions, ...globalOptions, ...options };

  const style = opts.style ? `?style=${encodeURIComponent(opts.style)}` : "";
  // For URLs that already have a query param (eg ?branch=main) append with &
  const styleAmp = opts.style ? `&style=${encodeURIComponent(opts.style)}` : "";
  const pkgPath = path.join(process.cwd(), "package.json");
  // const pkgPath = path.join(__dirname, "package.json");
  if (!fs.existsSync(pkgPath)) return "";
  const pkg = require(pkgPath);

  const allBadges = [];
  const name = pkg.name;

  console.log(`Exclude Badges: ${opts.excludeBadges}`);

  // helper to add named badges
  const pushBadge = (key, md) => {
    if (opts.excludeBadges && opts.excludeBadges.includes(key)) {
      return; // Skip this badge if it's in the exclude list
    }
    allBadges.push({ key, md });
  };

  if (name) {
    pushBadge(
      "npmVersion",
      `[![npm version](https://img.shields.io/npm/v/${encodeURIComponent(
        name
      )}.svg${style})](https://www.npmjs.com/package/${encodeURIComponent(
        name
      )})`
    );
    pushBadge(
      "npmDownloads",
      `[![npm downloads](https://img.shields.io/npm/dw/${encodeURIComponent(
        name
      )}.svg${style})](https://www.npmjs.com/package/${encodeURIComponent(
        name
      )})`
    );
  }

  if (pkg.license) {
    pushBadge(
      "license",
      `[![license](https://img.shields.io/badge/license-${encodeURIComponent(
        pkg.license
      )}-blue.svg${style})](https://www.npmjs.com/package/${encodeURIComponent(
        name
      )})`
    );
  }

  // Maintained badge based on commit activity (yearly activity)
  // Uses shields endpoint for commit-activity (y: yearly), which supports style
  // Example: https://img.shields.io/github/commit-activity/y/owner/repo?style=flat
  // We'll render as 'maintained' with value 'active' (visual indicator)
  // The actual numeric activity isn't available via this shield, but the badge indicates activity.
  // We'll add the badge unconditionally when repository is present.

  const ownerRepo = parseRepo(pkg.repository);
  if (ownerRepo) {
    const parts = ownerRepo.split("/");
    const owner = parts[0];
    const repoName = parts[1];
    const workflowFile = opts.ciWorkflow ?? pkg.ciWorkflow ?? "ci.yml";
    const workflowBranch = opts.ciBranch ?? pkg.ciBranch ?? "main";
    pushBadge(
      "actions",
      `[![actions status](https://img.shields.io/github/actions/workflow/status/${owner}/${repoName}/${workflowFile}?branch=${workflowBranch}${styleAmp})](https://github.com/${ownerRepo}/actions)`
    );

    pushBadge(
      "codecov",
      `[![codecov](https://img.shields.io/codecov/c/github/${owner}/${repoName}?branch=${workflowBranch}${styleAmp})](https://codecov.io/gh/${ownerRepo})`
    );

    pushBadge(
      "release",
      `[![release](https://img.shields.io/github/v/release/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/releases)`
    );
    // Commit activity / maintained badge (yearly commits)
    pushBadge(
      "maintained",
      `[![maintained](https://img.shields.io/github/commit-activity/y/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/graphs/commit-activity)`
    );
    pushBadge(
      "stars",
      `[![stars](https://img.shields.io/github/stars/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/stargazers)`
    );
    pushBadge(
      "forks",
      `[![forks](https://img.shields.io/github/forks/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/network/members)`
    );
    pushBadge(
      "watchers",
      `[![watchers](https://img.shields.io/github/watchers/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/watchers)`
    );
    pushBadge(
      "lastCommit",
      `[![last commit](https://img.shields.io/github/last-commit/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/commits)`
    );
    pushBadge(
      "contributors",
      `[![contributors](https://img.shields.io/github/contributors/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/graphs/contributors)`
    );
    pushBadge(
      "issues",
      `[![issues](https://img.shields.io/github/issues/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/issues)`
    );
    pushBadge(
      "pulls",
      `[![pull requests](https://img.shields.io/github/issues-pr/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/pulls)`
    );
    pushBadge(
      "repoSize",
      `[![repo size](https://img.shields.io/github/repo-size/${owner}/${repoName}${style})](https://github.com/${ownerRepo})`
    );
    pushBadge(
      "topLanguage",
      `[![top language](https://img.shields.io/github/languages/top/${owner}/${repoName}${style})](https://github.com/${ownerRepo})`
    );
    pushBadge(
      "languages",
      `[![languages](https://img.shields.io/github/languages/count/${owner}/${repoName}${style})](https://github.com/${ownerRepo}/search?l=)`
    );
  }

  // Collapse logic
  const collapse = opts.collapse === true || String(opts.collapse) === "true";
  const collapseLabel = opts.collapseLabel || "More badges";
  const collapseVisible = Number(opts.collapseVisible) || 3;

  const preferredOrder = ["npmVersion", "actions", "license", "maintained"];
  const visible = [];
  const hidden = [];

  // map for quick lookup
  const byKey = allBadges.reduce((map, b) => {
    map[b.key] = b.md;
    return map;
  }, {});

  // add preferred first
  for (const k of preferredOrder) {
    if (byKey[k]) {
      visible.push(byKey[k]);
      delete byKey[k];
    }
    if (visible.length >= collapseVisible) break;
  }

  // fill remaining visible up to collapseVisible
  if (visible.length < collapseVisible) {
    for (const b of allBadges) {
      if (visible.length >= collapseVisible) break;
      if (!byKey[b.key]) continue; // already added
      visible.push(b.md);
      delete byKey[b.key];
    }
  }

  // remaining go to hidden
  for (const k of Object.keys(byKey)) {
    hidden.push(byKey[k]);
  }

  // If collapse not requested or nothing hidden, return all inline
  if (!collapse || hidden.length === 0) {
    return allBadges.map((b) => b.md).join(" ");
  }

  // Build collapsed output
  const visibleStr = visible.join(" ");
  const hiddenStr = hidden.join(" ");
  return (
    visibleStr +
    "\n\n<details>\n<summary>" +
    collapseLabel +
    "</summary>\n\n" +
    hiddenStr +
    "\n\n</details>"
  );
};
