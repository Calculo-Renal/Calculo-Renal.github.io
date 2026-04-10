import "@/src/app/globals.css"
import Header from "@/src/components/layout/Header/Header"
import { Inter, Funnel_Display } from "next/font/google"
import clsx from "clsx"

const inter = Inter({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter"
})

const funnel = Funnel_Display({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-funnel"
})

export const metadata = {
    title: {
        default: "Cálculo Renal",
        template: "%s | Cálculo Renal"
    }
}

export default function SumarioLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className={clsx(
                "min-h-screen max-h-screen grid grid-rows-[auto_1fr] grid-cols-1",
                inter.variable,
                funnel.variable
                )}>
                <Header />
                {children}
            </body>
        </html>
    )
}