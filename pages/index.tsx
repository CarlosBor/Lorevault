import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from './index.module.css';
import FilterMenu from '@/components/FilterMenu';
import CardTable from '@/components/CardTable';
import SearchBar from '@/components/SearchBar';
import CardFullScreen from '@/components/CardFullScreen';
import AddItem from '@/components/AddItem';
import { useState, useEffect } from 'react';

//What I want now:

//THEN I can make the elements of the menu do DB calls  
//THEN the side menu into a checkbox that filters results 
//THEN clean up the DB, it ought to be "categories", not "infoType" 
//THEN make it so an empty name search returns all content and filter from there. 
//THEN I can add items to those DB entries
//THEN I can improve the menu to add stuff so it's not a weird different page? 
//THEN I have to remove AddItem from the pages, since it's not a component.
//THEN I have to control the form. Prevent empty fields, add error messages. 
//THEN I can add a header to navigate the site (Lol, Lmao even) 
//THEN I can improve CSS
//THEN I can work on the clickable card functionality <---- IM HERE - - - Right now I am querying the info of the specific element to a screen, but I have to make the component to display it.
//THEN I can work on adding images
//THEN maybe accounts but that's overdoing it



export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [checkboxInit, setCheckboxInit] = useState<string[] | undefined[]>([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [filteredArray, setFilteredArray] = useState<string[]>([]);
  const [displayAddCard, setDisplayAddCard] = useState<boolean>(false);

  //This is how I make the component read the query URL.
  //Make a "create link" button and use this to share.
  //Different type of post ( maps, chars etc) may use a special, second filter. Radiobutton
    const fetchData = async (query:string, filteredArray:string[]) => {
      //This returns the raw response
      let arrayString = "";
      if (filteredArray){
        for(let i=0;filteredArray.length>i;i++){
          arrayString = `${arrayString}&categories=${filteredArray[i]}`;
        }
      }
      const cardInfoQuery = await fetch(`/api/queryLorevault?name=${query}${arrayString}`);
      //This is a query with a search parameter, for future reference
      //    const cardInfoQuery = await fetch(`/api/queryLorevault?productId=${query}`);
      //This parses it into a more readable object
      const cardInfoQueryJson = await cardInfoQuery.json();
      //It crashes. The problem is that reactjs doesn't play well with using objects in useState
      setCardInfo(cardInfoQueryJson);
    }

  //Perform query when data changes
  useEffect(()=>{
    fetchData(query, filteredArray);
  },[query, filteredArray]);

  //Load URL params as query on page load
  useEffect(()=>{
    setQuery(router.query.searchToken?.toString() || '');
    let categoriesToArray = Array.isArray(router.query.categories) ? router.query.categories : [router.query.categories];
    // @ts-ignore
    //The TS error here indicates that checkboxInit can't handle a lone string, yet per the line above it should never, ever get anything but an array.
    //It's literally checking if it's an array and making it one if it returns false. TS mistake?
    setCheckboxInit(categoriesToArray);
  },[router.query]);
  
  //Generate url with params from current search parameters
  const generateLink = () =>{
    let queryString = `${process.env.NEXT_PUBLIC_CURRENT_URL}`;
    if(query){
      queryString = `${queryString}?searchToken=${query}`;
    }
    if(filteredArray.length>0){
      let queryArraySection = "";
      for(let i=0; i<filteredArray.length;i++){
        queryArraySection = `${queryArraySection}&categories=${filteredArray[i]}`;
      }
      if (!query){
        //If there is no query text then the first instance of & ought to be an ? to specify params in the query
        queryArraySection = queryArraySection.replace('&', '?');
      }
      queryString = `${queryString}${queryArraySection}`;
    }
    navigator.clipboard.writeText(queryString);
  }

  const grabFilteredArray = (value:string[]) =>{
    setFilteredArray(value);
  }

  const grabSearchValue = (value: string) => {
    setQuery(value);
  }

  const addCardToggle = () =>{
    setDisplayAddCard(!displayAddCard);
    console.log(displayAddCard);
  }

  return (
    <>
      <Head>
        <title>Lorevault</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
          <h2 className={styles.logo}>Lorevault</h2>
          <SearchBar sendSearchValue={grabSearchValue} initialValue={query} generateLink={generateLink}/>
          <button onClick={addCardToggle}>📓➕</button>
        </div>
      <main className={styles.main}>
        <FilterMenu sendFilteredArray={grabFilteredArray} checkboxInit={checkboxInit}/> 
        <CardTable cardInfo={cardInfo}/>
        {displayAddCard && 
        <CardFullScreen addCardToggle={addCardToggle}>
          <AddItem/>
        </CardFullScreen>
        }
      </main>
      <p>{filteredArray}</p>
      <p>{query}</p>
    </>
  )
}
