```bash
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
```

```txt
* `-E, --save-exact`: Saved dependencies will be configured with an
  exact version rather than using npm's default semver range
  operator.
```

ESLint:

```txt
If you use ESLint, install eslint-config-prettier to make ESLint and Prettier play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier. There’s a similar config for Stylelint: stylelint-config-prettier
```