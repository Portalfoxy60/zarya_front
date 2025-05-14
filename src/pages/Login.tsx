import { Button, Input, Text } from "@chakra-ui/react";
import Menu from "../page_elements/Menu";
import Footer from "../page_elements/Footer";
import "../App.css";
import api from "../api"
import { useState } from "react";
import { useAuth } from "../auth/UseAuth";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
}

const Login: React.FC = () => {
const { user, login, logout } = useAuth();
const loginRequest = async (data: LoginRequest) => {
  try{
    await api.post<LoginResponse>('/auth/login', data);
    const response = await api.get('/auth/me')
    login(response.data)
  } catch(error) {
    console.error('Ошибка логина', error)
    logout();
  }
};
  const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginRequest(formData);
    } catch (error: any) {
      alert(error.response?.data?.accessToken || 'Login error');
    }
  };
  return (
    <>
      <Menu />
      <main className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2 className="form-legend">Войти в аккаунт</h2>
          <div>
            <label className="form-control">Почта</label>
            <Input id="email" name="email" placeholder="Почта" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="form-control">Пароль</label>
            <Input id="password" name="password" placeholder="Пароль" type="password" value={formData.password} onChange={handleChange} />
          </div>
          <Button type="submit" colorPalette="orange" size="sm" fontWeight="bold" fontSize="12px" width="full">Войти</Button>
          <Text className="login-link">
            Нет аккаунта? Зарегистрируйтесь!
          </Text>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
