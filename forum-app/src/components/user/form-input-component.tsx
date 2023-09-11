import React, { useState } from 'react';

export function FormInput({
    label,
    value,
    onChange,
    placeholder,
    validationTitle,
    pattern,
} : {
    label: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    validationTitle: string,
    pattern: RegExp | undefined,
}) {
    const [valid, setValid] = useState(true);

    function ValidatePattern(value: string) {
        var isValid = true;
        if (pattern) {
            isValid = pattern.test(value);
        }

        setValid(isValid);
    }

    return (
        <div className='m-4 grid grid-cols-4'>
            <label className='ml-1 text-lg text-slate-300'>{label}</label>
            <input 
                type='text' 
                className='ml-6 col-span-2 p-1 h-8 align-text-top break-words' 
                value={value} 
                onChange={(e) => {
                    ValidatePattern(e.target.value); 
                    onChange(e);
                }}
                placeholder={placeholder}
            ></input>
            {!valid && (<label className='ml-1 text-sm text-red-500 col-span-3 justify-self-center'>{validationTitle}</label>)}
        </div>
    )
}