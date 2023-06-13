import styles from './detailedCardContent.module.css';
import {useState, useEffect} from 'react';
import Image from 'next/image';

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

    if(detailedCardInfo){
        return (
            <div className={styles.cardDetailContainer}>
            <p className={styles.fieldLabel}>Nombre: </p>
            <p className={styles.fieldContent}>{detailedCardInfo.name}</p>
            <p className={styles.fieldLabel}>Descripcion: </p>
            <p className={styles.fieldContent}>{detailedCardInfo.description}</p>
        </div>
        )
    }else{
        return(
            <div className={styles.loadingGifWrapper}>
                <Image src="/assets/loadingGear.gif" alt="A loading gif" width={250} height={250} className={styles.loadingGif}/>
            </div>
        )
    }
}

export default DetailedCardContent;