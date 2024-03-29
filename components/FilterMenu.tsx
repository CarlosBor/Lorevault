import styles from './filterMenu.module.css';
import { useState, useEffect} from 'react';

interface FilterMenuProps{
    sendFilteredArray: (Function);
    checkboxInit: (string | undefined)[];
}

const categorias = ["Clientes", "Proveedores", "Incidencias", "Misc"];

const FilterMenu = (props:FilterMenuProps) =>{
    const [checkedState, setCheckedState] = useState(
        new Array(categorias.length).fill(false)
    );
    const [filteredArray, setFilteredArray] = useState<string[]>();
    let proppedSendFilteredArray = props.sendFilteredArray;

    useEffect(()=>{
        setFilteredArray(filterCategories(categorias, checkedState));
    }, [checkedState])

    useEffect(()=>{
        proppedSendFilteredArray(filteredArray);
    }, [filteredArray, proppedSendFilteredArray])

    useEffect(()=>{
        let checkboxInitArray = new Array(categorias.length).fill(false);
        for(let i=0; i<props.checkboxInit.length;i++){
            if (typeof props.checkboxInit[i] == "string"){
               checkboxInitArray[categorias.indexOf(props.checkboxInit[i] as string)] = true;
            }
        }
        setCheckedState(checkboxInitArray);
    },[props.checkboxInit])

    //Esto tiene que ser un useEffect en lugar de esta desgracia
    const filterCategories = (catArray:string[], boolArray:boolean[]) => {
        let filteredArray = [];
        for (let i=0; i<catArray.length; i++){
            if (boolArray[i]){
                filteredArray.push(catArray[i]);
            }
        }
        return filteredArray;
    }

    //Hay que bubblear al componente padre un array que sea el array categorias con los elementos en los que el otro array son positivos
    // https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    const handleFilterChange = (position:number) =>{
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const menuCategorias = categorias.map((nombre, index)=>{
        return (<label key={index}>
        <input type="checkbox" className={styles.checkBoxes} checked={checkedState[index]} onChange={() => handleFilterChange(index)} key={index}/>{nombre}</label>
        )
    });
    
    return(
        <div className={styles.navMenu}>
            {menuCategorias}
        </div>
    )
}

export default FilterMenu;