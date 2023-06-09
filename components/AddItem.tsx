import {useState} from 'react';
import styles from './addItem.module.css';

const AddItem = () =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    //Two-Way data binding
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name);
    };

    const descriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        console.log(description);
    }

    const handleValidation = () => {
        let validStatus = true;
        if(name==""){
            setNameError("El campo nombre no puede estar vacio.");
            validStatus = false;
        }
        if(description==""){
            setDescriptionError("El campo descripcion no puede estar vacio.");
            validStatus = false;
        }
        return validStatus;
    }

    //In the simplest form, this would go ahead and grab info from those fields and just chuck it into the database
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if(handleValidation()){
            console.log("Validation happens");
            return;
        }
        //This grabs all the data from the forms and puts it in a special object meant to be used for sending
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        sendData(formDataObject);
    }

    async function sendData(payload:object){
        //Raw response is assigned to cardInfoQuery
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
                <label><p>Nombre:</p>
                    {nameError && <p>{nameError}</p>}
                    <input type="text" name="name" id="name" value={name} onChange={nameChangeHandler} required/>
                </label>
                <label><p>Descripcion:</p>
                    {descriptionError && <p>{descriptionError}</p>}
                    <textarea name="description" id="description" cols={30} rows={10} value={description} onChange={descriptionChangeHandler} required></textarea>
                </label>
                <button type="submit" value="Enviar Contenido">Añadir</button>
            </form>
        </div>
    )
}

export default AddItem;