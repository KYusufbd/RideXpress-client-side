import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({children}) => {

    const authInfo = {
        
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;