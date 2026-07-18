import './globals.css';

export const metadata = {
    title: {
        default: 'Hadi Purnama Jati',
        template: '%s — Hadi Purnama Jati',
    },
    description: 'Empowering Humans in the Age of Machines',
    icons: {
        icon: 'https://jagoprompt.com/wp-content/uploads/2026/01/favicon-32x32-1.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body>{children}</body>
        </html>
    );
}
