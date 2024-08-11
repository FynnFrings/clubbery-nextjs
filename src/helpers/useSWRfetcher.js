const useSWRfetcher = (...args) => fetch(...args).then((res) => res.json());

export default useSWRfetcher;
