import { addYears, format, getYear, startOfYear } from "date-fns";
import Raindrop from "@/lib/raindrop";
import { ILink } from "@/types";
import { Metadata } from "next";
import { bookmarkGroupByWeekNumber } from "@/lib/helper";
import Container from "@/components/container";
import MetricCard from "@/components/metric-card";
import SubTitle from "@/components/subtitle";
import BookmarkCard from "@/components/bookmark-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "İnternette gezinirken beğendiğim ve beni takip edenlerin de beğeneceğini düşündüğüm, belli bir kategorisi olmayan karışık şeyler.",
};

export const revalidate = 3600; // 60*60*2

async function fetchData() {
  const dateStartOfYear = startOfYear(new Date());
  const dateEndOfYear = addYears(dateStartOfYear, 1);

  const startDateByFormat = format(dateStartOfYear, "yyyy-MM-dd");
  const endDateByFormat = format(dateEndOfYear, "yyyy-MM-dd");

  const raindrop = new Raindrop();
  const collections: ILink[] = await raindrop.getBookmark({
    search: `created:>${startDateByFormat} created:<${endDateByFormat}`,
  });

  return {
    data: collections,
    year: format(new Date(), "yyyy"),
  };
}

export default async function Bookmark() {
  const { data, year } = await fetchData();
  const dataGroupByWeekNumber = bookmarkGroupByWeekNumber(data);

  const week = format(new Date(), "w");

  return (
    <>
      <Container>
        <h1 className="text-2xl">{metadata.description}</h1>

        {/*<div className="mt-10">
          <ThankYou />
        </div>*/}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <MetricCard data={data.length}>Link ({year})</MetricCard>
          <MetricCard data={data.length}>Görüntülenme ({year})</MetricCard>
        </div>
      </Container>

      <Container className="mt-16">
        <div key={week}>
          <SubTitle>
            {week}. Hafta, {year}
          </SubTitle>

          <div className="mt-4">
            {dataGroupByWeekNumber[week].map((item: ILink) => {
              return <BookmarkCard week key={item._id} bookmark={item} />;
            })}
          </div>
        </div>

        <div className="mt-16">
          <Link
            href={`/bookmarks/${getYear(new Date())}`}
            className="rounded-lg bg-zinc-200 px-4 py-3 no-underline hover:bg-zinc-300
              dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Tüm listeyi görüntüle →
          </Link>
        </div>
      </Container>
    </>
  );
}
