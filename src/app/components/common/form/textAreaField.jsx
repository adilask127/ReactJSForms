import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, rows, onChange, error, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={handleChange}
                className={getInputClasses()}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    rows: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextAreaField;
