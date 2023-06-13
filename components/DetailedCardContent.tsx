import styles from './detailedCardContents.module.css';
import {useState, useEffect} from 'react';

interface DetailedCardContentProps {
    id:string,
  }

interface DetailedCardInfo{
    _id: string,
    name: string,
    description: string
}

const DetailedCardContent: React.FC<DetailedCardContentProps> = ({id}) => {

    const [detailedCardInfo, setDetailedCardInfo] = useState<DetailedCardInfo>();
    
    const fetchData = async (query:string) => {
        //This returns the raw response
        console.log(query);
        const cardInfoQuery = await fetch(`/api/queryLorevaultId?_id=${query}`);
        //This is a query with a search parameter, for future reference
        //    const cardInfoQuery = await fetch(`/api/queryLorevault?productId=${query}`);
        //This parses it into a more readable object
        const cardInfoQueryJson = await cardInfoQuery.json();
        console.log(cardInfoQueryJson);
        //It crashes. The problem is that reactjs doesn't play well with using objects in useState
        setDetailedCardInfo(cardInfoQueryJson);
      }
      
    useEffect(()=>{
        fetchData(id);
    },[id])

    return (
        <div>
            <p>{detailedCardInfo && detailedCardInfo.name}</p>
            <p>{detailedCardInfo && detailedCardInfo.description}</p>
        </div>
    )
}

export default DetailedCardContent;