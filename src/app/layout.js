import "./globals.css";
import { HotelGalleryProvider } from '../context/HotelGalleryContext/HotelGalleryContext';


export const metadata = {
  title: "Aurika ",
  description: "Aurika ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <HotelGalleryProvider>
      <body>{children}</body>
      </HotelGalleryProvider>
    </html>
  );
}
