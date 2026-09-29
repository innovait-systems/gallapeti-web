import Image from "next/image";
import { site } from "@/site.config";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image src="/logo.png" alt={`${site.name} logo`} width={40} height={40} className="h-10 w-10" priority />
      {withWordmark && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-brand-500">Galla</span> <span className="text-gold">Peti</span>
        </span>
      )}
    </span>
  );
}
