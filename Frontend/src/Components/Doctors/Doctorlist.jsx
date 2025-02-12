import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Doctor.css";  // Import the CSS file
import Header from '../navbar/Header';

const Doctorlist = () => {
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        const doctorDetail = async () => {
            try {
                const token = localStorage.getItem("token"); 
                const response = await axios.get("http://localhost:8080/api/user/doctor", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setDoctor(response.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error.response?.data || error.message);
            }
        };
    
        doctorDetail();
    }, []);
    

    const deleteUser = async (id) => {
        try {
            console.log(id);
            const token = localStorage.getItem("token"); 
            await axios.delete(`http://localhost:8080/api/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            setDoctor(doctor.filter((item) => item.UniqueId !== id));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    return (
        <>
        <Header/>
        <div className="doctor-list-container">
            <div className="doctor-list-header">
                <li>Name</li>
                <li>Email</li>
                <li>Phone Number</li>
                <li>Action</li>
            </div>
            {
                doctor.map((item, index) => (
                    <div key={index} className="doctor-card">
                        <h1>{item.name}</h1>
                        <h1>{item.email}</h1>
                        <h1>{item.phone}</h1>
                        <button className="delete-button" onClick={() => deleteUser(item.UniqueId)}>
                            Delete
                        </button>
                    </div>
                ))
            }
        </div>
        </>
    );
};

export default Doctorlist;
