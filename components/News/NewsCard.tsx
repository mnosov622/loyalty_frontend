import { FC } from "react";

interface NewsCardProps {
  title: string;
  description: string;
}

const NewsCard: FC<NewsCardProps> = ({ title, description }) => (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        {/* <img className="h-48 w-full object-cover md:w-48" src="/img/store.jpg" alt="Man looking at item at a store" /> */}
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default NewsCard;
