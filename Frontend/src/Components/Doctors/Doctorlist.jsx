import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doctorlist = () => {
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        const doctorDetail = async () => {
            const response = await axios.get("http://localhost:8080/api/user/doctor");
            console.log(response);
            setDoctor(response.data);
        };
        doctorDetail();
    }, []);

    const deleteUser = async (id) => {
        try {
            console.log(id);
            await axios.delete(`http://localhost:8080/api/user/${id}`);
            setDoctor(doctor.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };
    

    return (
        <div style={{ height: "70vh", marginTop: "30px", margin: "20px" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "40px",
                backgroundColor: " rgb(254,143,75)",
                padding: "20px",
            }}>
                <li style={{
                    listStyle: "none",
                    color: "white"
                }}>Name</li>
                <li style={{
                    listStyle: "none",
                    color: "white"
                }}>Email</li>
                <li style={{
                    listStyle: "none",
                    color: "white"
                }}>Phone Number</li>
            </div>
            {
                doctor.map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "7px",
                        backgroundColor: "#D5DDE1",
                        padding: "8px",
                    }}>
                        <h1>{item.UniqueId}</h1>
                        <h1>{item.name}</h1>
                        <h1>{item.email}</h1>
                        <h1>{item.phone}</h1>
                        <button
                            style={{ color: "white", backgroundColor: "orange", padding: '6px', borderRadius: "20px" }}
                            onClick={() => deleteUser(item.UniqueId)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default Doctorlist;
