import React from "react";
import "../styles/Health.css"

function Health({ health, onDelete }) {
    const formattedDate = new Date(health.created_at).toLocaleDateString("en-US")

    return (
        <div className="health-container">
            <p className="health-title">{health.title}</p>
            <p className="health-content">{health.content}</p>
            <p className="health-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(health.id)}>
                Delete
            </button>
        </div>
    );
}

export default Health
