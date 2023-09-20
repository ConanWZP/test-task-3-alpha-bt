import data from './data.json'

import './App.css'
import Select from './components/Select'
import {useState} from "react";


export type dataType = {
    name: string,
    age: number,
    type: string,
    gender: string,
    breed: boolean,
    features: string[]
}

function App() {

    const [value, setValue] = useState<dataType[]>([])
    const [valueSolo, setValueSolo] = useState<dataType>({
        name: 'd',
        age: 0,
        type: '',
        gender: '',
        breed: false,
        features: []
    })
    const [multi, setMulti] = useState(true)


    return (
        <div>
            <h2 onClick={() => setMulti(prevState => !prevState)} className={'switcher'}>{multi ? 'Мультивыбор' : 'Одиночный режим'}</h2>
            {
                multi ?
                    <>
                        <Select data={data} setValue={setValue} multi={true} />
                        <h2>Вы выбрали:</h2>
                        <div>
                            {
                                value.length > 0 ? value.map((object) => (
                                    <div key={object.name}>{object.name}</div>
                                )) : 'Вы ничего не выбрали'
                            }
                        </div>
                    </>
                    :
                    <>
                        <Select data={data} setValue={setValueSolo} multi={false} />
                        <h2>Вы выбрали:</h2>
                        <div>
                            {
                                valueSolo.name ? valueSolo.name : 'Вы ничего не выбрали'
                            }
                        </div>
                    </>
            }


        </div>
    )
}

export default App
