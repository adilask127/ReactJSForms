import React, { useState, useEffect } from "react";
import CommentComponents from "./commentComponents ";
import api from "../../../api";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const CommentsListComponent = ({ userId }) => {
    const initialData = {
        _id: "",
        userId: "",
        pageId: "",
        content: "",
        created_at: ""
    };
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const [UsersComments, setUsersComments] = useState();
    useEffect(() => {
        api.comments.fetchAll().then((data) => setUsersComments(data));
    }, []);
    const [CommentsForUser, setCommentsForUser] = useState();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            data.sort(function (x, y) {
                return y.created_at - x.created_at;
            });
            setCommentsForUser(data);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // setEmail(e.target.value);
        // console.log(e.target.name);
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Пользователь обязателен для заполнения"
            }
        },
        content: {
            isRequired: {
                message: "Текст сообщения обязателен для заполненияЫ"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const addNewComment = () => {
        if (!isValid) return;
        data.pageId = userId;
        api.comments.add(data).then((newComment) => {
            setCommentsForUser((prevState) => [newComment, ...prevState]);
            setUsersComments((prevState) => [newComment, ...prevState]);
            setData(initialData);
        });
    };
    // api.comments.add(data).then(() => {});
    // api.comments.remove(commentId).then(() => {});
    const getUserNameFromCommentsId = (id) => {
        // console.log(users.find((f) => f._id === id));
        return users.find((f) => f._id === id).name;
    };
    const getTimeTextFromComments = (timestamp) => {
        const dt = Date.now();
        const difference = dt - timestamp;
        const minutes = Math.floor(difference / 1000 / 60);
        let text = "";

        if (minutes < 1) {
            text = "1 минуту назад";
        } else if (minutes < 5) {
            text = "5 минут назад";
        } else if (minutes < 10) {
            text = "10 минут назад";
        } else if (minutes < 30) {
            text = "30 минут назад";
        } else {
            const Days = Math.floor(difference / 1000 / 60 / 60 / 24);
            const hours = Math.floor(difference / 1000 / 60 / 60);
            if (Days < 1) {
                const m = minutes - hours * 60;
                text = hours + " hours. " + m + " minutes ";
            } else if (Days < 365) {
                const month = Math.floor(difference / 1000 / 60 / 60 / 24 / 31);
                const d = Days - month * 31;
                text = d + " day. " + month + " month ";
            } else {
                const year = Math.floor(
                    difference / 1000 / 60 / 60 / 24 / 31 / 12
                );
                const month = Math.floor(difference / 1000 / 60 / 60 / 24 / 31);
                const mth = month - year * 12;
                const d = Days - month * 31;
                text = d + " day. " + mth + " month. " + year + " year ";
            }
        }

        return text;
    };
    const handleDelete = (commentId) => {
        api.comments.remove(commentId).then(() => {
            setUsersComments(
                UsersComments.filter((comment) => comment._id !== commentId)
            );
            setCommentsForUser(
                CommentsForUser.filter((comment) => comment._id !== commentId)
            );
        });
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        <SelectField
                            defaultOption="Выберите пользователя..."
                            label="От кого..."
                            name="userId"
                            value={data.userId}
                            options={users}
                            onChange={handleChange}
                            error={errors.userId}
                        />
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            rows="3"
                            value={data.content}
                            onChange={handleChange}
                            error={errors.content}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        {" "}
                        <button
                            disabled={!isValid}
                            className="btn btn-primary"
                            onClick={addNewComment}
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>

            {CommentsForUser && users && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {CommentsForUser.map((item) => (
                            <CommentComponents
                                key={item._id}
                                comment={item}
                                Name={getUserNameFromCommentsId(item.userId)}
                                timeText={getTimeTextFromComments(
                                    item.created_at
                                )}
                                content={item.content}
                                onDelete={handleDelete}
                                commentId={item._id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

CommentsListComponent.propTypes = {
    userId: PropTypes.string.isRequired,
    value: PropTypes.object
};

export default CommentsListComponent;
