import {FC} from 'react';
import CardSnippet from '@/components/CardSnippet';

interface CardTableProps{
    products: Array<Array<any>> | null;
}

const CardTable = (data: CardTableProps) => {
    const arrayData = data.products ?? [];
    const contents = arrayData?.map((data:any, index:any)=>{
        return <CardSnippet infoArray={[data.storeLocation, data.purchaseMethod]} key={index}/>
    });

    return (
        <div>
            {contents ?? ''}
        </div>
    )
}

export default CardTable;