import styles from './parsedForm.module.css';
import theFile from '@/public/assets/DiagForm.json';
import StringQuestion from '@/components/formComponents/StringQuestion';

function recursivelyIterateKeys(obj:any) {
    for (const key in obj) {
        // Check if the value of the key is an object (nested object)
        if(obj.hasOwnProperty("Datatype")){
            //This means it ought to be rendered
            console.log("A string question");
            return <StringQuestion/>
        }
        if(obj.hasOwnProperty("contents")){
            //This means it's a section, ought to render the Tag
            console.log(obj.Tag)
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            recursivelyIterateKeys(obj[key]); // Recursively call the function for nested objects
        }
    }
  }



const ParsedForm = () =>{
    return(
        <div>
            {recursivelyIterateKeys(theFile)}
        </div>
    )
}

export default ParsedForm;