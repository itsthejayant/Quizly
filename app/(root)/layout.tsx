import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16 mt-2" >{children} <ToastContainer />
      </main>
      <Footer />
    </div>
    // yeh toast hatao poori project m se shadcn wala hatao
    // quiz ka data localstorage m h usse sambhal
    // quiz data pe validation laga
    // emails select karte (quiz host karte hue) hue ko serverside kar revalidate laga form bana kar
  );
}