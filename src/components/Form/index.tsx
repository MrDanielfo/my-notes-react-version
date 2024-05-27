import { FC, Dispatch, SetStateAction, useState } from 'react';
import './styles.css';

interface FormProps  {
  setItems: Dispatch<SetStateAction<{id: number, title: string}[]>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const Form: FC<FormProps> = ({ setItems, setShowForm }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      const newItem = {
        id: Date.now(),
        title: inputValue
      }
      setItems((prevValue) => [...prevValue, newItem])
      setInputValue('');
    }
    // Handle the form submission logic here
  };

  return (
  <div id="formOverlay" className="overlay">
    <div className="form-container">
      <form className="item-form single-input-form" onSubmit={handleSubmit}>
        <label htmlFor="input-field" className="form-label">Add item to list:</label>
        <input
          type="text"
          id="input-field"
          className="form-input"
          value={inputValue}
          onChange={handleChange}
        />
        <div className="button-container">
          <button type="submit" className="btn btn-primary submit-btn submit-button">Add</button>
          <button onClick={() => setShowForm(false)} className="btn btn-dark cancel-btn submit-button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Form;
