

const helper = {
    remove: function (array, predicate) {
        for (var i = 0; i < array.length; i++) {
            if (predicate === array[i]) {
                return array.splice(i, 1);
            }
        }
    },
};

const tokenGenerator = () => {
    const difficulty = () => { return Math.random().toString(36).substring(2) };
    const token = difficulty() + difficulty() + difficulty() + difficulty() + difficulty();

    return token;
};

const FieldGeneratorGlobal = (label, name, inputType, optionArray, myMethod) => {
    switch (inputType.toLowerCase()) {
        case 'select':
            return (
                <label className='selectdiv'>
                    <span> {label} :</span>
                    <select onChange={e => { myMethod(e) }}>
                        {optionArray &&
                            optionArray.map((optionValue, i) => {
                                return (<option key={i} value={optionValue}>{optionValue}</option>)
                            })
                        }
                    </select>
                </label >
            )
        case 'textarea':
            return (
                <label>
                    <span> {label} :</span>
                    <textarea name={name} type={inputType ? inputType : 'text'} placeholder={label} />
                </label>
            )
        case 'submit':
            return (
                <label>
                    <input name={name} type='submit' value={label} />
                </label>
            )
        default:
            return (
                <label>
                    <span> {label} :</span>
                    <input name={name} type={inputType ? inputType : 'text'} placeholder={label} />
                </label>
            )
    }
}


export { helper, tokenGenerator, FieldGeneratorGlobal }