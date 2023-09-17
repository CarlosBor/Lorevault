import {useState} from 'react';
import styles from './addItem.module.css';
import diagForm from '@/public/assets/DiagForm.json';

const AddItem = () =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    //Two-Way data binding
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const descriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
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
        if(!handleValidation()){
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
            <form className={styles.addItemForm} onSubmit={handleSubmit}>
                <label>Categoria:
                    <select className={styles.inputField} name="categories" id="categories">
                        <option value="Clientes">Clientes</option>
                        <option value="Proveedores">Proveedores</option>
                        <option value="Incidencias">Incidencias</option>
                        <option value="Misc">Misc</option>
                    </select>
                </label>
                <label>Nombre:
                    {nameError && <p>{nameError}</p>}
                </label>
                    <input className={styles.inputField} type="text" name="name" id="name" value={name} onChange={nameChangeHandler} placeholder="Nombre" required/>
                <label>Descripcion:
                    {descriptionError && <p>{descriptionError}</p>}
                </label>
                    <textarea className={styles.inputField} name="description" id="description" cols={30} rows={10} value={description} onChange={descriptionChangeHandler} placeholder="Escriba aqui una descripcion" required></textarea>

                <button className={styles.sendFormButton} type="submit" value="Enviar Contenido">Añadir</button>
            </form>
        </div>
    )
}

export default AddItem;