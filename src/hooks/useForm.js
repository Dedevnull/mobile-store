import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [form, setForm] = useState(initialForm);

    const onChange = ({ name, value }) => {
        setForm({
            ...form,
            [name]: value
        });
    };

    return { form, onChange };
};