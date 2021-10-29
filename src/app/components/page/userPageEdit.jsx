import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";
import SelectFieldEditPage from "../common/form/selectFieldEditPage";
import RadioField from "../common/form/radioField";
import MultiSelectFieldEditPage from "../common/form/multiSelectFieldEditPage";

const UserEditPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: {},
        sex: "male",
        qualities: []
    });

    useEffect(() => {
        api.users.getById(userId).then((userById) => setUser(userById));
    }, []);
    useEffect(() => {
        if (user) {
            const newData = {
                name: user.name,
                email: user.email || "",
                profession: user.profession,
                sex: user.sex,
                qualities: user.qualities
            };
            setData(newData);
        }
    }, [user]);

    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите полное имя"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const returnToUserPage = () => {
        api.users.update(userId, data).then(() => {
            history.push(`/users/${userId}`);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users.update(userId, data).then(() => {
            history.push(`/users/${userId}`);
        });
    };
    return (
        <>
            {data && (
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-start">
                            <button
                                className="btn btn-primary"
                                onClick={returnToUserPage}
                            >
                                <i className="bi bi-caret-left"></i>
                                Назад
                            </button>
                        </div>
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectFieldEditPage
                                    label="Выберите свою профессию"
                                    value={data.profession}
                                    options={professions}
                                    onChange={handleChange}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectFieldEditPage
                                    defaultValue={data.qualities}
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditPage;
