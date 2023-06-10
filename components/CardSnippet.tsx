import styles from './cardSnippet.module.css';

interface CardSnippetProps{
    cardContents:CardContents,
}

interface CardContents{
    name:String,
    description:String
}

const CardSnippet = (props:CardSnippetProps) => {
    //Array [ "This a map", "This is, indeed, a map" ]
    console.log(props);
        let description = props.cardContents.description;
        if(description.length>200){
            description = description.substring(0,200)+"...";
        }

        return (
            <div className={styles.cardSnippet}>
                <h4 className={styles.cardSnippetName}>{props.cardContents.name}</h4>
                <p>{description}</p>
            </div>
        );
    
}

export default CardSnippet;