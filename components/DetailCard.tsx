import styles from './detailCard.module.css';

//By defining an interface in this manner (var? notation) I explicitly state that the var might not be defined at this point
//Part of error handling.
interface ParentComponentProps {
    children?: React.ReactNode,
    toggleFullView:Function
  }

const DetailCard: React.FC<ParentComponentProps> = ({children, toggleFullView}) => {

    const dismiss = () =>{
        toggleFullView();
    }

    const dismissCard = (event: React.MouseEvent<HTMLDivElement>) =>{
        if(event.currentTarget != event.target ) return;
        dismiss();
    }

    const dismissCardX = (event: React.MouseEvent<HTMLButtonElement>) =>{
        if(event.currentTarget != event.target ) return;
        dismiss();
    }

    return (
        <div className={styles.screenCover} onClick={dismissCard}>
            <div className={styles.childDivCard}>
                <button onClick={dismissCardX}>X</button>
                <div className={styles.childDivContainer}>
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default DetailCard;