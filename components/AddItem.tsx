import {useEffect} from 'react';
import styles from './addItem.module.css';

const AddItem = () =>{
    //In the simplest form, this would go ahead and grab info from those fields and just chuck it into the database
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        //This grabs all the data from the forms and puts it in a special object meant to be used for sending
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        sendData(formDataObject);
    }

    async function sendData(payload:object){
        //This returns the raw response
        const cardInfoQuery = await fetch(`/api/addEntryToCollection`, {
            method: "POST",
            body: JSON.stringify(payload)
        });
      }

    return (
        <div className={styles.addItemContainer}>
            <form onSubmit={handleSubmit} className={styles.addItemForm}>
                <label>Categoria:
                    <select name="categories" id="categories">
                        <option value="Mapas">Mapas</option>
                        <option value="Personajes">Personajes</option>
                        <option value="Objetos">Objetos</option>
                        <option value="Criaturas">Criaturas</option>
                        <option value="Hechizos">Hechizos</option>
                        <option value="Misc">Misc</option>
                    </select>
                </label>
                <label>Nombre: 
                    <input type="text" name="name" id="name" />
                </label>
                <label>Descripcion:<textarea name="description" id="description" cols={30} rows={10}></textarea>
                </label>
                <button type="submit" value="Enviar Contenido">Añadir</button>
            </form>
        </div>
    )
}

export default AddItem;