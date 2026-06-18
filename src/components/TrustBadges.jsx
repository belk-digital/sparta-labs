"use client";

import { FlaskConical, FileText, BadgeCheck } from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="w-full py-16 [background:linear-gradient(to_bottom,#f0f0f0_0%,#ffffff_100%)] border-t border-black/5">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 max-[1024px]:flex-wrap max-[1024px]:justify-center max-[1024px]:gap-12 max-[768px]:px-4 max-[480px]:px-3">
        <div className="flex flex-1 flex-col items-start gap-0.5 text-left max-[1024px]:mb-8 max-[1024px]:min-w-full max-[1024px]:items-center max-[1024px]:text-center">
          <h3 className="text-[1.8rem] leading-[1.1] font-normal tracking-[-0.5px] text-ink">Verified</h3>
          <h3 className="text-[1.8rem] leading-[1.1] font-light tracking-[-0.5px] text-muted">Quality</h3>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 text-center text-ink max-[1024px]:min-w-[200px]">
          <FlaskConical size={24} strokeWidth={1.2} />
          <span className="mt-1 text-[1.2rem] font-normal">Third-party</span>
          <span className="text-[10px] font-medium tracking-[0.5px] text-faint uppercase">Lab Tested</span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 text-center text-ink max-[1024px]:min-w-[200px]">
          <FileText size={24} strokeWidth={1.2} />
          <span className="mt-1 text-[1.2rem] font-normal">COA</span>
          <span className="text-[10px] font-medium tracking-[0.5px] text-faint uppercase">Available By Batch</span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 text-center text-ink max-[1024px]:min-w-[200px]">
          <BadgeCheck size={24} strokeWidth={1.2} />
          <span className="mt-1 text-[1.2rem] font-normal">&ge;99%</span>
          <span className="text-[10px] font-medium tracking-[0.5px] text-faint uppercase">Purity Standard</span>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
