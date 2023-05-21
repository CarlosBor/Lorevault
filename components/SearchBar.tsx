import {useState, useEffect, useCallback} from 'react';
import {ChangeEvent} from 'react';
import styles from './searchBar.module.css';

interface SearchBarProps{
    sendSearchValue: (Function);
    generateLink: (Function);
    initialValue: string;
} 

const SearchBar = (props:SearchBarProps) => {
    const [query, setQuery] = useState('');

    const generateLink = () =>{
        props.generateLink();
    }

    useEffect(()=>{
        setQuery(props.initialValue);
    },[props.initialValue])

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
         <button className={styles.button} onClick={generateLink}></button>
        </>
    )
}

export default SearchBar;