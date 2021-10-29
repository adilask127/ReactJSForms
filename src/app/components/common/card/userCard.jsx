import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const CardUser = ({ userId, userName, professionName, rate }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="
            position-absolute
            top-0
            end-0
            btn btn-light btn-sm
        "
                    onClick={handleClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div
                    className="
            d-flex
            flex-column
            align-items-center
            text-center
            position-relative
        "
                >
                    <img
                        src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{userName}</h4>
                        <p className="text-secondary mb-1">{professionName}</p>
                        <div className="text-muted">
                            <i
                                className="
                        bi bi-caret-down-fill
                        text-primary
                    "
                                role="button"
                            ></i>
                            <i
                                className="
                        bi bi-caret-up
                        text-secondary
                    "
                                role="button"
                            ></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CardUser.propTypes = {
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    professionName: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
};

export default CardUser;
