// components/AuthForm.jsx
import React from "react";

export default function AuthForm({
  fields,
  buttonText,
  onSubmit,
  footer,
}) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <input
            type={field.type}
            placeholder={field.placeholder}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              outline: "none",
            }}
          />
        </div>
      ))}

      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>

      <div style={{ marginTop: "15px", textAlign: "center" }}>{footer}</div>
    </form>
  );
}