export const Hero = () => {
    return (
        <div className="text-center mb-12" style={{ animation: "fadeUp .55s ease both" }}>

            {/* Tag */}
            <span className="inline-block text-[0.75rem] font-medium tracking-[.12em] uppercase text-brand bg-brand/10 border border-brand/25 px-3 py-1 rounded-full mb-5">
                PDF Slicer
            </span>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.1] tracking-[-0.03em] text-ink-strong mb-4">
                Extract the pages<br />you <em className="not-italic text-brand">actually</em> need
            </h1>

            {/* Subtitle */}
            <p className="text-[1.05rem] text-ink-muted max-w-120 mx-auto leading-[1.7] font-light">
                Upload your PDF, choose the pages, and download a clean new document in seconds.
            </p>

        </div>
    )
}