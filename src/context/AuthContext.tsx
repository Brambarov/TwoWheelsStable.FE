import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  href: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (href: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [href, setHref] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      const expirationTime = decodedToken.exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();

      if (timeUntilExpiration <= 0) {
        logout();
      } else {
        setTimeout(() => {
          logout();
        }, timeUntilExpiration);
      }
    }
  }, [accessToken]);

  const login = (href: string, accessToken: string) => {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime <= currentTime) {
      return;
    }

    setHref(href);
    setAccessToken(accessToken);
    localStorage.setItem("userId", href);
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = () => {
    setHref(null);
    setAccessToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        href: href,
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
