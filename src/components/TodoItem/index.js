import './styles.css';
import { Button } from 'primereact/button';
import {Checkbox} from "primereact/checkbox";

export function TodoItem(props) {
    const { message, onDelete } = props;

    const handleOnChange = (event) => {
        console.log(event.target.checked)
    }

    return (
          <div className="field-checkbox">
              <Checkbox inputId="binary" onChange={handleOnChange} />
              <label htmlFor="binary">{message}</label>
              <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary" aria-label="Bookmark" onClick={onDelete}/>
          </div>
    );
}