import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery(
    // identifier
    "sw-people",
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
  return (
    <>
      {(isFetching) && <div className="loading">Loading....</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}> {
        data.pages.map(pageData => pageData.results.map((person) => {
          return <Person
            key={person.name}
            name={person.name}
            hairColor={person.hair_color}
            eyeColor={person.eye_color}
          />
        })
        )
      } </InfiniteScroll>;
    </>)
}
