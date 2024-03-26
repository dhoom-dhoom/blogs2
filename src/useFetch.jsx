import { useEffect, useState } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setisError] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not get the blogs");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          // Check if component is still mounted
          setData(data);
          setisPending(false);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setisPending(false);
          console.log(err.message);
        }
      });
    return () => {
      abortCont.abort();
      setIsMounted(false);
    };
  }, [url]);

  return { data, isPending, error };
};
export default useFetch;
