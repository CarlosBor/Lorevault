import styles from './detailCard.module.css';
import {useState, useEffect} from 'react';

//By defining an interface in this manner (var? notation) I explicitly state that the var might not be defined at this point
//Part of error handling.
interface ParentComponentProps {
    children?: React.ReactNode;
    id:string,
    toggleFullView:Function
  }

const DetailCard: React.FC<ParentComponentProps> = ({children, id, toggleFullView}) => {
    const [detailedCardInfo, setDetailedCardInfo] = useState();


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

    const dismiss = () =>{
        toggleFullView();
    }

    const dismissCard = (event: React.MouseEvent<HTMLDivElement>) =>{
        if(event.currentTarget != event.target ) return;
        dismiss();
    }

    const dismissCardX = (event: React.MouseEvent<HTMLButtonElement>) =>{
        if(event.currentTarget != event.target ) return;
        dismiss();
    }

    return (
        <div className={styles.screenCover} onClick={dismissCard}>
            <div className={styles.childDivCard}>
                <button onClick={dismissCardX}>X</button>
                <div className={styles.childDivContainer}>
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default DetailCard;