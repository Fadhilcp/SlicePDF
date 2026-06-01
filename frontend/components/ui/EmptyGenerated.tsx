import { IconFilePlus } from "../icons/Icons";

const EmptyGenerated = () => (
  <div className="flex flex-col items-center justify-center py-10 px-6 text-center border border-dashed border-ink/[0.07] rounded-xl">
    <div className="w-12 h-12 rounded-xl bg-white/4 border border-ink/10 flex items-center justify-center text-ink/25 mb-3">
      <IconFilePlus />
    </div>
    <p className="text-[0.825rem] text-ink/35">
      No generated PDFs yet — slice an upload to create one.
    </p>
  </div>
);

export default EmptyGenerated;