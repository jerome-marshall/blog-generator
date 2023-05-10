import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Blog Generator",
  description: "Generate a blog post or news article with a single click.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
