import { useState } from 'react'

import RecapDetail from './RecapDetail';

import Selecto from "react-selecto";

import './Recap.scss';

const Recap = ({ data }) => {

    const initialArray = data.mesi || null

    // array di importi 
    const amountsArray = initialArray.map((month) => month.importo)

    // Trova la cifra dell'ammontare più alta dell'array
    const maxNumber = Math.max(...amountsArray);

    // Trova la percentuale
    const handleHeight = (number) => {
        let percentage = null
        percentage = (number * 100) / maxNumber
        return Math.floor(percentage)
    }

    const arrayPercentage = amountsArray.map((item) => {
        const percentage = handleHeight(item)
        return percentage
    })

   
    // Lista mesi 
    const monthsList = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno','Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

    // Ritorna un array con tutti i dati necessari
    const finalArray = initialArray.map((el, i) => {
        el.percentuale = arrayPercentage[i]
        el.mese = monthsList[i]
        el.id = i
        return el
    })
    
    const [selectedRecap, setSelectedRecap] = useState([])

    // Elimina i duplicati
    let uniqueArray = selectedRecap.filter( (ele, ind) => ind === selectedRecap.findIndex( elem => elem.id === ele.id  ))
    
    return (
        <>
            <div className="container-recap">
                {finalArray.map((box, i) => (
                    <RecapDetail
                        key={i}
                        id={box.id}
                        month={box.mese}
                        documents={box.documenti}
                        amount={box.importo}
                        percentage={box.percentuale}
                        style={{ '--itemHeight': box.percentuale + "%" }}
                    />))}

                <Selecto
                    selectableTargets={[".recap-detail"]}
                    hitRate={0}
                    selectFromInside={true}

                    onSelectStart={e => {
                        e.removed.forEach(el => {
                            el.classList.remove("selected");
                            setSelectedRecap([])
                        });
                    }}

                    onSelectEnd={e => {
                        e.afterAdded.forEach(el => {
                            el.classList.add("selected");
                            setSelectedRecap((current) => [...current, finalArray[el.id]])
                        });
                        e.afterRemoved.forEach(el => {
                            el.classList.remove("selected");
                            setSelectedRecap([])
                        });
                    }}
                />

            </div>
            <div className="client-msg">
                <p>Hai selezionato:</p>
                {uniqueArray.map((item, i) => <p className='msg' key={i}>{item.mese}: {item.documenti>1  ? 'vi sono' : 'solo'}  {item.documenti} {item.documenti>1 ? 'documenti' : 'documento' } con un importo totale di {item.importo}$</p>)}
                {console.log(uniqueArray)}
            </div>
        </>
    );
}

export default Recap;