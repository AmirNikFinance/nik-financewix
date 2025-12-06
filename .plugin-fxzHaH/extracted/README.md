# Wix Vibe Forms App Plugin

A Wix Vibe plugin that generates forms definitions, creates schemas and integrates forms into the Vibe site.

## Development

```bash
# Install dependencies
yarn install

# Build the plugin
yarn build

# Build the plugin in watch mode
yarn build --watch

# Fix linting issues
yarn lint:fix
```

To use local build of `vibe-forms-plugin-files`, set `useLocal` param to true on `install` function.
```
await unzipAndMergePluginFiles(env, true);
```

## Publishing new version

Publish new version by bumping the package version in `package.json` manually. The version should be bumped for *all* forms plugins.
You also have to update the Wix Forms SDK extension on dev center to use the new version.