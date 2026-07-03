import Link from "next/link";

import LogoLg from "@/../public/images/logo-lg.svg";
import LogoSm from "@/../public/images/logo-sm.svg";

export default function Gnb() {
  return (
    <header className="sticky top-0 z-50 flex items-center h-15 px-4 md:pl-6 lg:pl-90 border-b border-slate-200 bg-white">
      <Link href="/">
        {/* small(375): 로고만 노출 */}
        <LogoSm className="md:hidden" />

        {/* medium(744) / large(1920): 풀 로고 */}
        <LogoLg className="hidden md:block" />
      </Link>
    </header>
  );
}
