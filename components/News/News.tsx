import { GetServerSideProps, NextPage } from "next";
import NewsCard from "./NewsCard";

const NewsList: NextPage = ({ news }) => {
  return (
    <div>
      {/* {news.map((newsItem) => (
        <NewsCard key={newsItem.id} news={newsItem} />
      ))} */}
    </div>
  );
};

export default NewsList;
