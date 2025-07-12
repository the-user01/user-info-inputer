import { useState } from "react";
import Swal from "sweetalert2";

const UserForm = () => {

    const [formFields, setFormFields] = useState([{ id: 1, inputValue: "", selectValue: "" }])
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [displayedFormData, setDisplayedFormData] = useState([])

    const addField = () => {
        const newId = Math.max(...formFields.map((field) => field.id)) + 1
        setFormFields([...formFields, { id: newId, inputValue: "", selectValue: "" }])
    }

    const deleteField = (id) => {
        if (formFields.length > 1) {
            setFormFields(formFields.filter((field) => field.id !== id))
            const newErrors = { ...errors }
            delete newErrors[`input-${id}`]
            delete newErrors[`select-${id}`]
            setErrors(newErrors)
        }
    }

    const handleInputChange = (id, value) => {
        setFormFields(formFields.map((field) => (field.id === id ? { ...field, inputValue: value } : field)))
        if (errors[`input-${id}`]) {
            setErrors({ ...errors, [`input-${id}`]: "" })
        }
    }

    const handleSelectChange = (id, value) => {
        setFormFields(formFields.map((field) => (field.id === id ? { ...field, selectValue: value } : field)))
        if (errors[`select-${id}`]) {
            setErrors({ ...errors, [`select-${id}`]: "" })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        formFields.forEach((field) => {
            if (!field.inputValue.trim()) {
                newErrors[`input-${field.id}`] = "This field is required"
            }
            if (!field.selectValue) {
                newErrors[`select-${field.id}`] = "Please select an option"
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (validateForm()) {
            setDisplayedFormData([...formFields])
            Swal.fire({
                title: "Success",
                text: "Informatrion submitted successfully",
                icon: "success"
            });
        }
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 bg-white">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Dynamic User Information Form</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formFields.map((field, index) => (
                        <div key={field.id} className="space-y-2">
                            <div className="flex items-start gap-4">
                                {/* Input Field */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder={`Enter information ${index + 1}`}
                                        value={field.inputValue}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`input-${field.id}`] ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors[`input-${field.id}`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`input-${field.id}`]}</p>
                                    )}
                                </div>

                                {/* Select Field */}
                                <div className="flex-1">
                                    <select
                                        value={field.selectValue}
                                        onChange={(e) => handleSelectChange(field.id, e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`select-${field.id}`] ? "border-red-500" : "border-gray-300"
                                            }`}
                                    >
                                        <option value="">Select category</option>
                                        <option value="personal">Personal</option>
                                        <option value="work">Work</option>
                                        <option value="education">Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors[`select-${field.id}`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`select-${field.id}`]}</p>
                                    )}
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => deleteField(field.id)}
                                    disabled={formFields.length === 1}
                                    className={`px-3 py-2 rounded-md text-white font-medium ${formFields.length === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                                        }`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-4">
                        {/* Plus Button */}
                        <button
                            type="button"
                            onClick={addField}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium"
                        >
                            + Add Field
                        </button>

                        {/* Submit Button */}
                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium">
                            Submit Form
                        </button>
                    </div>
                </form>

                {/* Form State Display with H3 tags */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Form State (H3 Format)</h2>
                    {displayedFormData.length > 0 ? (
                        displayedFormData.map((field, index) => (
                            <div key={field.id} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Field {index + 1}:</h3>
                                <h3 className="text-md text-gray-600 ml-4">Input: {field.inputValue || "Empty"}</h3>
                                <h3 className="text-md text-gray-600 ml-4">Select: {field.selectValue || "Not selected"}</h3>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No data submitted yet. Fill the form and click submit to see the data.</p>
                    )}
                </div>

                {/* Form State Display in Table Format */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Form State (Table Format)</h2>
                    {displayedFormData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Field #</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Input Value</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Select Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedFormData.map((field, index) => (
                                        <tr key={field.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {field.inputValue || <span className="text-gray-400 italic">Empty</span>}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {field.selectValue || <span className="text-gray-400 italic">Not selected</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No data submitted yet. Fill the form and click submit to see the data.</p>
                    )}
                </div>

                {/* Validation Summary */}
                {submitted && Object.keys(errors).length > 0 && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
                        <ul className="text-red-700 text-sm space-y-1">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserForm;