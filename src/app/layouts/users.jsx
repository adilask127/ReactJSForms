import React from "react";
import { useParams, useHistory } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersList";
import UserEditPage from "../components/page/userPageEdit";

const Users = () => {
    const history = useHistory();
    const isEdit = history.location.pathname.split("/")[3] === "edit";
    const params = useParams();
    const { userId } = params;
    return (
        <>
            {isEdit ? (
                <UserEditPage userId={userId} />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
