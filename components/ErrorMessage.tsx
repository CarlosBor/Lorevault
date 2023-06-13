import style from './errorMessage.module.css';


interface ErrorMessageProps{
    errorMessageText: string
}

const ErrorMessage = (errorMessage: ErrorMessageProps) =>{
    
    return(
        <div className={style.errorMessageDiv}>
            {errorMessage.errorMessageText}
        </div>
    )
}

export default ErrorMessage;