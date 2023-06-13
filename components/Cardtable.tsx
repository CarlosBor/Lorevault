import CardSnippet from '@/components/CardSnippet';
import styles from '@/components/cardTable.module.css';

interface CardTableProps{
    cardInfo: Array<LorevaultObject> | null;
}

interface LorevaultObject{
    _id:string,
    name:string,
    description:string,
    type:string
}

const CardTable = (data: CardTableProps) => {
    const arrayData = data.cardInfo ?? [];

    const contents = arrayData?.map((data:LorevaultObject, index:number)=>{
        const cardContents = {
            _id: data._id,
            name:data.name,
            description:data.description
        }
        return <CardSnippet cardContents={cardContents} key={index}/>
    });
    
    return (
        <div className={styles.cardSnippetContainer}>
            {contents ?? ''}
        </div>
    )
}

export default CardTable;