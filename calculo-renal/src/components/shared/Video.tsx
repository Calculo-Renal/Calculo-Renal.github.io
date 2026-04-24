interface VideoProps {
    src: string,
    loop: boolean
}

export default function Video({ src, loop }: VideoProps) {
    return (
        <video
            src={src}
            loop={loop}
            controls
            style={{
                objectFit: "cover",
                imageRendering: "smooth"
            }}
        />
    )
}