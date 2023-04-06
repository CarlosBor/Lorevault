import {FC} from 'react';
import CardSnippet from '@/components/CardSnippet';

const cardInfo = [
    ["Big", "red", "2"],
    ["Small", "blue", "1"],
    ["Medium", "green", "12"]
];


const CardTable:FC = () => {
    const contents = cardInfo.map((data, index)=>{
        return <CardSnippet infoArray={data} key={index}/>
    })
    return (
        <div>
            {contents}
        </div>
    )
}

export default CardTable;