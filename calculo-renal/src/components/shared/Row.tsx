export default function Row({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-8">
            {children}
        </div>
    )
}