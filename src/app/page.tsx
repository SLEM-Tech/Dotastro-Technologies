import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import AppMenu from "@src/components/Navbars/AppMenu";
import GetStarted from "./(Home)/_components/Getstarted";

const { description, title, ogImage, keywords } = SEODATA.home;
export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  icons: ogImage,
  openGraph: {
    images: [
      {
        url: ogImage ?? "",
      },
    ],
  },
};

const page = () => {
  return (
    <AppLayout>
      <AllCategorySection />
      <div className="mx-auto pl-2 mt-4">
        <SortedProducts />
      </div>
      <GetStarted />
      <AppMenu />
    </AppLayout>
  );
};

export default page;
