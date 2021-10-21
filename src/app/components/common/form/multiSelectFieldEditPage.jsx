import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectFieldEditPage = ({
    options,
    onChange,
    name,
    label,
    defaultValue
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
                  color: options[optionName].color
              }))
            : options;
    const handleChange = (value) => {
        const valueIds = value.map((m) => m.value);
        value = optionsArray
            .filter((f) => valueIds.includes(f.value))
            .map((m) => ({
                name: m.label,
                _id: m.value,
                color: m.color
            }));
        onChange({ name: name, value });
    };

    const defaultValueArray = () => {
        const defaultValueIds = defaultValue.map((m) => m._id);
        const newItems = optionsArray.filter((f) =>
            defaultValueIds.includes(f.value)
        );
        return newItems;
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                value={defaultValueArray()}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectFieldEditPage.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectFieldEditPage;
