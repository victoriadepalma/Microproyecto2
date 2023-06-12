import styles from "./InputControl.module.css";
export function InputControl(props){
    return(<div className={styles.container}>
        {props.label && <label>{props.label}</label>}
        <input type={props.type ? props.type : "text"} {...props}></input>

    </div>)
}