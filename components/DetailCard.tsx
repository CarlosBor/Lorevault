import styles from './detailCard.module.css';

interface ParentComponentProps {
    children?: React.ReactNode,
    toggleFullView:Function
  }

const DetailCard = ({children, toggleFullView}: ParentComponentProps) => {

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
                <button className={styles.dismissButton} onClick={dismissCardX}>X</button>
                <div className={styles.childDivContainer}>
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default DetailCard;