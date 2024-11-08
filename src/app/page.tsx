// import PageInner from "@/app/page-inner";
import dynamic from "next/dynamic";

const PageInner = dynamic(() => import('./page-inner'), { ssr: false });

export default function Home() {
  return <PageInner />;
}
