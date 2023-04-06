import {FC} from 'react';
import NavButton from './NavButton';
import styles from './navMenu.module.css';

const categorias = ["Mapas", "Personajes", "Objetos", "Criaturas", "Hechizos", "Misc"];

const NavMenu:FC = () =>{
    return(
        <div className={styles.navMenu}>
            {categorias.map((nombre, index)=>{
                return <NavButton key={index} url={nombre}>{nombre}</NavButton>
            })}
        </div>
    )
}

export default NavMenu;