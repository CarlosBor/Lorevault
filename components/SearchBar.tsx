import {useState, useRef, useCallback} from 'react';
import {ChangeEvent} from 'react';

interface SearchBarProps{
    sendSearchValue: (Function);
}

export default function SearchBar(props:SearchBarProps){
    const [query, setQuery] = useState('');


    const buildQuery = (query:string) => `/api/search?q=${query}`;
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
        const query = event.target.value;
        setQuery(query);
        //Si hay texto en el campo...
        if (query.length) {
            props.sendSearchValue(query);
            //Tal vez esto debiera bubblearlo
            // fetch(searchEndpoint(query))
            // .then(res => res.json())
            // .then(res => {
            //   setResults(res.results)
            // })

        }
    },[])
    return(
        <>
         <input type="text" onChange={onChange}/>
         <p>{query}</p>
        </>
    )
}