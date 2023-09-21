import React, { useState } from 'react';
import styles from './dynamicForm.module.css';

//JS can't tell the formatting of a json file so data ought to be "any" type
const DynamicForm = ({data}:any) => {
  const [formData, setFormData] = useState({});

  //The event is used for different types of forms, so rather than using 3 different types for the event itself I'd rather set it as "any"
  //Updates formData when values in the fields are changed
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //A function that takes keys and data and returns the type of HTML structure to be returned, depending on Datatype.
  const renderFormField = (fieldKey:string, fieldData:any) => {
    const { Tag, Datatype, Options } = fieldData;
    switch (Datatype) {
      //String and Date fall under the same structure, only the type changes.
      case 'String':
      case 'Date':
        return (
          <div key={fieldKey} className={`${styles.parentDiv}`}>
            <label htmlFor={fieldKey} className={`${styles.label} ${styles.another}`}>{Tag}:</label>
            <input
              type={Datatype.toLowerCase()}
              name={fieldKey}
              id={fieldKey}
              onChange={handleInputChange}
              value={formData[fieldKey] || ''}
            />
          </div>
        );
      case 'Number':
        return (
          <div key={fieldKey}>
            <label htmlFor={fieldKey} className={`${styles.label}`}>{Tag}</label>
            <input
              type={Datatype.toLowerCase()}
              name={fieldKey}
              id={fieldKey}
              onChange={handleInputChange}
              value={formData[fieldKey] || ''}
            />
          </div>
        );
      case 'Radio':
        return (
          <div key={fieldKey} className={`${styles.radioDiv}`}>
            <label className={`${styles.label}`}>{Tag}</label>
            <div className={`${styles.radioContainer}`}>
            {Options.map((option:string) => (
              <label key={option}>
                <input
                  type="radio"
                  name={fieldKey}
                  value={option}
                  onChange={handleInputChange}
                  checked={formData[fieldKey] === option}
                />
                {option}
              </label>
            ))}
            </div>
          </div>
        );
      case 'Checklist':
        return (
          <div key={fieldKey}>
            <label className={`${styles.label}`}>{Tag}</label>
            {Options.map((option:string) => (
              <label key={option}>
                <input
                  type="checkbox"
                  name={fieldKey}
                  value={option}
                  onChange={handleInputChange}
                  checked={formData[fieldKey]?.includes(option) || false}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'SelectChoice':
        return (
          <div key={fieldKey}>
            <label className={`${styles.label}`}>{Tag}</label>
            <select
              name={fieldKey}
              onChange={handleInputChange}
              value={formData[fieldKey] || ''}
            >
              <option value="">Select...</option>
              {Options.map((option:string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'Header':
        return <h2 key={fieldKey}>{Tag}</h2>;
      case 'Bolded':
        return <strong key={fieldKey}>{Tag}</strong>;
      default:
        return null;
    }
  };

  const renderSection = (sectionData:any) => {
    const { Tag, Class, contents } = sectionData;
    return (
      <div key={Tag} className={styles[Class]}>
        <h1>{Tag}</h1>
        {Object.entries(contents).map(([key, value]) =>
          renderFormField(key, value)
        )}
      </div>
    );
  };

  return (
    <form className={styles.form}>
      {Object.entries(data.Secciones).map(([sectionKey, sectionData]) =>
        renderSection(sectionData)
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;