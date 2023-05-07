import styles from './cardSnippet.module.css';

interface CardSnippetProps{
    infoArray:Array<String>
}

const CardSnippet=(props:CardSnippetProps) => {
    console.log(props, "From CardSnippet");
    const contents=props.infoArray.map((data,index)=>{
        return <p key={index}>{data}</p>
    });
    
    return <div>{contents}</div>
}

export default CardSnippet;