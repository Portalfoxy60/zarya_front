import { Button, Input, Text } from "@chakra-ui/react";
import Menu from "../page_elements/Menu";
import Footer from "../page_elements/Footer";
import "../App.css";
import api from "../api"
import { useState } from "react";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
}

const Login: React.FC = () => {
  const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  };
  const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData)
      const result = await login(formData);
      alert(result.accessToken);
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
          <div className="login-field">
            <label className="form-control">Почта</label>
            <Input id="email" name="email" placeholder="Почта" value={formData.email} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="form-control">Пароль</label>
            <Input id="password" name="password" placeholder="Пароль" type="password" value={formData.password} onChange={handleChange} />
          </div>
          <Button colorPalette="orange" width="100%" type="submit">Войти</Button>
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
