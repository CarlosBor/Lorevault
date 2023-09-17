import React, { useState } from 'react';

//JS can't tell the formatting of a json file so data ought to be "any" type
const DynamicForm = ({data}:any) => {
  const [formData, setFormData] = useState({});

  //The event is used for different types of forms, so rather than using 3 different types for the event itself I'd rather set it as "any"
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderFormField = (fieldKey:string, fieldData:any) => {
    const { Tag, Datatype, Options } = fieldData;
    switch (Datatype) {
      case 'String':
      case 'Date':
      case 'Number':
        return (
          <div key={fieldKey}>
            <label htmlFor={fieldKey}>{Tag}</label>
            <input
              type={Datatype.toLowerCase()}
              name={fieldKey}
              id={fieldKey}
              onChange={handleInputChange}
              value={formData[fieldKey] || ''}
            />
          </div>
        );
      case 'Boolean':
        return (
          <div key={fieldKey}>
            <label>{Tag}</label>
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
        );
      case 'Checklist':
        return (
          <div key={fieldKey}>
            <label>{Tag}</label>
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
            <label>{Tag}</label>
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
    const { Tag, contents } = sectionData;
    return (
      <div key={Tag}>
        <h1>{Tag}</h1>
        {Object.entries(contents).map(([key, value]) =>
          renderFormField(key, value)
        )}
      </div>
    );
  };

  return (
    <form>
      {Object.entries(data.Secciones).map(([sectionKey, sectionData]) =>
        renderSection(sectionData)
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;