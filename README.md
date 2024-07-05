# NEXT.js Redux

A web application built with Next.js and Redux.

![Statements](https://img.shields.io/badge/statements-82.35%25-yellow.svg?style=flat&logo=jest)
![Branches](https://img.shields.io/badge/branches-92.85%25-brightgreen.svg?style=flat&logo=jest)
![Functions](https://img.shields.io/badge/functions-52.27%25-red.svg?style=flat&logo=jest)
![Lines](https://img.shields.io/badge/lines-82.35%25-yellow.svg?style=flat&logo=jest)

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Scripts](#scripts)
  - [Development](#development)
  - [Build](#build)
  - [Start](#start)
  - [Lint](#lint)
  - [Test](#test)
  - [Formatting](#formatting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This app is using the following stack:

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Testing**: [Jest](https://jestjs.io/) | [RTL](https://testing-library.com/docs/react-testing-library/intro/)
- **State management**: [Redux toolkit](https://redux-toolkit.js.org/)

## Getting Started [![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To get started with this project, follow the instructions below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.15.0)
- [npm](https://www.npmjs.com/) (version 10.1.0)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GadDev/harvard-museums-collections.git
   cd harvard-museums-collections
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Scripts

Here are the various scripts you can run in this project:

### Development

To start the development server:

```bash
npm run dev
```

This will start the Next.js development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To build the application for production:

```bash
npm run build
```

### Start

To start the application in production mode:

```bash
npm run start
```

Make sure to run npm run build before running this script.

### Lint

To lint your code:

```bash
npm run lint
```

This will run the linter to check for code quality issues.

### Test

To lint the tests:

```bash
npm test
```

To run the tests in watch mode:

```bash
npm run test:watch
```

### Formatting

To check code formatting:

```bash
npm run format
```

To automatically fix formatting issues:

```bash
npm run format:fix
```
