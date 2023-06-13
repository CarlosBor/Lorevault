import styles from './cardSnippet.module.css';
import {useState} from 'react';
import DetailCard from '@/components/DetailCard';
import DetailedCardContent from '@/components/DetailedCardContent';

interface CardSnippetProps{
    cardContents:CardContents,
}

interface CardContents{
    _id: string,
    name:String,
    description:String
}

const CardSnippet = (props:CardSnippetProps) => {

    const [fullView, setFullView] = useState(false);
    
    const toggleFullView = () =>{
        setFullView(!fullView);
    }

    const id = props.cardContents._id;
        let description = props.cardContents.description;
        if(description.length>200){
            description = description.substring(0,200)+"...";
        }

        return (
            <>
            <div onClick={toggleFullView} className={styles.cardSnippet}>
                <h4 className={styles.cardSnippetName}>{props.cardContents.name}</h4>
                <p>{description}</p>
            </div>
            {fullView && <DetailCard toggleFullView={toggleFullView}>
                    <DetailedCardContent id={id}/>
                </DetailCard>}
            </>
        );
    
}

export default CardSnippet;