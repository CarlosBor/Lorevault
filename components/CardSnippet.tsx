
interface CardSnippetProps{
    infoArray:Array<String>
}

const CardSnippet=(props:CardSnippetProps) => {
    const contents=props.infoArray.map((data,index)=>{
        return <p key={index}>{data}</p>
    })
    return <div>{contents}</div>
}

export default CardSnippet;