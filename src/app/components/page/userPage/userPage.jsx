import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import CardMeetings from "../../common/card/meetingsCard";
import CardQuality from "../../common/card/qualitiesCard";
import CardUser from "../../common/card/userCard";
import CommentsListComponent from "../../common/card/commentsListComponent";
// import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    // const handleClick = () => {
    //     history.push(`/users/${userId}/edit`);
    // };
    // const handleClick = () => {
    //     history.push("/users");
    // };
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <CardUser
                            userId={user._id}
                            userName={user.name}
                            professionName={user.profession.name}
                            rate={user.rate}
                        />
                        <CardQuality qualities={user.qualities} />
                        <CardMeetings
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <CommentsListComponent userId={user._id} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
