import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken as apiRefreshToken } from "../api";

interface AuthContextType {
  userHref: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (userHref: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userHref, setUserHref] = useState<string | null>(
    localStorage.getItem("userHref")
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await apiRefreshToken({ refreshToken });
      const newAccessToken = response.data.accessToken;

      const decodedToken = jwtDecode<DecodedToken>(newAccessToken);
      const expirationTime = decodedToken.exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();

      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);

      setTimeout(() => {
        refreshAccessToken();
      }, timeUntilExpiration - 60000);
    } catch (err) {
      console.error("Failed to refresh token!", err);
      logout();
    }
  };

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      const expirationTime = decodedToken.exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();

      if (timeUntilExpiration <= 0) {
        refreshAccessToken();
      } else {
        setTimeout(() => {
          refreshAccessToken();
        }, timeUntilExpiration - 60000);
      }
    }
  }, [accessToken]);

  const login = (
    userHref: string,
    accessToken: string,
    refreshToken: string
  ) => {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime <= currentTime) {
      return;
    }

    setUserHref(userHref);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("userHref", userHref);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUserHref(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("userHref");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        userHref: userHref,
        accessToken: accessToken,
        refreshToken: refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider!");
  }

  return context;
};
