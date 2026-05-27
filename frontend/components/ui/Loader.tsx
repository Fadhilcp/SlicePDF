const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-surface-bg z-9999">
            <div className="relative w-16.25 aspect-square">
                <span className="absolute rounded-[50px] animate-[loaderAnim_2.5s_infinite] shadow-[inset_0_0_0_3px] shadow-brand" />
                <span className="absolute rounded-[50px] animate-[loaderAnim_2.5s_infinite] [animation-delay:-1.25s] shadow-[inset_0_0_0_3px] shadow-brand/50" />
            </div>

            <style>{`
                @keyframes loaderAnim {
                    0%     { inset: 0 35px 35px 0; }
                    12.5%  { inset: 0 35px 0 0; }
                    25%    { inset: 35px 35px 0 0; }
                    37.5%  { inset: 35px 0 0 0; }
                    50%    { inset: 35px 0 0 35px; }
                    62.5%  { inset: 0 0 0 35px; }
                    75%    { inset: 0 0 35px 35px; }
                    87.5%  { inset: 0 0 35px 0; }
                    100%   { inset: 0 35px 35px 0; }
                }
            `}</style>
        </div>
    );
};

export default Loader;