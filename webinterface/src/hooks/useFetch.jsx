import {useEffect, useState} from "react";

export const useFetch = (url) => {


    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState(null);

    // method to fetch data from the backend
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setFetchedData(data);
            setIsLoading(false);
        } catch (error) {
            setErrMsg(error);
            setIsLoading(false);
        }
    }


    useEffect(() => {

        const abortController = new AbortController();

        fetch(url, {signal: abortController.signal})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setFetchedData(data);
                setErrMsg(null);
                setIsLoading(false);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log("Fetch aborted");
                }
                else {
                    setIsLoading(false);
                    setErrMsg(err.message);
                }
            })
    }, [url])


    return {fetchedData, isLoading, errMsg, fetchData};

}