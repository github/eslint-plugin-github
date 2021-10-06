## Publishing this package

Publishing this package to npm is done via a [GitHub action](https://github.com/github/eslint-plugin-github/blob/main/.github/workflows/publish.yml) which triggers when a new GitHub Release is created.

To publish to npm, create a release, give it an appropriate [Semantic Versioning](https://semver.org/) tag and fill out the release description. Once you publish the release, the GitHub action will be triggered and it will publish to npm.
