import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/ui/Navbar';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import { NotificationProvider } from '@/provider/context/NotificationProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Todo app',
	description: 'A simple todo app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/todo-icons.png" type="image/png" />
			</head>
			<body className={inter.className}>
				<Providers>
					<NotificationProvider>
						<ProtectedRoute>
							<Navbar />
							{children}
						</ProtectedRoute>
					</NotificationProvider>
				</Providers>
			</body>
		</html>
	);
}
