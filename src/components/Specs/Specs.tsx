import { useState } from "react";

interface Specs {
  specs: Record<string, string>;
}

const SpecsTable: React.FC<Specs> = ({ specs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTable = () => setIsExpanded(!isExpanded);

  const formatKey = (key: string) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="tws-container-column">
      <h2>Specifications</h2>
      <table className="tws-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(specs)
            .slice(0, isExpanded ? Object.entries(specs).length : 5)
            .map(([key, value]) => (
              <tr key={key}>
                <td>{formatKey(key)}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="tws-button-submit" onClick={toggleTable}>
        {!isExpanded ? "Expand" : "Compact"}
      </button>
    </div>
  );
};

export default SpecsTable;
