# Contributing to Invoixy

First off, thank you for considering contributing to **Invoixy**! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## How Can I Contribute?

### 1. Reporting Bugs
If you find a bug, please open an issue on GitHub. Include:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Details about your environment (OS, browser, Node.js version).

### 2. Suggesting Enhancements
Have a great idea for a new feature? We'd love to hear it! Open an issue and label it as an "enhancement". Explain how the feature would work and why it would be beneficial to the project.

### 3. Submitting Pull Requests
We welcome pull requests! To submit one:
1. **Fork the repository** and create your branch from `main`.
2. **Make your changes** and ensure the code compiles and runs locally (`npm run dev`).
3. **Format your code** and follow the existing style guidelines.
4. **Write descriptive commit messages**.
5. **Open a Pull Request** with a detailed description of what you've changed.

## Development Setup

1. Fork and clone the repo.
2. Run `npm install` to install dependencies.
3. Setup your `.env` file with `DATABASE_URL="file:./dev.db"`.
4. Run `npx prisma db push` to initialize the schema.
5. Run `npm run dev` to start the local server.

## Code of Conduct
Please be respectful and considerate of others when interacting in the repository. We want to maintain a welcoming and inclusive community.

Thank you for contributing to Invoixy!
