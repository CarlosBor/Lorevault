import {FC} from 'react';
import CardSnippet from '@/components/CardSnippet';

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
            name:data.name,
            description:data.description
        }

        return <CardSnippet cardContents={cardContents} key={index}/>
    });
    
    return (
        <div>
            {contents ?? ''}
        </div>
    )
}

export default CardTable;