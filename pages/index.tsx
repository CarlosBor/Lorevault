import Head from 'next/head'
import styles from './index.module.css';
import NavMenu from '@/components/NavMenu';
import CardTable from '@/components/CardTable';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

//What I want now:

//What I want is functional DB calls
//Cheers I have funciontal DB calls!

//Then I can filter those results
//Cheers I know how to filter results!
//

//THEN I can make the elements of the menu do DB calls
//THEN I can add items to those DB entries
//THEN I can add a header to navigate the site
export default function Home() {
  const [cardInfo, setCardInfo] = useState(null);
  const [query, setQuery] = useState('');
  
  async function fetchData(query:string){
    //This returns the raw response
    const cardInfoQuery = await fetch(`/api/product_test?productId=${query}`);
    //This parses it into a more readable object
    const cardInfoQueryJson = await cardInfoQuery.json();
    setCardInfo(cardInfoQueryJson.products);
  }
  useEffect(()=>{
    fetchData(query);
    console.log(query, "the use effect");
  },[query]);
  
  const grabSearchValue = (value: string)=>{
    setQuery(value);
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
          <h2>Lorevault</h2>
          <SearchBar sendSearchValue={grabSearchValue}/>
          <Link href="/AddItem">Add Item</Link>
          <span>AccStuff</span>
        </div>
      <main className={styles.main}>
        <NavMenu/> 
        <CardTable products={cardInfo}/>
      </main>
    </>
  )
}
