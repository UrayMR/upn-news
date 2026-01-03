# Pre-commit Check with Husky

This project uses [Husky](https://typicode.github.io/husky/) to automatically run pre-commit checks before changes are pushed to the repository. With Husky, every time you run `git commit`, a pre-commit script will be executed to help maintain code quality.

## What Gets Checked?

- **Linting**: Code is checked using the project's configured linter.
- **Formatting**: Code is automatically formatted according to the project's style guidelines.
- **Testing**: Automated tests may be run to ensure there are no errors before committing.

## How It Works

1. When you run `git commit`, Husky triggers the pre-commit script.
2. This script runs the linter, format and tests according to the configuration.

3. If any errors are found, the commit is aborted and an error message is shown.

> **Note**: The pre-commit checks are designed to help you catch issues early. If your commit is blocked, review the error messages, fix the issues, and try committing again.

### How to Fix Pre-commit Errors

If your commit is blocked due to formatting or lint errors, here are the steps to resolve them:

#### Fix Format Check Errors

Run the following command to automatically format your code:

```sh
npm run format
```

#### Fix Lint Errors

Run the following command to check and fix lint issues:

```sh
npm run lint -- --fix
```

If automatic fixing is not possible, review the error messages and update your code manually.

#### Fix Composer Format Check Errors

For PHP code formatting issues, run:

```sh
composer format
```

This will format your PHP code according to the project's standards. After running these commands, review your changes and try committing again.

## CI/CD

In addition to pre-commit checks, this project also includes a **CI/CD pipeline** that will run:

- **Unit & Featured Tests**: All automated tests are executed in the pipeline.
- **Linter**: Code is checked again to ensure quality before deployment.
- **Format Check**: Code formatting is verified to maintain consistency.

CI/CD ensures that code merged into the main branch has passed all tests and code quality checks.

---

**References:**

- [Husky Documentation](https://typicode.github.io/husky/)
- [CI/CD Best Practices](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration)
