import {useState, useEffect, useCallback} from 'react';
import {ChangeEvent} from 'react';
import styles from './searchBar.module.css';

interface SearchBarProps{
    sendSearchValue: (Function);
    initialValue: string;
}

export default function SearchBar(props:SearchBarProps){
    const [query, setQuery] = useState('');

    useEffect(()=>{
        setQuery(props.initialValue);
    },[props.initialValue])

    const searchBarToClipboard = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CURRENT_URL}?searchToken=${query}`)
    }

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
        const query = event.target.value;
        setQuery(query);
        //Si hay texto en el campo...
        if (query.length) {
            props.sendSearchValue(query);
        }
    },[])

    return(
        <>
         <input type="text" onChange={onChange} value={query}/>
         <p>{query}</p>
         <button className={styles.button} onClick={searchBarToClipboard}></button>
        </>
    )
}