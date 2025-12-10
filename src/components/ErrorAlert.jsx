export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        background: "#7f1d1d",
        borderRadius: "8px",
        padding: "8px 10px",
        fontSize: "14px",
        marginBottom: "12px"
      }}
    >
      {message}
    </div>
  );
}
