import { useState } from "react";

const SpecsTable: React.FC<{ specs: any }> = ({ specs }) => {
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
            .slice(0, isExpanded ? specs.length : 5)
            .map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{"TEST"}</td>
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
