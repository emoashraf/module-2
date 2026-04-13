// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [role, setRole] = useState("user");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   useEffect(() => {
//     const adminData = {
//       username: "sanjai",
//       password: btoa("sanjai@123"),
//       role: "admin"
//     };

//     localStorage.setItem("admin", JSON.stringify(adminData));
//     console.log("✅ Admin set successfully");
//   }, []);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       toast.error("Please fill all fields ❗");
//       return;
//     }
//     if (role === "admin") {
//       const storedAdmin = JSON.parse(localStorage.getItem("admin"));

//       if (!storedAdmin) {
//         toast.error("Admin data missing ❌");
//         return;
//       }

//       if (
//         username === storedAdmin.username &&
//         password === atob(storedAdmin.password)
//       ) {
//         toast.success("Admin Login Success ✅", {
//             onClose: () => navigate("/admin/dashboard") 

//         });
//       } else {
//         toast.error("Invalid Admin Credentials ❌");
//       }
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ username, password })
//       });

//       const result = await res.json();

//       if (result.status === "success") {
//         const userData = {
//           name: result.name || username,
//           email: result.email || `${username}@mail.com`,
//           role: "user"
//         };

//         localStorage.setItem("user", JSON.stringify(userData));

//         toast.success("Login successful ✅", {
//           onClose: () => navigate("/app/dashboard")
//         });
//       } else {
//         toast.error("Invalid username or password ❌");
//       }
//     } catch {
//       toast.error("Server error ❌");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-wrapper">
//         <div className="toggle">
//           <span
//             className={role === "user" ? "active" : ""}
//             onClick={() => setRole("user")}
//           >
//             User
//           </span>

//           <span
//             className={role === "admin" ? "active" : ""}
//             onClick={() => setRole("admin")}
//           >
//             Admin
//           </span>
//         </div>

//         <div className="login-container">
//           <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>

//           <input
//             type="text"
//             placeholder={role === "admin" ? "Admin Username" : "Username"}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder={role === "admin" ? "Admin Password" : "Password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div className="options-row">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={() => setRemember(!remember)}
//               />
//               Remember Me
//             </label>

//             <span
//               className="forgot"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </span>
//           </div>

//           <button onClick={handleLogin}>
//             {role === "admin" ? "Admin Login" : "Login"}
//           </button>

//           {role === "user" && (
//             <p className="bottom-text">
//               New user?{" "}
//               <span onClick={() => navigate("/register")}>
//                 Register
//               </span>
//             </p>
//           )}
//         </div>

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           closeButton={false}
//           pauseOnHover={false}
//           draggable={false}
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const adminData = {
      username: "sanjai",
      password: btoa("sanjai@123"),
      role: "admin",
    };

    localStorage.setItem("admin", JSON.stringify(adminData));
    console.log("✅ Admin set successfully");
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill all fields ❗");
      return;
    }

    // 🔥 ADMIN LOGIN
    if (role === "admin") {
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));

      if (!storedAdmin) {
        toast.error("Admin data missing ❌");
        return;
      }

      if (
        username === storedAdmin.username &&
        password === atob(storedAdmin.password)
      ) {
        toast.success("Admin Login Success ✅", {
          onClose: () => navigate("/admin/dashboard"),
        });
      } else {
        toast.error("Invalid Admin Credentials ❌");
      }
      return;
    }

    // 🔥 USER LOGIN
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (result.status === "success") {
        const userData = {
          name: result.name || username,
          email: result.email || `${username}@mail.com`,
          role: "user",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Login successful ✅", {
          onClose: () => navigate("/app/dashboard"),
        });
      } else {
        toast.error("Invalid username or password ❌");
      }
    } catch {
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* ROLE TOGGLE */}
        <div className="toggle">
          <span
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </span>

          <span
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </span>
        </div>

        <div className="login-container">
          <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>

          <input
            type="text"
            placeholder={role === "admin" ? "Admin Username" : "Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder={role === "admin" ? "Admin Password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* OPTIONS */}
          <div className="options-row">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember Me
            </label>

            {/* 🔥 ONLY USER CAN SEE FORGOT PASSWORD */}
            {role === "user" && (
              <span
                className="forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            )}
          </div>

          <button onClick={handleLogin}>
            {role === "admin" ? "Admin Login" : "Login"}
          </button>

          {role === "user" && (
            <p className="bottom-text">
              New user?{" "}
              <span onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          )}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeButton={false}
          pauseOnHover={false}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default Login;


