import {FC} from 'react';
import NavButton from './NavButton';
import styles from './navMenu.module.css';

const categorias = ["Mapas", "Personajes", "Objetos", "Criaturas", "Hechizos", "Misc"];

const NavMenu:FC = () =>{
    const menuCategorias = categorias.map((nombre, index)=>{
        return <NavButton key={index} url={nombre}>{nombre}</NavButton>
    });
    
    return(
        <div className={styles.navMenu}>
            {menuCategorias}
        </div>
    )
}

export default NavMenu;