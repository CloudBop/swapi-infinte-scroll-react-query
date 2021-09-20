import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery(
    // identifier
    "sw-species",
    //
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // options
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  )
  if (isLoading) return <div className="loading">Loading....</div>
  if (isError) return (
    <div>
      <h3>Ooops, something went wrong.</h3>
      <p>{error.toString()}</p>
    </div>)
  //


  return (<>
    {(isFetching) && <div className="loading">Loading....</div>}
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}> {
      data.pages.map(pageData => pageData.results.map((species) => {
        return <Species
          key={species.name}
          name={species.name}
          language={species.language}
          averageLifespan={species.average_lifespan}
        />
      })
      )
    } </InfiniteScroll>;
  </>)
}
