# RCCG Event

An elegant event management platform for RCCG (Redeemed Christian Church of God) events, featuring a comprehensive sponsor directory with individual sponsor profiles.

## Features

- **Event Page**: A beautifully designed event landing page showcasing event details and information
- **Sponsor Directory**: Display a complete list of event sponsors in an organized, easy-to-browse format
- **Sponsor Profiles**: View detailed profiles for each sponsor, including contact information, logos, and sponsor details
- **Responsive Design**: Mobile-friendly interface that works seamlessly across all devices
- **Modern Tech Stack**: Built with Next.js, React, TypeScript, and Tailwind CSS for optimal performance and maintainability

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org) 16.2.6 with React 19
- **Language**: TypeScript (82.6% of codebase)
- **Styling**: Tailwind CSS with PostCSS
- **Database**: MongoDB with Mongoose ODM
- **Tools**: ESLint for code quality

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/sulaimonaa/rccg-event.git
cd rccg-event

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

The app will automatically reload as you edit the source files.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js application directory containing pages and layouts
- `app/page.tsx` - Main event page component
- `app/layout.tsx` - Root layout wrapper
- `public/` - Static assets

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Understand React concepts and hooks
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework documentation
- [TypeScript](https://www.typescriptlang.org/docs/) - Static typing for JavaScript
- [Mongoose Documentation](https://mongoosejs.com/) - MongoDB object modeling

## Deployment

This project can be easily deployed to [Vercel](https://vercel.com), the platform built by the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be deployed and available at a Vercel URL

For more detailed deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with your improvements.

## License

This project is open source and available under the MIT License.

## Contact

For questions or inquiries about this RCCG event platform, please open an issue on GitHub.
