import { useState } from "react";

interface Specs {
  specs: Record<string, string>;
}

const SpecsTable: React.FC<Specs> = ({ specs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTable = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <h2>Specifications</h2>
      <table>
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
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={toggleTable}>
        {!isExpanded ? "Expand" : "Compact"}
      </button>
    </div>
  );
};

export default SpecsTable;
