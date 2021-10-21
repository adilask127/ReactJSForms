import React from "react";
import PropTypes from "prop-types";

const SelectFieldEditPage = ({ label, value, onChange, options, error }) => {
    const handleChange = ({ target }) => {
        const valuePtofession = JSON.parse(target.value);
        onChange({ name: target.name, value: valuePtofession });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name="profession"
                onChange={handleChange}
            >
                <option value={value._id}>{value.name}</option>
                {optionsArray &&
                    optionsArray
                        .filter((f) => f.value != value._id)
                        .map((option) => (
                            <option
                                key={option.value}
                                value={JSON.stringify(option)}
                            >
                                {option.name}
                            </option>
                        ))}
                {/* {professions &&
                    Object.keys(professions).map((professionName) => (
                        <option
                            key={professions[professionName]._id}
                            selected={
                                professions[professionName]._id ===
                                data.profession
                            }
                            value={professions[professionName]._id}
                        >
                            {professions[professionName].name}
                        </option>
                    ))} */}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectFieldEditPage.propTypes = {
    label: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default SelectFieldEditPage;
