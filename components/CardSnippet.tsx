import styles from './cardSnippet.module.css';
import {useState} from 'react';
import DetailCard from '@/components/DetailCard';

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
        console.log("this fires");
        setFullView(!fullView);    
    }

    //Array [ "This a map", "This is, indeed, a map" ]
    //This is the id in mongoDB for this element
    const id = props.cardContents._id;

    console.log(props);
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
            {fullView && <DetailCard id={id} toggleFullView={toggleFullView}></DetailCard>}
            </>
        );
    
}

export default CardSnippet;