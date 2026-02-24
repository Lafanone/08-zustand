import { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = {
    title: "Page Not Found | NoteHub",
    description: "Oops! The page you are looking for does not exist.",
    alternates: {
    canonical: '/not-found',
  },
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "Oops! The page you are looking for does not exist.",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      }
    ],
  }
}

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>404 - Not Found</h2>
                <p>Could not find requested resource</p>
                    <Link href="/">Return Home</Link>
        </div>
    );
}