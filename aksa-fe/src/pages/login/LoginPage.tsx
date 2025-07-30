import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/forms/input";
import Button from "../../components/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="border-1 p-4 rounded-md space-y-3">
          {/* Username */}
          <Input
            type="text"
            placeholder="Type any username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          {/* Password */}
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Type any password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            suffix={
              <button
                className="cursor-pointer rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "🫣" : "😃"}
              </button>
            }
          />

          {/* Submit */}
          <Button type="submit" onClick={() => login(username, password)}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
