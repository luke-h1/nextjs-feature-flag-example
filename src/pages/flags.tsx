import fetcher from "@frontend/util/fetcher";
import { useState } from "react";
import useSWR from "swr";

export default function Flags() {
  const { data: flags, error, mutate } = useSWR("/api/flags", fetcher);
  const [newFlag, setNewFlag] = useState("");

  if (error) {
    return <p>Sorry, failed to fetch</p>;
  }

  if (!flags) {
    return <p>loading</p>;
  }

  return (
    <div className="flags">
      <h1>Flags</h1>

      <ul>
        {Object.entries(flags).map(([key, value]) => (
          <li key={key}>
            <span
              style={{
                alignContent: "left",
              }}
            >
              {key} - {value ? <p>Enabled ✅</p> : <p>Disabled ❌</p>}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {value ? (
                <button
                  style={{
                    background: "red",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    marginRight: "1rem",
                  }}
                  onClick={async () => {
                    await fetch(`/api/flags/${key}/disable`);
                    mutate();
                  }}
                >
                  Flag is enabled. Click to disable
                </button>
              ) : (
                <button
                  style={{
                    background: "green",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    marginRight: "1rem",
                  }}
                  onClick={async () => {
                    await fetch(`/api/flags/${key}/enable`);
                    mutate();
                  }}
                >
                  Flag is disabled. Click to enable
                </button>
              )}

              <button
                onClick={async () => {
                  await fetch(`/api/flags/${key}/delete`);
                  mutate();
                }}
                style={{
                  background: "black",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "5px",
                }}
              >
                Delete feature flag
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(`/api/flags/${newFlag}/enable`);
          mutate();
          setNewFlag("");
        }}
      >
        <input
          type="text"
          required
          value={newFlag}
          onChange={(e) => setNewFlag(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* sticky footer */}
      <footer style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <button
          style={{
            background: "blue",
            color: "white",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          onClick={async () => {
            await fetch(`/api/flags/flush`);
            mutate();
          }}
        >
          Flush redis
        </button>
      </footer>
    </div>
  );
}
