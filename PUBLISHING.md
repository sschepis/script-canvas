# How to Publish this package to npmjs.com

This package is published to npmjs.com using the [npm-publish](npm-publish) script.

## Prerequisites

You must have an account on npmjs.com and be a member of the [npmjs.com/@microsoft](https://www.npmjs.com/org/microsoft) organization.

## Where to place your publish token

The publish token is stored in the `NPM_TOKEN` environment variable.  This variable is set in the [Azure DevOps build pipeline](https://dev.azure.com/azure-sdk/public/_build?definitionId=1) for this project.

### .env file

If you are running the `npm-publish` script locally, you can create a `.env` file in the root of this project and set the `NPM_TOKEN` variable in that file.  The `.env` file is ignored by git, so you don't have to worry about accidentally checking in your token.

## Publishing

To publish this package to npmjs.com, run the following command:

```bash
npm run npm-publish
```

This will build the package, run the tests, and publish the package to npmjs.com.

## Publishing a new version

To publish a new version of this package to npmjs.com, run the following command:

```bash
npm version <major|minor|patch>
```

This will update the version number in the `package.json` file, commit the change, and tag the commit with the new version number.  Then it will run the `npm-publish` script.

## Publishing a new version with a pre-release tag

To publish a new version of this package to npmjs.com with a pre-release tag, run the following command:

```bash
npm version <major|minor|patch>-<tag>
```

This will update the version number in the `package.json` file, commit the change, and tag the commit with the new version number.  Then it will run the `npm-publish` script.