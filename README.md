# Soplang Hub

The official package registry for Soplang. Find, publish, and manage packages for your Soplang projects.

## Features

- 📦 Package Management: Publish, update, and remove packages
- 🔍 Package Search: Find packages by name, description, or keywords
- 📊 Package Statistics: Track downloads and popularity
- 🔐 User Authentication: Secure access with GitHub OAuth
- 🎨 Modern UI: Beautiful and responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/soplang-hub.git
   cd soplang-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Package Management

### Publishing a Package

1. Create a `sop.toml` file in your package:
   ```toml
   [package]
   name = "example-package"
   version = "1.0.0"
   description = "A sample Soplang package"
   license = "MIT"
   author = "username"

   [dependencies]
   another-package = "^1.2.0"
   ```

2. Use the web interface or API to publish:
   ```bash
   curl -X POST http://localhost:3000/api/packages \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -F "package=@package.tar.gz"
   ```

### Installing Packages

Use the Soplang CLI:
```bash
sop install example-package
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 