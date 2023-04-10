import {useEffect} from 'react';

const AddItem = () =>{
    //In the simplest form, this would go ahead and grab info from those fields and just chuck it into the database
    const handleSubmit = () => {

    }

    async function sendData(payload:object){
        //This returns the raw response
        const cardInfoQuery = await fetch(`/api/addEntryToCollection`, {
            method: "POST",
            body: JSON.stringify({
                //Here goes the object
            }),
        });
        console.log(cardInfoQuery);
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="infoType" id="infoType">
                    <option value="Mapas">Mapas</option>
                    <option value="Personajes">Personajes</option>
                    <option value="Objetos">Objetos</option>
                    <option value="Criaturas">Criaturas</option>
                    <option value="Hechizos">Hechizos</option>
                    <option value="Misc">Misc</option>
                </select>
                <input type="text" name="name" id="name" />
                <textarea name="description" id="description" cols={30} rows={10}></textarea>
                <input type="submit" value="Enviar Contenido" />
            </form>
        </div>
    )
}

export default AddItem;