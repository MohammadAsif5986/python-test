import { useState, useEffect } from "react";
import api from "../api";
import Health from "../components/Health"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Home() {
    const [healths, setHealth] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        getHelth();
    }, []);

    const getHelth = () => {
        api
            .get("/api/health/")
            .then((res) => res.data)
            .then((data) => {
                setHealth(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteHelth = (id) => {
        api
            .delete(`/api/health/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Health Data deleted!");
                else alert("Failed to delete health Data.");
                getHelth();
            })
            .catch((error) => alert(error));
    };

    const createHelth = (e) => {
        e.preventDefault();
        api
            .post("/api/health/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Health Data created!");
                else alert("Failed to make note.");
                getHelth();
            })
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout} style={{backgroundColor:'red',color:'white',height:'40px',borderRadius:'3px',border:'none'}}>Logout</button>
            <div>
                <h2>Healths Data</h2>
                {healths.map((health) => (
                    <Health health={health} onDelete={deleteHelth} key={health.id} />
                ))}
            </div>
            <h2>Create a Health Data</h2>
            <form onSubmit={createHelth}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
