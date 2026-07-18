'use client';

export default function RepeatableRows({ rows, onChange, fields, addLabel }) {
    function updateRow(index, key, value) {
        const next = rows.slice();
        next[index] = { ...next[index], [key]: value };
        onChange(next);
    }

    function removeRow(index) {
        onChange(rows.filter((_, i) => i !== index));
    }

    function addRow() {
        const empty = {};
        fields.forEach((f) => { empty[f.key] = ''; });
        onChange([...rows, empty]);
    }

    return (
        <div>
            {rows.map((row, i) => (
                <div key={i} className="admin-repeat-row">
                    <button type="button" className="admin-repeat-remove" onClick={() => removeRow(i)}>
                        Remove
                    </button>
                    {fields.map((f) => (
                        <div className="admin-field" key={f.key}>
                            <label>{f.label}</label>
                            <input
                                type={f.type || 'text'}
                                value={row[f.key] || ''}
                                onChange={(e) => updateRow(i, f.key, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
            <button type="button" className="admin-add-btn" onClick={addRow}>{addLabel}</button>
        </div>
    );
}
