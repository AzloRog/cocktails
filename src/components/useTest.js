import {useEffect} from 'react'

export const useTest = () => {
    console.log("useTest body");

    useEffect(() => {
        console.log("useTest effect body");
    }, [])

    return "hello"
}

export default useTest