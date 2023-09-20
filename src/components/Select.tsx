import {FC, useEffect, useRef, useState} from "react";
import styles from './select.module.scss'
import {AiOutlineClose, AiOutlineArrowDown} from 'react-icons/ai'
import {dataType} from "../App.tsx";


interface SelectProps {
    data: dataType[],
    setValue:  (e: any) => void,
    multi?: boolean
}

const Select: FC<SelectProps> = ({data, setValue, multi = false}) => {

    const [inputValue, setInputValue] = useState('')
    const [option, setOption] = useState<dataType>({
        name: '',
        age: 0,
        type: '',
        gender: '',
        breed: false,
        features: []
    })

    const [options, setOptions] = useState<dataType[]>([])
    const [isOpened, setIsOpened] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredData = data.filter(obj => obj.name.toLowerCase().includes(inputValue.toLowerCase()))

    useEffect(() => {
        if (multi) {
            setValue(options)
        } else {
            setValue(option)
        }

    }, [option, options, setValue, multi]);

    return (

        <div className={styles.container}
             onBlur={(e) => {
                 const currentTarget = e.currentTarget;
                 // Give browser time to focus the next element
                 requestAnimationFrame(() => {
                     // Check if the new focused element is a child of the original container
                     if (!currentTarget.contains(document.activeElement)) {
                         setIsOpened(false);
                     }
                 });
             }} tabIndex={0}>
            <div className={styles.inputContainer}
            >
                <div className={styles.leftSide} onClick={() => {
                    setIsOpened(prevState => !prevState)
                    if (inputRef.current) {
                        inputRef.current.focus()
                    }

                }}>

                    <div className={styles.options}>
                        {
                            multi ?
                                options.map((opt) => (
                                    <div key={opt.name} className={styles.option}>
                                        <span className={styles.name}>{opt.name}</span>
                                        <div className={styles.optionDelete} onClick={(e) => {
                                            // убирает открытие списка при удалении одной из опции
                                            e.stopPropagation()
                                            setOptions(prevState => prevState.filter((obj) => obj.name !== opt.name))
                                        }}>
                                            <AiOutlineClose />
                                        </div>
                                    </div>

                                ))
                                :
                                inputValue === '' ?
                                    option.name
                                    :
                                    null
                        }
                    </div>
                    <div className={`${styles.inputWrapper} ${multi && styles.inputWrapperMod}`}>
                        <input ref={inputRef} className={styles.inputElement}
                               value={inputValue}
                               onChange={(e) => {
                                   setInputValue(e.target.value)
                                   setIsOpened(true)
                               }}
                        />
                    </div>
                </div>

                <div className={styles.buttons}>
                    {
                        inputValue !== ''
                        &&
                        <div className={styles.closeBtn} onClick={() => {
                            setInputValue('')
                            setIsOpened(false)
                        }}>
                            <AiOutlineClose/>
                        </div>
                    }
                    <div className={styles.divider}></div>
                    <div className={styles.downBtn} onClick={() => setIsOpened(prevState => !prevState)}>
                        <AiOutlineArrowDown/>
                    </div>
                </div>

            </div>

            <ul className={isOpened ? styles.showed : ''}>
                {
                    filteredData.length > 0 ?
                        filteredData.map(obj => (
                            <li className={(options.includes(obj) && multi) || option.name === obj.name ? styles.selectedOption : ''} key={obj.name} onClick={(e) => {
                                e.stopPropagation()
                                if (option !== obj)  setOption(obj)
                                if (!options.includes(obj)) setOptions((prevState) => [...prevState, obj])
                                setIsOpened(false)
                                setInputValue('')
                            }}>
                                {obj.name}
                            </li>
                        ))
                        :
                        <li>
                            Ничего не найдено
                        </li>
                }
            </ul>
        </div>
    );
};

export default Select;